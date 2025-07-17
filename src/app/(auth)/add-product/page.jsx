import AddProductForm from "./addProductForm";

export const metadata = {
  title: "Add product",
  description: "Add a new product to your ecommerce store using this form.",
};

export default function Page() {
  return (
    <main className="px-3">
      <AddProductForm />
    </main>
  );
}
