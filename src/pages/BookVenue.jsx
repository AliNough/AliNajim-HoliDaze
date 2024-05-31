import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { API_URL, API_KEY } from "../lib/constants";
import { Spinner } from "flowbite-react";
import BookingCalendar from "../components/bookingCalendar";

export default function BookingForm() {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  const [guests, setGuests] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [bookings, setBookings] = useState([]);

  const params = new URLSearchParams(window.location.search);
  const accessToken = localStorage.getItem("accessToken");
  const id = params.get("venueid");
  console.log(id);
  useEffect(() => {
    if (successMessage || errorMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage("");
        setErrorMessage("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const bookingData = {
      dateFrom: dateFrom.toISOString(),
      dateTo: dateTo.toISOString(),
      guests: parseInt(guests, 10),
      venueId: id,
    };

    try {
      const response = await fetch(`${API_URL}/holidaze/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "X-Noroff-API-Key": API_KEY,
        },
        body: JSON.stringify(bookingData),
      });

      const bookingsResp = await fetch(`${API_URL}/holidaze/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": API_KEY,
        },
      });
      const bookingsData = await bookingsResp.json();
      setBookings(bookingsData.data || []);

      if (response.ok) {
        setSuccessMessage("Booking successful!");
        setDateFrom(null);
        setDateTo(null);
        setGuests(0);
      } else {
        throw new Error("Failed to create booking");
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-gray-800 py-3 gap-3 transition-all">
      {isLoading && <Spinner />}
      {successMessage && (
        <div className="bg-green-400 p-2 rounded">{successMessage}</div>
      )}
      {errorMessage && (
        <div className="bg-red-400 p-2 rounded">{errorMessage}</div>
      )}
      <div className="w-full flex justify-center bg-gray-100 px-5 pb-3">
        <BookingCalendar bookings={bookings} />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col items-center">
          <label htmlFor="dateFrom" className="text-yellow-50">
            Date From:
          </label>
          <DatePicker
            selected={dateFrom}
            onChange={(date) => setDateFrom(date)}
            className="bg-gray-800 text-yellow-50 rounded-md"
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="dateTo" className="text-yellow-50">
            Date To:
          </label>
          <DatePicker
            selected={dateTo}
            onChange={(date) => setDateTo(date)}
            className="bg-gray-800 text-yellow-50 rounded-md"
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="guests" className="text-yellow-50">
            Guests:
          </label>
          <input
            type="number"
            id="guests"
            name="guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="bg-gray-800 text-yellow-50 rounded-md"
            min="1"
            required
          />
        </div>
        <input
          type="submit"
          className="bg-yellow-400 py-2 rounded-sm"
          value="Book Now"
        />
      </form>
    </div>
  );
}
