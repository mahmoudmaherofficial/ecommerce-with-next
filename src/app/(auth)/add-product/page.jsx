"use client";

export default function Page() {
  function handleSubmit(event) {
    event.preventDefault();
    // Handle form submission
  }

  return (
    <main className="px-3">
      <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
        <div className="mb-4">
          <label htmlFor="productImage" className="form-label">
            Product Image
          </label>
          <input type="file" className="form-control" id="productImage" required />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="form-label">
            Product Name
          </label>
          <input type="text" className="form-control" id="name" placeholder="e.g. Apple iPhone 15" required />
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
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {false ? (
            <div className="spinner-border text-light" style={{ width: "1rem", height: "1rem" }} role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            "Create Product"
          )}
        </button>
        <p className="mt-3" style={{ color: "#ff7790" }}>
          {/* Error message placeholder */}
        </p>
      </form>
    </main>
  );
}
