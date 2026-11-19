// Komponen utama aplikasi satu halaman LaundryCalc yang menghubungkan seluruh fitur FT-01 hingga FT-07.
import {useMemo, useRef, useState, type MouseEvent} from 'react';
import {AddOnSelector} from './components/AddOnSelector.tsx';
import {OrderForm} from './components/OrderForm.tsx';
import {PriceSummaryBar} from './components/PriceSummaryBar.tsx';
import {ServiceCatalog} from './components/ServiceCatalog.tsx';
import {StoreHeader} from './components/StoreHeader.tsx';
import {WeightInput} from './components/WeightInput.tsx';
import {
  ESTIMATE_DISCLAIMER,
  MAIN_SERVICES,
  WEIGHT_LIMITS,
  type ServiceCode,
} from './config.ts';
import {hitungEstimasiBiaya} from './lib/calculator.ts';
import {formatBerat, parseBeratInput} from './lib/format.ts';
import {
  buatUrlWhatsApp,
  validasiFormPesanan,
  type OrderFormErrors,
} from './lib/whatsapp.ts';

export default function App() {
  const [selectedServiceCode, setSelectedServiceCode] = useState<ServiceCode>(
    MAIN_SERVICES[0].code,
  );
  const [beratRaw, setBeratRaw] = useState<string>(WEIGHT_LIMITS.defaultInput);
  const [antarJemputAktif, setAntarJemputAktif] = useState(false);
  const [pewangiAktif, setPewangiAktif] = useState(false);
  const [namaPelanggan, setNamaPelanggan] = useState('');
  const [alamatJemput, setAlamatJemput] = useState('');
  const [catatanKhusus, setCatatanKhusus] = useState('');
  const [errors, setErrors] = useState<OrderFormErrors>({});

  const beratInputRef = useRef<HTMLInputElement>(null);
  const namaInputRef = useRef<HTMLInputElement>(null);
  const alamatInputRef = useRef<HTMLTextAreaElement>(null);

  const beratParsed = useMemo(() => parseBeratInput(beratRaw), [beratRaw]);

  const kalkulasi = useMemo(
    () =>
      hitungEstimasiBiaya({
        serviceCode: selectedServiceCode,
        beratAktual: beratParsed,
        antarJemputAktif,
        pewangiAktif,
      }),
    [selectedServiceCode, beratParsed, antarJemputAktif, pewangiAktif],
  );

  const waUrl = useMemo(
    () =>
      buatUrlWhatsApp({
        namaPelanggan,
        alamatJemput,
        catatanKhusus,
        antarJemputAktif,
        pewangiAktif,
        kalkulasi,
      }),
    [
      namaPelanggan,
      alamatJemput,
      catatanKhusus,
      antarJemputAktif,
      pewangiAktif,
      kalkulasi,
    ],
  );

  const handleChangeBerat = (value: string) => {
    setBeratRaw(value);
    if (errors.berat) {
      setErrors((prev) => ({...prev, berat: undefined}));
    }
  };

  const handleStepBerat = (delta: number) => {
    const saatIni =
      beratParsed !== null && Number.isFinite(beratParsed) && beratParsed > 0
        ? beratParsed
        : 0;
    const hasilMentah = Math.round((saatIni + delta) * 10) / 10;
    const hasilTerbatas = Math.min(
      WEIGHT_LIMITS.maxKg,
      Math.max(WEIGHT_LIMITS.minKg, hasilMentah),
    );
    setBeratRaw(formatBerat(hasilTerbatas));
    if (errors.berat) {
      setErrors((prev) => ({...prev, berat: undefined}));
    }
  };

  const handleToggleAntarJemput = () => {
    setAntarJemputAktif((prev) => {
      const next = !prev;
      if (!next && errors.alamatJemput) {
        setErrors((curr) => ({...curr, alamatJemput: undefined}));
      }
      return next;
    });
  };

  const handleAttemptSend = (event: MouseEvent<HTMLAnchorElement>) => {
    const hasilValidasi = validasiFormPesanan({
      beratRaw,
      beratParsed,
      namaPelanggan,
      alamatJemput,
      catatanKhusus,
      antarJemputAktif,
    });

    if (!hasilValidasi.isValid) {
      event.preventDefault();
      setErrors(hasilValidasi.errors);

      if (hasilValidasi.firstErrorField === 'berat') {
        beratInputRef.current?.focus();
      } else if (hasilValidasi.firstErrorField === 'namaPelanggan') {
        namaInputRef.current?.focus();
      } else if (hasilValidasi.firstErrorField === 'alamatJemput') {
        alamatInputRef.current?.focus();
      }
      return;
    }

    setErrors({});
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900 pb-28 sm:pb-32">
      <StoreHeader />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-6">
            <ServiceCatalog
              selectedCode={selectedServiceCode}
              onSelect={setSelectedServiceCode}
            />

            <WeightInput
              inputRef={beratInputRef}
              beratRaw={beratRaw}
              beratAktualValid={kalkulasi.beratAktualValid}
              beratDitagih={kalkulasi.beratDitagih}
              apakahMinimumCharge={kalkulasi.apakahMinimumCharge}
              error={errors.berat}
              onChangeRaw={handleChangeBerat}
              onStep={handleStepBerat}
            />

            <AddOnSelector
              antarJemputAktif={antarJemputAktif}
              pewangiAktif={pewangiAktif}
              biayaPewangi={kalkulasi.biayaPewangi}
              beratDitagih={kalkulasi.beratDitagih}
              onToggleAntarJemput={handleToggleAntarJemput}
              onTogglePewangi={() => setPewangiAktif((prev) => !prev)}
            />
          </div>

          <div className="lg:col-span-5 space-y-6">
            <OrderForm
              namaRef={namaInputRef}
              alamatRef={alamatInputRef}
              namaPelanggan={namaPelanggan}
              alamatJemput={alamatJemput}
              catatanKhusus={catatanKhusus}
              antarJemputAktif={antarJemputAktif}
              errors={errors}
              onChangeNama={(value) => {
                setNamaPelanggan(value);
                if (errors.namaPelanggan) {
                  setErrors((prev) => ({...prev, namaPelanggan: undefined}));
                }
              }}
              onChangeAlamat={(value) => {
                setAlamatJemput(value);
                if (errors.alamatJemput) {
                  setErrors((prev) => ({...prev, alamatJemput: undefined}));
                }
              }}
              onChangeCatatan={setCatatanKhusus}
            />

            <aside
              aria-label="Catatan estimasi harga"
              className="bg-white rounded-2xl p-4 sm:p-6 text-sm text-neutral-600"
            >
              <p>{ESTIMATE_DISCLAIMER}</p>
            </aside>
          </div>
        </div>
      </main>

      <PriceSummaryBar
        kalkulasi={kalkulasi}
        antarJemputAktif={antarJemputAktif}
        pewangiAktif={pewangiAktif}
        waUrl={waUrl}
        onAttemptSend={handleAttemptSend}
      />
    </div>
  );
}
