import { useEffect, useState } from "react";
import { API_URL } from "../lib/constants";
import ShowWallet from "../components/userInfoHome";
import PlaceBid from "../components/placeBid";
import dollarIcon from "../assets/icons/dollarGreen.png";
import { Carousel } from "flowbite-react";
import { Link } from "@tanstack/react-router";

export default function ListingDetails() {
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUser, setIsUser] = useState(false);

  const storedName = localStorage.getItem("user_name");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const listingID = params.get("id");
        const accessToken = localStorage.getItem("access_token");
        const url = new URL(`${API_URL}/auction/listings/${listingID}`);
        url.searchParams.append("_bids", "true");
        url.searchParams.append("_seller", "true");
        url.searchParams.append("active", "true");
        const resp = await fetch(url.href, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await resp.json();
        setDetails(data);

        console.log(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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

    const timer = setInterval(() => {
      setDetails((prevDetails) => ({
        ...prevDetails,
        timeLeft: calculateTimeLeft(prevDetails.endsAt),
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const {
    created,
    description,
    endsAt,
    id,
    media,
    tags,
    title,
    _count,
    seller,
    bids,
    timeLeft,
  } = details;

  useEffect(() => {
    if (details && details.seller) {
      const { seller } = details;
      if (
        storedName &&
        seller.name.trim().toLowerCase() === storedName.trim().toLowerCase()
      ) {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    }
  }, [details, storedName]);

  console.log(details);

  const formattedCreatedDate = new Date(created).toLocaleString();

  return (
    <>
      <ShowWallet />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col">
          {media && (
            <div className="w-ful flex flex-col">
              <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel slide={false}>
                  {media.map((item, index) => (
                    <img
                      key={index}
                      src={item}
                      className="w-full h-full object-cover"
                    />
                  ))}
                </Carousel>
              </div>
            </div>
          )}
          <div
            role="root container"
            className="w-full bg-gray-800 flex gap-3 px-2 py-2"
          >
            <div
              role="left side"
              className="flex w-full flex-col gap-3 px-2 py-2"
            >
              <div className="text-yellow-50 ml-4 w-full">
                <p className="text-sm text-gray-500">{formattedCreatedDate}</p>
                <h1 className=" font-semibold ">{title}</h1>
                <p className="">{description}</p>
                <div className="mt-2">
                  {tags.length === 0 ? (
                    <p className="mb-3 font-normal text-gray-200 dark:text-gray-400 opacity-60">
                      • No tags
                    </p>
                  ) : (
                    <div className="flex gap-2 opacity-60">
                      {tags.map((tag, index) => (
                        <p
                          key={index}
                          className="font-thin text-sm underline text-gray-200 dark:text-gray-400"
                        >
                          {tag}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div
              role="right side"
              className="flex flex-col w-full items-center"
            >
              <Link
                to={`/peerprofile/${seller.name}/?name=${seller.name}`}
                className="flex flex-col items-center"
              >
                <img
                  src={seller.avatar}
                  alt=""
                  className="object-fit h-12 w-12 rounded-full border border-yellow-400"
                />
                <h1 className=" text-yellow-100 text-sm dark:text-white opacity-80">
                  {seller.name}
                </h1>
              </Link>
            </div>
          </div>
          <div className="w-full flex bg-gray-800 px-5 pb-3">
            <div className="w-full">
              <div role="current Bid ammount" className="flex flex-col">
                <div className="flex">
                  <img
                    src={dollarIcon}
                    alt=""
                    className="mr-3 object-contain"
                  />
                  {bids.map((bid, index) => (
                    <div key={index} className="flex flex-col text-gray-200">
                      <p className=" text-2xl dark:text-gray-400">
                        {index === bids.length - 1 ? bid.amount : null}
                      </p>
                    </div>
                  ))}
                </div>
                {bids.map((bid, index) => (
                  <div
                    key={index}
                    className="flex flex-col text-yellow-100 opacity-60"
                  >
                    <Link
                      to={`/peerprofile/${bid.bidderName}/?name=${bid.bidderName}`}
                      className=" dark:text-gray-400"
                    >
                      {index === bids.length - 1 ? bid.bidderName : null}
                    </Link>
                  </div>
                ))}
              </div>
              <p className="text-green-300">{timeLeft}</p>
            </div>
            <div className="w-1/2">
              <PlaceBid listingId={id} />
            </div>
          </div>
          {isUser ? (
            <button className="text-yellow-50 border bg-gray-700 py-3">
              Edit listing
            </button>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </>
  );
}
