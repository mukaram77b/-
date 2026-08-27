import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

let geminiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!geminiClient) {
    geminiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return geminiClient;
}

const LOGOS_PLUS_SYSTEM_PROMPT = `
You are «Logos+ Aiperi» (Айпери), the lead certified AI Pediatric Speech-Therapist, Neuro-defectologist, and Consultant at «Logos+» (Логос+) Children's Speech & Neuro-Development Center in Bishkek, Kyrgyzstan.

YOUR MISSION & EXPERTISE:
- Warm, caring, professional, supportive, and evidence-based clinical pediatric guidance for parents of children with special developmental needs.
- Specializations:
  1. Speech Development & Pathologies (ZPR, ZPRR, Alalia, Dysarthria, Dyslalia, Stuttering, Rhinolalia, Speech start / запуск речи).
  2. Autism Spectrum Disorders (ASD / РАС) & ABA Therapy (PECS, visual schedules, imitation, behavior modification).
  3. Cerebral Palsy (CP / ДЦП) & Motor Rehabilitation (AFK, kinesitherapy, spasticity reduction, balance, gait training).
  4. Sensory Integration Therapy (Sensory gym, vestibular/tactile/proprioceptive regulation).
  5. Defectology & Cognitive Development (memory, spatial orientation, logic, school readiness).

LANGUAGE CAPABILITY:
- Fluent in Kyrgyz (Кыргызча), Russian (Русский), and English (English).
- CRITICAL: Detect the language requested (or the user's message language) and reply in that EXACT language (Kyrgyz, Russian, or English).
- Tone: Empathetic, respectful, medically accurate, and easy for parents to understand. Use well-structured formatting with bullet points and bold highlights.

PRICING & SERVICES OVERVIEW (Bishkek, Kyrgyzstan):
- Initial Comprehensive Speech & Neuro Diagnosis: 1,200 KGS (45-50 min).
- Neuropsychological & Sensory Profile Assessment: 1,500 KGS.
- Individual Speech Therapy & Sound Articulation (Dyslalia/Dysarthria): 900 KGS / session (40 min) | 12-session subscription: 9,600 KGS.
- Logopedic Probe & Manual Massage: 1,000 KGS / session (30 min).
- Defectologist Cognitive Session: 900 KGS / session | 12-session subscription: 9,600 KGS.
- Sensory Integration (Equipped Gym): 1,000 KGS / session | 12-session subscription: 10,800 KGS.
- ABA Therapy (Applied Behavior Analysis for ASD): 1,100 KGS / session (50 min) | 12-session subscription: 12,000 KGS.
- AFK (Adaptive Physical Culture for CP & motor skills): 900 KGS / session | 12-session subscription: 9,600 KGS.
- Intensive "Logos+ Development" Course (24 sessions): 21,600 KGS.

BRANCHES & HOURS (Bishkek):
1. Central Branch (Dubovy Park): Chuy Ave 114 (crosses Orozbekov St). Tel: +996 (705) 55-44-33.
2. South Branch (Asanbay): 12th Microdistrict, Aaly Tokombaev St 78/2. Tel: +996 (550) 22-33-44.
3. West Branch (Asia Mall): Chyngyz Aitmatov Ave 43. Tel: +996 (772) 11-88-99.
- Working Hours: Monday - Saturday 08:30 - 19:30 (Sunday by appointment).

PARENT CONSULTATION GUIDELINES:
- When a parent describes symptoms (e.g. "My 3yo child doesn't speak", "Doesn't make eye contact", "Walks on toes", "Stutters"):
  1. Validate their concern with warmth and reassurance.
  2. Explain what may cause this condition simply.
  3. Recommend the specific therapeutic approach (e.g. Speech therapy + sensory integration + probe massage).
  4. Provide 2-3 practical home exercises they can start right now.
  5. Recommend booking a 1st comprehensive diagnosis session at Logos+.
`;

// Helper fallback engine when Gemini API is unavailable or offline
function generateLocalPediatricResponse(message: string, language: string): string {
  const lower = message.toLowerCase();

  // Kyrgyz responses
  if (language === 'ky') {
    if (lower.includes('сүйлөбөйт') || lower.includes('3 жаш') || lower.includes('2 жаш') || lower.includes('кеп') || lower.includes('тил') || lower.includes('сүйлөө')) {
      return `Саламатсызбы! Баланын кечигип сүйлөөсү (ЗПРР же алалия) ата-энелердин эң көп кайрылган маселеси.

**Биздин сунуштар жана кадамдар:**
1. **Артикуляциялык аппаратты текшерүү**: Тилдин ооз ичиндеги кыймылдуулугун жана тонусун (логомассаж керекпи) аныктоо.
2. **Сенсордук интеграция**: Көпчүлүк учурда сүйлөө вестибулярдык жана тактильдик сезимдердин өнүгүшүнө түздөн-түз байланыштуу.
3. **Үйдө жасалуучу көнүгүүлөр**:
   • Эрин жана тил көнүгүүлөрү («Аттын туягын тууроо», «Түтүкчө менен үйлөө»).
   • Майда моторика (буурчак, пластилин, манжа оюндары).
   • Гаджеттерди (телефон, мультфильм) күнүнө максимум 15-20 мүнөткө чейин чектөө.

🌟 «Логос+» борборунда алгачкы **комплекстүү диагностикадан (1,200 сом)** өтүүнү сунуштайбыз. Адисибиз жекече коррекциялык маршрут (ИОМ) түзүп берет. «Диагностикага жазылуу» баскычын басып онлайн катталсаңыз болот!`;
    }

    if (lower.includes('рас') || lower.includes('аутизм') || lower.includes('ава') || lower.includes('көзгө') || lower.includes('pecs')) {
      return `Саламатсызбы! РАС (Аутизм спектри) боюнча «Логос+» борборунда эл аралык далилденген **АВА-терапия** жана **Сенсордук интеграция** колдонулат.

**АВА-терапия кандай жардам берет?**
• Көз байланышын (зрительный контакт) түзүү жана узартуу.
• Атына жооп берүүнү жана өтүнүчтү түшүнүүнү калыптандыруу.
• PECS карточкалары аркылуу керектүү нерсесин суроону үйрөтүү.
• Керексиз жүрүм-турумду (тантрум, агрессия, өзүнө зыян келтирүү) азайтуу.

🌟 **Баасы:** 1 жеке АВА сессиясы — 1,100 сом | 12 сабак — 12,000 сом. Биздин сертификатталган АВА-терапевттерибизге жазылуу үчүн онлайн өтүнмө калтырсаңыз болот!`;
    }

    if (lower.includes('дцп') || lower.includes('афк') || lower.includes('басуу') || lower.includes('шал') || lower.includes('моторика')) {
      return `Саламатсызбы! ДЦП (церебралдык шал) жана кыймыл-аракет бузулууларында «Логос+» борборунун **АФК (Адаптивдүү дене тарбия)** залы жана кинезиотерапия адистери жардам берет.

**АФК программасы:**
• Булчуңдардын спастикасын азайтуу жана созуу.
• Муундардын кыймылдуулугун арттыруу.
• Тең салмактуулукту (баланс) кармоо жана басуу паттернин калыптандыруу.
• Кеп аппараты үчүн логомассаж менен коштоо.

🌟 **Баасы:** 1 сабак — 900 сом | 12 сабак абонемент — 9,600 сом. Биздин 2-филиалда (12-мкр, Асанбай) атайын чоң АФК залы жабдылган.`;
    }

    if (lower.includes('баа') || lower.includes('канча') || lower.includes('акы') || lower.includes('абонемент') || lower.includes('прайс')) {
      return `«Логос+» борборунун кызмат баалары:

• **Диагностика (логопед-дефектолог, 50 мин)**: 1,200 сом
• **Логопед жеке сабагы (40 мин)**: 900 сом (12 сабак абонемент: 9,600 сом)
• **Логомассаж (зонддук/кол, 30 мин)**: 1,000 сом
• **Дефектолог (45 мин)**: 900 сом (12 сабак: 9,600 сом)
• **Сенсордук интеграция залы (45 мин)**: 1,000 сом (12 сабак: 10,800 сом)
• **АВА-терапия (РАС/Аутизм, 50 мин)**: 1,100 сом (12 сабак: 12,000 сом)
• **АФК реабилитация (ДЦП, 45 мин)**: 900 сом (12 сабак: 9,600 сом)
• **Комплекстүү Интенсив курс (24 сабак)**: 21,600 сом

Жазылуу үчүн «Диагностикага жазылуу» баскычын басыңыз же +996 (705) 55-44-33 номерине чалыңыз!`;
    }

    if (lower.includes('дарек') || lower.includes('филиал') || lower.includes('кайда') || lower.includes('телефон')) {
      return `«Логос+» борборунун Бишкектеги 3 филиалы:

1. **Борбордук филиал (Дубовый парк жанында)**:
   📍 Чүй проспектиси 114 (Орозбеков көч. кесилиши)
   📞 Тел: +996 (705) 55-44-33

2. **Түштүк филиал (Асанбай паркы каршысында)**:
   📍 12-кичирайон, Аалы Токомбаев көч. 78/2
   📞 Тел: +996 (550) 22-33-44

3. **Батыш филиал (Азия Молл жанында)**:
   📍 Чыңгыз Айтматов проспектиси 43
   📞 Тел: +996 (772) 11-88-99

🕒 **Иштөө убактысы**: Дүйшөмбү - Ишемби 08:30 - 19:30.`;
    }

    return `Саламатсызбы! «Логос+» логопедия жана балдарды өнүктүрүү борбору балаңыздын сүйлөөсү, жүрүм-туруму (РАС), кыймыл-аракети (ДЦП) жана таанып-билүүсү (ЗПР) боюнча жардам берүүгө даяр.

Сурооңуз боюнча толук маалымат алуу үчүн биздин адистердин 1-чи диагностикасына жазылсаңыз же сурооңузду кененирээк жазсаңыз, кубаныч менен жооп берем!`;
  }

  // English responses
  if (language === 'en') {
    if (lower.includes('speech') || lower.includes('speak') || lower.includes('talk') || lower.includes('3 year') || lower.includes('delay') || lower.includes('not talking')) {
      return `Hello! Speech and language delay (expressive or receptive delay / alalia) is one of the most common reasons parents consult with us.

**Recommended Steps & Approach:**
1. **Oral-Motor Evaluation**: Assessing tongue mobility, oral muscle tone, and determining if logopedic probe massage is needed.
2. **Sensory Integration**: Speech development is strongly linked to vestibular and tactile integration in early childhood.
3. **At-Home Tips**:
   • Articulation fun games (lip bubbles, blowing through straws, animal sound imitation).
   • Fine motor play (kinetic sand, sorting beans, finger puppets).
   • Limit screen time to under 15-20 minutes daily.

🌟 We recommend starting with an **Initial Comprehensive Speech Diagnosis (1,200 KGS)** at Logos+ center in Bishkek. You can book directly via the "Book Diagnosis" button!`;
    }

    if (lower.includes('autism') || lower.includes('asd') || lower.includes('aba') || lower.includes('eye contact') || lower.includes('pecs')) {
      return `Hello! For children on the Autism Spectrum (ASD), Logos+ provides certified **ABA Therapy (Applied Behavior Analysis)** and **Sensory Integration Therapy**.

**How ABA Therapy helps:**
• Establishing and extending eye contact and joint attention.
• Teaching alternative functional communication via PECS cards.
• Reducing challenging behaviors (meltdowns, sensory overload, self-injury).
• Developing imitation, self-care, and social integration skills.

🌟 **Pricing:** 1 individual ABA session (50 min) — 1,100 KGS | 12-session package — 12,000 KGS.`;
    }

    if (lower.includes('cp') || lower.includes('cerebral palsy') || lower.includes('afk') || lower.includes('motor') || lower.includes('walking')) {
      return `Hello! For children with Cerebral Palsy (CP) and motor difficulties, Logos+ offers specialized **AFK (Adaptive Physical Culture)** and kinesitherapy.

**Key rehabilitation components:**
• Spasticity reduction and muscle elongation.
• Joint mobility and balance training.
• Gait pattern training and postural alignment.
• Logopedic massage for speech articulation support.

🌟 **Pricing:** 1 AFK session — 900 KGS | 12 sessions — 9,600 KGS. Equipped with modern pediatric rehabilitation gear.`;
    }

    if (lower.includes('price') || lower.includes('cost') || lower.includes('subscription') || lower.includes('rates')) {
      return `«Logos+» Center Service & Pricing:

• **Initial Comprehensive Diagnosis (50 min)**: 1,200 KGS
• **Individual Speech Therapy Session (40 min)**: 900 KGS (12-session package: 9,600 KGS)
• **Probe & Manual Speech Massage (30 min)**: 1,000 KGS
• **Defectologist Session (45 min)**: 900 KGS (12 sessions: 9,600 KGS)
• **Sensory Integration Gym (45 min)**: 1,000 KGS (12 sessions: 10,800 KGS)
• **ABA Therapy for ASD (50 min)**: 1,100 KGS (12 sessions: 12,000 KGS)
• **AFK Motor Rehab for CP (45 min)**: 900 KGS (12 sessions: 9,600 KGS)
• **Intensive Course (24 sessions)**: 21,600 KGS

To book, click "Book Diagnosis" or call +996 (705) 55-44-33!`;
    }

    if (lower.includes('address') || lower.includes('branch') || lower.includes('location') || lower.includes('hours') || lower.includes('phone')) {
      return `«Logos+» Center Branches in Bishkek:

1. **Central Branch (Oak Park area)**:
   📍 114 Chuy Avenue (crosses Orozbekov St)
   📞 Tel: +996 (705) 55-44-33

2. **South Branch (Asanbay)**:
   📍 12th Microdistrict, Aaly Tokombaev St 78/2
   📞 Tel: +996 (550) 22-33-44

3. **West Branch (Asia Mall area)**:
   📍 43 Chyngyz Aitmatov Avenue
   📞 Tel: +996 (772) 11-88-99

🕒 **Working Hours**: Monday - Saturday 08:30 - 19:30.`;
    }

    return `Hello! Welcome to «Logos+» Children's Speech & Neuro-Development Center in Bishkek. We specialize in speech therapy, autism (ASD), cerebral palsy (CP), developmental delays, sensory integration, and ABA therapy.

Feel free to ask any question about our methods, programs, or click "Book Diagnosis" to schedule an in-person assessment!`;
  }

  // Russian responses (default)
  if (lower.includes('не говорит') || lower.includes('3 года') || lower.includes('2 года') || lower.includes('речь') || lower.includes('задержка') || lower.includes('зпрр') || lower.includes('звук')) {
    return `Здравствуйте! Задержка речевого развития (ЗПРР, алалия или дизартрия) — частый запрос, с которым мы успешно работаем каждый день.

**Что необходимо сделать в первую очередь:**
1. **Комплексная очная диагностика**: Оценка тонуса артикуляционного аппарата (языка, губ, мягкого нёба) и проверка, нужен ли зондовый логомассаж.
2. **Сенсорная стимуляция**: Запуск речи неразрывно связан с вестибулярным аппаратом и мелкой/крупной моторикой.
3. **Рекомендации на каждый день**:
   • Артикуляционная гимнастика («Лошадка», «Вкусное варенье», дыхание через трубочку).
   • Игры с крупами, фасолью, лепка и тактильные дорожки.
   • Сокращение гаджетов до минимума (до 15 мин в день).

🌟 Рекомендуем записаться на **первичную диагностику (1,200 сом)** в «Логос+». Специалист составит индивидуальный маршрут развития (ИОМ).`;
  }

  if (lower.includes('рас') || lower.includes('аутизм') || lower.includes('ава') || lower.includes('контакт') || lower.includes('pecs')) {
    return `Здравствуйте! При РАС (расстройствах аутистического спектра) в центре «Логос+» применяется доказательная **АВА-терапия (прикладной анализ поведения)** и **Сенсорная интеграция**.

**Чем помогает АВА-терапия:**
• Формирование и удержание зрительного контакта («глаза в глаза»).
• Реакция на имя и выполнение простых просьб.
• Альтернативная коммуникация с помощью карточек PECS.
• Коррекция нежелательного поведения (танструмы, агрессия).

🌟 **Стоимость:** 1 индивидуальное занятие (50 мин) — 1,100 сом | абонемент на 12 занятий — 12,000 сом. Запишитесь онлайн через кнопку «Записаться на прием»!`;
  }

  if (lower.includes('дцп') || lower.includes('афк') || lower.includes('ходьба') || lower.includes('моторика') || lower.includes('спастик')) {
    return `Здравствуйте! Для детей с ДЦП (церебральным параличом) и двигательными нарушениями в центре «Логос+» проводятся занятия по **АФК (Адаптивной физкультуре)** и кинезиотерапии.

**Направления реабилитации:**
• Снижение спастичности и мягкая растяжка мышц.
• Тренировка равновесия, баланса и координации.
• Формирование правильного паттерна ходьбы.
• Логопедический массаж при сопутствующей дизартрии.

🌟 **Стоимость:** 1 занятие — 900 сом | абонемент на 12 занятий — 9,600 сом. Во 2-м филиале (12-мкр, Асанбай) оборудован специальный зал АФК.`;
  }

  if (lower.includes('цена') || lower.includes('стоимость') || lower.includes('сколько') || lower.includes('абонемент') || lower.includes('прайс')) {
    return `Прейскурант центра «Логос+» в Бишкеке:

• **Первичная диагностика (логопед-дефектолог, 50 мин)**: 1,200 сом
• **Индивидуальное занятие с логопедом (40 мин)**: 900 сом (абонемент 12 занятий: 9,600 сом)
• **Зондовый логомассаж (30 мин)**: 1,000 сом
• **Дефектолог (45 мин)**: 900 сом (абонемент 12 занятий: 9,600 сом)
• **Сенсорная интеграция в спецзале (45 мин)**: 1,000 сом (абонемент 12 занятий: 10,800 сом)
• **АВА терапия (РАС/Аутизм, 50 мин)**: 1,100 сом (абонемент 12 занятий: 12,000 сом)
• **АФК реабилитация при ДЦП (45 мин)**: 900 сом (абонемент 12 занятий: 9,600 сом)
• **Интенсивный курс (24 занятия)**: 21,600 сом

Для записи нажмите кнопку «Записаться на прием» или звоните: +996 (705) 55-44-33!`;
  }

  if (lower.includes('адрес') || lower.includes('филиал') || lower.includes('где') || lower.includes('контакт') || lower.includes('телефон')) {
    return `3 филиала центра «Логос+» в Бишкеке:

1. **Центральный филиал (район Дубового парка)**:
   📍 пр. Чуй 114 (пересекает ул. Орозбекова)
   📞 Тел: +996 (705) 55-44-33

2. **Южный филиал (напротив парка Асанбай)**:
   📍 12-мкр, ул. Аалы Токомбаева 78/2
   📞 Тел: +996 (550) 22-33-44

3. **Западный филиал (возле Азия Молл)**:
   📍 пр. Чынгыза Айтматова 43
   📞 Тел: +996 (772) 11-88-99

🕒 **Время работы**: Понедельник - Суббота 08:30 - 19:30.`;
  }

  return `Здравствуйте! Центр логопедии и детского развития «Логос+» рад помочь вашему ребенку. Мы специализируемся на коррекции речи, РАС, ДЦП, ЗПР, сенсорной интеграции и АВА терапии.

Задайте ваш вопрос подробнее, либо нажмите «Записаться на прием» для прохождения очной диагностики у ведущих специалистов Бишкека!`;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', center: 'Logos+ Speech & Neuro-Development Center', time: new Date().toISOString() });
  });

  // AI Speech & Child Development Consultant Chat API
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, language = 'ky', conversationHistory = [], history = [] } = req.body;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message is required' });
      }

      const client = getGeminiClient();

      if (!client) {
        const localReply = generateLocalPediatricResponse(message, language);
        return res.json({ 
          status: 'success',
          reply: localReply,
          text: localReply
        });
      }

      const rawHistory = Array.isArray(conversationHistory) && conversationHistory.length > 0
        ? conversationHistory
        : (Array.isArray(history) ? history : []);

      const formattedHistory = rawHistory.slice(-6).map((m: any) => {
        if (m.parts && m.parts[0]?.text) {
          return `${m.role === 'user' ? 'Ата-эне / Parent' : 'Логос+ Айпери'}: ${m.parts[0].text}`;
        }
        return `${m.sender === 'user' ? 'Ата-эне / Parent' : 'Логос+ Айпери'}: ${m.text || ''}`;
      }).join('\n');

      const targetLangName = language === 'en' ? 'English' : (language === 'ru' ? 'Russian' : 'Kyrgyz');
      const prompt = `${formattedHistory}\nUser / Parent: ${message}\nLogos+ Aiperi (Please answer warmly and comprehensively in ${targetLangName} language):`;

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: LOGOS_PLUS_SYSTEM_PROMPT,
          temperature: 0.7,
        },
      });

      const replyText = response.text || generateLocalPediatricResponse(message, language);

      return res.json({
        status: 'success',
        reply: replyText,
        text: replyText,
      });

    } catch (err: unknown) {
      console.error('Gemini API in /api/chat error, falling back to local engine:', err);
      const fallbackReply = generateLocalPediatricResponse(req.body.message || '', req.body.language || 'ky');
      return res.json({
        status: 'success',
        reply: fallbackReply,
        text: fallbackReply,
      });
    }
  });

  // AI Individual Educational & Correction Route (ИОМ) Generator
  app.post('/api/generate-iom', async (req, res) => {
    try {
      const { childName, age, diagnosis, primaryIssues, language = 'ky' } = req.body;
      const client = getGeminiClient();

      if (!client) {
        return res.json({
          status: 'success',
          data: {
            goals: [
              language === 'en' ? 'Prepare speech apparatus with logopedic probe massage' : (language === 'ru' ? 'Подготовка речевого аппарата зондовым массажем' : 'Сүйлөө аппаратын артикуляциялык массаж менен даярдоо'),
              language === 'en' ? 'Improve phonemic hearing and sound pronunciation' : (language === 'ru' ? 'Развитие фонематического слуха и постановка звуков' : 'Фонематикалык угууну жана тыбыштарды жакшыртуу'),
              language === 'en' ? 'Harmonize sensory and motor coordination' : (language === 'ru' ? 'Сенсорная интеграция и регуляция тонуса' : 'Сенсордук сезгичтикти жана моториканы жөнгө салуу')
            ],
            recommendedProgram: language === 'en' ? 'Speech Therapy + Sensory Integration Gym' : (language === 'ru' ? 'Логопедия + Сенсорная интеграция' : 'Логопедия + Сенсордук интеграция'),
            frequency: language === 'en' ? '3 times a week' : (language === 'ru' ? '3 раза в неделю' : 'Жумасына 3 жолу'),
            assignedSpecialists: [
              language === 'en' ? 'Senior Speech Pathologist' : (language === 'ru' ? 'Логопед-дефектолог' : 'Башкы логопед-дефектолог'),
              language === 'en' ? 'Sensory Therapist' : (language === 'ru' ? 'Сенсорный терапевт' : 'Сенсордук терапевт')
            ],
            milestones: [
              { stage: language === 'en' ? 'Month 1 (Adaptation)' : (language === 'ru' ? '1-й месяц (Адаптация)' : '1-ай (Адаптация)'), focus: language === 'en' ? 'Establishing connection and breath coordination' : (language === 'ru' ? 'Установление контакта и нормализация тонуса' : 'Контакт түзүү жана тонусту бошотуу'), status: 'completed' },
              { stage: language === 'en' ? 'Month 2 (Correction)' : (language === 'ru' ? '2-й месяц (Коррекция)' : '2-ай (Коррекция)'), focus: language === 'en' ? 'Target sounds articulation and sensory regulation' : (language === 'ru' ? 'Постановка базовых звуков и сенсорные игры' : 'Негизги тыбыштарды коюу жана сенсордук көнүгүүлөр'), status: 'in-progress' },
              { stage: language === 'en' ? 'Month 3 (Automation)' : (language === 'ru' ? '3-й месяц (Автоматизация)' : '3-ай (Автоматизация)'), focus: language === 'en' ? 'Phrase speech and active social communication' : (language === 'ru' ? 'Связная речь и фразовая коммуникация' : 'Байланыштуу сүйлөм түзүү жана өз алдынча кеп'), status: 'pending' }
            ],
            homeRecommendations: [
              language === 'en' ? 'Daily 10 min oral motor gymnastics' : (language === 'ru' ? 'Артикуляционная гимнастика 10 минут в день' : 'Күн сайын 10 мүнөт артикуляциялык көнүгүүлөр'),
              language === 'en' ? 'Sensory bean sorting and finger games' : (language === 'ru' ? 'Сенсорные игры с крупами и мозаикой' : 'Манжа жана сенсордук оюндар')
            ]
          }
        });
      }

      const langTitle = language === 'en' ? 'English' : (language === 'ru' ? 'Russian' : 'Kyrgyz');
      const prompt = `Generate an Individual Educational & Correction Route (IOM) for a child at Logos+ Center.
Child Name: ${childName || 'Child'}
Age: ${age || 4} years old
Diagnosis: ${diagnosis || 'Speech Delay / ZPRR'}
Primary Concerns: ${primaryIssues || 'Does not speak, restless, poor eye contact'}
Language for the output: ${langTitle}

Respond in strictly valid JSON:
{
  "goals": ["Goal 1", "Goal 2", "Goal 3"],
  "recommendedProgram": "Program Name",
  "frequency": "Frequency per week",
  "assignedSpecialists": ["Specialist 1", "Specialist 2"],
  "milestones": [
    {"stage": "Stage 1", "focus": "Main Focus", "status": "completed"},
    {"stage": "Stage 2", "focus": "Main Focus", "status": "in-progress"},
    {"stage": "Stage 3", "focus": "Main Focus", "status": "pending"}
  ],
  "homeRecommendations": ["Home Tip 1", "Home Tip 2"]
}`;

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: 'You are a Senior Neuro-Speech & Child Development Diagnostician at Logos+ center in Bishkek. Always return valid parseable JSON only.',
          responseMimeType: 'application/json'
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      return res.json({ status: 'success', data: parsed });

    } catch (err: unknown) {
      console.error('Error generating IOM:', err);
      return res.status(500).json({ error: (err as Error)?.message || 'Failed to generate IOM' });
    }
  });

  // Setup Vite middleware in dev or static files in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
