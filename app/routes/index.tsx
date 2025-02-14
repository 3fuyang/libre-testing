import Orb from '@/components/bits/orb'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { createFileRoute, Link } from '@tanstack/react-router'
import { CheckCircle, Code, RocketIcon, Zap } from 'lucide-react'
import { motion, type Variants } from 'motion/react'
import * as React from 'react'
import { useTernaryDarkMode } from 'usehooks-ts'

export const Route = createFileRoute('/')({
  component: HomeComponent,
  context: () => ({
    segment: 'Home',
  }),
})

const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
    y: '2rem',
    filter: 'blur(6px)',
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    filter: 'inherit',
    transition: {
      delay: index * 0.1,
      duration: 0.5,
    },
  }),
}

const featCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: '10%',
  },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: index * 0.1,
      duration: 0.5,
    },
  }),
}

function HomeComponent() {
  const { isDarkMode } = useTernaryDarkMode({
    initializeWithValue: false,
  })

  return (
    <Card className="min-h-full">
      <CardContent className="relative overflow-hidden">
        <div
          className="absolute top-1/2 left-1/2 -translate-1/2 sm:size-80 lg:size-120"
          aria-hidden="true"
        >
          <Orb hue={isDarkMode ? 0 : 150} />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          className="container mx-auto px-4 py-8 relative z-10"
        >
          {/* Hero Section */}
          <section className="py-20 text-center">
            <motion.h1
              custom={0}
              variants={fadeInVariants}
              className="mb-6 text-4xl font-extrabold tracking-wide lg:text-5xl"
            >
              Testing Made Libre
            </motion.h1>
            <motion.p
              custom={1}
              variants={fadeInVariants}
              className="mx-auto mb-8 max-w-2xl text-xl tracking-wide text-muted-foreground"
            >
              Streamline testing showcase with easy-to-use automatic testing web
              UI.
            </motion.p>
            <motion.section custom={2} variants={fadeInVariants}>
              <Button asChild>
                <Link
                  to="/homework/triangle-judge"
                  search={{ tab: 'question' }}
                  preload="viewport"
                  className="group hover:bg-transparent hover:text-foreground focus-visible:bg-transparent focus-visible:text-foreground border-foreground border"
                >
                  Get Started
                  <RocketIcon className="group-hover:-translate-y-0.5 transition-transform duration-200" />
                </Link>
              </Button>
            </motion.section>
          </section>

          {/* Feature Highlights */}
          <motion.section custom={3} variants={fadeInVariants} className="mb-4">
            <h2 className="mb-20 text-center text-3xl font-bold">
              Battery Included
            </h2>
            <ul className="grid gap-8 md:grid-cols-3">
              <motion.li custom={0} variants={featCardVariants}>
                <FeatureCard
                  icon={<Zap className="size-8 shrink-0 text-primary" />}
                  title="Lightning Fast"
                  description="Run your tests in record time with Web Workers."
                />
              </motion.li>
              <motion.li custom={1} variants={featCardVariants}>
                <FeatureCard
                  icon={<Code className="size-8 shrink-0 text-primary" />}
                  title="Smooth Experience"
                  description="Intuitive UI shipped with rich interactions."
                />
              </motion.li>
              <motion.li custom={2} variants={featCardVariants}>
                <FeatureCard
                  icon={
                    <CheckCircle className="size-8 shrink-0 text-primary" />
                  }
                  title="Comprehensive Insights"
                  description="Clear and detailed insights from your test runs."
                />
              </motion.li>
            </ul>
          </motion.section>
        </motion.div>
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
    <Card className="bg-transparent backdrop-blur-md h-full">
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
