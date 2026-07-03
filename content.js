const TRAINING_META = {
  title: "Yapay Zeka Destekli SDD Mimarisi Giriş Eğitimi: BMAD ve OpenSpec Frameworkleri",
  purpose:
    "Yapay zeka destekli yazılım geliştirme süreçlerinde kullanılan SDD (Spec-Driven Development) mimarisinin başlangıç seviyesinde tanıtılması; BMAD ve OpenSpec frameworkleri üzerinden gereksinim, intent, planlama, workflow ve kontrollü geliştirme yaklaşımının aktarılması",
  instructors: "Uğur Erdem, Berrin Büyüklü",
  duration: "1.5 saat",
  recording: "Evet, eğitim kaydı alınacaktır",
  audience:
    "Analistler, Ürün Yöneticileri, Test Uzmanları, Test Mühendisleri, Developerlar, Yazılım Mimarları ve yapay zeka destekli geliştirme süreçlerine giriş yapmak isteyen ekipler",
  date: "4 Temmuz 14:00 – 15:30",
};

const SDD_CONTENT = {
  definition:
    "SDD (Spec-Driven Development), önce ne yapılacağını tanımlayıp sonra geliştirmeyi ilerleten bir yaklaşımdır. Intent, gereksinim ve spec netleşir; uygulama bu çerçeveye göre yürür — hem insan hem AI aynı referans üzerinden çalışır.",
  quote: "Önce ne yapılacağını tanımla, sonra geliştir.",
  why: [
    "AI ile çalışırken gereksinim kayması yaşanabilir",
    "Belirsiz talep, belirsiz çıktı üretir",
    "Plansız ilerleme yeniden iş maliyetini artırır",
    "Yapılandırılmış yaklaşım kaliteyi artırır",
    "İzlenebilirlik ve kurumsal hafıza oluşur",
    "Farklı ekip üyeleri ve AI araçları için bağlam sürdürülebilir hale gelir",
  ],
  framework: [
    { n: "1", t: "SDD nedir?" },
    { n: "2", t: "Neden ihtiyaç duyulur?" },
    { n: "3", t: "AI süreçlerinde hangi problemleri çözer?" },
    { n: "4", t: "BMAD bu resimde nereye oturur?" },
    { n: "5", t: "OpenSpec bu resimde nereye oturur?" },
    { n: "6", t: "Fark ve ortak noktalar" },
    { n: "7", t: "Hangi senaryoda nasıl düşünülmeli?" },
    { n: "8", t: "Kurum içinde nasıl değerlendirilebilir?" },
  ],
};

const INSTRUCTORS = [
  { name: "Uğur Erdem", initials: "UE", title: "Senior Instructor", bg: "#0052A5", fg: "#fff" },
  { name: "Berrin Büyüklü", initials: "BB", title: "Senior Instructor", bg: "#FFC700", fg: "#1a2332" },
];

const BMAD_AGENTS = [
  { role: "Analyst", persona: "Mary", initials: "MA", color: "#0052A5", tr: "İş Analisti", q: "Problem ve bağlam net mi?", where: "Araştırma, brainstorming, domain analizi", icon: "🔍" },
  { role: "Product Manager", persona: "John", initials: "JO", color: "#7c3aed", tr: "Ürün Yöneticisi", q: "Neyi, neden yapıyoruz?", where: "Brief, PRD, gereksinim doğrulama", icon: "📋" },
  { role: "Architect", persona: "Winston", initials: "WI", color: "#0891b2", tr: "Mimar", q: "Teknik çözüm nasıl kurgulanır?", where: "Teknik araştırma, mimari tasarım", icon: "🏗️" },
  { role: "Developer", persona: "Amelia", initials: "AM", color: "#15803d", tr: "Geliştirici", q: "Story nasıl uygulanır?", where: "Story geliştirme, kodlama", icon: "⚡" },
  { role: "QA", persona: "Murat", initials: "MU", color: "#dc2626", tr: "Kalite", q: "Gereksinimler karşılanıyor mu?", where: "PRD doğrulama, review", icon: "✅" },
  { role: "Scrum Master", persona: "Bob", initials: "BO", color: "#ea580c", tr: "Sprint Yöneticisi", q: "İş nasıl planlanır ve takip edilir?", where: "Epic/story, sprint planlama", icon: "📊" },
  { role: "UX Designer", persona: "Sally", initials: "SA", color: "#db2777", tr: "UX Tasarımcı", q: "Kullanıcı deneyimi nasıl?", where: "UX tasarım, akış tanımı", icon: "🎨" },
];

const BMAD_COMMANDS_TABLE = [
  { order: 1, cmd: "bmad-brainstorming", alias: "-", stage: "Fikir Başlangıcı", purpose: "Fikirleri toplar, alternatifleri görünür kılar.", when: "Problem veya ürün fikri henüz net değilken.", output: "Fikir başlıkları / başlangıç yönü", agent: "Analyst / PM" },
  { order: 2, cmd: "bmad-market-research", alias: "MR", stage: "Araştırma", purpose: "Pazar, kullanıcı ihtiyacı ve fırsatları analiz eder.", when: "Ürün fırsatı veya değer önerisi değerlendirileceğinde.", output: "Pazar içgörüleri", agent: "Analyst / PM" },
  { order: 3, cmd: "bmad-domain-research", alias: "DR", stage: "Alan Analizi", purpose: "İş alanını, terimleri ve bağlamı netleştirir.", when: "Domain bilgisi eksik olduğunda.", output: "Domain özeti", agent: "Analyst" },
  { order: 4, cmd: "bmad-technical-research", alias: "TR", stage: "Teknik Analiz", purpose: "Teknik riskleri ve uygulanabilirliği değerlendirir.", when: "Mimari karar öncesinde.", output: "Teknik değerlendirme", agent: "Architect" },
  { order: 5, cmd: "bmad-create-brf", alias: "CB", stage: "Ürün Tanımı", purpose: "Product brief ile ürün/feature amacını netleştirir.", when: "İlk araştırmalar tamamlanıp kapsam netleştirileceğinde.", output: "Product brief", agent: "Product Manager", highlight: true, note: "Sunumda vurgula: «Neyi, neden yapıyoruz?» sorusunun cevabı burada netleşir. Brief olmadan PRD'ye geçmeyin." },
  { order: 6, cmd: "bmad-create-prd", alias: "CP", stage: "Gereksinim", purpose: "PRD dokümanı oluşturur.", when: "Brief tamamlanıp netleşince.", output: "Gereksinim dokümanı", agent: "Product Manager", note: "Bu eğitimde zorunlu durak — tüm ekip ve AI aynı gereksinim referansına bağlanır." },
  { order: 7, cmd: "bmad-validate-prd", alias: "VP", stage: "Kalite Kontrol", purpose: "PRD eksiklerini analiz eder.", when: "PRD yazıldıktan hemen sonra.", output: "Doğrulanmış / iyileştirilmiş PRD", agent: "PM / QA" },
  { order: 8, cmd: "bmad-create-ux-design", alias: "CU", stage: "Tasarım", purpose: "UX akışlarını tanımlar.", when: "Ekran/deneyim tasarımı gerektiğinde.", output: "UX akışı / tasarım yönü", agent: "UX Expert" },
  { order: 9, cmd: "bmad-create-architecture", alias: "CA", stage: "Teknik Tasarım", purpose: "Mimari yapı kurar.", when: "Teknik çözüm kurgulanırken.", output: "Mimari yaklaşım şeması", agent: "Architect" },
  { order: 10, cmd: "bmad-create-epics-and-stories", alias: "CE", stage: "Planlama", purpose: "İşi epic ve story'lere böler.", when: "Geliştirme öncesi hazırlıkta.", output: "Backlog listesi", agent: "Scrum Master / PM" },
  { order: 11, cmd: "bmad-sprint-planning", alias: "SP", stage: "Sprint Planı", purpose: "İşleri sprint yapısına yerleştirir.", when: "Delivery planı oluşturulurken.", output: "Sprint planı", agent: "Scrum Master" },
  { order: 12, cmd: "bmad-sprint-status", alias: "SS", stage: "Takip", purpose: "Sprint ilerleme durumunu özetler.", when: "Sprint devam ederken.", output: "Durum özeti", agent: "Scrum Master" },
  { order: 13, cmd: "bmad-create-story", alias: "CS", stage: "Story Hazırlığı", purpose: "Geliştirilebilir net story üretir.", when: "Uygulamaya başlanmadan hemen önce.", output: "Story tanımı", agent: "Scrum Master / Developer" },
  { order: 14, cmd: "bmad-dev-story", alias: "DS", stage: "Uygulama", purpose: "Story'nin teknik uygulamasını yürütür.", when: "Geliştirme sırasında.", output: "Uygulanmış story çıktısı", agent: "Developer" },
];

const OPENSPEC_CONCEPTS = [
  { name: "Intent", desc: "Değişikliğin veya özelliğin neden yapıldığı — amaç ve iş gerekçesi." },
  { name: "Change", desc: "Mevcut ürün veya kod tabanında tanımlanan kontrollü değişiklik birimi." },
  { name: "Proposal", desc: "Change'in resmi önerisi; kapsam ve beklentileri yazılı hale getirir." },
  { name: "Specs", desc: "Davranışın tanımı — ne değişecek, nasıl çalışacak." },
  { name: "Design", desc: "Entegrasyon ve teknik etkilerin düşünülmesi (gerektiğinde)." },
  { name: "Tasks", desc: "Uygulama işlerinin parçalanmış listesi." },
  { name: "Archive", desc: "Tamamlanan değişikliğin kayıt altına alınması ve kurumsal hafıza." },
];

const OPENSPEC_ACTORS = [
  "İnsan kullanıcı / ürün sahibi / analist",
  "Developer",
  "AI coding assistant",
  "Reviewer / QA",
];

const OPENSPEC_COMMANDS_TABLE = [
  { order: 1, cmd: "/opsx:explore", alias: "-", stage: "Ön Keşif", purpose: "Problem alanını ve seçenekleri keşfeder.", when: "Çözüm yönü henüz net değilken.", output: "Keşif notları", actor: "İnsan + AI" },
  { order: 2, cmd: "/opsx:new", alias: "-", stage: "Başlangıç", purpose: "Yeni change için iskelet oluşturur.", when: "Yeni değişiklik başlatılacağında.", output: "Change başlangıç yapısı", actor: "İnsan + AI" },
  { order: 3, cmd: "/opsx:propose", alias: "-", stage: "Planlama", purpose: "Proposal ve spec sürecini başlatır.", when: "Değişiklik resmi tanımlanırken.", output: "Proposal + spec yapısı", actor: "İnsan + AI", highlight: true, note: "Intent ve kapsam burada yazılı hale gelir — uygulama öncesi «anlaşma» noktası." },
  { order: 4, cmd: "/opsx:verify", alias: "-", stage: "Doğrulama", purpose: "Proposal/spec uyumunu kontrol eder.", when: "Plan gözden geçirileceğinde.", output: "Doğrulama sonucu", actor: "Reviewer / QA" },
  { order: 5, cmd: "/opsx:apply", alias: "-", stage: "Uygulama", purpose: "Tasks ve spec doğrultusunda uygular.", when: "Uygulamaya geçileceğinde.", output: "Uygulanmış değişiklik", actor: "Developer + AI", highlight: true, note: "Developer ve AI aynı task listesine bağlı kalır — spec dışına çıkmak zorlaşır." },
  { order: 6, cmd: "/opsx:continue", alias: "-", stage: "Devam", purpose: "Yarım kalan akışı sürdürür.", when: "Çalışma bölünmüşse.", output: "Devam eden akış", actor: "Developer + AI" },
  { order: 7, cmd: "/opsx:sync", alias: "-", stage: "Hizalama", purpose: "İçeriği güncel durumla hizalar.", when: "Spec veya bağlam güncelleneceğinde.", output: "Güncel içerik", actor: "İnsan + AI" },
  { order: 8, cmd: "/opsx:archive", alias: "-", stage: "Kapanış", purpose: "Tamamlanan değişikliği arşivler.", when: "Uygulama tamamlandığında.", output: "Arşivlenmiş change", actor: "İnsan + AI", highlight: true, note: "Kurumsal hafıza — «ne değişti, neden değişti» kayıt altında kalır." },
  { order: 9, cmd: "/opsx:bulk-archive", alias: "-", stage: "Toplu Kapanış", purpose: "Birden fazla change'i arşivler.", when: "Çoklu kapanış ihtiyacında.", output: "Toplu arşiv", actor: "İnsan + AI" },
  { order: 10, cmd: "/opsx:onboard", alias: "-", stage: "Devir", purpose: "Yeni katılımcı için bağlam aktarımı.", when: "Yeni ekip üyesi dahil olduğunda.", output: "Hızlı bağlam", actor: "İnsan + AI" },
  { order: 11, cmd: "/opsx:ff", alias: "-", stage: "Hızlandırılmış", purpose: "İleri/hızlandırılmış akış.", when: "İleri seviye kullanımda.", output: "Kısaltılmış akış", actor: "İleri kullanıcı" },
];

const STAGE_TONES = {
  "Fikir Başlangıcı": "stage-idea",
  Araştırma: "stage-research",
  "Alan Analizi": "stage-domain",
  "Teknik Analizi": "stage-tech",
  "Teknik Analiz": "stage-tech",
  "Ürün Tanımı": "stage-product",
  Gereksinim: "stage-requirement",
  "Kalite Kontrol": "stage-quality",
  Tasarım: "stage-design",
  "Teknik Tasarım": "stage-arch",
  Planlama: "stage-plan",
  "Sprint Planı": "stage-sprint",
  Takip: "stage-track",
  "Story Hazırlığı": "stage-story",
  Uygulama: "stage-build",
  "Ön Keşif": "stage-explore",
  Başlangıç: "stage-start",
  Doğrulama: "stage-verify",
  Devam: "stage-continue",
  Hizalama: "stage-sync",
  Kapanış: "stage-close",
  "Toplu Kapanış": "stage-bulk",
  Devir: "stage-onboard",
  Hızlandırılmış: "stage-ff",
};

const BMAD_INVENTORY_CHUNKS = [
  { title: "KOMUT ENVANTERİ — KEŞİF & ARAŞTIRMA", footLabel: "Komut Envanteri (1-5)", range: [1, 5] },
  { title: "KOMUT ENVANTERİ — GEREKSİNİM & TASARIM", footLabel: "Komut Envanteri (6-10)", range: [6, 10] },
  { title: "KOMUT ENVANTERİ — PLANLAMA & UYGULAMA", footLabel: "Komut Envanteri (11-14)", range: [11, 14] },
];

const OPENSPEC_INVENTORY_CHUNKS = [
  { title: "KOMUT ENVANTERİ — KEŞİF & PLANLAMA", footLabel: "Komut Envanteri (1-5)", range: [1, 5] },
  { title: "KOMUT ENVANTERİ — UYGULAMA & ARŞİV", footLabel: "Komut Envanteri (6-11)", range: [6, 11] },
];

const COMPARISON_TABLE = [
  { head: "Ana odak", bmad: "Rol/ajan ve workflow", openspec: "Intent, change ve spec" },
  { head: "Güçlü yön", bmad: "Akış ve uzmanlık perspektifi", openspec: "Değişiklik yönetimi ve izlenebilirlik" },
  { head: "Başlangıç", bmad: "Fikirden delivery'ye ilerleme", openspec: "Değişikliği önce tarif etme" },
  { head: "Uygunluk", bmad: "Yeni proje ve yapılandırılmış ürün akışı", openspec: "Yeni feature, bugfix, refactor" },
  { head: "AI katkısı", bmad: "Doğru rol ve akışla ilerleme", openspec: "Doğru intent ve spec ile hizalanma" },
];

const SCENARIOS = [
  {
    id: "new-project",
    title: "Workflow 1 — Sıfırdan Yeni Proje",
    name: "Akademi Eğitmen Portalı",
    goal: "Eğitmenlerin kaydedildiği, bilgilerinin tutulduğu, performanslarının takip edildiği ve puanlandığı bir portal.",
    learn: "Sıfırdan ürün geliştirirken SDD yaklaşımının neden önemli olduğunu anlamak.",
    bmad: ["brainstorming", "market/domain/technical research", "bmad-create-brf", "bmad-create-prd", "bmad-create-ux-design", "bmad-create-architecture", "bmad-create-epics-and-stories"],
    openspec: ["change intent tanımı", "proposal", "specs", "design (gerekirse)", "tasks", "apply", "archive"],
  },
  {
    id: "feature",
    title: "Workflow 2 — Mevcut Projeye Özellik",
    name: "Mobil Uygulama — Gamer Ek Paket Ekranı",
    goal: "Mevcut mobil uygulamaya gamer segmentine özel ek paketlerin listelendiği ve satın alma akışına yönlendiren yeni ekran.",
    learn: "Mevcut projede değişiklik yaparken spec ve plan disiplininin daha da kritik olduğunu kavramak.",
    bmad: ["domain + technical research", "bmad-create-brf (feature amacı)", "bmad-create-prd", "bmad-create-architecture", "bmad-create-epics-and-stories", "story + delivery"],
    openspec: ["mevcut ürün içi change", "dar kapsamlı proposal", "yalnızca değişen davranış spec'i", "integration design", "tasks", "verify", "archive"],
  },
];

const QUALITY_GATES = {
  title: "Kalite Kapıları ve Sürdürülebilirlik",
  subtitle:
    "BMAD sisteminde bir geliştiricinin kodlamaya başlaması için «yeşil ışık» alması gerekir. Bu, kurumsal yazılımın sigortasıdır.",
  delta: {
    title: "Delta Yaklaşımı",
    desc: "Büyük değişiklikler AI bağlamını kırar. BMAD bunun yerine küçük, doğrulanabilir delta paketleri kullanır.",
    items: [
      "Bağlam Kaymasını Önler",
      "Kod İnceleme Süresini Kısaltır",
      "Teknik Borcu Henüz Oluşmadan Engeller",
    ],
  },
  evr: {
    title: "EVR Döngüsü Disiplini",
    steps: [
      { phase: "EDIT", cmd: "bmad-edit-prd", desc: "Gereksinimler küçük paketlere bölünür.", tone: "blue" },
      { phase: "VALIDATE", cmd: "bmad-validate-prd", desc: "Mantıksal boşluklar denetlenir.", tone: "green" },
      {
        phase: "READINESS",
        cmd: "bmad-check-implementation-readiness",
        desc: "Geliştirmeye hazır bulunuşluk kilitlenir.",
        tone: "yellow",
      },
    ],
    footnote: "Readiness yeşil yanmadan yazılımcı kodlamaya başlamaz.",
  },
};

const LEARNING_OUTCOMES = [
  "SDD'nin ne olduğunu açıklayabilmek",
  "BMAD ve OpenSpec'in SDD içindeki yerini ayırt edebilmek",
  "BMAD'in ajan ve komut mantığını temel seviyede anlamak",
  "OpenSpec'in proposal / spec / task mantığını açıklayabilmek",
  "Yeni proje ve mevcut projeye feature ekleme senaryolarında nasıl düşünüleceğini kavramak",
  "AI ile kontrollü ve izlenebilir geliştirme için bu yaklaşımların önemini yorumlayabilmek",
];
