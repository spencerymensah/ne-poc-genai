function fetchFromAPI() {
    fetch("http://localhost:8000/")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const tableBody = document.getElementById("tableBody");

            const tableRow = document.getElementsByClassName("rowData");
            if (tableRow.length > 0){
                element.remove(tableRow);
            }
            

            data.forEach((item) => {
                const row = document.createElement("tr");
                row.className = "rowData";

                const idCell = document.createElement("td");
                idCell.textContent = item.title;
                row.appendChild(idCell);

                const nameCell = document.createElement("td");
                nameCell.textContent = item.bibliography_citation;
                row.appendChild(nameCell);

                tableBody.appendChild(row);
            });
        })
        .catch(function (error) {
            console.log("Error fetching data:", error);
        });
}

fetchFromAPI();
setInterval(fetchFromAPI, 10000);
