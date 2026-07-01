// ---------- LOGIN ----------
function login() {

    let username = document.getElementById("username").value.trim();
    let password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        alert("Please enter Username and Password");
        return;
    }

    localStorage.setItem("username", username);

    window.location.href = "dashboard.html";
}

// ---------- DASHBOARD ----------
if (window.location.pathname.includes("dashboard.html")) {

    let user = localStorage.getItem("username") || "Student";

    document.getElementById("welcome").innerHTML = "Welcome, " + user + " 👋";

    displayBooks();
}

// ---------- ADD BOOK ----------
function addBook() {

    let id = document.getElementById("bookId").value.trim();
    let name = document.getElementById("bookName").value.trim();
    let author = document.getElementById("author").value.trim();
    let category = document.getElementById("category").value.trim();

    if (!id || !name || !author || !category) {
        alert("Please fill all fields.");
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

    document.getElementById("bookId").value = "";
    document.getElementById("bookName").value = "";
    document.getElementById("author").value = "";
    document.getElementById("category").value = "";

    displayBooks();
}

// ---------- DISPLAY ----------
function displayBooks() {

    let books = JSON.parse(localStorage.getItem("books")) || [];

    let table = document.getElementById("bookTable");

    table.innerHTML = "";

    for (let i = 0; i < books.length; i++) {

        table.innerHTML += `
        <tr>
            <td>${books[i].id}</td>
            <td>${books[i].name}</td>
            <td>${books[i].author}</td>
            <td>${books[i].category}</td>
            <td>
                <button onclick="deleteBook(${i})">Delete</button>
            </td>
        </tr>`;
    }

    document.getElementById("totalBooks").innerHTML = books.length;
}

// ---------- DELETE ----------
function deleteBook(index) {

    let books = JSON.parse(localStorage.getItem("books")) || [];

    books.splice(index, 1);

    localStorage.setItem("books", JSON.stringify(books));

    displayBooks();
}

// ---------- SEARCH ----------
function searchBooks() {

    let text = document.getElementById("search").value.toLowerCase();

    let books = JSON.parse(localStorage.getItem("books")) || [];

    let table = document.getElementById("bookTable");

    table.innerHTML = "";

    let count = 0;

    books.forEach((book, index) => {

        if (
            book.id.toLowerCase().includes(text) ||
            book.name.toLowerCase().includes(text) ||
            book.author.toLowerCase().includes(text) ||
            book.category.toLowerCase().includes(text)
        ) {

            count++;

            table.innerHTML += `
            <tr>
                <td>${book.id}</td>
                <td>${book.name}</td>
                <td>${book.author}</td>
                <td>${book.category}</td>
                <td>
                    <button onclick="deleteBook(${index})">Delete</button>
                </td>
            </tr>`;
        }
    });

    document.getElementById("totalBooks").innerHTML = count;
}

// ---------- LOGOUT ----------
function logout() {

    window.location.href = "index.html";
}
