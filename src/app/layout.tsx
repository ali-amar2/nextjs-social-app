import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import theme from "@/theme";
import ReduxProvider from "@/components/ReduxProvider/ReduxProvider";
import Navbar from "@/components/Navbar/Navbar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Linked Posts",
  description: "Share your thoughts and connect with friends.",
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, display: "flex", flexDirection: "column", }}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ReduxProvider>
              <Navbar />
              {children}
              <Toaster />
            </ReduxProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
