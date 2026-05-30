"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Sparkles as SparklesComp } from "@/components/ui/sparkles";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";

// ─── WorkDen Plans ────────────────────────────────────────────────────────────
const plans = [
  {
    name: "Online Typing Work",
    description:
      "Perfect for individuals looking to earn from home with flexible typing & data-entry tasks.",
    price: 999,
    yearlyPrice: 999,
    buttonText: "Get Started — ₹999",
    buttonVariant: "default" as const,
    popular: true,
    refundNote: true,
    includes: [
      "What's included:",
      "Lifetime access to typing work tasks",
      "Access to 100+ daily work assignments",
      "Dedicated support manager",
      "Live project guidance & mentorship",
      "Certificate of completion",
      "Work from anywhere, anytime",
      "Unlimited task submissions",
    ],
  },
  {
    name: "Freelance / Affiliate",
    description:
      "Earn by referring others. Join our affiliate & telecaller program at zero cost.",
    price: 0,
    yearlyPrice: 0,
    buttonText: "Join Free",
    buttonVariant: "outline" as const,
    popular: false,
    refundNote: false,
    includes: [
      "What's included:",
      "Free registration — ₹0 investment",
      "Earn referral commissions",
      "Telecaller opportunities",
      "Affiliate marketing training",
      "Weekly payout via UPI / Bank",
      "No targets, flexible hours",
      "Community access & support",
    ],
  },
];

// ─── Monthly / Yearly Toggle ──────────────────────────────────────────────────
const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-neutral-900 border border-gray-700 p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
            selected === "0" ? "text-white" : "text-gray-200"
          )}
        >
          {selected === "0" && (
            <motion.span
              layoutId="switch"
              className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 to-blue-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">One-time</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
            selected === "1" ? "text-white" : "text-gray-200"
          )}
        >
          {selected === "1" && (
            <motion.span
              layoutId="switch"
              className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 to-blue-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">Free Plan</span>
        </button>
      </div>
    </div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function PricingSection4() {
  const [showFree, setShowFree] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { delay: i * 0.18, duration: 0.5 },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const togglePricingPeriod = (value: string) =>
    setShowFree(Number.parseInt(value) === 1);

  // Show relevant plan based on toggle
  const visiblePlans = showFree
    ? plans.filter((p) => p.price === 0)
    : plans.filter((p) => p.price > 0);

  return (
    <div
      className="min-h-screen mx-auto relative bg-black overflow-x-hidden"
      ref={pricingRef}
    >
      {/* ── Background sparkles grid ── */}
      <TimelineContent
        animationNum={4}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute top-0 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]"
      >
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px]" />
        <SparklesComp
          density={1800}
          speed={1}
          color="#FFFFFF"
          className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
        />
      </TimelineContent>

      {/* ── Blue ellipse glow ── */}
      <TimelineContent
        animationNum={5}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="absolute left-0 top-[-114px] w-full h-[113.625vh] flex flex-col items-start justify-start flex-none overflow-hidden p-0 z-0"
      >
        <div className="framer-1i5axl2">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] flex-none rounded-full"
              style={{
                border: "200px solid #3131f5",
                filter: "blur(92px)",
                WebkitFilter: "blur(92px)",
              }}
            />
          ))}
        </div>
      </TimelineContent>

      {/* ── Hero text ── */}
      <article className="text-center mb-6 pt-32 max-w-3xl mx-auto space-y-4 relative z-50 px-4">
        <h2 className="text-4xl font-medium text-white">
          <VerticalCutReveal
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            reverse={true}
            containerClassName="justify-center"
            transition={{ type: "spring", stiffness: 250, damping: 40, delay: 0 }}
          >
            Plans that work best for you
          </VerticalCutReveal>
        </h2>

        <TimelineContent
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-gray-300 text-base"
        >
          Trusted by thousands of workers across India. Start earning from home today.
        </TimelineContent>

        <TimelineContent
          animationNum={1}
          timelineRef={pricingRef}
          customVariants={revealVariants}
        >
          <PricingSwitch onSwitch={togglePricingPeriod} />
        </TimelineContent>
      </article>

      {/* ── Radial glow overlay ── */}
      <div
        className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at center, #206ce8 0%, transparent 70%)`,
          opacity: 0.6,
          mixBlendMode: "multiply",
        }}
      />

      {/* ── Plan cards ── */}
      <div
        className={cn(
          "grid gap-6 py-8 mx-auto max-w-5xl px-4 relative z-10",
          visiblePlans.length === 1
            ? "md:grid-cols-1 max-w-lg"
            : "md:grid-cols-2"
        )}
      >
        {visiblePlans.map((plan, index) => (
          <TimelineContent
            key={plan.name}
            animationNum={2 + index}
            timelineRef={pricingRef}
            customVariants={revealVariants}
          >
            <Card
              className={cn(
                "relative text-white border-neutral-800 h-full",
                plan.popular
                  ? "bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 shadow-[0px_-13px_300px_0px_#0900ff] z-20"
                  : "bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 z-10"
              )}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}

              <CardHeader className="text-left">
                <h3 className="text-2xl font-bold mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  {plan.price === 0 ? (
                    <span className="text-4xl font-semibold text-green-400">FREE</span>
                  ) : (
                    <>
                      <span className="text-xl font-semibold text-gray-300">₹</span>
                      <NumberFlow
                        value={plan.price}
                        className="text-4xl font-semibold"
                      />
                      <span className="text-gray-300 ml-1 text-sm">/ one-time</span>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-300">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <a
                  href="https://workden.in/register"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "block w-full mb-6 p-4 text-center text-lg font-semibold rounded-xl transition-transform hover:scale-[1.02]",
                    plan.popular
                      ? "bg-gradient-to-t from-blue-500 to-blue-600 shadow-lg shadow-blue-800 border border-blue-500 text-white"
                      : "bg-gradient-to-t from-neutral-950 to-neutral-600 shadow-lg shadow-neutral-900 border border-neutral-800 text-white"
                  )}
                >
                  {plan.buttonText}
                </a>

                <div className="space-y-3 pt-4 border-t border-neutral-700">
                  <h4 className="font-semibold text-sm text-gray-400 uppercase tracking-wider mb-3">
                    {plan.includes[0]}
                  </h4>
                  <ul className="space-y-2">
                    {plan.includes.slice(1).map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <span className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ── Refund Note for ₹999 plan ── */}
                {plan.refundNote && (
                  <div className="mt-6 p-3 rounded-xl bg-amber-950/60 border border-amber-700/50">
                    <p className="text-xs text-amber-300 leading-relaxed">
                      <span className="font-bold">⚠️ Note:</span> Refund is not available once
                      the ID is activated. Please read all terms before purchasing.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TimelineContent>
        ))}
      </div>

      {/* ── Bottom trust bar ── */}
      <TimelineContent
        animationNum={6}
        timelineRef={pricingRef}
        customVariants={revealVariants}
        className="relative z-10 text-center pb-16 px-4"
      >
        <div className="inline-flex flex-wrap gap-4 justify-center mt-4">
          {["🔒 Secure Payment", "📞 24/7 Support", "🏆 10,000+ Members", "💸 Weekly Payouts"].map(
            (badge) => (
              <span
                key={badge}
                className="bg-neutral-900 border border-neutral-700 text-gray-300 text-xs font-semibold px-4 py-2 rounded-full"
              >
                {badge}
              </span>
            )
          )}
        </div>
      </TimelineContent>
    </div>
  );
}
