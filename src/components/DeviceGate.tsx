"use client";

import { useEffect, useState, type ReactNode } from "react";

interface Device {
  id: string;
  deviceName: string;
  lastUsedAt: string;
  createdAt: string;
}

export function DeviceGate({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<"loading" | "ok" | "limit">("loading");
  const [devices, setDevices] = useState<Device[]>([]);
  const [removing, setRemoving] = useState<string | null>(null);

  const checkDevice = async () => {
    try {
      const res = await fetch("/api/auth/device-check", { method: "POST" });
      if (res.ok) {
        setStatus("ok");
      } else if (res.status === 403) {
        const data = await res.json();
        if (data.error === "DEVICE_LIMIT") {
          setDevices(data.devices);
          setStatus("limit");
        }
      }
    } catch {
      // On error, allow access rather than blocking
      setStatus("ok");
    }
  };

  useEffect(() => {
    checkDevice();
  }, []);

  const handleRemove = async (deviceRecordId: string) => {
    setRemoving(deviceRecordId);
    try {
      await fetch("/api/auth/device-check", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deviceRecordId }),
      });
      // Re-check — this will register the current device if a slot opened
      await checkDevice();
    } finally {
      setRemoving(null);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center gradient-bg-light">
        <div className="text-navy-500 text-sm">Ověřování zařízení...</div>
      </div>
    );
  }

  if (status === "limit") {
    return (
      <div className="min-h-screen gradient-bg-light flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-red-100 p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-navy-900 mb-2">
              Limit zařízení dosažen
            </h2>
            <p className="text-navy-600 text-sm">
              Váš účet je přihlášen na maximálním počtu zařízení (3). Odeberte jedno zařízení pro přístup z tohoto.
            </p>
          </div>

          <div className="space-y-3">
            {devices.map((device) => (
              <div
                key={device.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200"
              >
                <div>
                  <p className="text-sm font-medium text-navy-900">{device.deviceName}</p>
                  <p className="text-xs text-navy-500">
                    Naposledy: {new Date(device.lastUsedAt).toLocaleDateString("cs-CZ")}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(device.id)}
                  disabled={removing === device.id}
                  className="text-sm text-red-600 hover:text-red-800 font-medium px-3 py-1.5 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                >
                  {removing === device.id ? "..." : "Odebrat"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
