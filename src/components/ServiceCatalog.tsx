// Menampilkan daftar paket layanan utama beserta tarif per kg dan lama pengerjaan (FT-01).
import {Check} from 'lucide-react';
import {MAIN_SERVICES, type ServiceCode} from '../config.ts';
import {formatRupiah} from '../lib/format.ts';

interface ServiceCatalogProps {
  selectedCode: ServiceCode;
  onSelect: (code: ServiceCode) => void;
}

export function ServiceCatalog({selectedCode, onSelect}: ServiceCatalogProps) {
  return (
    <section
      aria-labelledby="judul-layanan-utama"
      className="bg-white rounded-2xl p-4 sm:p-6"
    >
      <div className="mb-4">
        <h2
          id="judul-layanan-utama"
          className="text-lg font-semibold text-neutral-900"
        >
          Pilih Layanan Utama
        </h2>
        <p className="text-sm text-neutral-600 mt-1">
          Pilih satu paket sesuai kebutuhan cucian Anda.
        </p>
      </div>

      <div role="radiogroup" aria-labelledby="judul-layanan-utama" className="space-y-3">
        {MAIN_SERVICES.map((service) => {
          const isSelected = service.code === selectedCode;
          return (
            <button
              key={service.code}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(service.code)}
              className={`w-full min-h-[44px] text-left rounded-xl border p-4 transition-colors duration-150 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                isSelected
                  ? 'border-blue-700 bg-blue-50'
                  : 'border-neutral-200 bg-white hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <span
                    aria-hidden="true"
                    className={`mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors duration-150 ease-out motion-reduce:transition-none ${
                      isSelected
                        ? 'border-blue-700 bg-blue-700 text-white'
                        : 'border-neutral-300 bg-white'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" strokeWidth={2.5} />}
                  </span>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                      <span className="text-base font-semibold text-neutral-900">
                        {service.name}
                      </span>
                      <span className="text-sm text-neutral-600 tabular-nums">
                        {service.durationDays} hari
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600 mt-1">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className={`text-base font-semibold tabular-nums whitespace-nowrap ${
                      isSelected ? 'text-blue-700' : 'text-neutral-900'
                    }`}
                  >
                    {formatRupiah(service.pricePerKg)}
                  </span>
                  <span className="block text-sm text-neutral-600 whitespace-nowrap">
                    per kg
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
