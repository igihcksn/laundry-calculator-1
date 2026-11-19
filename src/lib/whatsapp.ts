// Menangani validasi formulir pesanan serta pembuatan template teks dan tautan WhatsApp sesuai BL-03.

import {ESTIMATE_DISCLAIMER, STORE_INFO, WEIGHT_LIMITS} from '../config.ts';
import type {CalculatorResult} from './calculator.ts';
import {formatBerat, formatRupiah, normalisasiNomorTelepon} from './format.ts';

export interface OrderFormFields {
  beratRaw: string;
  beratParsed: number | null;
  namaPelanggan: string;
  alamatJemput: string;
  catatanKhusus: string;
  antarJemputAktif: boolean;
}

export interface OrderFormErrors {
  berat?: string;
  namaPelanggan?: string;
  alamatJemput?: string;
}

export type OrderErrorField = keyof OrderFormErrors;

export interface ValidationOutcome {
  isValid: boolean;
  errors: OrderFormErrors;
  firstErrorField: OrderErrorField | null;
}

/**
 * Memvalidasi kelengkapan estimasi berat, nama pemesan, dan alamat penjemputan kondisional.
 */
export function validasiFormPesanan(fields: OrderFormFields): ValidationOutcome {
  const errors: OrderFormErrors = {};

  if (
    fields.beratParsed === null ||
    Number.isNaN(fields.beratParsed) ||
    fields.beratParsed < WEIGHT_LIMITS.minKg
  ) {
    errors.berat = 'Masukkan estimasi berat cucian lebih dari 0 kg, contoh: 2,5.';
  } else if (fields.beratParsed > WEIGHT_LIMITS.maxKg) {
    errors.berat = `Estimasi berat maksimal ${WEIGHT_LIMITS.maxKg} kg per pesanan, contoh: 12.`;
  }

  if (!fields.namaPelanggan.trim()) {
    errors.namaPelanggan =
      'Masukkan nama Anda agar pesanan mudah dicatat, contoh: Budi Santoso.';
  }

  if (fields.antarJemputAktif && !fields.alamatJemput.trim()) {
    errors.alamatJemput =
      'Masukkan alamat penjemputan lengkap, contoh: Jl. Melati No. 12, Kost Putri.';
  }

  let firstErrorField: OrderErrorField | null = null;
  if (errors.berat) {
    firstErrorField = 'berat';
  } else if (errors.namaPelanggan) {
    firstErrorField = 'namaPelanggan';
  } else if (errors.alamatJemput) {
    firstErrorField = 'alamatJemput';
  }

  return {
    isValid: firstErrorField === null,
    errors,
    firstErrorField,
  };
}

export interface WhatsAppPayloadInput {
  namaPelanggan: string;
  alamatJemput: string;
  catatanKhusus: string;
  antarJemputAktif: boolean;
  pewangiAktif: boolean;
  kalkulasi: CalculatorResult;
}

/**
 * Menyusun pesan teks pesanan sesuai template resmi PRD Bagian 7.
 */
export function buatPesanWhatsApp(data: WhatsAppPayloadInput): string {
  const nama = data.namaPelanggan.trim();
  const alamat = data.antarJemputAktif
    ? data.alamatJemput.trim()
    : 'Antar Sendiri ke Toko';
  const catatan = data.catatanKhusus.trim() || '-';

  const barisAntarJemput = data.antarJemputAktif
    ? `Ya (+${formatRupiah(data.kalkulasi.biayaAntarJemput)})`
    : 'Tidak';
  const barisPewangi = data.pewangiAktif
    ? `Ya (+${formatRupiah(data.kalkulasi.biayaPewangi)})`
    : 'Tidak';

  return [
    'Halo Admin Laundry, saya ingin memesan layanan laundry dengan rincian berikut:',
    '',
    `*Nama:* ${nama}`,
    `*Layanan Utama:* ${data.kalkulasi.layanan.name}`,
    `*Estimasi Berat:* ${formatBerat(data.kalkulasi.beratAktualValid)} kg (Berat Ditagih: ${formatBerat(data.kalkulasi.beratDitagih)} kg)`,
    '*Layanan Tambahan:*',
    `- Antar-Jemput: ${barisAntarJemput}`,
    `- Pewangi Premium: ${barisPewangi}`,
    '',
    `*Alamat Penjemputan:* ${alamat}`,
    `*Catatan Khusus:* ${catatan}`,
    '',
    `*Estimasi Total Biaya:* *${formatRupiah(data.kalkulasi.totalEstimasi)}*`,
    '',
    `_(Catatan: ${ESTIMATE_DISCLAIMER})_`,
    '',
    'Mohon konfirmasi pesanan dan ketersediaan jadwalnya. Terima kasih!',
  ].join('\n');
}

/**
 * Membuat tautan deep-link wa.me lengkap dengan pesan yang sudah di-encode aman.
 */
export function buatUrlWhatsApp(
  data: WhatsAppPayloadInput,
  nomorToko: string = STORE_INFO.whatsappNumber,
): string {
  const pesan = buatPesanWhatsApp(data);
  const targetNomor = /^\+?[\d\s-]+$/.test(nomorToko)
    ? normalisasiNomorTelepon(nomorToko)
    : nomorToko.trim();
  return `https://wa.me/${targetNomor}?text=${encodeURIComponent(pesan)}`;
}
