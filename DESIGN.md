# DESIGN.md — LaundryCalc

Dokumen keputusan desain antarmuka dan token visual untuk aplikasi LaundryCalc.

## Keputusan Desain Pengguna

| Aspek | Pilihan Ditetapkan |
| :--- | :--- |
| Nama aplikasi | LaundryCalc |
| Pengguna utama | Pelanggan laundry rumahan atau kost dan admin toko |
| Kesan visual | Modern dan ringkas (`Manrope`) |
| Warna aksen | Biru (`blue`) |
| Sapaan pengguna | Anda |
| Susunan halaman | Satu halaman bergulir |
| Posisi aksi utama | Bar yang menempel di bawah layar (sticky bottom bar) |
| Gambar | Tanpa gambar ilustrasi produk (fokus ke keterbacaan tarif dan kalkulator) |
| Format Rupiah | `Rp 6.000` (spasi setelah Rp, pemisah ribuan titik, pembulatan ke rupiah terdekat) |

## Token Visual & Tata Letak

- **Tipografi**: `@fontsource/manrope` dengan ketebalan 400, 500, dan 600. Ukuran teks utama minimal 14 px, ukuran di dalam kolom input minimal 16 px. Angka harga dan berat memakai `tabular-nums`.
- **Permukaan**: Latar halaman `bg-neutral-50`, kartu dan panel `bg-white`. Pemisahan kartu dengan latar dilakukan lewat kontras warna permukaan; `border-neutral-200` hanya untuk input, opsi pilihan, dan garis pemisah. Tidak ada kartu di dalam kartu.
- **Bentuk & Sudut**: Kartu dan panel `rounded-2xl`, input dan tombol `rounded-xl`.
- **Bayangan**: Hanya dipakai pada sticky bottom bar melayang (`shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]`).
- **Warna Aksen & Status**:
  - Tombol utama: `bg-blue-700`, hover `bg-blue-800`, teks putih.
  - Elemen terpilih: garis tepi `border-blue-700` dan latar `bg-blue-50`, teks penanda `text-blue-700`.
  - Cincin fokus: `focus-visible` 2 px biru dengan jarak 2 px.
  - Status peringatan (minimum charge 3 kg): `bg-amber-50` dan `text-amber-800` dengan ikon dan teks.
  - Status error validasi: `bg-red-50` dan `text-red-800` dengan ikon dan teks.
- **Gerak**: Hanya `transform` dan `opacity`, durasi 150–200 ms `ease-out`, menghormati `motion-reduce:`.
- **Responsivitas & Aksesibilitas**:
  - Dirancang dari lebar 360 px. Bar bawah sticky dijaga ringkas agar aksi utama terlihat tanpa menggulir pada layar 360 x 740 px.
  - Pada layar lebar (`lg:`), tata letak terbagi dua kolom agar ruang layar dimanfaatkan seimbang.
  - Area sentuh seluruh tombol, kartu pilihan, dan checkbox minimal 44 x 44 px.
