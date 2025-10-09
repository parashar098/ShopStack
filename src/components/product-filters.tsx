
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";

interface ProductFiltersProps {
  categories: string[];
  onCategoryChange: (category: string) => void;
  onSearchChange: (searchTerm: string) => void;
  onSortChange: (sortOrder: string) => void;
  onPriceChange: (priceRange: number[]) => void;
  currentCategory?: string;
  currentSearchTerm?: string;
  currentSort?: string;
  currentPriceRange?: number[];
  maxPrice: number;
}

export default function ProductFilters({
  categories,
  onCategoryChange,
  onSearchChange,
  onSortChange,
  onPriceChange,
  currentCategory = "all",
  currentSearchTerm = "",
  currentSort = 'newest',
  currentPriceRange,
  maxPrice,
}: ProductFiltersProps) {

  const [searchTerm, setSearchTerm] = useState(currentSearchTerm);
  const [priceRange, setPriceRange] = useState(currentPriceRange || [0, maxPrice]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setSearchTerm(currentSearchTerm);
  }, [currentSearchTerm]);

  useEffect(() => {
    setPriceRange(currentPriceRange || [0, maxPrice]);
  }, [currentPriceRange, maxPrice]);

  const handleSearchDebounce = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    const handler = setTimeout(() => {
        onSearchChange(value);
    }, 300);
    return () => clearTimeout(handler);
  }
  
  const handleCategorySelect = (category: string) => {
    onCategoryChange(category);
    const params = new URLSearchParams(searchParams.toString());
    if (category === 'all') {
      params.delete('category');
    } else {
      params.set('category', category);
    }
    params.set('page', '1');
    router.replace(`/products?${params.toString()}`);
  }

  const handlePriceChange = (value: number[]) => {
      setPriceRange(value);
  }
  
  const handlePriceCommit = (value: number[]) => {
      onPriceChange(value);
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8"
            value={searchTerm ?? ''}
            onChange={handleSearchDebounce}
            disabled={!!currentSearchTerm}
          />
        </div>
        
        <div>
          <h3 className="font-semibold mb-3">Sort by</h3>
          <Select value={currentSort} onValueChange={onSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Category</h3>
          <RadioGroup
            value={currentCategory}
            onValueChange={handleCategorySelect}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="cat-all" />
              <Label htmlFor="cat-all">All</Label>
            </div>
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <RadioGroupItem value={category} id={`cat-${category}`} />
                <Label htmlFor={`cat-${category}`}>{category}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <h3 className="font-semibold mb-3">Price Range</h3>
          <Slider
            min={0}
            max={maxPrice}
            step={100}
            value={priceRange}
            onValueChange={handlePriceChange}
            onValueCommit={handlePriceCommit}
            className="my-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
