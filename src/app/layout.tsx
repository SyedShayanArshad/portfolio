import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Syed Shayan Arshad — AI / ML Engineer",
  description:
    "Portfolio of Syed Shayan Arshad — AI & Machine Learning Engineer specializing in deep learning, end-to-end ML pipelines, and AI deployment.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Deep Learning",
    "Portfolio",
    "Python",
    "Next.js",
    "Data Science",
  ],
  authors: [{ name: "Syed Shayan Arshad" }],
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  openGraph: {
    title: "Syed Shayan Arshad — AI / ML Engineer",
    description:
      "AI & Machine Learning Engineer | Deep Learning | End-to-End ML Pipelines",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className="bg-bg-primary text-text-primary antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Providers>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "var(--bg-card)",
                color: "var(--text-primary)",
                border: "1px solid var(--border-subtle)",
                borderRadius: "10px",
              },
              success: {
                iconTheme: {
                  primary: "var(--accent-violet)",
                  secondary: "var(--bg-primary)",
                },
              },
              error: {
                iconTheme: {
                  primary: "var(--accent-rose)",
                  secondary: "var(--bg-primary)",
                },
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}
