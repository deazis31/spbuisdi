document.addEventListener('DOMContentLoaded', () => {
    // Template konfigurasi tabel untuk satu shift
    const tableTemplate = [
        { type: 'pertalite', idPrefix: 'left-top', name: 'Pertalite', headerClass: 'pertalite-header' },
        { type: 'pertamax', idPrefix: 'right-top', name: 'Pertamax', headerClass: 'pertamax-header' },
        { type: 'solar', idPrefix: 'left-bottom', name: 'Solar', headerClass: 'solar-header' },
        { type: 'dexlite', idPrefix: 'right-bottom', name: 'Dexlite', headerClass: 'dexlite-header' }
    ];

    // Fungsi untuk menghasilkan HTML untuk satu shift
    function generateShiftHTML(day, shift, baseTabIndex) {
        let html = `
            <div class="set-container set-shift${shift}">
                <h3>Shift ${shift}</h3>
                <div class="table-container">
        `;
        
        tableTemplate.forEach((table, index) => {
            const tableId = `data-table-${table.idPrefix}-shift${shift}-day${day}`;
            const totalId = `total-${table.idPrefix}-shift${shift}-day${day}`;
            const awalId = `awal-${table.idPrefix}-shift${shift}-day${day}`; // Ganti pengurang jadi awal
            const hasilId = `hasil-${table.idPrefix}-shift${shift}-day${day}`;
            const hargaId = `harga-${table.idPrefix}-shift${shift}-day${day}`; // Ganti faktor jadi harga
            const akhirId = `hasil-akhir-${table.idPrefix}-shift${shift}-day${day}`;

            html += `
                <div class="table-wrapper">
                    <h4 class="${table.headerClass}">${table.name}</h4>
                    <table id="${tableId}">
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th>Nilai</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Nozzel 1</td><td contenteditable="true" class="nilai" tabindex="${baseTabIndex + index * 7 + 1}" data-nozzle="1" data-type="${table.type}" data-shift="${shift}" data-day="${day}">0</td></tr>
                            <tr><td>Nozzel 2</td><td contenteditable="true" class="nilai" tabindex="${baseTabIndex + index * 7 + 2}" data-nozzle="2" data-type="${table.type}" data-shift="${shift}" data-day="${day}">0</td></tr>
                            <tr><td>Nozzel 3</td><td contenteditable="true" class="nilai" tabindex="${baseTabIndex + index * 7 + 3}" data-nozzle="3" data-type="${table.type}" data-shift="${shift}" data-day="${day}">0</td></tr>
                            <tr><td>Nozzel 4</td><td contenteditable="true" class="nilai" tabindex="${baseTabIndex + index * 7 + 4}" data-nozzle="4" data-type="${table.type}" data-shift="${shift}" data-day="${day}">0</td></tr>
                            <tr><td>Nozzel 5</td><td contenteditable="true" class="nilai" tabindex="${baseTabIndex + index * 7 + 5}" data-nozzle="5" data-type="${table.type}" data-shift="${shift}" data-day="${day}">0</td></tr>
                            <tr><td>Nozzel 6</td><td contenteditable="true" class="nilai" tabindex="${baseTabIndex + index * 7 + 6}" data-nozzle="6" data-type="${table.type}" data-shift="${shift}" data-day="${day}">0</td></tr>
                            <tr><td>Nozzel 7</td><td contenteditable="true" class="nilai" tabindex="${baseTabIndex + index * 7 + 7}" data-nozzle="7" data-type="${table.type}" data-shift="${shift}" data-day="${day}">0</td></tr>
                        </tbody>
                    </table>
                    <h2>Total ${table.name}: <span id="${totalId}">0</span></h2>
                    <div class="input-awal">
                        <label for="${awalId}">Awal: </label>
                        <input type="number" id="${awalId}" value="0" step="any" data-type="${table.type}" data-shift="${shift}" data-day="${day}">
                    </div>
                    <h2>Hasil Pengurangan: <span id="${hasilId}">0</span></h2>
                    <div class="input-harga">
                        <label for="${hargaId}">Harga: </label>
                        <input type="number" id="${hargaId}" value="1" step="any" data-type="${table.type}" data-shift="${shift}" data-day="${day}">
                    </div>
                    <h2>Hasil Akhir: <span id="${akhirId}">0</span></h2>
                </div>
            `;
        });

        html += `
                </div>
                <div class="summary-container">
                    <h2>Ringkasan Hasil Akhir</h2>
                    <table id="summary-table-shift${shift}-day${day}">
                        <thead>
                            <tr>
                                <th>Jenis Bahan Bakar</th>
                                <th>Total Hasil Akhir</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td>Pertalite</td><td id="summary-perlalite-shift${shift}-day${day}">0</td></tr>
                            <tr><td>Pertamax</td><td id="summary-pertamax-shift${shift}-day${day}">0</td></tr>
                            <tr><td>Solar</td><td id="summary-solar-shift${shift}-day${day}">0</td></tr>
                            <tr><td>Dexlite</td><td id="summary-dexlite-shift${shift}-day${day}">0</td></tr>
                            <tr><td>Total Semua Bahan Bakar</td><td id="total-all-shift${shift}-day${day}">0</td></tr>
                            <tr><td>DO</td><td><input type="number" id="do-value-shift${shift}-day${day}" value="0" step="any" data-field="do" data-shift="${shift}" data-day="${day}"></td></tr>
                            <tr><td>Pengeluaran</td><td><input type="number" id="pengeluaran-value-shift${shift}-day${day}" value="0" step="any" data-field="pengeluaran" data-shift="${shift}" data-day="${day}"></td></tr>
                            <tr><td>Titipan</td><td><input type="number" id="titipan-value-shift${shift}-day${day}" value="0" step="any" data-field="titipan" data-shift="${shift}" data-day="${day}"></td></tr>
                            <tr><td>Tambahan 1</td><td><input type="number" id="tambahan1-value-shift${shift}-day${day}" value="0" step="any" data-field="tambahan1" data-shift="${shift}" data-day="${day}"></td></tr>
                            <tr><td>Tambahan 2</td><td><input type="number" id="tambahan2-value-shift${shift}-day${day}" value="0" step="any" data-field="tambahan2" data-shift="${shift}" data-day="${day}"></td></tr>
                            <tr><td>Hasil Sisa</td><td id="final-result-shift${shift}-day${day}">0</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        return html;
    }

    // Kosongkan days-container
    const daysContainer = document.querySelector('.days-container');
    if (!daysContainer) {
        console.error('Error: .days-container tidak ditemukan di HTML.');
        return;
    }
    daysContainer.innerHTML = '';

    // Generate HTML untuk 31 hari
    for (let day = 1; day <= 31; day++) {
        const dayHtml = `
            <div class="day-container" data-day="${day}">
                <h2>Hari ${day}</h2>
                <div class="main-container">
                    ${generateShiftHTML(day, 1, (day - 1) * 56)}
                    ${generateShiftHTML(day, 2, (day - 1) * 56 + 28)}
                </div>
            </div>
        `;
        daysContainer.insertAdjacentHTML('beforeend', dayHtml);
    }

    // Konfigurasi tabel untuk semua hari
    const allTables = [];
    for (let day = 1; day <= 31; day++) {
        allTables.push({
            day,
            shift1: [
                { id: `data-table-left-top-shift1-day${day}`, total: `total-left-top-shift1-day${day}`, awal: `awal-left-top-shift1-day${day}`, hasil: `hasil-left-top-shift1-day${day}`, harga: `harga-left-top-shift1-day${day}`, akhir: `hasil-akhir-left-top-shift1-day${day}`, summaryId: `summary-perlalite-shift1-day${day}`, name: 'Pertalite', type: 'pertalite' },
                { id: `data-table-right-top-shift1-day${day}`, total: `total-right-top-shift1-day${day}`, awal: `awal-right-top-shift1-day${day}`, hasil: `hasil-right-top-shift1-day${day}`, harga: `harga-right-top-shift1-day${day}`, akhir: `hasil-akhir-right-top-shift1-day${day}`, summaryId: `summary-pertamax-shift1-day${day}`, name: 'Pertamax', type: 'pertamax' },
                { id: `data-table-left-bottom-shift1-day${day}`, total: `total-left-bottom-shift1-day${day}`, awal: `awal-left-bottom-shift1-day${day}`, hasil: `hasil-left-bottom-shift1-day${day}`, harga: `harga-left-bottom-shift1-day${day}`, akhir: `hasil-akhir-left-bottom-shift1-day${day}`, summaryId: `summary-solar-shift1-day${day}`, name: 'Solar', type: 'solar' },
                { id: `data-table-right-bottom-shift1-day${day}`, total: `total-right-bottom-shift1-day${day}`, awal: `awal-right-bottom-shift1-day${day}`, hasil: `hasil-right-bottom-shift1-day${day}`, harga: `harga-right-bottom-shift1-day${day}`, akhir: `hasil-akhir-right-bottom-shift1-day${day}`, summaryId: `summary-dexlite-shift1-day${day}`, name: 'Dexlite', type: 'dexlite' }
            ],
            shift2: [
                { id: `data-table-left-top-shift2-day${day}`, total: `total-left-top-shift2-day${day}`, awal: `awal-left-top-shift2-day${day}`, hasil: `hasil-left-top-shift2-day${day}`, harga: `harga-left-top-shift2-day${day}`, akhir: `hasil-akhir-left-top-shift2-day${day}`, summaryId: `summary-perlalite-shift2-day${day}`, name: 'Pertalite', type: 'pertalite' },
                { id: `data-table-right-top-shift2-day${day}`, total: `total-right-top-shift2-day${day}`, awal: `awal-right-top-shift2-day${day}`, hasil: `hasil-right-top-shift2-day${day}`, harga: `harga-right-top-shift2-day${day}`, akhir: `hasil-akhir-right-top-shift2-day${day}`, summaryId: `summary-pertamax-shift2-day${day}`, name: 'Pertamax', type: 'pertamax' },
                { id: `data-table-left-bottom-shift2-day${day}`, total: `total-left-bottom-shift2-day${day}`, awal: `awal-left-bottom-shift2-day${day}`, hasil: `hasil-left-bottom-shift2-day${day}`, harga: `harga-left-bottom-shift2-day${day}`, akhir: `hasil-akhir-left-bottom-shift2-day${day}`, summaryId: `summary-solar-shift2-day${day}`, name: 'Solar', type: 'solar' },
                { id: `data-table-right-bottom-shift2-day${day}`, total: `total-right-bottom-shift2-day${day}`, awal: `awal-right-bottom-shift2-day${day}`, hasil: `hasil-right-bottom-shift2-day${day}`, harga: `harga-right-bottom-shift2-day${day}`, akhir: `hasil-akhir-right-bottom-shift2-day${day}`, summaryId: `summary-dexlite-shift2-day${day}`, name: 'Dexlite', type: 'dexlite' }
            ]
        });
    }

    // Mapping untuk menghubungkan total Shift 1 ke awal Shift 2
    const shift1ToShift2Mapping = [
        { totalShift1Prefix: 'total-left-top-shift1-day', awalShift2Prefix: 'awal-left-top-shift2-day' },
        { totalShift1Prefix: 'total-right-top-shift1-day', awalShift2Prefix: 'awal-right-top-shift2-day' },
        { totalShift1Prefix: 'total-left-bottom-shift1-day', awalShift2Prefix: 'awal-left-bottom-shift2-day' },
        { totalShift1Prefix: 'total-right-bottom-shift1-day', awalShift2Prefix: 'awal-right-bottom-shift2-day' }
    ];

    // Fungsi untuk menyimpan data ke localStorage
    function saveInputData() {
        const inputData = JSON.parse(localStorage.getItem('inputData')) || {};
        document.querySelectorAll('.nilai').forEach(cell => {
            const { type, shift, day, nozzle } = cell.dataset;
            if (!inputData[day]) inputData[day] = {};
            if (!inputData[day][shift]) inputData[day][shift] = {};
            if (!inputData[day][shift][type]) inputData[day][shift][type] = {};
            inputData[day][shift][type][`nozzle${nozzle}`] = cell.textContent.trim();
        });

        document.querySelectorAll('input[type="number"]').forEach(input => {
            const { type, shift, day, field } = input.dataset;
            if (type) {
                // Awal dan Harga
                if (!inputData[day]) inputData[day] = {};
                if (!inputData[day][shift]) inputData[day][shift] = {};
                if (!inputData[day][shift][type]) inputData[day][shift][type] = {};
                const key = input.id.startsWith('awal-') ? 'awal' : input.id.startsWith('harga-') ? 'harga' : input.id.split('-')[0];
                inputData[day][shift][type][key] = input.value;
            } else if (field) {
                // DO, Pengeluaran, Titipan, Tambahan
                if (!inputData[day]) inputData[day] = {};
                if (!inputData[day][shift]) inputData[day][shift] = {};
                inputData[day][shift][field] = input.value;
            }
        });

        localStorage.setItem('inputData', JSON.stringify(inputData));
    }

    // Fungsi untuk memuat data dari localStorage
    function loadInputData() {
        const inputData = JSON.parse(localStorage.getItem('inputData')) || {};
        document.querySelectorAll('.nilai').forEach(cell => {
            const { type, shift, day, nozzle } = cell.dataset;
            if (inputData[day] && inputData[day][shift] && inputData[day][shift][type] && inputData[day][shift][type][`nozzle${nozzle}`]) {
                cell.textContent = inputData[day][shift][type][`nozzle${nozzle}`];
            }
        });

        document.querySelectorAll('input[type="number"]').forEach(input => {
            const { type, shift, day, field } = input.dataset;
            if (type) {
                const key = input.id.startsWith('awal-') ? 'awal' : input.id.startsWith('harga-') ? 'harga' : input.id.split('-')[0];
                if (inputData[day] && inputData[day][shift] && inputData[day][shift][type] && inputData[day][shift][type][key]) {
                    input.value = inputData[day][shift][type][key];
                }
            } else if (field) {
                if (inputData[day] && inputData[day][shift] && inputData[day][shift][field]) {
                    input.value = inputData[day][shift][field];
                }
            }
        });
    }

    // Fungsi untuk menyimpan Hasil Pengurangan ke localStorage
    function saveSalesData(day, tables, shift) {
        const salesData = JSON.parse(localStorage.getItem('salesData')) || {};
        if (!salesData[day]) {
            salesData[day] = { pertalite: 0, pertamax: 0, solar: 0, dexlite: 0 };
        }

        tables.forEach(tableData => {
            const hasilPengurangElement = document.getElementById(tableData.hasil);
            if (hasilPengurangElement) {
                const value = parseFloat(hasilPengurangElement.textContent) || 0;
                const type = tableData.type;
                if (shift === 1) {
                    salesData[day][`${type}_shift1`] = value;
                } else {
                    const shift1Value = salesData[day][`${type}_shift1`] || 0;
                    salesData[day][type] = shift1Value + value;
                }
            }
        });

        localStorage.setItem('salesData', JSON.stringify(salesData));
    }

    // Fungsi untuk menghitung satu set tabel
    function updateSetCalculations(tables, totalAllId, doValueId, pengeluaranValueId, titipanValueId, tambahan1ValueId, tambahan2ValueId, finalResultId, isShift1 = false, day = 1) {
        let grandTotal = 0;

        tables.forEach((tableData) => {
            const table = document.getElementById(tableData.id);
            const totalElement = document.getElementById(tableData.total);
            const awalInput = document.getElementById(tableData.awal); // Ganti pengurang jadi awal
            const hasilPengurangElement = document.getElementById(tableData.hasil);
            const hargaInput = document.getElementById(tableData.harga); // Ganti faktor jadi harga
            const hasilAkhirElement = document.getElementById(tableData.akhir);
            const summaryElement = document.getElementById(tableData.summaryId);

            if (!table || !totalElement || !awalInput || !hasilPengurangElement || !hargaInput || !hasilAkhirElement || !summaryElement) {
                console.error(`Error: Elemen tidak ditemukan untuk tableData`, tableData);
                return;
            }

            let total = 0;
            const cells = table.querySelectorAll('.nilai');

            cells.forEach(cell => {
                let value = cell.textContent.trim();
                value = value.replace(/\s/g, '').replace(/,/g, '.');
                value = parseFloat(value) || 0;
                total += value;
            });

            totalElement.textContent = total.toFixed(2);

            let awal = parseFloat(awalInput.value.replace(/,/g, '.')) || 0;
            const hasilPengurangan = total - awal;
            hasilPengurangElement.textContent = hasilPengurangan.toFixed(2);

            const harga = parseFloat(hargaInput.value.replace(/,/g, '.')) || 1;
            const hasilAkhir = hasilPengurangan * harga;
            hasilAkhirElement.textContent = hasilAkhir.toFixed(2);
            summaryElement.textContent = hasilAkhir.toFixed(2);

            grandTotal += hasilAkhir;
        });

        const totalAllElement = document.getElementById(totalAllId);
        if (totalAllElement) {
            totalAllElement.textContent = grandTotal.toFixed(2);
        }

        const doValue = parseFloat(document.getElementById(doValueId)?.value.replace(/,/g, '.')) || 0;
        const pengeluaranValue = parseFloat(document.getElementById(pengeluaranValueId)?.value.replace(/,/g, '.')) || 0;
        const titipanValue = parseFloat(document.getElementById(titipanValueId)?.value.replace(/,/g, '.')) || 0;
        const tambahan1Value = parseFloat(document.getElementById(tambahan1ValueId)?.value.replace(/,/g, '.')) || 0;
        const tambahan2Value = parseFloat(document.getElementById(tambahan2ValueId)?.value.replace(/,/g, '.')) || 0;

        const finalResultElement = document.getElementById(finalResultId);
        if (finalResultElement) {
            const finalResult = grandTotal - doValue - pengeluaranValue - titipanValue + tambahan1Value + tambahan2Value;
            finalResultElement.textContent = finalResult.toFixed(2);
        }

        // Simpan data Penjualan (Hasil Pengurangan)
        saveSalesData(day, tables, isShift1 ? 1 : 2);
        saveInputData();

        // Update otomatis Awal Shift 2 dari Total Shift 1
        if (isShift1) {
            shift1ToShift2Mapping.forEach(mapping => {
                const totalShift1Id = `${mapping.totalShift1Prefix}${day}`;
                const awalShift2Id = `${mapping.awalShift2Prefix}${day}`;
                const totalShift1Element = document.getElementById(totalShift1Id);
                const awalShift2Input = document.getElementById(awalShift2Id);

                if (totalShift1Element && awalShift2Input) {
                    const totalShift1 = parseFloat(totalShift1Element.textContent) || 0;
                    awalShift2Input.value = totalShift1.toFixed(2);
                } else {
                    console.error(`Error: Elemen tidak ditemukan - totalShift1Id: ${totalShift1Id}, awalShift2Id: ${awalShift2Id}`);
                }
            });

            // Hitung ulang Shift 2 setelah update Awal
            updateSetCalculations(
                allTables[day - 1].shift2,
                `total-all-shift2-day${day}`,
                `do-value-shift2-day${day}`,
                `pengeluaran-value-shift2-day${day}`,
                `titipan-value-shift2-day${day}`,
                `tambahan1-value-shift2-day${day}`,
                `tambahan2-value-shift2-day${day}`,
                `final-result-shift2-day${day}`,
                false,
                day
            );
        }
    }

    // Fungsi untuk menginisialisasi event listener
    function initializeSet(tables, suffix, doValueId, pengeluaranValueId, titipanValueId, tambahan1ValueId, tambahan2ValueId, day, isShift1 = false) {
        tables.forEach((tableData, index) => {
            const table = document.getElementById(tableData.id);
            if (!table) {
                console.error(`Error: Tabel tidak ditemukan untuk id: ${tableData.id}`);
                return;
            }

            table.querySelectorAll('.nilai').forEach((cell, cellIndex) => {
                cell.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        const baseTabIndex = (day - 1) * 56 + (suffix === 'shift1' ? 0 : 28);
                        const nextCellIndex = cellIndex + 1;
                        const nextCell = table.querySelector(`.nilai[tabindex="${baseTabIndex + index * 7 + nextCellIndex + 1}"]`);
                        if (nextCell) {
                            nextCell.focus();
                        } else if (index < tables.length - 1) {
                            const nextTable = tables[index + 1];
                            const nextTableElement = document.getElementById(nextTable.id);
                            if (nextTableElement) {
                                nextTableElement.querySelector('.nilai')?.focus();
                            }
                        } else {
                            document.getElementById(tables[0].id)?.querySelector('.nilai')?.focus();
                        }
                    }
                });

                cell.addEventListener('input', () => {
                    updateSetCalculations(tables, `total-all-${suffix}-day${day}`, `do-value-${suffix}-day${day}`, `pengeluaran-value-${suffix}-day${day}`, `titipan-value-${suffix}-day${day}`, `tambahan1-value-${suffix}-day${day}`, `tambahan2-value-${suffix}-day${day}`, `final-result-${suffix}-day${day}`, isShift1, day);
                });
            });

            const awalInput = document.getElementById(tableData.awal);
            const hargaInput = document.getElementById(tableData.harga);
            if (awalInput) {
                awalInput.addEventListener('input', () => updateSetCalculations(tables, `total-all-${suffix}-day${day}`, `do-value-${suffix}-day${day}`, `pengeluaran-value-${suffix}-day${day}`, `titipan-value-${suffix}-day${day}`, `tambahan1-value-${suffix}-day${day}`, `tambahan2-value-${suffix}-day${day}`, `final-result-${suffix}-day${day}`, isShift1, day));
            }
            if (hargaInput) {
                hargaInput.addEventListener('input', () => updateSetCalculations(tables, `total-all-${suffix}-day${day}`, `do-value-${suffix}-day${day}`, `pengeluaran-value-${suffix}-day${day}`, `titipan-value-${suffix}-day${day}`, `tambahan1-value-${suffix}-day${day}`, `tambahan2-value-${suffix}-day${day}`, `final-result-${suffix}-day${day}`, isShift1, day));
            }
        });

        [doValueId, pengeluaranValueId, titipanValueId, tambahan1ValueId, tambahan2ValueId].forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('input', () => updateSetCalculations(tables, `total-all-${suffix}-day${day}`, `do-value-${suffix}-day${day}`, `pengeluaran-value-${suffix}-day${day}`, `titipan-value-${suffix}-day${day}`, `tambahan1-value-${suffix}-day${day}`, `tambahan2-value-${suffix}-day${day}`, `final-result-${suffix}-day${day}`, isShift1, day));
            }
        });
    }

    // Muat data saat inisialisasi
    loadInputData();

    // Inisialisasi semua hari
    allTables.forEach(({ day, shift1, shift2 }) => {
        initializeSet(shift1, 'shift1', `do-value-shift1-day${day}`, `pengeluaran-value-shift1-day${day}`, `titipan-value-shift1-day${day}`, `tambahan1-value-shift1-day${day}`, `tambahan2-value-shift1-day${day}`, day, true);
        initializeSet(shift2, 'shift2', `do-value-shift2-day${day}`, `pengeluaran-value-shift2-day${day}`, `titipan-value-shift2-day${day}`, `tambahan1-value-shift2-day${day}`, `tambahan2-value-shift2-day${day}`, day, false);

        updateSetCalculations(shift1, `total-all-shift1-day${day}`, `do-value-shift1-day${day}`, `pengeluaran-value-shift1-day${day}`, `titipan-value-shift1-day${day}`, `tambahan1-value-shift1-day${day}`, `tambahan2-value-shift1-day${day}`, `final-result-shift1-day${day}`, true, day);
        updateSetCalculations(shift2, `total-all-shift2-day${day}`, `do-value-shift2-day${day}`, `pengeluaran-value-shift2-day${day}`, `titipan-value-shift2-day${day}`, `tambahan1-value-shift2-day${day}`, `tambahan2-value-shift2-day${day}`, `final-result-shift2-day${day}`, false, day);
    });
});