import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

const defaultAvatar = "/defaultprofilepic.png";

function Profiles() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setError("Access Token not found in local storage. Please log in.");
      setLoading(false);
      return; // Exit the function early
    }

    const apiUrl = "https://api.noroff.dev/api/v1/social/profiles/";

    fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((responseData) => {
        setData(responseData);
        setLoading(false);

        console.log("API Data:", responseData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 mx-auto bg-white max-w-7xl">
      <h1 className="mb-12 text-2xl font-semibold tracking-wide text-black">
        Noroff API Profiles
      </h1>
      {error && <p>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid grid-cols-4 gap-5">
          {data.map((profile) => (
            <li key={profile.id}>
              <Link to={`/profile/${profile.id}`}>
                <div className="flex flex-col items-center justify-center gap-2 duration-100 transform cursor-pointer hover:font-semibold">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt={`${profile.name}'s profile picture`}
                      className="object-cover w-20 h-20 rounded-full"
                    />
                  ) : (
                    <img
                      src={defaultAvatar}
                      alt="Default profile pic"
                      className="object-cover w-20 h-20 rounded-full"
                    />
                  )}
                  <p>{profile.name}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Profiles;
