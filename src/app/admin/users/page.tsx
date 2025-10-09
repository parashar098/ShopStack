
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function AdminUsersPage() {
    return (
         <div className="space-y-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-headline font-bold">Users</h1>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Coming Soon</CardTitle>
                    <CardDescription>User management functionality is currently under development.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>This page will allow you to view, manage, and assign roles to users.</p>
                </CardContent>
             </Card>
        </div>
    )
}
