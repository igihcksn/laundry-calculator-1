# PRODUCT.md — Laundry Kilau

Aplikasi web satu halaman untuk melihat katalog tarif layanan laundry, menghitung estimasi biaya otomatis termasuk aturan minimum charge 3 kg, dan mengirim pesanan terstruktur ke WhatsApp admin toko.

## Daftar Fitur

| Kode | Nama Fitur | Prioritas | Ketergantungan | Status |
| :--- | :--- | :--- | :--- | :--- |
| FT-01 | Tampilan Katalog & Durasi | Must Have | - | Selesai |
| FT-02 | Input Berat & Notifikasi Min. Charge | Must Have | FT-01 | Selesai |
| FT-03 | Opsi Add-on Terintegrasi | Must Have | FT-01, FT-02 | Selesai |
| FT-04 | Floating Price Summary | Must Have | FT-01, FT-02, FT-03 | Selesai |
| FT-05 | Form Data Pemesan | Must Have | FT-03 | Selesai |
| FT-06 | WhatsApp Deep Link Button | Must Have | FT-02, FT-03, FT-04, FT-05 | Selesai |
| FT-07 | Info Jam Operasional Toko | Should Have | - | Selesai |

## Keputusan Atas Hal Terbuka dari PRD

1. **Cakupan Fitur**: Fitur FT-01 sampai FT-06 (Must Have) dibangun bersama FT-07 (Info Jam Operasional Toko).
2. **Pembulatan Harga Desimal**: Perkalian berat desimal dengan tarif per kg dibulatkan ke rupiah terdekat (`Math.round`).
3. **Format Rupiah**: Ditampilkan dengan spasi setelah Rp dan pemisah ribuan titik tanpa desimal, misalnya `Rp 6.000`.
4. **Nomor WhatsApp Toko**: Menggunakan nilai placeholder konfigurasi `628xxxxxxxxxx` pada `src/config.ts` agar tidak mencantumkan data pribadi asli.
5. **Batas Berat Input**: Berat aktual harus lebih besar dari `0` kg (minimal `0,1` kg) dan dibatasi hingga `200` kg per pesanan agar perhitungan tetap wajar.
