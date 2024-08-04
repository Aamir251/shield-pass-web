/** @type {import('next').NextConfig} */
const nextConfig = {
  // webpack: (config) => {
  //   config.externals = [...config.externals, "bcrypt"];
  //   return config;
  // },

  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "www.google.com",
      },
    ],
  },
};

export default nextConfig;
