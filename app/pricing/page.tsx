"use client";
import { cn } from "@/lib/utils";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { IconCheck, IconX } from "@tabler/icons-react";
import { motion } from "motion/react";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      description: "Perfect for getting started",
      features: [
        "Basic AI portfolio generation",
        "quickfolio.dev subdomain",
        "1 portfolio theme",
        "Basic analytics",
        "Community support",
      ],
      limitations: [
        "Quickfolio branding",
        "Limited AI features",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      price: "$5",
      period: "/month",
      description: "For professionals and freelancers",
      features: [
        "Everything in Starter",
        "Custom domain connection",
        "5+ premium themes",
        "AI chatbot (100 conversations/month)",
        "Advanced analytics",
        "Remove branding",
        "Priority email support",
        "Resume updates (3/month)",
        "Fully Featured Analytics dashboard",
      ],
      limitations: [],
      cta: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Premium",
      price: "$15",
      period: "/month",
      description: "For executives and personal brands",
      features: [
        "Everything in Pro",
        "Unlimited AI chatbot conversations",
        "All themes + custom CSS",
        "Unlimited resume updates",
        "SEO optimization tools",
        "Custom theme design support",
        "Priority support + onboarding",
        "Fully Featured Analytics dashboard",
      ],
      limitations: [],
      cta: "Go Premium",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-black">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="font-semibold text-white">quickfolio</a>
          
          <nav className="hidden md:flex gap-8">
            <a href="/" className="text-sm text-zinc-400 hover:text-white">Home</a>
            <a href="/examples" className="text-sm text-zinc-400 hover:text-white">Examples</a>
            <a href="/designs" className="text-sm text-zinc-400 hover:text-white">Designs</a>
            <a href="/pricing" className="text-sm text-white">Pricing</a>
          </nav>
          
          <div className="flex items-center gap-2 sm:gap-4">
            <a href="/dashboard" className="text-sm text-zinc-400 hover:text-white">Dashboard</a>
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
          </div>
        </div>
      </header>

      <div className="pt-32 pb-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6"
            >
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-zinc-400 max-w-2xl mx-auto"
            >
              Choose the perfect plan for your portfolio needs. All plans include AI-powered features.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "relative rounded-3xl p-8 border",
                  plan.popular
                    ? "border-blue-500 bg-gradient-to-b from-blue-500/10 to-transparent"
                    : "border-zinc-800 bg-zinc-900/50"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <p className="text-zinc-400 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    {plan.period && <span className="text-zinc-400">{plan.period}</span>}
                  </div>
                </div>

                <div className="mb-8">
                  <HoverBorderGradient
                    containerClassName="rounded-full w-full"
                    as="button"
                    className={cn(
                      "w-full text-center py-3 font-semibold",
                      plan.popular
                        ? "bg-blue-500 text-white"
                        : "bg-black text-white"
                    )}
                  >
                    {plan.cta}
                  </HoverBorderGradient>
                </div>

                <div className="space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <IconCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-300 text-sm">{feature}</span>
                    </div>
                  ))}
                  {plan.limitations.map((limitation) => (
                    <div key={limitation} className="flex items-start gap-3">
                      <IconX className="w-5 h-5 text-zinc-600 flex-shrink-0 mt-0.5" />
                      <span className="text-zinc-500 text-sm">{limitation}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Need something custom?</h2>
            <p className="text-zinc-400 mb-8">Contact us for enterprise solutions and bulk pricing</p>
            <a href="mailto:hello@quickfolio.in">
              <HoverBorderGradient
                containerClassName="rounded-full"
                className="bg-black text-white px-8 py-3 inline-block"
              >
                Contact Sales
              </HoverBorderGradient>
            </a>
          </div>
        </div>
      </div>

      <footer className="w-full bg-black border-t border-zinc-800 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-zinc-400 text-sm">
              &copy; 2026 quickfolio. All rights reserved. A product by{" "}
              <a
                href="https://42vectors.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-zinc-300 hover:text-white transition"
              >
                42vectors
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
