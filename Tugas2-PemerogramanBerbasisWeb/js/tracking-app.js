// PENJELASAN VIDEO: Vue App untuk Tracking DO
const { createApp } = Vue;

createApp({
    // PENJELASAN VIDEO: Data properties untuk tracking system
    data() {
        return {
            // Data paket dari dummy data
            paketList: window.paketList || [],
            
            // Tracking list - menyimpan semua DO yang sudah dibuat
            trackingList: [],
            
            // Form untuk input DO baru dengan v-model binding
            doForm: {
                nim: '',
                nama: '',
                ekspedisi: '',
                paketId: '',
                tanggalKirim: this.getTodayDate()
            },
            
            // Search & Filter
            searchDO: '',
            filterStatus: '',
            
            // Modal states
            showDetailModal: false,
            showUpdateModal: false,
            
            // Selected items untuk modal
            selectedTracking: null,
            
            // Update form
            updateForm: {
                nomorDO: '',
                newStatus: '',
                keterangan: ''
            }
        };
    },
    
    // PENJELASAN VIDEO: Computed Properties untuk data yang dihitung otomatis
    computed: {
        // PENJELASAN VIDEO: Generate nomor DO otomatis - Format: DO[TAHUN]-[SEQ]
        generateDONumber() {
            const year = new Date().getFullYear();
            const sequence = this.trackingList.length + 1;
            const seqStr = sequence.toString().padStart(3, '0');
            return `DO${year}-${seqStr}`;
        },
        
        // PENJELASAN VIDEO: Mendapatkan paket yang dipilih untuk menampilkan detail
        selectedPaket() {
            if (!this.doForm.paketId) return null;
            return this.paketList.find(p => p.id === parseInt(this.doForm.paketId));
        },
        
        // PENJELASAN VIDEO: Total harga dari paket yang dipilih
        totalHarga() {
            return this.selectedPaket ? this.selectedPaket.harga : 0;
        },
        
        // PENJELASAN VIDEO: Tanggal hari ini untuk max date picker
        todayDate() {
            return this.getTodayDate();
        },
        
        // PENJELASAN VIDEO: Filter tracking list berdasarkan search dan status
        filteredTrackingList() {
            let result = [...this.trackingList];
            
            // Filter berdasarkan search
            if (this.searchDO) {
                const query = this.searchDO.toLowerCase();
                result = result.filter(item => 
                    item.nomorDO.toLowerCase().includes(query) ||
                    item.nama.toLowerCase().includes(query) ||
                    item.nim.includes(query)
                );
            }
            
            // Filter berdasarkan status
            if (this.filterStatus) {
                result = result.filter(item => item.status === this.filterStatus);
            }
            
            // Sort by nomor DO descending (terbaru di atas)
            return result.sort((a, b) => b.nomorDO.localeCompare(a.nomorDO));
        },
        
        // PENJELASAN VIDEO: Hitung statistik status untuk cards
        statusCounts() {
            return {
                packing: this.trackingList.filter(t => t.status === 'Dikemas').length,
                proses: this.trackingList.filter(t => 
                    t.status === 'Dikirim' || t.status === 'Dalam Perjalanan'
                ).length,
                delivered: this.trackingList.filter(t => t.status === 'Terkirim').length
            };
        }
    },
    
    // PENJELASAN VIDEO: Methods untuk operasi-operasi
    methods: {
        // PENJELASAN VIDEO: Helper untuk format currency
        formatCurrency(value) {
            return new Intl.NumberFormat('id-ID').format(value);
        },
        
        // PENJELASAN VIDEO: Helper untuk mendapatkan tanggal hari ini
        getTodayDate() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        
        // PENJELASAN VIDEO: Submit delivery order baru
        submitDeliveryOrder() {
            // Validasi form
            if (!this.doForm.nim || !this.doForm.nama || !this.doForm.ekspedisi || 
                !this.doForm.paketId || !this.doForm.tanggalKirim) {
                alert('Mohon lengkapi semua field!');
                return;
            }
            
            const paket = this.selectedPaket;
            
            // Buat object tracking baru
            const newTracking = {
                nomorDO: this.generateDONumber,
                nim: this.doForm.nim,
                nama: this.doForm.nama,
                ekspedisi: this.doForm.ekspedisi,
                paket: `${paket.kodePaket} - ${paket.namaPaket}`,
                tanggalKirim: this.doForm.tanggalKirim,
                totalHarga: paket.harga,
                status: 'Dikemas',
                history: [
                    {
                        status: 'DO Dibuat',
                        tanggal: this.getTodayDate(),
                        waktu: new Date().toLocaleTimeString('id-ID'),
                        keterangan: 'Delivery Order berhasil dibuat dan menunggu dikemas'
                    },
                    {
                        status: 'Dikemas',
                        tanggal: this.getTodayDate(),
                        waktu: new Date().toLocaleTimeString('id-ID'),
                        keterangan: 'Paket sedang dikemas di warehouse'
                    }
                ]
            };
            
            // Tambah ke tracking list
            this.trackingList.push(newTracking);
            
            // Show success message
            alert(`Delivery Order ${newTracking.nomorDO} berhasil dibuat!`);
            
            // Reset form
            this.resetForm();
        },
        
        // PENJELASAN VIDEO: Reset form input
        resetForm() {
            this.doForm = {
                nim: '',
                nama: '',
                ekspedisi: '',
                paketId: '',
                tanggalKirim: this.getTodayDate()
            };
        },
        
        // PENJELASAN VIDEO: View detail tracking dengan timeline
        viewTrackingDetail(tracking) {
            this.selectedTracking = tracking;
            this.showDetailModal = true;
        },
        
        // PENJELASAN VIDEO: Open modal update status
        updateStatus(tracking) {
            this.updateForm = {
                nomorDO: tracking.nomorDO,
                newStatus: '',
                keterangan: ''
            };
            this.selectedTracking = tracking;
            this.showUpdateModal = true;
        },
        
        // PENJELASAN VIDEO: Save status update
        saveStatusUpdate() {
            if (!this.updateForm.newStatus) {
                alert('Pilih status baru!');
                return;
            }
            
            // Find tracking
            const tracking = this.trackingList.find(t => 
                t.nomorDO === this.updateForm.nomorDO
            );
            
            if (tracking) {
                // Update status
                tracking.status = this.updateForm.newStatus;
                
                // Add to history
                tracking.history.push({
                    status: this.updateForm.newStatus,
                    tanggal: this.getTodayDate(),
                    waktu: new Date().toLocaleTimeString('id-ID'),
                    keterangan: this.updateForm.keterangan || `Status diupdate menjadi ${this.updateForm.newStatus}`
                });
                
                alert('Status berhasil diupdate!');
                this.showUpdateModal = false;
            }
        },
        
        // PENJELASAN VIDEO: Get status badge class untuk styling
        getStatusBadgeClass(status) {
            const classes = {
                'Dikemas': 'bg-primary',
                'Dikirim': 'bg-info',
                'Dalam Perjalanan': 'bg-warning',
                'Terkirim': 'bg-success'
            };
            return classes[status] || 'bg-secondary';
        },
        
        // PENJELASAN VIDEO: Get border class untuk card
        getStatusBorderClass(status) {
            const classes = {
                'Dikemas': 'border-primary',
                'Dikirim': 'border-info',
                'Dalam Perjalanan': 'border-warning',
                'Terkirim': 'border-success'
            };
            return classes[status] || 'border-secondary';
        },
        
        // PENJELASAN VIDEO: Load sample data untuk demo
        loadSampleData() {
            // Load dari trackingData jika ada
            const existingTracking = window.trackingData;
            
            const sampleData = [
                {
                    nomorDO: 'DO2025-001',
                    nim: '123456789',
                    nama: 'Rina Wulandari',
                    ekspedisi: 'JNE Regular',
                    paket: 'PAKET-UT-001 - PAKET IPS Dasar',
                    tanggalKirim: '2025-01-25',
                    totalHarga: 120000,
                    status: 'Dalam Perjalanan',
                    history: [
                        {
                            status: 'DO Dibuat',
                            tanggal: '2025-01-25',
                            waktu: '10:12:20',
                            keterangan: 'Penerimaan di Loket: TANGSEL'
                        },
                        {
                            status: 'Dikemas',
                            tanggal: '2025-01-25',
                            waktu: '11:30:00',
                            keterangan: 'Paket sedang dikemas di warehouse'
                        },
                        {
                            status: 'Dikirim',
                            tanggal: '2025-01-25',
                            waktu: '14:07:56',
                            keterangan: 'Tiba di Hub: JAKSEL'
                        },
                        {
                            status: 'Dalam Perjalanan',
                            tanggal: '2025-01-26',
                            waktu: '08:44:01',
                            keterangan: 'Diteruskan ke Kantor Tujuan'
                        }
                    ]
                },
                {
                    nomorDO: 'DO2025-002',
                    nim: '530067890',
                    nama: 'Budi Santoso',
                    ekspedisi: 'JNE Ekspres',
                    paket: 'PAKET-UT-002 - PAKET IPA Dasar',
                    tanggalKirim: '2025-01-26',
                    totalHarga: 140000,
                    status: 'Dikemas',
                    history: [
                        {
                            status: 'DO Dibuat',
                            tanggal: '2025-01-26',
                            waktu: '09:00:00',
                            keterangan: 'Delivery Order berhasil dibuat'
                        },
                        {
                            status: 'Dikemas',
                            tanggal: '2025-01-26',
                            waktu: '10:30:00',
                            keterangan: 'Paket sedang dikemas di warehouse'
                        }
                    ]
                }
            ];
            
            this.trackingList = sampleData;
        }
    },
    
    // PENJELASAN VIDEO: Watchers untuk memantau perubahan
    watch: {
        // PENJELASAN VIDEO: Watcher 1 - Monitor perubahan paket yang dipilih
        'doForm.paketId'(newValue) {
            if (newValue) {
                const paket = this.paketList.find(p => p.id === parseInt(newValue));
                console.log('Paket dipilih:', paket?.namaPaket);
            }
        },
        
        // PENJELASAN VIDEO: Watcher 2 - Monitor perubahan search query
        searchDO(newValue) {
            console.log('Searching:', newValue);
            console.log('Results:', this.filteredTrackingList.length);
        },
        
        // PENJELASAN VIDEO: Watcher 3 - Monitor filter status
        filterStatus(newValue) {
            console.log('Filter status:', newValue || 'All');
        }
    },
    
    // PENJELASAN VIDEO: Lifecycle hook - load data saat mounted
    mounted() {
        console.log('Tracking App mounted!');
        console.log('Total paket tersedia:', this.paketList.length);
        
        // Load sample data untuk demo
        this.loadSampleData();
        
        console.log('Sample tracking data loaded:', this.trackingList.length, 'items');
    }
}).mount('#app');