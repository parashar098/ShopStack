
import { Button } from "@/components/ui/button";
import { mockProducts } from "@/lib/data";
import ProductsTable from "@/components/admin/products-table";

export default function AdminProductsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-headline font-bold">Products</h1>
                <Button>Add Product</Button>
            </div>
            <ProductsTable data={mockProducts} />
        </div>
    );
}
