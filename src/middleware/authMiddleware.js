
function isAuthenticated(to, from, next) {
  const isLoggedIn = true; // Sementara set true, ganti dengan logika autentikasi Anda
  console.log("cek login")
  if (isLoggedIn) {
    next(); // lanjutkan ke rute
  } else {
    next('/login'); // arahkan ke halaman login
  }
}

export default isAuthenticated;
