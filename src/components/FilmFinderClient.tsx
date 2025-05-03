import * as React from "react";
import { ProductFilters } from "./ProductFilters";
import { FilmGrid } from "./FilmGrid";
import FilmCard from "./FilmCard.astro";

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

interface Option {
  value: string;
  label: string;
}

interface FilmFinderClientProps {
  products: Product[];
  formatOptions: Option[];
  brandOptions: Option[];
  isoOptions: Option[];
  countryOptions: Option[];
  sortOptions: Option[];
}

export default function FilmFinderClient({
  products,
  formatOptions,
  brandOptions,
  isoOptions,
  countryOptions,
  sortOptions,
}: FilmFinderClientProps) {
  const [filters, setFilters] = React.useState({
    format: "",
    brand: "",
    iso: "",
    country: "",
    search: "",
    sort: "name",
  });

  console.log(products);

  return (
    <>
      <div style={{color: 'green'}}>Test: React eiland laadt!</div>
      <ProductFilters
        formatOptions={formatOptions}
        brandOptions={brandOptions}
        isoOptions={isoOptions}
        countryOptions={countryOptions}
        sortOptions={sortOptions}
        values={filters}
        onChange={setFilters}
      />
      <FilmGrid
        products={products}
        filters={filters}
        renderCard={(product) => (
          <a href={`/products/${product.id}`} className="block h-full" key={product.id}>
            <FilmCard
              name={product.name ?? ""}
              brand={product.brand ?? ""}
              format={product.format ?? ""}
              iso={typeof product.iso === "number" ? product.iso : 0}
              href={`/products/${product.id}`}
              image_url={product.image_url ?? ""}
              lowestPrice={typeof product.lowestPrice === "number" ? product.lowestPrice : null}
              stores={JSON.stringify(product.stores ?? [])}
            />
          </a>
        )}
      />
    </>
  );
} 