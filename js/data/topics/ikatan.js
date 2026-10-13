export default {
  id: 'ikatan',
  icon: 'molecule',
  levels: ['smp', 'sma', 'kuliah'],
  title: ['Ikatan kimia', 'Chemical bonding'],
  summary: [
    'Mengapa atom bergabung? Ikatan ion, kovalen, dan logam, struktur Lewis, dan kepolaran.',
    'Why do atoms join? Ionic, covalent and metallic bonds, Lewis structures and polarity.',
  ],
  body: {
    sd: [
      `Atom-atom tidak suka sendirian. Mereka "bergandengan tangan" membentuk zat. Gandengan ini disebut [[ikatan-kimia|ikatan kimia]]. Ada tiga cara bergandengan:

- **Berbagi**: atom-atom saling berbagi elektron, seperti dua anak memegang satu bola bersama. Begitulah atom hidrogen dan oksigen membentuk {{m:water|air}}.
- **Tarik-menarik muatan**: satu atom memberikan elektron kepada atom lain sehingga keduanya bermuatan dan saling tarik, seperti magnet. Begitulah {{m:sodium-chloride|garam dapur}} terbentuk.
- **Lautan elektron**: atom-atom [[logam]] berbagi elektron beramai-ramai. Elektron yang bebas bergerak inilah yang membuat logam dapat menghantarkan listrik.

Coba buat model molekul dari plastisin (atom) dan tusuk gigi (ikatan).`,
      `Atoms do not like being alone. They "hold hands" to build substances. These handholds are [[ikatan-kimia|chemical bonds]]. There are three ways to hold hands:

- **Sharing**: atoms share electrons, like two children holding one ball together. That is how hydrogen and oxygen atoms make {{m:water|water}}.
- **Pulling on charges**: one atom gives an electron to another, so both become charged and attract like magnets. That is how {{m:sodium-chloride|table salt}} forms.
- **A sea of electrons**: [[logam|metal]] atoms share their electrons all together. These free-moving electrons let metals conduct electricity.

Try building molecule models from play dough (atoms) and toothpicks (bonds).`,
    ],
    smp: [
      `Atom bergabung agar lebih stabil, biasanya dengan mencapai 8 elektron di kulit terluar seperti gas mulia ([[aturan-oktet]]). Ada tiga cara utama:

- [[ikatan-ion|Ikatan ion]]: logam memberikan elektron kepada nonlogam. Na menjadi Na⁺, Cl menjadi Cl⁻, lalu keduanya saling tarik membentuk kristal {{m:sodium-chloride|garam dapur}}.
- [[ikatan-kovalen|Ikatan kovalen]]: nonlogam saling berbagi pasangan elektron, seperti pada {{m:water|air}} dan {{m:methane|metana}}. Berbagi dua pasang elektron menghasilkan ikatan rangkap dua ({{m:oxygen|O=O}}), tiga pasang menghasilkan rangkap tiga ({{m:nitrogen|N≡N}}).
- [[ikatan-logam|Ikatan logam]]: atom logam berbagi "lautan elektron" sehingga logam menghantarkan listrik.

Senyawa ion umumnya bertitik leleh tinggi dan larutannya menghantarkan listrik; senyawa kovalen sederhana umumnya bertitik leleh rendah.`,
      `Atoms combine to become more stable, usually by reaching 8 outer electrons like a noble gas (the [[aturan-oktet|octet rule]]). There are three main ways:

- [[ikatan-ion|Ionic bonds]]: a metal gives electrons to a nonmetal. Na becomes Na⁺, Cl becomes Cl⁻, and they attract to form {{m:sodium-chloride|table salt}} crystals.
- [[ikatan-kovalen|Covalent bonds]]: nonmetals share electron pairs, as in {{m:water|water}} and {{m:methane|methane}}. Sharing two pairs makes a double bond ({{m:oxygen|O=O}}), three pairs a triple bond ({{m:nitrogen|N≡N}}).
- [[ikatan-logam|Metallic bonds]]: metal atoms share a "sea of electrons", so metals conduct electricity.

Ionic compounds usually have high melting points and conduct when dissolved; simple covalent compounds usually melt at low temperatures.`,
    ],
    sma: [
      `[[struktur-lewis|Struktur Lewis]] menunjukkan elektron valensi sebagai titik: pasangan ikatan (garis) dan [[pasangan-elektron-bebas]]. Langkahnya: hitung total elektron valensi, pasang atom pusat (biasanya yang paling tidak elektronegatif), bentuk ikatan tunggal, lengkapi oktet atom luar, lalu buat ikatan rangkap bila perlu. Muatan formal membantu memilih struktur terbaik.

Jenis ikatan dapat diperkirakan dari selisih [[keelektronegatifan]] (ΔEN): ≈ 0 → kovalen nonpolar (Cl₂), 0,4–1,7 → [[ikatan-polar|kovalen polar]] (H–Cl, O–H), > 1,7 → ion (NaCl). Ikatan polar tidak selalu menghasilkan [[molekul-polar]]: {{m:carbon-dioxide|CO₂}} dan {{m:carbon-tetrachloride|CCl₄}} nonpolar karena momen dipolnya saling meniadakan.

[[ikatan-kovalen-koordinasi|Ikatan kovalen koordinasi]] terbentuk bila pasangan elektron hanya berasal dari satu atom, seperti pada NH₄⁺ dan H₃O⁺.

Ada pula pengecualian aturan oktet: oktet tidak lengkap ({{m:boron-trifluoride|BF₃}}), elektron ganjil ({{m:nitric-oxide|NO}}), dan oktet diperluas ({{m:phosphorus-pentachloride|PCl₅}}, {{m:sulfur-hexafluoride|SF₆}}).`,
      `[[struktur-lewis|Lewis structures]] show valence electrons as dots: bonding pairs (lines) and [[pasangan-elektron-bebas|lone pairs]]. Steps: count total valence electrons, choose the central atom (usually the least electronegative), draw single bonds, complete outer octets, then add multiple bonds if needed. Formal charges help choose the best structure.

Bond type can be estimated from the [[keelektronegatifan|electronegativity]] difference (ΔEN): ≈ 0 → nonpolar covalent (Cl₂), 0.4–1.7 → [[ikatan-polar|polar covalent]] (H–Cl, O–H), > 1.7 → ionic (NaCl). Polar bonds do not always make a [[molekul-polar|polar molecule]]: {{m:carbon-dioxide|CO₂}} and {{m:carbon-tetrachloride|CCl₄}} are nonpolar because their dipoles cancel.

A [[ikatan-kovalen-koordinasi|coordinate bond]] forms when one atom supplies both electrons, as in NH₄⁺ and H₃O⁺.

There are octet exceptions: incomplete octets ({{m:boron-trifluoride|BF₃}}), odd electrons ({{m:nitric-oxide|NO}}) and expanded octets ({{m:phosphorus-pentachloride|PCl₅}}, {{m:sulfur-hexafluoride|SF₆}}).`,
    ],
    kuliah: [
      `Energi kisi ionik dapat dihitung dengan siklus Born–Haber (entalpi atomisasi, energi ionisasi, afinitas elektron) atau diperkirakan dengan persamaan Kapustinskii: sebanding dengan hasil kali muatan dan berbanding terbalik dengan jarak antarion. Itulah sebabnya {{m:magnesium-oxide|MgO}} (2+/2−) melebur pada sekitar 2825 °C (data PubChem), jauh di atas NaCl (801 °C).

Teori ikatan valensi (VB) menggambarkan ikatan kovalen sebagai tumpang tindih orbital atom dengan spin berpasangan, dilengkapi [[hibridisasi]] dan resonansi (benzena, ion karbonat). Teori orbital molekul (MO) mengombinasikan orbital atom menjadi orbital ikatan dan antiikatan untuk seluruh molekul. Orde ikatan = ½(elektron ikatan − elektron antiikatan): N₂ = 3, O₂ = 2. Teori MO juga menjelaskan mengapa {{m:oxygen|O₂}} paramagnetik (dua elektron tak berpasangan di π*).

Pada padatan, orbital yang tak terhitung jumlahnya membentuk pita energi. Logam memiliki pita yang terisi sebagian; isolator dan [[semikonduktor]] dibedakan oleh lebar celah pita. Ikatan dalam senyawa kompleks dijelaskan dengan teori medan kristal dan medan ligan.`,
      `Ionic lattice energies come from the Born–Haber cycle (atomisation, ionisation energy, electron affinity) or the Kapustinskii equation: proportional to the product of charges and inversely to ion separation. That is why {{m:magnesium-oxide|MgO}} (2+/2−) melts at about 2825 °C (PubChem data), far above NaCl (801 °C).

Valence bond (VB) theory treats covalent bonds as overlap of atomic orbitals with paired spins, extended by [[hibridisasi|hybridisation]] and resonance (benzene, carbonate). Molecular orbital (MO) theory combines atomic orbitals into bonding and antibonding orbitals over the whole molecule. Bond order = ½(bonding − antibonding electrons): N₂ = 3, O₂ = 2. MO theory explains why {{m:oxygen|O₂}} is paramagnetic (two unpaired π* electrons).

In solids, countless orbitals merge into energy bands. Metals have partly filled bands; insulators and [[semikonduktor|semiconductors]] differ in band-gap width. Bonding in complexes is described by crystal-field and ligand-field theory.`,
    ],
  },
  points: [
    ['Ikatan ion: serah terima elektron (logam–nonlogam).', 'Ionic bond: electron transfer (metal–nonmetal).'],
    ['Ikatan kovalen: pemakaian bersama pasangan elektron (nonlogam–nonlogam).', 'Covalent bond: shared electron pairs (nonmetal–nonmetal).'],
    ['Ikatan logam: kation dalam lautan elektron bebas.', 'Metallic bond: cations in a sea of free electrons.'],
    ['Kepolaran molekul bergantung pada kepolaran ikatan dan bentuk molekul.', 'Molecular polarity depends on bond polarity and shape.'],
  ],
  molecules: ['sodium-chloride', 'water', 'methane', 'nitrogen', 'carbon-dioxide', 'magnesium-oxide', 'copper'],
  labs: ['vsepr', 'kristal', 'rakit'],
  activity: {
    sd: ["Buat model molekul air, oksigen, dan metana dari plastisin dan tusuk gigi, lalu hitung berapa ikatan pada masing-masing atom.", "Build water, oxygen and methane models from play dough and toothpicks, then count the bonds on each atom."],
    smp: ['Uji daya hantar listrik larutan garam, gula, dan air suling dengan rangkaian baterai dan lampu LED. Hubungkan hasilnya dengan jenis ikatan.', 'Test the conductivity of salt water, sugar water and distilled water with a battery and LED. Link the results to bond type.'],
    sma: ['Gambar struktur Lewis 8 molekul dari halaman Kimialoka, lalu cocokkan dengan model 3D-nya.', 'Draw Lewis structures for 8 molecules from Kimialoka and compare them with their 3D models.'],
    kuliah: ['Susun diagram MO untuk N₂, O₂, dan F₂; hitung orde ikatan dan bandingkan dengan panjang ikatan data eksperimen.', 'Build MO diagrams for N₂, O₂ and F₂; compute bond orders and compare with experimental bond lengths.'],
  },
  quiz: [
    { lv: 'sd', q: ["Garam dapur terbentuk karena atom-atomnya…", "Table salt forms because its atoms…"], options: [["Bermuatan dan saling tarik", "Become charged and attract"], ["Tidak berikatan", "Do not bond"], ["Berbagi lautan elektron", "Share a sea of electrons"], ["Meleleh", "Melt"]], answer: 0, explain: ["Natrium memberi elektron kepada klorin; ion Na⁺ dan Cl⁻ saling tarik.", "Sodium gives an electron to chlorine; Na⁺ and Cl⁻ ions attract."] },
    { lv: 'sd', q: ["Logam dapat menghantarkan listrik karena…", "Metals conduct electricity because…"], options: [["Elektronnya bebas bergerak", "Their electrons move freely"], ["Logam berwarna", "Metals are coloured"], ["Logam berat", "Metals are heavy"], ["Logam dingin", "Metals are cold"]], answer: 0, explain: ["Lautan elektron bebas dapat mengalir membawa arus.", "The sea of free electrons can flow and carry current."] },
    { lv: 'smp', q: ['Ikatan pada NaCl adalah ikatan…', 'The bond in NaCl is…'], options: [['Kovalen', 'Covalent'], ['Ion', 'Ionic'], ['Logam', 'Metallic'], ['Hidrogen', 'Hydrogen']], answer: 1, explain: ['Na (logam) memberikan elektron ke Cl (nonlogam) membentuk ion Na⁺ dan Cl⁻.', 'Na (metal) gives an electron to Cl (nonmetal), forming Na⁺ and Cl⁻.'] },
    { lv: 'smp', q: ['Molekul N₂ memiliki ikatan…', 'N₂ has a…'], options: [['Tunggal', 'Single bond'], ['Rangkap dua', 'Double bond'], ['Rangkap tiga', 'Triple bond'], ['Ion', 'Ionic bond']], answer: 2, explain: ['Setiap N berbagi tiga pasang elektron sehingga mencapai oktet.', 'Each N shares three electron pairs to complete its octet.'] },
    { lv: 'smp', q: ['Mengapa logam dapat menghantarkan listrik?', 'Why do metals conduct electricity?'], options: [['Karena keras', 'Because they are hard'], ['Karena memiliki elektron yang bebas bergerak', 'Because they have free-moving electrons'], ['Karena mengilap', 'Because they are shiny'], ['Karena berat', 'Because they are heavy']], answer: 1, explain: ['Lautan elektron terdelokalisasi dapat mengalir saat diberi tegangan.', 'The delocalised electron sea flows when a voltage is applied.'] },
    { lv: 'sma', q: ['Molekul manakah yang nonpolar walaupun ikatannya polar?', 'Which molecule is nonpolar even though its bonds are polar?'], options: [['H₂O', 'H₂O'], ['NH₃', 'NH₃'], ['CO₂', 'CO₂'], ['HCl', 'HCl']], answer: 2, explain: ['CO₂ linear sehingga dua dipol C=O saling meniadakan.', 'CO₂ is linear so the two C=O dipoles cancel.'] },
    { lv: 'sma', q: ['Jumlah pasangan elektron bebas pada atom O dalam H₂O adalah…', 'How many lone pairs are on O in H₂O?'], options: [['0', '0'], ['1', '1'], ['2', '2'], ['3', '3']], answer: 2, explain: ['O punya 6 elektron valensi: 2 dipakai berikatan dengan H, 4 sisanya membentuk 2 PEB.', 'O has 6 valence electrons: 2 bond to H, the other 4 form 2 lone pairs.'] },
    { lv: 'sma', q: ['Senyawa yang tidak memenuhi aturan oktet adalah…', 'Which compound does not obey the octet rule?'], options: [['CH₄', 'CH₄'], ['BF₃', 'BF₃'], ['H₂O', 'H₂O'], ['NaCl', 'NaCl']], answer: 1, explain: ['B dalam BF₃ hanya dikelilingi 6 elektron (oktet tidak lengkap).', 'B in BF₃ has only 6 electrons around it (incomplete octet).'] },
    { lv: 'sma', q: ['Ikatan pada ion NH₄⁺ yang pasangan elektronnya berasal dari N saja disebut…', 'In NH₄⁺, the bond whose pair comes only from N is…'], options: [['Ikatan ion', 'Ionic'], ['Kovalen koordinasi', 'Coordinate covalent'], ['Ikatan hidrogen', 'Hydrogen bond'], ['Ikatan logam', 'Metallic']], answer: 1, explain: ['PEB nitrogen dipakai bersama dengan H⁺ yang tidak membawa elektron.', 'Nitrogen’s lone pair is shared with an H⁺ that brings no electrons.'] },
    { lv: 'kuliah', q: ['Menurut teori orbital molekul, orde ikatan O₂ adalah…', 'By MO theory, the bond order of O₂ is…'], options: [['1', '1'], ['2', '2'], ['2,5', '2.5'], ['3', '3']], answer: 1, explain: ['8 elektron ikatan − 4 antiikatan (valensi) → ½(8 − 4) = 2.', '8 bonding − 4 antibonding valence electrons → ½(8 − 4) = 2.'] },
    { lv: 'kuliah', q: ['MgO memiliki energi kisi jauh lebih besar daripada NaCl terutama karena…', 'MgO has a much larger lattice energy than NaCl mainly because…'], options: [['Mg lebih berat', 'Mg is heavier'], ['Muatan ionnya 2+ dan 2− serta jarak antarion lebih pendek', 'Its ions are 2+ and 2− and closer together'], ['O lebih elektronegatif dari Cl', 'O is more electronegative than Cl'], ['Strukturnya berbeda', 'Its structure is different']], answer: 1, explain: ['Energi kisi ∝ (z⁺·z⁻)/r; muatan ganda menggandakan empat kali pembilangnya.', 'Lattice energy ∝ (z⁺·z⁻)/r; doubled charges quadruple the numerator.'] },
  ],
  teacher: {
    cp: ['Fase E–F: peserta didik menjelaskan pembentukan ikatan ion, kovalen, dan logam serta hubungannya dengan sifat zat.', 'Phases E–F: learners explain how ionic, covalent and metallic bonds form and how they relate to properties.'],
    goals: [
      ['Membedakan ikatan ion, kovalen, dan logam beserta contohnya.', 'Tell ionic, covalent and metallic bonds apart with examples.'],
      ['Menggambar struktur Lewis molekul sederhana.', 'Draw Lewis structures of simple molecules.'],
      ['Menentukan kepolaran ikatan dan molekul.', 'Decide bond and molecular polarity.'],
    ],
    duration: ['4 × 45 menit', '4 × 45 min'],
    steps: [
      ['Demonstrasi daya hantar listrik larutan.', 'Demonstrate the conductivity of solutions.'],
      ['Model kisi NaCl dan tembaga di lab Kristal & material.', 'Explore NaCl and copper lattices in the Crystals lab.'],
      ['Latihan struktur Lewis berpasangan; cek dengan model 3D Kimialoka.', 'Pair practice on Lewis structures; check against Kimialoka 3D models.'],
      ['Kuis dan refleksi.', 'Quiz and reflection.'],
    ],
    misconceptions: [
      ['"NaCl terdiri atas molekul NaCl." Kristal NaCl adalah kisi ion; rumusnya perbandingan.', '"NaCl is made of NaCl molecules." It is an ionic lattice; the formula is a ratio.'],
      ['"Ikatan pecah melepaskan energi." Memutus ikatan selalu memerlukan energi.', '"Breaking bonds releases energy." Breaking bonds always needs energy.'],
    ],
    assessment: ['Kuis Kimialoka dan lembar struktur Lewis.', 'Kimialoka quiz and a Lewis-structure worksheet.'],
  },
  refs: ["7-1-ionic-bonding", "7-2-covalent-bonding", "7-3-lewis-symbols-and-structures", "7-4-formal-charges-and-resonance", "7-5-strengths-of-ionic-and-covalent-bonds", "8-4-molecular-orbital-theory"],
};
