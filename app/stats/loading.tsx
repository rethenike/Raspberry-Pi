import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Loading() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Raspberry Pi</h1>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Loading System Information...</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex justify-between">
                <div className="h-4 bg-muted rounded w-24 animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-32 animate-pulse"></div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="h-6 bg-muted rounded w-32 animate-pulse"></div>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-1">
                <div className="flex justify-between">
                  <div className="h-3 bg-muted rounded w-16 animate-pulse"></div>
                  <div className="h-3 bg-muted rounded w-12 animate-pulse"></div>
                </div>
                <div className="h-2 bg-muted rounded w-full animate-pulse"></div>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            <div className="h-6 bg-muted rounded w-40 animate-pulse"></div>
            <div className="flex justify-between">
              <div className="h-3 bg-muted rounded w-16 animate-pulse"></div>
              <div className="h-3 bg-muted rounded w-32 animate-pulse"></div>
            </div>
            <div className="h-2 bg-muted rounded w-full animate-pulse"></div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
