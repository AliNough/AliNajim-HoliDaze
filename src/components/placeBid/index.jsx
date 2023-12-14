import { useEffect, useState } from "react";
import { PostShape } from "../../lib/types";
import { API_URL } from "../../lib/constants";
import SNDcoin from "../../assets/sounds/Coins_272.wav";
import SNDcashReister from "../../assets/sounds/CashRegister_S08OF.40.wav";
import SNDonErr from "../../assets/sounds/ESM_Fantasy_Game_Crafting_UI_Tab_Button_8_Spell_Cast_Click_Switch_Lever_Latch.wav";

const sounds = [];

export default function QuantitySelector({ listingId = "no id" }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [quantity, setQuantity] = useState(""); // State to hold the quantity value
  const [error, setError] = useState(""); // State to hold the error message

  // Function to handle incrementing the quantity
  const handleIncrement = () => {
    // Assuming a limit of 9999 as a 5-digit number from 0 to 9
    if (parseInt(quantity) < 9999) {
      setQuantity((prevQuantity) => String(parseInt(prevQuantity || 0) + 1));
    }
  };

  // Function to handle decrementing the quantity
  const handleDecrement = () => {
    if (parseInt(quantity) > 0) {
      setQuantity((prevQuantity) => String(parseInt(prevQuantity || 0) - 1));
    }
  };

  // Function to handle input change for the quantity
  const handleInputChange = (event) => {
    const inputQuantity = event.target.value;
    console.log(inputQuantity);
    if (/^\d{0,5}$/.test(inputQuantity)) {
      setQuantity(inputQuantity);
    }
  };

  async function inpSubmitHandler(event) {
    event.preventDefault();
    console.log(quantity);
    console.log(listingId);

    const payload = {
      amount: Number(quantity),
    };

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setLoggedIn(true);
    }

    try {
      const response = await fetch(
        `${API_URL}/auction/listings/${listingId}/bids`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
        }
      );
      const json = await response.json();

      if (response.status === 200) {
        console.warn("Success, updated post!", json);
        const audio = new Audio(SNDcashReister);
        audio.volume = 0.5;
        audio.play();
        return (
          <>
            <p className="text-green-300 text-sm">{json.message}</p>
          </>
        );
      } else {
        const audio = new Audio(SNDonErr);
        audio.volume = 0.5;
        audio.play();

        return (
          <>
            <p className="text-red-300 text-sm">{json.message}</p>
          </>
        );
      }
    } catch (error) {
      setError(error);
      console.warn("Couldn't update post", error);
    }
  }

  return (
    <>
      <form
        className="max-w-xs mx-auto flex flex-col items-center"
        onSubmit={inpSubmitHandler}
      >
        <label
          htmlFor="quantity-input"
          className="block text-xs font-medium text-yellow-50 dark:text-white"
        >
          Type amount:
        </label>
        <div className="relative flex items-center max-w-[8rem]">
          <button
            type="button"
            onClick={handleDecrement}
            className="bg-red-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 2"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h16"
              />
            </svg>
          </button>
          <input
            type="text"
            id="quantity-input"
            defaultValue=""
            value={quantity ? quantity : 0}
            onChange={handleInputChange}
            className="bg-yellow-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder=""
            pattern="\d{0,5}" // Pattern to restrict input to 5 digits from 0 to 9
            required
          />
          <button
            type="button"
            onClick={handleIncrement}
            className="bg-green-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
          >
            <svg
              className="w-3 h-3 text-gray-900 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </button>
        </div>
        <input
          value="Place bid"
          type="submit"
          className=" bg-orange-300 px-8 py-1 rounded-md mt-3"
        />
      </form>
    </>
  );
}
QuantitySelector.propTypes = PostShape;
