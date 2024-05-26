document.addEventListener("DOMContentLoaded", function() {
    const allData = [];
    let currentFilter = 'all';

    fetch('inventars.json')
        .then(response => response.json())
        .then(data => {
            allData.push(...data);
            renderTable(allData);
        });

    fetch('vielas.json')
        .then(response => response.json())
        .then(data => {
            allData.push(...data);
            renderTable(allData);
        });

    document.getElementById('show-all').addEventListener('click', () => {
        currentFilter = 'all';
        renderTable(allData);
    });

    document.getElementById('show-substances').addEventListener('click', () => {
        currentFilter = 'substances';
        renderTable(allData.filter(item => item.tips === 'reaģents'));
    });

    document.getElementById('show-equipment').addEventListener('click', () => {
        currentFilter = 'equipment';
        renderTable(allData.filter(item => item.tips !== 'reaģents'));
    });

    document.getElementById('search').addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        let filteredData = allData;
        
        if (currentFilter === 'substances') {
            filteredData = filteredData.filter(item => item.tips === 'reaģents');
        } else if (currentFilter === 'equipment') {
            filteredData = filteredData.filter(item => item.tips !== 'reaģents');
        }

        filteredData = filteredData.filter(item => 
            item.nosaukums.toLowerCase().includes(searchTerm) || 
            item.komentari.toLowerCase().includes(searchTerm)
        );

        renderTable(filteredData);
    });

    function renderTable(data) {
        const tbody = document.querySelector("tbody");
        tbody.innerHTML = "";

        data.forEach(item => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.nosaukums}</td>
                <td>${item.tips}</td>
                <td>${item.apakstips}</td>
                <td>${item.skaits}</td>
                <td>${item.svars || ''}</td>
                <td>${item.komentari}</td>
            `;
            tbody.appendChild(row);
        });
    }
});
