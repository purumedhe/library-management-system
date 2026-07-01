function login(){

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if(username=="" || password==""){
        alert("Please fill all fields");
        return;
    }

    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    window.location.href="dashboard.html";
}
if(window.location.pathname.includes("dashboard.html")){

    let user = localStorage.getItem("username");
    document.getElementById("welcome").innerHTML = "Welcome, " + user;

    showBooks();
}

function addBook(){

    let book = document.getElementById("book").value;

    if(book==""){
        alert("Enter Book Name");
        return;
    }

    let books = JSON.parse(localStorage.getItem("books")) || [];

    books.push(book);

    localStorage.setItem("books", JSON.stringify(books));

    document.getElementById("book").value="";

    showBooks();
}

function showBooks(){

    let books = JSON.parse(localStorage.getItem("books")) || [];

    let list="";

    for(let i=0;i<books.length;i++){

        list += "<li>"+books[i]+" <button onclick='deleteBook("+i+")'>Delete</button></li>";

    }

    document.getElementById("bookList").innerHTML=list;
}

function deleteBook(index){

    let books = JSON.parse(localStorage.getItem("books")) || [];

    books.splice(index,1);

    localStorage.setItem("books",JSON.stringify(books));

    showBooks();
}

function logout(){

    window.location.href="index.html";

}
