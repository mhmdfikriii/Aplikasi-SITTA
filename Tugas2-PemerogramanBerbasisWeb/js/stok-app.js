// PENJELASAN VIDEO: Import Vue dan destructure createApp
const { createApp } = Vue;

// PENJELASAN VIDEO: Membuat Vue App dengan createApp
createApp({
    // PENJELASAN VIDEO: Data properties - menampung semua state aplikasi
    data() {
        return {
            // Data bahan ajar dari file dummy data
            bahanAjarList: window.dataBahanAjar || [],
            upbjjList: window.upbjjList || [],
            kategoriList: window.kategoriList || [],
            
            // Filter & Search state dengan v-model untuk two-way binding
            searchQuery: '',
            filterUTPJJ: '',
            filterKategori: '',
            sortBy: 'judul',
            showAlertOnly: false,
            
            // Pagination state
            currentPage: 1,
            itemsPerPage: 10,
            
            // Modal states menggunakan v-show
            showEditModal: false,
            showAddModal: false,
            showDetailModal: false,
            
            // Form data untuk edit
            editForm: {
                id: null,
                kode: '',
                judul: '',
                qty: 0,
                safety: 0,
                lokasiRak: ''
            },
            
            // Form data untuk tambah baru
            newForm: {
                kode: '',
                judul: '',
                kategori: '',
                upbjj: '',
                lokasiRak: '',
                qty: 0,
                safety: 0,
                harga: 0,
                catatanHTML: ''
            },
            
            // Validation errors
            validationErrors: {},
            
            // Selected item untuk detail
            selectedItem: null
        };
    },
    
    // PENJELASAN VIDEO: Computed Properties - properti yang dihitung otomatis ketika dependensinya berubah
    // Computed properties di-cache dan hanya recompute ketika dependencies berubah
    computed: {
        // PENJELASAN VIDEO: Filter data berdasarkan search, filter, dan sort
        filteredData() {
            let result = [...this.bahanAjarList];
            
            // Filter berdasarkan search query
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                result = result.filter(item => 
                    item.kode.toLowerCase().includes(query) ||
                    item.judul.toLowerCase().includes(query)
                );
            }
            
            // Filter berdasarkan UT Daerah
            if (this.filterUTPJJ) {
                result = result.filter(item => item.upbjj === this.filterUTPJJ);
            }
            
            // Filter berdasarkan Kategori
            if (this.filterKategori) {
                result = result.filter(item => item.kategori === this.filterKategori);
            }
            
            // Filter untuk alert stok (menipis & kosong)
            if (this.showAlertOnly) {
                result = result.filter(item => item.qty < item.safety || item.qty === 0);
            }
            
            // Sorting
            result = this.sortData(result);
            
            return result;
        },
        
        // PENJELASAN VIDEO: Computed untuk pagination - mengambil data sesuai halaman aktif
        paginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.filteredData.slice(start, end);
        },
        
        // PENJELASAN VIDEO: Total halaman untuk pagination
        totalPages() {
            return Math.ceil(this.filteredData.length / this.itemsPerPage);
        },
        
        // PENJELASAN VIDEO: Total items untuk statistik
        totalItems() {
            return this.bahanAjarList.length;
        },
        
        // PENJELASAN VIDEO: Hitung jumlah stok aman
        stockAman() {
            return this.bahanAjarList.filter(item => 
                item.qty >= item.safety && item.qty > 0
            ).length;
        },
        
        // PENJELASAN VIDEO: Hitung jumlah stok menipis
        stockMenipis() {
            return this.bahanAjarList.filter(item => 
                item.qty < item.safety && item.qty > 0
            ).length;
        },
        
        // PENJELASAN VIDEO: Hitung jumlah stok kosong
        stockKosong() {
            return this.bahanAjarList.filter(item => item.qty === 0).length;
        },
        
        // PENJELASAN VIDEO: Dependent options - kategori yang tersedia berdasarkan UT yang dipilih
        // Ini implementasi dari "dependent options" yang diminta di soal
        availableCategories() {
            if (!this.filterUTPJJ) return [];
            
            const categories = new Set();
            this.bahanAjarList
                .filter(item => item.upbjj === this.filterUTPJJ)
                .forEach(item => categories.add(item.kategori));
            
            return Array.from(categories);
        }
    },
    
    // PENJELASAN VIDEO: Methods - fungsi-fungsi yang dapat dipanggil
    methods: {
        // PENJELASAN VIDEO: Method untuk sorting data
        sortData(data) {
            const sortedData = [...data];
            
            switch(this.sortBy) {
                case 'judul':
                    return sortedData.sort((a, b) => a.judul.localeCompare(b.judul));
                case 'judul-desc':
                    return sortedData.sort((a, b) => b.judul.localeCompare(a.judul));
                case 'qty':
                    return sortedData.sort((a, b) => a.qty - b.qty);
                case 'qty-desc':
                    return sortedData.sort((a, b) => b.qty - a.qty);
                case 'harga':
                    return sortedData.sort((a, b) => a.harga - b.harga);
                case 'harga-desc':
                    return sortedData.sort((a, b) => b.harga - a.harga);
                default:
                    return sortedData;
            }
        },
        
        // PENJELASAN VIDEO: Reset semua filter ke nilai awal
        resetFilters() {
            this.searchQuery = '';
            this.filterUTPJJ = '';
            this.filterKategori = '';
            this.sortBy = 'judul';
            this.showAlertOnly = false;
            this.currentPage = 1;
        },
        
        // PENJELASAN VIDEO: Format currency untuk tampilan rupiah
        formatCurrency(value) {
            return new Intl.NumberFormat('id-ID').format(value);
        },
        
        // PENJELASAN VIDEO: Fungsi untuk edit item - populate form dengan data yang dipilih
        editItem(item) {
            this.editForm = {
                id: item.id,
                kode: item.kode,
                judul: item.judul,
                qty: item.qty,
                safety: item.safety,
                lokasiRak: item.lokasiRak
            };
            this.showEditModal = true;
        },
        
        // PENJELASAN VIDEO: Simpan perubahan edit
        saveEdit() {
            const index = this.bahanAjarList.findIndex(item => item.id === this.editForm.id);
            if (index !== -1) {
                // Update data
                this.bahanAjarList[index].qty = this.editForm.qty;
                this.bahanAjarList[index].safety = this.editForm.safety;
                this.bahanAjarList[index].lokasiRak = this.editForm.lokasiRak;
                
                // Tampilkan alert sukses
                alert('Data berhasil diperbarui!');
                this.closeEditModal();
            }
        },
        
        // PENJELASAN VIDEO: Tutup modal edit
        closeEditModal() {
            this.showEditModal = false;
            this.editForm = {
                id: null,
                kode: '',
                judul: '',
                qty: 0,
                safety: 0,
                lokasiRak: ''
            };
        },
        
        // PENJELASAN VIDEO: Validasi form tambah bahan ajar
        validateNewItem() {
            this.validationErrors = {};
            
            // Cek apakah kode sudah ada
            const exists = this.bahanAjarList.find(item => 
                item.kode === this.newForm.kode
            );
            
            if (exists) {
                this.validationErrors.kode = 'Kode mata kuliah sudah ada!';
                return false;
            }
            
            return true;
        },
        
        // PENJELASAN VIDEO: Simpan item baru
        saveNewItem() {
            if (!this.validateNewItem()) {
                return;
            }
            
            // Generate ID baru
            const newId = Math.max(...this.bahanAjarList.map(item => item.id), 0) + 1;
            
            // Tambah item baru ke array
            const newItem = {
                id: newId,
                ...this.newForm
            };
            
            this.bahanAjarList.push(newItem);
            
            alert('Bahan ajar baru berhasil ditambahkan!');
            this.closeAddModal();
        },
        
        // PENJELASAN VIDEO: Tutup modal tambah
        closeAddModal() {
            this.showAddModal = false;
            this.newForm = {
                kode: '',
                judul: '',
                kategori: '',
                upbjj: '',
                lokasiRak: '',
                qty: 0,
                safety: 0,
                harga: 0,
                catatanHTML: ''
            };
            this.validationErrors = {};
        },
        
        // PENJELASAN VIDEO: Tampilkan detail item
        viewDetail(item) {
            this.selectedItem = item;
            this.showDetailModal = true;
        }
    },
    
    // PENJELASAN VIDEO: Watchers - memantau perubahan pada data tertentu
    // Watcher 1: Memantau perubahan filterUTPJJ
    watch: {
        // PENJELASAN VIDEO: Watcher untuk reset kategori ketika UT Daerah berubah
        filterUTPJJ(newValue, oldValue) {
            // Reset kategori ketika UT berubah (dependent options)
            if (oldValue !== newValue) {
                this.filterKategori = '';
            }
            console.log('UT Daerah berubah dari', oldValue, 'ke', newValue);
        },
        
        // PENJELASAN VIDEO: Watcher 2 - Reset pagination ketika filter berubah
        filteredData() {
            // Reset ke halaman pertama ketika hasil filter berubah
            this.currentPage = 1;
            console.log('Data terfilter berubah, total:', this.filteredData.length);
        },
        
        // PENJELASAN VIDEO: Watcher 3 - Monitor perubahan search query
        searchQuery(newValue) {
            console.log('Search query:', newValue);
            // Bisa tambahkan debouncing di sini untuk optimasi
        },
        
        // PENJELASAN VIDEO: Watcher 4 - Monitor perubahan alert filter
        showAlertOnly(newValue) {
            if (newValue) {
                console.log('Menampilkan hanya stok alert:', this.filteredData.length, 'items');
            } else {
                console.log('Menampilkan semua stok');
            }
        }
    },
    
    // PENJELASAN VIDEO: Lifecycle hook - dijalankan setelah component di-mount
    mounted() {
        console.log('Stok App mounted!');
        console.log('Total bahan ajar:', this.bahanAjarList.length);
        console.log('Total UT Daerah:', this.upbjjList.length);
    }
}).mount('#app');