// Menampilkan sticky bottom bar rincian estimasi biaya (FT-04) dan tombol kirim WhatsApp (FT-06).
import {useState, type MouseEvent} from 'react';
import {ChevronDown, ChevronUp, MessageCircle} from 'lucide-react';
import {ESTIMATE_DISCLAIMER} from '../config.ts';
import type {CalculatorResult} from '../lib/calculator.ts';
import {formatBerat, formatRupiah} from '../lib/format.ts';

interface PriceSummaryBarProps {
  kalkulasi: CalculatorResult;
  antarJemputAktif: boolean;
  pewangiAktif: boolean;
  waUrl: string;
  onAttemptSend: (event: MouseEvent<HTMLAnchorElement>) => void;
}

export function PriceSummaryBar({
  kalkulasi,
  antarJemputAktif,
  pewangiAktif,
  waUrl,
  onAttemptSend,
}: PriceSummaryBarProps) {
  const [rincianTerbuka, setRincianTerbuka] = useState(false);

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 bg-white border-t border-neutral-200 shadow-[0_1px_2px_rgba(0,0,0,0.06),0_8px_24px_rgba(0,0,0,0.08)]">
      {rincianTerbuka && (
        <div
          id="panel-rincian-biaya"
          className="border-b border-neutral-200 bg-neutral-50"
        >
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 space-y-2 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-neutral-600">
                {kalkulasi.layanan.name} (
                {kalkulasi.beratDitagih > 0
                  ? `${formatBerat(kalkulasi.beratDitagih)} kg ditagih x ${formatRupiah(kalkulasi.layanan.pricePerKg)}`
                  : 'Berat belum diisi'}
                )
              </span>
              <span className="font-medium text-neutral-900 tabular-nums whitespace-nowrap">
                {formatRupiah(kalkulasi.biayaUtama)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-neutral-600">Antar-Jemput</span>
              <span className="font-medium text-neutral-900 tabular-nums whitespace-nowrap">
                {antarJemputAktif
                  ? formatRupiah(kalkulasi.biayaAntarJemput)
                  : 'Tidak dipilih'}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <span className="text-neutral-600">
                Pewangi Premium
                {pewangiAktif && kalkulasi.beratDitagih > 0
                  ? ` (${formatBerat(kalkulasi.beratDitagih)} kg)`
                  : ''}
              </span>
              <span className="font-medium text-neutral-900 tabular-nums whitespace-nowrap">
                {pewangiAktif
                  ? formatRupiah(kalkulasi.biayaPewangi)
                  : 'Tidak dipilih'}
              </span>
            </div>

            <div className="pt-2 border-t border-neutral-200 flex items-center justify-between gap-4 font-semibold text-neutral-900">
              <span>Total Estimasi</span>
              <span className="tabular-nums whitespace-nowrap">
                {formatRupiah(kalkulasi.totalEstimasi)}
              </span>
            </div>

            <p className="text-sm text-neutral-600 pt-1">
              {ESTIMATE_DISCLAIMER}
            </p>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setRincianTerbuka((prev) => !prev)}
          aria-expanded={rincianTerbuka}
          aria-controls="panel-rincian-biaya"
          className="min-h-[44px] min-w-0 text-left rounded-xl px-1.5 -mx-1.5 py-1 hover:bg-neutral-50 transition-colors duration-150 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        >
          <span className="flex items-center gap-1 text-sm text-neutral-600">
            <span>Estimasi Total</span>
            {rincianTerbuka ? (
              <ChevronDown className="w-4 h-4 shrink-0" aria-hidden="true" />
            ) : (
              <ChevronUp className="w-4 h-4 shrink-0" aria-hidden="true" />
            )}
          </span>
          <span className="block text-xl sm:text-2xl font-semibold text-neutral-900 tabular-nums leading-tight">
            {formatRupiah(kalkulasi.totalEstimasi)}
          </span>
          <span className="hidden sm:block text-sm text-neutral-600 tabular-nums mt-0.5">
            Utama {formatRupiah(kalkulasi.biayaUtama)} · Tambahan{' '}
            {formatRupiah(kalkulasi.totalTambahan)}
          </span>
        </button>

        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:block text-right text-sm text-neutral-600 tabular-nums">
            <span>Utama: {formatRupiah(kalkulasi.biayaUtama)}</span>
            <span className="mx-1.5" aria-hidden="true">
              ·
            </span>
            <span>Tambahan: {formatRupiah(kalkulasi.totalTambahan)}</span>
          </div>

          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onAttemptSend}
            className="min-h-[44px] px-4 sm:px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm sm:text-base font-medium inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-colors duration-150 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span>Kirim ke WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
