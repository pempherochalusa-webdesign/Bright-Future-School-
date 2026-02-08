function register() {
    let fullname = document.getElementById("fullname").value;
    let className = document.getElementById("class").value;
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    if (fullname === "" || className === "" || username === "" || password === "") {
        document.getElementById("msg").innerHTML = "Please fill all fields!";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // check if username already exists
    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
            document.getElementById("msg").innerHTML = "Username already exists!";
            return;
        }
    }

    let newUser = {
        fullname: fullname,
        className: className,
        username: username,
        password: password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    document.getElementById("msg").innerHTML = "Registration successful! You can now login.";
}

// LOGIN FUNCTION
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    // ADMIN LOGIN
    if (username === "admin" && password === "admin123") {
        localStorage.setItem("role", "admin");   // ✅ HERE
        window.location.href = "admin.html";
        return;
    }

    // TEACHER LOGIN
    if (username === "teacher" && password === "teacher123") {
        localStorage.setItem("role", "teacher"); // ✅ HERE
        window.location.href = "teacher.html";
        return;
    }

    // STUDENT LOGIN
    let users = JSON.parse(localStorage.getItem("users")) || [];

    for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && users[i].password === password) {
            localStorage.setItem("role", "student"); // ✅ HERE
            localStorage.setItem("currentUser", JSON.stringify(users[i]));
            window.location.href = "student.html";
            return;
        }
    }

    document.getElementById("msg").innerHTML = "Wrong username or password!";
}