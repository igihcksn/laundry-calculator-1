// Menampilkan pilihan layanan tambahan Antar-Jemput dan Pewangi Premium secara interaktif (FT-03).
import {Check} from 'lucide-react';
import {ADD_ONS} from '../config.ts';
import {formatRupiah} from '../lib/format.ts';

interface AddOnSelectorProps {
  antarJemputAktif: boolean;
  pewangiAktif: boolean;
  biayaPewangi: number;
  beratDitagih: number;
  onToggleAntarJemput: () => void;
  onTogglePewangi: () => void;
}

export function AddOnSelector({
  antarJemputAktif,
  pewangiAktif,
  biayaPewangi,
  beratDitagih,
  onToggleAntarJemput,
  onTogglePewangi,
}: AddOnSelectorProps) {
  return (
    <section
      aria-labelledby="judul-layanan-tambahan"
      className="bg-white rounded-2xl p-4 sm:p-6"
    >
      <div className="mb-4">
        <h2
          id="judul-layanan-tambahan"
          className="text-lg font-semibold text-neutral-900"
        >
          Layanan Tambahan
        </h2>
        <p className="text-sm text-neutral-600 mt-1">
          Opsional, pilih sesuai kebutuhan pesanan Anda.
        </p>
      </div>

      <div className="space-y-3">
        {ADD_ONS.map((addOn) => {
          const isAntarJemput = addOn.code === 'T01';
          const isChecked = isAntarJemput ? antarJemputAktif : pewangiAktif;
          const onToggle = isAntarJemput ? onToggleAntarJemput : onTogglePewangi;
          const tarifLabel =
            addOn.calculationType === 'flat'
              ? `+${formatRupiah(addOn.price)}`
              : `+${formatRupiah(addOn.price)} / kg ditagih`;

          return (
            <label
              key={addOn.code}
              className={`flex items-start justify-between gap-3 rounded-xl border p-4 min-h-[44px] cursor-pointer transition-colors duration-150 ease-out motion-reduce:transition-none focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-blue-700 ${
                isChecked
                  ? 'border-blue-700 bg-blue-50'
                  : 'border-neutral-200 bg-white hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-start gap-3 min-w-0">
                <input
                  type="checkbox"
                  name={`addon-${addOn.code}`}
                  checked={isChecked}
                  onChange={onToggle}
                  className="sr-only"
                />
                <span
                  aria-hidden="true"
                  className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors duration-150 ease-out motion-reduce:transition-none ${
                    isChecked
                      ? 'border-blue-700 bg-blue-700 text-white'
                      : 'border-neutral-300 bg-white'
                  }`}
                >
                  {isChecked && <Check className="w-3.5 h-3.5" strokeWidth={2.5} />}
                </span>

                <div className="min-w-0">
                  <span className="block text-base font-semibold text-neutral-900">
                    {addOn.name}
                  </span>
                  <span className="block text-sm text-neutral-600 mt-1">
                    {addOn.notes}
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span
                  className={`block text-sm font-semibold tabular-nums whitespace-nowrap ${
                    isChecked ? 'text-blue-700' : 'text-neutral-900'
                  }`}
                >
                  {tarifLabel}
                </span>
                {!isAntarJemput && isChecked && beratDitagih > 0 && (
                  <span className="block text-sm text-neutral-600 tabular-nums whitespace-nowrap mt-0.5">
                    Subtotal {formatRupiah(biayaPewangi)}
                  </span>
                )}
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
