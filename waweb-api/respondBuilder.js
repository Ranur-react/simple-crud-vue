const respondBuilderText = (body, state = {}) => {
  const responses = {
    "/registrasi": {
      text: "Selamat datang! Silakan pilih layanan:\n1. Daftar Layanan Gratis\n2. Daftar Layanan Premium",
      nextState: "registrasiMenu"
    },
    "registrasiMenu_1": {
      text: "Anda memilih Layanan Gratis. Pilih menu berikut:\n1. Daftarkan karyawan\n2. Blokir Karyawan\n3. Laporan Kehadiran Karyawan\n4. Atur Lokasi Absen",
      nextState: "gratisMenu"
    },
    "registrasiMenu_2": {
      text: "Anda memilih Layanan Premium. Pilih menu berikut:\n1. Daftarkan karyawan\n2. Blokir Karyawan\n3. Laporan Kehadiran Karyawan\n4. Atur Lokasi Absen",
      nextState: "premiumMenu"
    },
    "gratisMenu_1": {
      text: "Anda memilih untuk mendaftarkan karyawan. Proses pendaftaran dimulai...",
      nextState: "registerEmployee"
    },
    "gratisMenu_2": {
      text: "Anda memilih untuk memblokir karyawan. Proses pemblokiran dimulai...",
      nextState: "blockEmployee"
    },
    "gratisMenu_3": {
      text: "Anda memilih laporan kehadiran karyawan. Mengambil laporan...",
      nextState: "attendanceReport"
    },
    "gratisMenu_4": {
      text: "Anda memilih untuk mengatur lokasi absen. Mengatur lokasi...",
      nextState: "setLocation"
    },
    "premiumMenu_1": {
      text: "Anda memilih untuk mendaftarkan karyawan. Proses pendaftaran dimulai...",
      nextState: "registerEmployee"
    },
    "premiumMenu_2": {
      text: "Anda memilih untuk memblokir karyawan. Proses pemblokiran dimulai...",
      nextState: "blockEmployee"
    },
    "premiumMenu_3": {
      text: "Anda memilih laporan kehadiran karyawan. Mengambil laporan...",
      nextState: "attendanceReport"
    },
    "premiumMenu_4": {
      text: "Anda memilih untuk mengatur lokasi absen. Mengatur lokasi...",
      nextState: "setLocation"
    },
    default: {
      text: "Perintah tidak dikenali. Silakan coba lagi.",
      nextState: state.currentState
    }
  };

  const key = `${state.currentState || ""}_${body}`.trim() || body;
  console.log('=================[body]===================');
  console.log(body);
  console.log('====================================');
  console.log('=================[Key]===================');
  console.log(key);
  console.log('====================================');
  return responses[key] || responses.default;
};

export default respondBuilderText;
