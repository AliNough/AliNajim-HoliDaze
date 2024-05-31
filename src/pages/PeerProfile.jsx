import { useEffect, useState } from "react";
import { API_URL } from "../lib/constants";
import { API_KEY } from "../lib/constants";
import { Link } from "@tanstack/react-router";
import { Spinner } from "flowbite-react";
import { Tabs } from "flowbite-react";

export default function PeerProfileView() {
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const peerName = params.get("name");
        const accessToken = localStorage.getItem("accessToken");
        const url = new URL(`${API_URL}/holidaze/profiles/${peerName}`);
        url.searchParams.append("_venues", "true");
        url.searchParams.append("_bookings", "true");
        const resp = await fetch(url, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": API_KEY,
          },
        });

        console.log(resp);
        const data = await resp.json();
        console.log(data);
        setProfile(data.data);
        // userVenues(data.listings);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const { name, avatar } = profile;

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
                  src={avatar.url}
                  alt="profile picture"
                  className="h-40 w-40 object-cover border border-yellow-200 rounded-full"
                />
                <h2 className="text-yellow-50 text-lg font-ligh">{name}</h2>
              </div>
            </div>
          </div>
        )}
        <p className="text-yellow-50"></p>
        <div className="flex flex-col items-center gap-2 w-full">
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="flex flex-col items-center gap-2 w-full">
              <Tabs
                aria-label="Default tabs"
                style="underline"
                className="flex gap-2 items-center"
              ></Tabs>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
