import Link from "next/link";
import { BookOpen } from "lucide-react";

const categories = [
  {
    title: "Kerangka Regulasi",
    description: "Kamus KRO untuk kerangka regulasi. Data tersedia dari kamus.csv.",
    href: "/kerangka-regulasi",
    status: "Tersedia",
  },
  {
    title: "Kerangka Pel. Umum",
    description: "Kamus KRO untuk pelayanan umum. Data akan ditambahkan.",
    status: "Segera",
  },
  {
    title: "Kerangka Inv. Fisik",
    description: "Kamus KRO untuk investasi fisik. Data akan ditambahkan.",
    status: "Segera",
  },
  {
    title: "Kerangka Inv. SDM & Sos-Ek",
    description: "Kamus KRO untuk SDM dan sosial ekonomi. Data akan ditambahkan.",
    status: "Segera",
  },
  {
    title: "Adm. Pem. Internal KL",
    description: "Kamus KRO untuk administrasi pemerintahan internal KL.",
    status: "Segera",
  },
  {
    title: "Adm Pem. Internal",
    description: "Kamus KRO untuk administrasi pemerintahan internal.",
    status: "Segera",
  },
];

export default function Home() {
  return (
    <main className="flex-grow bg-canvas">
      <section className="relative overflow-hidden">
        <div className="absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,_rgba(0,100,224,0.15)_0%,_rgba(0,100,224,0)_70%)] opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }} />
        <div className="absolute -bottom-56 left-[-120px] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,_rgba(10,19,23,0.08)_0%,_rgba(10,19,23,0)_68%)] opacity-0 animate-fade-in-up" />

        <div className="relative max-w-[1400px] mx-auto px-6 pb-16 pt-20 md:pt-24 opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-[0.3em] text-steel uppercase">Kamus KRO</p>
            <h1
              className="mt-4 text-4xl md:text-6xl font-medium text-ink-deep flex flex-wrap items-center gap-x-4 gap-y-2"
              style={{ fontFeatureSettings: '"ss01", "ss02"' }}
            >
              <span>Jelajahi kamus klasifikasi rincian output.</span>
              <BookOpen className="inline-block w-10 h-10 md:w-14 md:h-14 text-primary shrink-0" strokeWidth={1.5} />
            </h1>
            <p className="mt-5 text-lg text-charcoal">
              Pilih kategori kamus untuk melihat daftar KRO dan rincian output. Kerangka Regulasi sudah tersedia, kategori lain segera menyusul.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link
                href="/kerangka-regulasi"
                className="inline-flex items-center justify-center rounded-full bg-ink-button px-7 py-3 text-sm font-bold text-on-ink-button transition-transform duration-200 hover:bg-charcoal active:scale-95"
              >
                Masuk Kerangka Regulasi
              </Link>
              <a
                href="#kategori"
                className="inline-flex items-center justify-center rounded-full border-2 border-ink-deep px-7 py-3 text-sm font-bold text-ink-deep transition-transform duration-200 hover:bg-surface-soft active:scale-95"
              >
                Lihat Semua Kategori
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="kategori" className="bg-surface-soft border-t border-hairline-soft py-20">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="mb-10 flex flex-col gap-3 opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <h2
            className="text-3xl md:text-4xl font-medium text-ink-deep"
            style={{ fontFeatureSettings: '"ss01", "ss02"' }}
          >
            Kategori Kamus
          </h2>
          <p className="text-base text-charcoal">
            Enam kategori utama untuk klasifikasi KRO. Mulai dari kerangka regulasi hingga administrasi internal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {categories.map((category, index) => {
            const cardInner = (
              <div className="flex h-full flex-col justify-between rounded-xxxl border border-hairline-soft bg-canvas p-8 transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_8px_24px_rgba(20,22,26,0.08)] group-active:scale-[0.98]">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-bold tracking-[0.24em] text-steel uppercase transition-colors group-hover:text-primary">
                      Kategori {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-3 text-2xl font-medium text-ink-deep" style={{ fontFeatureSettings: '"ss01", "ss02"' }}>
                      {category.title}
                    </h3>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold transition-transform ${
                      category.status === "Tersedia"
                        ? "bg-[rgba(0,100,224,0.12)] text-primary group-hover:scale-105"
                        : "bg-surface-soft text-steel"
                    }`}
                  >
                    {category.status}
                  </span>
                </div>
                <p className="mt-4 text-sm text-charcoal leading-relaxed">
                  {category.description}
                </p>
                <div className="mt-6 flex items-center justify-between text-sm font-bold text-ink">
                  <span className="transition-transform group-hover:translate-x-1 group-hover:text-primary">
                    Lihat Rincian
                  </span>
                  <span className="text-steel flex items-center gap-1 group-hover:text-primary transition-colors">
                    KRO &rarr;
                  </span>
                </div>
              </div>
            );

            if (category.href) {
              return (
                <Link 
                  key={category.title} 
                  href={category.href} 
                  className="group block opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${400 + (index * 100)}ms` }}
                >
                  {cardInner}
                </Link>
              );
            }

            return (
              <div 
                key={category.title} 
                className="group opacity-0 animate-fade-in-up"
                style={{ animationDelay: `${400 + (index * 100)}ms` }}
              >
                <div className="flex h-full flex-col justify-between rounded-xxxl border border-hairline-soft bg-canvas/40 p-8 opacity-60 transition-opacity duration-300 hover:opacity-100 cursor-default">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold tracking-[0.24em] text-steel uppercase">
                        Kategori {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-3 text-2xl font-medium text-ink-deep" style={{ fontFeatureSettings: '"ss01", "ss02"' }}>
                        {category.title}
                      </h3>
                    </div>
                    <span className="rounded-full px-3 py-1 text-xs font-bold bg-hairline-soft text-steel">
                      {category.status}
                    </span>
                  </div>
                  <p className="mt-4 text-sm text-charcoal leading-relaxed">
                    {category.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between text-sm font-bold text-ink opacity-50">
                    <span>Sedang Disiapkan</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        </div>
      </section>
    </main>
  );
}
