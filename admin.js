document.addEventListener('DOMContentLoaded', () => {
    // Cek apakah sudah login
    try {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            window.location.href = 'index.html';
            return;
        }
    } catch (error) {
        console.error('Error cek index:', error);
        window.location.href = 'index.html';
        return;
    }

    // Data bahan bakar
    const fuels = [
        { id: 'pertalite', name: 'Pertalite', tableId: 'pertalite-table' },
        { id: 'pertamax', name: 'Pertamax', tableId: 'pertamax-table' },
        { id: 'solar', name: 'Solar', tableId: 'solar-table' },
        { id: 'dexlite', name: 'Dexlite', tableId: 'dexlite-table' }
    ];

    // Muat data dari localStorage
    function loadData() {
        let salesData = {};
        let adminData = {};

        try {
            salesData = JSON.parse(localStorage.getItem('salesData')) || {};
            adminData = JSON.parse(localStorage.getItem('adminData')) || {};
        } catch (error) {
            console.error('Error parsing localStorage:', error);
            salesData = {};
            adminData = {};
        }

        fuels.forEach(fuel => {
            const table = document.getElementById(fuel.tableId);
            if (!table) {
                console.error(`Error: Tabel ${fuel.tableId} tidak ditemukan`);
                return;
            }
            const tbody = table.querySelector('tbody');
            if (!tbody) {
                console.error(`Error: tbody untuk ${fuel.tableId} tidak ditemukan`);
                return;
            }
            tbody.innerHTML = '';

            let totalDO = 0;
            let totalPenjualan = 0;
            let totalLosses = 0;

            for (let day = 1; day <= 31; day++) {
                const dayData = salesData[day] || {};
                const adminDayData = adminData[day] || {};
                const penjualan = Number(dayData[fuel.id]) || 0;
                const stokAwal = Number(adminDayData[`${fuel.id}_stokAwal`]) || 0;
                const doValue = Number(adminDayData[`${fuel.id}_do`]) || 0;
                const stokReal = Number(adminDayData[`${fuel.id}_stokReal`]) || 0;

                const stokAkhir = stokAwal + doValue - penjualan;
                const losses = stokReal - stokAkhir;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${day}</td>
                    <td><input type="number" value="${stokAwal.toFixed(2)}" data-field="stokAwal" data-fuel="${fuel.id}" data-day="${day}" step="any"></td>
                    <td><input type="number" value="${doValue.toFixed(2)}" data-field="do" data-fuel="${fuel.id}" data-day="${day}" step="any"></td>
                    <td>${penjualan.toFixed(2)}</td>
                    <td>${stokAkhir.toFixed(2)}</td>
                    <td><input type="number" value="${stokReal.toFixed(2)}" data-field="stokReal" data-fuel="${fuel.id}" data-day="${day}" step="any"></td>
                    <td>${losses.toFixed(2)}</td>
                `;
                tbody.appendChild(row);

                totalDO += doValue;
                totalPenjualan += penjualan;
                totalLosses += losses;
            }

            const totalRow = document.createElement('tr');
            totalRow.className = 'total-row';
            totalRow.innerHTML = `
                <td><strong>Total Hari 1-31</strong></td>
                <td></td>
                <td class="total-cell">${totalDO.toFixed(2)}</td>
                <td class="total-cell">${totalPenjualan.toFixed(2)}</td>
                <td></td>
                <td></td>
                <td class="total-cell">${totalLosses.toFixed(2)}</td>
            `;
            tbody.appendChild(totalRow);
        });

        // Tambahkan event listener untuk input
        try {
            document.querySelectorAll('input[data-field]').forEach(input => {
                input.addEventListener('input', updateCalculations);
            });
        } catch (error) {
            console.error('Error menambah event listener input:', error);
        }
    }

    // Fungsi untuk menghitung ulang stok akhir dan losses
    function updateCalculations(event) {
        try {
            const input = event.target;
            const fuel = input.dataset.fuel;
            const day = input.dataset.day;
            const field = input.dataset.field;

            let adminData = JSON.parse(localStorage.getItem('adminData')) || {};
            if (!adminData[day]) adminData[day] = {};

            adminData[day][`${fuel}_${field}`] = input.value;
            localStorage.setItem('adminData', JSON.stringify(adminData));

            const salesData = JSON.parse(localStorage.getItem('salesData')) || {};
            const dayData = salesData[day] || {};
            const penjualan = Number(dayData[fuel]) || 0;

            const stokAwal = Number(adminData[day][`${fuel}_stokAwal`]) || 0;
            const doValue = Number(adminData[day][`${fuel}_do`]) || 0;
            const stokReal = Number(adminData[day][`${fuel}_stokReal`]) || 0;

            const stokAkhir = stokAwal + doValue - penjualan;
            const losses = stokReal - stokAkhir;

            const row = input.closest('tr');
            row.querySelector('td:nth-child(5)').textContent = stokAkhir.toFixed(2);
            row.querySelector('td:nth-child(7)').textContent = losses.toFixed(2);

            // Update total
            const table = input.closest('table');
            let totalDO = 0;
            let totalPenjualan = 0;
            let totalLosses = 0;

            for (let d = 1; d <= 31; d++) {
                const dData = salesData[d] || {};
                const aData = adminData[d] || {};
                totalDO += Number(aData[`${fuel}_do`]) || 0;
                totalPenjualan += Number(dData[fuel]) || 0;
                const dStokAwal = Number(aData[`${fuel}_stokAwal`]) || 0;
                const dDoValue = Number(aData[`${fuel}_do`]) || 0;
                const dPenjualan = Number(dData[fuel]) || 0;
                const dStokReal = Number(aData[`${fuel}_stokReal`]) || 0;
                const dStokAkhir = dStokAwal + dDoValue - dPenjualan;
                totalLosses += dStokReal - dStokAkhir;
            }

            const totalRow = table.querySelector('.total-row');
            if (totalRow) {
                totalRow.querySelector('.total-cell:nth-of-type(1)').textContent = totalDO.toFixed(2);
                totalRow.querySelector('.total-cell:nth-of-type(2)').textContent = totalPenjualan.toFixed(2);
                totalRow.querySelector('.total-cell:nth-of-type(3)').textContent = totalLosses.toFixed(2);
            }
        } catch (error) {
            console.error('Error saat updateCalculations:', error);
        }
    }

    // Fungsi untuk mengunduh PDF
    function downloadPDF() {
        try {
            const { jsPDF } = window.jspdf;
            if (!jsPDF) {
                console.error('jsPDF tidak tersedia');
                return;
            }
            const doc = new jsPDF();

            fuels.forEach((fuel, index) => {
                if (index > 0) doc.addPage();
                doc.text(`${fuel.name} - Data Bulanan`, 10, 10);

                const table = document.getElementById(fuel.tableId);
                if (!table) {
                    console.error(`Tabel ${fuel.tableId} tidak ditemukan untuk PDF`);
                    return;
                }

                const rows = [];
                const headers = ['Hari', 'Stok Awal', 'DO', 'Penjualan', 'Stok Akhir', 'Stok Real', 'Losses'];

                table.querySelectorAll('tr').forEach(row => {
                    const cells = Array.from(row.querySelectorAll('td')).map(cell => {
                        const input = cell.querySelector('input');
                        return input ? input.value : cell.textContent;
                    });
                    if (cells.length === 7) {
                        rows.push(cells);
                    }
                });

                doc.autoTable({
                    head: [headers],
                    body: rows,
                    startY: 20,
                    theme: 'grid',
                    headStyles: { fillColor: [0, 102, 204] },
                    columnStyles: {
                        2: { cellWidth: 30 },
                        3: { cellWidth: 30 },
                        6: { cellWidth: 30 }
                    }
                });

                const totalRow = table.querySelector('.total-row');
                if (totalRow) {
                    const totalCells = Array.from(totalRow.querySelectorAll('.total-cell')).map(cell => cell.textContent);
                    doc.autoTable({
                        body: [['Total Hari 1-31', '', totalCells[0], totalCells[1], '', '', totalCells[2]]],
                        startY: doc.lastAutoTable.finalY,
                        theme: 'grid',
                        columnStyles: {
                            2: { fillColor: [255, 0, 0] },
                            3: { fillColor: [255, 0, 0] },
                            6: { fillColor: [255, 0, 0] }
                        }
                    });
                }
            });

            doc.save('Laporan_Bulanan.pdf');
        } catch (error) {
            console.error('Error saat download PDF:', error);
        }
    }

    // Fungsi untuk mengunduh Excel
    function downloadExcel() {
        try {
            if (!XLSX) {
                console.error('XLSX tidak tersedia');
                return;
            }
            const workbook = XLSX.utils.book_new();

            fuels.forEach(fuel => {
                const table = document.getElementById(fuel.tableId);
                if (!table) {
                    console.error(`Tabel ${fuel.tableId} tidak ditemukan untuk Excel`);
                    return;
                }

                const wsData = [];
                const headers = ['Hari', 'Stok Awal', 'DO', 'Penjualan', 'Stok Akhir', 'Stok Real', 'Losses'];
                wsData.push(headers);

                table.querySelectorAll('tr').forEach(row => {
                    const cells = Array.from(row.querySelectorAll('td')).map(cell => {
                        const input = cell.querySelector('input');
                        return input ? input.value : cell.textContent;
                    });
                    if (cells.length === 7) {
                        wsData.push(cells);
                    }
                });

                const totalRow = table.querySelector('.total-row');
                if (totalRow) {
                    const totalCells = Array.from(totalRow.querySelectorAll('.total-cell')).map(cell => cell.textContent);
                    wsData.push(['Total Hari 1-31', '', totalCells[0], totalCells[1], '', '', totalCells[2]]);
                }

                const ws = XLSX.utils.aoa_to_sheet(wsData);
                XLSX.utils.book_append_sheet(workbook, ws, fuel.name);
            });

            XLSX.write(workbook, 'Laporan_Bulanan.xlsx');
        } catch (error) {
            console.error('Error saat download Excel:', error);
        }
    }

    // Inisialisasi
    try {
        loadData();
    } catch (error) {
        console.error('Error saat loadData:', error);
    }

    // Event listener untuk tombol
    try {
        const downloadPdfBtn = document.getElementById('download-pdf');
        const downloadExcelBtn = document.getElementById('download-excel');
        const logoutBtn = document.getElementById('logout');

        if (downloadPdfBtn) {
            downloadPdfBtn.addEventListener('click', downloadPDF);
        } else {
            console.error('Error: Tombol download-pdf tidak ditemukan');
        }

        if (downloadExcelBtn) {
            downloadExcelBtn.addEventListener('click', downloadExcel);
        } else {
            console.error('Error: Tombol download-excel tidak ditemukan');
        }

        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                try {
                    localStorage.removeItem('isLoggedIn');
                    window.location.href = 'login.html';
                } catch (error) {
                    console.error('Error saat logout:', error);
                }
            });
        } else {
            console.error('Error: Tombol logout tidak ditemukan');
        }
    } catch (error) {
        console.error('Error menambah event listener tombol:', error);
    }
});