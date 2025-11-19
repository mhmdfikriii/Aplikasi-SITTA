// PENJELASAN VIDEO: Vue App untuk Katalog Mata Kuliah
const { createApp } = Vue;

createApp({
    data() {
        return {
            // Data dari dummy data dengan tambahan cover images
            mataKuliahList: [],
            
            // Filter states
            searchQuery: '',
            filterKategori: '',
            filterHarga: '',
            filterKetersediaan: '',
            sortBy: 'kode',
            
            // Modal state
            showDetailModal: false,
            selectedMK: null,
            
            // Cover images template - sesuai kategori baru
            coverImages: {
                'MK Wajib': [
                    'https://via.placeholder.com/300x400/0d6efd/ffffff?text=MK+WAJIB',
                    'https://via.placeholder.com/300x400/0a58ca/ffffff?text=MK+WAJIB',
                    'https://via.placeholder.com/300x400/6610f2/ffffff?text=MK+WAJIB'
                ],
                'MK Pilihan': [
                    'https://via.placeholder.com/300x400/198754/ffffff?text=MK+PILIHAN',
                    'https://via.placeholder.com/300x400/20c997/ffffff?text=MK+PILIHAN',
                    'https://via.placeholder.com/300x400/0dcaf0/000000?text=MK+PILIHAN'
                ],
                'Praktikum': [
                    'https://via.placeholder.com/300x400/dc3545/ffffff?text=PRAKTIKUM',
                    'https://via.placeholder.com/300x400/d63384/ffffff?text=PRAKTIKUM',
                    'https://via.placeholder.com/300x400/fd7e14/ffffff?text=PRAKTIKUM'
                ],
                'Problem-Based': [
                    'https://via.placeholder.com/300x400/ffc107/000000?text=PROBLEM+BASED',
                    'https://via.placeholder.com/300x400/fd7e14/ffffff?text=PROBLEM+BASED',
                    'https://via.placeholder.com/300x400/ffca2c/000000?text=PROBLEM+BASED'
                ]
            }
        };
    },
    
    computed: {
        // PENJELASAN VIDEO: Computed untuk filter dan sort mata kuliah
        filteredMataKuliah() {
            let result = [...this.mataKuliahList];
            
            // Filter by search query
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                result = result.filter(mk => 
                    mk.kode.toLowerCase().includes(query) ||
                    mk.judul.toLowerCase().includes(query)
                );
            }
            
            // Filter by kategori
            if (this.filterKategori) {
                result = result.filter(mk => mk.kategori === this.filterKategori);
            }
            
            // Filter by harga
            if (this.filterHarga) {
                if (this.filterHarga === 'low') {
                    result = result.filter(mk => mk.harga < 60000);
                } else if (this.filterHarga === 'mid') {
                    result = result.filter(mk => mk.harga >= 60000 && mk.harga <= 80000);
                } else if (this.filterHarga === 'high') {
                    result = result.filter(mk => mk.harga > 80000);
                }
            }
            
            // Filter by ketersediaan
            if (this.filterKetersediaan) {
                if (this.filterKetersediaan === 'tersedia') {
                    result = result.filter(mk => mk.qty >= mk.safety);
                } else if (this.filterKetersediaan === 'terbatas') {
                    result = result.filter(mk => mk.qty > 0 && mk.qty < mk.safety);
                } else if (this.filterKetersediaan === 'habis') {
                    result = result.filter(mk => mk.qty === 0);
                }
            }
            
            // Sort
            result = this.sortMataKuliah(result);
            
            return result;
        }
    },
    
    methods: {
        // PENJELASAN VIDEO: Sort mata kuliah berdasarkan pilihan
        sortMataKuliah(data) {
            const sorted = [...data];
            
            switch(this.sortBy) {
                case 'kode':
                    return sorted.sort((a, b) => a.kode.localeCompare(b.kode));
                case 'nama':
                    return sorted.sort((a, b) => a.judul.localeCompare(b.judul));
                case 'harga-asc':
                    return sorted.sort((a, b) => a.harga - b.harga);
                case 'harga-desc':
                    return sorted.sort((a, b) => b.harga - a.harga);
                case 'stok':
                    return sorted.sort((a, b) => b.qty - a.qty);
                default:
                    return sorted;
            }
        },
        
        // PENJELASAN VIDEO: Reset semua filter
        resetFilters() {
            this.searchQuery = '';
            this.filterKategori = '';
            this.filterHarga = '';
            this.filterKetersediaan = '';
            this.sortBy = 'kode';
        },
        
        // PENJELASAN VIDEO: Format currency untuk display
        formatCurrency(value) {
            return new Intl.NumberFormat('id-ID').format(value);
        },
        
        // PENJELASAN VIDEO: Get badge class based on category
        getCategoryBadgeClass(kategori) {
            const classes = {
                'MK Wajib': 'bg-primary',
                'MK Pilihan': 'bg-success',
                'Praktikum': 'bg-danger',
                'Problem-Based': 'bg-warning text-dark'
            };
            return classes[kategori] || 'bg-secondary';
        },
        
        // PENJELASAN VIDEO: View detail mata kuliah
        viewDetail(mk) {
            this.selectedMK = mk;
            this.showDetailModal = true;
        },
        
        // PENJELASAN VIDEO: Generate random cover image untuk setiap mata kuliah
        generateCoverImages() {
            // Cek apakah data sudah ada
            if (!window.dataBahanAjar || window.dataBahanAjar.length === 0) {
                console.error('❌ Data bahan ajar tidak ditemukan!');
                console.log('Pastikan file dataBahanAjar.js sudah di-load');
                return;
            }
            
            console.log('📚 Generating cover images untuk', window.dataBahanAjar.length, 'items');
            
            this.mataKuliahList = window.dataBahanAjar.map(mk => {
                const images = this.coverImages[mk.kategori] || this.coverImages['MK Wajib'];
                const randomImage = images[Math.floor(Math.random() * images.length)];
                
                return {
                    ...mk,
                    coverImage: randomImage
                };
            });
            
            console.log('✅ Cover images generated:', this.mataKuliahList.length, 'items');
        }
    },
    
    // PENJELASAN VIDEO: Watcher untuk monitoring filter changes
    watch: {
        searchQuery(newValue) {
            console.log('🔍 Search:', newValue);
        },
        
        filterKategori(newValue) {
            console.log('📂 Filter kategori:', newValue || 'All');
        },
        
        filteredMataKuliah(newValue) {
            console.log('📊 Filtered results:', newValue.length, 'items');
        }
    },
    
    // PENJELASAN VIDEO: Initialize data saat mounted
    mounted() {
        console.log('🚀 Katalog App mounting...');
        
        // Cek apakah dataBahanAjar sudah di-load
        if (typeof window.dataBahanAjar === 'undefined') {
            console.error('❌ ERROR: window.dataBahanAjar tidak ditemukan!');
            console.log('💡 Solusi: Pastikan <script src="js/dataBahanAjar.js"></script> ada di HTML SEBELUM katalog-app.js');
            alert('ERROR: Data bahan ajar tidak ditemukan!\n\nPastikan file dataBahanAjar.js sudah di-load.');
            return;
        }
        
        console.log('✅ Data bahan ajar ditemukan:', window.dataBahanAjar.length, 'items');
        
        // Generate cover images untuk setiap mata kuliah
        this.generateCoverImages();
        
        console.log('✅ Katalog App mounted successfully!');
        console.log('📊 Total mata kuliah:', this.mataKuliahList.length);
    }
}).mount('#app');