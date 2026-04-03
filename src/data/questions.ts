export interface DiagnosticQuestion {
  id: string;
  category: string;
  text: string;
  options: { text: string; scores: Record<string, number> }[];
}

export const diagnosticQuestions: DiagnosticQuestion[] = [
  {
    id: "q1",
    category: "emotional_state",
    text: "Как ты чувствуешь себя прямо сейчас, если быть честной с собой?",
    options: [
      { text: "Я устала и опустошена, как будто внутри всё выгорело", scores: { energy: 1, selfContact: 2, stuckness: 4 } },
      { text: "Я в тревоге — постоянное ощущение, что что-то не так", scores: { energy: 2, readiness: 2, stuckness: 3 } },
      { text: "Я чувствую странную пустоту — не плохо, но и не живо", scores: { energy: 2, selfContact: 1, clarity: 1 } },
      { text: "Я злюсь — на себя, на обстоятельства, на жизнь", scores: { energy: 3, readiness: 3, selfTrust: 2 } },
      { text: "Я на пороге чего-то нового, но боюсь шагнуть", scores: { energy: 3, readiness: 4, clarity: 3 } },
    ],
  },
  {
    id: "q2",
    category: "identity",
    text: "Когда ты думаешь о себе — кто ты сейчас?",
    options: [
      { text: "Я не знаю, кто я. Все прежние роли больше не подходят", scores: { selfContact: 1, clarity: 1, purpose: 1 } },
      { text: "Я — та, кто всегда для других. Себя в этом списке нет", scores: { selfContact: 2, resources: 2, selfTrust: 1 } },
      { text: "Я чувствую, что внутри есть кто-то сильнее, но не могу до неё добраться", scores: { selfContact: 3, resources: 3, purpose: 3 } },
      { text: "Я знаю свои стороны, но не понимаю, куда их направить", scores: { selfContact: 4, clarity: 2, purpose: 2 } },
      { text: "Я в процессе переосмысления — старое ушло, новое ещё не оформилось", scores: { readiness: 4, clarity: 3, purpose: 3 } },
    ],
  },
  {
    id: "q3",
    category: "age_attitude",
    text: "Как ты относишься к своему возрасту?",
    options: [
      { text: "Мне кажется, что лучшее уже позади", scores: { selfTrust: 1, readiness: 1, stuckness: 4 } },
      { text: "Я боюсь, что уже поздно начинать что-то новое", scores: { selfTrust: 2, readiness: 2, stuckness: 3 } },
      { text: "Возраст — это просто цифра, но давление общества чувствую", scores: { selfTrust: 3, readiness: 3, resources: 3 } },
      { text: "Я начинаю видеть в своём возрасте силу, а не ограничение", scores: { selfTrust: 4, readiness: 4, resources: 4 } },
      { text: "Мне всё равно. Важно не сколько лет, а что внутри", scores: { selfTrust: 5, clarity: 4, purpose: 3 } },
    ],
  },
  {
    id: "q4",
    category: "self_worth",
    text: "Что ты чувствуешь, когда думаешь о своей ценности?",
    options: [
      { text: "Я не чувствую, что я ценна. Я много отдала и мало получила", scores: { selfTrust: 1, resources: 1, selfContact: 2 } },
      { text: "Я знаю, что ценна, но не могу это присвоить", scores: { selfTrust: 2, resources: 3, selfContact: 3 } },
      { text: "Моя ценность привязана к тому, что я делаю для других", scores: { selfTrust: 2, purpose: 2, selfContact: 2 } },
      { text: "Я начинаю возвращать себе ощущение собственной значимости", scores: { selfTrust: 3, resources: 4, readiness: 3 } },
      { text: "Я знаю свою ценность и хочу научиться ею жить", scores: { selfTrust: 4, purpose: 4, clarity: 4 } },
    ],
  },
  {
    id: "q5",
    category: "fears",
    text: "Что пугает тебя больше всего в переменах?",
    options: [
      { text: "Что я не справлюсь одна", scores: { selfTrust: 1, readiness: 1, resources: 2 } },
      { text: "Что люди вокруг не поймут и не поддержат", scores: { selfTrust: 2, readiness: 2, stuckness: 2 } },
      { text: "Что я приму неправильное решение и всё станет хуже", scores: { clarity: 1, readiness: 2, selfTrust: 2 } },
      { text: "Что начну и брошу, как уже было", scores: { energy: 2, readiness: 2, stuckness: 3 } },
      { text: "Ничего не пугает — пугает остаться на месте", scores: { readiness: 5, energy: 4, clarity: 3 } },
    ],
  },
  {
    id: "q6",
    category: "past",
    text: "Как ты относишься к своему прошлому?",
    options: [
      { text: "Я застряла в нём. Оно не отпускает", scores: { stuckness: 5, selfContact: 1, readiness: 1 } },
      { text: "Я злюсь на прошлое — столько потерянного времени", scores: { stuckness: 3, energy: 3, selfTrust: 2 } },
      { text: "Я благодарна, но понимаю, что пора идти дальше", scores: { stuckness: 1, readiness: 4, clarity: 3 } },
      { text: "Я пытаюсь извлечь из него уроки, но это болезненно", scores: { stuckness: 3, selfContact: 3, resources: 2 } },
      { text: "Прошлое — это фундамент. Я беру из него силу", scores: { stuckness: 0, resources: 5, selfTrust: 4 } },
    ],
  },
  {
    id: "q7",
    category: "desires",
    text: "Что ты хочешь больше всего прямо сейчас?",
    options: [
      { text: "Покоя. Просто перестать бороться", scores: { energy: 1, purpose: 1, readiness: 1 } },
      { text: "Ясности. Понять, куда мне идти", scores: { clarity: 1, purpose: 2, readiness: 3 } },
      { text: "Силы. Почувствовать, что я могу", scores: { selfTrust: 2, energy: 2, resources: 2 } },
      { text: "Свободы. Жить так, как чувствую, а не как надо", scores: { purpose: 3, readiness: 4, selfContact: 4 } },
      { text: "Смысла. Найти то, ради чего просыпаться", scores: { purpose: 2, clarity: 2, selfContact: 3 } },
    ],
  },
  {
    id: "q8",
    category: "strengths",
    text: "Какая сила в тебе проявляется, даже когда ты этого не замечаешь?",
    options: [
      { text: "Я выдерживаю. Даже когда кажется, что не могу — я стою", scores: { archetype_keeper: 3, resources: 4, energy: 3 } },
      { text: "Я чувствую людей и создаю для них пространство", scores: { archetype_guide: 3, selfContact: 4, resources: 3 } },
      { text: "Я нахожу красоту и смысл даже в хаосе", scores: { archetype_alchemist: 3, clarity: 3, purpose: 3 } },
      { text: "Я ищу. Мне важно понять, докопаться до сути", scores: { archetype_seeker: 3, clarity: 4, purpose: 3 } },
      { text: "Я создаю. Мне важно оставить после себя что-то настоящее", scores: { archetype_creator: 3, purpose: 4, resources: 4 } },
    ],
  },
  {
    id: "q9",
    category: "crisis_style",
    text: "Как ты обычно проживаешь трудные периоды?",
    options: [
      { text: "Замираю. Жду, пока пройдёт", scores: { energy: 1, readiness: 1, stuckness: 4 } },
      { text: "Бросаюсь в действия, чтобы не чувствовать", scores: { energy: 4, selfContact: 1, stuckness: 2 } },
      { text: "Ухожу в себя. Мне нужно побыть одной, чтобы понять", scores: { selfContact: 4, readiness: 2, clarity: 3 } },
      { text: "Ищу поддержку — людей, книги, практики", scores: { resources: 4, readiness: 3, selfTrust: 3 } },
      { text: "Разрушаю старое и строю заново", scores: { archetype_alchemist: 2, readiness: 5, energy: 4 } },
    ],
  },
  {
    id: "q10",
    category: "purpose",
    text: "Если бы ты могла жить из глубины, без страха и чужих ожиданий — что бы ты делала?",
    options: [
      { text: "Помогала бы другим женщинам найти себя", scores: { archetype_guide: 4, purpose: 5, clarity: 4 } },
      { text: "Создавала бы — тексты, пространства, проекты, красоту", scores: { archetype_creator: 4, purpose: 5, clarity: 4 } },
      { text: "Училась бы и передавала знания — глубокие, настоящие", scores: { archetype_keeper: 4, purpose: 4, clarity: 3 } },
      { text: "Путешествовала бы — внешне и внутренне, искала бы истину", scores: { archetype_seeker: 4, purpose: 4, clarity: 3 } },
      { text: "Трансформировала бы — себя, пространство, людей вокруг", scores: { archetype_alchemist: 4, purpose: 5, clarity: 4 } },
    ],
  },
  {
    id: "q11",
    category: "needs",
    text: "Чего тебе не хватает сейчас больше всего?",
    options: [
      { text: "Опоры. Ощущения, что под ногами — твёрдая земля", scores: { selfTrust: 1, resources: 1, archetype_keeper: 2 } },
      { text: "Направления. Знать, куда идти", scores: { clarity: 1, purpose: 1, archetype_seeker: 2 } },
      { text: "Вдохновения. Снова чувствовать жизнь живой", scores: { energy: 1, selfContact: 2, archetype_creator: 2 } },
      { text: "Принятия. Разрешить себе быть собой", scores: { selfTrust: 2, selfContact: 2, archetype_alchemist: 2 } },
      { text: "Связи. Быть рядом с теми, кто понимает", scores: { resources: 2, selfContact: 3, archetype_guide: 2 } },
    ],
  },
  {
    id: "q12",
    category: "voice",
    text: "Если бы ты могла сказать себе одну фразу — какая ближе?",
    options: [
      { text: "Ты не опоздала. Ты только начинаешь по-настоящему.", scores: { readiness: 4, selfTrust: 3, archetype_reborn: 3 } },
      { text: "Перестань терпеть. Начни жить.", scores: { energy: 4, readiness: 4, archetype_alchemist: 2 } },
      { text: "То, что ты ищешь — уже внутри тебя.", scores: { selfContact: 4, purpose: 3, archetype_seeker: 2 } },
      { text: "Ты сильнее, чем думаешь.", scores: { selfTrust: 4, resources: 4, archetype_keeper: 2 } },
      { text: "Мир ждёт того, что только ты можешь дать.", scores: { purpose: 5, clarity: 4, archetype_guide: 2 } },
    ],
  },
];

export const scoreCategories = [
  { key: "energy", label: "Уровень энергии", icon: "⚡" },
  { key: "selfContact", label: "Контакт с собой", icon: "🫀" },
  { key: "clarity", label: "Ясность пути", icon: "🧭" },
  { key: "selfTrust", label: "Доверие себе", icon: "🛡" },
  { key: "readiness", label: "Готовность к переменам", icon: "🌊" },
  { key: "resources", label: "Внутренние ресурсы", icon: "💎" },
  { key: "purpose", label: "Ощущение предназначения", icon: "🌟" },
  { key: "stuckness", label: "Застревание в прошлом", icon: "⚓" },
] as const;
