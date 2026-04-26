"use client";

import { GoogleMapsEmbed } from '@next/third-parties/google';

interface PollingStationMapProps {
  address?: string;
  query?: string;
}

export default function PollingStationMap({ address, query = "Polling Station Maharashtra" }: PollingStationMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const searchAddress = address || query;

  if (!apiKey || apiKey === "AIzaSyA_MAPS_KEY_HERE") {
    return (
      <div className="flex aspect-video w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--outline-variant)] bg-[var(--surface-container-low)] p-6 text-center">
        <div className="mb-2 text-2xl">📍</div>
        <p className="text-sm font-medium text-[var(--on-surface-variant)]">
          Google Maps API key not configured.
        </p>
        <p className="text-xs text-[var(--on-surface-variant)] opacity-70">
          Showing placeholder for: {searchAddress}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[var(--outline-variant)] bg-[var(--surface-container-lowest)] shadow-sm">
      <div className="bg-[var(--surface-container-low)] px-4 py-2 text-xs font-bold uppercase tracking-wider text-[var(--on-surface-variant)]">
        Polling Station Location
      </div>
      <GoogleMapsEmbed
        apiKey={apiKey}
        height={300}
        width="100%"
        mode="place"
        q={searchAddress}
      />
      <div className="p-3 text-xs text-[var(--on-surface-variant)] opacity-80">
        <p>Location based on registered address: <strong>{searchAddress}</strong></p>
      </div>
    </div>
  );
}
