import { Header } from "@/components/header"
import { VoiceRecorder } from "@/components/voice-recorder"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function AnalyzePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">Analyze Your Accent</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Record yourself reading the sample text below, and our AI will analyze your accent patterns and provide
              personalized feedback.
            </p>
          </div>

          <VoiceRecorder />
        </div>
      </div>
    </main>
  )
}
