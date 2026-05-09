"use client";

import React, { useState, useMemo } from 'react';
import type { KamusEntry } from '@/lib/data';
import { Search, ChevronDown, ChevronUp, FileText } from 'lucide-react';

interface DictionaryAppProps {
  data: KamusEntry[];
}

type SortField = "KRO" | "Kode  KRO (PN)" | "KODE RO*";
type SortDirection = "asc" | "desc";

export default function DictionaryApp({ data }: DictionaryAppProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<SortField>("KRO");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const query = searchQuery.toLowerCase();
      return (
        (item["KRO"] && item["KRO"].toLowerCase().includes(query)) ||
        (item["Definisi KRO"] && item["Definisi KRO"].toLowerCase().includes(query)) ||
        (item["Definisi RO"] && item["Definisi RO"].toLowerCase().includes(query)) ||
        (item["CONTOH DAN REFERENSI NOMENKLATUR RO"] && item["CONTOH DAN REFERENSI NOMENKLATUR RO"].toLowerCase().includes(query)) ||
        (item["KODE RO*"] && item["KODE RO*"].toLowerCase().includes(query)) ||
        (item["Kode  KRO (PN)"] && item["Kode  KRO (PN)"].toLowerCase().includes(query))
      );
    });
  }, [data, searchQuery]);

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortField] || "";
      const bVal = b[sortField] || "";
      
      if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
      if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />;
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

      {/* Controls: Search and Sort */}
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
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Sort Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full md:w-auto">
          <span className="text-sm font-bold text-ink whitespace-nowrap">Urutkan:</span>
          <div className="flex flex-wrap gap-2">
            {(["KRO", "Kode  KRO (PN)", "KODE RO*"] as SortField[]).map(field => (
              <button
                key={field}
                onClick={() => handleSort(field)}
                className={`flex items-center px-4 py-2 rounded-full text-sm font-bold border transition-all duration-200 whitespace-nowrap active:scale-95 ${
                  sortField === field
                    ? "bg-ink-deep text-canvas border-ink-deep hover:bg-charcoal hover:border-charcoal"
                    : "bg-canvas text-ink border-border-hairline hover:border-ink-deep hover:bg-surface-soft"
                }`}
              >
                {field}
                {renderSortIcon(field)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 text-sm font-medium text-steel">
        Menampilkan <span className="text-ink-deep font-bold">{sortedData.length}</span> hasil dari total {data.length} data.
      </div>

      {/* Data List */}
      <div className="space-y-6">
        {sortedData.length === 0 ? (
          <div className="py-24 text-center border border-hairline-soft rounded-xxxl bg-canvas opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="w-16 h-16 bg-surface-soft rounded-full flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-steel" />
            </div>
            <h3 className="text-2xl font-medium text-ink-deep mb-2" style={{ fontFeatureSettings: '"ss01", "ss02"' }}>Tidak ada hasil ditemukan</h3>
            <p className="text-charcoal text-base">Coba gunakan kata kunci pencarian yang berbeda atau periksa ejaan Anda.</p>
          </div>
        ) : (
          sortedData.map((item, index) => (
            <div 
              key={index} 
              className="bg-canvas border border-hairline-soft rounded-xl p-6 md:p-8 hover:shadow-[0_12px_32px_rgba(20,22,26,0.08)] hover:-translate-y-1 hover:border-hairline transition-all duration-300 opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${Math.min(index * 50, 500)}ms` }}
            >
              
              <div className="flex flex-col md:flex-row gap-8">
                
                {/* Left Column: KRO Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-surface-soft text-ink-deep text-xs font-bold rounded-full">
                      {item["Kode  KRO (PN)"] || item["Kode  KRO (Non PN)"] || "-"}
                    </span>
                    <span className="px-3 py-1 bg-[rgba(0,100,224,0.1)] text-[#0064e0] text-xs font-bold rounded-full">
                      KRO
                    </span>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-medium text-ink-deep mb-2" style={{ fontFeatureSettings: '"ss01", "ss02"' }}>
                      {item["KRO"] || "-"}
                    </h2>
                    <p className="text-charcoal text-base leading-relaxed">
                      {item["Definisi KRO"] || "-"}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm border-t border-hairline-soft pt-5 mt-5">
                    <div>
                      <span className="block text-steel mb-1">Grup KRO</span>
                      <span className="font-medium text-ink">{item["Grup KRO"] || "-"}</span>
                    </div>
                    <div>
                      <span className="block text-steel mb-1">Jenis KRO</span>
                      <span className="font-medium text-ink">{item["Jenis KRO"] || "-"}</span>
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

                  <div className="bg-surface-soft rounded-lg p-4 mt-4 text-sm border border-hairline-soft">
                    <span className="block font-bold text-ink mb-2">Contoh & Nomenklatur:</span>
                    <p className="text-charcoal whitespace-pre-wrap">{item["CONTOH DAN REFERENSI NOMENKLATUR RO"] || "-"}</p>
                  </div>

                  <div className="flex justify-between items-center text-sm pt-3 border-t border-hairline-soft">
                    <div>
                      <span className="block text-steel mb-1">Satuan</span>
                      <span className="font-medium text-ink">{item["Satuan"] || "-"}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-steel mb-1">Besaran (Rp)</span>
                      <span className="font-bold text-ink">
                        {item[" BESARAN (Rp.)"] ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(Number(item[" BESARAN (Rp.)"])) : "-"}
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
