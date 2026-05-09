"use client";

import React, { useState, useMemo } from 'react';
import type { KamusEntry } from '@/lib/data';
import { Search, FileText, ChevronDown } from 'lucide-react';

interface DictionaryAppProps {
  data: KamusEntry[];
}

const ExpandableText = ({ text, limit = 300 }: { text: string | undefined; limit?: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text || text.trim() === "-" || text.trim() === "") {
    return <span>-</span>;
  }

  if (text.length <= limit) {
    return <span>{text}</span>;
  }

  return (
    <span>
      {isExpanded ? text : `${text.slice(0, limit)}...`}
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsExpanded(!isExpanded);
        }}
        className="ml-1 font-semibold text-steel hover:text-ink-deep hover:underline active:opacity-70 transition-all inline-block"
      >
        {isExpanded ? "Tutup" : "selengkapnya"}
      </button>
    </span>
  );
};

export default function DictionaryApp({ data }: DictionaryAppProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset ke halaman pertama setiap pencarian berubah
  };

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const query = searchQuery.toLowerCase();
      if (!query) return true;
      
      return Object.values(item).some(val => 
        val && String(val).toLowerCase().includes(query)
      );
    });
  }, [data, searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredData.length / itemsPerPage));

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        pages.push(1, 2, 3, 4, 5, '...', totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 text-ink-deep" style={{ fontFeatureSettings: '"ss01", "ss02"' }}>
          Kamus Klasifikasi Rincian Output
        </h1>
        <p className="text-lg text-charcoal max-w-3xl mx-auto md:mx-0">
          Eksplorasi dan cari data klasifikasi rincian output dengan mudah. Masukkan kata kunci atau kode untuk memfilter daftar rincian.
        </p>
      </div>

      {/* Controls: Search */}
      <div className="flex flex-col md:flex-row gap-6 mb-8 justify-between items-start md:items-center bg-canvas border border-hairline-soft rounded-xxxl p-6 shadow-sm">
        {/* Search */}
        <div className="relative w-full md:max-w-md group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-fb-blue">
            <Search className="h-5 w-5 text-steel transition-colors group-focus-within:text-fb-blue" />
          </div>
          <input
            type="text"
            className="w-full bg-surface-soft text-ink rounded-full py-3 pl-11 pr-4 border border-hairline focus:outline-none focus:border-fb-blue focus:ring-1 focus:ring-fb-blue transition-all duration-300 focus:bg-canvas focus:shadow-md text-base"
            placeholder="Cari berdasarkan kode, nama, deskripsi..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 text-sm font-medium text-steel">
        Menampilkan <span className="text-ink-deep font-bold">{filteredData.length}</span> hasil dari total {data.length} data.
      </div>

      {/* Data List */}
      <div className="space-y-6">
        {filteredData.length === 0 ? (
          <div className="py-24 text-center border border-hairline-soft rounded-xxxl bg-canvas opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="w-16 h-16 bg-surface-soft rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-steel" />
            </div>
            <h3 className="text-2xl font-medium text-ink-deep mb-2" style={{ fontFeatureSettings: '"ss01", "ss02"' }}>Tidak ada hasil ditemukan</h3>
            <p className="text-charcoal text-base">Coba gunakan kata kunci pencarian yang berbeda atau periksa ejaan Anda.</p>
          </div>
        ) : (
          paginatedData.map((item, index) => (
            <div 
              key={index} 
              className="bg-canvas border border-hairline-soft rounded-xl p-6 md:p-8 hover:shadow-[0_12px_32px_rgba(20,22,26,0.08)] hover:-translate-y-1 hover:border-hairline transition-all duration-300 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
            >
              
              <div className="flex flex-col md:flex-row gap-8">
                
                {/* Left Column: KRO Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 bg-[rgba(0,100,224,0.1)] text-[#0064e0] text-xs font-bold rounded-full">
                      KRO
                    </span>
                    {item["Kode  KRO (PN)"] && item["Kode  KRO (PN)"].trim() !== "-" && (
                      <span className="px-3 py-1 bg-surface-soft text-ink-deep text-xs font-bold rounded-full border border-hairline-soft" title="Kode KRO (PN)">
                        PN: {item["Kode  KRO (PN)"]}
                      </span>
                    )}
                    {item["Kode  KRO (Non PN)"] && item["Kode  KRO (Non PN)"].trim() !== "-" && (
                      <span className="px-3 py-1 bg-surface-soft text-ink-deep text-xs font-bold rounded-full border border-hairline-soft" title="Kode KRO (Non PN)">
                        Non-PN: {item["Kode  KRO (Non PN)"]}
                      </span>
                    )}
                    {(!item["Kode  KRO (PN)"] || item["Kode  KRO (PN)"].trim() === "-") && (!item["Kode  KRO (Non PN)"] || item["Kode  KRO (Non PN)"].trim() === "-") && (
                      <span className="px-3 py-1 bg-surface-soft text-ink-deep text-xs font-bold rounded-full">
                        -
                      </span>
                    )}
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-medium text-ink-deep mb-2" style={{ fontFeatureSettings: '"ss01", "ss02"' }}>
                      {item["KRO"] || "-"}
                    </h2>
                    <p className="text-charcoal text-base leading-relaxed">
                      <ExpandableText text={item["Definisi KRO"]} limit={300} />
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm border-t border-hairline-soft pt-5 mt-5">
                    <div>
                      <span className="block text-steel mb-1">Grup KRO</span>
                      <span className="font-medium text-ink">{item["Grup KRO"] || "-"}</span>
                    </div>
                    <div>
                      <span className="block text-steel mb-1">Jenis KRO</span>
                      {item["Definisi Jenis KRO"] && item["Definisi Jenis KRO"] !== "-" ? (
                        <details className="group [&_summary::-webkit-details-marker]:hidden">
                          <summary className="cursor-pointer list-none inline-flex items-center gap-1.5 hover:opacity-80 transition-opacity">
                            <span className="font-medium text-ink flex-1">{item["Jenis KRO"] || "-"}</span>
                            <span className="inline-flex items-center justify-center bg-surface-soft text-steel rounded-full p-0.5 shrink-0">
                              <ChevronDown className="w-3.5 h-3.5 transition-transform group-open:rotate-180" />
                            </span>
                          </summary>
                          <div className="mt-2 text-xs text-charcoal bg-surface-soft border border-hairline-soft rounded-lg p-3">
                            <p className="whitespace-pre-wrap leading-relaxed">{item["Definisi Jenis KRO"]}</p>
                          </div>
                        </details>
                      ) : (
                        <span className="font-medium text-ink">{item["Jenis KRO"] || "-"}</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column: RO Info */}
                <div className="flex-1 space-y-4 border-t md:border-t-0 md:border-l border-hairline-soft pt-6 md:pt-0 md:pl-8">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-surface-soft text-ink-deep text-xs font-bold rounded-full">
                      {item["KODE RO*"] || "-"}
                    </span>
                    <span className="px-3 py-1 bg-[#ffe200] text-ink-deep text-xs font-bold rounded-full">
                      Rincian Output (RO)
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-ink-deep mb-2">Definisi RO</h3>
                    <p className="text-charcoal text-sm leading-relaxed">
                      {item["Definisi RO"] || "-"}
                    </p>
                  </div>

                  <details className="group bg-surface-soft rounded-lg border border-hairline-soft [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex items-center justify-between p-4 cursor-pointer text-sm font-bold text-ink list-none">
                      <span>Contoh & Nomenklatur</span>
                      <ChevronDown className="w-5 h-5 text-steel transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="p-4 pt-0 text-sm border-t border-hairline-soft">
                      <p className="text-charcoal whitespace-pre-wrap mt-3">{item["CONTOH DAN REFERENSI NOMENKLATUR RO"] || "-"}</p>
                    </div>
                  </details>

                  <div className="flex justify-between items-center text-sm pt-3 border-t border-hairline-soft">
                    <div>
                      <span className="block text-steel mb-1">Satuan</span>
                      <span className="font-medium text-ink">{item["Satuan"] || "-"}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-steel mb-1">Besaran (Rp)</span>
                      <span className="font-bold text-ink">
                        {(() => {
                          const rawVal = item["BESARAN (Rp.)"]?.trim();
                          if (!rawVal || rawVal === "-" || rawVal === "") return "-";
                          
                          const numVal = Number(rawVal.replace(/,/g, ''));
                          if (isNaN(numVal)) return rawVal; // Return raw value if not a valid number
                          
                          return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(numVal);
                        })()}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      {filteredData.length > 0 && (
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 py-4 border-t border-hairline-soft">
          <p className="text-sm font-medium text-steel">
            Menampilkan <span className="font-bold text-ink-deep">{((currentPage - 1) * itemsPerPage) + 1}</span> - <span className="font-bold text-ink-deep">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> dari <span className="font-bold text-ink-deep">{filteredData.length}</span> data
          </p>
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-hairline-soft rounded-full text-sm font-bold text-ink disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-soft transition-colors active:scale-95"
            >
              <span className="hidden sm:inline">Sebelumnya</span>
              <span className="sm:hidden">&larr;</span>
            </button>
            
            <div className="flex items-center gap-1 mx-1 sm:mx-2">
              {getPageNumbers().map((page, idx) => (
                page === '...' ? (
                  <span key={`ellipsis-${idx}`} className="px-2 sm:px-3 py-2 text-steel">...</span>
                ) : (
                  <button
                    key={`page-${page}`}
                    onClick={() => handlePageChange(page as number)}
                    className={`min-w-[32px] sm:min-w-[40px] h-8 sm:h-10 px-2 flex items-center justify-center rounded-full text-sm font-bold transition-all active:scale-95 ${
                      currentPage === page
                        ? 'bg-ink-deep text-canvas shadow-md'
                        : 'text-ink hover:bg-surface-soft border border-transparent hover:border-hairline-soft'
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}
            </div>

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-hairline-soft rounded-full text-sm font-bold text-ink disabled:opacity-40 disabled:cursor-not-allowed hover:bg-surface-soft transition-colors active:scale-95"
            >
              <span className="hidden sm:inline">Selanjutnya</span>
              <span className="sm:hidden">&rarr;</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
