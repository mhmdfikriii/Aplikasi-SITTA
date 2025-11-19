// PENJELASAN VIDEO: Vue App untuk Laporan & Analitik dengan Chart.js
const { createApp } = Vue;

createApp({
    data() {
        return {
            bahanAjarList: window.dataBahanAjar || [],
            upbjjList: window.upbjjList || [],
            
            // Filter options
            selectedPeriod: 'month',
            selectedUTPJJ: '',
            selectedCategory: '',
            
            // Chart instances
            charts: {
                statusStok: null,
                trendPengiriman: null,
                stokKategori: null,
                topUT: null,
                popularBahanAjar: null
            }
        };
    },
    
    computed: {
        // PENJELASAN VIDEO: Computed untuk statistik summary
        totalStok() {
            return this.bahanAjarList.reduce((sum, item) => sum + item.qty, 0);
        },
        
        totalPengiriman() {
            return 1247; // Simulasi data
        },
        
        nilaiInventori() {
            const total = this.bahanAjarList.reduce((sum, item) => sum + (item.qty * item.harga), 0);
            return (total / 1000000).toFixed(1);
        },
        
        totalUTPJJ() {
            return this.upbjjList.length;
        },
        
        stockAman() {
            return this.bahanAjarList.filter(item => item.qty >= item.safety && item.qty > 0).length;
        },
        
        stockMenipis() {
            return this.bahanAjarList.filter(item => item.qty < item.safety && item.qty > 0).length;
        },
        
        stockKosong() {
            return this.bahanAjarList.filter(item => item.qty === 0).length;
        },
        
        avgStokPerItem() {
            return Math.round(this.totalStok / this.bahanAjarList.length);
        },
        
        tingkatKetersediaan() {
            const available = this.bahanAjarList.filter(item => item.qty > 0).length;
            return Math.round((available / this.bahanAjarList.length) * 100);
        },
        
        doPending() {
            return 45; // Simulasi
        },
        
        doTerkirimHariIni() {
            return 23; // Simulasi
        },
        
        successRate() {
            return 94.5; // Simulasi
        },
        
        // PENJELASAN VIDEO: Items yang perlu perhatian (stok menipis/kosong)
        criticalStockItems() {
            return this.bahanAjarList
                .filter(item => item.qty < item.safety)
                .sort((a, b) => (a.qty - a.safety) - (b.qty - b.safety))
                .slice(0, 10);
        }
    },
    
    methods: {
        // PENJELASAN VIDEO: Initialize semua charts
        initCharts() {
            this.initStatusStokChart();
            this.initTrendPengirimanChart();
            this.initStokKategoriChart();
            this.initTopUTChart();
            this.initPopularBahanAjarChart();
        },
        
        // PENJELASAN VIDEO: Chart 1 - Status Stok (Pie Chart)
        initStatusStokChart() {
            const ctx = document.getElementById('statusStokChart');
            
            this.charts.statusStok = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['Stok Aman', 'Stok Menipis', 'Stok Kosong'],
                    datasets: [{
                        data: [this.stockAman, this.stockMenipis, this.stockKosong],
                        backgroundColor: [
                            'rgba(40, 167, 69, 0.8)',
                            'rgba(255, 193, 7, 0.8)',
                            'rgba(220, 53, 69, 0.8)'
                        ],
                        borderColor: [
                            'rgba(40, 167, 69, 1)',
                            'rgba(255, 193, 7, 1)',
                            'rgba(220, 53, 69, 1)'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.parsed || 0;
                                    const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                    const percentage = ((value / total) * 100).toFixed(1);
                                    return `${label}: ${value} (${percentage}%)`;
                                }
                            }
                        }
                    }
                }
            });
        },
        
        // PENJELASAN VIDEO: Chart 2 - Trend Pengiriman (Line Chart)
        initTrendPengirimanChart() {
            const ctx = document.getElementById('trendPengirimanChart');
            
            // Simulasi data 6 bulan terakhir
            const months = ['Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
            const pengirimanData = [850, 920, 1050, 980, 1150, 1247];
            
            this.charts.trendPengiriman = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: months,
                    datasets: [{
                        label: 'Jumlah Pengiriman',
                        data: pengirimanData,
                        borderColor: 'rgba(13, 110, 253, 1)',
                        backgroundColor: 'rgba(13, 110, 253, 0.1)',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return value + ' DO';
                                }
                            }
                        }
                    }
                }
            });
        },
        
        // PENJELASAN VIDEO: Chart 3 - Stok per Kategori (Bar Chart)
        initStokKategoriChart() {
            const ctx = document.getElementById('stokKategoriChart');
            
            // Hitung stok per kategori
            const kategoris = ['MK Wajib', 'MK Pilihan', 'Praktikum', 'Problem-Based'];
            const stokPerKategori = kategoris.map(kat => {
                return this.bahanAjarList
                    .filter(item => item.kategori === kat)
                    .reduce((sum, item) => sum + item.qty, 0);
            });
            
            this.charts.stokKategori = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: kategoris,
                    datasets: [{
                        label: 'Jumlah Stok',
                        data: stokPerKategori,
                        backgroundColor: [
                            'rgba(13, 110, 253, 0.8)',
                            'rgba(25, 135, 84, 0.8)',
                            'rgba(220, 53, 69, 0.8)',
                            'rgba(255, 193, 7, 0.8)'
                        ],
                        borderColor: [
                            'rgba(13, 110, 253, 1)',
                            'rgba(25, 135, 84, 1)',
                            'rgba(220, 53, 69, 1)',
                            'rgba(255, 193, 7, 1)'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return value + ' unit';
                                }
                            }
                        }
                    }
                }
            });
        },
        
        // PENJELASAN VIDEO: Chart 4 - Top UT Daerah (Horizontal Bar)
        initTopUTChart() {
            const ctx = document.getElementById('topUTChart');
            
            // Simulasi data top 10 UT
            const topUT = [
                { name: 'UT Jakarta', value: 245 },
                { name: 'UT Surabaya', value: 198 },
                { name: 'UT Bandung', value: 167 },
                { name: 'UT Semarang', value: 145 },
                { name: 'UT Yogyakarta', value: 132 },
                { name: 'UT Medan', value: 121 },
                { name: 'UT Makassar', value: 108 },
                { name: 'UT Palembang', value: 95 },
                { name: 'UT Denpasar', value: 87 },
                { name: 'UT Pontianak', value: 76 }
            ];
            
            this.charts.topUT = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: topUT.map(ut => ut.name),
                    datasets: [{
                        label: 'Jumlah Pengiriman',
                        data: topUT.map(ut => ut.value),
                        backgroundColor: 'rgba(13, 202, 240, 0.8)',
                        borderColor: 'rgba(13, 202, 240, 1)',
                        borderWidth: 2
                    }]
                },
                options: {
                    indexAxis: 'y',
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        x: {
                            beginAtZero: true,
                            ticks: {
                                callback: function(value) {
                                    return value + ' DO';
                                }
                            }
                        }
                    }
                }
            });
        },
        
        // PENJELASAN VIDEO: Chart 5 - Popular Bahan Ajar (Bar Chart)
        initPopularBahanAjarChart() {
            const ctx = document.getElementById('popularBahanAjarChart');
            
            // Ambil 10 bahan ajar dengan stok terbanyak (simulasi popularitas)
            const popular = [...this.bahanAjarList]
                .sort((a, b) => b.qty - a.qty)
                .slice(0, 10);
            
            this.charts.popularBahanAjar = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: popular.map(item => item.kode),
                    datasets: [{
                        label: 'Jumlah Permintaan (Simulasi)',
                        data: popular.map(item => Math.floor(item.qty * 1.5)), // Simulasi permintaan
                        backgroundColor: 'rgba(255, 193, 7, 0.8)',
                        borderColor: 'rgba(255, 193, 7, 1)',
                        borderWidth: 2
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                title: function(context) {
                                    const index = context[0].dataIndex;
                                    return popular[index].judul;
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        },
        
        // PENJELASAN VIDEO: Update charts saat filter berubah
        updateCharts() {
            // Destroy existing charts
            Object.values(this.charts).forEach(chart => {
                if (chart) chart.destroy();
            });
            
            // Reinitialize with new data
            this.initCharts();
            
            console.log('Charts updated with filters:', {
                period: this.selectedPeriod,
                utpjj: this.selectedUTPJJ,
                category: this.selectedCategory
            });
        },
        
        // PENJELASAN VIDEO: Export report to PDF (simulasi)
        exportReport() {
            alert('Fitur export PDF akan mengunduh laporan lengkap dalam format PDF.\n\n' +
                  'Data yang diexport:\n' +
                  '- Summary statistik\n' +
                  '- Semua charts\n' +
                  '- Tabel detail stok\n' +
                  '- Periode: ' + this.selectedPeriod);
        }
    },
    
    // PENJELASAN VIDEO: Initialize charts saat mounted
    mounted() {
        console.log('Laporan App mounted!');
        
        // Delay untuk memastikan DOM ready
        setTimeout(() => {
            this.initCharts();
        }, 100);
    }
}).mount('#app');