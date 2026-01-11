import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function SearchBar({
  searchQuery,
  onSearchChange,
}: SearchBarProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
        <Input
          type="search"
          placeholder="Search medications, brands, or symptoms..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-12 h-14 text-lg shadow-lg border-slate-300 focus:border-blue-500 focus:ring-blue-500"
        />
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <span className="text-sm text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
            {searchQuery ? "Press Enter to search" : "Type to search"}
          </span>
        </div>
      </div>
    </div>
  );
}
