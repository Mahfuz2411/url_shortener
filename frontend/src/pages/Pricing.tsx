import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, X, Info, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const freePlanFeatures = [
  { text: "Up to 100 Short URLs", included: true },
  { text: "Basic Dashboard", included: true },
  { text: "Click analytics hidden", included: false },
  { text: "Advanced analytics unavailable", included: false },
];

const premiumPlanFeatures = [
  { text: "Unlimited Short URLs", included: true },
  { text: "Full Dashboard Access", included: true },
  { text: "Click analytics (IP, country, time)", included: true },
  { text: "Advanced URL stats & reports", included: true },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const Pricing = () => {
  const { user } = useAuth();

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
          <h1 className="text-5xl md:text-6xl font-bold mb-4 tracking-tight">
            Pricing Plans
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose the perfect plan for your needs
          </p>
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
                <CardTitle className="text-3xl">Free</CardTitle>
                <CardDescription className="text-base">
                  Perfect for individuals trying out our URL shortener.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="mb-8">
                  <span className="text-5xl font-bold">$0</span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {freePlanFeatures.map((feature, index) => (
                    <motion.li
                      key={feature.text}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      {feature.included ? (
                        <div className="w-5 h-5 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                          <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 rounded-full bg-muted flex items-center justify-center">
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
                    <Link to="/dashboard/create" className="w-full block">
                      <Button className="w-full" size="lg">
                        Create URL
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/login" className="w-full block">
                      <Button variant="outline" className="w-full" size="lg">
                        Login to Use
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Premium Plan */}
          <motion.div variants={itemVariants}>
            <Card className="h-full flex flex-col relative border-2 border-primary/20 hover:border-primary/40 transition-colors hover:shadow-lg">
              {/* Coming Soon Badge */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -top-3 right-4 px-3 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full"
              >
                COMING SOON
              </motion.div>

              <CardHeader className="pb-4">
                <CardTitle className="text-3xl">Premium</CardTitle>
                <CardDescription className="text-base">
                  Advanced analytics, unlimited URLs, and more.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="mb-8">
                  <span className="text-5xl font-bold">$9</span>
                  <span className="text-muted-foreground">/month</span>
                </div>

                <ul className="space-y-4 mb-8 flex-1">
                  {premiumPlanFeatures.map((feature, index) => (
                    <motion.li
                      key={feature.text}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span>{feature.text}</span>
                    </motion.li>
                  ))}
                </ul>

                <div>
                  <Button disabled className="w-full" size="lg" variant="secondary">
                    Coming Soon
                  </Button>
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
                <h3 className="font-semibold mb-1">Note</h3>
                <p className="text-sm text-muted-foreground">
                  Free tier requires login to create URLs. Free plan limits URL creation to 100 links. Analytics for free users are not visible. Premium unlocks full analytics including IP, country, click time, and more.
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
