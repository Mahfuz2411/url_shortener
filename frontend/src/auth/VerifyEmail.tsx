import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import config from "../config";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("");
  const [hasVerified, setHasVerified] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token provided");
      return;
    }

    // Prevent duplicate verification calls
    if (!hasVerified) {
      verifyEmail();
    }
  }, [token]);

  const verifyEmail = async () => {
    try {
      setHasVerified(true);
      
      const res = await fetch(`${config.api_url}/auth/verify-email?token=${token}`, {
        method: "GET",
      });

      const result = await res.json();

      if (!res.ok) {
        // Handle already verified case
        if (result.message && result.message.includes('already verified')) {
          setStatus("success");
          setMessage("Your email is already verified! You can login now.");
          setTimeout(() => {
            navigate("/login");
          }, 3000);
          return;
        }
        throw new Error(result.message);
      }

      setStatus("success");
      setMessage(result.message || "Email verified successfully!");

      // Auto redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err: any) {
      setStatus("error");
      setMessage(err.message || "Verification failed. The link may be invalid or expired.");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="text-center">
          <CardHeader className="pb-4">
            {/* Icon Display */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
              className="flex justify-center mb-4"
            >
              {status === "loading" && (
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-primary bg-primary/10">
                  <Loader2 className="text-primary animate-spin h-10 w-10" />
                </div>
              )}
              {status === "success" && (
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-green-500 bg-green-50 dark:bg-green-900/20">
                  <CheckCircle className="text-green-500 h-10 w-10" />
                </div>
              )}
              {status === "error" && (
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full border-2 border-destructive bg-destructive/10">
                  <XCircle className="text-destructive h-10 w-10" />
                </div>
              )}
            </motion.div>

            <CardTitle className="text-2xl">
              {status === "loading" && "Verifying Email..."}
              {status === "success" && "Email Verified!"}
              {status === "error" && "Verification Failed"}
            </CardTitle>
            <CardDescription className="text-base mt-2">{message}</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Status-specific Actions */}
            {status === "success" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
              >
                <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-400 text-sm font-medium">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Redirecting to login...</span>
                </div>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-4"
              >
                <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4">
                  <div className="flex items-center justify-center gap-2 text-destructive text-sm font-medium">
                    <XCircle className="h-4 w-4" />
                    <span>Link may be invalid or expired</span>
                  </div>
                </div>
                <Button asChild className="w-full">
                  <Link to="/login">Go to Login</Link>
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
