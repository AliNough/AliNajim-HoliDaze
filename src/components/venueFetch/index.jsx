import React, { useEffect, useState } from "react";
import { API_URL } from "../../lib/constants";
import { Link } from "@tanstack/react-router";

import dollarIcon from "../../assets/icons/dollarGreen.png";
import locationIcon from "../../assets/icons/pin.png";

export default function FetchListing() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1); // Current page

  useEffect(() => {
    const getListing = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const url = new URL(`${API_URL}/holidaze/venues`);
        url.searchParams.append("_bookings", "true");
        url.searchParams.append("_owner", "true");
        let listLimit = 12;

        url.searchParams.append("page", `${page}`);
        url.searchParams.append("limit", `${listLimit}`);

        const response = await fetch(url.href, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const allVenues = await response.json();
        setItems(allVenues.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };
    getListing();
  }, [page]);

  useEffect(() => {
    const searchVenues = async () => {
      if (searchInput.trim() === "") {
        return;
      }

      try {
        const accessToken = localStorage.getItem("access_token");
        const url = new URL(`${API_URL}/holidaze/venues/search`);
        url.searchParams.append("q", searchInput);

        const response = await fetch(url.href, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const searchResults = await response.json();
        setItems(searchResults.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    searchVenues();
  }, [searchInput]);

  const handleOnSearch = (event) => {
    setSearchInput(event.target.value);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <>
      <div className="py-2 px-3 w-full bg-gray-800 flex justify-end">
        <input
          type="search"
          placeholder="search"
          value={searchInput}
          onChange={handleOnSearch}
          className="bg-gray-700 dark:bg-gray-800 border border-gray- rounded-sm"
        />
      </div>
      <div className="bg-gray-800 flex items-center justify-center">
        <div className="flex scrollXNone flex-col w-full overflow-y-hidden lg:flex-row lg:flex-wrap lg:w-4/5 items-center gap-1">
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : items.length > 0 ? (
            items.map(
              ({ id, media, name, description, location, price, owner }) => {
                return (
                  <div
                    key={id}
                    className="w-11/12 lg:w-1/4 bg-gray-200 bg-opacity-30 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-grow justify-center"
                  >
                    <Link
                      to={`/SingleVenue/${id}/?id=${id}`}
                      className="flex flex-col w-full"
                    >
                      <img
                        className="rounded-t-lg object-cover h-60"
                        src={
                          media.length > 0
                            ? media[0].url
                            : "https://images.unsplash.com/photo-1716872491368-cbef5a6b0532?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        }
                        alt=""
                      />
                      <div className="p-2 grid grid-cols-2">
                        <div className="min-w-min ">
                          <h2 className="text-2xl font-bold tracking-tight text-gray-200 dark:text-white">
                            {name}
                          </h2>
                          <div className="flex gap-1">
                            {owner && owner.avatar && (
                              <img
                                src={owner.avatar.url}
                                alt=""
                                className=" rounded-full w-6"
                              />
                            )}
                            <p className="text-yellow-200 opacity-60">
                              {owner ? owner.name : "Unknown Owner"}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-start">
                          <p className="text-gray-200">Bids: {"_count.bids"}</p>
                          <div className="flex gap-3">
                            <img
                              src={locationIcon}
                              alt=""
                              className="w-6 object-fill"
                            />
                            <p className="text-green-300 text-sm">
                              {location.city},
                            </p>
                            <p className="text-green-300 text-sm">
                              {location.address}
                            </p>
                          </div>
                          <div className="flex">
                            <img
                              src={dollarIcon}
                              alt=""
                              className="mr-3 object-contain"
                            />
                            <p className="text-gray-200 dark:text-gray-400">
                              {price}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              }
            )
          ) : (
            <p>No venues found</p>
          )}
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-l"
        >
          Prev
        </button>
        <button
          onClick={handleNextPage}
          className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-r"
        >
          Next
        </button>
      </div>
    </>
  );
}
