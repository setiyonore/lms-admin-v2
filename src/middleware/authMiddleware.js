
function isAuthenticated(to, from, next) {
  const isLoggedIn = checkIfUserIsLoggedIn(); // Sementara set true, ganti dengan logika autentikasi Anda
  if (isLoggedIn) {
    next(); // lanjutkan ke rute
  } else {
    localStorage.setItem('intendedPath', to.fullPath);
    next('/login'); // arahkan ke halaman login
  }
}
function checkIfUserIsLoggedIn() {
  const token = localStorage.getItem('authToken');
  if (token) {
    const decode = decodeJwt(token)
    const exp = decode.exp
    const convertedTime = new Date(exp * 1000);
    const currentTime = new Date();

    if (currentTime.getTime() > convertedTime.getTime()) {
      //token expired
      return false;
    } else {
      //token valid
      return true;
    }
  } else {
    return false;
  }
}

function decodeJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
}
export default isAuthenticated;
