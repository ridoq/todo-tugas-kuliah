# 🎓 TugasKu — Pengelola Tugas Kuliah Semester 3 D4 SIB Polinema

Aplikasi Web Task & Assignment Tracker modern yang dirancang khusus untuk mahasiswa D4 Sistem Informasi Bisnis (Polinema) dengan arsitektur **Dual-Engine**:
1. **Local Mode (Default):** Langsung aktif 100% menggunakan `LocalStorage` browser tanpa perlu registrasi atau konfigurasi backend apa pun.
2. **Supabase Cloud Mode:** Terhubung langsung ke database cloud **PostgreSQL Supabase** gratis dengan dukungan **Real-Time Live Sync** (perubahan di laptop seketika sinkron di HP).

---

## ✨ Fitur Unggulan

- **9 Menu Mata Kuliah Khusus Semester 3 SIB Polinema:**
  1. 💻 **Pemrograman Web**
  2. 🗄️ **Basis Data Lanjut**
  3. ☕ **Pemrograman Berorientasi Objek (PBO Java OOP)**
  4. 🌐 **Jaringan Komputer**
  5. 📐 **Rekayasa Perangkat Lunak (RPL)**
  6. 📊 **Statistika Komputasi**
  7. 🚀 **Project-Based Learning (PBL - iStore)**
  8. 🎨 **Desain UI/UX**
  9. 📋 **Manajemen Proyek TI**
  - Dilengkapi tab overview **Semua Matkul** untuk memantau rekapitulasi seluruh tugas.

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
  - **Tandai Selesai Cepat:** Tugas mendesak dapat langsung diselesaikan langsung dari dalam widget pengingat.
  - **Mode Damai (All-Clear):** Menampilkan banner hijau menenangkan jika tidak ada tugas yang mendesak.

- **🎨 High-Contrast Light Theme:**
  Didesain murni dalam tema terang modern dengan kanvas latar belakang *soft cool-slate* (`#EEF2F6`) dan kartu putih murni (`#FFFFFF`) berbingkai tegas (`#CBD5E1`) serta bayangan tajam, memastikan batas visual antar-komponen sangat jelas dan nyaman di mata.

- **🔍 Pencarian & Filter Cepat:**
  Pencarian instan berdasarkan judul tugas, matkul, atau tempat pengumpulan, serta filter status (Semua, Belum, Selesai).

---

## 🛠️ Cara Menjalankan

Cukup buka berkas `index.html` di browser favorit Bos (bisa klik ganda langsung, atau melalui Live Server VS Code / Laragon):
- `R:\todo-app\index.html`
- `C:\Users\Ridhoo\orca\projects\orcaa\todo-app\index.html`

---

## ☁️ Menghubungkan ke Supabase Cloud PostgreSQL (Opsional & Gratis)

1. Buat akun di [supabase.com](https://supabase.com) dan buat project baru.
2. Buka menu **SQL Editor** di dashboard Supabase.
3. Jalankan skrip DDL dari berkas `supabase-setup.sql` (bisa juga disalin langsung dari tombol "Salin SQL" di popup settings web).
4. Masuk ke **Project Settings &rarr; API**, lalu salin:
   - **Project URL**
   - **anon / public key**
5. Buka aplikasi web di browser, klik ikon status di pojok kiri bawah sidebar atau ikon **Gear (⚙️)**, masukkan URL & Key, lalu klik **Simpan & Hubungkan**.
6. Status akan otomatis berubah menjadi **Supabase Cloud**, dan seluruh tugas Bos tersimpan aman di cloud serta tersinkronisasi secara real-time.
