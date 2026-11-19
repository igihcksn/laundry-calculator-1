// Berisi seluruh rumus perhitungan berat ditagih dan estimasi biaya laundry sesuai BL-01 dan BL-02.

import {
  ADD_ONS,
  MAIN_SERVICES,
  STORE_INFO,
  type MainService,
  type ServiceCode,
} from '../config.ts';

export interface CalculatorInput {
  serviceCode: ServiceCode;
  beratAktual: number | null;
  antarJemputAktif: boolean;
  pewangiAktif: boolean;
}

export interface CalculatorResult {
  layanan: MainService;
  beratAktualValid: number;
  beratDitagih: number;
  apakahMinimumCharge: boolean;
  biayaUtama: number;
  biayaAntarJemput: number;
  biayaPewangi: number;
  totalTambahan: number;
  totalEstimasi: number;
}

/**
 * Menghitung berat ditagih dengan aturan minimum charge 3 kg (BL-01).
 * Mengembalikan 0 bila berat aktual tidak valid (<= 0 atau NaN).
 */
export function hitungBeratDitagih(beratAktual: number | null): number {
  if (beratAktual === null || !Number.isFinite(beratAktual) || beratAktual <= 0) {
    return 0;
  }
  return Math.max(STORE_INFO.minimumChargeKg, beratAktual);
}

/**
 * Menghitung rincian biaya layanan utama, add-on, dan total estimasi (BL-02).
 * Seluruh perkalian angka desimal dibulatkan ke rupiah terdekat.
 */
export function hitungEstimasiBiaya(input: CalculatorInput): CalculatorResult {
  const layanan =
    MAIN_SERVICES.find((item) => item.code === input.serviceCode) ?? MAIN_SERVICES[0];
  const antarJemput = ADD_ONS.find((item) => item.code === 'T01')!;
  const pewangi = ADD_ONS.find((item) => item.code === 'T02')!;

  const beratAktualValid =
    input.beratAktual !== null &&
    Number.isFinite(input.beratAktual) &&
    input.beratAktual > 0
      ? input.beratAktual
      : 0;

  const beratDitagih = hitungBeratDitagih(beratAktualValid);
  const apakahMinimumCharge =
    beratAktualValid > 0 && beratAktualValid < STORE_INFO.minimumChargeKg;

  const biayaUtama =
    beratDitagih > 0 ? Math.round(beratDitagih * layanan.pricePerKg) : 0;
  const biayaAntarJemput = input.antarJemputAktif ? antarJemput.price : 0;
  const biayaPewangi =
    input.pewangiAktif && beratDitagih > 0
      ? Math.round(beratDitagih * pewangi.price)
      : 0;
  const totalTambahan = biayaAntarJemput + biayaPewangi;
  const totalEstimasi = biayaUtama + totalTambahan;

  return {
    layanan,
    beratAktualValid,
    beratDitagih,
    apakahMinimumCharge,
    biayaUtama,
    biayaAntarJemput,
    biayaPewangi,
    totalTambahan,
    totalEstimasi,
  };
}
