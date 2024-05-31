import { API_URL } from "../lib/constants";
import { API_KEY } from "../lib/constants";
import { useNavigate } from "@tanstack/react-router";

export default function AddNewVenue() {
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const form = e.target;

    const {
      nameInput,
      descriptionInput,
      mediaUrlInput,
      priceInput,
      maxGuestsInput,
      wifiInput,
      parkingInput,
      breakfastInput,
      petsInput,
      addressInput,
      cityInput,
      zipInput,
      countryInput,
      continentInput,
    } = form.elements;

    const mediaArray = [
      {
        url: mediaUrlInput.value.trim(),
        alt: "Venue Image",
      },
    ];

    const req = await fetch(`${API_URL}/holidaze/venues`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "X-Noroff-API-Key": API_KEY,
      },
      body: JSON.stringify({
        name: nameInput.value,
        description: descriptionInput.value,
        media: mediaArray,
        price: Number(priceInput.value),
        maxGuests: Number(maxGuestsInput.value),
        meta: {
          wifi: wifiInput.checked,
          parking: parkingInput.checked,
          breakfast: breakfastInput.checked,
          pets: petsInput.checked,
        },
        location: {
          address: addressInput.value.trim(),
          city: cityInput.value.trim(),
          zip: zipInput.value.trim(),
          country: countryInput.value.trim(),
          continent: continentInput.value.trim(),
        },
      }),
    });

    if (req.status === 201) {
      const data = await req.json();
      navigate(`/singlevenue/${data.id}/?id=${data.id}`);
      form.reset();
      console.log(data);
      alert("Venue Created");
    } else {
      const data = await req.json();
      console.log(data);
    }
  };

  return (
    <>
      <div className="bg-gray-800 w-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center mt-3 px-3">
          <h1 className="text-2xl font-bold text-yellow-100">Add New Venue</h1>
          <p className="text-gray-400 ">
            Please fill out the form below to add a new venue.
          </p>
        </div>
        <form
          action=""
          className="bg-gray-800 flex flex-col py-6 w-10/12 sm:w-2/4 "
          onSubmit={submitHandler}
        >
          <div className="relative">
            <input
              type="text"
              id="nameInput"
              name="nameInput"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-yellow-50 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-300 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="nameInput"
              className="absolute bg-gray-800 text-yellow-50 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-yellow-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Name <span className="text-xs text-gray-600">Required</span>
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="descriptionInput"
              name="descriptionInput"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-yellow-50 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-300 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="descriptionInput"
              className="absolute bg-gray-800 text-yellow-50 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-yellow-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Description{" "}
              <span className="text-xs text-gray-600">Required</span>
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="mediaUrlInput"
              name="mediaUrlInput"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-yellow-50 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-300 peer"
              placeholder=""
            />
            <label
              htmlFor="mediaUrlInput"
              className="absolute bg-gray-800 text-yellow-50 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-yellow-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Media URL
            </label>
          </div>

          <div className="relative">
            <input
              type="number"
              id="priceInput"
              name="priceInput"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-yellow-50 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-300 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="priceInput"
              className="absolute bg-gray-800 text-yellow-50 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-yellow-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Price <span className="text-xs text-gray-600">Required</span>
            </label>
          </div>
          <div className="relative">
            <input
              type="number"
              id="maxGuestsInput"
              name="maxGuestsInput"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-yellow-50 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-300 peer"
              placeholder=""
              required
            />
            <label
              htmlFor="maxGuestsInput"
              className="absolute bg-gray-800 text-yellow-50 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-yellow-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Max Guests <span className="text-xs text-gray-600">Required</span>
            </label>
          </div>
          <div className="flex gap-4">
            <input
              type="checkbox"
              id="wifiInput"
              name="wifiInput"
              className="mr-2"
            />
            <label htmlFor="wifiInput" className="text-yellow-50">
              Wifi
            </label>
            <input
              type="checkbox"
              id="parkingInput"
              name="parkingInput"
              className="mr-2"
            />
            <label htmlFor="parkingInput" className="text-yellow-50">
              Parking
            </label>
            <input
              type="checkbox"
              id="breakfastInput"
              name="breakfastInput"
              className="mr-2"
            />
            <label htmlFor="breakfastInput" className="text-yellow-50">
              Breakfast
            </label>
            <input
              type="checkbox"
              id="petsInput"
              name="petsInput"
              className="mr-2"
            />
            <label htmlFor="petsInput" className="text-yellow-50">
              Pets
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="addressInput"
              name="addressInput"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-yellow-50 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-300 peer"
              placeholder=""
            />
            <label
              htmlFor="addressInput"
              className="absolute bg-gray-800 text-yellow-50 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-yellow-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Address
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="cityInput"
              name="cityInput"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-yellow-50 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-300 peer"
              placeholder=""
            />
            <label
              htmlFor="cityInput"
              className="absolute bg-gray-800 text-yellow-50 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-yellow-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              City
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="zipInput"
              name="zipInput"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-yellow-50 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-300 peer"
              placeholder=""
            />
            <label
              htmlFor="zipInput"
              className="absolute bg-gray-800 text-yellow-50 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-yellow-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Zip
            </label>
          </div>
          <div className="relative">
            <input
              type="text"
              id="countryInput"
              name="countryInput"
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-yellow-50 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-yellow-300 peer"
              placeholder=""
            />
            <label
              htmlFor="countryInput"
              className="absolute bg-gray-800 text-yellow-50 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-yellow-300 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
            >
              Country
            </label>
          </div>

          <input
            type="submit"
            className="border mt-2 bg-gray-700 border-yellow-50 text-yellow-50 rounded-md py-1"
            value="Submit"
          />
        </form>
      </div>
    </>
  );
}
