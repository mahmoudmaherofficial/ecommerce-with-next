"use client";
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faCartShopping, faRightToBracket, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const isSignInPage = pathname.split("/")[1] === "signin";

  return (
    <header id="headerElement" className="flex">
      <Link href={"/"} className="logo">
        <FontAwesomeIcon
          className="fa-solid fa-bag-shopping"
          style={{
            width: "1.5rem",
            marginRight: "0.3rem",
          }}
          icon={faBagShopping}
        />

        <span style={{ fontWeight: "bold" }}>AWU</span>
        <p style={{ letterSpacing: "0.5px" }}>Shopping</p>
      </Link>

      <nav className="links">
        <Link style={{ position: "relative" }} className="cart" href="/cart">
          <FontAwesomeIcon
            className="fa-solid fa-cart-shopping"
            style={{
              width: "0.8rem",
            }}
            icon={faCartShopping}
          />
          $0.00
          <span className="products-number">2</span>
        </Link>

        <Link className={`sign-in ${isSignInPage && "border"}`} href="/signin">
          <FontAwesomeIcon
            className="fa-solid fa-right-to-bracket"
            style={{
              width: "0.8rem",
            }}
            icon={faRightToBracket}
          />
          Sign in
        </Link>

        <Link className={`register ${!isSignInPage && "border"}`} href="/register">
          <FontAwesomeIcon
            className="fa-solid fa-user-plus"
            style={{
              width: "0.8rem",
            }}
            icon={faUserPlus}
          />
          Register
        </Link>
      </nav>
    </header>
  );
};

export default Header;
