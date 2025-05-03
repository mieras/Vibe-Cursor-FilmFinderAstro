import * as React from "react";
import { Card, CardHeader, CardContent } from "./ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

interface ProductFiltersProps {
  formatOptions: { value: string; label: string }[];
  brandOptions: { value: string; label: string }[];
  isoOptions: { value: string; label: string }[];
  countryOptions: { value: string; label: string }[];
  sortOptions: { value: string; label: string }[];
  values: {
    format: string;
    brand: string;
    iso: string;
    country: string;
    search: string;
    sort: string;
  };
  onChange: (values: ProductFiltersProps["values"]) => void;
}

export function ProductFilters({
  formatOptions,
  brandOptions,
  isoOptions,
  countryOptions,
  sortOptions,
  values,
  onChange,
}: ProductFiltersProps) {
  function handleChange(key: keyof ProductFiltersProps["values"], value: string) {
    onChange({ ...values, [key]: value });
  }

  return (
    <Card className="mb-8">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <Input
            placeholder="Zoek op naam, type, merk..."
            value={values.search}
            onChange={e => handleChange("search", e.target.value)}
            className="w-full md:w-80"
          />
          <Button type="button" variant="secondary" onClick={() => onChange({ ...values, search: "" })}>
            Reset zoekopdracht
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <Select value={values.format} onValueChange={v => handleChange("format", v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Formaat" />
            </SelectTrigger>
            <SelectContent>
              {formatOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={values.brand} onValueChange={v => handleChange("brand", v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Merk" />
            </SelectTrigger>
            <SelectContent>
              {brandOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={values.iso} onValueChange={v => handleChange("iso", v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="ISO" />
            </SelectTrigger>
            <SelectContent>
              {isoOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={values.country} onValueChange={v => handleChange("country", v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Land" />
            </SelectTrigger>
            <SelectContent>
              {countryOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={values.sort} onValueChange={v => handleChange("sort", v)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sorteer op" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map(opt => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
} 