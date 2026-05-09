import Link from "next/link";

import { loadKamusData } from "@/lib/data";
import DictionaryApp from "@/components/DictionaryApp";

export default function KerangkaRegulasiPage() {
  const data = loadKamusData();

  return (
    <main className="flex-grow bg-canvas">
      <section className="border-b border-hairline-soft bg-canvas">
        <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-bold tracking-[0.3em] text-steel uppercase">Kamus KRO</p>
            <h1
              className="mt-2 text-2xl md:text-3xl font-medium text-ink-deep"
              style={{ fontFeatureSettings: '"ss01", "ss02"' }}
            >
              Kerangka Regulasi
            </h1>
          </div>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border-2 border-ink-deep px-6 py-2 text-sm font-bold text-ink-deep"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </section>
      <DictionaryApp data={data} />
    </main>
  );
}
