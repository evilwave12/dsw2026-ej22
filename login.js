document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');
    const usernameInput=document.getElementById('username');
    const passwordInput=document.getElementById('password');

    const togglePasswordBtn = document.getElementById('ocultaContraseñas');
    const eyeOpenIcon = togglePasswordBtn.querySelector('.open-eye');
    const eyeTachadoIcon = togglePasswordBtn.querySelector('.tachado-eye');


    togglePasswordBtn.addEventListener('click', function() {
        //const isPassword = passwordInput.type==='password';
        if(passwordInput.type==="password"){
            passwordInput.type="text";
            eyeOpenIcon.classList.add('hidden');
            eyeTachadoIcon.classList.remove('hidden');
        }else{
            passwordInput.type='password';
            eyeOpenIcon.classList.remove('hidden');
            eyeTachadoIcon.classList.add('hidden');
        }
    });


    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const username = usernameInput.value;
        const password = passwordInput.value;
        
        // Aquí puedes agregar la lógica para validar el usuario y la contraseña
        if(username === 'admin' && password === 'password') {
            // Redirigir a la página de productos o dashboard
            window.location.href = 'dashboard_panel.html';
        } else {
            alert('Usuario o contraseña incorrectos');
        }
    });
});