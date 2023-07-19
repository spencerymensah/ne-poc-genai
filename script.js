function poll(fn, timeout, interval) {
    var endTime = Number(new Date()) + (timeout || 2000);
    interval = interval || 100;

    var checkCondition = function (resolve, reject) {
        var ajax = fn();

        ajax.then(function (response) {
            // If the condition is met, we're done!
            if (response) {
                resolve(response);
            }
            // If the condition isn't met but the timeout hasn't elapsed, go again
            else if (Number(new Date()) < endTime) {
                setTimeout(checkCondition, interval, resolve, reject);
            }
            // Didn't match and too much time, reject!
            else {
                reject(new Error("timed out for " + fn + ": " + arguments));
            }
        });
    };

    return new Promise(checkCondition);
}

// Usage: get something via ajax
poll(
    function () {
        return fetch("http://localhost:8000/");
    },
    2000,
    10
)
    .then((response) => response.json())
    .then((data) => {
        const tableBody = document.getElementById("tableBody");

        data.forEach((item) => {
            const row = document.createElement("tr");

            const idCell = document.createElement('td');
            idCell.textContent = item.title;
            row.appendChild(idCell);
  
            const nameCell = document.createElement('td');
            nameCell.textContent = item.bibliography_citation;
            row.appendChild(nameCell);

            tableBody.appendChild(row);
        });
    })
    .catch((error) => {
        console.error("Error:", error);
    });
