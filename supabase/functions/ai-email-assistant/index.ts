const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const BodySchema = z.object({
  email: z.string().email().max(255),
  topic: z.string().min(3).max(500),
});

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const parsed = BodySchema.safeParse(await req.json());
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Некорректные данные", details: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { email, topic } = parsed.data;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Generate personalized email content with AI
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Ты — мудрый и тёплый AI-помощник проекта «После 40 не поздно» Елены Даниловой. Пиши красивые, вдохновляющие письма на русском языке для женщин, проходящих трансформацию после 40 лет. Письмо должно быть:
- Тёплым и поддерживающим
- Конкретным и полезным (с 2-3 практическими советами)
- Не длиннее 300 слов
- Начинаться с обращения "Дорогая,"
- Заканчиваться подписью "С теплом, AI-помощник проекта «После 40 не поздно»"
Не используй markdown-форматирование, пиши обычным текстом с абзацами.`,
          },
          {
            role: "user",
            content: `Напиши персональное вдохновляющее письмо на тему: ${topic}`,
          },
        ],
        max_tokens: 1000,
        temperature: 0.8,
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI API error:", errText);
      throw new Error("Не удалось сгенерировать письмо");
    }

    const aiData = await aiResponse.json();
    const letterContent = aiData.choices?.[0]?.message?.content;

    if (!letterContent) {
      throw new Error("AI не вернул содержание письма");
    }

    // Send email using Resend via Lovable gateway
    // For now, we'll use a simple approach with the Lovable email API
    const emailHtml = `
      <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #faf5f0; border: 3px solid #2d2419;">
        <div style="background: #c05621; padding: 20px; text-align: center; border-bottom: 3px solid #2d2419;">
          <h1 style="color: white; font-size: 24px; margin: 0; font-family: 'Arial', sans-serif;">После 40 не поздно</h1>
        </div>
        <div style="padding: 30px 20px; background: white; border: 2px solid #2d2419;">
          ${letterContent.split("\n").map((p: string) => p.trim() ? `<p style="font-size: 16px; line-height: 1.7; color: #2d2419; margin: 0 0 15px;">${p}</p>` : "").join("")}
        </div>
        <div style="padding: 15px 20px; text-align: center;">
          <p style="font-size: 12px; color: #8b7355;">Это письмо было создано AI-помощником проекта «После 40 не поздно»</p>
          <a href="https://life-reforge-app.lovable.app" style="color: #c05621; font-size: 12px;">Перейти на сайт →</a>
        </div>
      </div>
    `;

    // Use Resend to send the email
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    if (RESEND_API_KEY) {
      const sendResponse = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "X-Connection-Api-Key": RESEND_API_KEY,
        },
        body: JSON.stringify({
          from: "После 40 не поздно <onboarding@resend.dev>",
          to: [email],
          subject: `Персональное письмо: ${topic.slice(0, 50)}`,
          html: emailHtml,
        }),
      });

      if (!sendResponse.ok) {
        const errText = await sendResponse.text();
        console.error("Email send error:", errText);
        throw new Error("Не удалось отправить письмо");
      }
    } else {
      // If no Resend key, just return the generated content
      console.log("No RESEND_API_KEY found — returning generated content only");
      return new Response(
        JSON.stringify({ 
          success: true, 
          message: "Письмо сгенерировано (отправка email будет доступна после настройки почтового сервиса)",
          preview: letterContent 
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Письмо отправлено!" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Внутренняя ошибка сервера" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
