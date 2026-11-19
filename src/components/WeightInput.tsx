// Menangani input estimasi berat cucian beserta notifikasi aturan minimum charge 3 kg (FT-02).
import type {RefObject} from 'react';
import {AlertCircle, Info, Minus, Plus} from 'lucide-react';
import {STORE_INFO, WEIGHT_LIMITS} from '../config.ts';
import {formatBerat} from '../lib/format.ts';

interface WeightInputProps {
  inputRef: RefObject<HTMLInputElement | null>;
  beratRaw: string;
  beratAktualValid: number;
  beratDitagih: number;
  apakahMinimumCharge: boolean;
  error?: string;
  onChangeRaw: (value: string) => void;
  onStep: (delta: number) => void;
}

export function WeightInput({
  inputRef,
  beratRaw,
  beratAktualValid,
  beratDitagih,
  apakahMinimumCharge,
  error,
  onChangeRaw,
  onStep,
}: WeightInputProps) {
  const stepLabel = formatBerat(WEIGHT_LIMITS.stepKg);

  return (
    <section
      aria-labelledby="judul-estimasi-berat"
      className="bg-white rounded-2xl p-4 sm:p-6"
    >
      <div className="mb-4">
        <h2
          id="judul-estimasi-berat"
          className="text-lg font-semibold text-neutral-900"
        >
          Estimasi Berat Cucian
        </h2>
        <p className="text-sm text-neutral-600 mt-1">
          Isi perkiraan berat pakaian Anda dalam kilogram.
        </p>
      </div>

      <div>
        <label
          htmlFor="estimasi-berat"
          className="block text-sm font-medium text-neutral-900 mb-2"
        >
          Berat cucian (kg)
        </label>

        <div className="flex items-stretch gap-2">
          <button
            type="button"
            onClick={() => onStep(-WEIGHT_LIMITS.stepKg)}
            aria-label={`Kurangi berat ${stepLabel} kg`}
            className="min-w-[44px] min-h-[44px] px-3 rounded-xl border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 flex items-center justify-center shrink-0 transition-colors duration-150 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <Minus className="w-4 h-4" aria-hidden="true" />
          </button>

          <div className="relative flex-1 min-w-0">
            <input
              ref={inputRef}
              id="estimasi-berat"
              name="estimasiBerat"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              value={beratRaw}
              onChange={(e) => onChangeRaw(e.target.value)}
              placeholder="Contoh: 3,5"
              aria-invalid={Boolean(error)}
              aria-describedby={
                error ? 'error-estimasi-berat' : 'bantuan-estimasi-berat'
              }
              className={`w-full min-h-[44px] rounded-xl border bg-white px-4 pr-12 py-2.5 text-base font-medium text-neutral-900 placeholder:text-neutral-500 tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                error ? 'border-red-700' : 'border-neutral-200'
              }`}
            />
            <span
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-medium text-neutral-600"
            >
              kg
            </span>
          </div>

          <button
            type="button"
            onClick={() => onStep(WEIGHT_LIMITS.stepKg)}
            aria-label={`Tambah berat ${stepLabel} kg`}
            className="min-w-[44px] min-h-[44px] px-3 rounded-xl border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 flex items-center justify-center shrink-0 transition-colors duration-150 ease-out motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        <p id="bantuan-estimasi-berat" className="text-sm text-neutral-600 mt-2">
          Gunakan koma atau titik untuk desimal, minimal{' '}
          {formatBerat(STORE_INFO.minimumChargeKg)} kg ditagih.
        </p>

        {error && (
          <div
            id="error-estimasi-berat"
            role="alert"
            className="mt-3 rounded-xl bg-red-50 text-red-800 px-3.5 py-2.5 text-sm flex items-start gap-2"
          >
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        {!error && apakahMinimumCharge && (
          <div
            role="status"
            className="mt-3 rounded-xl bg-amber-50 text-amber-800 px-3.5 py-2.5 text-sm flex items-start gap-2"
          >
            <Info className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
            <span>
              Berat di bawah {formatBerat(STORE_INFO.minimumChargeKg)} kg dikenakan
              tarif minimal {formatBerat(STORE_INFO.minimumChargeKg)} kg. Berat
              ditagih:{' '}
              <strong className="font-semibold tabular-nums">
                {formatBerat(beratDitagih)} kg
              </strong>
              .
            </span>
          </div>
        )}

        {!error && !apakahMinimumCharge && beratAktualValid >= STORE_INFO.minimumChargeKg && (
          <p className="mt-3 text-sm text-neutral-600 tabular-nums">
            Berat ditagih:{' '}
            <strong className="font-semibold text-neutral-900">
              {formatBerat(beratDitagih)} kg
            </strong>
          </p>
        )}
      </div>
    </section>
  );
}
