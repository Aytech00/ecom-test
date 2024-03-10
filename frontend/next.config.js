/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://techstar-backend.onrender.com/:path*", // Replace with your backend API URL
      },
    ];
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "techstar-3sb9.onrender.com",
      "procvcreator.s3.eu-north-1.amazonaws.com",
      "https://techstar-backend.onrender.com",
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
    ],
  },
};

module.exports = nextConfig;
