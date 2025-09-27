import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Github, Mail, Check } from "lucide-react"

const SignUpView = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Back to home */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        {/* Logo and title */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 text-2xl font-bold">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-primary-foreground rounded-sm" />
            </div>
            Accentualizer.ai
          </div>
          <p className="text-muted-foreground">Create your account to get started</p>
        </div>

        {/* Sign up form */}
        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold">Create account</CardTitle>
            <CardDescription>Join thousands improving their English pronunciation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Social sign up */}
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full bg-transparent">
                <Github className="h-4 w-4 mr-2" />
                GitHub
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                <Mail className="h-4 w-4 mr-2" />
                Google
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>

            {/* Email form */}
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    className="bg-input border-2 border-border/30 focus:border-primary/50 hover:border-border/50 transition-colors text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    className="bg-input border-2 border-border/30 focus:border-primary/50 hover:border-border/50 transition-colors text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  className="bg-input border-2 border-border/30 focus:border-primary/50 hover:border-border/50 transition-colors text-foreground placeholder:text-muted-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  className="bg-input border-2 border-border/30 focus:border-primary/50 hover:border-border/50 transition-colors text-foreground placeholder:text-muted-foreground"
                />
                <div className="text-xs text-muted-foreground space-y-1">
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-green-500" />
                    At least 8 characters
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-muted-foreground" />
                    Contains uppercase and lowercase
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="h-3 w-3 text-muted-foreground" />
                    Contains a number
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <Label htmlFor="terms" className="text-sm text-muted-foreground">
                  I agree to the{" "}
                  <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">Create account</Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/sign-in" className="text-primary hover:text-primary/80 transition-colors font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Features preview */}
        <div className="bg-card/30 border border-border/50 rounded-lg p-4 space-y-3">
          <h3 className="font-medium text-sm">What you&apos;ll get:</h3>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              AI-powered accent analysis
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              Personalized pronunciation feedback
            </div>
            <div className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              Progress tracking and insights
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpView;