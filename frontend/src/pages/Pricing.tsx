import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, X, Info, Sparkles, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import config from "../config";

const freePlanFeatures = [
  { text: "Up to 100 Short URLs", included: true },
  { text: "Analytics & click tracking", included: true },
  { text: "instant redirect", included: false },
  { text: "Custom short codes", included: false },
];

const premiumPlanFeatures = [
  { text: "Unlimited Short URLs", included: true },
  { text: "Analytics & click tracking", included: true },
  { text: "instant redirect", included: true },
  { text: "Custom short codes", included: true },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const Pricing = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const isPro = user?.status === "pro-user" || user?.status === "admin";

  const handleUpgrade = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`${config.api_url}/payment/initiate`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();
      if (data.success && data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment initiation failed. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-background mb-6"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">Simple, transparent pricing</span>
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">Pricing Plans</h1>
          <p className="text-xl text-muted-foreground">Choose the perfect plan for your needs</p>
        </motion.div>

        {/* Pricing Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {/* Free Plan */}
          <motion.div variants={itemVariants}>
            <Card className="h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-3xl">Free</CardTitle>
                  </div>
                  <span className="text-2xl font-bold text-muted-foreground">$0<span className="text-base font-normal">/month</span></span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-4 mb-8 flex-1">
                  {freePlanFeatures.map((feature, index) => (
                    <motion.li
                      key={feature.text}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.07 }}
                      className="flex items-center gap-3"
                    >
                      {feature.included ? (
                        <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center shrink-0">
                          <X className="h-3 w-3 text-muted-foreground" />
                        </div>
                      )}
                      <span className={feature.included ? "" : "text-muted-foreground"}>
                        {feature.text}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                <div>
                  {user ? (
                    isPro ? (
                      <Button className="w-full" size="lg" variant="outline" disabled>
                        Included in Pro
                      </Button>
                    ) : (
                      <Link to="/dashboard/create" className="w-full block">
                        <Button className="w-full" size="lg" variant="outline">
                          <Crown className="h-4 w-4 mr-2" /> Current Plan
                        </Button>
                      </Link>
                    )
                  ) : (
                    <Link to="/register" className="w-full block">
                      <Button variant="outline" className="w-full" size="lg">
                        Get Started Free
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Premium Plan */}
          <motion.div variants={itemVariants}>
            <Card className="h-full flex flex-col relative border-2 border-primary/30 hover:border-primary/60 transition-colors hover:shadow-xl hover:shadow-primary/10">
              {/* Popular Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -top-3 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full flex items-center gap-1"
              >
                <Crown className="h-3 w-3" /> MOST POPULAR
              </motion.div>

              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-primary" />
                    <CardTitle className="text-3xl">Pro</CardTitle>
                  </div>
                  <span className="text-2xl font-bold">$9<span className="text-base font-normal text-muted-foreground">/month</span></span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-4 mb-8 flex-1">
                  {premiumPlanFeatures.map((feature, index) => (
                    <motion.li
                      key={feature.text}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.07 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center shrink-0">
                        <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                      </div>
                      <span>{feature.text}</span>
                    </motion.li>
                  ))}
                </ul>

                <div>
                  {isPro ? (
                    <Button className="w-full" size="lg" disabled>
                      <Crown className="h-4 w-4 mr-2" /> Current Plan
                    </Button>
                  ) : user ? (
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleUpgrade}
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Connecting to payment...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Crown className="h-4 w-4" /> Upgrade to Pro — $9/mo
                        </span>
                      )}
                    </Button>
                  ) : (
                    <Link to="/login" className="w-full block">
                      <Button className="w-full" size="lg">
                        <Crown className="h-4 w-4 mr-2" /> Login to Upgrade
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Info Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="max-w-3xl mx-auto mt-12"
        >
          <Card className="border-blue-200 dark:border-blue-900 bg-blue-50/50 dark:bg-blue-950/30">
            <CardContent className="p-6 flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center shrink-0">
                <Info className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Secure Payment via SSLCommerz</h3>
                <p className="text-sm text-muted-foreground">
                  Payments are processed securely through SSLCommerz — Bangladesh's most trusted
                  payment gateway. Supports Visa, Mastercard, bKash, Nagad, Rocket, and all major
                  internet banking options. Your account is upgraded instantly after successful payment.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Pricing;
