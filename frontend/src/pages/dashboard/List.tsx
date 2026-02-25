import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiCopy, FiTrash2, FiExternalLink, FiLink, FiCalendar, FiMousePointer } from "react-icons/fi";
import config from "../../config";
import Swal from "sweetalert2";

interface UrlItem {
  _id: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  createdAt: string;
}

const List = () => {
  const [urls, setUrls] = useState<UrlItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUrls = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${config.api_url}/url/list`, {
        credentials: "include",
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to fetch URLs");
      }

      const data = await res.json();
      if (data.success) {
        setUrls(data.data || []);
      } else {
        throw new Error(data.message || "Failed to fetch URLs");
      }
    } catch (error: any) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Something went wrong",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleDelete = async (id: string, shortCode: string) => {
    const confirm = await Swal.fire({
      title: "Delete URL?",
      text: `This will deactivate /${shortCode}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`${config.api_url}/url/softdelete`, {
          method: "DELETE",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ urlId: id }),
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.message || "Failed to delete URL");
        }

        await Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: "Your URL has been deleted.",
          confirmButtonColor: "#2563eb",
        });
        fetchUrls();
      } catch (error: any) {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Something went wrong",
          confirmButtonColor: "#dc2626",
        });
      }
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
      Toast.fire({
        icon: "success",
        title: "Copied to clipboard!",
      });
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Filter URLs based on search
  const filteredUrls = urls.filter(
    (url) =>
      url.originalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
      url.shortCode.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalClicks = urls.reduce((sum, url) => sum + url.clicks, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <span className="loading loading-bars loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">My URLs</h1>
          <p className="text-base-content/70">Manage all your shortened links</p>
        </div>

        {/* Stats Bar */}
        {urls.length > 0 && (
          <div className="stats stats-vertical lg:stats-horizontal shadow-lg mb-6 w-full">
            <div className="stat">
              <div className="stat-figure text-primary">
                <FiLink size={32} />
              </div>
              <div className="stat-title">Total URLs</div>
              <div className="stat-value text-primary">{urls.length}</div>
              <div className="stat-desc">Active shortened links</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-secondary">
                <FiMousePointer size={32} />
              </div>
              <div className="stat-title">Total Clicks</div>
              <div className="stat-value text-secondary">{totalClicks}</div>
              <div className="stat-desc">Across all URLs</div>
            </div>

            <div className="stat">
              <div className="stat-figure text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-8 h-8 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  ></path>
                </svg>
              </div>
              <div className="stat-title">Avg. Clicks</div>
              <div className="stat-value text-accent">
                {urls.length > 0 ? Math.round(totalClicks / urls.length) : 0}
              </div>
              <div className="stat-desc">Per URL</div>
            </div>
          </div>
        )}

        {/* Search Bar */}
        {urls.length > 0 && (
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by URL or short code..."
              className="input input-bordered w-full max-w-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        )}

        {/* Empty State */}
        {urls.length === 0 ? (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body items-center text-center py-16">
              <div className="text-8xl mb-6">🔗</div>
              <h2 className="card-title text-3xl mb-2">No URLs Yet</h2>
              <p className="text-base-content/60 mb-6">
                Create your first shortened URL to get started!
              </p>
              <Link to="/dashboard/create" className="btn btn-primary btn-lg gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
                Create URL
              </Link>
            </div>
          </div>
        ) : filteredUrls.length === 0 ? (
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body items-center text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No Results Found</h3>
              <p className="text-base-content/60">Try a different search term</p>
            </div>
          </div>
        ) : (
          /* URL Cards Grid */
          <div className="grid grid-cols-1 gap-4">
            {filteredUrls.map((url, index) => {
              const shortUrl = `${config.red_url}/${url.shortCode}`;
              const displayOriginal =
                url.originalUrl.length > 80
                  ? url.originalUrl.slice(0, 80) + "..."
                  : url.originalUrl;

              return (
                <div key={url._id} className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="card-body">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                      {/* Left Section - URL Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="badge badge-neutral badge-sm">{index + 1}</span>
                          <div className="badge badge-outline gap-1">
                            <FiMousePointer size={12} />
                            {url.clicks} clicks
                          </div>
                          <div className="badge badge-ghost badge-sm gap-1">
                            <FiCalendar size={12} />
                            {new Date(url.createdAt).toLocaleDateString()}
                          </div>
                        </div>

                        {/* Original URL */}
                        <div className="mb-3">
                          <label className="text-xs text-base-content/60 uppercase font-semibold">
                            Original URL
                          </label>
                          <p className="text-sm break-all text-base-content/80" title={url.originalUrl}>
                            {displayOriginal}
                          </p>
                        </div>

                        {/* Short URL */}
                        <div className="flex items-center gap-2 flex-wrap">
                          <label className="text-xs text-base-content/60 uppercase font-semibold">
                            Short URL
                          </label>
                          <div className="flex items-center gap-2 bg-base-200 px-3 py-2 rounded-lg flex-1 min-w-0">
                            <code className="text-primary font-mono text-sm truncate flex-1">
                              {shortUrl}
                            </code>
                            <button
                              onClick={() => handleCopy(shortUrl)}
                              className="btn btn-ghost btn-xs btn-square"
                              title="Copy to clipboard"
                            >
                              <FiCopy size={16} />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Right Section - Actions */}
                      <div className="flex lg:flex-col gap-2">
                        <a
                          href={shortUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-sm btn-primary gap-2 flex-1 lg:flex-none"
                        >
                          <FiExternalLink size={16} />
                          Open
                        </a>
                        <button
                          onClick={() => handleCopy(shortUrl)}
                          className="btn btn-sm btn-secondary gap-2 flex-1 lg:flex-none"
                        >
                          <FiCopy size={16} />
                          Copy
                        </button>
                        <button
                          onClick={() => handleDelete(url._id, url.shortCode)}
                          className="btn btn-sm btn-error gap-2 flex-1 lg:flex-none"
                        >
                          <FiTrash2 size={16} />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Info */}
        {urls.length > 0 && (
          <div className="mt-8 text-center text-sm text-base-content/60">
            Showing {filteredUrls.length} of {urls.length} URLs
          </div>
        )}
      </div>
    </div>
  );
};

export default List;
