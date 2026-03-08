import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Link2, TrendingUp, Clock, Zap, AlertTriangle, ExternalLink, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import config from "../../config";

interface UrlStats {
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
}

interface StatsResponse {
  totalUrls: number;
  lastCreatedUrls: UrlStats[];
  topClickedUrls: UrlStats[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
};

const DHome = () => {
  const [stats, setStats] = useState<StatsResponse>({
    totalUrls: 0,
    lastCreatedUrls: [],
    topClickedUrls: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${config.api_url}/url/stats`, {
          credentials: "include",
        });
        const data = await res.json();
        if (data.success) {
          setStats({
            totalUrls: data.data.totalUrls ?? 0,
            lastCreatedUrls: data.data.lastUrls ?? [],
            topClickedUrls: data.data.topUrls ?? [],
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const totalClicks = stats.topClickedUrls.reduce((sum, url) => sum + url.clicks, 0);
  const urlLimitReached = stats.totalUrls >= 100;

  const statsCards = [
    {
      title: "Total URLs",
      value: stats.totalUrls,
      subtitle: "100 max for free tier",
      icon: Link2,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      title: "Total Clicks",
      value: totalClicks,
      subtitle: "All time performance",
      icon: TrendingUp,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      title: "Avg. Clicks/URL",
      value: stats.totalUrls > 0 ? (totalClicks / stats.totalUrls).toFixed(1) : "0",
      subtitle: "Per shortened URL",
      icon: Zap,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const truncateUrl = (url: string, maxLength: number = 40) => {
    if (url.length <= maxLength) return url;
    return url.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your URL overview</p>
        </motion.div>

        {/* Alert for limit reached */}
        {urlLimitReached && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6"
          >
            <Card className="border-yellow-500/50 bg-yellow-50/50 dark:bg-yellow-900/20">
              <CardContent className="p-4 flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-yellow-900 dark:text-yellow-200">Limit Reached!</h3>
                  <p className="text-sm text-yellow-800 dark:text-yellow-300">
                    You've reached your free tier limit of 100 URLs.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {statsCards.map((stat) => (
            <motion.div key={stat.title} variants={itemVariants}>
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                      <p className="text-4xl font-bold mb-1">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                    </div>
                    <div className={`${stat.bgColor} p-3 rounded-lg`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Action */}
        {!urlLimitReached && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <Card className="bg-linear-to-r from-primary/5 to-primary/10">
              <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold mb-1">Create a new short URL</h3>
                  <p className="text-sm text-muted-foreground">
                    {100 - stats.totalUrls} URLs remaining in your free tier
                  </p>
                </div>
                <Link to="/dashboard/create">
                  <Button size="lg" className="gap-2">
                    <PlusCircle className="h-5 w-5" />
                    Create URL
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* URL Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent URLs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent URLs
                </CardTitle>
                <CardDescription>Your latest shortened URLs</CardDescription>
              </CardHeader>
              <CardContent>
                {stats.lastCreatedUrls.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No URLs created yet
                  </p>
                ) : (
                  <div className="space-y-3">
                    {stats.lastCreatedUrls.map((url, index) => (
                      <motion.div
                        key={url.shortCode}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm truncate">
                          {config.red_url}/r/{url.shortCode}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {formatDate(url.createdAt)}
                          </span>
                          <a
                            href={`${config.red_url}/r/${url.shortCode}`}
                          >
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Performing URLs */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Top Performing
                </CardTitle>
                <CardDescription>Your most clicked URLs</CardDescription>
              </CardHeader>
              <CardContent>
                {stats.topClickedUrls.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No clicks recorded yet
                  </p>
                ) : (
                  <div className="space-y-3">
                    {stats.topClickedUrls.map((url, index) => (
                      <motion.div
                        key={url.shortCode}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                            {index + 1}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-sm truncate">
                              {config.red_url}/r/{url.shortCode}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-semibold rounded">
                            {url.clicks} clicks
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DHome;
