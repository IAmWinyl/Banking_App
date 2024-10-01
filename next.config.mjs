import {withSentryConfig} from "@sentry/nextjs";
/** @type {import('next').NextConfig} */

if (!process.env.NEXT_PUBLIC_SITE_URL ||
    !process.env.NEXT_PUBLIC_APPWRITE_PROJECT ||
    !process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
    !process.env.NEXT_APPWRITE_KEY ||
    !process.env.APPWRITE_DATABASE_ID ||
    !process.env.APPWRITE_USER_COLLECTION_ID ||
    !process.env.APPWRITE_BANK_COLLECTION_ID ||
    !process.env.APPWRITE_TRANSACTION_COLLECTION_ID // ||
    // !process.env.PLAID_CLIENT_ID ||
    // !process.env.PLAID_SECRET ||
    // !process.env.PLAID_ENV ||
    // !process.env.PLAID_PRODUCTS ||
    // !process.env.PLAID_COUNTRY_CODES ||
    // !process.env.DWOLLA_KEY ||
    // !process.env.DWOLLA_SECRET ||
    // !process.env.DWOLLA_BASE_URL ||
    // !process.env.DWOLLA_ENV
    ) {
    throw new Error("Missing required environment variables");
  }

const nextConfig = {
  async headers() {
    return [
        {
            // matching all API routes
            source: "/api/:path*",
            headers: [
                { key: "Access-Control-Allow-Credentials", value: "true" },
                { key: "Access-Control-Allow-Origin", value: "*" },
                { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
            ]
        }
    ]
  },
  env: {
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
      NEXT_PUBLIC_APPWRITE_ENDPOINT: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT,
      NEXT_PUBLIC_APPWRITE_PROJECT: process.env.NEXT_PUBLIC_APPWRITE_PROJECT,
      NEXT_APPWRITE_KEY: process.env.NEXT_APPWRITE_KEY,
      APPWRITE_DATABASE_ID: process.env.APPWRITE_DATABASE_ID,
      APPWRITE_USER_COLLECTION_ID: process.env.APPWRITE_USER_COLLECTION_ID,
      APPWRITE_BANK_COLLECTION_ID: process.env.APPWRITE_BANK_COLLECTION_ID,
      APPWRITE_TRANSACTION_COLLECTION_ID: process.env.APPWRITE_TRANSACTION_COLLECTION_ID,
      // PLAID_CLIENT_ID: process.env.PLAID_CLIENT_ID,
      // PLAID_SECRET: process.env.PLAID_SECRET,
      // PLAID_ENV: process.env.PLAID_ENV,
      // PLAID_PRODUCTS: process.env.PLAID_PRODUCTS,
      // PLAID_COUNTRY_CODES: process.env.PLAID_COUNTRY_CODES,
      // DWOLLA_KEY: process.env.DWOLLA_KEY,
      // DWOLLA_SECRET: process.env.DWOLLA_SECRET,
      // DWOLLA_BASE_URL: process.env.DWOLLA_BASE_URL,
      // DWOLLA_ENV: process.env.DWOLLA_ENV,
  },
};

export default withSentryConfig(nextConfig, {
// For all available options, see:
// https://github.com/getsentry/sentry-webpack-plugin#options

org: "serra-abak",
project: "javascript-nextjs",

// Only print logs for uploading source maps in CI
silent: !process.env.CI,

// For all available options, see:
// https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

// Upload a larger set of source maps for prettier stack traces (increases build time)
widenClientFileUpload: true,

// Automatically annotate React components to show their full name in breadcrumbs and session replay
reactComponentAnnotation: {
enabled: true,
},

// Uncomment to route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
// This can increase your server load as well as your hosting bill.
// Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
// side errors will fail.
// tunnelRoute: "/monitoring",

// Hides source maps from generated client bundles
hideSourceMaps: true,

// Automatically tree-shake Sentry logger statements to reduce bundle size
disableLogger: true,

// Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
// See the following for more information:
// https://docs.sentry.io/product/crons/
// https://vercel.com/docs/cron-jobs
automaticVercelMonitors: true,
});