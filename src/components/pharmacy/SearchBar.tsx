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
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />

        <Input
          type="search"
          placeholder="Search medications, brands, or symptoms..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="
            pl-12 h-14 text-lg shadow-lg
            border-border
            focus:border-primary
            focus:ring-primary
          "
        />

        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
            {searchQuery ? "Press Enter to search" : "Type to search"}
          </span>
        </div>
      </div>
    </div>
  );
}
