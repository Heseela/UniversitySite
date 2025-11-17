import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-background">
            <div className="max-w-2xl w-full text-center space-y-8">
                {/* Decorative element */}
                <div className="relative">
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <div className="w-96 h-96 rounded-full bg-primary blur-3xl" />
                    </div>

                    {/* 404 Number */}
                    <div className="relative">
                        <h1 className="text-[12rem] md:text-[16rem] font-bold leading-none tracking-tighter text-primary/10 select-none">
                            404
                        </h1>
                    </div>
                </div>

                {/* Content */}
                <div className="space-y-4 -mt-20 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground text-balance text-shadow-md">Page Not Found</h2>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto text-pretty">
                        The page you&apos;re looking for seems to have wandered off. Let&apos;s get you back on track.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                    <Button asChild size="lg" className="min-w-[160px]">
                        <Link href="/" className="gap-2">
                            <Home className="w-4 h-4" />
                            Go Home
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="min-w-[160px] bg-transparent">
                        <Link href="javascript:history.back()" className="gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            Go Back
                        </Link>
                    </Button>
                </div>

                {/* Decorative accent */}
                <div className="pt-8">
                    <div className="w-16 h-1 bg-accent rounded-full mx-auto" />
                </div>
            </div>
        </div>
    )
}
