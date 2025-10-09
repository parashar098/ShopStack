
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from 'next/navigation';

interface ProductFiltersProps {
  categories: string[];
  onCategoryChange: (category: string) => void;
  onSearchChange: (searchTerm: string) => void;
  currentCategory?: string;
  currentSearchTerm?: string;
}

export default function ProductFilters({
  categories,
  onCategoryChange,
  onSearchChange,
  currentCategory = "all",
  currentSearchTerm = "",
}: ProductFiltersProps) {

  const [searchTerm, setSearchTerm] = useState(currentSearchTerm);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setSearchTerm(currentSearchTerm);
  }, [currentSearchTerm]);

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
    router.replace(`/products?${params.toString()}`);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
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
      </CardContent>
    </Card>
  );
}

