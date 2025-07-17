"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AddProductForm() {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    setIsLoading(true);
    setError(null);

    try {
      // const formData = new FormData();
      // formData.append("image", image);
      // formData.append("title", title);
      // formData.append("price", price);
      // formData.append("description", description);

      const data = { title, description, price };

      const response = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(data),
      });

      // const data = await response.json();
      if (!response.ok) {
        return;
      }

      // Success case
      const responseMSG = await response.json();
      toast.success(responseMSG.message);
      e.target.reset(); // Reset form on success
    } catch (error) {
      // Handle network or unexpected errors
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
      <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
        <div className="mb-4">
          <label htmlFor="productImage" className="form-label">
            Product Image
          </label>
          <input type="file" className="form-control" id="productImage" required />
        </div>

        <div className="mb-4">
          <label htmlFor="title" className="form-label">
            Product Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="e.g. Apple iPhone 15"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="form-label">
            Product Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="e.g. 999"
            min="0"
            step="0.01"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="desc" className="form-label">
            Product Description
          </label>
          <textarea
            name="desc"
            id="desc"
            rows={3}
            className="form-control"
            placeholder="Write a short description of the product"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading || !title || !price || !description}>
          {isLoading ? (
            <div className="spinner-border text-light" style={{ width: "1rem", height: "1rem" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Create Product"
          )}
        </button>

        <p className="mt-3" style={{ color: "#ff7790" }}>
          {error || ""}
        </p>
      </form>
  );
}
