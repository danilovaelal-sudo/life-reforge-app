const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const TopicSchema = z.object({
  email: z.string().email().max(255),
  topic: z.string().min(3).max(500),
  mode: z.literal("topic").optional(),
});

const ResultsSchema = z.object({
  email: z.string().email().max(255),
  mode: z.literal("results"),
  scores: z.record(z.number()),
  archetype: z.object({
    name: z.string(),
    subtitle: z.string(),
    description: z.string(),
    mainStrength: z.string(),
    shadow: z.string(),
    currentChallenge: z.string(),
    potential: z.string(),
    growthDirection: z.string(),
    firstSteps: z.array(z.string()),
  }),
  secondaryArchetype: z.object({
    name: z.string(),
    subtitle: z.string(),
  }).nullable(),
});

function buildResultsPrompt(data: z.infer<typeof ResultsSchema>): string {
  const scoreLines = Object.entries(data.scores)
    .map(([k, v]) => `${k}: ${v}/10`)
    .join(", ");

  return `Вот результаты диагностики женщины:

Баллы по шкалам: ${scoreLines}

Основной архетип: ${data.archetype.name} — ${data.archetype.subtitle}
Описание: ${data.archetype.description}
Главная сила: ${data.archetype.mainStrength}
Тень: ${data.archetype.shadow}
Текущий вызов: ${data.archetype.currentChallenge}
Потенциал: ${data.archetype.potential}
Направление роста: ${data.archetype.growthDirection}
Первые шаги: ${data.archetype.firstSteps.join("; ")}
${data.secondaryArchetype ? `Дополнительный архетип: ${data.secondaryArchetype.name} — ${data.secondaryArchetype.subtitle}` : ""}

Напиши подробное персональное письмо с разбором её результатов. Включи:
1. Что означают её баллы — где сила, где зона роста
2. Глубокий разбор её архетипа и что он говорит о её пути
3. 3-5 конкретных рекомендаций на ближайшую неделю
4. Вдохновляющее послание`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const isResults = body.mode === "results";

    let email: string;
    let aiPrompt: string;
    let subject: string;

    if (isResults) {
      const parsed = ResultsSchema.safeParse(body);
      if (!parsed.success) {
        return new Response(
          JSON.stringify({ error: "Некорректные данные", details: parsed.error.flatten().fieldErrors }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      email = parsed.data.email;
      aiPrompt = buildResultsPrompt(parsed.data);
      subject = `Твои результаты диагностики: ${parsed.data.archetype.name}`;
    } else {
      const parsed = TopicSchema.safeParse(body);
      if (!parsed.success) {
        return new Response(
          JSON.stringify({ error: "Некорректные данные", details: parsed.error.flatten().fieldErrors }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      email = parsed.data.email;
      aiPrompt = `Напиши персональное вдохновляющее письмо на тему: ${parsed.data.topic}`;
      subject = `Персональное письмо: ${parsed.data.topic.slice(0, 50)}`;
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = isResults
      ? `Ты — мудрый AI-аналитик проекта «После 40 не поздно» Елены Даниловой. Пиши глубокие, персональные разборы результатов диагностики на русском языке. Письмо должно быть:
- Профессиональным, но тёплым
- Детальным (500-700 слов)
- С конкретными рекомендациями
- Структурированным с подзаголовками
- Начинаться с «Дорогая,»
- Заканчиваться подписью «С теплом, AI-помощник проекта «После 40 не поздно»»
Не используй markdown-форматирование, пиши обычным текстом с абзацами.`
      : `Ты — мудрый и тёплый AI-помощник проекта «После 40 не поздно» Елены Даниловой. Пиши красивые, вдохновляющие письма на русском языке для женщин, проходящих трансформацию после 40 лет. Письмо должно быть:
- Тёплым и поддерживающим
- Конкретным и полезным (с 2-3 практическими советами)
- Не длиннее 300 слов
- Начинаться с обращения «Дорогая,»
- Заканчиваться подписью «С теплом, AI-помощник проекта «После 40 не поздно»»
Не используй markdown-форматирование, пиши обычным текстом с абзацами.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: aiPrompt },
        ],
        max_tokens: isResults ? 2000 : 1000,
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

    const emailHtml = `
      <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; background: #faf5f0; border: 3px solid #2d2419;">
        <div style="background: #c05621; padding: 20px; text-align: center; border-bottom: 3px solid #2d2419;">
          <h1 style="color: white; font-size: 24px; margin: 0;">После 40 не поздно</h1>
        </div>
        <div style="padding: 30px 20px; background: white; border: 2px solid #2d2419;">
          ${letterContent.split("\n").map((p: string) => p.trim() ? `<p style="font-size: 16px; line-height: 1.7; color: #2d2419; margin: 0 0 15px;">${p}</p>` : "").join("")}
        </div>
        <div style="padding: 15px 20px; text-align: center;">
          <p style="font-size: 12px; color: #8b7355;">Это письмо создано AI-помощником проекта «После 40 не поздно»</p>
          <a href="https://life-reforge-app.lovable.app" style="color: #c05621; font-size: 12px;">Перейти на сайт →</a>
        </div>
      </div>
    `;

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
          subject,
          html: emailHtml,
        }),
      });

      if (!sendResponse.ok) {
        const errText = await sendResponse.text();
        console.error("Email send error:", errText);
        throw new Error("Не удалось отправить письмо");
      }
    } else {
      console.log("No RESEND_API_KEY — returning generated content only");
      return new Response(
        JSON.stringify({
          success: true,
          message: "Письмо сгенерировано (отправка будет доступна после настройки почтового сервиса)",
          preview: letterContent,
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
