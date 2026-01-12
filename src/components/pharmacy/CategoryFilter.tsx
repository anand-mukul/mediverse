interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategorySelect,
}: CategoryFilterProps) {
  const getCategoryLabel = (category: string) => {
    if (category === "all") return "All Categories";
    return category
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      all: "📦",
      "pain relief": "🤕",
      antibiotic: "🦠",
      diabetes: "🩺",
      "blood pressure": "💓",
      digestive: "🥗",
      cholesterol: "🧪",
      thyroid: "🦋",
      allergy: "🤧",
      vitamins: "🍊",
    };
    return icons[category] || "💊";
  };

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-2 min-w-max">
        {categories.map((category) => {
          const isActive = selectedCategory === category;

          return (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`
                flex items-center gap-2 px-4 py-3 rounded-xl whitespace-nowrap
                transition-all duration-200
                ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-card text-foreground border border-border hover:bg-accent hover:border-primary/30"
                }
              `}
            >
              <span className="text-lg">{getCategoryIcon(category)}</span>
              <span className="font-medium">{getCategoryLabel(category)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
