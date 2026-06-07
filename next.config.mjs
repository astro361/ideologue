/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configures allowed external image domains (Crucial for showing Google Profile Avatars)
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

export default nextConfig;
