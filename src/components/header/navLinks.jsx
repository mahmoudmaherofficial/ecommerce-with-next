"use client";
import {
  faBoxesPacking,
  faCartShopping,
  faDoorOpen,
  faRightToBracket,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isSignInPage = pathname === "/signin";

  if (status==='loading') {
    return (
      <div className="spinner-border text-light" style={{ width: "1.5rem", height: "1.5rem" }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }

  if (status === "authenticated" && session.user.email === "admin@code404.site") {
    return (
      <nav className="links flex">
        <Link className={`sign-in ${pathname === "/add-product" && "border"}`} href="/add-product">
          <FontAwesomeIcon
            className="fa-solid fa-right-to-bracket"
            style={{
              width: "0.8rem",
            }}
            icon={faBoxesPacking}
          />
          Add Product
        </Link>
        <button className={`sign-in`} style={{ marginLeft: "0" }} onClick={() => signOut()}>
          <FontAwesomeIcon
            className="fa-solid fa-left-to-bracket"
            style={{
              width: "0.8rem",
              marginInline: "0",
            }}
            icon={faDoorOpen}
          />
          Sign Out
        </button>
        <p className="reset">Welcome {session.user.name} ♣</p>
      </nav>
    );
  }

  return (
    <nav className="links">
      {status === "unauthenticated" ? (
        <>
          {/* Signin Button */}
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

          {/* Register Button */}
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
        </>
      ) : (
        <>
          {/* Cart Button */}
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

          {/* Signout Button */}
          <button className={`sign-in`} onClick={() => signOut()}>
            <FontAwesomeIcon
              className="fa-solid fa-left-to-bracket"
              style={{
                width: "0.8rem",
              }}
              icon={faDoorOpen}
            />
            Sign Out
          </button>
          {/* Username */}
          { session.user.name ? (
            <p
              style={{
                textAlign: "center",
                marginTop: ".5rem",
                fontSize: "1rem",
                fontWeight: "bold",
                color: "var(--icons)",
              }}>
              Welcome {session.user.name}
            </p>
          ) : null}
        </>
      )}
    </nav>
  );
}
