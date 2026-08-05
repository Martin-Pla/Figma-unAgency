/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/19hpetfood.com",
  trailingSlash: true,
  // Evita loop 308 entre /path y /path/ con basePath en Next 14
  skipTrailingSlashRedirect: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
