import { useEffect, useState } from "react";
import config from "../../config";

interface UrlStats {
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
}

interface StatsResponse {
  totalUrls: number;
  lastCreatedUrls: UrlStats[];
  topClickedUrls: UrlStats[];
  urlLimitReached: boolean;
}

const DHome = () => {
  const [stats, setStats] = useState<StatsResponse>({
    totalUrls: 0,
    lastCreatedUrls: [],
    topClickedUrls: [],
    urlLimitReached: false,
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
            lastCreatedUrls: data.data.lastUrls ?? [],       // fixed key
            topClickedUrls: data.data.topUrls ?? [],         // fixed key
            urlLimitReached: data.data.urlLimitReached ?? false,
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
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 flex flex-col items-center">
      {stats.urlLimitReached && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded w-full max-w-4xl text-center">
          You have reached your free tier limit of 100 URLs.
        </div>
      )}

      <h1 className="text-3xl font-bold mb-8">Dashboard Home</h1>

      <p className="mb-8 text-xl">
        <span className="font-semibold">Total URLs created: </span>
        {stats.totalUrls}
      </p>

      {/* Last Created URLs */}
      <section className="w-full max-w-4xl mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Last Created URLs
        </h2>
        {!stats.lastCreatedUrls.length ? (
          <p className="text-center text-gray-500">No URLs created yet.</p>
        ) : (
          <div className="overflow-auto border rounded">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Original URL</th>
                  <th className="p-3">Short Code</th>
                  <th className="p-3">Short URL</th>
                  <th className="p-3">Clicks</th>
                  <th className="p-3">Created At</th>
                </tr>
              </thead>
              <tbody>
                {stats.lastCreatedUrls.map((url) => (
                  <tr
                    key={url.shortCode}
                    className="border-t hover:bg-gray-50 cursor-default"
                  >
                    <td
                      className="p-3 max-w-xs truncate"
                      title={url.originalUrl}
                    >
                      {url.originalUrl.length > 50
                        ? url.originalUrl.slice(0, 47) + "..."
                        : url.originalUrl}
                    </td>
                    <td className="p-3">{url.shortCode}</td>
                    <td className="p-3 text-blue-600 hover:underline">
                      <a
                        href={url.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {url.shortUrl}
                      </a>
                    </td>
                    <td className="p-3">{url.clicks}</td>
                    <td className="p-3">
                      {new Date(url.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Top Clicked URLs */}
      <section className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Top Clicked URLs
        </h2>
        {!stats.topClickedUrls.length ? (
          <p className="text-center text-gray-500">No clicks recorded yet.</p>
        ) : (
          <div className="overflow-auto border rounded">
            <table className="w-full text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3">Original URL</th>
                  <th className="p-3">Short Code</th>
                  <th className="p-3">Short URL</th>
                  <th className="p-3">Clicks</th>
                  <th className="p-3">Created At</th>
                </tr>
              </thead>
              <tbody>
                {stats.topClickedUrls.map((url) => (
                  <tr
                    key={url.shortCode}
                    className="border-t hover:bg-gray-50 cursor-default"
                  >
                    <td
                      className="p-3 max-w-xs truncate"
                      title={url.originalUrl}
                    >
                      {url.originalUrl.length > 50
                        ? url.originalUrl.slice(0, 47) + "..."
                        : url.originalUrl}
                    </td>
                    <td className="p-3">{url.shortCode}</td>
                    <td className="p-3 text-blue-600 hover:underline">
                      <a
                        href={url.shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {url.shortUrl}
                      </a>
                    </td>
                    <td className="p-3">{url.clicks}</td>
                    <td className="p-3">
                      {new Date(url.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default DHome;
