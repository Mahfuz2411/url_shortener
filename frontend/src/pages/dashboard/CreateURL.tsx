import React, { useState } from "react";
import config from "../../config";
import Swal from "sweetalert2";
import { FiLink, FiCopy, FiExternalLink, FiCheck } from "react-icons/fi";

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
      Swal.fire("Error", "Please enter a URL", "error");
      return;
    }

    if (!isValidUrl(originalUrl.trim())) {
      Swal.fire("Error", "Please enter a valid URL", "error");
      return;
    }

    setLoading(true);
    setShortUrl("");
    setCopied(false);

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
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Your short URL has been created",
          timer: 2000,
          showConfirmButton: false,
        });
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
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Create Short URL
          </h1>
          <p className="text-base-content/60">
            Transform your long URLs into short, shareable links in seconds
          </p>
        </div>

        {/* Main Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* URL Input */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Enter Long URL</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FiLink className="text-base-content/40" size={20} />
                  </div>
                  <input
                    type="url"
                    placeholder="https://example.com/very/long/url/that/needs/shortening"
                    className="input input-bordered w-full pl-12 focus:input-primary"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Creating...
                  </>
                ) : (
                  <>
                    <FiLink size={18} />
                    Shorten URL
                  </>
                )}
              </button>
            </form>

            {/* Success Result */}
            {shortUrl && (
              <div className="mt-6 space-y-4">
                <div className="divider">Your Short URL</div>

                {/* Short URL Display */}
                <div className="alert alert-success shadow-lg">
                  <div className="flex-1">
                    <FiCheck size={24} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">URL Created Successfully!</p>
                      <p className="text-sm truncate">{shortUrl}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <button
                    onClick={handleCopy}
                    className={`btn ${copied ? "btn-success" : "btn-outline btn-primary"}`}
                  >
                    {copied ? (
                      <>
                        <FiCheck size={18} />
                        Copied!
                      </>
                    ) : (
                      <>
                        <FiCopy size={18} />
                        Copy to Clipboard
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleOpen}
                    className="btn btn-outline btn-secondary"
                  >
                    <FiExternalLink size={18} />
                    Open Link
                  </button>
                </div>

                {/* Create Another */}
                <div className="text-center">
                  <button
                    onClick={handleReset}
                    className="btn btn-ghost btn-sm"
                  >
                    Create Another URL
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="text-center p-4">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold mb-1">Lightning Fast</h3>
            <p className="text-sm text-base-content/60">
              Create short URLs in milliseconds
            </p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">🔒</div>
            <h3 className="font-semibold mb-1">Secure</h3>
            <p className="text-sm text-base-content/60">
              Your links are safe and protected
            </p>
          </div>
          <div className="text-center p-4">
            <div className="text-3xl mb-2">📊</div>
            <h3 className="font-semibold mb-1">Analytics</h3>
            <p className="text-sm text-base-content/60">
              Track clicks and performance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateURL;
