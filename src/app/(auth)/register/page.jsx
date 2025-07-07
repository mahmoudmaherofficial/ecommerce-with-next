import RegisterForm from "./registerForm";

export const metadata = {
  title: "Register page",
  description: "description for Register page",
};
const Page = () => {
  return (
    <main className="px-3">
      <RegisterForm />
    </main>
  );
};

export default Page;
