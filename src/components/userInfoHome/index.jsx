import { useEffect, useState } from "react";
import { API_URL } from "../../lib/constants";
import walletIcon from "../../assets/icons/wallet.png";
import { Link } from "@tanstack/react-router";
import { Spinner } from "flowbite-react";

export default function ShowWallet() {
  const [profile, setProfile] = useState([]);
  const [wallet, setWallet] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const getWallet = async () => {
      try {
        const storedName = localStorage.getItem("user_name");
        const url = new URL(`${API_URL}/auction/profiles/${storedName}`);
        url.searchParams.append("_listings", "true");

        const response = await fetch(url.href, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const allData = await response.json();

        setProfile(allData);
        const creditValue = allData.credits;

        if (response.status !== 200) {
          console.log(allData.status);
        }

        setWallet(creditValue);
        console.log(creditValue);
      } catch {
        setError(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getWallet();
  }, []);

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

  if (isLoading) {
    return <Spinner className="text-yellow-300 rounded-md" color={"warn"} />;
  }

  const { credits, name, avatar } = profile;

  return (
    <div className="flex sticky top-0 z-20 justify-evenly bg-gray-600  w-full py-1">
      <Link
        to={"/profile"}
        className="w-10 h-10 bg-slate-400 rounded-full flex gap-2"
      >
        <img src={avatar} alt="profile picture" className="rounded-md" />
        <p className=" text-yellow-50 pt-3   text-lg font-light hover:tracking-widest hover:text-yellow-300 transition-all hidden sm:block">
          {name}
        </p>
      </Link>
      <div className=" border-yellow-100 bg-gray-500 rounded-md py-2 px-3 mr-3 flex">
        <img src={walletIcon} alt="" className="w-6" />
        <p className="px-5 text-yellow-100"> {credits}</p>
      </div>
    </div>
  );
}
