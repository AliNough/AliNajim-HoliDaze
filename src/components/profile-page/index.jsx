import { useState, useEffect } from "react";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const defaultAvatar = "/defaultprofilepic.png";
  const defaultString = "the API does not provide the data";
  const user_name = localStorage.getItem("user_name");
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) {
      console.error("Token not found in local storage.");
      setLoading(false);
      return;
    }

    if (!user_name) {
      console.error("User name not found in local storage.");
      setLoading(false);
      return;
    }

    fetch(`https://api.noroff.dev/api/v1/social/profiles/${user_name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.status === 401) {
          console.error("Token is invalid or expired.");
          setLoading(false);
          return null;
        }
        return response.json();
      })
      .then((responseData) => {
        if (responseData) {
          setProfile(responseData);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 mx-auto bg-white max-w-7xl">
      <h1 className="mb-12 text-2xl font-semibold tracking-wide text-black">
        Noroff API Profile
      </h1>
      {loading ? (
        <p>Loading...</p>
      ) : profile ? (
        <div>
          <div className="flex flex-row justify-start w-full">
            <h3 className="mb-4 text-2xl font-semibold tracking-wide text-black">
              {profile.name}
            </h3>
          </div>
          <div className="justify-center w-full gap-4 md:flex md:items-center">
            <div className="relative w-full md:w-4/5">
              <img
                src={profile.avatar || defaultAvatar}
                alt={`${profile.name}'s profile picture`}
                className="object-cover rounded md:h-96"
              />
            </div>

            <div className="flex-col w-full p-4 mt-4 rounded bg-slate-50 md:w-4/5 md:mt-0 md:h-96">
              <h4 className="text-lg font-semibold">About me</h4>
              <p className="mt-4">
                <span className="font-semibold">Age:</span> {defaultString}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Gender:</span> {defaultString}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Occupation:</span>{" "}
                {defaultString}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Email:</span>{" "}
                <span className="text-blue-700 duration-100 transform cursor-pointer hover:font-semibold">
                  {profile.email}
                </span>
              </p>
              <div className="w-full md:w-full">
                <p className="mt-10 text-sm">
                  This is some lorem ipsum because the API does not provide a
                  bio for the profile. Lorem ipsum dolor sit amet, consectetur
                  adipiscing elit. Cras tristique dignissim sem eget eleifend.
                  Praesent a nisi ut quam pellentesque fringilla. Suspendisse
                  risus ligula, volutpat vitae magna eget, mattis fermentum
                  diam. Integer gravida augue non laoreet sollicitudin.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>You need to log in to view this profile</p>
      )}
    </main>
  );
}

export default Profile;
