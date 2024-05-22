const respondBuilderText = (body) => {
  const responses = {
    "1": "*1. Dimana lokasi Absensi seharusnya?*\n\n\
      Lokasi mengambil absen yang dibenarkan sekolah adalah  :\n\
      \t -Di depan Kelas \n\
      \t -Di Gerbang Sekolah\n\
      \t -Dan Dilapangan upacara\n\
    ",
    "2": "*2. Sudah berapa kali pelanggaran kamu?*\n\n\
      pelanggaran kamu baru 3 kali nih  :\n\
      \t -Terlambat masuk pada pukul 08:20 Kamis 24 April 2024\n\
      \t -Terlalu cepat pulang pada pukul 12:20 Senin 27 April 2024\n\
      \t -Terlambat masuk pada pukul 07:20 Sabtu 1 mei 2024\n\
    ",
    "3": "*3. Jadwal mata pelajaran hari ini.*\n\n\
      jadwal hari ini adalah:\n\
      \t -Matematika 08:20\n\
      \t -Bahasa Indonesia\n\
      \t -Terlambat masuk pada pukul 07:20 Sabtu 1 mei 2024\n\
    ",
    "4": "*4. Hukuman apa saja yang kamu terima jika telat mengambil absen?*\n\n\
      Hukuman yang akan kamu terima jika telat adalah hukuman PANCUNG wkwkwk\n\
    "
  };

  return responses[body] || "Undefined respond!";
};

export default respondBuilderText;
