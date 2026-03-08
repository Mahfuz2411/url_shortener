import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, Copy, ExternalLink, Check, Sparkles } from "lucide-react";
import config from "../../config";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const CreateURL = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!originalUrl.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a URL",
      });
      return;
    }

    if (!isValidUrl(originalUrl.trim())) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid URL",
      });
      return;
    }

    setLoading(true);
    setShortUrl("");
    setCopied(false);

    try {
      const res = await fetch(`${config.api_url}/url/create`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: originalUrl.trim() }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create short URL");
      }

      const data = await res.json();

      if (data.success) {
        const newShortUrl = `${config.red_url}/${data.data.shortCode}`;
        setShortUrl(newShortUrl);
        toast({
          title: "Success!",
          description: "Your short URL has been created",
        });
      } else {
        throw new Error(data.message || "Failed to create short URL");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleOpen = () => {
    if (!shortUrl) return;
    window.open(shortUrl, "_blank", "noopener,noreferrer");
  };

  const handleReset = () => {
    setOriginalUrl("");
    setShortUrl("");
    setCopied(false);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Create Short URL</h1>
          <p className="text-muted-foreground">Paste your long URL and get a short, shareable link</p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="h-5 w-5" />
                URL Shortener
              </CardTitle>
              <CardDescription>
                Enter your long URL below to generate a short link
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="url">Original URL</Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://example.com/very-long-url-that-needs-shortening..."
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    className="text-sm"
                  />
                </div>

                <Button type="submit" disabled={loading} className="w-full" size="lg">
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                      />
                      Creating...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Shorten URL
                    </div>
                  )}
                </Button>
              </form>

              {/* Result Section */}
              <AnimatePresence>
                {shortUrl && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-8 overflow-hidden"
                  >
                    <div className="border-t pt-6">
                      <Label className="text-sm font-medium">Your Short URL</Label>
                      <div className="mt-2 flex items-center gap-2">
                        <div className="flex-1 p-3 bg-muted rounded-lg font-mono text-sm break-all">
                          {shortUrl}
                        </div>
                      </div>

                      <div className="flex gap-2 mt-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleCopy}
                          className="flex-1 gap-2"
                        >
                          {copied ? (
                            <>
                              <Check className="h-4 w-4 text-green-500" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4" />
                              Copy
                            </>
                          )}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleOpen}
                          className="flex-1 gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Open
                        </Button>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleReset}
                        className="w-full mt-4"
                      >
                        Create Another
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8"
        >
          <Card className="bg-muted/50">
            <CardContent className="p-6">
              <h3 className="font-semibold mb-3">Tips for effective short URLs:</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Short URLs are perfect for social media, emails, and SMS
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Track clicks and performance from the dashboard
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  URLs never expire and are always accessible
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateURL;
