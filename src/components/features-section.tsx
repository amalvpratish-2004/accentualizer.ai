import { Card } from "@/components/ui/card"
import { Mic, Brain, Target, TrendingUp, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Advanced machine learning algorithms analyze your speech patterns with precision and provide detailed insights.",
  },
  {
    icon: Target,
    title: "Accent Detection",
    description: "Identify your current accent profile and understand regional pronunciation patterns in your speech.",
  },
  {
    icon: TrendingUp,
    title: "Progress Tracking",
    description: "Monitor your improvement over time with detailed analytics and personalized progress reports.",
  },
  {
    icon: Mic,
    title: "High-Quality Recording",
    description:
      "Professional-grade audio processing ensures accurate analysis of your pronunciation and speech patterns.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Your voice recordings are processed securely and never stored permanently. Complete privacy guaranteed.",
  },
  {
    icon: Zap,
    title: "Instant Results",
    description: "Get immediate feedback and actionable suggestions to improve your English pronunciation right away.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features for Perfect Pronunciation</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our advanced AI technology provides comprehensive accent analysis and personalized feedback
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
