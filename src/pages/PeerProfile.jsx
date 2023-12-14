import { useEffect, useState } from "react";
import { API_URL } from "../lib/constants";
import { Link } from "@tanstack/react-router";
import { Spinner } from "flowbite-react";

export default function PeerProfileView() {
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);
  const [userListing, setUserListing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const peerName = params.get("name");
        const accessToken = localStorage.getItem("accessToken");
        const url = new URL(`${API_URL}/auction/profiles/${peerName}`);
        url.searchParams.append("_listings", "true");
        url.searchParams.append("_peers", "true");
        const resp = await fetch(url.href, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await resp.json();
        setProfile(data);
        setUserListing(data.listings);
        console.log(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const { credits, name, avatar, wins } = profile;

  return (
    <>
      <div className="w-full flex flex-col items-center bg-gray-800 py-3 gap-3 transition-all">
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            <div>
              <div className="flex flex-col items-center">
                <img
                  src={avatar}
                  alt="profile picture"
                  className="h-40 w-40 object-cover border border-yellow-200 rounded-full"
                />
                <h2 className="text-yellow-50 text-lg font-ligh">{name}</h2>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="text-yellow-50 bg-gray-600 pt-1 px-3 text-lg font-ligh rounded-md">
                  Wallet: {credits} kr
                </h2>
              </div>
            </div>
          </div>
        )}
        <p className="text-yellow-50">My listings: {userListing.length}</p>
        <div className="flex flex-col items-center gap-2 w-full">
          {/* USER LISTING */}
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="flex flex-col items-center gap-2 w-full">
              {userListing.map(({ id, title, media }) => (
                <Link
                  to={`/singlelisting/${id}/?id=${id}`}
                  key={id}
                  className="flex flex-col w-4/5"
                >
                  {media.length === 0 ? (
                    <div className=" h-48 bg-slate-100 opacity-30 flex justify-center items-center">
                      <p>No media found</p>
                    </div>
                  ) : (
                    <img
                      src={media[0]}
                      alt="product image"
                      className="h-48 bg-slate-100"
                    />
                  )}
                  <div className=" bg-slate-400">
                    <h2 className="text-yellow-50 pt-3 text-lg font-ligh">
                      {title}
                    </h2>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}