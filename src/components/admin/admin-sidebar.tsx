
"use client";

import { usePathname } from "next/navigation";
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

export default function AdminSidebar() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  return (
    <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border">
            <div className="flex items-center justify-between p-2">
                <Link href="/admin" className="flex items-center gap-2 font-headline text-lg font-semibold">
                    <Package2 className="h-6 w-6 text-sidebar-primary"/>
                    <span>ShopStack</span>
                </Link>
                <SidebarTrigger className="text-sidebar-foreground"/>
            </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/admin")}>
                        <Link href="/admin">
                            <Home />
                            <span>Dashboard</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/admin/products")}>
                        <Link href="/admin/products">
                            <Package />
                            <span>Products</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/admin/orders")}>
                        <Link href="/admin/orders">
                            <ShoppingCart />
                            <span>Orders</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <SidebarMenuButton asChild isActive={isActive("/admin/users")}>
                        <Link href="/admin/users">
                            <Users />
                            <span>Users</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <Button variant="ghost" asChild className="justify-start w-full">
                <Link href="/">
                    <LogOut className="mr-2 h-4 w-4" />
                    Back to Store
                </Link>
            </Button>
        </SidebarFooter>
    </Sidebar>
  );
}
