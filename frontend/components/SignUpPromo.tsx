import { useAuth } from "../context/AuthContext";
import Link from "next/link";

const SignupPromo = () => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) return null;

  return (
    <div className="bg-indigo-600 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">
          Sign Up for Exclusive Offers
        </h2>
        <p className="text-lg mb-8">
          Join our newsletter and get the latest deals and updates.
        </p>
        <Link
          href="/signup"
          className="px-6 py-3 bg-white text-indigo-600 rounded-md hover:bg-gray-100"
        >
          Sign Up Now
        </Link>
      </div>
    </div>
  );
};

export default SignupPromo;
