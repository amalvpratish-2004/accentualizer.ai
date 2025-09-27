import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"
import Image from "next/image"

const SignInView = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-muted">
      {/* Left side illustration */}
      <div className="hidden md:flex w-1/2 flex-col items-center justify-center bg-muted px-10">
        <div className="max-w-md text-center space-y-6">
          <Image
            src="/speech-coach-illustration.png" // 👉 replace with your custom SVG/PNG
            alt="Speech coaching illustration"
            width={400}
            height={400}
            className="mx-auto"
          />
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Accentualizer.ai</h1>
            <p className="text-muted-foreground">
              Unlock your best English accent with our AI-powered speech coach.
            </p>
          </div>
        </div>
      </div>


      {/* Right side form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-semibold">Sign in</CardTitle>
              <CardDescription>Access your account to continue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Email form */}
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Username or Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="johnsmith007"
                    className="bg-input border-2 border-border/30 focus:border-primary/50"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      href="/forgot-password"
                      className="text-sm text-primary hover:text-primary/80 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="********"
                    className="bg-input border-2 border-border/30 focus:border-primary/50"
                  />
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Sign in
                </Button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">or</span>
                </div>
              </div>

              {/* Google sign-in */}
              <Button variant="outline" className="w-full bg-transparent">
                <Mail className="h-4 w-4 mr-2" />
                Sign in with Google
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Are you new?{" "}
                <Link href="/sign-up" className="text-primary hover:text-primary/80 font-medium">
                  Create an Account
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SignInView
