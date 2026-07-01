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
