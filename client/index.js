document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
        .then(response =>response.json())
        .then(data=>console.log(data));
})