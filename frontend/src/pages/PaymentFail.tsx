import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { XCircle, ArrowLeft, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

const PaymentFail = () => {
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
          className="w-24 h-24 rounded-full bg-destructive/10 border-2 border-destructive/30 flex items-center justify-center mx-auto mb-6"
        >
          <XCircle className="h-10 w-10 text-destructive" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 dark:bg-red-900/40 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 text-sm font-medium mb-4">
            <XCircle className="h-3.5 w-3.5" />
            Payment Failed or Cancelled
          </div>

          <h1 className="text-4xl font-bold mb-3 tracking-tight">Payment Unsuccessful</h1>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Your payment could not be completed. No charges have been made.
            You can try again from the Pricing page.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/pricing">
              <Button size="lg" className="w-full sm:w-auto">
                <RefreshCcw className="h-4 w-4 mr-2" /> Try Again
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <ArrowLeft className="h-4 w-4 mr-2" /> Back to Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentFail;
