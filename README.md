# 🎓 TugasKu — Pengelola Tugas Kuliah Semester 3 D4 SIB Polinema

Aplikasi Web Task & Assignment Tracker modern yang dirancang khusus untuk mahasiswa D4 Sistem Informasi Bisnis (Polinema) dengan arsitektur **Dual-Engine**:
1. **Local Mode (Default):** Langsung aktif 100% menggunakan `LocalStorage` browser tanpa perlu registrasi atau konfigurasi backend apa pun.
2. **Supabase Cloud Mode:** Terhubung langsung ke database cloud **PostgreSQL Supabase** gratis dengan dukungan **Real-Time Live Sync** (perubahan di laptop seketika sinkron di HP).

---

## ✨ Fitur Unggulan

- **9 Menu Mata Kuliah Khusus Semester 3 SIB Polinema:**
  1. 💻 **Pemrograman Web (PemWeb)**
  2. 📐 **Rekayasa Perangkat Lunak (RPL)**
  3. 📊 **Statistika**
  4. 🎨 **UI/UX**
  5. ☕ **Pemrograman Berorientasi Objek (PBO)**
  6. 🧪 **Praktikum Pemrograman Berorientasi Objek (Prak PBO)**
  7. 🌐 **Jaringan Komputer (JarKom)**
  8. 🔌 **Praktikum Jaringan Komputer (Prak JarKom)**
  9. 🗄️ **Basis Data Lanjut (BDL)**
  - Dilengkapi banner master **Semua Matkul** (Width 100%) dan navigasi 9 tombol matkul dalam format presisi 3 baris x 3 kolom.

- **Form Tambah Tugas Khusus Per-Matkul:**
  Setiap kali Bos memilih menu mata kuliah tertentu, form input langsung otomatis menyesuaikan diri (auto-bound ke matkul tersebut tanpa perlu memilih kategori manual lagi).

- **Atribut Tugas Lengkap:**
  - **Nama Tugas:** Judul tugas / praktikum / jobsheet.
  - **Deadline:** Tanggal & jam pengumpulan presisi (`datetime-local`).
  - **Tempat Pengumpulan:** Platform pengumpulan seperti LMS Polinema, GitHub, Google Classroom, Email Dosen, Hardcopy, dll.

- **🚨 Widget Pengingat Deadline Mendekati Hari Ini (Urgent Alarm):**
  - **⚠️ Terlewat (Overdue):** Tugas yang melewati batas waktu ditandai badge merah mencolok dan countdown keterlambatan.
  - **🔥 Hari Ini (Due Today):** Tugas yang jatuh tempo hari ini (< 24 jam) ditandai badge oranye dengan sisa jam dan jam deadline.
  - **⏳ Besok (Due Tomorrow):** Peringatan kuning untuk tugas besok (< 48 jam).
  - **Countdown Real-Time:** Hitung mundur detik demi detik (`D : HH : MM : SS`) di sisi kanan kartu.
  - **Mode Damai (All-Clear):** Menampilkan banner hijau menenangkan jika tidak ada tugas yang mendesak.

- **🎨 Neobrutalist Card Style:**
  Didesain dengan border solid hitam 2.5px, hard drop offset shadow 4px tanpa blur, aksen lime neon `#BEF264`, serta badge matkul pastel signature per mata kuliah.

- **🔍 Filter & Notifikasi Kondisional:**
  Filter status (Semua, Belum, Selesai) dan badge notifikasi tugas di menu matkul yang otomatis tersembunyi total jika jumlah tugas bernilai 0.

---

## 🛠️ Cara Menjalankan

Cukup buka berkas `index.html` di browser favorit Bos:
- `R:\todo-app\index.html`
- `C:\Users\Ridhoo\orca\projects\orcaa\todo-app\index.html`

---

## ☁️ Menghubungkan ke Supabase Cloud PostgreSQL (Opsional & Gratis)

1. Buat akun di [supabase.com](https://supabase.com) dan buat project baru.
2. Buka menu **SQL Editor** di dashboard Supabase.
3. Jalankan skrip DDL dari berkas `supabase-setup.sql` (bisa juga disalin langsung dari tombol "Salin SQL" di popup settings web).
4. Masuk ke **Project Settings &rarr; API** (atau tombol **Connect** di atas), lalu salin:
   - **Project URL**
   - **Anon / Publishable API Key** (`sb_publishable_...` atau `eyJ...`)
5. Buka aplikasi web di browser, klik ikon status di header atau tombol settings, masukkan URL & Key, lalu klik **Simpan & Hubungkan**.
6. Status akan otomatis berubah menjadi **Supabase Cloud**, dan seluruh tugas Bos tersimpan aman di cloud serta tersinkronisasi secara real-time.