import { loadKamusData } from "@/lib/data";
import DictionaryApp from "@/components/DictionaryApp";

export default function Home() {
  const data = loadKamusData();
  
  return (
    <main className="flex-grow">
      <DictionaryApp data={data} />
    </main>
  );
}
