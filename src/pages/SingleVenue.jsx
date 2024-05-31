import { useEffect, useState } from "react";
import { API_URL, API_KEY } from "../lib/constants";
import ShowWallet from "../components/userInfoHome";

import dollarIcon from "../assets/icons/dollarGreen.png";
import guestsIcon from "../assets/icons/cake.png";
import { Carousel } from "flowbite-react";
import { Link } from "@tanstack/react-router";
import { Dropdown } from "flowbite-react";
import punkIcon from "../assets/icons/more.png";
import BookingCalendar from "../components/bookingCalendar";

export default function VenueDetails() {
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isUser, setIsUser] = useState(false);
  const [bidErrorMessage, setBidErrorMessage] = useState("");
  const [bookings, setBookings] = useState([]);

  const storedName = localStorage.getItem("user_name");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const venueID = params.get("id");
        const accessToken = localStorage.getItem("accessToken");
        const url = new URL(`${API_URL}/holidaze/venues/${venueID}`);
        url.searchParams.append("_owner", "true");
        url.searchParams.append("_seller", "true");
        const resp = await fetch(url.href, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await resp.json();
        setDetails(data.data);

        // Fetch bookings for the venue
        const bookingsResp = await fetch(
          `${API_URL}/holidaze/bookings/${venueID}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "X-Noroff-API-Key": API_KEY,
            },
          }
        );
        const bookingsData = await bookingsResp.json();
        setBookings(bookingsData.data || []);
        console.log(bookingsData);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const {
    created,
    description,
    media,
    name,
    id,
    _count,
    owner,
    timeLeft,
    price,
    maxGuests,
  } = details;

  useEffect(() => {
    if (details && details.owner) {
      const { owner } = details;
      if (
        storedName &&
        owner.name.trim().toLowerCase() === storedName.trim().toLowerCase()
      ) {
        setIsUser(true);
      } else {
        setIsUser(false);
      }
    }
  }, [details, storedName]);

  const formattedCreatedDate = new Date(created).toLocaleString();

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col items-center bg-gray-100 ">
          {media && (
            <div className="flex w-full sm:w-3/5 flex-col">
              <div className="h-56 xl:h-80 2xl:h-96">
                <Carousel slide={false}>
                  {media.map((item, index) => (
                    <img
                      key={index}
                      src={item.url}
                      className="w-full h-full object-cover"
                    />
                  ))}
                </Carousel>
              </div>
            </div>
          )}
          <div
            role="root container"
            className="w-full bg-gray-100 flex gap-3 px-2 py-2"
          >
            <div
              role="left side"
              className="flex w-full flex-col gap-3 px-2 py-2"
            >
              <div className="text-gray-800 ml-4 w-full">
                <p className="text-sm text-gray-500">{formattedCreatedDate}</p>
                <h1 className="font-semibold">{name}</h1>
                <p>{description}</p>
                <div className="mt-2"></div>
              </div>
            </div>
            <div
              role="right side"
              className="flex flex-col w-full items-center"
            >
              {isUser ? (
                <div className="pb-2">
                  <Dropdown
                    renderTrigger={() => (
                      <img src={punkIcon} alt="" className="w-12 h-12 invert" />
                    )}
                    dismissOnClick={false}
                  >
                    <Dropdown.Item className=" ">Edit</Dropdown.Item>
                    <Dropdown.Item className="bg-red-200 text-red-900">
                      Delete
                    </Dropdown.Item>
                  </Dropdown>
                </div>
              ) : (
                <div></div>
              )}

              {owner && (
                <Link
                  to={`/peerprofile/${owner.name}/?name=${owner.name}`}
                  className="flex flex-col items-center"
                >
                  <img
                    src={owner.avatar.url}
                    alt=""
                    className="object-fit h-12 w-12 rounded-full border border-yellow-400"
                  />
                  <h1 className="text-gray-800 text-sm dark:text-white opacity-80">
                    {owner.name}
                  </h1>
                </Link>
              )}
            </div>
          </div>
          <div className="w-full flex bg-gray-100 px-5 pb-3">
            <div className="w-full">
              <div role="current Bid ammount" className="flex flex-col">
                <div className="flex">
                  <img
                    src={dollarIcon}
                    alt=""
                    className="mr-3 object-contain"
                  />
                  <p className="text-gray-800">{price}</p>
                </div>
                <div className="flex">
                  <img
                    src={guestsIcon}
                    alt=""
                    className="mr-3 w-8 object-contain"
                  />
                  <p className="text-gray-800">{maxGuests}</p>
                </div>
              </div>
              <p className="text-green-300">{timeLeft}</p>
            </div>
            <div className="w-1/2">
              <div>
                {bidErrorMessage && (
                  <div className="text-red-500">{bidErrorMessage}</div>
                )}
              </div>
              <Link
                to={`/BookVenue/${id}/?venueid=${id}`}
                className="bg-green-400 text-white px-3 py-1 rounded-sm"
              >
                Book venue
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
