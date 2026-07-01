function login() {

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (username == "" || password == "") {
        alert("Please fill all fields");
        return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    window.location.href = "dashboard.html";
}

if (window.location.pathname.includes("dashboard.html")) {

    let user = localStorage.getItem("username");
    document.getElementById("welcome").innerHTML = "Welcome, " + user + " 👋";

    showBooks();
}

function addBook() {

    let id = document.getElementById("bookid").value;
    let name = document.getElementById("book").value;
    let author = document.getElementById("author").value;
    let category = document.getElementById("category").value;

    if (id == "" || name == "" || author == "" || category == "") {
        alert("Fill all fields");
        return;
    }

    let books = JSON.parse(localStorage.getItem("books")) || [];

    books.push({
        id: id,
        name: name,
        author: author,
        category: category
    });

    localStorage.setItem("books", JSON.stringify(books));

    document.getElementById("bookid").value = "";
    document.getElementById("book").value = "";
    document.getElementById("author").value = "";
    document.getElementById("category").value = "";

    showBooks();
}

function showBooks() {

    let books = JSON.parse(localStorage.getItem("books")) || [];

    let search = "";

    let searchBox = document.getElementById("search");

    if (searchBox) {
        search = searchBox.value.toLowerCase();
    }

    let output = "";

    let total = 0;

    for (let i = 0; i < books.length; i++) {

        if (
            books[i].name.toLowerCase().includes(search) ||
            books[i].author.toLowerCase().includes(search) ||
            books[i].category.toLowerCase().includes(search) ||
            books[i].id.toLowerCase().includes(search)
        ) {

            output += `
            <li>
            <b>${books[i].id}</b><br>
            📖 ${books[i].name}<br>
            ✍️ ${books[i].author}<br>
            📂 ${books[i].category}<br><br>
            <button onclick="deleteBook(${i})">Delete</button>
            <hr>
            </li>
            `;

            total++;
        }
    }

    document.getElementById("bookList").innerHTML = output;
    document.getElementById("count").innerHTML = total;
}

function deleteBook(index) {

    let books = JSON.parse(localStorage.getItem("books")) || [];

    books.splice(index, 1);

    localStorage.setItem("books", JSON.stringify(books));

    showBooks();
}

function logout() {

    window.location.href = "index.html";

}
