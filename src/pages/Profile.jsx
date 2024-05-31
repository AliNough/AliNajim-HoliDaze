import { useEffect, useState } from "react";
import { API_URL, API_KEY } from "../lib/constants";
import { Link } from "@tanstack/react-router";
import { Spinner, Tabs } from "flowbite-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [profileBookings, setProfileBookings] = useState([]);
  const [venues, setVenues] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      try {
        const storedName = localStorage.getItem("user_name");
        const url = new URL(`${API_URL}/holidaze/profiles/${storedName}`);
        url.searchParams.append("_venues", "true");
        url.searchParams.append("_bookings", "true");

        const response = await fetch(url.href, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            "X-Noroff-API-Key": API_KEY,
          },
        });
        const userBookingsResponse = await fetch(
          `${API_URL}/holidaze/profiles/${storedName}/bookings`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "X-Noroff-API-Key": API_KEY,
            },
          }
        );

        const allData = await response.json();
        const bookingsData = await userBookingsResponse.json();
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }

        // Fetch venue details for each booking
        const fetchVenueDetails = async (booking) => {
          const venueResponse = await fetch(
            `${API_URL}/holidaze/venues/${booking.id}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                "X-Noroff-API-Key": API_KEY,
              },
            }
          );
          return venueResponse.json();
        };

        const venuesData = await Promise.all(
          bookingsData.data.map((booking) =>
            fetchVenueDetails(booking).then((venueData) => ({
              bookingId: booking.id,
              venue: venueData.data,
            }))
          )
        );

        const venuesMap = {};
        venuesData.forEach((venueData) => {
          venuesMap[venueData.bookingId] = venueData.venue;
        });

        setVenues(venuesMap);
        setProfileBookings(bookingsData.data);
        setProfile(allData.data);
      } catch (error) {
        setError(error);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    getProfile();
  }, []);

  const editProfile = async (event) => {
    event.preventDefault();
    const storedName = localStorage.getItem("user_name");

    const avatarURL = event.target.avatar.value || profile.avatar.url;
    const avatarAlt = "Profile picture";
    const bio = event.target.bio.value || profile.bio;
    const bannerURL = event.target.banner.value || profile.banner.url;
    const bannerAlt = "Banner image";
    const venueManager = profile.venueManager;

    try {
      const url = new URL(`${API_URL}/holidaze/profiles/${storedName}`);
      const response = await fetch(url.href, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify({
          bio: bio,
          avatar: {
            url: avatarURL,
            alt: avatarAlt,
          },
          banner: {
            url: bannerURL,
            alt: bannerAlt,
          },
          venueManager: venueManager,
        }),
      });

      if (response.ok) {
        const updatedProfileData = await response.json();
        setProfile(updatedProfileData);
        setSuccessMessage("Profile Updated!");
        setIsEditing(false);

        setTimeout(() => {
          setSuccessMessage("");
        }, 1000);
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      setError(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const editButtonHandler = (event) => {
    event.preventDefault();
    setIsEditing(true);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const { name, avatar, banner, bio } = profile;
  return (
    <>
      <div className="w-full flex flex-col items-center bg-gray-800 py-3 gap-3 transition-all">
        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            {successMessage && (
              <div className="w-full flex items-center justify-center relative">
                <h2
                  className={`bg-green-400 absolute w-max py-1 px-9 rounded-md fade-out`}
                >
                  {successMessage}
                </h2>
              </div>
            )}
            {isEditing ? (
              <div>
                <div className="flex flex-col items-center">
                  <img
                    src={avatar?.url}
                    alt={avatar?.alt || "profile picture"}
                    className="h-48 object-cover"
                  />
                  <form
                    onSubmit={editProfile}
                    className="flex flex-col gap-3 my-3"
                  >
                    <input
                      type="text"
                      id="avatar"
                      name="avatar"
                      placeholder="Avatar Image URL"
                      defaultValue={avatar?.url}
                      className="bg-gray-800 text-yellow-50 h-9 dark:text-gray-40 rounded-md"
                    />
                    <input
                      type="text"
                      id="bio"
                      name="bio"
                      placeholder="Bio"
                      defaultValue={bio}
                      className="bg-gray-800 text-yellow-50 h-9 dark:text-gray-40 rounded-md"
                    />
                    <input
                      type="text"
                      id="banner"
                      name="banner"
                      placeholder="Banner Image URL"
                      defaultValue={banner?.url}
                      className="bg-gray-800 text-yellow-50 h-9 dark:text-gray-40 rounded-md"
                    />
                    <input
                      type="submit"
                      className="bg-yellow-400 py-2 rounded-sm"
                      value="Save"
                    />
                    <button
                      onClick={() => setIsEditing(false)}
                      className="border-b border-red-300 text-red-500"
                    >
                      Cancel
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex flex-col items-center">
                  <img
                    src={avatar?.url}
                    alt={avatar?.alt || "profile picture"}
                    className="h-40 w-40 object-cover border border-yellow-200 rounded-full"
                  />
                  <h2 className="text-yellow-50 text-lg font-light">{name}</h2>
                </div>
              </div>
            )}
          </div>
        )}
        <button
          onClick={isEditing ? () => setIsEditing(false) : editButtonHandler}
          className="border-b border-yellow-50 text-yellow-50"
        >
          {isEditing ? "Cancel" : "Edit profile"}
        </button>
        <Link
          to={"/addlisting"}
          className="bg-gray-300 mt-5 py-2 px-6 rounded-md"
        >
          Add new
        </Link>
        <p className="text-yellow-50">My listings:</p>
        <div className="flex flex-col items-center gap-2 w-full">
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="flex flex-col items-center gap-2 w-full">
              <Tabs
                aria-label="Default tabs"
                style="underline"
                className="flex gap-2 items-center"
              >
                <Tabs.Item
                  active
                  title="Bookings"
                  icon={""}
                  style="active"
                  className="flex flex-col bg-red-600 focus:ring-red-500 active:bg-yellow-200"
                >
                  {profileBookings.length > 0 ? (
                    profileBookings.map((booking) => {
                      const venue = venues[booking.id];
                      return (
                        <div
                          key={booking.id}
                          className="flex flex-col items-center bg-slate-500 my-2 p-3"
                        >
                          <h2 className="text-yellow-50 text-lg font-light">
                            {venue ? venue.name : "Ooops..."}
                          </h2>
                          <p className=" text-yellow-50">
                            From: {formatDate(booking.dateFrom)}
                          </p>
                          <p className="text-yellow-50">
                            To: {formatDate(booking.dateTo)}
                          </p>
                        </div>
                      );
                    })
                  ) : (
                    <h2 className="text-yellow-50 text-lg font-light">
                      No Booking
                    </h2>
                  )}
                </Tabs.Item>

                <Tabs.Item title="Venues" icon={""} />
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
