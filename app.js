function checkUserLogin() {
    if (localStorage.getItem('userEmail')) {
        showHomePage();
    } else {
        showLoginPage();
    }
}

function showLoginPage() {
    document.getElementById('loginPage').style.display = 'flex';
    document.getElementById('homePage').style.display = 'none';
}

function showHomePage() {
    var email = localStorage.getItem('userEmail');
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('homePage').style.display = 'flex';
    document.getElementById('userEmailDisplay').innerText = "Logged in as: " + email;
    displayNotes();
}

function login() {
    var email = document.getElementById('email').value;
    if (email) {
        localStorage.setItem('userEmail', email);
        showHomePage();
    } else {
        alert('Please enter your email.');
    }
}

function logout() {
    localStorage.removeItem('userEmail');
    showLoginPage();
}

function submitNote() {
    var note = document.getElementById('noteInput').value;
    if (note) {
        var email = localStorage.getItem('userEmail');
        var notes = JSON.parse(localStorage.getItem(email)) || [];
        notes.push(note);
        localStorage.setItem(email, JSON.stringify(notes));
        document.getElementById('noteInput').value = '';
        displayNotes();
    } else {
        alert('Please enter a note.');
    }
}

function displayNotes() {
    var email = localStorage.getItem('userEmail');
    var notes = JSON.parse(localStorage.getItem(email)) || [];
    var notesList = document.getElementById('notesList');
    notesList.innerHTML = notes.map(function(note) {
        return '<p>' + note + '</p>';
    }).join('');
}
