import { Link, useRouteError } from "react-router-dom";

const ErrorRoute = () => {
  const error: any = useRouteError();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <h1 className="text-6xl font-bold text-red-500 mb-4">
        {error?.status || 404}
      </h1>

      <p className="text-xl text-gray-700 mb-6 text-center">
        {error?.statusText || "Oops! The page you are looking for does not exist."}
      </p>

      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorRoute;
