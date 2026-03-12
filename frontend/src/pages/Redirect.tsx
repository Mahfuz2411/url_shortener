import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, AlertCircle } from "lucide-react";
import config from "../config";
import { Button } from "@/components/ui/button";

const Redirect = () => {
  const { shortCode } = useParams<{ shortCode: string }>();
  const [originalUrl, setOriginalUrl] = useState<string | null>(null);
  const [waitSeconds, setWaitSeconds] = useState<number>(0);
  const [countdown, setCountdown] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const res = await fetch(`${config.api_url}/redirect/${shortCode}`);
        const data = await res.json();
        if (!res.ok || !data.success) {
          setError(data.message || "URL not found or inactive");
          return;
        }
        setOriginalUrl(data.originalUrl);
        setWaitSeconds(data.waitSeconds);
        setCountdown(data.waitSeconds);
      } catch {
        setError("Failed to load redirect. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUrl();
  }, [shortCode]);

  useEffect(() => {
    if (originalUrl === null) return;

    if (waitSeconds === 0) {
      window.location.href = originalUrl;
      return;
    }

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          window.location.href = originalUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [originalUrl, waitSeconds]);

  const progress = waitSeconds > 0 ? ((waitSeconds - countdown) / waitSeconds) * 100 : 100;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background gap-4 p-4">
        <div className="flex items-center gap-3 text-destructive">
          <AlertCircle className="h-8 w-8" />
          <h1 className="text-2xl font-bold">Link Not Found</h1>
        </div>
        <p className="text-muted-foreground text-center">{error}</p>
        <Link to="/">
          <Button variant="outline">Go Home</Button>
        </Link>
      </div>
    );
  }

  if (waitSeconds === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Ad Slot */}
      <div className="w-full bg-muted/40 border-b flex items-center justify-center py-3 min-h-22.5 text-sm text-muted-foreground">
        Advertisement
      </div>

      {/* Countdown Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md w-full"
        >
          <h1 className="text-2xl font-bold mb-2">You are being redirected</h1>
          <p className="text-muted-foreground text-sm mb-8 break-all">
            {originalUrl && originalUrl.length > 60
              ? originalUrl.substring(0, 60) + "..."
              : originalUrl}
          </p>

          {/* Circular countdown */}
          <div className="relative mx-auto w-32 h-32 mb-8">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                className="text-muted"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="44"
                fill="none"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                className="text-primary"
                strokeDasharray={`${2 * Math.PI * 44}`}
                strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={countdown}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 0.3 }}
                  className="text-4xl font-bold"
                >
                  {countdown}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-6">
            Redirecting in <span className="font-semibold text-foreground">{countdown}</span> second{countdown !== 1 ? "s" : ""}...
          </p>

          {/* Skip button */}
          <Button
            asChild
            variant="outline"
            className="gap-2"
          >
            <a href={originalUrl!} rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
              Skip Ad
            </a>
          </Button>
        </motion.div>

        {/* Second Ad Slot */}
        <div className="w-full max-w-2xl bg-muted/40 border rounded-lg flex items-center justify-center py-6 min-h-62.5 text-sm text-muted-foreground">
          {/* 
            GOOGLE ADSENSE PLACEHOLDER (rectangle / large)
            Replace with your AdSense <ins> tag
          */}
          Advertisement
        </div>
      </div>

      {/* Footer */}
      <div className="py-4 text-center text-xs text-muted-foreground border-t">
        Powered by{" "}
        <Link to="/" className="hover:underline text-primary">
          ShortURL
        </Link>
      </div>
    </div>
  );
};

export default Redirect;
