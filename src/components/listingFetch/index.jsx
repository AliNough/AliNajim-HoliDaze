import { useEffect, useState } from "react";
import { API_URL } from "../../lib/constants";
import { Link } from "@tanstack/react-router";
import PlaceBid from "../placeBid";
import dollarIcon from "../../assets/icons/dollarGreen.png";
import hrGlassIcon from "../../assets/icons/hourglass.png";

export default function FetchListing() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [showLimit, setShowLimit] = useState(false);

  const calculateHighestBid = (bids) => {
    if (bids && bids.length > 0) {
      return bids.reduce((prevBid, currentBid) =>
        prevBid.amount > currentBid.amount ? prevBid : currentBid
      );
    } else {
      return { amount: 0, bidderName: "", created: "", id: "" };
    }
  };

  useEffect(() => {
    const getListing = async () => {
      try {
        const accessToken = localStorage.getItem("access_token");
        const url = new URL(`${API_URL}/auction/listings`);
        url.searchParams.append("_bids", "true");
        url.searchParams.append("_seller", "true");
        url.searchParams.append("active", "false");
        let listLimit = 30;

        url.searchParams.append("limit", `${listLimit}`);
        const response = await fetch(url.href, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const allListings = await response.json();

        allListings.sort((a, b) => {
          const dateA = new Date(a.created);
          const dateB = new Date(b.created);
          return dateB - dateA;
        });

        setItems(allListings);
        console.log(allListings);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    getListing();
  }, []);

  useEffect(() => {
    const calculateTimeLeft = (endsAt) => {
      const currentDate = new Date();
      const endDate = new Date(endsAt);
      const difference = endDate - currentDate;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
      } else {
        return (
          <span className="text-red-400 dark:text-red-400">
            This listing has ended!
          </span>
        );
      }
    };

    const updateTimers = () => {
      setItems((prevItems) =>
        prevItems.map((item) => ({
          ...item,
          timeLeft: calculateTimeLeft(item.endsAt),
        }))
      );
    };

    const timer = setInterval(updateTimers, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="bg-gray-800 flex items-center justify-center">
        <div className="flex scrollXNone flex-col w-full overflow-y-hidden lg:flex-row lg:flex-wrap lg:w-4/5 items-center gap-1">
          {items.map(
            ({
              id,
              title,
              description,
              media,
              tags,
              _count,
              bids,
              seller,
              timeLeft,
            }) => {
              const highestBid = calculateHighestBid(bids);
              return (
                <div
                  key={id}
                  className="w-11/12 lg:w-1/4 bg-gray-200 bg-opacity-30 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-grow justify-center"
                >
                  <Link
                    to={`/singlelisting/${id}/?id=${id}`}
                    className="flex flex-col w-full"
                  >
                    <img
                      className="rounded-t-lg object-cover h-60"
                      onError="https://picsum.photos/100"
                      src={media[0]}
                      alt=""
                    />
                    <div className="p-2 grid grid-cols-2">
                      <div className="min-w-min">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-200 dark:text-white">
                          {title}
                        </h2>
                        <p className="text-yellow-200 opacity-60">
                          {seller.name}
                        </p>
                        {tags.length === 0 ? (
                          <p className="mb-3 font-normal text-gray-200 dark:text-gray-400 opacity-60">
                            • No tags
                          </p>
                        ) : (
                          <div className="flex gap-2 opacity-60">
                            {tags.map((tag, index) => (
                              <p
                                key={index}
                                className="font-normal text-gray-200 dark:text-gray-400"
                              >
                                • {tag}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col items-start">
                        <p className="text-gray-200">Bids: {_count.bids}</p>
                        <div className="flex gap-3">
                          <img
                            src={hrGlassIcon}
                            alt=""
                            className="w-6 object-fill"
                          />
                          <p className="text-green-300 text-sm">{timeLeft}</p>
                        </div>
                        <div className="flex">
                          <img
                            src={dollarIcon}
                            alt=""
                            className="mr-3 object-contain"
                          />
                          <p className="text-gray-200 dark:text-gray-400">
                            {highestBid.amount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            }
          )}
        </div>
      </div>
    </>
  );
}
