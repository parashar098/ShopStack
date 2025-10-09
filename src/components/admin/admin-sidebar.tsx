
"use client";

import { usePathname, useRouter } from "next/navigation";
import {
    Sidebar,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarContent,
    SidebarTrigger,
    SidebarFooter,
} from "@/components/ui/sidebar";
import { Package, Package2, ShoppingCart, Home, Users, LogOut } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAuth } from "@/hooks/use-auth";

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();
  const router = useRouter();
  const isActive = (path: string) => pathname === path;

  const handleLogout = () => {
    logout();
    router.push('/admin/login');
  }

  return (
    <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center justify-between p-2">
                <Link href="/admin/(protected)" className="flex items-center gap-2 font-headline text-lg font-semibold">
                    <Package2 className="h-6 w-6 text-sidebar-primary"/>
                    <span>ShopStack</span>
                </Link>
                <SidebarTrigger className="text-sidebar-foreground"/>
            </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/admin/(protected)")}>
                        <Link href="/admin/(protected)">
                            <Home />
                            <span>Dashboard</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/admin/(protected)/products")}>
                        <Link href="/admin/(protected)/products">
                            <Package />
                            <span>Products</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/admin/(protected)/orders")}>
                        <Link href="/admin/(protected)/orders">
                            <ShoppingCart />
                            <span>Orders</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/admin/(protected)/users")}>
                        <Link href="/admin/(protected)/users">
                            <Users />
                            <span>Users</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="flex flex-col gap-2">
            <Button variant="ghost" onClick={handleLogout} className="justify-start w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
            <Button variant="outline" asChild className="justify-start w-full bg-transparent border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <Link href="/">
                    Back to Store
                </Link>
            </Button>
        </SidebarFooter>
    </Sidebar>
  );
}
