import { useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const SessionManager: React.FC = () => {
  const { userId, isLoggedIn, login, logout } = useAuth();

  useEffect(() => {
    const validateSession = async (): Promise<boolean> => {
      const sessionId = localStorage.getItem("userSessionId");
      if (!sessionId) return false;

      try {
        const response = await axios.post<{
          valid: boolean;
          userId: number;
          role?: string;
        }>("http://localhost:4000/session/validate", { sessionId });

        if (response.data.valid) {
          login(response.data.userId, response.data.role ?? "user");
          // console.log("Session validated successfully");
          return true;
        } else {
          localStorage.removeItem("userSessionId");
          logout();
          // console.log("Session invalid, logged out");
          return false;
        }
      } catch (err: any) {
        if (err?.response?.status === 409) {
          // console.log("Session conflict (409) - keeping session alive");
          return true;
        }
        console.error("Session validation failed", err);
        return false;
      }
    };

    const getSessionData = async () => {
      const browser_info = navigator.userAgent;
      const device_info = `${navigator.platform} - ${window.screen.width}x${window.screen.height}`;

      let location = null;
      try {
        location = await new Promise<{ lat: number; lng: number }>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              (pos) => {
                resolve({
                  lat: pos.coords.latitude,
                  lng: pos.coords.longitude,
                });
              },
              () => reject(),
              { timeout: 5000 }
            );
          }
        );
      } catch {
        // Location denied or error, skip location
      }

      return { browser_info, device_info, location };
    };

    interface StartSessionResponse {
      message: string;
      sessionId: string;
    }

    const startSession = async () => {
      try {
        const sessionData = await getSessionData();
        const response = await axios.post<StartSessionResponse>(
          "http://localhost:4000/session/start",
          {
            userId,
            ...sessionData,
            location: JSON.stringify(sessionData.location),
          }
        );
        const sessionId = response.data.sessionId;
        localStorage.setItem("userSessionId", sessionId);
        console.log("Session started with ID:", sessionId);
      } catch (err) {
        console.error("Failed to start session", err);
      }
    };

    const run = async () => {
      const sessionIsValid = await validateSession();

      if (userId && isLoggedIn && !sessionIsValid) {
        await startSession();
      }
    };

    run();
  }, [userId]);

  return null;
};

export default SessionManager;