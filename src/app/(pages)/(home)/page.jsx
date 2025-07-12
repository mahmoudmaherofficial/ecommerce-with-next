"use client";
import { Suspense } from "react";
import Footer from "../../../components/footer/footer.jsx";
import Header from "../../../components/header/header.jsx";
import "./home.css";
import Products from "./products.jsx";
import Loading from "./loading.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Loading />;
  }
  return (
    <>
      <div className="top-img">
        <Header />
        <section className="content">
          <p className="lifestyle">Lifestyle collection</p>
          <p className="men">MEN</p>
          <p className="sale">
            SALE UP TO <span>30% OFF</span>
          </p>
          <p className="free-shipping">Get Free Shipping on orders over $99.00</p>
          <button>Shop Now</button>
        </section>
      </div>

      <main>
        <h1 className="recommended" style={{ display: "flex", alignItems: "center" }}>
          <FontAwesomeIcon icon={faCircleCheck} style={{ width: "2rem", marginRight: ".8rem" }} />
          Recommended for you
        </h1>
        {status === "authenticated" ? (
          <Suspense fallback={<Loading />}>
            <Products />
          </Suspense>
        ) : (
          <p style={{ display: "flex", justifyContent: "center", fontSize: "1.5rem" }}>
            You must sign in to see page content
          </p>
        )}
      </main>

      <Footer />
    </>
  );
}
