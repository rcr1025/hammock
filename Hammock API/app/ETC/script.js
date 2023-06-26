let locationFetchURL = 'http://localhost:8080';

fetch(locationFetchURL)
    .then(res => {
        if (res.ok) {
            console.log('SUCCESS')
        } else {
            console.log("Not Successful")
        }
    })
    /*
    .then( res => res.json())
    .then(data => console.log(data))
*/
