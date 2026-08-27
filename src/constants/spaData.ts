import { 
  MassageService, 
  ServiceAddon, 
  MasterTherapist, 
  SpaBranch, 
  MembershipTier, 
  BodySymptomMatch, 
  CustomerReview 
} from '../types/spa';

export const SPA_INFO = {
  name: 'МУККА | MUKKA',
  subtitle: 'Mukka Luxury Massage & Ayurvedic Spa Bishkek',
  city: 'Бишкек ш., Кыргызстан',
  phone: '+996 (700) 88-99-22',
  secondaryPhone: '+996 (555) 11-22-33',
  whatsapp: '996700889922',
  email: 'welcome@mukkaspa.kg',
  hours: {
    everyday: '09:00 – 23:00',
    weekdays: '09:00 – 23:00',
    weekends: '09:00 – 23:00'
  },
  branches: [
    {
      id: 'central',
      name: {
        kg: '«Мукка» Борбордук филиал (Эркиндик)',
        ru: '«Мукка» Центральный филиал (Эркиндик)',
        en: 'Mukka Central Branch (Erkindik Blvd)'
      },
      address: {
        kg: 'Бишкек ш., Эркиндик бульвары 45 (Токтогул көчөсү кесилиши)',
        ru: 'г. Бишкек, бульвар Эркиндик 45 (пересекает ул. Токтогула)',
        en: '45 Erkindik Boulevard (cross Toktogul St), Bishkek'
      },
      landmark: {
        kg: 'Эмен сейил багы жана Темир Жол вокзалына жакын',
        ru: 'Рядом с Дубовым парком и ж/д вокзалом',
        en: 'Near Oak Park & Bishkek Railway Station'
      },
      phone: '+996 (700) 88-99-22',
      whatsapp: '996700889922',
      hours: '09:00 – 23:00 (күн сайын)',
      map2GisUrl: 'https://2gis.kg/bishkek/inside/70000001019343846?m=74.6065%2C42.8718%2F16',
      yandexMapUrl: 'https://yandex.ru/maps/10309/bishkek/?ll=74.6065%2C42.8718&z=16',
      googleMapUrl: 'https://maps.google.com/?q=42.8718,74.6065',
      lat: 42.8718,
      lng: 74.6065,
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'south',
      name: {
        kg: '«Мукка» Түштүк филиал (Токомбаев / Асанбай)',
        ru: '«Мукка» Южный филиал (Токомбаева / Асанбай)',
        en: 'Mukka South Branch (Tokombaev / Asanbay)'
      },
      address: {
        kg: 'Бишкек ш., Аалы Токомбаев көч. 21/3 (Асанбай кичирайону)',
        ru: 'г. Бишкек, ул. Аалы Токомбаева 21/3 (мкр. Асанбай)',
        en: '21/3 Aaly Tokombaev St (Asanbay district), Bishkek'
      },
      landmark: {
        kg: '«Асанбай» сейил багы жана Дордой Плаза 2 каршысында',
        ru: 'Напротив парка Асанбай, чистый горный воздух',
        en: 'Opposite Asanbay Park, fresh mountain air zone'
      },
      phone: '+996 (555) 11-22-33',
      whatsapp: '996555112233',
      hours: '09:00 – 23:00 (күн сайын)',
      map2GisUrl: 'https://2gis.kg/bishkek/inside/70000001019343846?m=74.6225%2C42.8242%2F16',
      yandexMapUrl: 'https://yandex.ru/maps/10309/bishkek/?ll=74.6225%2C42.8242&z=16',
      googleMapUrl: 'https://maps.google.com/?q=42.8242,74.6225',
      lat: 42.8242,
      lng: 74.6225,
      image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'west',
      name: {
        kg: '«Мукка» Батыш филиал (Манас / Чүй)',
        ru: '«Мукка» Западный филиал (Манас / Чуй)',
        en: 'Mukka West Branch (Manas / Chuy)'
      },
      address: {
        kg: 'Бишкек ш., Манас проспектиси 56 (Чүй проспектиси кесилиши)',
        ru: 'г. Бишкек, проспект Манаса 56 (пересекает пр. Чуй)',
        en: '56 Manas Avenue (cross Chuy Ave), Bishkek'
      },
      landmark: {
        kg: 'Улуттук Филармония жана Мэрия имаратына жакын',
        ru: 'Рядом с Национальной Филармонией и Мэрией',
        en: 'Near National Philharmonic Hall'
      },
      phone: '+996 (770) 33-44-55',
      whatsapp: '996770334455',
      hours: '09:00 – 23:00 (күн сайын)',
      map2GisUrl: 'https://2gis.kg/bishkek/inside/70000001019343846?m=74.5862%2C42.8756%2F16',
      yandexMapUrl: 'https://yandex.ru/maps/10309/bishkek/?ll=74.5862%2C42.8756&z=16',
      googleMapUrl: 'https://maps.google.com/?q=42.8756,74.5862',
      lat: 42.8756,
      lng: 74.5862,
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80'
    }
  ] as SpaBranch[],
  amenities: [
    {
      title: {
        kg: 'Арча буу фитобочкасы & Хаммам',
        ru: 'Кедровая фитобочка с арчой и Хаммам',
        en: 'Juniper Herbal Steam Barrel & Hammam'
      },
      desc: {
        kg: 'Ысык-Көл арчасы жана тоо чөптөрү менен денени токсиндерден тазалоо.',
        ru: 'Глубокое очищение и прогрев мышц с горной арчой и альпийскими травами.',
        en: 'Deep detox with organic Tian-Shan juniper mist & mountain herbs.'
      },
      icon: 'Flame'
    },
    {
      title: {
        kg: 'Ысык-Көл лавандасы & Чөп чайлары',
        ru: 'Чайная церемония и горный мед',
        en: 'Issyk-Kul Herbal Tea & Honey Ceremony'
      },
      desc: {
        kg: 'Массаждан соң акысыз ысык тоо балы, кургатылган жемиштер жана чөп чайы.',
        ru: 'Бесплатный высокогорный травяной чай с медом и сухофруктами после каждого сеанса.',
        en: 'Complimentary high-altitude herbal tea with pure alpine honey and dried fruits.'
      },
      icon: 'Coffee'
    },
    {
      title: {
        kg: 'Ароматтык 100% табигый майлар',
        ru: '100% натуральные эфирные и массажные масла',
        en: '100% Pure Essential & Cold-Pressed Oils'
      },
      desc: {
        kg: 'Тай кокос майы, миндаль, арган жана лаванда экстракттары.',
        ru: 'Тайское кокосовое масло холодного отжима, миндальное и аргановое масла.',
        en: 'Virgin Thai coconut oil, sweet almond, argan, and Tian-Shan lavender.'
      },
      icon: 'Sparkles'
    },
    {
      title: {
        kg: 'Жеке VIP Люкс бөлмөлөр',
        ru: 'Приватные VIP апартаменты для двоих и одного',
        en: 'Private VIP Couples & Individual Suites'
      },
      desc: {
        kg: 'Жеке душ, релакс музыкасы, шам жарыгы жана толук купуялуулук.',
        ru: 'Индивидуальный душ, медитативная музыка, свечи и абсолютная приватность.',
        en: 'Ensuite rainfall shower, ambient soundscape, candlelight, and total solitude.'
      },
      icon: 'ShieldCheck'
    }
  ]
};

export const SERVICES_LIST: MassageService[] = [
  {
    id: 'arashan-royal-signature',
    category: 'stone',
    name: {
      kg: '«Арашан Падышалык» Толук SPA-Ритуалы',
      ru: 'Королевский ритуал «Arashan Grand Signature»',
      en: 'Arashan Royal Signature Grand Ritual'
    },
    tagline: {
      kg: 'Ысык вулкан таштары, арча фитобочкасы жана тоо балы менен толук релакс',
      ru: 'Вулканические камни, фитобочка с арчой и горный медовый уход',
      en: 'Volcanic hot stone therapy, juniper steam barrel & honey body polish'
    },
    price: 4200,
    durationMin: 90,
    featured: true,
    intensity: {
      kg: 'Орточо',
      ru: 'Средний',
      en: 'Medium'
    },
    image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=800&q=80',
    description: {
      kg: 'Арашан спа салонунун эң белгилүү жана сүйүктүү падышалык топтому. Арча буусунда булчуңдарды жумшартуу, ысык базальт таштары менен омуртка бойлоп укалоо, табигый бал скрабы жана бетке муздак нефрит маскасы.',
      ru: 'Главная жемчужина нашего спа-салона. Распаривание в кедровой бочке с горной арчой, глубокий массаж горячими базальтовыми камнями, медовый скраб и омолаживающий нефритовый массаж лица.',
      en: 'Our pinnacle wellness ceremony. Juniper herbal steam prep, hot volcanic basalt stone gliding, raw alpine honey body polish, and cold jade stone facial sculpting.'
    },
    steps: {
      kg: [
        'Ысык-Көл чөп чайы жана арома-терапевттин кеңеши',
        'Арча жана тоо чөптөрү кошулган фитобочка буусу (15 мүн)',
        'Ысык базальт таштары менен бүт денени укалоо',
        'Арка жана бел булчуңдарынын оорусун басуу',
        'Тоо балы жана кофе менен табигый скраб',
        'Бетке муздак нефрит роллери жана азыктандыруучу маска',
        'Чөп чайы жана жемиштер менен эс алуу'
      ],
      ru: [
        'Чайная церемония и консультация мастера',
        'Прогрев в фитобочке с горной арчой (15 мин)',
        'Массаж всего тела горячими базальтовыми камнями',
        'Глубокая проработка мышц спины и шейно-воротниковой зоны',
        'Медовый пилинг с горным медом',
        'Охлаждающий нефритовый массаж лица и маска',
        'Отдых в чайной зоне с сухофруктами'
      ],
      en: [
        'Welcome herbal tea and consultation',
        'Tian-Shan juniper steam barrel preparation (15 min)',
        'Full body warm volcanic stone therapy',
        'Deep spinal and neck tension release',
        'Raw alpine honey & coffee body polish',
        'Cold jade stone facial drainage & hydration mask',
        'Lounge relaxation with herbal infusion'
      ]
    },
    benefits: {
      kg: ['Стрессти жана чарчоону 100% жок кылат', 'Уйкуну тереңдетет', 'Булчуңдардын кысылышын жазат', 'Терини жибектей жумшартат'],
      ru: ['Полное снятие стресса и усталости', 'Улучшение сна', 'Снятие мышечных зажимов', 'Глубокое питание кожи'],
      en: ['Total stress & chronic fatigue relief', 'Restores deep sleep cycle', 'Releases muscle tightness', 'Silky skin glow']
    },
    recommendedAddons: ['herbal-compress', 'foot-reflex']
  },
  {
    id: 'thai-traditional',
    category: 'thai',
    name: {
      kg: 'Салттуу Тай Массажы (Traditional Thai Yoga)',
      ru: 'Традиционный Тайский Йога-Массаж',
      en: 'Traditional Thai Yoga & Energy Line Massage'
    },
    tagline: {
      kg: 'Бангкок мектебинин чеберлеринен ийкемдүүлүк жана энергия агымы',
      ru: 'Древняя практика растяжек и проработки энергетических линий',
      en: 'Authentic passive yoga stretches and energy meridian work'
    },
    price: 2800,
    durationMin: 60,
    featured: true,
    intensity: {
      kg: 'Терең/Күчтүү',
      ru: 'Глубокий/Интенсивный',
      en: 'Deep/Intense'
    },
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
    description: {
      kg: 'Атайын табигый пахта кийиминде килемчеде жасалат. Йога көнүгүүлөрүнө окшогон пассивдүү чоюулар, муундарды ачуу жана дененин 10 негизги энергетикалык сызыктарын (Сен) басуу аркылуу омуртканы түзөйт.',
      ru: 'Выполняется на специальном мате в традиционной хлопковой одежде. Включает мягкие скручивания, растяжки и глубокое надавливание на энергетические меридианы Сен для восстановления гибкости.',
      en: 'Performed on a traditional floor futon wearing loose cotton attire. Integrates gentle acupressure, passive yoga stretches, and joint mobilization to unblock energy lines.'
    },
    steps: {
      kg: [
        'Таманды тоо тузу жана чөп тундурмасында жууп тазалоо',
        'Табигый тай пахта кийимин кийүү',
        'Буттан баштап моюнга чейин Сен сызыктарын басуу',
        'Омуртканы жана муундарды жумшак чоюу',
        'Баш жана чеке массажы'
      ],
      ru: [
        'Омовение ног с горной солью и аромамаслами',
        'Тайская хлопковая одежда для сеанса',
        'Проработка линий Сен от стоп к макушке',
        'Мягкие йога-скручивания и растяжка позвоночника',
        'Точечный массаж головы и висков'
      ],
      en: [
        'Foot soaking with mineral salts and essential oils',
        'Changing into loose linen Thai attire',
        'Progressive acupressure along Sen energy lines',
        'Passive spinal lengthening & pelvic stretches',
        'Cranial and temple pressure-point therapy'
      ]
    },
    benefits: {
      kg: ['Ийкемдүүлүктү арттырат', 'Омуртканын оорусун басат', 'Энергия деңгээлин жогорулатат', 'Муундардын кыймылын жеңилдетет'],
      ru: ['Повышает гибкость', 'Устраняет боли в спине', 'Заряжает энергией', 'Улучшает подвижность суставов'],
      en: ['Boosts full-body flexibility', 'Alleviates spinal compression', 'Restores vital energy flow', 'Relieves joint stiffness']
    },
    recommendedAddons: ['thai-herbal-ball', 'foot-reflex']
  },
  {
    id: 'classical-therapeutic',
    category: 'therapeutic',
    name: {
      kg: 'Дарылоо жана Классикалык Омуртка Массажы',
      ru: 'Лечебный и классический оздоровительный массаж',
      en: 'Therapeutic Clinical & Spinal Alignment Massage'
    },
    tagline: {
      kg: 'Моюн, далы жана бел ооруларын медициналык деңгээлде басуу',
      ru: 'Медицинский подход к устранению болей в спине, шее и пояснице',
      en: 'Medical-grade neuromuscular back, neck & spinal rehabilitation'
    },
    price: 2400,
    durationMin: 60,
    featured: true,
    intensity: {
      kg: 'Терең/Күчтүү',
      ru: 'Глубокий/Интенсивный',
      en: 'Deep/Intense'
    },
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: {
      kg: 'Көп отурган же оор жумуш кылган адамдар үчүн идеалдуу. Сколиоз, остеохондроз жана булчуң спазмдарын жазып, кан айланууну жакшыртат. Дипломдуу дарыгер-реабилитологдор тарабынан жасалат.',
      ru: 'Идеально при сидячей работе, остеохондрозе, протрузиях и скованности мышц. Выполняется сертифицированными мастерами с медицинским образованием.',
      en: 'Targeted clinical therapy for office workers and sedentary lifestyle. Dissolves trigger points, relieves sciatica, and corrects posture under certified rehabilitators.'
    },
    steps: {
      kg: [
        'Омуртканын абалын диагностикалоо',
        'Жылытуучу арча майын сүйкөө',
        'Моюн-далы зонасынын катып калган түйүндөрүн жазуу',
        'Бел жана куймулчак булчуңдарын терең укалоо',
        'Омуртканын кыймылдуулугун калыбына келтирүү'
      ],
      ru: [
        'Диагностика состояния позвоночника и мышц',
        'Нанесение согревающего масла с арчой',
        'Проработка триггерных точек шейно-воротниковой зоны',
        'Глубокий массаж пояснично-крестцового отдела',
        'Постизометрическая релаксация'
      ],
      en: [
        'Spinal biomechanics & postural assessment',
        'Warm Tian-Shan juniper therapeutic oil application',
        'Cervical & upper trapezius trigger point deactivation',
        'Deep lumbar and gluteal neuromuscular therapy',
        'Post-isometric stretching'
      ]
    },
    benefits: {
      kg: ['Моюн жана баш оорусун басат', 'Белдеги чыңалууну жок кылат', 'Кан басымын нормалдаштырат', 'Туура турпатты калыбына келтирет'],
      ru: ['Устраняет головные боли и спазмы шеи', 'Снимает зажимы в пояснице', 'Улучшает осанку', 'Нормализует кровообращение'],
      en: ['Eliminates tension headaches & neck stiffness', 'Relieves lower back pain', 'Improves spinal posture', 'Boosts circulation']
    },
    recommendedAddons: ['cupping-therapy', 'herbal-compress']
  },
  {
    id: 'aromatherapy-relax',
    category: 'relax_aroma',
    name: {
      kg: 'Ысык-Көл Лавандасы Ароматерапия & Релакс',
      ru: 'Ароматерапевтический Релакс-массаж с Иссык-Кульской лавандой',
      en: 'Issyk-Kul Lavender Aromatherapy & Deep Rest Massage'
    },
    tagline: {
      kg: 'Стрессти унутуп, жан дүйнөнү жана денени толук тынчтандыруу',
      ru: 'Нежные скользящие движения, эфирные масла и полное расслабление',
      en: 'Gentle rhythmic strokes with wild mountain lavender & neroli'
    },
    price: 2500,
    durationMin: 60,
    featured: false,
    intensity: {
      kg: 'Жумшак',
      ru: 'Мягкий',
      en: 'Gentle'
    },
    image: 'https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?auto=format&fit=crop&w=800&q=80',
    description: {
      kg: 'Жумшак, толкун сымал кыймылдар жана Ысык-Көл тоолорунан чогултулган органикалык лаванда, сандал жана розмарин эфир майлары. Нерв системасын тынчтандырып, уйкусуздукту дарылайт.',
      ru: 'Мягкие плавные движения в сочетании с натуральными эфирными маслами горной лаванды, нероли и сандала. Идеально для снятия эмоционального выгорания и тревожности.',
      en: 'Seamless flowing Swedish strokes infused with organic wild Issyk-Kul lavender, sandalwood, and sweet orange. Calms the nervous system and reboots mood.'
    },
    steps: {
      kg: [
        'Эфир майын жеке каалоого жараша тандап алуу',
        'Шам жарыгы жана медитациялык тынч музыка',
        'Тамандан башка чейин жумшак лимфодренаждык сылоо',
        'Баштын жана чекенин релакс массажы',
        'Жылуу чөп компресси'
      ],
      ru: [
        'Индивидуальный подбор композиции эфирных масел',
        'Атмосфера при свечах и расслабляющая музыка',
        'Мягкие лимфодренажные движения по всему телу',
        'Массаж кожи головы и височной зоны',
        'Теплый травяной компресс'
      ],
      en: [
        'Custom aromatherapy essence selection',
        'Candlelight and ambient sound therapy setup',
        'Gentle rhythmic full-body Swedish effleurage',
        'Soothing scalp, neck and temple relaxation',
        'Warm herbal towel finish'
      ]
    },
    benefits: {
      kg: ['Уйкусуздукту жана стрессти жеңет', 'Эмоционалдык чарчоону басат', 'Терини терең азыктандырат', 'Тынчтык тартуулайт'],
      ru: ['Устраняет бессонницу', 'Снимает нервное напряжение', 'Увлажняет кожу', 'Дарит глубокий покой'],
      en: ['Overcomes insomnia & anxiety', 'Emotional rejuvenation', 'Hydrates sensitive skin', 'Induces blissful peace']
    },
    recommendedAddons: ['face-mask-gold', 'foot-reflex']
  },
  {
    id: 'four-hands-royal',
    category: 'stone',
    name: {
      kg: '4 Колдуу Падышалык Синхрондуу Массаж',
      ru: 'Королевский массаж в 4 руки (Синхронный)',
      en: 'Royal 4-Hands Synchronized Harmony Massage'
    },
    tagline: {
      kg: 'Эки тажрыйбалуу чебердин бир убакта кереметтүү синхрондуу укалоосу',
      ru: 'Синхронная работа двух топ-мастеров для двойного эффекта',
      en: 'Two master therapists in seamless choreographed harmony'
    },
    price: 5200,
    durationMin: 60,
    featured: true,
    intensity: {
      kg: 'Орточо',
      ru: 'Средний',
      en: 'Medium'
    },
    image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80',
    description: {
      kg: 'Эки чебер бирдей ылдамдыкта жана синхрондуу кыймылдар менен денеңизди укалайт. Мээ эки түрдүү тийүүнү бир убакта көзөмөлдөй албай калып, тез арада терең транска жана толук релаксацияга өтөт.',
      ru: 'Два мастера одновременно массируют тело в едином ритме. Мозг отключает контроль, погружая вас в состояние медитативного блаженства и глубокого восстановления.',
      en: 'Two experienced therapists work in perfect unison. The brain quickly surrenders analytical control, plunging consciousness into deep meditative rejuvenation.'
    },
    steps: {
      kg: [
        'Эки чебердин биргелешкен даярдыгы',
        'Жылытылган кокос жана арган майларын сүйкөө',
        'Синхрондуу арка жана бут кыймылдары',
        'Баш жана таманды бир убакта укалоо',
        'Тоо чөптөрү менен денени тынчтандыруу'
      ],
      ru: [
        'Синхронная подготовка двух мастеров',
        'Нанесение теплого кокосового и арганового масла',
        'Синхронные массажные движения по всему телу',
        'Одновременная проработка головы и стоп',
        'Завершающий ритуал с травяным чаем'
      ],
      en: [
        'Dual therapist synchronization prep',
        'Warm organic coconut and argan oil glaze',
        'Mirror-choreographed body strokes',
        'Simultaneous scalp and reflexology points',
        'Harmonizing herbal tea closure'
      ]
    },
    benefits: {
      kg: ['Эки эсе тез эс алуу', 'Мээдеги ойлорду толук өчүрөт', 'Булчуңдарды терең бошотот', 'Уникалдуу тажрыйба'],
      ru: ['Двойная глубина расслабления', 'Полная перезагрузка сознания', 'Быстрое восстановление сил', 'Незабываемые ощущения'],
      en: ['2x deeper relaxation', 'Total mental decluttering', 'Accelerated muscle recovery', 'Pinnacle luxury experience']
    },
    recommendedAddons: ['herbal-compress', 'face-mask-gold']
  },
  {
    id: 'sports-deep-tissue',
    category: 'therapeutic',
    name: {
      kg: 'Спорттук & Терең Булчуң Массажы (Deep Tissue)',
      ru: 'Спортивный и глубокотканный массаж (Deep Tissue)',
      en: 'Sports Deep Tissue & Athletic Recovery'
    },
    tagline: {
      kg: 'Спорттон жана машыгуудан кийин сүт кислотасын чыгарып, күчтү калыбына келтирүү',
      ru: 'Интенсивная проработка фасций, снятие гипертонуса и крепатуры',
      en: 'Fascial release, lactic acid flush & high-performance restoration'
    },
    price: 2700,
    durationMin: 60,
    featured: false,
    intensity: {
      kg: 'Терең/Күчтүү',
      ru: 'Глубокий/Интенсивный',
      en: 'Deep/Intense'
    },
    image: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?auto=format&fit=crop&w=800&q=80',
    description: {
      kg: 'Спортчулар, фитнес сүйүүчүлөрү жана денеси дайыма катуу чыңалган адамдар үчүн. Булчуңдардын терең катмарларына басым жасалып, спазмдарды жана сүт кислотасын жок кылат.',
      ru: 'Для спортсменов и людей с высокой физической нагрузкой. Глубокое воздействие на фасции и мышцы, выведение молочной кислоты, предотвращение травм.',
      en: 'Geared towards athletes and active individuals. Penetrates deep muscle layers to break down adhesions, flush lactic acid, and increase range of motion.'
    },
    steps: {
      kg: [
        'Булчуңдардын гипертонусун аныктоо',
        'Жалбыз жана эвкалипт майы менен жылытуу',
        'Чыканак жана баш бармак менен терең басуу',
        'Фасцияларды бошотуу жана триггер чекиттерин жазуу',
        'Муздатуучу гель менен бүтүрүү'
      ],
      ru: [
        'Оценка мышечного тонуса и зон напряжения',
        'Разогрев с маслом мяты и эвкалипта',
        'Силовая проработка локтями и предплечьями',
        'Фасциальный релиз и триггерные точки',
        'Нанесение охлаждающего спортивного геля'
      ],
      en: [
        'Muscle tone & hypertonicity screening',
        'Peppermint and eucalyptus thermal prep',
        'Forearm and elbow deep-pressure friction',
        'Myofascial release & trigger decompression',
        'Cryo-herbal cooling gel application'
      ]
    },
    benefits: {
      kg: ['Булчуң оорусун 80% азайтат', 'Кыймыл диапазонун кеңейтет', 'Травмалардын алдын алат', 'Күчтү тез калыбына келтирет'],
      ru: ['Быстро снимает крепатуру', 'Увеличивает амплитуду движений', 'Предотвращает травмы', 'Ускоряет восстановление'],
      en: ['Flushes lactic acid rapidly', 'Restores athletic mobility', 'Prevents sports injuries', 'Accelerates recovery']
    },
    recommendedAddons: ['cupping-therapy']
  },
  {
    id: 'anti-cellulite-slimming',
    category: 'anti_cellulite',
    name: {
      kg: 'Скульптуралык Антицеллюлит & Лимфодренаж',
      ru: 'Антицеллюлитный моделирующий и лимфодренажный массаж',
      en: 'Sculpting Anti-Cellulite & Lymphatic Drainage'
    },
    tagline: {
      kg: 'Шишиктерди кетирип, дененин сымбатын жана теринин бекемдигин арттыруу',
      ru: 'Уменьшение объемов, вывод лишней жидкости и подтяжка кожи',
      en: 'Inch loss, toxin drainage & skin elasticity toning'
    },
    price: 2600,
    durationMin: 60,
    featured: false,
    intensity: {
      kg: 'Терең/Күчтүү',
      ru: 'Глубокий/Интенсивный',
      en: 'Deep/Intense'
    },
    image: 'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=800&q=80',
    description: {
      kg: 'Сан, курсак жана жамбаш аймактарындагы май катмарларын майдалоо, лимфа агымын тездетүү жана теринин тургорун жогорулатуу. Табигый цитрус жана бал майлары колдонулат.',
      ru: 'Эффективная ручная и баночная методика для бедер, ягодиц и живота. Улучшает микроциркуляцию, выводит избыточную жидкость и разглаживает рельеф кожи.',
      en: 'Intensive manual sculpting and silicone cupping targeting thighs, abdomen and glutes. Stimulates lymphatic circulation and smoothes skin dimples.'
    },
    steps: {
      kg: [
        'Лимфа түйүндөрүн ачуу жана даярдоо',
        'Грейпфрут жана корица майы менен активдүү укалоо',
        'Силикон вакуум банкалары менен иштөө',
        'Термо-оронуу же муздатуучу спрей',
        'Апельсин чайы'
      ],
      ru: [
        'Активация лимфатических коллекторов',
        'Энергичный ручной массаж с грейпфрутовым маслом',
        'Вакуумная баночная проработка проблемных зон',
        'Антицеллюлитное обертывание или термогель',
        'Тонизирующий цитрусовый чай'
      ],
      en: [
        'Lymphatic node drainage activation',
        'Vigorous manual kneading with pink grapefruit oil',
        'Vacuum cupping on target areas',
        'Thermal slimming body wrap',
        'Citrus detox infusion'
      ]
    },
    benefits: {
      kg: ['Дененин көлөмүн 2-4 см азайтат', 'Терини жылмакай жана бекем кылат', 'Шишиктерди тез чыгарат', 'Метаболизмди ылдамдатат'],
      ru: ['Уменьшение объемов на 2-4 см', 'Гладкость и упругость кожи', 'Снятие отечности', 'Ускорение метаболизма'],
      en: ['Noticeable contour reduction', 'Firm and toned skin surface', 'Flushes fluid retention', 'Stimulates cellular metabolism']
    },
    recommendedAddons: ['honey-scrub', 'algae-wrap']
  },
  {
    id: 'couples-romantic-spa',
    category: 'couples',
    name: {
      kg: '«Жубайлар Үчүн Романтикалык Арашан» SPA',
      ru: 'Романтический SPA для двоих «Arashan Harmony»',
      en: 'Couples Romantic Arashan VIP Spa Sanctuary'
    },
    tagline: {
      kg: 'Эки кишилик жеке VIP люксте шам жарыгы, массаж жана жемиштер',
      ru: 'Приватный люкс для двоих, массаж при свечах, фрукты и чай',
      en: 'Private luxury suite for two with candlelight massage & fruit board'
    },
    price: 6500,
    durationMin: 90,
    featured: true,
    intensity: {
      kg: 'Жумшак',
      ru: 'Мягкий',
      en: 'Gentle'
    },
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    description: {
      kg: 'Жубайлар, түгөйлөр же достор үчүн унутулгус романтикалык эс алуу. Жеке VIP бөлмө, жанаша жайгашкан массаж столдору, роза гүлдөрү, жыпар жыттуу шамдар, тоо чайы жана жемиштер.',
      ru: 'Идеальное свидание и отдых для пары в изолированном VIP-сьюте. Два массажных стола рядом, лепестки роз, свечи, ароматерапевтический массаж и чайная церемония с клубникой и фруктами.',
      en: 'An unforgettable private sanctuary for couples. Side-by-side massage tables in our VIP suite adorned with rose petals, ambient candles, aromatherapy massage, and fresh fruits with alpine tea.'
    },
    steps: {
      kg: [
        'Жеке VIP Люкс бөлмөгө кирүү',
        'Арча фитобочкасында биргелешкен буулоо',
        'Эки мастерден бир убакта арома-релакс массажы',
        'Бетке нымдандыруучу маска',
        'Жаңы мөмө-жемиштер, жаңгактар жана тоо чайы'
      ],
      ru: [
        'Встреча в приватном VIP-сьюте со свечами',
        'Прогрев в фитобочке с горными травами',
        'Одновременный аромамассаж от двух мастеров',
        'Увлажняющая маска для лица для двоих',
        'Романтическая чайная церемония с фруктами и медом'
      ],
      en: [
        'Welcome to candlelight private VIP suite',
        'Couples herbal steam preparation',
        'Simultaneous side-by-side aromatherapy massage',
        'Hydrating facial treatment for both guests',
        'Gourmet fruit board with Tian-Shan tea'
      ]
    },
    benefits: {
      kg: ['Биргелешкен романтикалык атмосфера', 'Толук эс алуу жана стресстен арылуу', 'Эсте калаарлык белек', 'VIP купуялуулук'],
      ru: ['Незабываемые романтические эмоции', 'Глубокий релакс для двоих', 'Идеальный подарок на годовщину', 'Полная приватность'],
      en: ['Unforgettable shared intimacy', 'Deep restoration for two', 'Perfect gift or anniversary date', 'Ultimate luxury privacy']
    },
    recommendedAddons: ['face-mask-gold', 'foot-reflex']
  },
  {
    id: 'facial-kobido-sculpting',
    category: 'facial',
    name: {
      kg: 'Бетке Жапондук «Кобидо» & Скульптуралык Массаж',
      ru: 'Японский массаж лица «Кобидо» и скульптурный лифтинг',
      en: 'Japanese Kobido & Buccal Facial Sculpting'
    },
    tagline: {
      kg: 'Инъекциясыз табигый бетти жашартуу, бырыштарды жазуу жана лифтинг',
      ru: 'Безоперационная подтяжка лица, четкий овал и сияние кожи',
      en: 'Non-invasive natural facelift, cheekbone definition & radiant glow'
    },
    price: 2300,
    durationMin: 50,
    featured: false,
    intensity: {
      kg: 'Жумшак',
      ru: 'Мягкий',
      en: 'Gentle'
    },
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80',
    description: {
      kg: 'Жапондук императордук ыкма. Бет булчуңдарын терең укалоо, жаак сызыгын тактоо, көз алдындагы шишиктерди жана майда бырыштарды кетирет. 1 сеанстан кийин эле бет 5 жашка жашарат.',
      ru: 'Древняя японская методика омоложения. Глубокая проработка мимических мышц, моделирование скул и подбородка, снятие отечности и лифтинг-эффект с первого сеанса.',
      en: 'Ancient Japanese imperial technique combining buccal and myofascial strokes to lift cheekbones, sharpen jawline definition, and trigger natural collagen production.'
    },
    steps: {
      kg: [
        'Терини органикалык суу менен тазалоо',
        'Далы жана моюн зонасын бошотуу',
        'Кобидо ыкмасында бет булчуңдарын активдештирүү',
        'Нефрит Гуаша ташы менен лимфодренаж',
        'Гиалурон кислотасы жана алтын маска'
      ],
      ru: [
        'Бережное демакияж и очищение кожи',
        'Расслабление шейно-воротниковой зоны и декольте',
        'Скульптурный массаж лица в технике Кобидо',
        'Лимфодренаж скребком Гуаша из натурального нефрита',
        'Нанесение сыворотки с гиалуроновой кислотой и маски'
      ],
      en: [
        'Gentle cleansing & botanical toning',
        'Neck, decollete and shoulder tension release',
        'Fast-paced Kobido muscle stimulation',
        'Natural jade Gua Sha lymphatic sculpting',
        'Hyaluronic peptide serum and gold soothing mask'
      ]
    },
    benefits: {
      kg: ['Беттин контурун тартып, жашартат', 'Көздүн шишигин кетирет', 'Бырыштарды жылмалайт', 'Териге табигый жылтырактык берет'],
      ru: ['Четкий овал лица и эффект лифтинга', 'Устранение отеков под глазами', 'Разглаживание мимических морщин', 'Здоровый румянец'],
      en: ['Visibly lifted facial contour', 'Banish eye puffiness', 'Smoothes fine expression lines', 'Instant natural radiance']
    },
    recommendedAddons: ['face-mask-gold']
  }
];

export const SERVICE_ADDONS: ServiceAddon[] = [
  {
    id: 'herbal-steam-barrel',
    name: {
      kg: 'Арча фитобочкасында буулануу (15 мүн)',
      ru: 'Кедровая фитобочка с горной арчой (15 мин)',
      en: 'Tian-Shan Juniper Steam Barrel (15 min)'
    },
    price: 600,
    durationMin: 15,
    description: {
      kg: 'Массаждын алдында денени жылытып, тешиктерди ачып, токсиндерди чыгарат.',
      ru: 'Глубокий прогрев мышц паром с экстрактом арчи перед массажем.',
      en: 'Deep thermal pre-massage warmup infused with organic juniper mist.'
    }
  },
  {
    id: 'honey-scrub',
    name: {
      kg: 'Табигый тоо балы жана кофе скрабы',
      ru: 'Пилинг горным медом и арабикой',
      en: 'Raw Alpine Honey & Arabica Body Polish'
    },
    price: 800,
    durationMin: 20,
    description: {
      kg: 'Өлүк клеткаларды тазалап, терини жибектей жумшак жана жылмакай кылат.',
      ru: 'Нежное отшелушивание и глубокое питание кожи микроэлементами меда.',
      en: 'Gentle exfoliation leaving skin exceptionally soft, nourished and glowing.'
    }
  },
  {
    id: 'thai-herbal-ball',
    name: {
      kg: 'Ысык Тай чөп баштыкчалары (Herbal Compress)',
      ru: 'Горячие тайские травяные мешочки (Herbal Compress)',
      en: 'Steamed Thai Herbal Compress Infusion'
    },
    price: 700,
    durationMin: 15,
    description: {
      kg: 'Имбирь, куркума жана лемонграсс кошулган ысык баштыкчалар менен басуу.',
      ru: 'Прогрев биологически активных точек горячими мешочками с лемонграссом и имбирем.',
      en: 'Therapeutic heated poultices packed with organic ginger, turmeric & lemongrass.'
    }
  },
  {
    id: 'foot-reflex',
    name: {
      kg: 'Таман жана бут рефлексологиясы (20 мүн)',
      ru: 'Тайский рефлекторный массаж стоп (20 мин)',
      en: 'Thai Acupressure Foot Reflexology (20 min)'
    },
    price: 700,
    durationMin: 20,
    description: {
      kg: 'Тамандагы бүт органдарга жооптуу биологиялык чекиттерди атайын жыгач таякча менен басуу.',
      ru: 'Проработка акупунктурных точек стопы специальной палочкой из тикового дерева.',
      en: 'Stimulates vital organ reflexes via traditional teak wood acupressure wand.'
    }
  },
  {
    id: 'face-mask-gold',
    name: {
      kg: '24K Алтын & Коллаген бет маскасы',
      ru: 'Маска для лица с 24K золотом и коллагеном',
      en: '24K Gold Collagen Rejuvenating Hydro-Mask'
    },
    price: 600,
    durationMin: 15,
    description: {
      kg: 'Массаж учурунда бет терисин нымдап, майда бырыштарды тегиздейт.',
      ru: 'Глубокое увлажнение и антивозрастной уход за кожей лица во время массажа.',
      en: 'Deep peptide hydration applied during massage to restore radiant facial glow.'
    }
  }
];

export const MASTER_THERAPISTS: MasterTherapist[] = [
  {
    id: 'aigul-bakirova',
    name: 'Айгүл Бакирова',
    title: {
      kg: 'Башкы Реабилитолог & Дарылоо Массажынын Чебери',
      ru: 'Главный врач-реабилитолог, специалист лечебного массажа',
      en: 'Chief Medical Rehabilitator & Spinal Alignment Specialist'
    },
    bio: {
      kg: 'Кыргыз мамлекеттик медициналык академиясын (КГМА) аяктаган, 14 жылдык тажрыйбасы бар реабилитолог. Омуртка грыжалары, сколиоз жана остеохондроз ооруларын калыбына келтирүү боюнча Бишкектин эң таанымал адиси.',
      ru: 'Выпускница КГМА с 14-летним стажем. Эксперт по устранению болей в спине, лечению остеохондроза и восстановлению подвижности суставов.',
      en: 'Medical graduate with 14 years of clinical rehabilitation experience. Renowned across Bishkek for non-surgical herniated disc & spinal rehabilitation.'
    },
    experienceYears: 14,
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewCount: 420,
    specialties: {
      kg: ['Дарылоо массажы', 'Омуртка түзөө', 'Остеохондрозду басуу', 'Постизометрия'],
      ru: ['Лечебный массаж', 'Коррекция позвоночника', 'Устранение триггеров', 'Постизометрия'],
      en: ['Clinical Spinal Alignment', 'Myofascial Trigger Release', 'Sciatica Therapy']
    },
    certificates: ['Диплом КГМА (Неврология & Реабилитация)', 'Сертификат WCPT (World Physiotherapy)', 'Кинезиотейпинг'],
    favoriteTechnique: {
      kg: 'Омуртка боюндагы терең паравертебралдык түйүндөрдү бошотуу',
      ru: 'Глубокая паравертебральная проработка околопозвоночных мышц',
      en: 'Deep paravertebral neuromuscular deactivation'
    },
    availableDays: ['Дүйшөмбү', 'Шейшемби', 'Шаршемби', 'Бейшемби', 'Жума'],
    branch: 'Борбордук филиал (Эркиндик)'
  },
  {
    id: 'narin-piyapong',
    name: 'Нарин Пияпонг (Narin Piyapong)',
    title: {
      kg: 'Салттуу Тай Массажынын Топ-Мастери (Бангкок, Ват Пхо)',
      ru: 'Топ-мастер традиционного тайского массажа (Бангкок, Ват Пхо)',
      en: 'Certified Traditional Thai Master (Wat Pho Academy, Bangkok)'
    },
    bio: {
      kg: 'Бангкоктогу дүйнөгө белгилүү Wat Pho салттуу медицина мектебинин сертификатталган чебери. 11 жылдан бери Азиянын жана Европанын беш жылдыздуу спа борборлорунда эмгектенген.',
      ru: 'Дипломированный мастер легендарной школы Ват Пхо (Бангкок, Таиланд). 11 лет опыта в премиальных спа-курортах Азии. Виртуоз йога-массажа и рефлексологии.',
      en: 'Certified graduate of Bangkok’s world-renowned Wat Pho Medical College with 11 years across 5-star Asian resorts. Master of Sen meridian alignment.'
    },
    experienceYears: 11,
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80',
    rating: 4.99,
    reviewCount: 385,
    specialties: {
      kg: ['Классикалык Тай массажы', 'Тай чөп баштыкчалары', 'Таман рефлексологиясы', 'Йога-чоюлуу'],
      ru: ['Тайский йога-массаж', 'Травяные мешочки', 'Рефлексология стоп', 'Сен-терапия'],
      en: ['Traditional Thai Yoga', 'Herbal Poultices', 'Foot Reflexology', 'Passive Stretches']
    },
    certificates: ['Wat Pho Traditional Medical School Diploma, Bangkok', 'Thai Ministry of Public Health Certified'],
    favoriteTechnique: {
      kg: 'Алакан жана чыканак менен Сен энергетикалык сызыктарын басуу',
      ru: 'Акупрессура линий Сен ладонями и мягкие скручивания',
      en: 'Acupressure along Sen lines with palm & thumb precision'
    },
    availableDays: ['Шейшемби', 'Шаршемби', 'Бейшемби', 'Ишемби', 'Жекшемби'],
    branch: 'Түштүк филиал (Токомбаев)'
  },
  {
    id: 'azamat-esenaliev',
    name: 'Азамат Эсеналиев',
    title: {
      kg: 'Спорттук жана Deep Tissue Массажисти',
      ru: 'Мастер спортивного и глубокотканного массажа',
      en: 'Sports & Deep Tissue Performance Specialist'
    },
    bio: {
      kg: 'Кыргызстандын улуттук курама командаларынын мурдагы массажисти. Булчуңдардын күчтүү чыңалуусун, спазмдарын жана оор машыгуулардан кийинки чарчоону 1 сеанста жазат.',
      ru: '9 лет опыта работы со спортсменами олимпийского уровня. Мастер глубокого силового массажа, фасциального релиза и быстрого восстановления мышечного тонуса.',
      en: '9 years of athletic therapy with national sports teams. Specialist in vigorous myofascial release, deep tissue decompression, and sports trauma prevention.'
    },
    experienceYears: 9,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    rating: 4.98,
    reviewCount: 310,
    specialties: {
      kg: ['Спорттук массаж', 'Deep Tissue', 'Фасциялык релиз', 'Банка терапиясы'],
      ru: ['Спортивный массаж', 'Deep Tissue', 'Фасциальный релиз', 'Баночный массаж'],
      en: ['Sports Recovery', 'Deep Tissue', 'Myofascial Release', 'Cupping Therapy']
    },
    certificates: ['Сертификат Физкультура жана Спорт Академиясы', 'International Sports Massage Association (ISMA)'],
    favoriteTechnique: {
      kg: 'Чыканак менен терең триггер чекиттерин жазуу жана фасцияны сунуу',
      ru: 'Силовая проработка фасций локтем и растирания',
      en: 'Deep elbow friction and myofascial elongation'
    },
    availableDays: ['Дүйшөмбү', 'Бейшемби', 'Жума', 'Ишемби', 'Жекшемби'],
    branch: 'Батыш филиал (Манас)'
  },
  {
    id: 'kamila-zhumabaeva',
    name: 'Камила Жумабаева',
    title: {
      kg: 'Ароматерапевт, Стоун-Терапевт & Кобидо Чебери',
      ru: 'Ароматерапевт, мастер стоун-терапии и массажа Кобидо',
      en: 'Master Aromatherapist, Stone Healer & Kobido Facialist'
    },
    bio: {
      kg: 'Швейцария жана Москванын эл аралык спа мектептеринен билим алган. Ысык таштар менен дарылоо, Ысык-Көл лавандасы менен антистресс релакс жана бетти скульптуралык жашартуу боюнча адис.',
      ru: 'Сертифицированный мастер спа-техник. 8 лет практики в методиках глубокой релаксации горячими камнями, ароматерапии и японского лифтинга лица Кобидо.',
      en: 'Trained in Switzerland & Moscow. Specializes in volcanic hot stone therapy, alpine botanical aromatherapy, and Japanese royal Kobido facial lifting.'
    },
    experienceYears: 8,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    rating: 5.0,
    reviewCount: 295,
    specialties: {
      kg: ['Ысык таш (Stone)', 'Арома-релакс', 'Кобидо бет массажы', 'Жубайлар SPA'],
      ru: ['Стоун-терапия', 'Арома-релакс', 'Массаж Кобидо', 'СПА для пар'],
      en: ['Hot Stone Therapy', 'Aromatherapy Relax', 'Kobido Facial', 'Couples Spa']
    },
    certificates: ['International Spa Academy CIDESCO', 'Certified Kobido Facialist (Tokyo School)'],
    favoriteTechnique: {
      kg: 'Жылуу базальт таштары менен омуртка жана далы бойлоп жылмышуу',
      ru: 'Плавное скольжение горячими базальтовыми камнями по меридианам спины',
      en: 'Effleurage with hot volcanic basalt stones along energy meridians'
    },
    availableDays: ['Шейшемби', 'Шаршемби', 'Жума', 'Ишемби', 'Жекшемби'],
    branch: 'Борбордук филиал (Эркиндик)'
  }
];

export const BODY_SYMPTOMS: BodySymptomMatch[] = [
  {
    id: 'symptom-neck',
    title: {
      kg: 'Моюн жана далы катып, баш ооруп жатат',
      ru: 'Затекла шея, спазмы в плечах и головная боль',
      en: 'Stiff neck, trapezius tension & headache'
    },
    bodyArea: 'neck_shoulders',
    icon: 'Activity',
    recommendedServiceId: 'classical-therapeutic',
    recommendedDuration: '60 мүнөт',
    advice: {
      kg: 'Компьютерде көп отуруудан моюндун паравертебралдык булчуңдары кысылат. Сизге дарылоо массажы жана арча буусу сунушталат.',
      ru: 'Спазм трапециевидных мышц нарушает приток крови к голове. Рекомендуем лечебный массаж шейно-воротниковой зоны.',
      en: 'Prolonged screen time compresses cervical vertebrae. Clinical therapy releases trigger knots immediately.'
    }
  },
  {
    id: 'symptom-lower-back',
    title: {
      kg: 'Бел, куймулчак жана омуртка ооруйт',
      ru: 'Боли и скованность в пояснице и крестце',
      en: 'Lower back ache, sciatica & lumbar stiffness'
    },
    bodyArea: 'lower_back',
    icon: 'Shield',
    recommendedServiceId: 'classical-therapeutic',
    recommendedDuration: '60-90 мүнөт',
    advice: {
      kg: 'Белдин чыңалуусу нервдерди кысышы мүмкүн. Жылуу базальт таштары же классикалык дарылоо массажы ооруну дароо жеңилдетет.',
      ru: 'Хронический гипертонус поясницы. Рекомендуем сеанс классического или стоун-массажа с прогревом арчой.',
      en: 'Lumbar hypertonicity pinches nerves. Warm volcanic stones and clinical alignments give instant decompression.'
    }
  },
  {
    id: 'symptom-stress-insomnia',
    title: {
      kg: 'Нервдик чарчоо, стресс жана начар уйку',
      ru: 'Хронический стресс, выгорание и бессонница',
      en: 'Chronic stress, mental burnout & insomnia'
    },
    bodyArea: 'full_body_stress',
    icon: 'Sparkles',
    recommendedServiceId: 'arashan-royal-signature',
    recommendedDuration: '90 мүнөт',
    advice: {
      kg: 'Мээ жана нерв системасы тыныгууга муктаж. Ысык-Көл лавандасы кошулган «Арашан Падышалык» ритуалы же 4 колдуу массаж уйкуну калыбына келтирет.',
      ru: 'Нервной системе требуется глубокая сенсорная перезагрузка. Идеально подойдет ритуал «Arashan Grand» или массаж в 4 руки.',
      en: 'Your nervous system needs sensory reset. Issyk-Kul lavender aromatherapy & hot stones will reboot your circadian rhythm.'
    }
  },
  {
    id: 'symptom-post-workout',
    title: {
      kg: 'Машыгуудан кийинки булчуңдардын оорусу (крепатура)',
      ru: 'Крепатура и забитые мышцы после спортзала',
      en: 'Post-workout soreness & lactic acid buildup'
    },
    bodyArea: 'post_workout',
    icon: 'Flame',
    recommendedServiceId: 'sports-deep-tissue',
    recommendedDuration: '60 мүнөт',
    advice: {
      kg: 'Сүт кислотасын чыгарып, фасцияларды бошотуу зарыл. Deep Tissue күчтүү массажы булчуңдарды 1 күндө калыбына келтирет.',
      ru: 'Необходим активный лимфодренаж и фасциальный релиз. Спортивный массаж Deep Tissue снимет боль за один сеанс.',
      en: 'Accelerate lactic acid clearance with vigorous deep tissue friction and myofascial elongation.'
    }
  },
  {
    id: 'symptom-tired-legs',
    title: {
      kg: 'Буттар шишип, таманда оордук сезилет',
      ru: 'Тяжесть, отеки в ногах и усталость стоп',
      en: 'Heavy tired legs, swelling & foot fatigue'
    },
    bodyArea: 'legs_feet',
    icon: 'Smile',
    recommendedServiceId: 'thai-traditional',
    recommendedDuration: '60 мүнөт',
    advice: {
      kg: 'Күн бою бутта туруудан кан айлануу жайлайт. Салттуу тай массажы жана таман рефлексологиясы бутка жеңилдик тартуулайт.',
      ru: 'Застой лимфы в нижних конечностях. Традиционный тайский массаж и рефлексология стоп вернут легкость походке.',
      en: 'Sedentary or standing fatigue causes fluid pooling. Thai yoga stretches and reflexology restore lightness.'
    }
  },
  {
    id: 'symptom-facial-puffiness',
    title: {
      kg: 'Бет шишип, чарчаңкы көрүнүп, бырыштар пайда болду',
      ru: 'Отечность лица, потеря тонуса и усталый вид',
      en: 'Facial puffiness, loss of elasticity & dull skin'
    },
    bodyArea: 'face_lymph',
    icon: 'Sun',
    recommendedServiceId: 'facial-kobido-sculpting',
    recommendedDuration: '50 мүнөт',
    advice: {
      kg: 'Жапондук «Кобидо» скульптуралык массажы беттин олуттуу лифтингин камсыздап, жаак сызыгын ачып, жаштыкты кайтарат.',
      ru: 'Японский массаж Кобидо разгонит лимфу, подтянет овал лица и вернет свежий отдохнувший вид без уколов.',
      en: 'Kobido sculpting facial boosts blood flow, drains lymph nodes and sharpens jawlines naturally.'
    }
  }
];

export const MEMBERSHIP_TIERS: MembershipTier[] = [
  {
    id: 'light-wellness',
    name: '«Жеңилдик» Баштапкы Абонементи',
    tierSubtitle: {
      kg: 'Айына 4 сеанс каалаган классикалык же тай массажы',
      ru: '4 сеанса классического или тайского массажа в месяц',
      en: '4 sessions of classic or Thai massage per month'
    },
    monthlyPrice: 8500,
    featured: false,
    sessionsCount: '4 сеанс (60 мүнөттөн)',
    badgeColor: 'border-emerald-800/40 bg-slate-900/70',
    perks: {
      kg: [
        'Айына 4 жолу толук 60 мүнөттүк массаж',
        'Филиалды жана сүйүктүү мастерди тандоо укугу',
        'Акысыз Ысык-Көл чөп чай аземи жана тоо балы',
        'Кошумча спа кызматтарга 10% арзандатуу',
        'Сеанстарды үй-бүлө мүчөлөрүнө өткөрүп берүүгө болот'
      ],
      ru: [
        '4 полноценных сеанса массажа по 60 минут',
        'Выбор любого филиала и любимого мастера',
        'Бесплатная чайная церемония с горным медом',
        'Скидка 10% на все дополнительные спа-услуги',
        'Возможность передавать сеансы членам семьи'
      ],
      en: [
        '4 full 60-minute massage sessions monthly',
        'Priority therapist and branch reservation',
        'Complimentary alpine tea & raw honey lounge service',
        '10% privilege discount on all spa upgrades',
        'Transferable sessions to family members'
      ]
    }
  },
  {
    id: 'royal-arashan-vip',
    name: '«Падышалык Арашан» VIP Клубу',
    tierSubtitle: {
      kg: 'Айына 8 сеанс, жеке VIP люкс жана чексиз фитобочка',
      ru: '8 сеансов любых премиум-ритуалов, VIP-люкс и фитобочка',
      en: '8 master sessions, private VIP suites & unlimited herbal steam'
    },
    monthlyPrice: 16500,
    featured: true,
    sessionsCount: '8 сеанс + VIP Привилегиялар',
    badgeColor: 'border-[#d4af37] bg-gradient-to-b from-[#1c180e] to-[#090b0e]',
    perks: {
      kg: [
        'Айына 8 жолу 60-90 мүнөттүк премиум массаж',
        'Айына 2 жолу «Арашан Падышалык» толук ритуалы',
        'Жеке VIP Люкс бөлмөлөрүн акысыз колдонуу',
        'Арча фитобочкасында чексиз буулануу',
        '1 жолку жубайлар/достор үчүн акысыз конок сеансы',
        'Белек сертификаттарына жана косметикага 20% арзандатуу',
        'Күтүүсүз убакытты брондоо (2 саат мурда эскертүү)'
      ],
      ru: [
        '8 сеансов премиального массажа по 60-90 минут',
        '2 полных королевских ритуала «Arashan Grand»',
        'Бесплатный доступ в приватные VIP-апартаменты',
        'Безлимитный прогрев в кедровой фитобочке с арчой',
        '1 гостевой визит в месяц для друга или супруги',
        'Скидка 20% на спа-косметику и подарочные карты',
        'Гарантированная бронь за 2 часа без очереди'
      ],
      en: [
        '8 bespoke massage treatments (60-90 min)',
        '2x Arashan Grand Royal Signature Rituals included',
        'Complimentary private VIP Suite reservations',
        'Unlimited Tian-Shan juniper steam barrel sessions',
        '1 monthly guest pass for partner or friend',
        '20% off all retail apothecary & gift vouchers',
        'Zero-wait priority booking guarantee'
      ]
    }
  },
  {
    id: 'health-course-10',
    name: '«Толук Калыбына Келүү» 10 Сеанстык Курс',
    tierSubtitle: {
      kg: 'Омуртка жана остеохондрозду дарылоо боюнча интенсивдүү курс',
      ru: 'Курс оздоровления позвоночника из 10 сеансов',
      en: 'Complete 10-Session Spinal Rehabilitation Course'
    },
    monthlyPrice: 19000,
    featured: false,
    sessionsCount: '10 дарылоо сеансы + Диагностика',
    badgeColor: 'border-amber-700/50 bg-slate-900/70',
    perks: {
      kg: [
        '10 жолу дарыгер-реабилитологдун интенсивдүү сеансы',
        'Дарыгердин толук жекече диагностикасы жана мониторинги',
        'Арка булчуңдарынын чыңалуусун 100% чечүү кепилдиги',
        'Акысыз үй шартында жасоочу гимнастикалык көнүгүүлөр топтому',
        'Курс 3 айга жарактуу'
      ],
      ru: [
        '10 интенсивных лечебных сеансов у врача-реабилитолога',
        'Персональная диагностика позвоночника и мониторинг динамики',
        'Гарантированное устранение мышечных зажимов и болей',
        'Индивидуальный комплекс упражнений ЛФК для дома',
        'Срок действия курса — 3 месяца'
      ],
      en: [
        '10 intensive clinical sessions with medical rehabilitators',
        'Full musculoskeletal biomechanics assessment & progress tracking',
        'Guaranteed resolution of chronic back & neck spasms',
        'Custom home therapeutic exercise regimen',
        'Valid for 3 months'
      ]
    }
  }
];

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    authorName: 'Айбек Садыков',
    city: 'Бишкек (Эркиндик)',
    rating: 5,
    date: '2 күн мурун',
    serviceName: 'Дарылоо жана Классикалык Омуртка Массажы',
    therapistName: 'Айгүл Бакирова',
    comment: {
      kg: 'IT тармагында иштегендиктен күнүгө 10 саат компьютер алдында отурам. Моюнум жана далым катып калган эле. Айгүл эжеге 3 сеанс баргандан кийин канат бүткөндөй жеңилдеп калдым. Чыныгы медициналык чеберчилик! Салондун атмосферасы, арча жыты жана чай аземи сонун экен.',
      ru: 'Работаю в IT, целый день за экраном. Шея была как деревянная. После сеансов у Айгуль почувствовал невероятное облегчение! Очень профессионально, чисто, прекрасный чай с медом. Рекомендую всем в Бишкеке.',
      en: 'As a software engineer sitting 10+ hours a day, my neck and shoulders were frozen. Aigul worked magic on my trigger points. The juniper scent and alpine tea made it heavenly.'
    }
  },
  {
    id: 'rev-2',
    authorName: 'Елена Васильева',
    city: 'г. Бишкек (Асанбай)',
    rating: 5,
    date: '3 күн мурун',
    serviceName: 'Салттуу Тай Массажы (Traditional Thai)',
    therapistName: 'Нарин Пияпонг',
    comment: {
      kg: 'Тай массажы боюнча Наринге жазылдым. Бангкоктон келген чыныгы мастер экени дароо билинди! Бардык муундарым ачылып, ийкемдүүлүк пайда болду. Түштүк филиалы өтө таза жана тынч экен.',
      ru: 'Была у Нарин на традиционном тайском массаже. Настоящий аутентичный массаж как в лучших спа Бангкока! Каждая мышца проработана, потрясающая растяжка. Южный филиал в Асанбае очень уютный.',
      en: 'Narin is a true master from Bangkok! Authentic yoga stretches and pressure points. The South branch near Asanbay has a serene atmosphere.'
    }
  },
  {
    id: 'rev-3',
    authorName: 'Нурбек жана Мээрим',
    city: 'Бишкек ш.',
    rating: 5,
    date: '1 жума мурун',
    serviceName: '«Жубайлар Үчүн Романтикалык Арашан» SPA',
    therapistName: 'Камила Жумабаева & Азамат Эсеналиев',
    comment: {
      kg: 'Үйлөнгөн күнүбүздүн 5 жылдыгына жолдошум экөөбүз Жубайлар SPA топтомуна келдик. Шамдар, роза гүлдөрү, арча фитобочкасы жана 90 мүнөт керемет массаж! Абдан эс алдык, жаңы күч менен чыктык. Чоң рахмат сизге!',
      ru: 'Отмечали годовщину свадьбы в VIP-сьюте для двоих. Свечи, лепестки роз, фитобочка и потрясающий массаж от двух мастеров одновременно. Незабываемые впечатления, вернемся еще!',
      en: 'Celebrated our 5th wedding anniversary in the private VIP suite. Candlelight, rose petals, herbal steam and side-by-side massage. Outstanding experience in Bishkek!'
    }
  },
  {
    id: 'rev-4',
    authorName: 'Бектур Касымов',
    city: 'Бишкек (Манас / Чүй)',
    rating: 5,
    date: '2 жума мурун',
    serviceName: 'Спорттук & Терең Булчуң Массажы (Deep Tissue)',
    therapistName: 'Азамат Эсеналиев',
    comment: {
      kg: 'Жарым марафон чуркагандан кийин буттарым катуу ооруп жаткан. Азамат байкеге бардым, фасцияларды жана булчуңдарды күчтүү укалап, эртеси күнү эле чуркаганга даяр болуп калдым. Спорттук массаж боюнча номер 1!',
      ru: 'После полумарафона ноги были забиты. Азамат профессионально проработал все спазмы. На следующий день уже никакой боли. Лучший спортивный массажист в городе!',
      en: 'Recovered after a half-marathon with Azamat. Deep tissue muscle therapy got me back on my feet in less than 24 hours. Highly recommended!'
    }
  }
];
