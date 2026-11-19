// Menampilkan formulir data pemesan termasuk alamat penjemputan kondisional dan validasi (FT-05).
import type {RefObject} from 'react';
import {AlertCircle} from 'lucide-react';
import {STORE_INFO} from '../config.ts';
import type {OrderFormErrors} from '../lib/whatsapp.ts';

interface OrderFormProps {
  namaRef: RefObject<HTMLInputElement | null>;
  alamatRef: RefObject<HTMLTextAreaElement | null>;
  namaPelanggan: string;
  alamatJemput: string;
  catatanKhusus: string;
  antarJemputAktif: boolean;
  errors: OrderFormErrors;
  onChangeNama: (value: string) => void;
  onChangeAlamat: (value: string) => void;
  onChangeCatatan: (value: string) => void;
}

export function OrderForm({
  namaRef,
  alamatRef,
  namaPelanggan,
  alamatJemput,
  catatanKhusus,
  antarJemputAktif,
  errors,
  onChangeNama,
  onChangeAlamat,
  onChangeCatatan,
}: OrderFormProps) {
  return (
    <section
      aria-labelledby="judul-data-pemesan"
      className="bg-white rounded-2xl p-4 sm:p-6"
    >
      <div className="mb-4">
        <h2
          id="judul-data-pemesan"
          className="text-lg font-semibold text-neutral-900"
        >
          Data Pemesan
        </h2>
        <p className="text-sm text-neutral-600 mt-1">
          Lengkapi rincian berikut untuk pesan WhatsApp pesanan Anda.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="nama-pelanggan"
            className="block text-sm font-medium text-neutral-900 mb-2"
          >
            Nama pemesan
          </label>
          <input
            ref={namaRef}
            id="nama-pelanggan"
            name="namaPelanggan"
            type="text"
            autoComplete="name"
            value={namaPelanggan}
            onChange={(e) => onChangeNama(e.target.value)}
            placeholder="Contoh: Budi Santoso"
            aria-invalid={Boolean(errors.namaPelanggan)}
            aria-describedby={
              errors.namaPelanggan ? 'error-nama-pelanggan' : undefined
            }
            className={`w-full min-h-[44px] rounded-xl border bg-white px-4 py-2.5 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
              errors.namaPelanggan ? 'border-red-700' : 'border-neutral-200'
            }`}
          />
          {errors.namaPelanggan && (
            <div
              id="error-nama-pelanggan"
              role="alert"
              className="mt-2 rounded-xl bg-red-50 text-red-800 px-3.5 py-2 text-sm flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
              <span>{errors.namaPelanggan}</span>
            </div>
          )}
        </div>

        {antarJemputAktif ? (
          <div>
            <label
              htmlFor="alamat-jemput"
              className="block text-sm font-medium text-neutral-900 mb-2"
            >
              Alamat penjemputan
            </label>
            <textarea
              ref={alamatRef}
              id="alamat-jemput"
              name="alamatJemput"
              rows={3}
              autoComplete="street-address"
              value={alamatJemput}
              onChange={(e) => onChangeAlamat(e.target.value)}
              placeholder="Contoh: Jl. Melati No. 12, Kost Putri"
              aria-invalid={Boolean(errors.alamatJemput)}
              aria-describedby={
                errors.alamatJemput
                  ? 'error-alamat-jemput'
                  : 'bantuan-alamat-jemput'
              }
              className={`w-full rounded-xl border bg-white px-4 py-2.5 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 ${
                errors.alamatJemput ? 'border-red-700' : 'border-neutral-200'
              }`}
            />
            <p id="bantuan-alamat-jemput" className="text-sm text-neutral-600 mt-1.5">
              Area penjemputan maksimal radius {STORE_INFO.pickupRadiusMaxKm} km.
            </p>
            {errors.alamatJemput && (
              <div
                id="error-alamat-jemput"
                role="alert"
                className="mt-2 rounded-xl bg-red-50 text-red-800 px-3.5 py-2 text-sm flex items-start gap-2"
              >
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" aria-hidden="true" />
                <span>{errors.alamatJemput}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-xl bg-neutral-50 border border-neutral-200 px-4 py-3 text-sm text-neutral-600">
            Pakaian akan Anda antar sendiri ke toko.
          </div>
        )}

        <div>
          <label
            htmlFor="catatan-khusus"
            className="block text-sm font-medium text-neutral-900 mb-2"
          >
            Catatan khusus (opsional)
          </label>
          <textarea
            id="catatan-khusus"
            name="catatanKhusus"
            rows={2}
            value={catatanKhusus}
            onChange={(e) => onChangeCatatan(e.target.value)}
            placeholder="Contoh: Pisahkan pakaian putih"
            className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-base text-neutral-900 placeholder:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          />
        </div>
      </div>
    </section>
  );
}
