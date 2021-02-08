function deleteUser(userId) {
    console.log('Zaczynamy')
    const Http = new XMLHttpRequest()
    const url='http://localhost:5000/users/'+userId;
    Http.open("DELETE", url);
    Http.send();
    Http.onreadystatechange = (e) => {
        console.log(Http.responseText)
    }
}