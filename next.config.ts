import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "kdrive-vtc-lyon.fr" }],
        destination: "https://www.kdrive-vtc-lyon.fr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
