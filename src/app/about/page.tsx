
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Target, Eye } from 'lucide-react';
import SplitText from '@/components/ui/split-text';
import ChromaGrid from '@/components/ui/chroma-grid';

export default function AboutPage() {

  const teamMembers = [
    {
      image: "https://i.pravatar.cc/300?img=1",
      title: "Sarah Johnson",
      subtitle: "Founder & CEO",
      handle: "@sjohnson",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "#"
    },
    {
      image: "https://i.pravatar.cc/300?img=2",
      title: "Mike Chen",
      subtitle: "Head of Product",
      handle: "@mikechen",
      borderColor: "#10B981",
      gradient: "linear-gradient(180deg, #10B981, #000)",
      url: "#"
    },
    {
      image: 'https://i.pravatar.cc/300?img=3',
      title: 'Morgan Blake',
      subtitle: 'Lead Designer',
      handle: '@morganblake',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(165deg, #F59E0B, #000)',
      url: '#'
    },
    {
      image: 'https://i.pravatar.cc/300?img=16',
      title: 'Casey Park',
      subtitle: 'Marketing Director',
      handle: '@caseypark',
      borderColor: '#EF4444',
      gradient: 'linear-gradient(195deg, #EF4444, #000)',
      url: '#'
    },
  ];


  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] flex items-center justify-center bg-secondary">
        <div className="absolute inset-0">
          <Image
            src="https://picsum.photos/seed/301/1600/600"
            alt="Our team collaborating"
            fill
            className="object-cover"
            data-ai-hint="team collaboration"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4 md:px-6 text-center text-white">
          <SplitText
            text="About ShopStack"
            tag="h1"
            className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl !text-white"
          />
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-white/80">
            We're passionate about bringing you high-quality, curated products that enhance your life.
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-headline font-bold tracking-tighter mb-4">Our Story</h2>
              <p className="text-foreground/80 leading-relaxed mb-4">
                ShopStack was founded with a simple idea: to make premium products accessible to everyone. What started as a small passion project has grown into a thriving e-commerce destination, but our core values remain the same. We believe in quality craftsmanship, thoughtful design, and exceptional customer service.
              </p>
              <p className="text-foreground/80 leading-relaxed">
                Every item in our collection is hand-picked and tested to ensure it meets our high standards. We partner with the best artisans and manufacturers to bring you products that are not only beautiful and functional but also built to last. Thank you for joining us on this journey.
              </p>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg">
                <Image
                    src="https://picsum.photos/seed/302/600/600"
                    alt="Artisan crafting a product"
                    fill
                    className="object-cover"
                    data-ai-hint="artisan hands"
                />
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <Card className="p-8">
              <Users className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-headline font-bold mb-2">Who We Are</h3>
              <p className="text-muted-foreground">We are a team of designers, curators, and creators dedicated to finding and sharing exceptional products.</p>
            </Card>
            <Card className="p-8">
              <Target className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-headline font-bold mb-2">Our Mission</h3>
              <p className="text-muted-foreground">To provide a curated selection of high-quality goods that inspire and elevate everyday life, backed by outstanding customer care.</p>
            </Card>
            <Card className="p-8">
              <Eye className="mx-auto h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-headline font-bold mb-2">Our Vision</h3>
              <p className="text-muted-foreground">To become the most trusted destination for discovering unique and durable products that bring joy and utility to our customers.</p>
            </Card>
          </div>
        </div>
      </section>

       {/* Meet The Team Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
           <h2 className="text-3xl font-headline font-bold tracking-tighter text-center mb-10">
            Meet Our Team
          </h2>
          <div className="relative h-[600px] md:h-[400px]">
            <ChromaGrid 
              items={teamMembers}
              columns={4}
              rows={1}
              radius={300}
              damping={0.45}
              fadeOut={0.6}
              ease="power3.out"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
