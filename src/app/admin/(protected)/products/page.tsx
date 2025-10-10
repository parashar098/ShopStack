
"use client";

import { mockProducts, addProduct } from "@/lib/data";
import ProductsTable from "@/components/admin/products-table";
import AddProductDialog from "@/components/admin/add-product-dialog";
import { useState } from "react";
import type { Product } from "@/lib/types";

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>(mockProducts);

    const handleProductAdded = (newProduct: Product) => {
        // This is a client-side update for immediate feedback.
        // The server action handles the "real" data mutation.
        setProducts(prevProducts => [newProduct, ...prevProducts]);
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-headline font-bold">Products</h1>
                <AddProductDialog onProductAdded={handleProductAdded} />
            </div>
            <ProductsTable data={products} />
        </div>
    );
}
