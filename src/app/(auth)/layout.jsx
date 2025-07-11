import Header from "components/header/header";
import Footer from "components/footer/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "app/globals.css";
import "app/(auth)/auth.css";
import { Bounce, ToastContainer } from "react-toastify";

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
          gridTemplateRows: "auto auto 1fr auto",
          alignItems: "center",
        }}
        className="text-center text-bg-dark auth-pages">
        <Header />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        {children}
        <Footer />
      </body>
    </html>
  );
}
