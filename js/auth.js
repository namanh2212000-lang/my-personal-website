// Authentication functions
function login() {
    localStorage.setItem('admin_logged_in', 'true');
    localStorage.setItem('login_time', Date.now().toString());
}

function logout() {
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('login_time');
    window.location.href = 'login.html';
}

function isLoggedIn() {
    const loggedIn = localStorage.getItem('admin_logged_in');
    const loginTime = localStorage.getItem('login_time');
    
    if (!loggedIn || !loginTime) return false;
    
    // Session expires after 24 hours
    const now = Date.now();
    const sessionDuration = 24 * 60 * 60 * 1000; // 24 hours
    
    if (now - parseInt(loginTime) > sessionDuration) {
        logout();
        return false;
    }
    
    return true;
}

function checkAuth() {
    if (!isLoggedIn()) {
        window.location.href = 'login.html';
    }
}
