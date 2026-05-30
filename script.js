const baseDeDatosProductos = {
    1: { titulo: "Apagador Inteligente", precio: "150Q", descripcion: "Dale un toque moderno y elegante a tus ambientes con nuestro apagador de alta gama compatible con Alexa y Google Home." },
    2: { titulo: "Bombillo Inteligente", precio: "100Q", descripcion: "Ilumina tus espacios con la máxima potencia y el menor consumo. Millones de colores configurables desde la App." },
    3: { titulo: "Cables para tu hogar", precio: "50Q", descripcion: "Asegura la máxima velocidad y estabilidad para tu internet con nuestro cable UTP de categoría 6 blindado." },
    4: { titulo: "Router", precio: "450Q", descripcion: "Expande la señal de tu internet por toda la casa u oficina sin perder velocidad gracias a sus 4 antenas de alta ganancia." },
    5: { titulo: "Camaras", precio: "275Q", descripcion: "Vigila tu hogar en tiempo real desde tu teléfono. Incluye visión nocturna, audio bidireccional y sensor de movimiento." },
    6: { titulo: "Cinta LED", precio: "300Q", descripcion: "Personaliza los colores de tus habitaciones detrás de pantallas o escritorios. Sincronización rítmica con la música." }
};


const detailsModal = document.getElementById('details-modal');
const closeDetails = document.getElementById('close-details');


document.querySelectorAll('.btn-detalles').forEach(boton => {
    boton.addEventListener('click', (e) => {
        const idProducto = e.target.closest('.propiedad-card').getAttribute('data-id');
        const producto = baseDeDatosProductos[idProducto];

        if(producto) {
            document.getElementById('detalles-titulo').innerText = producto.titulo;
            document.getElementById('detalles-precio').innerText = producto.precio;
            document.getElementById('detalles-descripcion').innerText = producto.descripcion;
            
            detailsModal.style.display = 'flex';
        }
    });
});

closeDetails.addEventListener('click', () => { detailsModal.style.display = 'none'; });

const loginModal = document.getElementById('login-modal');
const authNavBtn = document.getElementById('auth-nav-btn');
const closeLogin = document.getElementById('close-login');
const authForm = document.getElementById('auth-form');
const modalTitle = document.getElementById('modal-title');
const authSubmitBtn = document.getElementById('auth-submit-btn');
const toggleAuthText = document.getElementById('toggle-auth-text');

let modoRegistro = false; // Controla si el modal está en modo Login o Registro

if (!localStorage.getItem('usuarios_db')) {
    const usuariosIniciales = [{ email: "admin@nexus.com", password: "123" }];
    localStorage.setItem('usuarios_db', JSON.stringify(usuariosIniciales));
}

authNavBtn.addEventListener('click', () => {
    if (sessionStorage.getItem('usuario_activo')) {
        sessionStorage.removeItem('usuario_activo');
        alert("Sesión cerrada correctamente.");
        authNavBtn.innerText = "Iniciar Sesión";
    } else {
        loginModal.style.display = 'flex';
    }
});

closeLogin.addEventListener('click', () => { loginModal.style.display = 'none'; });

document.getElementById('go-to-register')?.addEventListener('click', (e) => {
    e.preventDefault();
    modoRegistro = !modoRegistro;
    if (modoRegistro) {
        modalTitle.innerText = "Registrarse";
        authSubmitBtn.innerText = "Crear Cuenta";
        toggleAuthText.innerHTML = '¿Ya tienes cuenta? <a href="#" id="go-to-register">Inicia sesión aquí</a>';
    } else {
        modalTitle.innerText = "Iniciar Sesión";
        authSubmitBtn.innerText = "Ingresar";
        toggleAuthText.innerHTML = '¿No tienes cuenta? <a href="#" id="go-to-register">Regístrate aquí</a>';
    }
    recargarToggle();
});

function recargarToggle() {
    document.getElementById('go-to-register').addEventListener('click', (e) => {
        e.preventDefault();
        authNavBtn.click();
    });
}

authForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;
    let usuarios = JSON.parse(localStorage.getItem('usuarios_db'));

    if (modoRegistro) {
        const existe = usuarios.find(u => u.email === email);
        if (existe) {
            alert("Este correo ya está registrado.");
            return;
        }

        usuarios.push({ email: email, password: password });
        localStorage.setItem('usuarios_db', JSON.stringify(usuarios));
        alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
        modoRegistro = false;
        loginModal.style.display = 'none';
    } else {
        const usuarioValido = usuarios.find(u => u.email === email && u.password === password);
        if (usuarioValido) {
            alert("¡Bienvenido a Nexus!");
            sessionStorage.setItem('usuario_activo', email); // Guarda la sesión activa del usuario actual
            authNavBtn.innerText = "Cerrar Sesión";
            loginModal.style.display = 'none';
            authForm.reset();
        } else {
            alert("Correo o contraseña incorrectos.");
        }
    }
});

window.addEventListener('load', () => {
    if (sessionStorage.getItem('usuario_activo')) {
        authNavBtn.innerText = "Cerrar Sesión";
    }
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) loginModal.style.display = 'none';
    if (e.target === detailsModal) detailsModal.style.display = 'none';
});