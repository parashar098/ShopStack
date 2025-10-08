
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecentActivityCard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">No recent activity to display.</p>
            </CardContent>
        </Card>
    );
}
