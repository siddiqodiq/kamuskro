import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export interface KamusEntry {
  "Kode Grup": string;
  "Grup KRO": string;
  "Kode Jenis": string;
  "Jenis KRO": string;
  "Definisi Jenis KRO": string;
  "No.": string;
  "Kode  KRO (Non PN)": string;
  "Kode  KRO (PN)": string;
  "KRO": string;
  "Definisi KRO": string;
  "Satuan": string;
  "KODE RO*": string;
  "Definisi RO": string;
  "CONTOH DAN REFERENSI NOMENKLATUR RO": string;
  "KARAKTERISTIK RO": string;
  "BESARAN (Rp.)": string;
}

export function loadKamusData(): KamusEntry[] {
  try {
    const csvPath = path.join(process.cwd(), 'src', 'data', 'kamus.csv');

    // Hanya membaca CSV
    if (fs.existsSync(csvPath)) {
      console.log("Loading data from kamus.csv...");
      const fileContent = fs.readFileSync(csvPath, 'utf8');
      
      const results = Papa.parse<KamusEntry>(fileContent, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
      });
      return results.data;
    }

    console.warn("File kamus.csv tidak ditemukan di folder src/data");
    return [];
  } catch (error) {
    console.error("Error loading data:", error);
    return [];
  }
}
