import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { CartProvider } from "@/contexts/cart.context";
import { CategoriesProvider } from "@/contexts/categories.context";
import { UserProvider } from "@/contexts/user.contexts";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Crwn Clothing | Online Clothing Store",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <UserProvider>
          <CategoriesProvider>
            <CartProvider>
              <Navigation />
              {children}
              <Toaster />
            </CartProvider>
          </CategoriesProvider>
        </UserProvider>
      </body>
    </html>
  );
}
