import type { NextConfig } from "next";
import { withIntlayer } from "next-intlayer/server";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@prisma/client", "pg"],
  devIndicators: false,
};

export default withIntlayer(nextConfig);
