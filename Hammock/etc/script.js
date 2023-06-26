let locationFetchURL = 'http://localhost:8080/api/properties/?location=tiger';

fetch(locationFetchURL)
    .then( res => res.json())
    .then(data => console.log(data))
