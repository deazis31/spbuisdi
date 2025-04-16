document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('login-button');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');

    if (loginButton) {
        loginButton.addEventListener('click', () => {
            try {
                const username = usernameInput.value.trim();
                const password = passwordInput.value.trim();

                if (username === 'admin' && password === 'admin123') {
                    localStorage.setItem('isLoggedIn', 'true');
                    window.location.replace('admin.html');
                } else {
                    errorMessage.textContent = 'Username atau password salah!';
                }
            } catch (error) {
                console.error('Error saat login:', error);
                errorMessage.textContent = 'Terjadi kesalahan, coba lagi.';
            }
        });
    } else {
        console.error('Tombol login tidak ditemukan');
    }
});