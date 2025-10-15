import type { NextConfig } from "next";

const nextConfig = {
  reactStrictMode: true,
  // ✅ AÑADE ESTA FUNCIÓN ASÍNCRONA
  async rewrites() {
    return [
      {
        source: '/api/:path*', // La ruta que usará tu frontend
        destination: 'http://localhost:8080/:path*', // La ruta real de tu backend
      },
    ]
  },
}

export default nextConfig;
