import { AppConfigProvider } from "@/context/app-config";
import "../globals.css";
import Statics from "@/statics";
import { Metadata } from "next";
import { TAppConfigProps } from "@/context/app-config/type";

export async function generateMetadata(): Promise<Metadata> {
  const appConfig: TAppConfigProps = await fetch(Statics.configFetch.url, Statics.configFetch.options).then(res => res.json());

  return {
    title: appConfig.metadata?.title,
    description: appConfig.metadata?.desc,
    icons: {
      icon: "/favicon.ico",
      apple: "/apple-touch-icon.png"
    }
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const appConfig: TAppConfigProps = await fetch(Statics.configFetch.url, Statics.configFetch.options).then(res => res.json());

  return (
    <html lang="en">
      <body>
        <AppConfigProvider data={appConfig}>{children}</AppConfigProvider>
      </body>
    </html>
  );
}
