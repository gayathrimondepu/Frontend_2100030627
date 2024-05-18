document.addEventListener('DOMContentLoaded', () => {
  
    const tableBody = document.querySelector('#data-table tbody');
    const filterInput = document.getElementById('filter');
    const prevPageButton = document.getElementById('prev-page');
    const nextPageButton = document.getElementById('next-page');
    const pageInfo = document.getElementById('page-info');

    let data = [];
    let currentPage = 1;
    const rowsPerPage = 10;


    function fetchData() {
        return [
            { name: 'ABC', age: 30, location: 'New York', email: 'abc@gmail.com' },
            { name: 'DEF', age: 25, location: 'Los Angeles', email: 'def@gmail.com' },
            { name: 'HIJ', age: 35, location: 'Chicago', email: 'hij@gmail.com' },
            { name: 'KLM', age: 30, location: 'New York', email: 'klm@gmail.com' },
            { name: 'NOP', age: 25, location: 'Los Angeles', email: 'nop@gmail.com' },
            { name: 'QRS', age: 35, location: 'Chicago', email: 'qrs@gmail.com' },
            { name: 'TUV', age: 30, location: 'New York', email: 'tuv@gmail.com' },
            { name: 'WXY', age: 25, location: 'Los Angeles', email: 'wxy@gmail.com' },
            { name: 'AZA', age: 35, location: 'Chicago', email: 'aza@gmail.com' },
            { name: 'CED', age: 30, location: 'New York', email: 'ced@gmail.com' },
            { name: 'LMN', age: 25, location: 'Los Angeles', email: 'lmn@gmail.com' },
            { name: 'OPQ', age: 35, location: 'Chicago', email: 'opq@gmail.com' },
            
        ];
    }

    function loadTableData(data) {
        tableBody.innerHTML = '';
        data.forEach(row => {
            const tr = document.createElement('tr');
            Object.values(row).forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            tableBody.appendChild(tr);
        });
    }

    function filterData(query) {
        return data.filter(row => 
            Object.values(row).some(
                cell => cell.toString().toLowerCase().includes(query.toLowerCase())
            )
        );
    }

    function paginateData(data, page, rowsPerPage) {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        return data.slice(start, end);
    }

    function updateTable() {
        const filteredData = filterData(filterInput.value);
        const paginatedData = paginateData(filteredData, currentPage, rowsPerPage);
        loadTableData(paginatedData);
        pageInfo.textContent = `Page ${currentPage} of ${Math.ceil(filteredData.length / rowsPerPage)}`;
    }

    filterInput.addEventListener('input', () => {
        currentPage = 1;
        updateTable();
    });

    prevPageButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updateTable();
        }
    });

    nextPageButton.addEventListener('click', () => {
        const filteredData = filterData(filterInput.value);
        if (currentPage * rowsPerPage < filteredData.length) {
            currentPage++;
            updateTable();
        }
    });

  
    data = fetchData();
    updateTable();
});
