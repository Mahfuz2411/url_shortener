import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Crown, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../hooks/useAuth";
import config from "../config";

const PaymentSuccess = () => {
  const { setUser } = useAuth();

  // Re-fetch user so the UI reflects the new pro-user status
  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await fetch(`${config.api_url}/user/me`, { credentials: "include" });
        const data = await res.json();
        if (res.ok && data.success) setUser(data.data);
      } catch {
        // silently ignore
      }
    };
    refresh();
  }, [setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full text-center"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center mx-auto mb-6"
        >
          <Crown className="h-10 w-10 text-primary" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 dark:bg-green-900/40 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 text-sm font-medium mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Payment Successful
          </div>

          <h1 className="text-4xl font-bold mb-3 tracking-tight">Welcome to Pro!</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Your account has been upgraded to <strong className="text-foreground">QuickShort Pro</strong>.
            You now have unlimited URLs, instant redirects, custom short codes, and full analytics.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/dashboard/create">
              <Button size="lg" className="w-full sm:w-auto">
                Create a URL <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
            <Link to="/dashboard/analytics">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                View Analytics
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
