
import Link from 'next/link';
import Image from 'next/image';
import { mockCategories } from '@/lib/categories';
import { Card } from '@/components/ui/card';

export default function CategoryHighlights() {
  const categoriesToShow = mockCategories.slice(0, 4);
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-3xl font-headline font-bold tracking-tighter text-center mb-10">
            Shop by Category
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categoriesToShow.map((category) => (
            <Link key={category.name} href={`/products?category=${encodeURIComponent(category.name)}`} passHref>
              <Card className="group relative block w-full h-64 overflow-hidden rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <Image
                  src={category.imageURL}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={category.imageHint}
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-2xl font-headline font-bold text-white">
                    {category.name}
                  </h3>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
