

'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ShoppingBag, ShieldCheck, Mail, Phone, Calendar, User as UserIcon, LogOut } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import EditProfileDialog from '@/components/profile/edit-profile-dialog';

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
           <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-48" />
                    <Skeleton className="h-4 w-64" />
                </CardHeader>
                <CardContent className="grid md:grid-cols-3 gap-8 pt-6">
                    <div className="flex flex-col items-center md:border-r md:pr-8">
                        <Skeleton className="h-32 w-32 rounded-full" />
                        <Skeleton className="h-6 w-32 mt-4" />
                        <Skeleton className="h-10 w-full mt-6" />
                    </div>
                    <div className="md:col-span-2 space-y-6">
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                        <Skeleton className="h-5 w-full" />
                    </div>
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

  const DetailItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value?: string }) => (
    <div className="flex items-center gap-4">
        <Icon className="h-5 w-5 text-muted-foreground" />
        <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="font-medium">{value || 'Not set'}</p>
        </div>
    </div>
  );

  return (
    <>
      <EditProfileDialog isOpen={isEditOpen} onOpenChange={setIsEditOpen} />
      <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-4xl mx-auto">
             <Card>
                  <CardHeader>
                      <CardTitle className="text-2xl font-headline">My Profile</CardTitle>
                      <CardDescription>Manage your personal information and account settings.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid md:grid-cols-3 gap-8 pt-6">
                      <div className="flex flex-col items-center text-center md:border-r md:pr-8">
                          <Avatar className="h-32 w-32 text-5xl mb-4 border-2 border-primary">
                              <AvatarImage src={user.profileImage} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <h2 className="text-xl font-semibold">{user.name}</h2>
                          <p className="text-sm text-muted-foreground">{user.role === 'admin' ? 'Administrator' : 'Customer'}</p>
                          <Button onClick={() => setIsEditOpen(true)} className="w-full mt-6">Edit Profile</Button>
                      </div>
                      <div className="md:col-span-2 space-y-6">
                          <DetailItem icon={Mail} label="Email Address" value={user.email} />
                          <Separator />
                          <DetailItem icon={Phone} label="Mobile Number" value={user.phone} />
                          <Separator />
                          <div className="grid grid-cols-2 gap-6">
                             <DetailItem icon={UserIcon} label="Gender" value={user.gender} />
                             <DetailItem icon={Calendar} label="Date of Birth" value={user.dob} />
                          </div>
                          <Separator />
                           <div className="flex flex-wrap gap-4 pt-4">
                                <Button variant="outline">
                                    <ShoppingBag className="mr-2" /> Order History
                                </Button>
                                {user.role === 'admin' && (
                                    <Button asChild variant="outline" className="text-primary border-primary/50 hover:bg-primary/5 hover:text-primary">
                                        <Link href="/admin">
                                            <ShieldCheck className="mr-2" /> Admin Dashboard
                                        </Link>
                                    </Button>
                                )}
                                <Button onClick={handleLogout} variant="ghost" className="text-destructive hover:text-destructive hover:bg-destructive/5 md:ml-auto">
                                  <LogOut className="mr-2" /> Logout
                                </Button>
                            </div>
                      </div>
                  </CardContent>
             </Card>
          </div>
      </div>
    </>
  );
}
