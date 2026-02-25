import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiLink, FiTrendingUp, FiClock, FiZap } from "react-icons/fi";
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
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  const totalClicks = stats.topClickedUrls.reduce((sum, url) => sum + url.clicks, 0);
  const urlLimitReached = stats.totalUrls >= 100;

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-base-content/70">Welcome back! Here's your URL overview</p>
        </div>

        {/* Alert for limit reached */}
        {urlLimitReached && (
          <div className="alert alert-warning mb-6 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <h3 className="font-bold">Limit Reached!</h3>
              <p className="text-sm">You've reached your free tier limit of 100 URLs.</p>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total URLs Card */}
          <div className="stats shadow-lg bg-linear-to-br from-primary to-primary-focus text-primary-content">
            <div className="stat">
              <div className="stat-figure text-primary-content/50">
                <FiLink size={40} />
              </div>
              <div className="stat-title text-primary-content/80">Total URLs</div>
              <div className="stat-value">{stats.totalUrls}</div>
              <div className="stat-desc text-primary-content/60">
                {urlLimitReached ? "Limit reached" : `${100 - stats.totalUrls} remaining`}
              </div>
            </div>
          </div>

          {/* Total Clicks Card */}
          <div className="stats shadow-lg bg-linear-to-br from-secondary to-secondary-focus text-secondary-content">
            <div className="stat">
              <div className="stat-figure text-secondary-content/50">
                <FiZap size={40} />
              </div>
              <div className="stat-title text-secondary-content/80">Total Clicks</div>
              <div className="stat-value">{totalClicks}</div>
              <div className="stat-desc text-secondary-content/60">Across all URLs</div>
            </div>
          </div>

          {/* Quick Action Card */}
          <div className="stats shadow-lg hover:shadow-xl transition-shadow bg-base-100 cursor-pointer">
            <Link to="/dashboard/create" className="stat">
              <div className="stat-figure text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
              <div className="stat-title">Quick Action</div>
              <div className="stat-value text-accent text-2xl">Create URL</div>
              <div className="stat-desc">Shorten a new link</div>
            </Link>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Last Created URLs */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                <FiClock className="text-info" />
                Recent URLs
              </h2>

              {!stats.lastCreatedUrls.length ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📎</div>
                  <p className="text-base-content/60">No URLs created yet</p>
                  <Link to="/dashboard/create" className="btn btn-primary btn-sm mt-4">
                    Create Your First URL
                  </Link>
                </div>
              ) : (
                <div className="space-y-3">
                  {stats.lastCreatedUrls.map((url, index) => (
                    <div
                      key={url.shortCode}
                      className="p-4 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="badge badge-sm badge-ghost">{index + 1}</span>
                            <a
                              href={`${config.red_url}/${url.shortCode}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-mono text-sm text-primary hover:underline truncate"
                            >
                              /{url.shortCode}
                            </a>
                          </div>
                          <p className="text-xs text-base-content/60 truncate">
                            {url.originalUrl}
                          </p>
                          <p className="text-xs text-base-content/40 mt-1">
                            {new Date(url.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="badge badge-outline gap-1">
                          <FiZap size={12} />
                          {url.clicks}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {stats.lastCreatedUrls.length > 0 && (
                <div className="card-actions justify-end mt-4">
                  <Link to="/dashboard/list" className="link link-primary text-sm">
                    View all URLs →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Top Clicked URLs */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">
                <FiTrendingUp className="text-success" />
                Top Performers
              </h2>

              {!stats.topClickedUrls.length ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📊</div>
                  <p className="text-base-content/60">No clicks yet</p>
                  <p className="text-xs text-base-content/40 mt-2">
                    Share your URLs to see stats here
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {stats.topClickedUrls.map((url, index) => {
                    const maxClicks = Math.max(...stats.topClickedUrls.map((u) => u.clicks));
                    const percentage = maxClicks > 0 ? (url.clicks / maxClicks) * 100 : 0;

                    return (
                      <div
                        key={url.shortCode}
                        className="p-4 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`badge badge-sm ${
                                  index === 0
                                    ? "badge-warning"
                                    : index === 1
                                    ? "badge-info"
                                    : "badge-ghost"
                                }`}
                              >
                                #{index + 1}
                              </span>
                              <a
                                href={`${config.red_url}/${url.shortCode}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-sm text-primary hover:underline truncate"
                              >
                                /{url.shortCode}
                              </a>
                            </div>
                            <p className="text-xs text-base-content/60 truncate">
                              {url.originalUrl}
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-success">{url.clicks}</div>
                            <div className="text-xs text-base-content/40">clicks</div>
                          </div>
                        </div>
                        <progress
                          className="progress progress-success w-full"
                          value={percentage}
                          max="100"
                        ></progress>
                      </div>
                    );
                  })}
                </div>
              )}

              {stats.topClickedUrls.length > 0 && (
                <div className="card-actions justify-end mt-4">
                  <Link to="/dashboard/analytics" className="link link-success text-sm">
                    View analytics →
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DHome;
