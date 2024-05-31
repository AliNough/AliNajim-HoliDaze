import { useEffect, useState } from "react";
import { API_URL } from "../../lib/constants";
import walletIcon from "../../assets/icons/wallet.png";
import { Link } from "@tanstack/react-router";
import { Spinner } from "flowbite-react";

export default function UserInfoHome() {
  const [profile, setProfile] = useState([]);
  const [wallet, setWallet] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);

  if (!accessToken) {
    return (
      <>
        <div className="bg-gray-600 sticky top-0 z-20 w-full py-3 flex flex-wrap items-center justify-center gap-y-3">
          <p className="mx-2 text-gray-100">welcome! Please </p>
          <Link
            className="border rounded-xl border-gray-900 py-1 px-3 bg-yellow-300"
            to={"/register"}
          >
            Sign up
          </Link>
          <p className="mx-2 text-gray-100">Or</p>
          <Link
            className="border rounded-md border-gray-900 py-1 px-3 bg-gray-100"
            to={"/login"}
          >
            login
          </Link>
        </div>
      </>
    );
  }
}
