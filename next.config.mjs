/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "d1csarkz80be9u.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "jdi.group",
      },
    ],
  },
};

export default nextConfig;