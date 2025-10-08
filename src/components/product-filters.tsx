
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface ProductFiltersProps {
  categories: string[];
  onCategoryChange: (category: string) => void;
  onSearchChange: (searchTerm: string) => void;
}

export default function ProductFilters({
  categories,
  onCategoryChange,
  onSearchChange,
}: ProductFiltersProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
           <div className="relative">
             <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
             <Input
                type="search"
                placeholder="Search products..."
                className="pl-8"
                onChange={(e) => onSearchChange(e.target.value)}
              />
           </div>
        </div>
        <div>
            <h3 className="font-semibold mb-3">Category</h3>
            <RadioGroup
              defaultValue="all"
              onValueChange={onCategoryChange}
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
