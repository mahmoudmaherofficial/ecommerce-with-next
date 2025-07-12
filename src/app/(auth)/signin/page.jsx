import SigninForm from "./signinForm";

export const metadata = {
  title: "Signin page",
  description: "description for Signin page",
};
const Page = () => {
  return (
    <main className="px-3">
      <SigninForm />
    </main>
  );
};

export default Page;
