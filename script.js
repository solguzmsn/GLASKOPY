let users = [];
let loggedInUser = null;

// Mostrar formulario de registro
function showRegister() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.remove('hidden');
}

// Mostrar formulario de login
function showLogin() {
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('loginForm').classList.remove('hidden');
    document.getElementById('loginError').classList.add('hidden'); // Ocultar error al cambiar de formulario
}

// Función para registrar un nuevo usuario
function register() {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    if (username && password) {
        // Verificar si el usuario ya existe
        const userExists = users.some(u => u.username === username);
        if (userExists) {
            alert('Este usuario ya existe');
            return;
        }

        // Registrar al usuario
        const user = { username, password, prints: [] };
        users.push(user);
        alert('Usuario registrado correctamente');
        showLogin(); // Mostrar formulario de login después del registro
    } else {
        document.getElementById('registerError').classList.remove('hidden');
    }
}

// Función para iniciar sesión
function login() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Verificar si el usuario existe y la contraseña es correcta
    loggedInUser = users.find(u => u.username === username && u.password === password);

    if (loggedInUser) {
        document.getElementById('welcomeUsername').innerText = username;
        showPrintPanel();
        loadUserPrints();
        document.getElementById('loginError').classList.add('hidden'); // Ocultar error de login
    } else {
        document.getElementById('loginError').classList.remove('hidden');
    }
}

// Mostrar el panel de impresiones
function showPrintPanel() {
    document.getElementById('loginForm').classList.add('hidden');
    document.getElementById('registerForm').classList.add('hidden');
    document.getElementById('printPanel').classList.remove('hidden');
}

// Guardar las impresiones en localStorage para el usuario actual
function saveUserPrints() {
    if (loggedInUser) {
        localStorage.setItem(`prints_${loggedInUser.username}`, JSON.stringify(loggedInUser.prints));
    }
}

// Cargar las impresiones desde localStorage para el usuario actual
function loadUserPrints() {
    if (loggedInUser) {
        const savedPrints = JSON.parse(localStorage.getItem(`prints_${loggedInUser.username}`)) || [];
        loggedInUser.prints = savedPrints;
        updatePrintTable();
    }
}

// Agregar un registro de impresión
function addPrintRecord() {
    const name = document.getElementById('printName').value;
    const career = document.getElementById('printCareer').value;
    const count = document.getElementById('printCount').value;
    const color = document.getElementById('printColor').value;

    if (name && career && count && color) {
        const date = new Date().toLocaleString();
        loggedInUser.prints.push({ name, career, date, count, color });

        // Guardar en localStorage
        saveUserPrints();

        // Limpiar campos
        document.getElementById('printName').value = '';
        document.getElementById('printCareer').value = '';
        document.getElementById('printCount').value = '';
        document.getElementById('printColor').value = 'Color';

        // Actualizar la tabla
        updatePrintTable();
    } else {
        alert('Por favor, completa todos los campos de la impresión');
    }
}

// Actualizar la tabla de impresiones
function updatePrintTable() {
    const tbody = document.getElementById('printsTable').getElementsByTagName('tbody')[0];
    tbody.innerHTML = ''; // Limpiar tabla

    loggedInUser.prints.forEach(print => {
        const row = tbody.insertRow();
        row.insertCell(0).textContent = print.name;
        row.insertCell(1).textContent = print.career;
        row.insertCell(2).textContent = print.date;
        row.insertCell(3).textContent = print.count;
        row.insertCell(4).textContent = print.color;
    });
}

// Función para cerrar sesión
function logout() {
    loggedInUser = null;
    document.getElementById('printPanel').classList.add('hidden');
    showLogin(); // Mostrar formulario de login
}

// Asignar eventos a botones
window.onload = function() {
    const registerBtn = document.getElementById('registerBtn');
    const loginBtn = document.getElementById('loginBtn');
    const addPrintBtn = document.getElementById('addPrintBtn');

    if (registerBtn) registerBtn.addEventListener('click', register);
    if (loginBtn) loginBtn.addEventListener('click', login);
    if (addPrintBtn) addPrintBtn.addEventListener('click', addPrintRecord);

    // Cargar el historial de impresiones si el usuario está logueado
    if (loggedInUser) loadUserPrints();
};

// Cargar historial de impresiones para el usuario actual
function loadPrintHistory() {
    const username = "nombreUsuario"; // Reemplaza con el nombre del usuario en sesión o guarda uno estático temporalmente
    const printsKey = `prints_${username}`;
    
    // Recuperar impresiones del usuario desde localStorage
    const savedPrints = JSON.parse(localStorage.getItem(printsKey)) || [];
    
    // Obtener la tabla donde se mostrará el historial
    const tbody = document.getElementById('printsTableHistory').getElementsByTagName('tbody')[0];
    
    // Limpiar la tabla antes de agregar registros
    tbody.innerHTML = '';
    
    // Verificar si hay registros y agregarlos a la tabla
    if (savedPrints.length > 0) {
        savedPrints.forEach(print => {
            const row = tbody.insertRow();
            row.insertCell(0).textContent = print.name;
            row.insertCell(1).textContent = print.career;
            row.insertCell(2).textContent = print.date;
            row.insertCell(3).textContent = print.count;
            row.insertCell(4).textContent = print.color;
        });
    } else {
        // Si no hay registros, mostrar un mensaje en la tabla
        const row = tbody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 5;
        cell.textContent = "No hay registros de impresión para este usuario.";
    }
}

// Ejecutar la carga del historial de impresiones al cargar la página
window.addEventListener('load', loadPrintHistory);
// Cargar historial de impresiones para el usuario actual
function loadPrintHistory() {
    const username = "nombreUsuario"; // Reemplaza con el nombre del usuario en sesión o guarda uno estático temporalmente
    const printsKey = `prints_${username}`;
    
    // Recuperar impresiones del usuario desde localStorage
    const savedPrints = JSON.parse(localStorage.getItem(printsKey)) || [];
    
    // Obtener la tabla donde se mostrará el historial
    const tbody = document.getElementById('printsTableHistory').getElementsByTagName('tbody')[0];
    
    // Limpiar la tabla antes de agregar registros
    tbody.innerHTML = '';
    
    // Verificar si hay registros y agregarlos a la tabla
    if (savedPrints.length > 0) {
        savedPrints.forEach(print => {
            const row = tbody.insertRow();
            row.insertCell(0).textContent = print.name;
            row.insertCell(1).textContent = print.career;
            row.insertCell(2).textContent = print.date;
            row.insertCell(3).textContent = print.count;
            row.insertCell(4).textContent = print.color;
        });
    } else {
        // Si no hay registros, mostrar un mensaje en la tabla
        const row = tbody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 5;
        cell.textContent = "No hay registros de impresión para este usuario.";
    }
}

// Ejecutar la carga del historial de impresiones al cargar la página
window.addEventListener('load', loadPrintHistory);
