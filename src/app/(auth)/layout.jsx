import Header from "components/header/header";
import Footer from "components/footer/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "app/globals.css";
import "app/(auth)/auth.css";

export const metadata = {
  icons: {
    icon: "/images/bag-shopping-solid.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          height: "100vh",
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
          alignItems: "center",
        }}
        className="text-center text-bg-dark auth-pages">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
