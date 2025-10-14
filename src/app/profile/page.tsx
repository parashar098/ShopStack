
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { User, ShoppingBag, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
           <Card>
                <CardHeader className="items-center text-center">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className="space-y-2 mt-4">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-52" />
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <div className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                     <Skeleton className="h-10 w-full mt-4" />
                </CardContent>
           </Card>
        </div>
      </div>
    );
  }
  
  const handleLogout = () => {
    logout();
    router.push('/');
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
           <Card>
                <CardHeader className="items-center text-center">
                    <Avatar className="h-24 w-24 text-3xl">
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-center">
                        <CardTitle className="text-2xl mt-4">{user.name}</CardTitle>
                        <CardDescription>{user.email}</CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <div className="space-y-4">
                        <Button variant="outline" className="w-full justify-start text-base py-6">
                            <User className="mr-4" /> Edit Profile
                        </Button>
                        <Button variant="outline" className="w-full justify-start text-base py-6">
                            <ShoppingBag className="mr-4" /> Order History
                        </Button>
                        {user.role === 'admin' && (
                             <Button asChild variant="outline" className="w-full justify-start text-base py-6 border-primary/50 text-primary hover:text-primary hover:bg-primary/5">
                                <Link href="/admin">
                                    <ShieldCheck className="mr-4" /> Admin Dashboard
                                </Link>
                            </Button>
                        )}
                    </div>

                    <Button onClick={handleLogout} variant="destructive" className="w-full mt-4 text-base py-6">
                        Logout
                    </Button>
                </CardContent>
           </Card>
        </div>
    </div>
  );
}
