import Header from "components/header/header";
import Footer from "components/footer/footer";
import "./product-details.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { notFound } from "next/navigation";
import Image from "next/image";
import { products } from "app/(pages)/(home)/myProducts";

// Function to get data from API
// async function getProduct(id) {
//   await new Promise((resolve) => setTimeout(resolve, 2000));
//   const res = await fetch(`http://localhost:5000/products/${id}`, {
//     next: { revalidate: 0 },
//   });

//   if (!res.ok) {
//     notFound();
//   }

//   return res.json();
// }

// Metadata
export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await products.find((p) => p.id === id);

  // const product = await getProduct(id);

  return {
    title: product.title,
    description: product.description,
  };
}

export default async function ProductDetails({ params }) {
  const { id } = await params;
  const product = await products.find((p) => p.id === id);

  // const product = await getProduct(id);

  return (
    <div className="prd-page">
      <Header />
      <main style={{ textAlign: "center" }} className="flex">
        <Image width={266} height={266} src={product.productImg} alt={product.title} quality={100} loading="lazy" />
        <div className="product-details">
          <div style={{ justifyContent: "space-between" }} className="flex">
            <h2>{product.title}</h2>
            <p className="price">${product.price}</p>
          </div>
          <p className="description">{product.description}</p>
          <button className="flex add-to-cart">
            <FontAwesomeIcon style={{ width: "1rem", marginRight: ".1rem" }} icon={faCartPlus} />
            Add To Cart
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
