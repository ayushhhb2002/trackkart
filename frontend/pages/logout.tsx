import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const Logout = () => {
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (confirmed) {
      const endSessionAndRedirect = async () => {
        setLoading(true);
        try {
          const sessionId = localStorage.getItem("userSessionId");
          if (sessionId) {
            await axios.post("https://trackkart-production.up.railway.app/session/end", {
              sessionId,
            });
            localStorage.removeItem("userSessionId");
            logout();

            // console.log("Session ended on logout");
          }
        } catch (err) {
          console.error("Failed to end session on logout", err);
        } finally {
          setLoading(false);
          timer = setTimeout(() => {
            router.push("/login");
          }, 2000);
        }
      };

      endSessionAndRedirect();
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [confirmed, router]);

  if (!confirmed) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-md rounded px-8 py-10 text-center max-w-sm">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4">
            Are you sure you want to logout?
          </h1>
          <div className="flex justify-center gap-6">
            <button
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded"
              onClick={() => setConfirmed(true)}
            >
              Yes
            </button>
            <button
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded"
              onClick={() => router.back()}
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded px-8 py-10 text-center max-w-sm">
        {loading ? (
          <p className="text-gray-600">Ending session, please wait...</p>
        ) : (
          <>
            <h1 className="text-2xl font-semibold text-gray-800 mb-4">
              You have been logged out
            </h1>
            <p className="text-gray-600">Redirecting to login page...</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Logout;
