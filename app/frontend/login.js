window.onload = (event) => {
    token = localStorage.getItem("token")

    const form = document.getElementById("login-form");
    const url = "http://127.0.0.1:5000/login";

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        sendRequestToServer(form, url)

        .then(response => checkIfUserExists(response))
        .catch(error => console.error(error))
    })

    function sendRequestToServer (form, url) {

       const formData = new FormData(form);
       const data = {};

       for (const[key, value] of formData.entries()) {
            data[key] = value
       }

       return new Promise((resolve, reject) => {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => resolve(data))
            .catch((error) => {
                console.log(error);
                reject(error);
            })
       })

    }

    function checkIfUserExists (response) {

        if (response["isLogged"] === true)
           {localStorage.setItem("token", response["token"])
            location.replace("/main.html")}
        else if (response["isLogged"] === false)
            {location.replace("/signup.html")}
    }
}