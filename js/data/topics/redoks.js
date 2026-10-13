export default {
  id: 'redoks',
  icon: 'battery',
  levels: ['smp', 'sma', 'kuliah'],
  title: ['Redoks dan elektrokimia', 'Redox and electrochemistry'],
  summary: [
    'Karat, baterai, dan penyepuhan: oksidasi dan reduksi, bilangan oksidasi, sel volta, elektrolisis, dan korosi.',
    'Rust, batteries and electroplating: oxidation and reduction, oxidation numbers, voltaic cells, electrolysis and corrosion.',
  ],
  body: {
    sd: [
      `Pagar besi yang sering terkena hujan lama-lama berwarna cokelat kemerahan dan rapuh. Itu karat. Besi bereaksi dengan oksigen dari udara dengan bantuan air, membentuk {{m:iron-oxide|oksida besi}}. Perubahan ini disebut [[korosi]].

Apel yang diiris juga berubah cokelat karena bereaksi dengan oksigen. Kayu yang terbakar dan kembang api yang menyala pun bereaksi dengan {{m:oxygen|oksigen}}.

Cara mencegah karat:

- Mengecat pagar besi.
- Mengoles alat dengan minyak.
- Menjaga benda besi tetap kering.
- Melapisi besi dengan logam lain, seperti seng pada atap seng.`,
      `An iron fence often left in the rain slowly turns reddish-brown and crumbly. That is rust. Iron reacts with oxygen from the air, helped by water, to form {{m:iron-oxide|iron oxide}}. This change is called [[korosi|corrosion]].

A cut apple turns brown too because it reacts with oxygen. Burning wood and glowing fireworks also react with {{m:oxygen|oxygen}}.

Ways to stop rust:

- Painting iron fences.
- Oiling tools.
- Keeping iron things dry.
- Coating iron with another metal, such as zinc on corrugated roofing.`,
    ],
    smp: [
      `Besi yang dibiarkan di udara lembap menjadi berkarat: besi bereaksi dengan oksigen dan air membentuk {{m:iron-oxide|besi oksida}}. Reaksi dengan oksigen disebut **oksidasi**, kebalikannya (pelepasan oksigen) disebut **reduksi**. Keduanya selalu terjadi bersamaan sehingga disebut [[redoks]].

Contoh redoks di sekitar kita:

- [[korosi|Perkaratan]] besi dan menghijaunya tembaga.
- Pembakaran bahan bakar dan respirasi sel.
- Baterai dan aki kendaraan, yang mengubah energi kimia menjadi listrik.
- Pemutih pakaian ({{m:sodium-hypochlorite|natrium hipoklorit}}) mengoksidasi noda.

Karat dapat dicegah dengan mengecat, melapisi dengan seng (galvanisasi) atau timah (kaleng), dan menjauhkan logam dari air.`,
      `Iron left in damp air rusts: it reacts with oxygen and water to form {{m:iron-oxide|iron oxide}}. Reacting with oxygen is **oxidation**; the reverse (losing oxygen) is **reduction**. They always happen together, so we call them [[redoks|redox]].

Redox around us:

- [[korosi|Rusting]] of iron and copper turning green.
- Burning fuels and cellular respiration.
- Batteries and car batteries, which turn chemical energy into electricity.
- Bleach ({{m:sodium-hypochlorite|sodium hypochlorite}}) oxidising stains.

Rust can be prevented by painting, coating with zinc (galvanising) or tin (tin cans), and keeping metal dry.`,
    ],
    sma: [
      `Konsep modern: **oksidasi** adalah pelepasan elektron (kenaikan [[bilangan-oksidasi]]), **reduksi** adalah penerimaan elektron (penurunan biloks). Zat yang tereduksi disebut oksidator; zat yang teroksidasi disebut reduktor.

Aturan biloks: unsur bebas 0; O umumnya −2 (peroksida −1); H umumnya +1; logam golongan 1 = +1, golongan 2 = +2; jumlah biloks dalam senyawa netral = 0.

[[sel-volta|Sel volta]] mengubah reaksi redoks spontan menjadi listrik. Pada sel Daniell, Zn (anode) teroksidasi dan Cu²⁺ (katode) tereduksi:

E°sel = E°katode − E°anode = +0,34 − (−0,76) = +1,10 V

Deret volta (Li K Ba Ca Na Mg Al Mn Zn Cr Fe Ni Sn Pb H Cu Hg Ag Pt Au) menunjukkan logam di kiri lebih mudah teroksidasi. Coba pasangkan logam di {{lab:volta|lab Sel volta}}.

[[elektrolisis|Elektrolisis]] memakai listrik untuk menjalankan reaksi tidak spontan: pemurnian tembaga, penyepuhan, pembuatan {{m:chlorine|klorin}} dan {{m:sodium-hydroxide|NaOH}} dari air garam, serta peleburan {{m:aluminium|aluminium}}. Hukum Faraday: massa = (Ar × I × t)/(n × 96 500).

Sel, baterai, dan elektrolisis dibahas lengkap di {{learn:elektrokimia|Elektrokimia}}.`,
      `The modern view: **oxidation** is losing electrons (a rise in [[bilangan-oksidasi|oxidation number]]), **reduction** is gaining electrons (a fall). The species reduced is the oxidising agent; the one oxidised is the reducing agent.

Oxidation-number rules: free elements 0; O usually −2 (peroxides −1); H usually +1; group 1 metals +1, group 2 +2; the sum in a neutral compound is 0.

A [[sel-volta|voltaic cell]] turns a spontaneous redox reaction into electricity. In the Daniell cell, Zn (anode) is oxidised and Cu²⁺ (cathode) is reduced:

E°cell = E°cathode − E°anode = +0.34 − (−0.76) = +1.10 V

The activity series (Li K Ba Ca Na Mg Al Mn Zn Cr Fe Ni Sn Pb H Cu Hg Ag Pt Au) shows metals on the left oxidise more easily. Pair metals in the {{lab:volta|Voltaic cell lab}}.

[[elektrolisis|Electrolysis]] uses electricity to drive non-spontaneous reactions: refining copper, electroplating, making {{m:chlorine|chlorine}} and {{m:sodium-hydroxide|NaOH}} from brine, and smelting {{m:aluminium|aluminium}}. Faraday’s law: mass = (Ar × I × t)/(n × 96 500).

Cells, batteries and electrolysis are covered in depth in {{learn:elektrokimia|Electrochemistry}}.`,
    ],
    kuliah: [
      `Persamaan Nernst menghubungkan potensial dengan konsentrasi: E = E° − (0,0592/n) log Q pada 25 °C. Dari sini lahir sel konsentrasi, elektrode pH (kaca), dan sensor glukosa. Hubungan ΔG° = −nFE° = −RT ln K menyatukan elektrokimia dengan termodinamika.

Baterai litium-ion memakai interkalasi: saat pengisian, Li⁺ berpindah dari katode {{m:lithium-cobalt-oxide|LiCoO₂}} atau {{m:lithium-iron-phosphate|LiFePO₄}} ke anode {{m:graphite|grafit}} (LiC₆). Katode NMC mengandung {{m:nickel|nikel}}, bahan strategis Indonesia. Aki timbal (Pb/PbO₂/H₂SO₄) dan sel bahan bakar hidrogen (H₂ + ½O₂ → H₂O, E° = 1,23 V) adalah contoh lain.

Korosi adalah sel galvanik mikro: Fe teroksidasi di daerah anodik, O₂ tereduksi di daerah katodik. Proteksi katodik memakai anode tumbal (Mg, Zn) atau arus terpasang untuk melindungi pipa dan kapal. Diagram Pourbaix (E–pH) menunjukkan daerah kekebalan, korosi, dan pasivasi logam.`,
      `The Nernst equation links potential to concentration: E = E° − (0.0592/n) log Q at 25 °C. It underlies concentration cells, glass pH electrodes and glucose sensors. ΔG° = −nFE° = −RT ln K unites electrochemistry with thermodynamics.

Lithium-ion batteries work by intercalation: on charging, Li⁺ moves from a {{m:lithium-cobalt-oxide|LiCoO₂}} or {{m:lithium-iron-phosphate|LiFePO₄}} cathode into a {{m:graphite|graphite}} anode (LiC₆). NMC cathodes contain {{m:nickel|nickel}}, a strategic Indonesian resource. Lead–acid batteries (Pb/PbO₂/H₂SO₄) and hydrogen fuel cells (H₂ + ½O₂ → H₂O, E° = 1.23 V) are further examples.

Corrosion is a micro galvanic cell: Fe oxidises at anodic sites while O₂ is reduced at cathodic sites. Cathodic protection with sacrificial anodes (Mg, Zn) or impressed current protects pipelines and ships. Pourbaix (E–pH) diagrams map immunity, corrosion and passivation regions.`,
    ],
  },
  points: [
    ['Oksidasi = lepas elektron (biloks naik); reduksi = terima elektron (biloks turun).', 'Oxidation = losing electrons (number rises); reduction = gaining (number falls).'],
    ['Sel volta: reaksi spontan → listrik; elektrolisis: listrik → reaksi.', 'Voltaic cell: spontaneous reaction → electricity; electrolysis: electricity → reaction.'],
    ['E°sel = E°katode − E°anode; positif berarti spontan.', 'E°cell = E°cathode − E°anode; positive means spontaneous.'],
  ],
  molecules: ['iron-oxide', 'copper-sulfate', 'zinc-oxide', 'lithium-cobalt-oxide', 'sulfuric-acid', 'chlorine'],
  labs: ['volta'],
  activity: {
    sd: ["Letakkan tiga paku di gelas: kering, berisi air, dan berisi air garam. Amati selama seminggu dan urutkan mana yang paling cepat berkarat.", "Put three nails in cups: dry, in water and in salt water. Watch for a week and rank which rusts fastest."],
    smp: ['Letakkan paku di empat tabung: air, air garam, minyak, dan tabung kering berisi kapur tohor. Amati perkaratan selama seminggu.', 'Place nails in four tubes: water, salt water, oil and a dry tube with quicklime. Watch for rust over a week.'],
    sma: ['Buat baterai dari jeruk atau kentang dengan elektrode seng dan tembaga; ukur tegangannya dan bandingkan dengan lab Sel volta.', 'Make a lemon or potato battery with zinc and copper electrodes; measure the voltage and compare with the Voltaic cell lab.'],
    kuliah: ['Hitung E sel Daniell bila [Zn²⁺] = 1,0 M dan [Cu²⁺] = 0,010 M dengan persamaan Nernst.', 'Use the Nernst equation to find the Daniell cell voltage when [Zn²⁺] = 1.0 M and [Cu²⁺] = 0.010 M.'],
  },
  quiz: [
    { lv: 'sd', q: ["Cara mencegah pagar besi berkarat adalah…", "A way to stop an iron fence rusting is…"], options: [["Menyiramnya setiap hari", "Watering it every day"], ["Mengecatnya", "Painting it"], ["Menaruhnya di tepi laut", "Putting it by the sea"], ["Mengampelasnya", "Sanding it"]], answer: 1, explain: ["Cat menutup besi dari air dan udara.", "Paint keeps water and air away from the iron."] },
    { lv: 'sd', q: ["Besi berkarat bila terkena…", "Iron rusts when exposed to…"], options: [["Air dan udara", "Water and air"], ["Minyak", "Oil"], ["Cat", "Paint"], ["Gula", "Sugar"]], answer: 0, explain: ["Besi bereaksi dengan oksigen dan air membentuk karat.", "Iron reacts with oxygen and water to form rust."] },
    { lv: 'smp', q: ['Perkaratan besi memerlukan…', 'Iron rusting needs…'], options: [['Oksigen dan air', 'Oxygen and water'], ['Hanya cahaya', 'Only light'], ['Gas nitrogen', 'Nitrogen gas'], ['Suhu sangat dingin', 'Very cold temperatures']], answer: 0, explain: ['Karat terbentuk dari reaksi besi dengan O₂ dan H₂O.', 'Rust forms when iron reacts with O₂ and H₂O.'] },
    { lv: 'smp', q: ['Melapisi besi dengan seng disebut…', 'Coating iron with zinc is called…'], options: [['Galvanisasi', 'Galvanising'], ['Elektrolisis', 'Electrolysis'], ['Distilasi', 'Distillation'], ['Fermentasi', 'Fermentation']], answer: 0, explain: ['Seng lebih mudah teroksidasi sehingga melindungi besi.', 'Zinc oxidises more easily, protecting the iron.'] },
    { lv: 'sma', q: ['Biloks Mn dalam KMnO₄ adalah…', 'The oxidation number of Mn in KMnO₄ is…'], options: [['+2', '+2'], ['+4', '+4'], ['+6', '+6'], ['+7', '+7']], answer: 3, explain: ['K (+1) + Mn + 4(−2) = 0 → Mn = +7.', 'K (+1) + Mn + 4(−2) = 0 → Mn = +7.'] },
    { lv: 'sma', q: ['Pada sel volta, oksidasi terjadi di…', 'In a voltaic cell, oxidation happens at the…'], options: [['Katode', 'Cathode'], ['Anode', 'Anode'], ['Jembatan garam', 'Salt bridge'], ['Voltmeter', 'Voltmeter']], answer: 1, explain: ['Anode: oksidasi; katode: reduksi ("An-Oks, Ka-Red").', 'Anode: oxidation; cathode: reduction ("An Ox, Red Cat").'] },
    { lv: 'sma', q: ['E° Zn²⁺/Zn = −0,76 V dan Cu²⁺/Cu = +0,34 V. E°sel Zn–Cu adalah…', 'E° Zn²⁺/Zn = −0.76 V and Cu²⁺/Cu = +0.34 V. E°cell for Zn–Cu is…'], options: [['+0,42 V', '+0.42 V'], ['−1,10 V', '−1.10 V'], ['+1,10 V', '+1.10 V'], ['+0,34 V', '+0.34 V']], answer: 2, explain: ['E° = 0,34 − (−0,76) = +1,10 V.', 'E° = 0.34 − (−0.76) = +1.10 V.'] },
    { lv: 'sma', q: ['Dalam reaksi Zn + Cu²⁺ → Zn²⁺ + Cu, oksidatornya adalah…', 'In Zn + Cu²⁺ → Zn²⁺ + Cu, the oxidising agent is…'], options: [['Zn', 'Zn'], ['Cu²⁺', 'Cu²⁺'], ['Zn²⁺', 'Zn²⁺'], ['Cu', 'Cu']], answer: 1, explain: ['Cu²⁺ menerima elektron (tereduksi) sehingga menjadi oksidator.', 'Cu²⁺ gains electrons (is reduced), so it is the oxidising agent.'] },
    { lv: 'kuliah', q: ['Hubungan ΔG° dengan E°sel adalah…', 'ΔG° is related to E°cell by…'], options: [['ΔG° = nFE°', 'ΔG° = nFE°'], ['ΔG° = −nFE°', 'ΔG° = −nFE°'], ['ΔG° = RT ln E°', 'ΔG° = RT ln E°'], ['ΔG° = E°/nF', 'ΔG° = E°/nF']], answer: 1, explain: ['E° positif memberi ΔG° negatif: reaksi spontan.', 'A positive E° gives negative ΔG°: spontaneous.'] },
    { lv: 'kuliah', q: ['Saat baterai Li-ion diisi, ion Li⁺ bergerak ke…', 'When a Li-ion battery charges, Li⁺ moves into the…'], options: [['Katode oksida logam', 'Metal-oxide cathode'], ['Anode grafit', 'Graphite anode'], ['Elektrolit padat saja', 'Solid electrolyte only'], ['Casing baterai', 'Battery case']], answer: 1, explain: ['Pengisian memaksa Li⁺ berinterkalasi ke grafit membentuk LiC₆.', 'Charging forces Li⁺ to intercalate into graphite forming LiC₆.'] },
  ],
  teacher: {
    cp: ['Fase D–F: peserta didik menjelaskan reaksi redoks, menghitung potensial sel, dan mengaitkannya dengan teknologi baterai serta korosi.', 'Phases D–F: learners explain redox, calculate cell potentials and link them to batteries and corrosion.'],
    goals: [
      ['Menentukan bilangan oksidasi dan mengidentifikasi oksidator/reduktor.', 'Assign oxidation numbers and identify oxidising/reducing agents.'],
      ['Menghitung E°sel dan meramalkan kespontanan.', 'Calculate E°cell and predict spontaneity.'],
    ],
    duration: ['5 × 45 menit', '5 × 45 min'],
    steps: [
      ['Percobaan paku berkarat (proyek seminggu).', 'Rusting-nail project (one week).'],
      ['Baterai buah dan lab Sel volta.', 'Fruit battery and the Voltaic cell lab.'],
      ['Studi kasus: nikel Indonesia dan baterai kendaraan listrik.', 'Case study: Indonesian nickel and EV batteries.'],
    ],
    misconceptions: [['"Elektron mengalir melalui larutan." Elektron mengalir di kawat; ion bergerak di larutan dan jembatan garam.', '"Electrons flow through the solution." Electrons flow in the wire; ions move in the solution and salt bridge.']],
    assessment: ['Kuis Kimialoka dan laporan proyek baterai buah.', 'Kimialoka quiz and a fruit-battery project report.'],
  },
  refs: ["17-1-review-of-redox-chemistry", "17-2-galvanic-cells", "17-6-corrosion", "17-7-electrolysis"],
};
