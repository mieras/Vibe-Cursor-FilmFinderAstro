import * as React from "react";

interface Store {
  name: string;
  url?: string;
}

interface Product {
  id: string;
  name: string;
  brand?: string;
  format: string;
  iso: number;
  image_url?: string;
  lowestPrice?: number | null;
  stores?: Store[];
}

interface Filters {
  format: string;
  brand: string;
  iso: string;
  country: string;
  search: string;
  sort: string;
}

interface FilmGridProps {
  products: Product[];
  filters: Filters;
  renderCard: (product: Product) => React.ReactNode;
}

export function FilmGrid({ products, filters, renderCard }: FilmGridProps) {
  // Filteren
  let filtered = products.filter((p) => {
    if (filters.format && p.format !== filters.format) return false;
    if (filters.brand && p.brand?.toLowerCase() !== filters.brand.toLowerCase()) return false;
    if (filters.iso && String(p.iso) !== filters.iso) return false;
    if (filters.search && !(`${p.brand} ${p.name}`.toLowerCase().includes(filters.search.toLowerCase()))) return false;
    return true;
  });

  // Sorteren
  if (filters.sort === "price_asc") {
    filtered = filtered.sort((a, b) => (a.lowestPrice ?? Infinity) - (b.lowestPrice ?? Infinity));
  } else if (filters.sort === "price_desc") {
    filtered = filtered.sort((a, b) => (b.lowestPrice ?? 0) - (a.lowestPrice ?? 0));
  } else if (filters.sort === "iso") {
    filtered = filtered.sort((a, b) => a.iso - b.iso);
  } else {
    filtered = filtered.sort((a, b) => `${a.brand} ${a.name}`.localeCompare(`${b.brand} ${b.name}`));
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filtered.map((product) => renderCard(product))}
      {filtered.length === 0 && (
        <div className="col-span-full text-center text-muted-foreground py-12">
          Geen films gevonden die aan je criteria voldoen.
        </div>
      )}
    </div>
  );
} 