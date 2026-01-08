import React, { useState } from "react";
import config from "../../config";
import Swal from "sweetalert2";

const CreateURL = () => {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);

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
      Swal.fire("Error", "Please enter a URL", "error");
      return;
    }

    if (!isValidUrl(originalUrl.trim())) {
      Swal.fire("Error", "Please enter a valid URL", "error");
      return;
    }

    setLoading(true);
    setShortUrl("");

    try {
      // API call stays with api_url
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
        // Displayed URL for redirect uses red_url
        const newShortUrl = `${config.red_url}/${data.data.shortCode}`;
        setShortUrl(newShortUrl);
      } else {
        throw new Error(data.message || "Failed to create short URL");
      }
    } catch (error: any) {
      Swal.fire("Error", error.message || "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!shortUrl) return;
    navigator.clipboard.writeText(shortUrl).then(() => {
      Swal.fire("Copied!", "Short URL copied to clipboard.", "success");
    });
  };

  const handleOpen = () => {
    if (!shortUrl) return;
    window.open(shortUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-6">Create a Shortened URL</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="url"
          placeholder="Paste your long URL here"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          required
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Short URL"}
        </button>
      </form>

      {shortUrl && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg flex flex-col items-center gap-3">
          <p className="break-all text-lg font-mono">{shortUrl}</p>

          <button
            onClick={handleCopy}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
          >
            Copy to Clipboard
          </button>

          <button
            onClick={handleOpen}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition"
          >
            Open Link
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateURL;
