import { useEffect, useState } from "react";
// import FetchListing from "../components/listingFetch";
import { API_URL } from "../lib/constants";
// import walletIcon from "../assets/icons/wallet.png";
import { Link } from "@tanstack/react-router";
import { Spinner } from "flowbite-react";
export default function ProfilePage() {
  const [profile, setProfile] = useState([]);
  const [userListing, setUserListing] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const getProfile = async () => {
      try {
        const storedName = localStorage.getItem("user_name");
        const url = new URL(`${API_URL}/auction/profiles/${storedName}`);
        url.searchParams.append("_listings", "true");

        const response = await fetch(url.href, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        const allData = await response.json();

        setProfile(allData);
        setUserListing(allData.listings);
        console.log(allData);
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

    const avatarURL = event.target.avatar.value;

    console.log("mmm", event.target.avatar.value);
    try {
      const url = new URL(`${API_URL}/auction/profiles/${storedName}/media`);
      const response = await fetch(url.href, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ avatar: avatarURL }),
        // Set the FormData object as the body
      });

      if (response.ok) {
        const updatedProfileData = await response.json();
        setProfile(updatedProfileData);
        setSuccessMessage("Profile Updated!");
        console.log(updatedProfileData);
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

  const { credits, name, avatar, wins } = profile;
  console.log(userListing);

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
                    src={avatar}
                    alt="profile picture"
                    className="h-48 object-cover"
                  />

                  <form
                    action=""
                    onSubmit={editProfile}
                    className="flex flex-col gap-3 my-3"
                  >
                    <input
                      type="text"
                      required
                      id="avatar"
                      name="avatar"
                      placeholder="Image"
                      className="bg-gray-800 text-yellow-50 h-9 dark:text-gray-40 rounded-md"
                    />
                    <input
                      type="submit"
                      className="bg-yellow-400 py-2 rounded-sm"
                      value="Save"
                    />

                    <button
                      onClick={() => setIsEditing(false)} // Use function reference
                      className="border-b border-red-300 text-red-500"
                    >
                      Cancel
                    </button>
                  </form>
                </div>
                <div className="flex flex-col items-center">
                  <h2 className="text-yellow-50 bg-gray-600 pt-1 px-3 text-lg font-ligh rounded-md">
                    Wallet: {credits} kr
                  </h2>
                </div>
              </div>
            ) : (
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
            )}
          </div>
        )}
        {isEditing ? (
          <button
            onClick={"editButtonHandler"}
            className="border-b border-red-300 text-red-500"
          ></button>
        ) : (
          <button
            onClick={editButtonHandler}
            className="border-b border-yellow-50 text-yellow-50"
          >
            Edit profile
          </button>
        )}

        <Link
          to={"/addlisting"}
          className="bg-gray-300 mt-5 py-2 px-6 rounded-md"
        >
          Add new
        </Link>
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
                      className="h-48 bg-slate-100 object-cover"
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
