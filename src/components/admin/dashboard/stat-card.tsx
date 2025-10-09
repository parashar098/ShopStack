
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CountUp from "@/components/ui/count-up";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    icon: keyof typeof Icons;
    footerText: string;
}

export default function StatCard({ title, value, icon, footerText }: StatCardProps) {
    const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
    const isCurrency = value.includes('₹');
    
    const IconComponent = Icons[icon] as LucideIcon;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{title}</CardTitle>
                {IconComponent && <IconComponent className="h-4 w-4 text-muted-foreground" />}
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                    {isCurrency && '₹'}
                    <CountUp
                        to={numericValue}
                        from={0}
                        duration={2}
                        separator=","
                        decimals={isCurrency ? 2 : 0}
                    />
                </div>
                <p className="text-xs text-muted-foreground">{footerText}</p>
            </CardContent>
        </Card>
    );
}
