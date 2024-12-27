import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { createFileRoute, Link } from '@tanstack/react-router'
import { CheckCircle, Code, Zap } from 'lucide-react'
import * as React from 'react'

export const Route = createFileRoute('/')({
  component: HomeComponent,
  context: () => ({
    segment: 'Home',
  }),
})

function HomeComponent() {
  return (
    <Card className="min-h-full">
      <CardContent>
        <div className="container mx-auto px-4 py-8">
          {/* Hero Section */}
          <section className="py-20 text-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight lg:text-5xl">
              Testing Made Libre
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-muted-foreground">
              Streamline testing showcase with easy-to-use automatic testing web
              UI.
            </p>
            <Button size="lg" asChild>
              <Link to="/homework/triangle-judge" search={{ tab: 'question' }} preload='viewport'>
                Get Started
              </Link>
            </Button>
          </section>

          {/* Feature Highlights */}
          <section className="mb-4">
            <h2 className="mb-12 text-center text-3xl font-bold">
              Battery Included
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <FeatureCard
                icon={<Zap className="size-8 shrink-0 text-primary" />}
                title="Lightning Fast"
                description="Run your tests in record time with Web Workers."
              />
              <FeatureCard
                icon={<Code className="size-8 shrink-0 text-primary" />}
                title="Smooth Experience"
                description="Intuitive UI shipped with rich interactions."
              />
              <FeatureCard
                icon={<CheckCircle className="size-8 shrink-0 text-primary" />}
                title="Comprehensive Insights"
                description="Clear and detailed insights from your test runs."
              />
            </div>
          </section>
        </div>
      </CardContent>
    </Card>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-start space-x-2">
          {icon}
          <span className="hyphens-auto break-all leading-8">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
