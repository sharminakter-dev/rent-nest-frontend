"use client"

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PropertySearchBarProps } from "@/lib/types";
import { SearchIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useRef, useState } from "react";



export function PropertySearchBar( {
  propertyCategories,
}: PropertySearchBarProps ) {

  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const getParam = (key: string): string | undefined =>
    searchParams.get(key) ?? undefined;

  const [searchTerm, setSearchTerm] = useState(getParam("searchTerm") ?? "");
  const [minRent, setMinRent] = useState(getParam("minRent") ?? "");
  const [maxRent, setMaxRent] = useState(getParam("maxRent") ?? "");
  const [type, setType] = useState(getParam("type") ?? "all");
  const [sortOrder, setSortOrder] = useState(getParam("sortOrder") ?? "desc");

  const searchDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const minRentDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxRentDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateParam = (key: string, value: string | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathName}?${params.toString()}`);
  };

  const debounce = (
    ref: React.RefObject<ReturnType<typeof setTimeout> | null>,
    fn: () => void,
    delay = 500
  ) => {
    if (ref.current) clearTimeout(ref.current);
    ref.current = setTimeout(fn, delay);
  };

  const handleSearchChange = (value: string ) => {
    setSearchTerm(value);
    debounce(searchDebounceRef, () => {
      updateParam("searchTerm", value || undefined);
    });
  };

  const handleMinRentChange = (value: string) => {
    setMinRent(value);
    debounce(minRentDebounceRef, () => {
      updateParam("minRent", value || undefined);
    });
  };

  const handleMaxRentChange = (value: string) => {
    setMaxRent(value);
    debounce(maxRentDebounceRef, () => {
      updateParam("maxRent", value || undefined);
    });
  };

  const handleTypeChange = (value: string | null) => {
    const next = value ?? "all";
    setType(next);
    updateParam("type", next === "all" ? undefined : next);
  };

  const handleSortOrderChange = (value: string | null) => {
      const next = value ?? "desc";
      setSortOrder(next);
      updateParam("sortOrder", next === "desc" ? undefined : next);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative w-full max-w-sm">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search Properties..."
          className="pl-9"
        />
      </div>

      {/* Price range */}
      <div className="flex items-center gap-2">
        <Input
          type="number"
          value={minRent}
          onChange={(e) => handleMinRentChange(e.target.value)}
          placeholder="Min Rent"
          className="w-28"
        />
        <span className="text-muted-foreground">-</span>
        <Input
          type="number"
          value={maxRent}
          onChange={(e) => handleMaxRentChange(e.target.value)}
          placeholder="Max Rent"
          className="w-28"
        />
      </div>

      {/* Type */}
      <Select value={type} onValueChange={handleTypeChange}>
        <SelectTrigger className="w-36">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          {propertyCategories.map((t) => (
            <SelectItem key={t} value={t}>
              {t}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>


      {/* Sort order */}
      <Select value={sortOrder} onValueChange={handleSortOrderChange}>
        <SelectTrigger className="w-32">
          <SelectValue placeholder="Order" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="desc">Descending</SelectItem>
          <SelectItem value="asc">Ascending</SelectItem>
        </SelectContent>
    </Select>

    </div>
  );
}