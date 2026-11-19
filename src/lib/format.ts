// Menyediakan fungsi pemformatan angka rupiah, berat desimal, dan nomor telepon Indonesia.

/**
 * Memformat bilangan bulat rupiah menjadi "Rp 6.000" (spasi setelah Rp, pemisah ribuan titik).
 */
export function formatRupiah(nominal: number): string {
  const bulat = Math.round(Number.isFinite(nominal) ? nominal : 0);
  const absolut = Math.abs(bulat);
  const ribuan = absolut.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return bulat < 0 ? `-Rp ${ribuan}` : `Rp ${ribuan}`;
}

/**
 * Memformat angka berat desimal dengan koma dan tanpa angka nol di belakang (contoh: 4,5 dan 3).
 */
export function formatBerat(beratKg: number): string {
  if (!Number.isFinite(beratKg) || beratKg <= 0) {
    return '0';
  }
  const dibulatkan = Math.round(beratKg * 100) / 100;
  return dibulatkan.toString().replace('.', ',');
}

/**
 * Mengurai teks input berat yang memakai koma atau titik menjadi angka desimal, atau null bila tidak valid.
 */
export function parseBeratInput(rawInput: string): number | null {
  const bersih = rawInput.trim().replace(',', '.');
  if (!bersih) {
    return null;
  }
  if (!/^-?(\d+(\.\d+)?|\.\d+)$/.test(bersih)) {
    return Number.NaN;
  }
  const nilai = Number(bersih);
  return Number.isFinite(nilai) ? nilai : Number.NaN;
}

/**
 * Menormalkan nomor telepon Indonesia (08xxx, +62xxx, 62xxx) menjadi format angka 62xxx.
 */
export function normalisasiNomorTelepon(rawNomor: string): string {
  const trimmed = rawNomor.trim();
  const hanyaAngka = trimmed.replace(/\D/g, '');
  if (!hanyaAngka) {
    return trimmed;
  }
  if (hanyaAngka.startsWith('0')) {
    return `62${hanyaAngka.slice(1)}`;
  }
  if (hanyaAngka.startsWith('62')) {
    return hanyaAngka;
  }
  return `62${hanyaAngka}`;
}
