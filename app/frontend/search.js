window.onload = (event) => {

    token = localStorage.getItem("token")
    console.log(token)

    const divForBookInfo = document.getElementById("all-found-books")
    searchByTitleLabel = document.getElementById("search-by-title-label")
    searchByTitle = document.getElementById("search-by-title")

    searchForm = document.getElementById("search-form")
    option = document.getElementById("select-items")
     searchByAuthorLabel = document.getElementById("search-by-author-label")
    searchByAuthor = document.getElementById("search-by-author")

    selectGenres = document.getElementById("select-genres")

    searchByAuthor.style.display = "none"
    searchByAuthorLabel.style.display = "none"
    selectGenres.style.display = "none"

    option.addEventListener("change", function (event) {
        value = option.value
        if (option.value === "title") {
            searchByAuthor.style.display = "none"
            searchByAuthorLabel.style.display = "none"
            selectGenres.style.display = "none"
            searchByTitle.style.display = "block"
            searchByTitleLabel.style.display = "block"
        }

        if (option.value === "author") {
            searchByAuthor.style.display = "block"
            searchByAuthorLabel.style.display = "block"
            searchByTitle.style.display = "none"
            searchByTitleLabel.style.display = "none"
            selectGenres.style.display = "none"
        }

        if (option.value === "categories") {
            searchByAuthor.style.display = "none"
            searchByAuthorLabel.style.display = "none"
            searchByTitle.style.display = "none"
            searchByTitleLabel.style.display = "none"
            selectGenres.style.display = "block"
        }
    })


    allFoundBooks = document.getElementById("all-found-books")


    searchForm.addEventListener("submit", function (event) {

       event.preventDefault()
       divForBookInfo.innerHTML = ""
       const formData = new FormData(searchForm);
       const data = {};

       for (const[key, value] of formData.entries()) {
            data[key] = value
       }

        searchResults(data)
        .then(function (result) {
                if (option.value === "title")
                    {displayBooks(result)}
                else if (option.value === "author")
                    {
                    console.log("here")
                    console.log(result)
                    displayAuthors(result)
                    console.log("and here")
                    }})

    })

    function searchResults(data) {
        const url =  "http://127.0.0.1:5000/search"
        return new Promise((resolve, reject) => {
                fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body:JSON.stringify(data)
            })
            .then(data => data.json())
            .then(data => resolve(data))
            .catch((error) => {
                console.log(error);
                reject(error);
            })
       })
    }


    function displayBooks(book) {
        const divForBookInfo = document.getElementById("all-found-books")
        console.log(book)
        console.log(typeof(book))

        const title = document.createElement("h2")
        title.textContent = book.title

        const description = document.createElement("h3")
        description.textContent = book.description

        const subject_places = document.createElement("h3")
        subject_places.textContent = book.subject_places

        const subjects = document.createElement("h3")
        subjects.textContent = book.subjects

        const subject_times = document.createElement("h3")
        subject_times.textContent = book.subject_times

        divForBookInfo.appendChild(title)
        divForBookInfo.appendChild(description)
        divForBookInfo.appendChild(subject_places)
        divForBookInfo.appendChild(subjects)
        divForBookInfo.appendChild(subject_times)

    }


    function displayAuthors(book) {
        console.log("in func")
        const divForBookInfo = document.getElementById("all-found-books")

        book.forEach(function (event) {

            const bookDiv = document.createElement("div")
            const title = document.createElement("h2")
            title.textContent = event.title

            const description = document.createElement("h3")
            description.textContent = event.description


            const subject_places = document.createElement("h3")
            subject_places.textContent = event.subject_places

            const subjects = document.createElement("h3")
            subjects.textContent = event.subjects

            const subject_times = document.createElement("h3")
            subject_times.textContent = event.subject_times

            bookDiv.appendChild(title)
            bookDiv.appendChild(description)
            bookDiv.appendChild(subject_places)
            bookDiv.appendChild(subjects)
            bookDiv.appendChild(subject_times)
            divForBookInfo.appendChild(bookDiv)
        })
    }
}
