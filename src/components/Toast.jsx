import { useShop } from '../context/ShopContext';
import { Sparkles, CheckCircle, Info } from 'lucide-react';

export default function Toast() {
  const { toast } = useShop();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="bg-[#1C251D] text-[#FAF8F5] border border-[#C49B5C]/40 px-5 py-3.5 rounded-sm shadow-2xl flex items-center gap-3 backdrop-blur-md">
        <Sparkles className="w-4 h-4 text-[#C49B5C] shrink-0" />
        <span className="text-xs font-medium tracking-wide">
          {toast.message}
        </span>
      </div>
    </div>
  );
}
