import React, { useState, useEffect, useRef } from 'react';
import {
  BookOpen, Compass, Map as MapIcon, Users, ShieldCheck, Volume2, Play, Pause,
  Square, RotateCcw, Eye, Ear, Accessibility, Sparkles, CheckCircle2, AlertTriangle,
  ExternalLink, Plus, Trash2, Edit3, LogOut, Lock, BarChart3, MessageSquare,
  Globe, ChevronRight, Hand, Navigation, ZoomIn, ZoomOut, Layers, HelpCircle,
  Info, Award, Building2, Clock, Check
} from 'lucide-react';

// ============================================================================
// PANGKALAN DATA DEMONSTRASI TAPAK SEJARAH (DISAHKAN FAKTA SEJARAH)
// ============================================================================
const INITIAL_SITES = [
  {
    id: 'SAS-01',
    name: {
      ms: 'Bangunan Sultan Abdul Samad',
      en: 'Sultan Abdul Samad Building'
    },
    category: {
      ms: 'Seni Bina Warisan & Pentadbiran',
      en: 'Heritage Architecture & Administration'
    },
    year: '1894 – 1897',
    architect: 'A.C. Norman, R.A.J. Bidwell & A.B. Hubback',
    lat: 3.1486,
    lng: 101.6944,
    wheelchairAccessible: true,
    estimatedMinutes: 35,
    imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=900&q=80',
    audioUrl: '',
    summary: {
      ms: 'Mercu tanda ikonik bergaya Indo-Saracenic di hadapan Dataran Merdeka yang dahulunya menempatkan Pejabat Sekretariat Kerajaan Negeri-Negeri Melayu Bersekutu.',
      en: 'An iconic Indo-Saracenic landmark facing Merdeka Square that originally housed the Secretariat offices of the Federated Malay States.'
    },
    history: {
      ms: 'Pembinaan dimulakan pada 6 Oktober 1894 oleh Gabenor Negeri-Negeri Selat, Sir Charles Mitchell, dan dirasmikan pada 4 April 1897 oleh Residen Jeneral Frank Swettenham. Bangunan ini menampilkan menara jam setinggi 41 meter serta tiga kubah tembaga yang melambangkan warisan pentadbiran dan kehakiman negara.',
      en: 'Construction began on 6 October 1894 under Straits Settlements Governor Sir Charles Mitchell and was officiated on 4 April 1897 by Resident-General Frank Swettenham. It features a 41-metre clock tower and three copper domes symbolizing Malaysia’s administrative and judicial heritage.'
    },
    figures: {
      ms: 'A.C. Norman (Arkitek), Sir Frank Swettenham, Tunku Abdul Rahman Putra Al-Haj',
      en: 'A.C. Norman (Architect), Sir Frank Swettenham, Tunku Abdul Rahman Putra Al-Haj'
    },
    events: {
      ms: 'Menjadi saksi sejarah penurunan bendera Union Jack dan pengisytiharan kemerdekaan Persekutuan Tanah Melayu pada 31 Ogos 1957.',
      en: 'Witnessed the lowering of the Union Jack flag and the proclamation of Malayan independence on 31 August 1957.'
    },
    heritageValue: {
      ms: 'Diwartakan sebagai Warisan Kebangsaan di bawah Akta Warisan Kebangsaan 2005 (Akta 645) oleh Jabatan Warisan Negara.',
      en: 'Gazetted as a National Heritage site under the National Heritage Act 2005 (Act 645) by the Department of National Heritage.'
    },
    accessibilityNote: {
      ms: 'Data Demonstrasi Audit: Laluan kaki lima hadapan rata dengan tanjakan landai di pintu sisi timur; ruang dalaman tertentu mempunyai tangga asal.',
      en: 'Audit Demo Data: Front promenade is flat with a gentle ramp at the east side entrance; certain interior chambers retain original steps.'
    },
    reference: {
      ms: 'Jabatan Warisan Negara (JWN) & Arkib Negara Malaysia – Daftar Warisan Kebangsaan (Akta 645).',
      en: 'Department of National Heritage (JWN) & National Archives of Malaysia – National Heritage Register (Act 645).'
    },
    signKeywords: {
      ms: ['SULTAN', 'ABDUL', 'SAMAD', '1897', 'MERDEKA'],
      en: ['SULTAN', 'ABDUL', 'SAMAD', '1897', 'HERITAGE']
    }
  },
  {
    id: 'DM-02',
    name: {
      ms: 'Dataran Merdeka (Padang Kelab Selangor)',
      en: 'Merdeka Square (Selangor Club Padang)'
    },
    category: {
      ms: 'Tapak Kemerdekaan Negara',
      en: 'National Independence Ground'
    },
    year: '1890 / 31 Ogos 1957',
    architect: 'Padang Bersejarah • Tunku Abdul Rahman Putra Al-Haj',
    lat: 3.1489,
    lng: 101.6936,
    wheelchairAccessible: true,
    estimatedMinutes: 25,
    imageUrl: 'https://images.unsplash.com/photo-1508062878650-88b52897f298?auto=format&fit=crop&w=900&q=80',
    audioUrl: '',
    summary: {
      ms: 'Padang bersejarah tempat bendera Persekutuan Tanah Melayu dinaikkan buat julung kalinya tepat jam 12.00 tengah malam 31 Ogos 1957.',
      en: 'The historic field where the Federation of Malaya flag was hoisted for the very first time at midnight on 31 August 1957.'
    },
    history: {
      ms: 'Asalnya digunakan sebagai padang kriket bagi Kelab Diraja Selangor sejak akhir abad ke-19. Pada malam 30 Ogos 1957, ribuan rakyat berhimpun menyaksikan penurunan bendera British dan laungan "Merdeka!" sebanyak tujuh kali oleh Bapa Kemerdekaan.',
      en: 'Originally used as the cricket green for the Royal Selangor Club since the late 19th century. On the night of 30 August 1957, thousands gathered to witness the lowering of the British flag and seven chants of "Merdeka!" led by the Father of Independence.'
    },
    figures: {
      ms: 'Tunku Abdul Rahman Putra Al-Haj, Tun H.S. Lee, Tun V.T. Sambanthan',
      en: 'Tunku Abdul Rahman Putra Al-Haj, Tun H.S. Lee, Tun V.T. Sambanthan'
    },
    events: {
      ms: 'Upacara Penurunan Bendera Union Jack (30 Ogos 1957) dan Sambutan Hari Kebangsaan Tahunan.',
      en: 'Lowering of the Union Jack Ceremony (30 August 1957) and Annual National Day Parades.'
    },
    heritageValue: {
      ms: 'Simbol penyatuan rakyat berbilang kaum dan kelahiran negara Malaysia yang berdaulat.',
      en: 'A symbol of multi-ethnic unity and the birth of a sovereign Malaysian nation.'
    },
    accessibilityNote: {
      ms: 'Data Demonstrasi Audit: Kawasan dataran berturap rata sepenuhnya dengan lintasan pejalan kaki bertekstur (tactile paving) untuk OKU penglihatan.',
      en: 'Audit Demo Data: Fully paved flat plaza equipped with tactile paving crossings for visitors with visual impairments.'
    },
    reference: {
      ms: 'Arkib Negara Malaysia – Koleksi Pengisytiharan Kemerdekaan 1957.',
      en: 'National Archives of Malaysia – 1957 Proclamation of Independence Collection.'
    },
    signKeywords: {
      ms: ['DATARAN', 'MERDEKA', '1957', 'TUNKU', 'MALAYSIA'],
      en: ['MERDEKA', 'SQUARE', '1957', 'FREEDOM', 'UNITY']
    }
  },
  {
    id: 'MJ-03',
    name: {
      ms: 'Masjid Jamek Sultan Abdul Samad',
      en: 'Sultan Abdul Samad Jamek Mosque'
    },
    category: {
      ms: 'Warisan Keagamaan & Pertemuan Sungai',
      en: 'Religious Heritage & River Confluence'
    },
    year: '1907 – 1909',
    architect: 'Arthur Benison Hubback',
    lat: 3.1490,
    lng: 101.6956,
    wheelchairAccessible: true,
    estimatedMinutes: 30,
    imageUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=80',
    audioUrl: '',
    summary: {
      ms: 'Masjid tertua di Kuala Lumpur yang dibina di titik pertemuan Sungai Klang dan Sungai Gombak—lokasi asal nama "Kuala Lumpur".',
      en: 'The oldest surviving mosque in Kuala Lumpur, built at the confluence of the Klang and Gombak rivers—the birthplace of Kuala Lumpur.'
    },
    history: {
      ms: 'Direka oleh arkitek A.B. Hubback dengan pengaruh seni bina Mughal dari India Utara. Batu asasnya diletakkan oleh Sultan Selangor, Sultan Alauddin Sulaiman Shah pada 23 Mac 1908 dan dirasmikan pada 23 Disember 1909.',
      en: 'Designed by architect A.B. Hubback with North Indian Mughal architectural influences. Its foundation stone was laid by Sultan Alauddin Sulaiman Shah of Selangor on 23 March 1908 and opened on 23 December 1909.'
    },
    figures: {
      ms: 'Sultan Alauddin Sulaiman Shah, Arthur Benison Hubback',
      en: 'Sultan Alauddin Sulaiman Shah, Arthur Benison Hubback'
    },
    events: {
      ms: 'Menjadi masjid utama Kuala Lumpur sebelum pembinaan Masjid Negara pada tahun 1965.',
      en: 'Served as Kuala Lumpur’s principal mosque prior to the completion of Masjid Negara in 1965.'
    },
    heritageValue: {
      ms: 'Memelihara sejarah awal petempatan Kuala Lumpur di kuala pertemuan dua sungai.',
      en: 'Preserves the earliest settlement history of Kuala Lumpur at the twin-river confluence.'
    },
    accessibilityNote: {
      ms: 'Data Demonstrasi Audit: Laluan kerusi roda disediakan dari pintu masuk Jalan Tun Perak hingga ke ruang legar utama dan kawasan wuduk mesra OKU.',
      en: 'Audit Demo Data: Wheelchair ramp access available from the Jalan Tun Perak entrance to the main courtyard and accessible ablution area.'
    },
    reference: {
      ms: 'Jabatan Warisan Negara & Jabatan Agama Islam Wilayah Persekutuan (JAWI).',
      en: 'Department of National Heritage & Federal Territories Islamic Religious Department (JAWI).'
    },
    signKeywords: {
      ms: ['MASJID', 'JAMEK', 'KLANG', 'GOMBAK', '1909'],
      en: ['JAMEK', 'MOSQUE', 'RIVER', 'MUGHAL', '1909']
    }
  },
  {
    id: 'PB-04',
    name: {
      ms: 'Panggung Bandaraya Kuala Lumpur',
      en: 'Kuala Lumpur City Theatre (Panggung Bandaraya)'
    },
    category: {
      ms: 'Seni Persembahan & Pentadbiran Perbandaran',
      en: 'Performing Arts & Municipal Heritage'
    },
    year: '1896 – 1904',
    architect: 'Arthur Benison Hubback',
    lat: 3.1502,
    lng: 101.6948,
    wheelchairAccessible: false,
    estimatedMinutes: 20,
    imageUrl: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?auto=format&fit=crop&w=900&q=80',
    audioUrl: '',
    summary: {
      ms: 'Bangunan Dewan Bandaran lama yang menempatkan teater bersejarah tertua di Kuala Lumpur dengan reka bentuk bata merah dan kubah Moor.',
      en: 'The former Old Town Hall housing Kuala Lumpur’s oldest historic theatre, distinguished by red brickwork and Moorish domes.'
    },
    history: {
      ms: 'Siap dibina pada tahun 1904 sebagai Dewan Bandaran Kuala Lumpur bagi majlis rasmi dan pementasan teater. Bangunan ini dipulihara selepas kebakaran pada tahun 1992 dengan mengekalkan fasad warisan asalnya.',
      en: 'Completed in 1904 as the Kuala Lumpur Town Hall for civic receptions and theatrical performances. Restored after a 1992 fire while preserving its original heritage facade.'
    },
    figures: {
      ms: 'Arthur Benison Hubback, Lembaga Kebersihan Kuala Lumpur (Sanitary Board)',
      en: 'Arthur Benison Hubback, Kuala Lumpur Sanitary Board'
    },
    events: {
      ms: 'Pusat perkembangan seni teater bangsawan dan persembahan kebudayaan tempatan sejak awal abad ke-20.',
      en: 'Hub for traditional bangsawan theatre and local cultural productions since the early 20th century.'
    },
    heritageValue: {
      ms: 'Contoh unggul pemuliharaan bangunan teater era kolonial di pusat bandar.',
      en: 'An outstanding example of colonial-era civic theatre conservation in the city centre.'
    },
    accessibilityNote: {
      ms: 'Data Demonstrasi Audit: Fasad luar boleh dilihat dari kaki lima rata, namun akses ke balkoni auditorium dalaman mempunyai tangga curam (Tidak disyorkan untuk kerusi roda tanpa bantuan khas).',
      en: 'Audit Demo Data: Exterior facade is viewable from a flat sidewalk, but upper interior auditorium seating has steep stairs (Not recommended for independent wheelchair access).'
    },
    reference: {
      ms: 'Dewan Bandaraya Kuala Lumpur (DBKL) & Jabatan Warisan Negara.',
      en: 'Kuala Lumpur City Hall (DBKL) & Department of National Heritage.'
    },
    signKeywords: {
      ms: ['PANGGUNG', 'BANDARAYA', 'TEATER', 'SENI', '1904'],
      en: ['CITY', 'THEATRE', 'STAGE', 'ARTS', '1904']
    }
  },
  {
    id: 'MTN-05',
    name: {
      ms: 'Muzium Tekstil Negara',
      en: 'National Textile Museum'
    },
    category: {
      ms: 'Warisan Kraf & Seni Tekstil',
      en: 'Craft Heritage & Textile Arts'
    },
    year: '1905 (Dibuka sebagai Muzium 2010)',
    architect: 'Arthur Benison Hubback',
    lat: 3.1476,
    lng: 101.6943,
    wheelchairAccessible: true,
    estimatedMinutes: 40,
    imageUrl: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?auto=format&fit=crop&w=900&q=80',
    audioUrl: '',
    summary: {
      ms: 'Mempamerkan kekayaan warisan tenunan songket, batik, pua kumbu, dan telepuk dari seluruh negeri di Malaysia.',
      en: 'Showcases the rich heritage of songket weaving, batik, pua kumbu, and telepuk textiles from across Malaysia.'
    },
    history: {
      ms: 'Asalnya dibina pada tahun 1905 sebagai ibu pejabat Keretapi Negeri-Negeri Melayu Bersekutu (FMSR). Pada tahun 2010, Jabatan Muzium Malaysia membukanya secara rasmi sebagai Muzium Tekstil Negara.',
      en: 'Originally built in 1905 as the headquarters of the Federated Malay States Railways (FMSR). In 2010, the Department of Museums Malaysia officially opened it as the National Textile Museum.'
    },
    figures: {
      ms: 'Arthur Benison Hubback, Jabatan Muzium Malaysia',
      en: 'Arthur Benison Hubback, Department of Museums Malaysia'
    },
    events: {
      ms: 'Pameran tetap empat galeri utama: Galeri Pohon Budi, Galeri Pelangi, Galeri Teluk Berantai, dan Galeri Ratna Sari.',
      en: 'Permanent exhibition across four galleries: Pohon Budi, Pelangi, Teluk Berantai, and Ratna Sari.'
    },
    heritageValue: {
      ms: 'Memelihara teknologi dan falsafah seni tekstil tradisional masyarakat Melayu, Sabah, Sarawak dan Orang Asli.',
      en: 'Preserves the craftsmanship and philosophy of traditional textiles of Malay, Sabah, Sarawak, and Orang Asli communities.'
    },
    accessibilityNote: {
      ms: 'Data Demonstrasi Audit: Dilengkapi lif penumpang ke tingkat atas, tandas OKU di aras bawah, dan laluan galeri yang luas untuk kerusi roda.',
      en: 'Audit Demo Data: Equipped with a passenger lift to upper floors, accessible washroom on the ground floor, and wide gallery aisles for wheelchairs.'
    },
    reference: {
      ms: 'Jabatan Muzium Malaysia (JMM) – Portal Rasmi Muzium Tekstil Negara.',
      en: 'Department of Museums Malaysia (JMM) – Official National Textile Museum Portal.'
    },
    signKeywords: {
      ms: ['MUZIUM', 'TEKSTIL', 'SONGKET', 'BATIK', 'WARISAN'],
      en: ['TEXTILE', 'MUSEUM', 'SONGKET', 'BATIK', 'CRAFT']
    }
  }
];

// ============================================================================
// DATA KEMUDAHAN & LALUAN PETA (DILABEL SEBAGAI DATA DEMONSTRASI AUDIT)
// ============================================================================
const ACCESSIBILITY_FACILITIES = [
  {
    id: 'FAC-1',
    type: 'washroom',
    name: { ms: 'Tandas Mesra OKU & Warga Emas (Dataran Bawah Tanah)', en: 'Accessible Washroom (Underground Plaza)' },
    lat: 3.1483,
    lng: 101.6939,
    note: { ms: 'Data Demonstrasi: Dilengkapi palang pemegang & pintu gelangsar lebar.', en: 'Demo Data: Equipped with grab bars & wide sliding door.' }
  },
  {
    id: 'FAC-2',
    type: 'parking',
    name: { ms: 'Parkir Khas OKU (Jalan Raja / Dataran)', en: 'Designated OKU Parking (Jalan Raja / Square)' },
    lat: 3.1494,
    lng: 101.6935,
    note: { ms: 'Data Demonstrasi: 4 petak parkir bertanda biru berhampiran tanjakan.', en: 'Demo Data: 4 blue-marked bays adjacent to curb ramp.' }
  },
  {
    id: 'FAC-3',
    type: 'rest',
    name: { ms: 'Ruang Rehat Berbumbung & Bangku Mesra Warga Emas', en: 'Shaded Rest Area & Senior-Friendly Benches' },
    lat: 3.1480,
    lng: 101.6947,
    note: { ms: 'Data Demonstrasi: Kawasan teduh dengan tempat duduk bersandar.', en: 'Demo Data: Shaded zone with back-supported seating.' }
  }
];

// ============================================================================
// DATA ISYARAT JARI ANATOMI (HURUF A-Z & NOMBOR 0-9 UNTUK EJAAN JARI / BIM)
// Format: [Ibu Jari, Telunjuk, Tengah, Manis, Kelingking] -> 0 = Tutup, 0.5 = Bengkok, 1 = Lurus
// ============================================================================
const FINGER_SIGN_MAP = {
  A: { fingers: [1, 0, 0, 0, 0], desc: { ms: 'Genggam empat jari, ibu jari tegak di sisi', en: 'Closed fist with thumb upright at the side' } },
  B: { fingers: [0, 1, 1, 1, 1], desc: { ms: 'Empat jari lurus rapat, ibu jari lipat ke tapak', en: 'Four fingers straight together, thumb folded across palm' } },
  C: { fingers: [0.5, 0.5, 0.5, 0.5, 0.5], desc: { ms: 'Semua jari melengkung membentuk huruf C', en: 'All fingers curved into a C shape' } },
  D: { fingers: [0.5, 1, 0, 0, 0], desc: { ms: 'Jari telunjuk tegak lurus, jari lain menyentuh ibu jari', en: 'Index finger straight up, other fingers touch thumb' } },
  E: { fingers: [0, 0.5, 0.5, 0.5, 0.5], desc: { ms: 'Semua hujung jari dibengkokkan ke arah tapak tangan', en: 'All fingertips bent toward the palm' } },
  F: { fingers: [0.5, 0.5, 1, 1, 1], desc: { ms: 'Ibu jari & telunjuk bertemu bulat, tiga jari tegak', en: 'Thumb & index form a circle, three fingers upright' } },
  G: { fingers: [1, 1, 0, 0, 0], desc: { ms: 'Jari telunjuk & ibu jari menunjuk selari', en: 'Index finger and thumb pointing parallel' } },
  H: { fingers: [0, 1, 1, 0, 0], desc: { ms: 'Jari telunjuk dan jari tengah diluruskan rapat', en: 'Index and middle fingers extended together' } },
  I: { fingers: [0, 0, 0, 0, 1], desc: { ms: 'Jari kelingking tegak lurus, jari lain digenggam', en: 'Pinky finger straight up, other fingers closed' } },
  J: { fingers: [0, 0, 0, 0, 1], desc: { ms: 'Jari kelingking tegak dan melukis lengkung J', en: 'Pinky finger upright tracing a J curve' } },
  K: { fingers: [1, 1, 1, 0, 0], desc: { ms: 'Telunjuk & jari tengah terbuka V dengan ibu jari di tengah', en: 'Index & middle open in V with thumb between' } },
  L: { fingers: [1, 1, 0, 0, 0], desc: { ms: 'Ibu jari dan telunjuk membentuk sudut tepat L', en: 'Thumb and index finger form a right-angle L' } },
  M: { fingers: [0, 0.5, 0.5, 0.5, 0], desc: { ms: 'Tiga jari tengah dilipat di atas ibu jari', en: 'Three middle fingers folded over the thumb' } },
  N: { fingers: [0, 0.5, 0.5, 0, 0], desc: { ms: 'Dua jari dilipat di atas ibu jari', en: 'Two fingers folded over the thumb' } },
  O: { fingers: [0.5, 0.5, 0.5, 0.5, 0.5], desc: { ms: 'Semua hujung jari bertemu membentuk bulatan O', en: 'All fingertips meet to form an O circle' } },
  P: { fingers: [1, 1, 0.5, 0, 0], desc: { ms: 'Telunjuk lurus, jari tengah condong dengan ibu jari', en: 'Index straight, middle angled with thumb' } },
  Q: { fingers: [1, 0.5, 0, 0, 0], desc: { ms: 'Ibu jari & telunjuk menghala ke bawah', en: 'Thumb & index pointing downward' } },
  R: { fingers: [0, 1, 1, 0, 0], desc: { ms: 'Jari telunjuk dan jari tengah bersilang tegak', en: 'Index and middle fingers crossed upright' } },
  S: { fingers: [0, 0, 0, 0, 0], desc: { ms: 'Genggam kemas dengan ibu jari melintang di hadapan', en: 'Closed fist with thumb crossed in front' } },
  T: { fingers: [0.5, 0.5, 0, 0, 0], desc: { ms: 'Ibu jari diselit di bawah jari telunjuk', en: 'Thumb tucked beneath the index finger' } },
  U: { fingers: [0, 1, 1, 0, 0], desc: { ms: 'Jari telunjuk dan tengah tegak rapat ke atas', en: 'Index and middle fingers upright together' } },
  V: { fingers: [0, 1, 1, 0, 0], desc: { ms: 'Jari telunjuk dan tengah dibuka membentuk huruf V', en: 'Index and middle fingers spread in a V' } },
  W: { fingers: [0, 1, 1, 1, 0], desc: { ms: 'Tiga jari (telunjuk, tengah, manis) terbuka tegak', en: 'Three fingers (index, middle, ring) spread upright' } },
  X: { fingers: [0, 0.5, 0, 0, 0], desc: { ms: 'Jari telunjuk dibengkokkan seperti cangkuk', en: 'Index finger hooked/bent' } },
  Y: { fingers: [1, 0, 0, 0, 1], desc: { ms: 'Ibu jari dan jari kelingking dibuka luas', en: 'Thumb and pinky finger extended wide' } },
  Z: { fingers: [0, 1, 0, 0, 0], desc: { ms: 'Jari telunjuk melakar bentuk huruf Z di udara', en: 'Index finger traces the letter Z in the air' } },
  '0': { fingers: [0.5, 0.5, 0.5, 0.5, 0.5], desc: { ms: 'Semua jari membentuk bulatan sifar (0)', en: 'All fingers form a zero (0) circle' } },
  '1': { fingers: [0, 1, 0, 0, 0], desc: { ms: 'Satu jari telunjuk tegak ke atas', en: 'Single index finger pointing straight up' } },
  '2': { fingers: [0, 1, 1, 0, 0], desc: { ms: 'Dua jari (telunjuk & tengah) tegak terbuka', en: 'Two fingers (index & middle) upright' } },
  '3': { fingers: [1, 1, 1, 0, 0], desc: { ms: 'Tiga jari (ibu jari, telunjuk, tengah) terbuka', en: 'Three fingers (thumb, index, middle) extended' } },
  '4': { fingers: [0, 1, 1, 1, 1], desc: { ms: 'Empat jari tegak terbuka, ibu jari dilipat', en: 'Four fingers extended upright, thumb folded' } },
  '5': { fingers: [1, 1, 1, 1, 1], desc: { ms: 'Kelima-lima jari terbuka luas', en: 'All five fingers extended wide' } },
  '6': { fingers: [0.5, 1, 1, 1, 0.5], desc: { ms: 'Ibu jari menyentuh jari kelingking, tiga jari tegak', en: 'Thumb touches pinky, three fingers upright' } },
  '7': { fingers: [0.5, 1, 1, 0.5, 1], desc: { ms: 'Ibu jari menyentuh jari manis, tiga jari tegak', en: 'Thumb touches ring finger, three fingers upright' } },
  '8': { fingers: [0.5, 1, 0.5, 1, 1], desc: { ms: 'Ibu jari menyentuh jari tengah, tiga jari tegak', en: 'Thumb touches middle finger, three fingers upright' } },
  '9': { fingers: [0.5, 0.5, 1, 1, 1], desc: { ms: 'Ibu jari menyentuh jari telunjuk, tiga jari tegak', en: 'Thumb touches index finger, three fingers upright' } }
};

// ============================================================================
// KOMPONEN VISUALIZER SIMBOL JARI & TANGAN MANUSIA ANATOMI
// ============================================================================
function AnatomicalHandVisualizer({ keywords, lang }) {
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);

  const safeKeywords = keywords && keywords.length > 0 ? keywords : ['WARISAN'];
  const currentWord = safeKeywords[wordIdx % safeKeywords.length] || 'WARISAN';
  const currentChar = (currentWord[charIdx] || 'A').toUpperCase();
  const signData = FINGER_SIGN_MAP[currentChar] || FINGER_SIGN_MAP['A'];
  const [thumb, indexF, middleF, ringF, pinkyF] = signData.fingers;

  useEffect(() => {
    setWordIdx(0);
    setCharIdx(0);
  }, [keywords]);

  useEffect(() => {
    if (!isPlaying) return;
    const intervalMs = Math.max(280, Math.round(950 / speed));
    const timer = setInterval(() => {
      setCharIdx((prevChar) => {
        if (prevChar + 1 < currentWord.length) {
          return prevChar + 1;
        } else {
          setWordIdx((prevWord) => (prevWord + 1) % safeKeywords.length);
          return 0;
        }
      });
    }, intervalMs);
    return () => clearInterval(timer);
  }, [isPlaying, speed, currentWord, safeKeywords]);

  // Kira panjang & sudut jari berdasarkan keadaan (0 = tutup, 0.5 = bengkok, 1 = lurus)
  const getFingerHeight = (state, maxH) => {
    if (state === 1) return maxH;
    if (state === 0.5) return maxH * 0.56;
    return maxH * 0.26;
  };

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 border-2 border-teal-500/40 shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <Hand className="w-5 h-5 text-amber-400" />
          <span className="font-bold text-sm tracking-wide uppercase text-teal-300">
            {lang === 'ms' ? 'Visualizer Isyarat Jari & Tangan (BIM / Ejaan Jari)' : 'Anatomical Finger & Hand Sign Visualizer'}
          </span>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 font-medium">
          {lang === 'ms' ? 'Demonstrasi Isyarat Jari Interaktif' : 'Interactive Finger-Spelling Demo'}
        </span>
      </div>

      {/* Pilihan Kata Kunci Sejarah */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {safeKeywords.map((kw, idx) => (
          <button
            key={idx}
            onClick={() => { setWordIdx(idx); setCharIdx(0); setIsPlaying(true); }}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
              idx === wordIdx
                ? 'bg-teal-500 text-slate-950 shadow'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {kw}
          </button>
        ))}
      </div>

      {/* Kanvas SVG Tangan Manusia Anatomi Berdefinisi Tinggi */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-slate-950/90 rounded-xl p-4 border border-slate-800">
        <div className="md:col-span-6 flex flex-col items-center justify-center">
          <svg
            viewBox="0 0 260 270"
            className="w-56 h-56 drop-shadow-[0_6px_18px_rgba(20,184,166,0.28)]"
            role="img"
            aria-label={`Isyarat jari untuk huruf ${currentChar}`}
          >
            <defs>
              <linearGradient id="skinTone" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F5CBA7" />
                <stop offset="60%" stopColor="#E0AC69" />
                <stop offset="100%" stopColor="#C68642" />
              </linearGradient>
              <linearGradient id="palmShade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E5B278" />
                <stop offset="100%" stopColor="#B97A3D" />
              </linearGradient>
            </defs>

            {/* Pergelangan Tangan */}
            <rect x="92" y="205" width="76" height="52" rx="14" fill="url(#palmShade)" stroke="#8D5524" strokeWidth="2" />

            {/* Jari Kelingking (Pinky) */}
            <g style={{ transition: 'all 0.25s ease' }}>
              <rect
                x="164"
                y={132 - getFingerHeight(pinkyF, 68)}
                width="20"
                height={getFingerHeight(pinkyF, 68)}
                rx="10"
                fill="url(#skinTone)"
                stroke="#8D5524"
                strokeWidth="2"
              />
              {/* Sendi & Kuku */}
              <line x1="168" y1={132 - getFingerHeight(pinkyF, 68) * 0.55} x2="180" y2={132 - getFingerHeight(pinkyF, 68) * 0.55} stroke="#A66B33" strokeWidth="1.5" />
              {pinkyF === 1 && (
                <rect x="169" y={136 - getFingerHeight(pinkyF, 68)} width="10" height="9" rx="4" fill="#FADBD8" opacity="0.75" />
              )}
            </g>

            {/* Jari Manis (Ring) */}
            <g style={{ transition: 'all 0.25s ease' }}>
              <rect
                x="141"
                y={128 - getFingerHeight(ringF, 84)}
                width="22"
                height={getFingerHeight(ringF, 84)}
                rx="11"
                fill="url(#skinTone)"
                stroke="#8D5524"
                strokeWidth="2"
              />
              <line x1="145" y1={128 - getFingerHeight(ringF, 84) * 0.55} x2="159" y2={128 - getFingerHeight(ringF, 84) * 0.55} stroke="#A66B33" strokeWidth="1.5" />
              {ringF === 1 && (
                <rect x="146" y={132 - getFingerHeight(ringF, 84)} width="12" height="10" rx="4" fill="#FADBD8" opacity="0.75" />
              )}
            </g>

            {/* Jari Tengah (Middle) */}
            <g style={{ transition: 'all 0.25s ease' }}>
              <rect
                x="116"
                y={125 - getFingerHeight(middleF, 94)}
                width="23"
                height={getFingerHeight(middleF, 94)}
                rx="11.5"
                fill="url(#skinTone)"
                stroke="#8D5524"
                strokeWidth="2"
              />
              <line x1="120" y1={125 - getFingerHeight(middleF, 94) * 0.55} x2="135" y2={125 - getFingerHeight(middleF, 94) * 0.55} stroke="#A66B33" strokeWidth="1.5" />
              {middleF === 1 && (
                <rect x="121" y={129 - getFingerHeight(middleF, 94)} width="13" height="11" rx="4" fill="#FADBD8" opacity="0.75" />
              )}
            </g>

            {/* Jari Telunjuk (Index) */}
            <g style={{ transition: 'all 0.25s ease' }}>
              <rect
                x="91"
                y={128 - getFingerHeight(indexF, 86)}
                width="23"
                height={getFingerHeight(indexF, 86)}
                rx="11.5"
                fill="url(#skinTone)"
                stroke="#8D5524"
                strokeWidth="2"
              />
              <line x1="95" y1={128 - getFingerHeight(indexF, 86) * 0.55} x2="110" y2={128 - getFingerHeight(indexF, 86) * 0.55} stroke="#A66B33" strokeWidth="1.5" />
              {indexF === 1 && (
                <rect x="96" y={132 - getFingerHeight(indexF, 86)} width="13" height="10" rx="4" fill="#FADBD8" opacity="0.75" />
              )}
            </g>

            {/* Tapak Tangan Anatomi */}
            <rect x="86" y="118" width="102" height="96" rx="30" fill="url(#skinTone)" stroke="#8D5524" strokeWidth="2.2" />
            {/* Garisan Tapak Tangan */}
            <path d="M 102 150 Q 134 156 168 144" fill="none" stroke="#B97A3D" strokeWidth="1.8" strokeLinecap="round" />
            <path d="M 105 168 Q 138 175 165 186" fill="none" stroke="#B97A3D" strokeWidth="1.6" strokeLinecap="round" />

            {/* Ibu Jari (Thumb) */}
            <g
              style={{
                transition: 'all 0.25s ease',
                transformOrigin: '88px 175px',
                transform: thumb === 1 ? 'rotate(-36deg)' : thumb === 0.5 ? 'rotate(12deg)' : 'rotate(48deg)'
              }}
            >
              <rect x="52" y="148" width="44" height="24" rx="12" fill="url(#skinTone)" stroke="#8D5524" strokeWidth="2" />
              <line x1="72" y1="152" x2="72" y2="168" stroke="#A66B33" strokeWidth="1.5" />
            </g>
          </svg>
        </div>

        {/* Paparan Huruf Semasa & Maksud Simbol Jari */}
        <div className="md:col-span-6 space-y-3">
          <div className="bg-slate-900 p-4 rounded-xl border border-teal-500/30">
            <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">
              {lang === 'ms' ? 'Ejaan Kata Kunci Semasa' : 'Current Keyword Spelling'}
            </div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {currentWord.split('').map((ch, i) => (
                <span
                  key={i}
                  className={`w-8 h-9 flex items-center justify-center rounded-lg font-extrabold text-base transition ${
                    i === charIdx
                      ? 'bg-amber-400 text-slate-950 scale-110 shadow-md'
                      : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  {ch}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-teal-500 text-slate-950 font-black text-2xl flex items-center justify-center shrink-0">
                {currentChar}
              </div>
              <p className="text-sm text-slate-200 leading-snug">
                {signData.desc[lang]}
              </p>
            </div>
          </div>

          {/* Kawalan Main & Kelajuan (0.5x, 1.0x Normal, 1.5x, 2.0x) */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex-1 py-2 px-3 rounded-lg bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isPlaying
                  ? (lang === 'ms' ? 'Jeda Gerakan' : 'Pause Motion')
                  : (lang === 'ms' ? 'Mainkan Isyarat' : 'Play Sign')}
              </button>
              <button
                onClick={() => { setCharIdx(0); setIsPlaying(true); }}
                className="py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1 transition"
                title={lang === 'ms' ? 'Ulang Kata' : 'Restart Word'}
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            <div>
              <div className="text-[11px] text-slate-400 font-semibold mb-1">
                {lang === 'ms' ? 'Kelajuan Pergerakan Jari:' : 'Finger Movement Speed:'}
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[
                  { val: 0.5, label: '0.5x' },
                  { val: 1, label: '1.0x Normal' },
                  { val: 1.5, label: '1.5x' },
                  { val: 2, label: '2.0x' }
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setSpeed(opt.val)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-bold transition ${
                      speed === opt.val
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sari Kata Bahasa Melayu / Inggeris */}
      <div className="mt-3 p-3 rounded-lg bg-black/50 border border-slate-800 text-center">
        <span className="text-xs text-amber-400 font-bold uppercase mr-2">
          {lang === 'ms' ? '[Sari Kata BIM]:' : '[Sign Subtitles]:'}
        </span>
        <span className="text-sm text-white font-medium">
          {lang === 'ms'
            ? `Mengeja kata kunci warisan "${currentWord}" — Huruf "${currentChar}" (${signData.desc.ms}).`
            : `Spelling heritage keyword "${currentWord}" — Letter "${currentChar}" (${signData.desc.en}).`}
        </span>
      </div>
    </div>
  );
}

// ============================================================================
// KOMPONEN UTAMA APLIKASI: SASI – SISTEM AKSES SEJARAH INKLUSIF
// ============================================================================
export default function App() {
  // Bahasa Dwibahasa Kekal (BM / EN) di semua skrin (Laptop, Tablet, Telefon)
  const [lang, setLang] = useState('ms');
  const [activeTab, setActiveTab] = useState('home');
  const [accessMode, setAccessMode] = useState('general'); // 'general' | 'visual' | 'hearing' | 'senior'

  // Data Tapak Sejarah & Maklum Balas (Disimpan dalam localStorage)
  const [sites, setSites] = useState(() => {
    try {
      const saved = localStorage.getItem('sasi_sites_v3');
      return saved ? JSON.parse(saved) : INITIAL_SITES;
    } catch {
      return INITIAL_SITES;
    }
  });
  const [selectedSiteId, setSelectedSiteId] = useState('SAS-01');

  // Statistik KPI Penggunaan Sistem
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('sasi_stats_v3');
      return saved
        ? JSON.parse(saved)
        : { visitors: 142, audioPlays: 89, signViews: 76, inclusivePrograms: 4 };
    } catch {
      return { visitors: 142, audioPlays: 89, signViews: 76, inclusivePrograms: 4 };
    }
  });

  // Maklum Balas Pengunjung
  const [feedbackList, setFeedbackList] = useState(() => {
    try {
      const saved = localStorage.getItem('sasi_feedback_v3');
      return saved
        ? JSON.parse(saved)
        : [
            { id: 1, satisfaction: 5, ease: 5, audioEff: 5, signEff: 5, routeEff: 4, comment: 'Sangat membantu pelawat OKU pendengaran memahami sejarah Bangunan Sultan Abdul Samad.' },
            { id: 2, satisfaction: 5, ease: 4, audioEff: 5, signEff: 4, routeEff: 5, comment: 'Mod Warga Emas dengan tulisan besar amat selesa dibaca di telefon dan komputer.' }
          ];
    } catch {
      return [];
    }
  });

  // Keadaan Audio Penerangan Sejarah
  const [audioStatus, setAudioStatus] = useState('stopped'); // 'stopped' | 'playing' | 'paused'
  const [audioRate, setAudioRate] = useState(1);
  const audioRef = useRef(null);

  // Keadaan Peta Interaktif & Google Maps
  const [mapZoom, setMapZoom] = useState(16);
  const [mapLayer, setMapLayer] = useState('roadmap'); // 'roadmap' | 'satellite' | 'contrast'
  const [showWheelchairRoute, setShowWheelchairRoute] = useState(true);
  const [showStandardRoute, setShowStandardRoute] = useState(true);
  const [selectedPin, setSelectedPin] = useState(INITIAL_SITES[0]);

  // Keadaan Panduan Lawatan Interaktif
  const [tourProfile, setTourProfile] = useState('wheelchair'); // 'wheelchair' | 'visual' | 'hearing' | 'senior' | 'general'
  const [tourDurationLimit, setTourDurationLimit] = useState(90);

  // Keadaan Dashboard Pentadbir
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [adminError, setAdminError] = useState('');
  const [editingSite, setEditingSite] = useState(null);
  const [newSiteForm, setNewSiteForm] = useState({
    nameMs: '', nameEn: '', year: '', architect: '',
    summaryMs: '', summaryEn: '', historyMs: '', historyEn: '',
    wheelchairAccessible: true, estimatedMinutes: 30, referenceMs: 'Jabatan Warisan Negara'
  });

  // Borang Maklum Balas
  const [fbForm, setFbForm] = useState({
    satisfaction: 5, ease: 5, audioEff: 5, signEff: 5, routeEff: 5, comment: ''
  });
  const [fbSubmitted, setFbSubmitted] = useState(false);

  // Simpan perubahan ke localStorage
  useEffect(() => {
    try { localStorage.setItem('sasi_sites_v3', JSON.stringify(sites)); } catch {}
  }, [sites]);

  useEffect(() => {
    try { localStorage.setItem('sasi_stats_v3', JSON.stringify(stats)); } catch {}
  }, [stats]);

  useEffect(() => {
    try { localStorage.setItem('sasi_feedback_v3', JSON.stringify(feedbackList)); } catch {}
  }, [feedbackList]);

  // Semak parameter URL (?lokasi=SAS-01) supaya pautan terus buka lokasi tepat
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const locParam = params.get('lokasi');
    if (locParam) {
      const found = sites.find((s) => s.id.toLowerCase() === locParam.toLowerCase());
      if (found) {
        setSelectedSiteId(found.id);
        setSelectedPin(found);
        setActiveTab('heritage');
      }
    }
  }, [sites]);

  // Hentikan audio apabila menukar tab atau lokasi
  useEffect(() => {
    stopAudio();
  }, [selectedSiteId, activeTab, lang]);

  const currentSite = sites.find((s) => s.id === selectedSiteId) || sites[0];

  // ============================================================================
  // FUNGSI KAWALAN AUDIO (MP3 SEBENAR ATAU TEXT-TO-SPEECH DWIBAHASA)
  // ============================================================================
  const playAudio = () => {
    setStats((prev) => ({ ...prev, audioPlays: prev.audioPlays + 1 }));

    if (currentSite.audioUrl && audioRef.current) {
      audioRef.current.playbackRate = audioRate;
      audioRef.current.play();
      setAudioStatus('playing');
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToRead =
        lang === 'ms'
          ? `${currentSite.name.ms}. Dibina pada ${currentSite.year}. ${currentSite.summary.ms} ${currentSite.history.ms} Nilai warisan: ${currentSite.heritageValue.ms}`
          : `${currentSite.name.en}. Built in ${currentSite.year}. ${currentSite.summary.en} ${currentSite.history.en} Heritage value: ${currentSite.heritageValue.en}`;

      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = lang === 'ms' ? 'ms-MY' : 'en-GB';
      utterance.rate = audioRate;
      utterance.onend = () => setAudioStatus('stopped');
      utterance.onerror = () => setAudioStatus('stopped');
      window.speechSynthesis.speak(utterance);
      setAudioStatus('playing');
    }
  };

  const pauseAudio = () => {
    if (currentSite.audioUrl && audioRef.current) {
      audioRef.current.pause();
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
    setAudioStatus('paused');
  };

  const resumeAudio = () => {
    if (currentSite.audioUrl && audioRef.current) {
      audioRef.current.play();
    } else if ('speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
    setAudioStatus('playing');
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setAudioStatus('stopped');
  };

  // ============================================================================
  // GAYA DINAMIK MENGIKUT MOD AKSESIBILITI (WCAG 2.2 AA)
  // ============================================================================
  const getThemeClasses = () => {
    if (accessMode === 'visual') {
      return {
        page: 'bg-black text-yellow-300 text-lg leading-relaxed',
        card: 'bg-neutral-950 border-2 border-yellow-400 text-yellow-300',
        btnPrimary: 'bg-yellow-400 text-black font-black text-lg px-6 py-4 border-2 border-white hover:bg-yellow-300',
        btnSecondary: 'bg-neutral-900 text-yellow-300 border-2 border-yellow-400 font-bold px-5 py-3.5 hover:bg-neutral-800',
        muted: 'text-yellow-200/90'
      };
    }
    if (accessMode === 'senior') {
      return {
        page: 'bg-slate-50 text-slate-900 text-xl leading-relaxed',
        card: 'bg-white border-2 border-slate-300 shadow-md text-slate-900',
        btnPrimary: 'bg-[#0B1F3A] text-white font-extrabold text-xl px-7 py-4 rounded-2xl hover:bg-slate-800 shadow-lg',
        btnSecondary: 'bg-teal-700 text-white font-bold text-lg px-6 py-4 rounded-2xl hover:bg-teal-600',
        muted: 'text-slate-700'
      };
    }
    return {
      page: 'bg-slate-50 text-slate-900 text-base',
      card: 'bg-white border border-slate-200/90 shadow-sm text-slate-900',
      btnPrimary: 'bg-[#0B1F3A] text-white font-bold px-5 py-3 rounded-xl hover:bg-[#132f54] transition shadow-sm',
      btnSecondary: 'bg-teal-600 text-white font-bold px-5 py-3 rounded-xl hover:bg-teal-700 transition shadow-sm',
      muted: 'text-slate-600'
    };
  };

  const theme = getThemeClasses();

  // Kira peratus maklum balas positif (skor >= 4)
  const positivePercent = feedbackList.length
    ? Math.round((feedbackList.filter((f) => f.satisfaction >= 4).length / feedbackList.length) * 100)
    : 94;

  // ============================================================================
  // PENGENDALI PENTADBIR (CRUD & LOG MASUK)
  // ============================================================================
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminEmail.trim() === 'admin@sasi.gov.my' && adminPass === 'SASI2026') {
      setIsAdminAuth(true);
      setAdminError('');
    } else {
      setAdminError(
        lang === 'ms'
          ? 'Kelayakan tidak sah. Gunakan demo: admin@sasi.gov.my / SASI2026'
          : 'Invalid credentials. Use demo: admin@sasi.gov.my / SASI2026'
      );
    }
  };

  const handleAddSite = (e) => {
    e.preventDefault();
    if (!newSiteForm.nameMs) return;
    const newId = `LOC-${String(sites.length + 1).padStart(2, '0')}`;
    const created = {
      id: newId,
      name: { ms: newSiteForm.nameMs, en: newSiteForm.nameEn || newSiteForm.nameMs },
      category: { ms: 'Tapak Warisan Baharu', en: 'New Heritage Site' },
      year: newSiteForm.year || 'Abad ke-20',
      architect: newSiteForm.architect || 'Rekod Jabatan Warisan',
      lat: 3.1485 + (Math.random() - 0.5) * 0.003,
      lng: 101.6945 + (Math.random() - 0.5) * 0.003,
      wheelchairAccessible: newSiteForm.wheelchairAccessible,
      estimatedMinutes: Number(newSiteForm.estimatedMinutes) || 30,
      imageUrl: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=900&q=80',
      audioUrl: '',
      summary: { ms: newSiteForm.summaryMs, en: newSiteForm.summaryEn || newSiteForm.summaryMs },
      history: { ms: newSiteForm.historyMs || newSiteForm.summaryMs, en: newSiteForm.historyEn || newSiteForm.summaryEn || newSiteForm.summaryMs },
      figures: { ms: newSiteForm.architect || 'Tokoh Tempatan', en: newSiteForm.architect || 'Local Figures' },
      events: { ms: 'Peristiwa sejarah direkodkan oleh pentadbir tapak.', en: 'Historical event recorded by site administrator.' },
      heritageValue: { ms: 'Pemeliharaan warisan budaya dan sejarah tempatan.', en: 'Preservation of local cultural and historical heritage.' },
      accessibilityNote: {
        ms: newSiteForm.wheelchairAccessible ? 'Data Demonstrasi: Laluan mesra kerusi roda tersedia.' : 'Data Demonstrasi: Mempunyai tangga asal.',
        en: newSiteForm.wheelchairAccessible ? 'Demo Data: Wheelchair-friendly route available.' : 'Demo Data: Contains original stairs.'
      },
      reference: { ms: newSiteForm.referenceMs, en: newSiteForm.referenceMs },
      signKeywords: {
        ms: newSiteForm.nameMs.toUpperCase().replace(/[^A-Z0-9 ]/g, '').split(' ').filter(Boolean).slice(0, 4),
        en: (newSiteForm.nameEn || newSiteForm.nameMs).toUpperCase().replace(/[^A-Z0-9 ]/g, '').split(' ').filter(Boolean).slice(0, 4)
      }
    };
    setSites([...sites, created]);
    setNewSiteForm({
      nameMs: '', nameEn: '', year: '', architect: '',
      summaryMs: '', summaryEn: '', historyMs: '', historyEn: '',
      wheelchairAccessible: true, estimatedMinutes: 30, referenceMs: 'Jabatan Warisan Negara'
    });
  };

  const handleDeleteSite = (id) => {
    if (sites.length <= 1) return;
    const updated = sites.filter((s) => s.id !== id);
    setSites(updated);
    if (selectedSiteId === id) setSelectedSiteId(updated[0].id);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    setFeedbackList([{ id: Date.now(), ...fbForm }, ...feedbackList]);
    setFbSubmitted(true);
    setFbForm({ satisfaction: 5, ease: 5, audioEff: 5, signEff: 5, routeEff: 5, comment: '' });
    setTimeout(() => setFbSubmitted(false), 4000);
  };

  // ============================================================================
  // PAPARAN UTAMA (RENDER)
  // ============================================================================
  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-200 ${theme.page}`}>
      {/* SKIP LINK WCAG 2.2 AA */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-amber-400 focus:text-slate-950 focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold"
      >
        {lang === 'ms' ? 'Langkau ke kandungan utama' : 'Skip to main content'}
      </a>

      {/* BAR NAVIGASI UTAMA (BERSIH TANPA QR CODE) */}
      <header className="sticky top-0 z-40 bg-[#0B1F3A] text-white border-b-2 border-amber-400/70 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Identiti SASI */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 text-left focus:outline-none focus:ring-2 focus:ring-amber-400 rounded-xl p-1"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-[#0B1F3A] font-black text-xl shadow-md border border-amber-300">
              S
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight text-white">SASI</span>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-400 text-[#0B1F3A]">
                  WCAG 2.2 AA
                </span>
              </div>
              <p className="text-xs text-teal-200 font-medium">
                {lang === 'ms'
                  ? 'Sistem Akses Sejarah Inklusif'
                  : 'Inclusive Heritage Access System'}
              </p>
            </div>
          </button>

          {/* Menu Navigasi */}
          <nav aria-label="Navigasi Utama" className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'home', label: { ms: 'Utama', en: 'Home' }, icon: Building2 },
              { id: 'heritage', label: { ms: 'Pusat Sejarah', en: 'Heritage Hub' }, icon: BookOpen },
              { id: 'map', label: { ms: 'Peta & Google Maps', en: 'Interactive Map' }, icon: MapIcon },
              { id: 'guide', label: { ms: 'Panduan Lawatan', en: 'Tour Guide' }, icon: Compass },
              { id: 'feedback', label: { ms: 'Maklum Balas & KPI', en: 'Feedback & KPI' }, icon: MessageSquare },
              { id: 'admin', label: { ms: 'Pentadbir', en: 'Admin' }, icon: Lock }
            ].map((item) => {
              const Icon = item.icon;
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-1.5 transition ${
                    active
                      ? 'bg-teal-500 text-[#0B1F3A] shadow'
                      : 'text-slate-200 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label[lang]}</span>
                </button>
              );
            })}
          </nav>

          {/* PENUKAR DWIBAHASA KEKAL [ BM | EN ] DI LAPTOP, TABLET & TELEFON */}
          <div className="flex items-center gap-2">
            <div
              role="group"
              aria-label="Pilihan Bahasa / Language Switcher"
              className="flex items-center bg-slate-900/90 p-1 rounded-xl border border-teal-400/50"
            >
              <Globe className="w-4 h-4 text-teal-300 ml-2 mr-1" />
              <button
                onClick={() => setLang('ms')}
                aria-pressed={lang === 'ms'}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition ${
                  lang === 'ms'
                    ? 'bg-amber-400 text-[#0B1F3A] shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                BM
              </button>
              <button
                onClick={() => setLang('en')}
                aria-pressed={lang === 'en'}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition ${
                  lang === 'en'
                    ? 'bg-amber-400 text-[#0B1F3A] shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>

        {/* BAR PANEL MOD AKSESIBILITI PANTAS */}
        <div className="bg-[#071426] border-t border-white/10 px-4 py-2">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
              <Accessibility className="w-4 h-4 text-amber-400" />
              {lang === 'ms' ? 'Pilih Mod Aksesibiliti:' : 'Select Accessibility Mode:'}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'general', label: { ms: 'Pengguna Umum', en: 'General User' }, icon: Users },
                { id: 'visual', label: { ms: 'OKU Penglihatan (Kontras Tinggi)', en: 'Visual Impairment (High Contrast)' }, icon: Eye },
                { id: 'hearing', label: { ms: 'OKU Pendengaran (Isyarat Jari & Teks)', en: 'Hearing Impairment (Finger Sign & Text)' }, icon: Ear },
                { id: 'senior', label: { ms: 'Warga Emas (Tulisan Besar)', en: 'Senior Citizen (Large Text)' }, icon: Sparkles }
              ].map((m) => {
                const MIcon = m.icon;
                const isSel = accessMode === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setAccessMode(m.id)}
                    aria-pressed={isSel}
                    className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition border ${
                      isSel
                        ? 'bg-amber-400 text-[#0B1F3A] border-amber-300'
                        : 'bg-white/5 text-slate-200 border-white/15 hover:bg-white/15'
                    }`}
                  >
                    <MIcon className="w-3.5 h-3.5" />
                    <span>{m.label[lang]}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </header>

      {/* KANDUNGAN UTAMA */}
      <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 py-6">
        {/* ====================================================================
            TAB 1: HALAMAN UTAMA
           ==================================================================== */}
        {activeTab === 'home' && (
          <div className="space-y-8">
            {/* Hero Banner */}
            <section className="rounded-3xl bg-gradient-to-br from-[#0B1F3A] via-[#102d52] to-teal-900 text-white p-6 sm:p-10 shadow-xl border border-teal-500/30 relative overflow-hidden">
              <div className="max-w-3xl space-y-4 relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>
                    {lang === 'ms'
                      ? 'Inovasi Digital Warisan & Kerjasama Awam-Swasta (PPP)'
                      : 'Digital Heritage Innovation & Public-Private Partnership (PPP)'}
                  </span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  {lang === 'ms'
                    ? 'SASI – Sistem Akses Sejarah Inklusif'
                    : 'SASI – Inclusive Heritage Access System'}
                </h1>
                <p className="text-base sm:text-lg text-teal-100 leading-relaxed">
                  {lang === 'ms'
                    ? 'Platform warisan digital mesra semua golongan—memperkasa OKU penglihatan, OKU pendengaran, warga emas, dan pelawat umum meneroka sejarah tempatan tanpa halangan fizikal atau komunikasi.'
                    : 'An inclusive digital heritage platform empowering visitors with visual or hearing impairments, senior citizens, and the general public to explore local history without physical or communication barriers.'}
                </p>

                {/* 4 Butang Tindakan Utama */}
                <div className="pt-3 flex flex-wrap gap-3">
                  <button
                    onClick={() => setActiveTab('heritage')}
                    className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#0B1F3A] font-black flex items-center gap-2 shadow-lg transition"
                  >
                    <BookOpen className="w-5 h-5" />
                    <span>{lang === 'ms' ? 'Mula Pengalaman Sejarah' : 'Start Heritage Experience'}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('map')}
                    className="px-5 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-[#0B1F3A] font-extrabold flex items-center gap-2 shadow transition"
                  >
                    <MapIcon className="w-5 h-5" />
                    <span>{lang === 'ms' ? 'Peta Interaktif & Google Maps' : 'Interactive Map'}</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('guide')}
                    className="px-5 py-3.5 rounded-xl bg-white/15 hover:bg-white/25 text-white border border-white/30 font-bold flex items-center gap-2 transition"
                  >
                    <Compass className="w-5 h-5" />
                    <span>{lang === 'ms' ? 'Panduan Pelawat' : 'Visitor Guide'}</span>
                  </button>
                  <button
                    onClick={() => setAccessMode(accessMode === 'visual' ? 'general' : 'visual')}
                    className="px-5 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-900 text-amber-300 border border-amber-400/50 font-bold flex items-center gap-2 transition"
                  >
                    <Accessibility className="w-5 h-5" />
                    <span>{lang === 'ms' ? 'Tukar Mod Aksesibiliti' : 'Toggle Accessibility'}</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Statistik Ringkas Penggunaan Sistem */}
            <section aria-label="Statistik Sistem">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: { ms: 'Jumlah Pengunjung Sistem', en: 'Total System Visitors' },
                    value: stats.visitors,
                    target: lang === 'ms' ? 'Sasaran KPI: Min. 100 / 3 bln' : 'KPI Target: Min. 100 / 3 mos',
                    color: 'text-teal-600'
                  },
                  {
                    label: { ms: 'Penggunaan Audio Sejarah', en: 'Audio Narration Plays' },
                    value: stats.audioPlays,
                    target: lang === 'ms' ? 'Sokongan TTS & Audio BM/EN' : 'BM/EN TTS & Audio Support',
                    color: 'text-amber-600'
                  },
                  {
                    label: { ms: 'Sesi Isyarat Jari (BIM)', en: 'Finger-Sign Sessions' },
                    value: stats.signViews,
                    target: lang === 'ms' ? 'Kelajuan 0.5x – 2.0x' : '0.5x – 2.0x Speed Control',
                    color: 'text-blue-700'
                  },
                  {
                    label: { ms: 'Kepuasan Positif Pelawat', en: 'Positive Satisfaction' },
                    value: `${positivePercent}%`,
                    target: lang === 'ms' ? 'Sasaran KPI: Sekurang-kurangnya 85%' : 'KPI Target: At least 85%',
                    color: 'text-emerald-600'
                  }
                ].map((stat, i) => (
                  <div key={i} className={`p-5 rounded-2xl ${theme.card}`}>
                    <div className={`text-3xl font-black ${accessMode === 'visual' ? 'text-yellow-300' : stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="font-bold text-sm mt-1">{stat.label[lang]}</div>
                    <div className={`text-xs mt-1 ${theme.muted}`}>{stat.target}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Senarai Tapak Sejarah Pilihan */}
            <section className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-2xl font-black">
                  {lang === 'ms' ? 'Tapak Sejarah Tempatan Dalam Rangkaian SASI' : 'Local Heritage Sites in SASI Network'}
                </h2>
                <span className={`text-xs font-semibold ${theme.muted}`}>
                  {lang === 'ms' ? `${sites.length} lokasi warisan disahkan` : `${sites.length} verified heritage sites`}
                </span>
              </div>

              <div className={`grid gap-5 ${accessMode === 'senior' ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                {sites.map((site) => (
                  <article key={site.id} className={`rounded-2xl overflow-hidden flex flex-col ${theme.card}`}>
                    <img
                      src={site.imageUrl}
                      alt={site.name[lang]}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900">
                            {site.year}
                          </span>
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                              site.wheelchairAccessible
                                ? 'bg-emerald-100 text-emerald-900'
                                : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {site.wheelchairAccessible
                              ? (lang === 'ms' ? 'Mesra Kerusi Roda' : 'Wheelchair Friendly')
                              : (lang === 'ms' ? 'Akses Bertangga' : 'Stepped Access')}
                          </span>
                        </div>
                        <h3 className="text-lg font-extrabold">{site.name[lang]}</h3>
                        <p className={`text-sm line-clamp-3 ${theme.muted}`}>{site.summary[lang]}</p>
                      </div>

                      <div className="pt-2 flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedSiteId(site.id);
                            setActiveTab('heritage');
                          }}
                          className={`flex-1 flex items-center justify-center gap-1.5 ${theme.btnPrimary}`}
                        >
                          <span>{lang === 'ms' ? 'Teroka Sejarah' : 'Explore Site'}</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedPin(site);
                            setActiveTab('map');
                          }}
                          className={`px-3.5 py-2.5 rounded-xl border font-bold text-sm flex items-center justify-center ${
                            accessMode === 'visual'
                              ? 'border-yellow-400 text-yellow-300'
                              : 'border-slate-300 hover:bg-slate-100 text-slate-700'
                          }`}
                          title={lang === 'ms' ? 'Lihat di Peta' : 'View on Map'}
                        >
                          <MapIcon className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Kerjasama Awam-Swasta (PPP) */}
            <section className={`p-6 rounded-3xl ${theme.card}`}>
              <h2 className="text-xl font-black mb-1">
                {lang === 'ms'
                  ? 'Ekosistem Kerjasama Awam-Swasta (PPP) SASI'
                  : 'SASI Public-Private Partnership (PPP) Ecosystem'}
              </h2>
              <p className={`text-sm mb-5 ${theme.muted}`}>
                {lang === 'ms'
                  ? 'Sinergi rentas sektor bagi menjamin kesahihan sejarah, infrastruktur digital, dan keterangkuman OKU.'
                  : 'Cross-sector synergy ensuring historical authenticity, digital infrastructure, and disability inclusion.'}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {[
                  {
                    org: 'Jabatan Warisan Negara',
                    role: { ms: 'Pemeliharaan & kesahihan fakta sejarah tapak.', en: 'Conservation & verification of site historical facts.' }
                  },
                  {
                    org: 'Telekom Malaysia (TM One)',
                    role: { ms: 'Infrastruktur ICT, awan & sambungan Internet pantas.', en: 'ICT infrastructure, cloud & high-speed connectivity.' }
                  },
                  {
                    org: 'NGO OKU Malaysia',
                    role: { ms: 'Pengujian kebolehcapaian WCAG & isyarat BIM.', en: 'WCAG accessibility & BIM sign language user testing.' }
                  },
                  {
                    org: 'Institusi Pendidikan',
                    role: { ms: 'Penyelidikan akademik & kandungan pembelajaran.', en: 'Academic research & educational heritage content.' }
                  },
                  {
                    org: 'Pengurusan Tapak / DBKL',
                    role: { ms: 'Penyelenggaraan kemudahan fizikal & laluan OKU.', en: 'Maintenance of physical amenities & accessible paths.' }
                  }
                ].map((partner, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border ${
                      accessMode === 'visual' ? 'border-yellow-400/60 bg-black' : 'border-slate-200 bg-slate-50/80'
                    }`}
                  >
                    <div className="font-extrabold text-sm text-teal-600 mb-1">{partner.org}</div>
                    <p className={`text-xs leading-relaxed ${theme.muted}`}>{partner.role[lang]}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ====================================================================
            TAB 2: PUSAT MAKLUMAT SEJARAH (AUDIO + VISUALIZER JARI BIM + FAKTA)
           ==================================================================== */}
        {activeTab === 'heritage' && (
          <div className="space-y-6">
            {/* Pemilih Lokasi Sejarah */}
            <div className={`p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 ${theme.card}`}>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-teal-600" />
                <span className="font-extrabold text-sm">
                  {lang === 'ms' ? 'Pilih Lokasi Sejarah:' : 'Select Heritage Site:'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {sites.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedSiteId(s.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                      s.id === currentSite.id
                        ? 'bg-[#0B1F3A] text-amber-300 shadow'
                        : accessMode === 'visual'
                        ? 'border border-yellow-400 text-yellow-300'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {s.name[lang]}
                  </button>
                ))}
              </div>
            </div>

            {/* Susun Atur Utama Maklumat Lokasi */}
            <div className={`grid gap-6 ${accessMode === 'senior' ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-12'}`}>
              {/* Lajur Kiri: Maklumat Sejarah Terperinci & Audio */}
              <div className={`${accessMode === 'senior' ? '' : 'lg:col-span-7'} space-y-6`}>
                <div className={`rounded-3xl overflow-hidden ${theme.card}`}>
                  <img
                    src={currentSite.imageUrl}
                    alt={currentSite.name[lang]}
                    className="w-full h-64 sm:h-72 object-cover"
                  />
                  <div className="p-6 space-y-5">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-600 text-white">
                          {currentSite.category[lang]}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900">
                          {lang === 'ms' ? `Tahun: ${currentSite.year}` : `Year: ${currentSite.year}`}
                        </span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-black">{currentSite.name[lang]}</h1>
                    </div>

                    {/* MODUL AUDIO PENERANGAN SEJARAH */}
                    <div
                      className={`p-4 rounded-2xl border-2 ${
                        accessMode === 'visual'
                          ? 'bg-neutral-900 border-yellow-400'
                          : 'bg-[#0B1F3A] text-white border-teal-500/40'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2">
                          <Volume2 className="w-5 h-5 text-amber-400" />
                          <span className="font-bold text-sm">
                            {lang === 'ms'
                              ? `Audio Penerangan Sejarah (${lang === 'ms' ? 'Bahasa Melayu' : 'English'})`
                              : 'Audio History Narration (English)'}
                          </span>
                        </div>
                        <span className="text-xs px-2.5 py-0.5 rounded bg-white/10 text-teal-200">
                          {currentSite.audioUrl
                            ? (lang === 'ms' ? 'Rakaman Audio Rasmi' : 'Official Audio File')
                            : (lang === 'ms' ? 'Suara Sintesis Pintar (TTS)' : 'Smart Text-to-Speech (TTS)')}
                        </span>
                      </div>

                      {currentSite.audioUrl && (
                        <audio ref={audioRef} src={currentSite.audioUrl} onEnded={() => setAudioStatus('stopped')} />
                      )}

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={playAudio}
                          className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-[#0B1F3A] font-black text-xs sm:text-sm flex items-center gap-1.5"
                        >
                          <Play className="w-4 h-4" />
                          <span>PLAY</span>
                        </button>
                        <button
                          onClick={pauseAudio}
                          disabled={audioStatus !== 'playing'}
                          className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-40 text-[#0B1F3A] font-black text-xs sm:text-sm flex items-center gap-1.5"
                        >
                          <Pause className="w-4 h-4" />
                          <span>PAUSE</span>
                        </button>
                        <button
                          onClick={resumeAudio}
                          disabled={audioStatus !== 'paused'}
                          className="px-4 py-2 rounded-xl bg-sky-400 hover:bg-sky-300 disabled:opacity-40 text-[#0B1F3A] font-black text-xs sm:text-sm flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-4 h-4" />
                          <span>RESUME</span>
                        </button>
                        <button
                          onClick={stopAudio}
                          className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-black text-xs sm:text-sm flex items-center gap-1.5"
                        >
                          <Square className="w-4 h-4" />
                          <span>STOP</span>
                        </button>

                        {/* Kawalan Kelajuan Audio */}
                        <div className="ml-auto flex items-center gap-1 bg-white/10 p-1 rounded-xl">
                          {[0.75, 1, 1.25, 1.5].map((r) => (
                            <button
                              key={r}
                              onClick={() => setAudioRate(r)}
                              className={`px-2 py-1 rounded-lg text-xs font-bold ${
                                audioRate === r ? 'bg-amber-400 text-[#0B1F3A]' : 'text-slate-200 hover:bg-white/10'
                              }`}
                            >
                              {r}x
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Fakta Sejarah Terperinci */}
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-lg font-extrabold text-teal-600 mb-1">
                          {lang === 'ms' ? 'Latar Belakang & Sejarah Pembinaan' : 'Background & Construction History'}
                        </h2>
                        <p className="leading-relaxed">{currentSite.history[lang]}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-800/40 border border-slate-200">
                          <div className="text-xs font-bold uppercase text-teal-700 mb-1">
                            {lang === 'ms' ? 'Tokoh Berkaitan' : 'Key Historical Figures'}
                          </div>
                          <p className="text-sm font-semibold">{currentSite.figures[lang]}</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-800/40 border border-slate-200">
                          <div className="text-xs font-bold uppercase text-amber-700 mb-1">
                            {lang === 'ms' ? 'Peristiwa Penting' : 'Key Historical Events'}
                          </div>
                          <p className="text-sm font-semibold">{currentSite.events[lang]}</p>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-base font-extrabold text-teal-600 mb-1">
                          {lang === 'ms' ? 'Nilai Warisan & Kepentingan' : 'Heritage Value & Significance'}
                        </h3>
                        <p className="leading-relaxed">{currentSite.heritageValue[lang]}</p>
                      </div>

                      <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 text-sm">
                        <strong>{lang === 'ms' ? 'Nota Aksesibiliti Fizikal: ' : 'Physical Accessibility Note: '}</strong>
                        {currentSite.accessibilityNote[lang]}
                      </div>

                      <div className={`pt-3 border-t text-xs ${theme.muted}`}>
                        <strong>{lang === 'ms' ? 'Sumber Rujukan Sahih: ' : 'Verified Historical Source: '}</strong>
                        {currentSite.reference[lang]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Lajur Kanan: Visualizer Simbol Jari Manusia Anatomi (BIM) */}
              <div className={`${accessMode === 'senior' ? '' : 'lg:col-span-5'} space-y-6`}>
                <AnatomicalHandVisualizer
                  keywords={currentSite.signKeywords[lang]}
                  lang={lang}
                />

                {/* Kad Pintasan ke Google Maps */}
                <div className={`p-5 rounded-2xl space-y-3 ${theme.card}`}>
                  <h3 className="font-extrabold text-base flex items-center gap-2">
                    <Navigation className="w-5 h-5 text-teal-600" />
                    <span>{lang === 'ms' ? 'Navigasi Terus ke Lokasi' : 'Direct Navigation to Site'}</span>
                  </h3>
                  <p className={`text-sm ${theme.muted}`}>
                    {lang === 'ms'
                      ? `Koordinat GPS: ${currentSite.lat}, ${currentSite.lng} • Anggaran lawatan ${currentSite.estimatedMinutes} minit.`
                      : `GPS Coordinates: ${currentSite.lat}, ${currentSite.lng} • Estimated visit ${currentSite.estimatedMinutes} mins.`}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setSelectedPin(currentSite);
                        setActiveTab('map');
                      }}
                      className={`flex-1 ${theme.btnSecondary}`}
                    >
                      {lang === 'ms' ? 'Buka Peta Interaktif' : 'Open Interactive Map'}
                    </button>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${currentSite.lat},${currentSite.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#0B1F3A] font-extrabold text-sm flex items-center gap-1.5"
                    >
                      <span>Google Maps</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 3: PETA LALUAN DIGITAL INTERAKTIF & GOOGLE MAPS (DESKTOP & MOBILE)
           ==================================================================== */}
        {activeTab === 'map' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-black">
                  {lang === 'ms'
                    ? 'Peta Laluan Digital Interaktif & Google Maps'
                    : 'Interactive Digital Route Map & Google Maps'}
                </h1>
                <p className={`text-sm ${theme.muted}`}>
                  {lang === 'ms'
                    ? 'Serasi sepenuhnya untuk komputer riba (laptop), tablet dan telefon pintar dengan kawalan zum serta laluan mesra kerusi roda.'
                    : 'Fully compatible with laptops, tablets, and smartphones with zoom controls and wheelchair-accessible route overlays.'}
                </p>
              </div>
              <span className="text-xs px-3 py-1.5 rounded-full bg-amber-100 text-amber-900 font-bold border border-amber-300">
                {lang === 'ms'
                  ? 'Nota: Data laluan OKU ialah data demonstrasi sehingga audit tapak rasmi'
                  : 'Note: Accessibility route data is demonstration data pending official site audit'}
              </span>
            </div>

            {/* Susun Atur 2-Lajur Desktop / Laptop (12 Kolum) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Lajur Kiri (4 Kolum): Senarai Lokasi & Penapis Laluan */}
              <div className={`lg:col-span-4 p-5 rounded-3xl space-y-5 ${theme.card}`}>
                <div>
                  <h2 className="font-extrabold text-base mb-2 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-teal-600" />
                    <span>{lang === 'ms' ? 'Lapisan Laluan & Paparan' : 'Route & Map Layers'}</span>
                  </h2>
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-emerald-50 text-emerald-950 border border-emerald-200 cursor-pointer font-semibold">
                      <input
                        type="checkbox"
                        checked={showWheelchairRoute}
                        onChange={(e) => setShowWheelchairRoute(e.target.checked)}
                        className="w-4 h-4 accent-emerald-600"
                      />
                      <span>
                        {lang === 'ms'
                          ? 'Laluan Mesra Kerusi Roda (Hijau - Rata)'
                          : 'Wheelchair Accessible Route (Green - Flat)'}
                      </span>
                    </label>
                    <label className="flex items-center gap-2.5 p-2.5 rounded-xl bg-amber-50 text-amber-950 border border-amber-200 cursor-pointer font-semibold">
                      <input
                        type="checkbox"
                        checked={showStandardRoute}
                        onChange={(e) => setShowStandardRoute(e.target.checked)}
                        className="w-4 h-4 accent-amber-600"
                      />
                      <span>
                        {lang === 'ms'
                          ? 'Laluan Biasa / Bertangga (Putus-putus)'
                          : 'Standard / Stepped Path (Dashed)'}
                      </span>
                    </label>
                  </div>
                </div>

                {/* Pilihan Pin Lokasi Sejarah */}
                <div>
                  <h3 className="font-extrabold text-sm uppercase tracking-wider text-teal-600 mb-2">
                    {lang === 'ms' ? 'Pilih Pin Tapak Sejarah' : 'Select Heritage Pin'}
                  </h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                    {sites.map((site) => (
                      <button
                        key={site.id}
                        onClick={() => setSelectedPin(site)}
                        className={`w-full text-left p-3 rounded-xl border transition flex items-center justify-between gap-2 ${
                          selectedPin.id === site.id
                            ? 'bg-[#0B1F3A] text-white border-amber-400 shadow'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                        }`}
                      >
                        <div>
                          <div className="font-bold text-sm">{site.name[lang]}</div>
                          <div className={`text-xs ${selectedPin.id === site.id ? 'text-teal-300' : 'text-slate-500'}`}>
                            {site.wheelchairAccessible
                              ? (lang === 'ms' ? '✓ Mesra Kerusi Roda' : '✓ Wheelchair Friendly')
                              : (lang === 'ms' ? '⚠ Ada Tangga Asal' : '⚠ Has Original Steps')}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Kemudahan OKU Berdekatan */}
                <div>
                  <h3 className="font-extrabold text-sm uppercase tracking-wider text-teal-600 mb-2">
                    {lang === 'ms' ? 'Kemudahan OKU & Warga Emas' : 'OKU & Senior Facilities'}
                  </h3>
                  <div className="space-y-2">
                    {ACCESSIBILITY_FACILITIES.map((fac) => (
                      <div key={fac.id} className="p-3 rounded-xl bg-teal-50/70 border border-teal-200 text-slate-900">
                        <div className="font-bold text-xs">{fac.name[lang]}</div>
                        <div className="text-[11px] text-slate-600 mt-0.5">{fac.note[lang]}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Lajur Kanan (8 Kolum): Peta Skematik Interaktif + Google Maps Embed Langsung */}
              <div className="lg:col-span-8 space-y-5">
                {/* Bar Kawalan Peta Desktop/Laptop */}
                <div className={`p-3 rounded-2xl flex flex-wrap items-center justify-between gap-2 ${theme.card}`}>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setMapZoom((z) => Math.min(19, z + 1))}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-bold flex items-center gap-1 hover:bg-slate-700"
                    >
                      <ZoomIn className="w-4 h-4" />
                      <span>{lang === 'ms' ? 'Zum Masuk' : 'Zoom In'}</span>
                    </button>
                    <button
                      onClick={() => setMapZoom((z) => Math.max(14, z - 1))}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-bold flex items-center gap-1 hover:bg-slate-700"
                    >
                      <ZoomOut className="w-4 h-4" />
                      <span>{lang === 'ms' ? 'Zum Keluar' : 'Zoom Out'}</span>
                    </button>
                    <button
                      onClick={() => { setMapZoom(16); setSelectedPin(sites[0]); }}
                      className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-300"
                    >
                      {lang === 'ms' ? 'Set Semula' : 'Reset'}
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {[
                      { id: 'roadmap', label: { ms: 'Peta Jalan', en: 'Roadmap' } },
                      { id: 'satellite', label: { ms: 'Satelit', en: 'Satellite' } }
                    ].map((l) => (
                      <button
                        key={l.id}
                        onClick={() => setMapLayer(l.id)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
                          mapLayer === l.id
                            ? 'bg-teal-600 text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {l.label[lang]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Paparan Google Maps Sebenar (Boleh Diinteraksi Terus di Laptop & Telefon) */}
                <div className="rounded-3xl overflow-hidden border-2 border-teal-600/40 shadow-lg bg-slate-900">
                  <div className="bg-[#0B1F3A] text-white px-4 py-2.5 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 text-sm font-bold">
                      <MapIcon className="w-4 h-4 text-amber-400" />
                      <span>
                        {lang === 'ms'
                          ? `Paparan Langsung Google Maps: ${selectedPin.name.ms}`
                          : `Live Google Maps View: ${selectedPin.name.en}`}
                      </span>
                    </div>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${selectedPin.lat},${selectedPin.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs px-3 py-1 rounded-lg bg-amber-400 text-[#0B1F3A] font-black flex items-center gap-1 hover:bg-amber-300"
                    >
                      <span>{lang === 'ms' ? 'Buka Google Maps Penuh' : 'Open Full Google Maps'}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  <iframe
                    title={`Google Maps - ${selectedPin.name[lang]}`}
                    width="100%"
                    height="420"
                    style={{ border: 0 }}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://maps.google.com/maps?q=${selectedPin.lat},${selectedPin.lng}&t=${mapLayer === 'satellite' ? 'k' : 'm'}&z=${mapZoom}&output=embed`}
                  />

                  {/* Rajah Laluan Aksesibiliti Tapak */}
                  <div className="p-4 bg-slate-950 text-white border-t border-slate-800">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <div className="text-xs text-teal-400 font-bold uppercase">
                          {lang === 'ms' ? 'Maklumat Pin Dipilih' : 'Selected Pin Details'}
                        </div>
                        <div className="font-extrabold text-lg">{selectedPin.name[lang]}</div>
                        <p className="text-xs text-slate-300 mt-0.5">{selectedPin.accessibilityNote[lang]}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setSelectedSiteId(selectedPin.id);
                            setActiveTab('heritage');
                          }}
                          className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-[#0B1F3A] font-black text-xs"
                        >
                          {lang === 'ms' ? 'Baca Sejarah Penuh' : 'Read Full History'}
                        </button>
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${selectedPin.lat},${selectedPin.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-[#0B1F3A] font-black text-xs flex items-center gap-1"
                        >
                          <Navigation className="w-3.5 h-3.5" />
                          <span>{lang === 'ms' ? 'Arah Laluan' : 'Directions'}</span>
                        </a>
                      </div>
                    </div>

                    {/* Petunjuk Legenda Laluan */}
                    <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap gap-4 text-xs">
                      {showWheelchairRoute && (
                        <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                          <span className="w-6 h-1.5 bg-emerald-400 rounded inline-block" />
                          <span>
                            {lang === 'ms'
                              ? 'Laluan Kerusi Roda: Dataran Merdeka ↔ Bangunan Sultan Abdul Samad ↔ Muzium Tekstil'
                              : 'Wheelchair Route: Merdeka Square ↔ Sultan Abdul Samad Building ↔ Textile Museum'}
                          </span>
                        </div>
                      )}
                      {showStandardRoute && (
                        <div className="flex items-center gap-2 text-amber-300 font-semibold">
                          <span className="w-6 h-0.5 border-t-2 border-dashed border-amber-400 inline-block" />
                          <span>
                            {lang === 'ms'
                              ? 'Laluan Biasa: Sambungan ke Panggung Bandaraya (Tangga dalaman)'
                              : 'Standard Path: Link to City Theatre (Interior stairs)'}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 4: PANDUAN LAWATAN INTERAKTIF (WIZARD)
           ==================================================================== */}
        {activeTab === 'guide' && (
          <div className="space-y-6">
            <div className={`p-6 rounded-3xl ${theme.card}`}>
              <h1 className="text-2xl sm:text-3xl font-black mb-2">
                {lang === 'ms'
                  ? 'Panduan Lawatan Interaktif & Cadangan Laluan'
                  : 'Interactive Tour Guide & Route Planner'}
              </h1>
              <p className={`text-sm mb-6 ${theme.muted}`}>
                {lang === 'ms'
                  ? 'Pilih profil keperluan lawatan dan masa yang ada untuk menjana susunan tapak sejarah yang paling sesuai.'
                  : 'Choose your accessibility profile and available duration to generate an optimal heritage itinerary.'}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-extrabold text-sm mb-2">
                    {lang === 'ms' ? '1. Pilih Jenis Pengalaman Lawatan:' : '1. Select Visitor Profile:'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      { id: 'wheelchair', label: { ms: 'Pengguna Kerusi Roda', en: 'Wheelchair User' } },
                      { id: 'senior', label: { ms: 'Warga Emas (Santai)', en: 'Senior Citizen (Relaxed)' } },
                      { id: 'hearing', label: { ms: 'OKU Pendengaran (Isyarat Jari)', en: 'Hearing Impaired (Finger Sign)' } },
                      { id: 'visual', label: { ms: 'OKU Penglihatan (Audio)', en: 'Visually Impaired (Audio)' } },
                      { id: 'general', label: { ms: 'Pelawat Umum (Semua Tapak)', en: 'General Visitor (All Sites)' } }
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setTourProfile(p.id)}
                        className={`p-3 rounded-xl text-left text-sm font-bold border transition ${
                          tourProfile === p.id
                            ? 'bg-[#0B1F3A] text-amber-300 border-amber-400'
                            : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {p.label[lang]}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block font-extrabold text-sm mb-2">
                    {lang === 'ms'
                      ? `2. Anggaran Masa Lawatan: ${tourDurationLimit} Minit`
                      : `2. Available Tour Duration: ${tourDurationLimit} Minutes`}
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="180"
                    step="15"
                    value={tourDurationLimit}
                    onChange={(e) => setTourDurationLimit(Number(e.target.value))}
                    className="w-full accent-teal-600 cursor-pointer"
                  />
                  <div className="flex justify-between text-xs font-semibold text-slate-500 mt-1">
                    <span>30 {lang === 'ms' ? 'minit' : 'mins'}</span>
                    <span>90 {lang === 'ms' ? 'minit' : 'mins'}</span>
                    <span>180 {lang === 'ms' ? 'minit' : 'mins'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cadangan Laluan Langkah Demi Langkah */}
            <div className="space-y-3">
              <h2 className="text-xl font-black">
                {lang === 'ms' ? 'Cadangan Jadual & Aksesibiliti Lokasi' : 'Recommended Itinerary & Site Accessibility'}
              </h2>
              {sites.map((site, idx) => {
                const blockedForWheelchair = tourProfile === 'wheelchair' && !site.wheelchairAccessible;
                return (
                  <div
                    key={site.id}
                    className={`p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 ${theme.card} ${
                      blockedForWheelchair ? 'opacity-70 border-amber-400' : ''
                    }`}
                  >
                    <div className="flex items-start gap-4 max-w-2xl">
                      <div
                        className={`w-10 h-10 rounded-xl font-black flex items-center justify-center shrink-0 ${
                          blockedForWheelchair
                            ? 'bg-amber-200 text-amber-950'
                            : 'bg-teal-600 text-white'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-extrabold text-lg">{site.name[lang]}</h3>
                          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-800 font-bold flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {site.estimatedMinutes} {lang === 'ms' ? 'minit' : 'mins'}
                          </span>
                          {blockedForWheelchair ? (
                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-900 font-bold">
                              {lang === 'ms' ? 'Tidak Disyorkan untuk Kerusi Roda (Tangga)' : 'Not Recommended for Wheelchair (Stairs)'}
                            </span>
                          ) : (
                            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-bold">
                              {lang === 'ms' ? 'Boleh Diakses' : 'Accessible'}
                            </span>
                          )}
                        </div>
                        <p className={`text-sm mt-1 ${theme.muted}`}>{site.accessibilityNote[lang]}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedSiteId(site.id);
                        setActiveTab('heritage');
                      }}
                      className={theme.btnPrimary}
                    >
                      {lang === 'ms' ? 'Mula Hentian Ini' : 'Start This Stop'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 5: SISTEM MAKLUM BALAS & ANALISIS KPI PROJEK
           ==================================================================== */}
        {activeTab === 'feedback' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Borang Maklum Balas */}
            <div className={`lg:col-span-6 p-6 rounded-3xl ${theme.card}`}>
              <h1 className="text-2xl font-black mb-1">
                {lang === 'ms' ? 'Borang Maklum Balas Pelawat' : 'Visitor Feedback Form'}
              </h1>
              <p className={`text-sm mb-5 ${theme.muted}`}>
                {lang === 'ms'
                  ? 'Penilaian anda membantu menambah baik aksesibiliti warisan negara.'
                  : 'Your feedback helps improve national heritage accessibility.'}
              </p>

              {fbSubmitted && (
                <div className="mb-4 p-4 rounded-xl bg-emerald-100 text-emerald-950 border border-emerald-300 font-bold text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>
                    {lang === 'ms'
                      ? 'Terima kasih! Maklum balas anda telah direkodkan ke dalam sistem KPI SASI.'
                      : 'Thank you! Your feedback has been recorded into the SASI KPI system.'}
                  </span>
                </div>
              )}

              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                {[
                  { key: 'satisfaction', label: { ms: 'Tahap Kepuasan Keseluruhan (1–5)', en: 'Overall Satisfaction (1–5)' } },
                  { key: 'ease', label: { ms: 'Kemudahan Penggunaan Sistem (1–5)', en: 'Ease of System Use (1–5)' } },
                  { key: 'audioEff', label: { ms: 'Keberkesanan Audio Penerangan (1–5)', en: 'Audio Narration Effectiveness (1–5)' } },
                  { key: 'signEff', label: { ms: 'Keberkesanan Isyarat Jari BIM (1–5)', en: 'BIM Finger-Sign Effectiveness (1–5)' } },
                  { key: 'routeEff', label: { ms: 'Keberkesanan Panduan Laluan Peta (1–5)', en: 'Map Route Guidance Effectiveness (1–5)' } }
                ].map((field) => (
                  <div key={field.key} className="flex flex-wrap items-center justify-between gap-2 p-3 rounded-xl bg-slate-100/70 border border-slate-200">
                    <label className="text-sm font-bold text-slate-800">{field.label[lang]}</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          type="button"
                          key={num}
                          onClick={() => setFbForm({ ...fbForm, [field.key]: num })}
                          className={`w-8 h-8 rounded-lg font-black text-xs ${
                            fbForm[field.key] === num
                              ? 'bg-[#0B1F3A] text-amber-300'
                              : 'bg-white text-slate-700 border border-slate-300'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

                <div>
                  <label className="block text-sm font-bold mb-1">
                    {lang === 'ms' ? 'Cadangan Penambahbaikan:' : 'Suggestions for Improvement:'}
                  </label>
                  <textarea
                    rows="3"
                    value={fbForm.comment}
                    onChange={(e) => setFbForm({ ...fbForm, comment: e.target.value })}
                    placeholder={
                      lang === 'ms'
                        ? 'Kongsi pengalaman lawatan atau cadangan kemudahan OKU...'
                        : 'Share your visit experience or accessibility suggestions...'
                    }
                    className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 text-sm"
                  />
                </div>

                <button type="submit" className={`w-full ${theme.btnPrimary}`}>
                  {lang === 'ms' ? 'Hantar Maklum Balas' : 'Submit Feedback'}
                </button>
              </form>
            </div>

            {/* Papan Pemuka Sasaran KPI Projek */}
            <div className={`lg:col-span-6 p-6 rounded-3xl space-y-5 ${theme.card}`}>
              <div className="flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-500" />
                <h2 className="text-2xl font-black">
                  {lang === 'ms' ? 'Penjejak Sasaran KPI Projek SASI' : 'SASI Project KPI Tracker'}
                </h2>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: { ms: 'Minimum 100 penggunaan sistem dalam 3 bulan', en: 'Min. 100 system uses within 3 months' },
                    current: `${stats.visitors} / 100`,
                    met: stats.visitors >= 100
                  },
                  {
                    title: { ms: 'Minimum 3 bentuk penerangan inklusif (Audio, Isyarat Jari BIM, Teks/Kontras)', en: 'Min. 3 inclusive formats (Audio, BIM Finger Sign, Text/Contrast)' },
                    current: '4 / 3',
                    met: true
                  },
                  {
                    title: { ms: 'Minimum 3 program lawatan inklusif dalam 6 bulan', en: 'Min. 3 inclusive tour programs within 6 months' },
                    current: `${stats.inclusivePrograms} / 3`,
                    met: stats.inclusivePrograms >= 3
                  },
                  {
                    title: { ms: 'Sekurang-kurangnya 85% maklum balas positif', en: 'At least 85% positive feedback' },
                    current: `${positivePercent}% / 85%`,
                    met: positivePercent >= 85
                  },
                  {
                    title: { ms: 'Minimum 3 organisasi dalam kerjasama PPP', en: 'Min. 3 organizations in PPP collaboration' },
                    current: '5 / 3',
                    met: true
                  }
                ].map((kpi, i) => (
                  <div key={i} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/80 flex items-center justify-between gap-3">
                    <div>
                      <div className="font-bold text-sm text-slate-900">{kpi.title[lang]}</div>
                      <div className="text-xs font-extrabold text-teal-700 mt-0.5">
                        {lang === 'ms' ? `Pencapaian Semasa: ${kpi.current}` : `Current Achievement: ${kpi.current}`}
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black flex items-center gap-1 shrink-0">
                      <Check className="w-3.5 h-3.5" />
                      {lang === 'ms' ? 'TERCAPAI' : 'ACHIEVED'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ====================================================================
            TAB 6: DASHBOARD PENTADBIR (DILINDUNGI LOG MASUK)
           ==================================================================== */}
        {activeTab === 'admin' && (
          <div>
            {!isAdminAuth ? (
              <div className={`max-w-md mx-auto p-7 rounded-3xl ${theme.card}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Lock className="w-6 h-6 text-teal-600" />
                  <h1 className="text-2xl font-black">
                    {lang === 'ms' ? 'Log Masuk Pentadbir SASI' : 'SASI Admin Login'}
                  </h1>
                </div>
                <p className={`text-xs mb-4 ${theme.muted}`}>
                  {lang === 'ms'
                    ? 'Akses terhad kepada pentadbir Jabatan Warisan Negara & pengurusan tapak. (Demo: admin@sasi.gov.my / SASI2026)'
                    : 'Restricted to Department of National Heritage & site administrators. (Demo: admin@sasi.gov.my / SASI2026)'}
                </p>

                {adminError && (
                  <div className="mb-3 p-3 rounded-xl bg-rose-100 text-rose-900 text-xs font-bold">
                    {adminError}
                  </div>
                )}

                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold mb-1">E-mel Pentadbir</label>
                    <input
                      type="email"
                      required
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="admin@sasi.gov.my"
                      className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Kata Laluan</label>
                    <input
                      type="password"
                      required
                      value={adminPass}
                      onChange={(e) => setAdminPass(e.target.value)}
                      placeholder="••••••••"
                      className="w-full p-3 rounded-xl border border-slate-300 text-slate-900 text-sm"
                    />
                  </div>
                  <button type="submit" className={`w-full ${theme.btnPrimary}`}>
                    {lang === 'ms' ? 'Log Masuk ke Dashboard' : 'Login to Dashboard'}
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-black">
                      {lang === 'ms' ? 'Dashboard Pentadbir SASI' : 'SASI Administrator Dashboard'}
                    </h1>
                    <p className={`text-sm ${theme.muted}`}>
                      {lang === 'ms'
                        ? 'Urus kandungan sejarah, aksesibiliti laluan, dan laporan statistik sistem.'
                        : 'Manage historical content, route accessibility, and system usage analytics.'}
                    </p>
                  </div>
                  <button
                    onClick={() => setIsAdminAuth(false)}
                    className="px-4 py-2 rounded-xl bg-rose-600 text-white font-bold text-sm flex items-center gap-1.5"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>{lang === 'ms' ? 'Log Keluar' : 'Logout'}</span>
                  </button>
                </div>

                {/* Tambah Tapak Sejarah Baharu */}
                <div className={`p-6 rounded-3xl ${theme.card}`}>
                  <h2 className="text-lg font-black mb-4 flex items-center gap-2">
                    <Plus className="w-5 h-5 text-teal-600" />
                    <span>{lang === 'ms' ? 'Tambah Lokasi Sejarah Baharu' : 'Add New Heritage Site'}</span>
                  </h2>
                  <form onSubmit={handleAddSite} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Nama Lokasi (Bahasa Melayu)*"
                      value={newSiteForm.nameMs}
                      onChange={(e) => setNewSiteForm({ ...newSiteForm, nameMs: e.target.value })}
                      className="p-3 rounded-xl border border-slate-300 text-slate-900 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Site Name (English)"
                      value={newSiteForm.nameEn}
                      onChange={(e) => setNewSiteForm({ ...newSiteForm, nameEn: e.target.value })}
                      className="p-3 rounded-xl border border-slate-300 text-slate-900 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Tahun Pembinaan (cth: 1910)"
                      value={newSiteForm.year}
                      onChange={(e) => setNewSiteForm({ ...newSiteForm, year: e.target.value })}
                      className="p-3 rounded-xl border border-slate-300 text-slate-900 text-sm"
                    />
                    <input
                      type="text"
                      placeholder="Tokoh / Arkitek Berkaitan"
                      value={newSiteForm.architect}
                      onChange={(e) => setNewSiteForm({ ...newSiteForm, architect: e.target.value })}
                      className="p-3 rounded-xl border border-slate-300 text-slate-900 text-sm"
                    />
                    <textarea
                      rows="2"
                      required
                      placeholder="Ringkasan Sejarah (Bahasa Melayu)*"
                      value={newSiteForm.summaryMs}
                      onChange={(e) => setNewSiteForm({ ...newSiteForm, summaryMs: e.target.value })}
                      className="p-3 rounded-xl border border-slate-300 text-slate-900 text-sm"
                    />
                    <textarea
                      rows="2"
                      placeholder="Historical Summary (English)"
                      value={newSiteForm.summaryEn}
                      onChange={(e) => setNewSiteForm({ ...newSiteForm, summaryEn: e.target.value })}
                      className="p-3 rounded-xl border border-slate-300 text-slate-900 text-sm"
                    />
                    <label className="flex items-center gap-2 text-sm font-bold">
                      <input
                        type="checkbox"
                        checked={newSiteForm.wheelchairAccessible}
                        onChange={(e) => setNewSiteForm({ ...newSiteForm, wheelchairAccessible: e.target.checked })}
                        className="w-4 h-4 accent-teal-600"
                      />
                      <span>{lang === 'ms' ? 'Lokasi Mesra Kerusi Roda' : 'Wheelchair Accessible Site'}</span>
                    </label>
                    <button type="submit" className={theme.btnSecondary}>
                      {lang === 'ms' ? 'Simpan Lokasi ke Pangkalan Data' : 'Save Site to Database'}
                    </button>
                  </form>
                </div>

                {/* Senarai Lokasi Sedia Ada (Urus & Padam) */}
                <div className={`p-6 rounded-3xl ${theme.card}`}>
                  <h2 className="text-lg font-black mb-4">
                    {lang === 'ms' ? 'Senarai Tapak Sejarah Aktif' : 'Active Heritage Sites'}
                  </h2>
                  <div className="space-y-2.5">
                    {sites.map((s) => (
                      <div key={s.id} className="p-4 rounded-2xl border border-slate-200 flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <div className="font-extrabold text-sm">{s.name[lang]} ({s.year})</div>
                          <div className={`text-xs ${theme.muted}`}>{s.summary[lang]}</div>
                        </div>
                        <button
                          onClick={() => handleDeleteSite(s.id)}
                          className="px-3 py-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-900 font-bold text-xs flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{lang === 'ms' ? 'Padam' : 'Delete'}</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0B1F3A] text-slate-300 border-t border-white/10 py-6 px-4 mt-12">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs">
          <div>
            <span className="font-black text-white">SASI – Sistem Akses Sejarah Inklusif</span> •{' '}
            <span>
              {lang === 'ms'
                ? 'Inovasi Warisan Digital & Kerjasama Awam-Swasta (PPP)'
                : 'Digital Heritage Innovation & Public-Private Partnership (PPP)'}
            </span>
          </div>
          <div className="text-teal-300 font-semibold">
            {lang === 'ms'
              ? 'Pematuhan Reka Bentuk Inklusif WCAG 2.2 AA • Bahasa Melayu & Bahasa Inggeris'
              : 'WCAG 2.2 AA Inclusive Design • Bahasa Melayu & English'}
          </div>
        </div>
      </footer>
    </div>
  );
}
