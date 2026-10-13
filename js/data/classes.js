// The Kimialoka classification of matter ("golongan"): a learning tree from broad families to classes.
// Every molecule in the catalogue belongs to one or more classes (its `cls` list, first = main class).
// Text pairs are [Bahasa Indonesia, English]. `smarts` (optional) is a substructure pattern used to ask
// PubChem for more real members of the class; it is only offered where the pattern is reliable.
//
// Fields: id · parent · icon · color · name · def (definition) · feat (key features) · general (general
// formula or pattern) · naming (IUPAC naming hint) · level (from which level the class is introduced)
export const CLASSES = [
  // ---------- Families (roots) ----------
  {
    id: 'unsur',
    icon: 'atom',
    color: '#4a9fe0',
    level: 'sd',
    name: ['Unsur & alotrop', 'Elements & allotropes'],
    def: [
      'Zat tunggal yang hanya tersusun atas satu jenis atom. Sebagian unsur berdiri sebagai atom tunggal (gas mulia), sebagian membentuk molekul (O₂, S₈), dan sebagian membentuk kisi raksasa (logam, intan).',
      'Pure substances made of a single kind of atom. Some exist as lone atoms (noble gases), some as molecules (O₂, S₈), and some as giant lattices (metals, diamond).',
    ],
  },
  {
    id: 'anorganik',
    icon: 'flask',
    color: '#3fb5a3',
    level: 'smp',
    name: ['Senyawa anorganik', 'Inorganic compounds'],
    def: [
      'Senyawa yang umumnya tidak berkerangka rantai karbon–hidrogen: air, garam, oksida, asam mineral, dan basa. Banyak di antaranya membentuk ion dalam air.',
      'Compounds that generally lack a carbon–hydrogen framework: water, salts, oxides, mineral acids and bases. Many form ions in water.',
    ],
  },
  {
    id: 'organik',
    icon: 'hexagon',
    color: '#e9a23b',
    level: 'smp',
    name: ['Senyawa organik', 'Organic compounds'],
    def: [
      'Senyawa berkerangka atom karbon yang berikatan dengan hidrogen, sering juga dengan O, N, S, atau halogen. Karbon dapat membentuk rantai, cabang, dan cincin sehingga jumlah senyawa organik mencapai puluhan juta.',
      'Compounds built on carbon atoms bonded to hydrogen, often with O, N, S or halogens. Carbon forms chains, branches and rings, so there are tens of millions of organic compounds.',
    ],
  },
  {
    id: 'biomolekul',
    icon: 'dna',
    color: '#7fb069',
    level: 'smp',
    name: ['Biomolekul', 'Biomolecules'],
    def: [
      'Molekul yang dibuat dan dipakai makhluk hidup: karbohidrat, protein, lipid, asam nukleat, vitamin, hormon, dan pigmen.',
      'Molecules made and used by living things: carbohydrates, proteins, lipids, nucleic acids, vitamins, hormones and pigments.',
    ],
  },
  {
    id: 'obat',
    icon: 'pill',
    color: '#e06fa8',
    level: 'smp',
    name: ['Obat & farmasi', 'Medicines'],
    def: [
      'Senyawa yang dipakai untuk mencegah, mendiagnosis, atau mengobati penyakit. Efeknya bergantung pada bentuk molekul yang cocok dengan target di tubuh, seperti enzim atau reseptor.',
      'Compounds used to prevent, diagnose or treat disease. Their effect depends on a molecular shape that fits a target in the body, such as an enzyme or receptor.',
    ],
    feat: [
      'Informasi di Kimialoka untuk belajar, bukan petunjuk pengobatan. Selalu ikuti dokter atau apoteker.',
      'Information here is for learning, not medical advice. Always follow a doctor or pharmacist.',
    ],
  },
  {
    id: 'material',
    icon: 'cube',
    color: '#7c7fe8',
    level: 'smp',
    name: ['Material', 'Materials'],
    def: [
      'Zat yang dipilih karena sifat fisiknya untuk membuat benda: logam, keramik, kaca, polimer, semikonduktor, dan nanomaterial. Sifatnya ditentukan oleh susunan atom dan ikatannya.',
      'Substances chosen for their physical properties to make things: metals, ceramics, glass, polymers, semiconductors and nanomaterials. Their properties come from how atoms are arranged and bonded.',
    ],
  },
  {
    id: 'mineral',
    icon: 'gem',
    color: '#b36fd6',
    level: 'smp',
    name: ['Mineral & batuan', 'Minerals & rocks'],
    def: [
      'Padatan anorganik alami dengan komposisi kimia tertentu dan susunan kristal yang teratur. Batuan adalah campuran mineral. Indonesia kaya mineral: timah, nikel, bauksit, tembaga, dan emas.',
      'Naturally occurring inorganic solids with a definite chemical composition and an ordered crystal structure. Rocks are mixtures of minerals. Indonesia is rich in tin, nickel, bauxite, copper and gold ores.',
    ],
  },

  // ---------- Elements ----------
  {
    id: 'molekul-unsur',
    parent: 'unsur',
    icon: 'atom',
    color: '#4a9fe0',
    level: 'sd',
    name: ['Molekul unsur', 'Element molecules'],
    def: [
      'Dua atau lebih atom sejenis yang berikatan kovalen, misalnya H₂, O₂, N₂, halogen (F₂, Cl₂, Br₂, I₂), P₄, dan S₈.',
      'Two or more identical atoms joined by covalent bonds, such as H₂, O₂, N₂, the halogens (F₂, Cl₂, Br₂, I₂), P₄ and S₈.',
    ],
    feat: [
      'Tujuh unsur dikenal diatomik di alam: H, N, O, F, Cl, Br, I.',
      'Seven elements occur as diatomic molecules: H, N, O, F, Cl, Br, I.',
    ],
    general: 'Xₙ',
  },
  {
    id: 'gas-mulia',
    parent: 'unsur',
    icon: 'bubble',
    color: '#b36fd6',
    level: 'smp',
    name: ['Gas mulia', 'Noble gases'],
    def: [
      'Unsur golongan 18 (He, Ne, Ar, Kr, Xe, Rn). Kulit valensinya penuh sehingga hampir tidak bereaksi dan berada sebagai atom tunggal.',
      'Group 18 elements (He, Ne, Ar, Kr, Xe, Rn). Their full valence shell makes them almost unreactive, so they exist as single atoms.',
    ],
    feat: [
      'Xenon dapat membentuk senyawa seperti XeF₄ dengan fluorin, unsur paling elektronegatif.',
      'Xenon can still form compounds such as XeF₄ with fluorine, the most electronegative element.',
    ],
    general: 'X (monoatomik)',
  },
  {
    id: 'alotrop-karbon',
    parent: 'unsur',
    icon: 'hexagon',
    color: '#5b6474',
    level: 'smp',
    name: ['Alotrop karbon', 'Carbon allotropes'],
    def: [
      'Bentuk-bentuk berbeda dari unsur karbon murni: intan, grafit, grafena, fulerena, dan nanotube. Atomnya sama, susunannya berbeda, sifatnya pun sangat berbeda.',
      'Different forms of pure carbon: diamond, graphite, graphene, fullerenes and nanotubes. Same atoms, different arrangements, very different properties.',
    ],
    feat: [
      'Intan: tiap C berikatan dengan 4 C (sp³). Grafit & grafena: tiap C berikatan dengan 3 C (sp²) dalam lembaran heksagonal.',
      'Diamond: each C bonds to 4 C (sp³). Graphite & graphene: each C bonds to 3 C (sp²) in hexagonal sheets.',
    ],
    general: 'Cₙ',
  },
  {
    id: 'logam',
    parent: 'unsur',
    icon: 'bolt',
    color: '#d4b83a',
    level: 'sd',
    name: ['Logam', 'Metals'],
    def: [
      'Unsur yang atomnya tersusun dalam kisi kristal dan berbagi "lautan elektron" yang bebas bergerak (ikatan logam). Karena itu logam mengilap, menghantarkan listrik dan panas, serta dapat ditempa.',
      'Elements whose atoms sit in a crystal lattice sharing a "sea" of mobile electrons (metallic bonding). That is why metals shine, conduct electricity and heat, and can be hammered into shape.',
    ],
    feat: [
      'Susunan kisi umum: kubus pusat badan (bcc), kubus pusat muka (fcc), dan heksagonal rapat (hcp).',
      'Common lattices: body-centred cubic (bcc), face-centred cubic (fcc) and hexagonal close-packed (hcp).',
    ],
  },

  // ---------- Inorganic ----------
  {
    id: 'oksida',
    parent: 'anorganik',
    icon: 'flame',
    color: '#e8663d',
    level: 'smp',
    name: ['Oksida', 'Oxides'],
    def: [
      'Senyawa biner antara oksigen dan unsur lain. Oksida logam umumnya bersifat basa (CaO), oksida nonlogam bersifat asam (CO₂, SO₃), dan beberapa bersifat amfoter (Al₂O₃, ZnO).',
      'Binary compounds of oxygen with another element. Metal oxides are usually basic (CaO), nonmetal oxides acidic (CO₂, SO₃), and some are amphoteric (Al₂O₃, ZnO).',
    ],
    general: 'MₓOᵧ',
    naming: [
      'Nonlogam memakai awalan jumlah (karbon dioksida); logam memakai bilangan oksidasi (besi(III) oksida).',
      'Nonmetals use number prefixes (carbon dioxide); metals use oxidation numbers (iron(III) oxide).',
    ],
  },
  {
    id: 'hidrida',
    parent: 'anorganik',
    icon: 'drop',
    color: '#4a9fe0',
    level: 'smp',
    name: ['Hidrida & molekul sederhana', 'Hydrides & simple molecules'],
    def: [
      'Senyawa hidrogen dengan satu unsur lain, seperti H₂O, NH₃, H₂S, HF, PH₃, dan SiH₄. Bentuk molekulnya menjadi contoh terbaik teori VSEPR.',
      'Compounds of hydrogen with one other element, such as H₂O, NH₃, H₂S, HF, PH₃ and SiH₄. Their shapes are textbook examples of VSEPR theory.',
    ],
    general: 'HₙX',
  },
  {
    id: 'asam',
    parent: 'anorganik',
    icon: 'acid',
    color: '#e8663d',
    level: 'smp',
    name: ['Asam', 'Acids'],
    def: [
      'Menurut Arrhenius, asam melepaskan ion H⁺ (H₃O⁺) dalam air; menurut Brønsted–Lowry, asam adalah donor proton. Larutan asam memiliki pH di bawah 7, terasa masam, dan memerahkan lakmus biru.',
      'Arrhenius acids release H⁺ (H₃O⁺) ions in water; Brønsted–Lowry acids are proton donors. Acidic solutions have pH below 7, taste sour and turn blue litmus red.',
    ],
    feat: [
      'Asam kuat (HCl, H₂SO₄, HNO₃) terionisasi sempurna; asam lemah (CH₃COOH, H₂CO₃) hanya sebagian (Ka kecil).',
      'Strong acids (HCl, H₂SO₄, HNO₃) ionise completely; weak acids (CH₃COOH, H₂CO₃) only partly (small Ka).',
    ],
    general: 'HₙA',
  },
  {
    id: 'basa',
    parent: 'anorganik',
    icon: 'base',
    color: '#4a7fe0',
    level: 'smp',
    name: ['Basa', 'Bases'],
    def: [
      'Menurut Arrhenius, basa melepaskan ion OH⁻ dalam air; menurut Brønsted–Lowry, basa adalah akseptor proton. Larutan basa memiliki pH di atas 7, terasa licin, dan membirukan lakmus merah.',
      'Arrhenius bases release OH⁻ ions in water; Brønsted–Lowry bases are proton acceptors. Basic solutions have pH above 7, feel slippery and turn red litmus blue.',
    ],
    general: 'M(OH)ₙ',
  },
  {
    id: 'garam',
    parent: 'anorganik',
    icon: 'crystal',
    color: '#3fb5a3',
    level: 'smp',
    name: ['Garam', 'Salts'],
    def: [
      'Senyawa ionik yang tersusun atas kation (biasanya logam atau NH₄⁺) dan anion sisa asam. Garam terbentuk dari reaksi penetralan asam dan basa.',
      'Ionic compounds made of cations (usually a metal or NH₄⁺) and anions from an acid. Salts form when an acid neutralises a base.',
    ],
    feat: [
      'Dalam keadaan padat membentuk kisi kristal; lelehan dan larutannya menghantarkan listrik.',
      'Solid salts form crystal lattices; molten or dissolved salts conduct electricity.',
    ],
    general: 'MₓAᵧ',
  },
  {
    id: 'kompleks',
    parent: 'anorganik',
    icon: 'star',
    color: '#d4b83a',
    level: 'kuliah',
    name: ['Senyawa koordinasi', 'Coordination compounds'],
    def: [
      'Ion logam pusat yang dikelilingi ligan (molekul atau ion pendonor pasangan elektron) melalui ikatan kovalen koordinasi. Contoh di tubuh: heme dalam hemoglobin.',
      'A central metal ion surrounded by ligands (electron-pair donors) through coordinate covalent bonds. A biological example is heme in haemoglobin.',
    ],
    general: '[MLₙ]ᶻ',
  },

  // ---------- Organic ----------
  {
    id: 'alkana',
    parent: 'organik',
    icon: 'chain',
    color: '#e9a23b',
    level: 'smp',
    name: ['Alkana', 'Alkanes'],
    def: [
      'Hidrokarbon jenuh: semua ikatan C–C tunggal. Alkana sukar bereaksi, tetapi terbakar dengan melepaskan banyak energi sehingga menjadi bahan bakar utama (LPG, bensin, solar).',
      'Saturated hydrocarbons: every C–C bond is single. Alkanes are unreactive but burn releasing lots of energy, so they are the main fuels (LPG, petrol, diesel).',
    ],
    general: 'CₙH₂ₙ₊₂',
    naming: [
      'Akhiran -ana: metana, etana, propana, butana. Sikloalkana (CₙH₂ₙ) diberi awalan siklo-.',
      'Suffix -ane: methane, ethane, propane, butane. Cycloalkanes (CₙH₂ₙ) take the prefix cyclo-.',
    ],
  },
  {
    id: 'alkena',
    parent: 'organik',
    icon: 'chain',
    color: '#e9a23b',
    level: 'sma',
    name: ['Alkena', 'Alkenes'],
    def: [
      'Hidrokarbon tak jenuh dengan sedikitnya satu ikatan rangkap dua C=C. Ikatan π pada C=C mudah diadisi sehingga alkena menjadi bahan baku plastik.',
      'Unsaturated hydrocarbons with at least one C=C double bond. The π bond readily undergoes addition, making alkenes the raw material of plastics.',
    ],
    general: 'CₙH₂ₙ',
    naming: ['Akhiran -ena: etena, propena, 1-butena.', 'Suffix -ene: ethene, propene, but-1-ene.'],
    smarts: '[CX3;!a]=[CX3;!a]',
  },
  {
    id: 'alkuna',
    parent: 'organik',
    icon: 'chain',
    color: '#e9a23b',
    level: 'sma',
    name: ['Alkuna', 'Alkynes'],
    def: [
      'Hidrokarbon tak jenuh dengan ikatan rangkap tiga C≡C. Geometri di sekitar C≡C linear (180°).',
      'Unsaturated hydrocarbons with a C≡C triple bond. The geometry around C≡C is linear (180°).',
    ],
    general: 'CₙH₂ₙ₋₂',
    naming: ['Akhiran -una: etuna (asetilena), propuna.', 'Suffix -yne: ethyne (acetylene), propyne.'],
    smarts: '[CX2]#[CX2]',
  },
  {
    id: 'aromatik',
    parent: 'organik',
    icon: 'hexagon',
    color: '#e9a23b',
    level: 'sma',
    name: ['Hidrokarbon aromatik', 'Aromatic hydrocarbons'],
    def: [
      'Senyawa bercincin datar dengan elektron π terdelokalisasi (aturan Hückel 4n+2), seperti benzena. Delokalisasi membuat cincin sangat stabil sehingga lebih suka reaksi substitusi daripada adisi.',
      'Flat ring compounds with delocalised π electrons (Hückel 4n+2 rule), such as benzene. Delocalisation makes the ring very stable, so it prefers substitution to addition.',
    ],
    general: 'C₆H₅–R',
    smarts: 'c1ccccc1',
  },
  {
    id: 'haloalkana',
    parent: 'organik',
    icon: 'chain',
    color: '#7c7fe8',
    level: 'sma',
    name: ['Haloalkana', 'Haloalkanes'],
    def: [
      'Alkana yang satu atau lebih atom H-nya diganti halogen (F, Cl, Br, I). Contohnya kloroform, freon (CFC), dan PVC (sebagai monomer vinil klorida).',
      'Alkanes in which one or more H atoms are replaced by halogens (F, Cl, Br, I), e.g. chloroform, CFC refrigerants and vinyl chloride.',
    ],
    general: 'R–X',
    smarts: '[CX4][F,Cl,Br,I]',
  },
  {
    id: 'alkohol',
    parent: 'organik',
    icon: 'drop',
    color: '#4a9fe0',
    level: 'sma',
    name: ['Alkohol', 'Alcohols'],
    def: [
      'Senyawa dengan gugus hidroksil (–OH) yang terikat pada atom C jenuh. Gugus –OH membentuk ikatan hidrogen sehingga alkohol kecil larut dalam air dan titik didihnya relatif tinggi.',
      'Compounds with a hydroxyl group (–OH) on a saturated carbon. The –OH forms hydrogen bonds, so small alcohols dissolve in water and have relatively high boiling points.',
    ],
    general: 'R–OH',
    naming: ['Akhiran -ol: metanol, etanol, propan-2-ol.', 'Suffix -ol: methanol, ethanol, propan-2-ol.'],
    smarts: '[CX4][OX2H]',
  },
  {
    id: 'fenol',
    parent: 'organik',
    icon: 'hexagon',
    color: '#4a9fe0',
    level: 'sma',
    name: ['Fenol', 'Phenols'],
    def: [
      'Gugus –OH yang terikat langsung pada cincin aromatik. Fenol lebih asam daripada alkohol dan banyak ditemukan pada rempah (eugenol cengkeh, timol).',
      'An –OH group bonded directly to an aromatic ring. Phenols are more acidic than alcohols and are common in spices (clove eugenol, thymol).',
    ],
    general: 'Ar–OH',
    smarts: 'c[OX2H]',
  },
  {
    id: 'eter',
    parent: 'organik',
    icon: 'chain',
    color: '#3fb5a3',
    level: 'sma',
    name: ['Eter', 'Ethers'],
    def: [
      'Atom oksigen yang mengapit dua gugus karbon (R–O–R′). Eter tidak memiliki H pada O sehingga titik didihnya lebih rendah dari alkohol berisomer.',
      'An oxygen atom between two carbon groups (R–O–R′). Ethers have no H on the O, so they boil lower than isomeric alcohols.',
    ],
    general: 'R–O–R′',
    naming: ['Alkoksi alkana: metoksietana; nama umum: dietil eter.', 'Alkoxyalkane: methoxyethane; common name: diethyl ether.'],
    smarts: '[CX4][OX2][CX4]',
  },
  {
    id: 'aldehida',
    parent: 'organik',
    icon: 'carbonyl',
    color: '#e06fa8',
    level: 'sma',
    name: ['Aldehida', 'Aldehydes'],
    def: [
      'Gugus karbonil (C=O) di ujung rantai, terikat pada sedikitnya satu H (–CHO). Aldehida mudah dioksidasi menjadi asam karboksilat; uji Tollens dan Fehling memanfaatkan sifat ini.',
      'A carbonyl (C=O) at the end of a chain, bonded to at least one H (–CHO). Aldehydes oxidise easily to carboxylic acids — the basis of the Tollens and Fehling tests.',
    ],
    general: 'R–CHO',
    naming: ['Akhiran -al: metanal (formaldehida), etanal.', 'Suffix -al: methanal (formaldehyde), ethanal.'],
    smarts: '[CX3H1](=O)[#6]',
  },
  {
    id: 'keton',
    parent: 'organik',
    icon: 'carbonyl',
    color: '#e06fa8',
    level: 'sma',
    name: ['Keton', 'Ketones'],
    def: [
      'Gugus karbonil (C=O) di tengah rantai, diapit dua atom karbon. Keton tidak mudah dioksidasi sehingga uji Tollens negatif.',
      'A carbonyl (C=O) inside the chain, between two carbon atoms. Ketones resist oxidation, so the Tollens test is negative.',
    ],
    general: 'R–CO–R′',
    naming: ['Akhiran -on: propanon (aseton), butanon.', 'Suffix -one: propanone (acetone), butanone.'],
    smarts: '[#6][CX3](=O)[#6]',
  },
  {
    id: 'asam-karboksilat',
    parent: 'organik',
    icon: 'acid',
    color: '#e8663d',
    level: 'sma',
    name: ['Asam karboksilat', 'Carboxylic acids'],
    def: [
      'Senyawa dengan gugus karboksil (–COOH). Asam lemah yang memberi rasa masam pada cuka, jeruk, dan susu asam.',
      'Compounds with a carboxyl group (–COOH). Weak acids that give vinegar, citrus and sour milk their sour taste.',
    ],
    general: 'R–COOH',
    naming: ['Asam …-oat: asam etanoat (asam asetat).', 'Suffix -oic acid: ethanoic acid (acetic acid).'],
    smarts: '[CX3](=O)[OX2H1]',
  },
  {
    id: 'ester',
    parent: 'organik',
    icon: 'flower',
    color: '#e06fa8',
    level: 'sma',
    name: ['Ester', 'Esters'],
    def: [
      'Hasil reaksi asam karboksilat dengan alkohol (esterifikasi). Banyak ester beraroma buah; lemak dan minyak juga ester (trigliserida).',
      'Made from a carboxylic acid and an alcohol (esterification). Many esters smell fruity; fats and oils are esters too (triglycerides).',
    ],
    general: 'R–COO–R′',
    naming: ['Alkil alkanoat: etil etanoat (etil asetat).', 'Alkyl alkanoate: ethyl ethanoate (ethyl acetate).'],
    smarts: '[#6][CX3](=O)[OX2H0][#6]',
  },
  {
    id: 'amina',
    parent: 'organik',
    icon: 'nitrogen',
    color: '#4a7fe0',
    level: 'sma',
    name: ['Amina', 'Amines'],
    def: [
      'Turunan amonia yang satu atau lebih atom H-nya diganti gugus karbon. Amina bersifat basa lemah dan banyak yang berbau amis (trimetilamina pada ikan).',
      'Derivatives of ammonia in which H atoms are replaced by carbon groups. Amines are weak bases, and many smell fishy (trimethylamine in fish).',
    ],
    general: 'R–NH₂',
    smarts: '[NX3;H2,H1;!$(NC=O)][CX4]',
  },
  {
    id: 'amida',
    parent: 'organik',
    icon: 'nitrogen',
    color: '#4a7fe0',
    level: 'sma',
    name: ['Amida', 'Amides'],
    def: [
      'Gugus karbonil yang terikat pada nitrogen (–CONH–). Ikatan amida adalah ikatan peptida pada protein dan ikatan pada nilon.',
      'A carbonyl bonded to nitrogen (–CONH–). The amide bond is the peptide bond of proteins and the link in nylon.',
    ],
    general: 'R–CONH₂',
    smarts: '[NX3][CX3](=[OX1])[#6]',
  },
  {
    id: 'heterosiklik',
    parent: 'organik',
    icon: 'hexagon',
    color: '#7fb069',
    level: 'sma',
    name: ['Heterosiklik & alkaloid', 'Heterocycles & alkaloids'],
    def: [
      'Senyawa bercincin yang cincinnya memuat atom selain karbon (N, O, S). Alkaloid adalah heterosiklik bernitrogen dari tumbuhan, seperti kafeina, nikotina, dan kina.',
      'Ring compounds whose rings contain atoms other than carbon (N, O, S). Alkaloids are nitrogen heterocycles from plants, such as caffeine, nicotine and quinine.',
    ],
    smarts: '[nR]',
  },
  {
    id: 'organosulfur',
    parent: 'organik',
    icon: 'flame',
    color: '#d4b83a',
    level: 'sma',
    name: ['Senyawa organosulfur', 'Organosulfur compounds'],
    def: [
      'Senyawa organik yang mengandung belerang, seperti tiol (–SH) dan sulfida. Banyak berbau tajam: bawang putih, durian, dan zat pembau gas LPG.',
      'Organic compounds containing sulfur, such as thiols (–SH) and sulfides. Many smell strongly: garlic, durian and the odorant added to LPG.',
    ],
    general: 'R–SH',
    smarts: '[#6][SX2]',
  },

  // ---------- Biomolecules ----------
  {
    id: 'karbohidrat',
    parent: 'biomolekul',
    icon: 'leaf',
    color: '#7fb069',
    level: 'sd',
    name: ['Karbohidrat', 'Carbohydrates'],
    def: [
      'Gula dan polimernya, tersusun atas C, H, dan O dengan rumus umum Cₙ(H₂O)ₘ. Monosakarida (glukosa) bergabung menjadi disakarida (sukrosa) dan polisakarida (pati, selulosa).',
      'Sugars and their polymers, made of C, H and O with the general formula Cₙ(H₂O)ₘ. Monosaccharides (glucose) join into disaccharides (sucrose) and polysaccharides (starch, cellulose).',
    ],
    general: 'Cₙ(H₂O)ₘ',
  },
  {
    id: 'asam-amino',
    parent: 'biomolekul',
    icon: 'dna',
    color: '#7fb069',
    level: 'smp',
    name: ['Asam amino & peptida', 'Amino acids & peptides'],
    def: [
      'Molekul dengan gugus amino (–NH₂) dan karboksil (–COOH) pada karbon yang sama. Dua puluh asam amino standar bergabung melalui ikatan peptida membentuk protein.',
      'Molecules with an amino group (–NH₂) and a carboxyl group (–COOH) on the same carbon. Twenty standard amino acids join by peptide bonds to form proteins.',
    ],
    general: 'H₂N–CHR–COOH',
    smarts: '[NX3][CX4][CX3](=O)[OX2H1]',
  },
  {
    id: 'lipid',
    parent: 'biomolekul',
    icon: 'drop',
    color: '#e9a23b',
    level: 'smp',
    name: ['Lipid & steroid', 'Lipids & steroids'],
    def: [
      'Biomolekul yang tidak larut dalam air tetapi larut dalam pelarut nonpolar: asam lemak, lemak/minyak (trigliserida), fosfolipid membran sel, dan steroid seperti kolesterol.',
      'Biomolecules insoluble in water but soluble in nonpolar solvents: fatty acids, fats and oils (triglycerides), membrane phospholipids and steroids such as cholesterol.',
    ],
  },
  {
    id: 'nukleotida',
    parent: 'biomolekul',
    icon: 'dna',
    color: '#4a9fe0',
    level: 'sma',
    name: ['Nukleotida & basa nitrogen', 'Nucleotides & bases'],
    def: [
      'Penyusun DNA dan RNA: basa nitrogen (A, G, C, T, U), gula pentosa, dan fosfat. ATP adalah nukleotida pembawa energi sel.',
      'The building blocks of DNA and RNA: a nitrogen base (A, G, C, T, U), a pentose sugar and phosphate. ATP is the energy-carrying nucleotide of cells.',
    ],
  },
  {
    id: 'vitamin',
    parent: 'biomolekul',
    icon: 'sun',
    color: '#e9a23b',
    level: 'sd',
    name: ['Vitamin', 'Vitamins'],
    def: [
      'Senyawa organik yang dibutuhkan tubuh dalam jumlah kecil dan sebagian besar harus diperoleh dari makanan. Vitamin A, D, E, K larut lemak; vitamin B dan C larut air.',
      'Organic compounds the body needs in small amounts, mostly from food. Vitamins A, D, E and K dissolve in fat; B vitamins and C dissolve in water.',
    ],
  },
  {
    id: 'hormon',
    parent: 'biomolekul',
    icon: 'signal',
    color: '#e06fa8',
    level: 'smp',
    name: ['Hormon & neurotransmiter', 'Hormones & neurotransmitters'],
    def: [
      'Molekul pembawa pesan di tubuh. Hormon beredar lewat darah (adrenalin, insulin, estrogen), neurotransmiter menyeberangi sinaps antarsel saraf (dopamin, serotonin).',
      'The body’s messenger molecules. Hormones travel in the blood (adrenaline, insulin, oestrogen); neurotransmitters cross synapses between nerve cells (dopamine, serotonin).',
    ],
  },
  {
    id: 'pigmen',
    parent: 'biomolekul',
    icon: 'palette',
    color: '#e8663d',
    level: 'smp',
    name: ['Pigmen alami', 'Natural pigments'],
    def: [
      'Molekul pemberi warna. Warnanya berasal dari sistem ikatan rangkap terkonjugasi panjang yang menyerap sebagian cahaya tampak.',
      'Colour molecules. Their colour comes from long conjugated double-bond systems that absorb part of visible light.',
    ],
  },

  // ---------- Medicines ----------
  {
    id: 'analgesik',
    parent: 'obat',
    icon: 'pill',
    color: '#e06fa8',
    level: 'smp',
    name: ['Analgesik & antiradang', 'Pain relievers & anti-inflammatories'],
    def: [
      'Obat pereda nyeri, demam, dan radang. Banyak yang bekerja dengan menghambat enzim siklooksigenase (COX) pembuat prostaglandin.',
      'Drugs that relieve pain, fever and inflammation. Many block the cyclooxygenase (COX) enzymes that make prostaglandins.',
    ],
  },
  {
    id: 'antiinfeksi',
    parent: 'obat',
    icon: 'shield',
    color: '#e06fa8',
    level: 'sma',
    name: ['Antibiotik & antiinfeksi', 'Antibiotics & anti-infectives'],
    def: [
      'Obat yang membunuh atau menghambat mikroorganisme penyebab penyakit: antibiotik (bakteri), antimalaria (Plasmodium), dan antivirus. Harus dipakai sesuai resep agar tidak memicu resistansi.',
      'Drugs that kill or stop disease-causing microorganisms: antibiotics (bacteria), antimalarials (Plasmodium) and antivirals. They must be used as prescribed to avoid resistance.',
    ],
  },
  {
    id: 'obat-lain',
    parent: 'obat',
    icon: 'heart',
    color: '#e06fa8',
    level: 'sma',
    name: ['Obat penyakit kronis & lainnya', 'Chronic-disease and other drugs'],
    def: [
      'Obat untuk diabetes, tekanan darah, kolesterol, alergi, asma, lambung, dan anestesi. Setiap obat memiliki target molekul yang spesifik.',
      'Drugs for diabetes, blood pressure, cholesterol, allergy, asthma, stomach acid and anaesthesia. Each has a specific molecular target.',
    ],
  },

  // ---------- Materials ----------
  {
    id: 'polimer',
    parent: 'material',
    icon: 'chain',
    color: '#7c7fe8',
    level: 'smp',
    name: ['Polimer & plastik', 'Polymers & plastics'],
    def: [
      'Molekul raksasa yang tersusun atas ribuan unit berulang (monomer). Polimer adisi (polietilena, PVC) terbentuk dari pemutusan ikatan rangkap; polimer kondensasi (nilon, PET) melepaskan molekul kecil seperti air.',
      'Giant molecules made of thousands of repeating units (monomers). Addition polymers (polyethylene, PVC) form by opening double bonds; condensation polymers (nylon, PET) release a small molecule such as water.',
    ],
    general: '–[monomer]ₙ–',
  },
  {
    id: 'keramik',
    parent: 'material',
    icon: 'crystal',
    color: '#3fb5a3',
    level: 'sma',
    name: ['Keramik & kaca', 'Ceramics & glass'],
    def: [
      'Padatan anorganik nonlogam yang keras, tahan panas, dan umumnya isolator: oksida (alumina), karbida, nitrida, dan kaca silikat.',
      'Hard, heat-resistant, usually insulating inorganic nonmetallic solids: oxides (alumina), carbides, nitrides and silicate glass.',
    ],
  },
  {
    id: 'semikonduktor',
    parent: 'material',
    icon: 'chip',
    color: '#4a9fe0',
    level: 'sma',
    name: ['Semikonduktor', 'Semiconductors'],
    def: [
      'Material dengan celah pita energi sedang, sehingga daya hantar listriknya dapat diatur dengan doping, cahaya, atau tegangan. Menjadi dasar transistor, LED, dan sel surya.',
      'Materials with a moderate band gap, so their conductivity can be tuned by doping, light or voltage. They are the basis of transistors, LEDs and solar cells.',
    ],
  },
  {
    id: 'nanomaterial',
    parent: 'material',
    icon: 'hexagon',
    color: '#5b6474',
    level: 'sma',
    name: ['Nanomaterial', 'Nanomaterials'],
    def: [
      'Material dengan sedikitnya satu dimensi berukuran 1–100 nanometer. Pada skala ini sifat listrik, optik, dan kekuatannya berubah drastis.',
      'Materials with at least one dimension of 1–100 nanometres. At this scale their electrical, optical and mechanical properties change dramatically.',
    ],
  },
  {
    id: 'energi-material',
    parent: 'material',
    icon: 'battery',
    color: '#7fb069',
    level: 'sma',
    name: ['Material energi & baterai', 'Energy & battery materials'],
    def: [
      'Material untuk menyimpan dan mengubah energi: elektrode baterai litium-ion, bahan sel surya, dan katalis. Nikel Indonesia adalah bahan penting katode baterai kendaraan listrik.',
      'Materials that store and convert energy: lithium-ion battery electrodes, solar-cell materials and catalysts. Indonesian nickel is key to electric-vehicle battery cathodes.',
    ],
  },
];

const byId = new Map(CLASSES.map(c => [c.id, c]));
export const getClass = id => byId.get(id) || null;
export const rootClasses = () => CLASSES.filter(c => !c.parent);
export const childClasses = id => CLASSES.filter(c => c.parent === id);
/** Path from the family down to this class, e.g. [organik, alkohol]. */
export function classPath(id) {
  const path = [];
  for (let c = getClass(id); c; c = c.parent ? getClass(c.parent) : null) path.unshift(c);
  return path;
}
