import { useEffect, useState } from "react";
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
      Swal.fire("Error", error.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
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

        Swal.fire("Deleted!", "Your URL has been deleted.", "success");
        fetchUrls();
      } catch (error: any) {
        Swal.fire("Error", error.message || "Something went wrong", "error");
      }
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">My Shortened URLs</h2>

      {loading ? (
        <p>Loading...</p>
      ) : urls.length === 0 ? (
        <p>No URLs created yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Original URL</th>
                <th className="border px-4 py-2">Short Code</th>
                <th className="border px-4 py-2">Short URL</th>
                <th className="border px-4 py-2">Clicks</th>
                <th className="border px-4 py-2">Created At</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url) => {
                const redirectUrl = `${config.red_url}/${url.shortCode}`;
                const displayOriginal =
                  url.originalUrl.length > 40
                    ? url.originalUrl.slice(0, 40) + "..."
                    : url.originalUrl;

                return (
                  <tr key={url._id}>
                    <td className="border px-4 py-2 break-all" title={url.originalUrl}>
                      {displayOriginal}
                    </td>
                    <td className="border px-4 py-2 text-center">{url.shortCode}</td>
                    <td className="border px-4 py-2 text-center break-all">
                      <a
                        href={redirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        {redirectUrl}
                      </a>
                    </td>
                    <td className="border px-4 py-2 text-center">{url.clicks}</td>
                    <td className="border px-4 py-2 text-center">
                      {new Date(url.createdAt).toLocaleString()}
                    </td>
                    <td className="border px-4 py-2 text-center flex flex-col gap-1">
                      <button
                        onClick={() => handleDelete(url._id)}
                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-2 rounded"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => window.open(redirectUrl, "_blank")}
                        className="bg-green-600 hover:bg-green-700 text-white py-1 px-2 rounded"
                      >
                        Open Link
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default List;
