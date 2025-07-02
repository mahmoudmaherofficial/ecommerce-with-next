import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

import { products as data } from "./myProducts";

// Images Array
// const arr = [
//   { productImg: "./images/1.png" },
//   { productImg: "./images/2.webp" },
//   { productImg: "./images/3.webp" },
//   { productImg: "./images/4.webp" },
//   { productImg: "./images/5.webp" },
//   { productImg: "./images/6.webp" },
//   { productImg: "./images/7.webp" },
//   { productImg: "./images/8.png" },
// ];

// Fake DB Data
// async function getData() {
//   await new Promise((resolve) => setTimeout(resolve, 3000));
//   const res = await fetch("http://localhost:5000/products", {
//     next: { revalidate: 0 },
//   });

//   if (!res.ok) {
//     return [];
//   }
//   return res.json();
// }

const Products = async () => {
  // const data = await getData(); 

  if (!data || data.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <section className="products flex">
      {data.map((item) => {
        return (
          <article title={item.title} key={item.id} className="card">
            <Link href={`/product-details/${item.id}`}>
              <Image width={266} height={266} src={item.productImg} alt={item.title} quality={100} loading="lazy" />
            </Link>
            <div style={{ width: "266px" }} className="content">
              <h1 className="title">{item.title.slice(0, 15)}...</h1>
              <p className="description">
                {item.description.length > 100 ? item.description.slice(0, 100) + "..." : item.description}
              </p>
              <div
                className="flex"
                style={{
                  justifyContent: "space-between",
                  paddingBottom: "0.7rem",
                }}>
                <div className="price">${item.price}</div>
                <button className="add-to-cart flex">
                  <FontAwesomeIcon style={{ width: "1rem", marginRight: ".1rem" }} icon={faCartPlus} />
                  Add To Cart
                </button>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
};

export default Products;
