// PENJELASAN VIDEO: File dummy data untuk simulasi database - DATA LENGKAP
// Data ini akan digunakan di semua halaman

// PENJELASAN VIDEO: List UT Daerah (lengkap)
const upbjjList = [
    "Jakarta", "Surabaya", "Makassar", "Padang", "Denpasar",
    "Bandung", "Semarang", "Yogyakarta", "Medan", "Palembang",
    "Pontianak", "Banjarmasin", "Samarinda", "Manado", "Palu"
];

// PENJELASAN VIDEO: List Kategori Mata Kuliah
const kategoriList = ["MK Wajib", "MK Pilihan", "Praktikum", "Problem-Based"];

// PENJELASAN VIDEO: Opsi Pengiriman
const pengirimanList = [
    { kode: "REG", nama: "Reguler (3-5 hari)" },
    { kode: "EXP", nama: "Ekspres (1-2 hari)" }
];

// PENJELASAN VIDEO: Data Paket Bahan Ajar
const paketList = [
    { 
        id: 1,
        kode: "PAKET-UT-001", 
        kodePaket: "PAKET-UT-001",
        nama: "PAKET IPS Dasar",
        namaPaket: "PAKET IPS Dasar", 
        isi: ["EKMA4116","EKMA4115","ADPU4130"],
        items: ["EKMA4116 - Pengantar Manajemen", "EKMA4115 - Pengantar Akuntansi", "ADPU4130 - Pengantar Ilmu Administrasi"],
        harga: 180000 
    },
    { 
        id: 2,
        kode: "PAKET-UT-002", 
        kodePaket: "PAKET-UT-002",
        nama: "PAKET IPA Dasar",
        namaPaket: "PAKET IPA Dasar",
        isi: ["BIOL4201","FISIP4001","MATH4101"],
        items: ["BIOL4201 - Biologi Umum", "FISIP4001 - Dasar-Dasar Sosiologi", "MATH4101 - Kalkulus I"],
        harga: 210000 
    },
    { 
        id: 3,
        kode: "PAKET-UT-003", 
        kodePaket: "PAKET-UT-003",
        nama: "PAKET Komputer",
        namaPaket: "PAKET Komputer",
        isi: ["COMP4101","COMP4201","ISIP4111"],
        items: ["COMP4101 - Algoritma Pemrograman", "COMP4201 - Struktur Data", "ISIP4111 - Asas-Asas Manajemen"],
        harga: 240000 
    },
    { 
        id: 4,
        kode: "PAKET-UT-004", 
        kodePaket: "PAKET-UT-004",
        nama: "PAKET Bahasa",
        namaPaket: "PAKET Bahasa",
        isi: ["MKDU4107","MKDU4108","MKDU4110"],
        items: ["MKDU4107 - Bahasa Inggris I", "MKDU4108 - Bahasa Inggris II", "MKDU4110 - Bahasa Indonesia"],
        harga: 135000 
    }
];

// PENJELASAN VIDEO: Data Stok Bahan Ajar LENGKAP (50+ items)
const dataBahanAjar = [
    // FAKULTAS EKONOMI
    {
        id: 1,
        kode: "EKMA4116",
        judul: "Manajemen",
        kategori: "MK Wajib",
        upbjj: "Jakarta",
        lokasiRak: "R1-A1",
        harga: 65000,
        qty: 150,
        safety: 100,
        catatanHTML: "<strong>Best Seller!</strong> Edisi terbaru 2024"
    },
    {
        id: 2,
        kode: "EKMA4115",
        judul: "Pengantar Akuntansi",
        kategori: "MK Wajib",
        upbjj: "Jakarta",
        lokasiRak: "R1-A2",
        harga: 60000,
        qty: 120,
        safety: 80,
        catatanHTML: "<em>Cover baru</em> dengan pembahasan updated"
    },
    {
        id: 3,
        kode: "EKMA4213",
        judul: "Manajemen Keuangan",
        kategori: "MK Wajib",
        upbjj: "Surabaya",
        lokasiRak: "R1-A3",
        harga: 70000,
        qty: 85,
        safety: 60,
        catatanHTML: "Dilengkapi <u>studi kasus</u> terkini"
    },
    {
        id: 4,
        kode: "EKMA4111",
        judul: "Pengantar Bisnis",
        kategori: "MK Wajib",
        upbjj: "Bandung",
        lokasiRak: "R1-A4",
        harga: 58000,
        qty: 95,
        safety: 70,
        catatanHTML: "Modul <b>populer</b> untuk pemula"
    },
    {
        id: 5,
        kode: "EKMA4434",
        judul: "Sistem Informasi Manajemen",
        kategori: "MK Pilihan",
        upbjj: "Semarang",
        lokasiRak: "R1-B1",
        harga: 72000,
        qty: 45,
        safety: 40,
        catatanHTML: "Update <i>teknologi terbaru</i>"
    },
    {
        id: 6,
        kode: "EKMA4371",
        judul: "Manajemen Rantai Pasokan",
        kategori: "MK Pilihan",
        upbjj: "Yogyakarta",
        lokasiRak: "R1-B2",
        harga: 68000,
        qty: 30,
        safety: 25,
        catatanHTML: "Cocok untuk <b>praktisi</b>"
    },
    
    // FAKULTAS HUKUM
    {
        id: 7,
        kode: "HKUM4101",
        judul: "Pengantar Ilmu Hukum",
        kategori: "MK Wajib",
        upbjj: "Jakarta",
        lokasiRak: "R2-A1",
        harga: 63000,
        qty: 110,
        safety: 80,
        catatanHTML: "<em>Fondasi</em> untuk mahasiswa hukum"
    },
    {
        id: 8,
        kode: "HKUM4206",
        judul: "Hukum Perdata",
        kategori: "MK Wajib",
        upbjj: "Surabaya",
        lokasiRak: "R2-A2",
        harga: 75000,
        qty: 70,
        safety: 50,
        catatanHTML: "Lengkap dengan <u>contoh kasus</u>"
    },
    {
        id: 9,
        kode: "HKUM4303",
        judul: "Hukum Pidana",
        kategori: "MK Wajib",
        upbjj: "Medan",
        lokasiRak: "R2-A3",
        harga: 78000,
        qty: 55,
        safety: 40,
        catatanHTML: "<strong>KUHP terbaru</strong> included"
    },
    {
        id: 10,
        kode: "HKUM4405",
        judul: "Hukum Internasional",
        kategori: "MK Pilihan",
        upbjj: "Makassar",
        lokasiRak: "R2-B1",
        harga: 82000,
        qty: 25,
        safety: 20,
        catatanHTML: "Perspektif <i>global</i>"
    },
    
    // FKIP - PENDIDIKAN
    {
        id: 11,
        kode: "MKDU4107",
        judul: "Bahasa Inggris I",
        kategori: "MK Wajib",
        upbjj: "Jakarta",
        lokasiRak: "R3-A1",
        harga: 45000,
        qty: 200,
        safety: 150,
        catatanHTML: "<b>Paling laris!</b> Wajib semua prodi"
    },
    {
        id: 12,
        kode: "MKDU4108",
        judul: "Bahasa Inggris II",
        kategori: "MK Wajib",
        upbjj: "Jakarta",
        lokasiRak: "R3-A2",
        harga: 47000,
        qty: 180,
        safety: 130,
        catatanHTML: "Lanjutan dari <em>Bahasa Inggris I</em>"
    },
    {
        id: 13,
        kode: "MKDU4110",
        judul: "Bahasa Indonesia",
        kategori: "MK Wajib",
        upbjj: "Surabaya",
        lokasiRak: "R3-A3",
        harga: 42000,
        qty: 165,
        safety: 120,
        catatanHTML: "EYD terbaru dan <u>ejaan baku</u>"
    },
    {
        id: 14,
        kode: "MKDU4111",
        judul: "Pendidikan Kewarganegaraan",
        kategori: "MK Wajib",
        upbjj: "Bandung",
        lokasiRak: "R3-A4",
        harga: 40000,
        qty: 140,
        safety: 100,
        catatanHTML: "Materi <strong>Pancasila</strong> terkini"
    },
    {
        id: 15,
        kode: "PDGK4403",
        judul: "Pendidikan Anak di SD",
        kategori: "MK Wajib",
        upbjj: "Yogyakarta",
        lokasiRak: "R3-B1",
        harga: 68000,
        qty: 75,
        safety: 50,
        catatanHTML: "Untuk <i>calon guru SD</i>"
    },
    
    // FISIP - ILMU SOSIAL
    {
        id: 16,
        kode: "FISIP4001",
        judul: "Dasar-Dasar Sosiologi",
        kategori: "MK Wajib",
        upbjj: "Makassar",
        lokasiRak: "R4-A1",
        harga: 55000,
        qty: 90,
        safety: 60,
        catatanHTML: "Teori <b>sosiologi klasik</b>"
    },
    {
        id: 17,
        kode: "ISIP4111",
        judul: "Asas-Asas Manajemen",
        kategori: "MK Wajib",
        upbjj: "Padang",
        lokasiRak: "R4-A2",
        harga: 62000,
        qty: 100,
        safety: 70,
        catatanHTML: "<em>Fundamental</em> manajemen"
    },
    {
        id: 18,
        kode: "ISIP4212",
        judul: "Pengantar Ilmu Politik",
        kategori: "MK Wajib",
        upbjj: "Palembang",
        lokasiRak: "R4-A3",
        harga: 58000,
        qty: 65,
        safety: 45,
        catatanHTML: "Sistem politik <u>Indonesia</u>"
    },
    {
        id: 19,
        kode: "SKOM4101",
        judul: "Pengantar Ilmu Komunikasi",
        kategori: "MK Wajib",
        upbjj: "Denpasar",
        lokasiRak: "R4-A4",
        harga: 60000,
        qty: 80,
        safety: 55,
        catatanHTML: "Teori <i>komunikasi massa</i>"
    },
    {
        id: 20,
        kode: "ADPU4130",
        judul: "Pengantar Ilmu Administrasi Negara",
        kategori: "MK Wajib",
        upbjj: "Pontianak",
        lokasiRak: "R4-B1",
        harga: 64000,
        qty: 50,
        safety: 35,
        catatanHTML: "<strong>Administrasi publik</strong>"
    },
    
    // FMIPA - SAINS
    {
        id: 21,
        kode: "MATH4101",
        judul: "Kalkulus I",
        kategori: "MK Wajib",
        upbjj: "Jakarta",
        lokasiRak: "R5-A1",
        harga: 72000,
        qty: 105,
        safety: 80,
        catatanHTML: "Dasar <b>matematika</b> tingkat lanjut"
    },
    {
        id: 22,
        kode: "MATH4102",
        judul: "Kalkulus II",
        kategori: "MK Wajib",
        upbjj: "Bandung",
        lokasiRak: "R5-A2",
        harga: 74000,
        qty: 85,
        safety: 60,
        catatanHTML: "Lanjutan <em>Kalkulus I</em>"
    },
    {
        id: 23,
        kode: "BIOL4201",
        judul: "Biologi Umum",
        kategori: "Praktikum",
        upbjj: "Surabaya",
        lokasiRak: "R5-B1",
        harga: 80000,
        qty: 60,
        safety: 40,
        catatanHTML: "Termasuk <u>kit praktikum</u>"
    },
    {
        id: 24,
        kode: "PHYS4101",
        judul: "Fisika Dasar I",
        kategori: "MK Wajib",
        upbjj: "Semarang",
        lokasiRak: "R5-A3",
        harga: 68000,
        qty: 70,
        safety: 50,
        catatanHTML: "Mekanika dan <i>termodinamika</i>"
    },
    {
        id: 25,
        kode: "CHEM4101",
        judul: "Kimia Dasar I",
        kategori: "MK Wajib",
        upbjj: "Yogyakarta",
        lokasiRak: "R5-A4",
        harga: 70000,
        qty: 75,
        safety: 55,
        catatanHTML: "<strong>Stoikiometri</strong> dan reaksi"
    },
    {
        id: 26,
        kode: "STAT4201",
        judul: "Statistika Dasar",
        kategori: "MK Wajib",
        upbjj: "Medan",
        lokasiRak: "R5-B2",
        harga: 66000,
        qty: 90,
        safety: 65,
        catatanHTML: "Termasuk <b>tabel statistik</b>"
    },
    
    // TEKNIK & KOMPUTER
    {
        id: 27,
        kode: "COMP4101",
        judul: "Algoritma dan Pemrograman",
        kategori: "Problem-Based",
        upbjj: "Jakarta",
        lokasiRak: "R6-A1",
        harga: 85000,
        qty: 110,
        safety: 80,
        catatanHTML: "<strong>Coding</strong> dengan Python"
    },
    {
        id: 28,
        kode: "COMP4201",
        judul: "Struktur Data",
        kategori: "Problem-Based",
        upbjj: "Surabaya",
        lokasiRak: "R6-A2",
        harga: 88000,
        qty: 95,
        safety: 70,
        catatanHTML: "Array, <i>linked list</i>, tree"
    },
    {
        id: 29,
        kode: "COMP4301",
        judul: "Basis Data",
        kategori: "Problem-Based",
        upbjj: "Bandung",
        lokasiRak: "R6-A3",
        harga: 90000,
        qty: 80,
        safety: 60,
        catatanHTML: "SQL dan <u>database design</u>"
    },
    {
        id: 30,
        kode: "COMP4401",
        judul: "Pemrograman Web",
        kategori: "Problem-Based",
        upbjj: "Semarang",
        lokasiRak: "R6-A4",
        harga: 92000,
        qty: 70,
        safety: 50,
        catatanHTML: "<b>HTML, CSS, JavaScript</b>"
    },
    {
        id: 31,
        kode: "STIN4201",
        judul: "Sistem Informasi",
        kategori: "MK Pilihan",
        upbjj: "Makassar",
        lokasiRak: "R6-B1",
        harga: 78000,
        qty: 55,
        safety: 40,
        catatanHTML: "Analisis dan <em>desain sistem</em>"
    },
    
    // PRAKTIKUM LANJUTAN
    {
        id: 32,
        kode: "CHEM4301",
        judul: "Kimia Organik (Praktikum)",
        kategori: "Praktikum",
        upbjj: "Yogyakarta",
        lokasiRak: "R5-B3",
        harga: 95000,
        qty: 35,
        safety: 25,
        catatanHTML: "Perlu <u>lab khusus</u>"
    },
    {
        id: 33,
        kode: "PHYS4301",
        judul: "Fisika Eksperimen",
        kategori: "Praktikum",
        upbjj: "Padang",
        lokasiRak: "R5-B4",
        harga: 88000,
        qty: 40,
        safety: 30,
        catatanHTML: "Alat praktikum <b>lengkap</b>"
    },
    {
        id: 34,
        kode: "BIOL4301",
        judul: "Mikrobiologi (Praktikum)",
        kategori: "Praktikum",
        upbjj: "Denpasar",
        lokasiRak: "R5-B5",
        harga: 98000,
        qty: 28,
        safety: 20,
        catatanHTML: "Kit <i>mikroskop</i> tersedia"
    },
    
    // MK PILIHAN TAMBAHAN
    {
        id: 35,
        kode: "EKMA4568",
        judul: "Pemasaran Jasa",
        kategori: "MK Pilihan",
        upbjj: "Jakarta",
        lokasiRak: "R1-C1",
        harga: 67000,
        qty: 48,
        safety: 35,
        catatanHTML: "<strong>Marketing</strong> era digital"
    },
    {
        id: 36,
        kode: "EKMA4414",
        judul: "Manajemen Strategik",
        kategori: "MK Pilihan",
        upbjj: "Surabaya",
        lokasiRak: "R1-C2",
        harga: 76000,
        qty: 52,
        safety: 40,
        catatanHTML: "Strategi <i>bisnis modern</i>"
    },
    {
        id: 37,
        kode: "ISIP4310",
        judul: "Sistem Politik Indonesia",
        kategori: "MK Pilihan",
        upbjj: "Medan",
        lokasiRak: "R4-C1",
        harga: 64000,
        qty: 38,
        safety: 30,
        catatanHTML: "Update <u>pemilu 2024</u>"
    },
    {
        id: 38,
        kode: "HKUM4409",
        judul: "Hukum Dagang",
        kategori: "MK Pilihan",
        upbjj: "Palembang",
        lokasiRak: "R2-C1",
        harga: 71000,
        qty: 42,
        safety: 32,
        catatanHTML: "Untuk <b>pengusaha</b>"
    },
    {
        id: 39,
        kode: "SKOM4432",
        judul: "Komunikasi Pemasaran Terpadu",
        kategori: "MK Pilihan",
        upbjj: "Banjarmasin",
        lokasiRak: "R4-C2",
        harga: 69000,
        qty: 35,
        safety: 28,
        catatanHTML: "<em>IMC strategies</em>"
    },
    {
        id: 40,
        kode: "COMP4501",
        judul: "Kecerdasan Buatan",
        kategori: "Problem-Based",
        upbjj: "Jakarta",
        lokasiRak: "R6-C1",
        harga: 96000,
        qty: 58,
        safety: 45,
        catatanHTML: "<strong>AI & Machine Learning</strong>"
    },
    
    // STOK MENIPIS & KOSONG
    {
        id: 41,
        kode: "EKMA4210",
        judul: "Akuntansi Biaya",
        kategori: "MK Wajib",
        upbjj: "Samarinda",
        lokasiRak: "R1-D1",
        harga: 71000,
        qty: 12,
        safety: 50,
        catatanHTML: "<span class='text-warning'><b>Stok menipis!</b> Segera reorder</span>"
    },
    {
        id: 42,
        kode: "HKUM4205",
        judul: "Hukum Acara Perdata",
        kategori: "MK Wajib",
        upbjj: "Manado",
        lokasiRak: "R2-D1",
        harga: 73000,
        qty: 8,
        safety: 40,
        catatanHTML: "<span class='text-warning'><i>Urgent reorder</i></span>"
    },
    {
        id: 43,
        kode: "PDGK4205",
        judul: "Pembelajaran Terpadu",
        kategori: "MK Wajib",
        upbjj: "Palu",
        lokasiRak: "R3-D1",
        harga: 65000,
        qty: 5,
        safety: 35,
        catatanHTML: "<span class='text-danger'><b>KRITIS!</b> Hampir habis</span>"
    },
    {
        id: 44,
        kode: "MATH4310",
        judul: "Aljabar Linear",
        kategori: "MK Wajib",
        upbjj: "Pontianak",
        lokasiRak: "R5-D1",
        harga: 74000,
        qty: 0,
        safety: 45,
        catatanHTML: "<span class='text-danger'><strong>HABIS TOTAL</strong> - Dalam cetak</span>"
    },
    {
        id: 45,
        kode: "COMP4601",
        judul: "Keamanan Siber",
        kategori: "Problem-Based",
        upbjj: "Banjarmasin",
        lokasiRak: "R6-D1",
        harga: 94000,
        qty: 0,
        safety: 30,
        catatanHTML: "<span class='text-danger'><b>KOSONG</b> - Pre-order available</span>"
    },
    
    // STOK BARU & POPULER
    {
        id: 46,
        kode: "EKMA4570",
        judul: "Manajemen Digital",
        kategori: "MK Pilihan",
        upbjj: "Jakarta",
        lokasiRak: "R1-E1",
        harga: 84000,
        qty: 125,
        safety: 90,
        catatanHTML: "<strong class='text-success'>BARU!</strong> <em>Best seller 2024</em>"
    },
    {
        id: 47,
        kode: "COMP4701",
        judul: "Cloud Computing",
        kategori: "Problem-Based",
        upbjj: "Surabaya",
        lokasiRak: "R6-E1",
        harga: 98000,
        qty: 95,
        safety: 70,
        catatanHTML: "<b class='text-success'>HOT!</b> Teknologi <i>terkini</i>"
    },
    {
        id: 48,
        kode: "SKOM4520",
        judul: "Media Sosial dan Masyarakat",
        kategori: "MK Pilihan",
        upbjj: "Bandung",
        lokasiRak: "R4-E1",
        harga: 72000,
        qty: 88,
        safety: 65,
        catatanHTML: "<strong>TRENDING!</strong> Analisis <u>socmed</u>"
    },
    {
        id: 49,
        kode: "ISIP4420",
        judul: "Administrasi Digital",
        kategori: "MK Pilihan",
        upbjj: "Yogyakarta",
        lokasiRak: "R4-E2",
        harga: 68000,
        qty: 76,
        safety: 55,
        catatanHTML: "E-government dan <i>smart city</i>"
    },
    {
        id: 50,
        kode: "HKUM4510",
        judul: "Hukum Siber",
        kategori: "MK Pilihan",
        upbjj: "Semarang",
        lokasiRak: "R2-E1",
        harga: 79000,
        qty: 64,
        safety: 50,
        catatanHTML: "<b>Cyber law</b> dan <u>UU ITE</u>"
    }
];

// PENJELASAN VIDEO: Data Tracking DO
const trackingData = {
    "DO2025-001": {
        nomorDO: "DO2025-001",
        nim: "123456789",
        nama: "Rina Wulandari",
        status: "Dalam Perjalanan",
        ekspedisi: "JNE Regular",
        tanggalKirim: "2025-01-25",
        paket: "PAKET-UT-001 - PAKET IPS Dasar",
        totalHarga: 180000,
        history: [
            { status: "DO Dibuat", tanggal: "2025-01-25", waktu: "10:12:20", keterangan: "Penerimaan di Loket: TANGSEL" },
            { status: "Dikemas", tanggal: "2025-01-25", waktu: "11:30:00", keterangan: "Paket sedang dikemas di warehouse" },
            { status: "Dikirim", tanggal: "2025-01-25", waktu: "14:07:56", keterangan: "Tiba di Hub: JAKSEL" },
            { status: "Dalam Perjalanan", tanggal: "2025-01-26", waktu: "08:44:01", keterangan: "Diteruskan ke Kantor Tujuan" }
        ]
    }
};

// PENJELASAN VIDEO: Export data agar bisa diakses dari file lain
window.dataBahanAjar = dataBahanAjar;
window.upbjjList = upbjjList;
window.kategoriList = kategoriList;
window.pengirimanList = pengirimanList;
window.paketList = paketList;
window.trackingData = trackingData;

console.log('✅ Data Bahan Ajar loaded:', dataBahanAjar.length, 'items');
console.log('✅ UT Daerah loaded:', upbjjList.length, 'items');
console.log('✅ Kategori loaded:', kategoriList.length, 'items');
console.log('📦 Sample data:', dataBahanAjar[0]);