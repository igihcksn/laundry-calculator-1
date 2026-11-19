// Menampilkan header toko LaundryCalc beserta jadwal operasional dan penjemputan (FT-07).
import {Clock, Truck} from 'lucide-react';
import {STORE_INFO} from '../config.ts';

export function StoreHeader() {
  return (
    <header className="bg-white border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-baseline gap-2 min-w-0">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
            {STORE_INFO.appName}
          </h1>
          <span className="text-sm text-neutral-600 truncate">
            {STORE_INFO.name}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-neutral-600">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-neutral-500 shrink-0" aria-hidden="true" />
            <span className="tabular-nums">
              Buka {STORE_INFO.openingDays} {STORE_INFO.openingHours}
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-neutral-500 shrink-0" aria-hidden="true" />
            <span className="tabular-nums">Jadwal jemput {STORE_INFO.pickupHours}</span>
          </span>
        </div>
      </div>
    </header>
  );
}
