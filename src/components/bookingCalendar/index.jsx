// components/BookingCalendar.js
import React from "react";
import PropTypes from "prop-types";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./bookingCalendar.css";

const BookingCalendar = ({ bookings }) => {
  const getBookedDates = () => {
    const dates = [];
    if (Array.isArray(bookings)) {
      bookings.forEach((booking) => {
        const start = new Date(booking.dateFrom);
        const end = new Date(booking.dateTo);
        const currentDate = new Date(start);

        while (currentDate <= end) {
          dates.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });
    }
    return dates;
  };

  const bookedDates = getBookedDates();

  const tileClassName = ({ date, view }) => {
    if (view === "month") {
      if (
        bookedDates.some(
          (bookedDate) =>
            bookedDate.getFullYear() === date.getFullYear() &&
            bookedDate.getMonth() === date.getMonth() &&
            bookedDate.getDate() === date.getDate()
        )
      ) {
        return "unavailable";
      }
    }
    return null;
  };

  return <Calendar tileClassName={tileClassName} />;
};

BookingCalendar.propTypes = {
  bookings: PropTypes.arrayOf(
    PropTypes.shape({
      dateFrom: PropTypes.string.isRequired,
      dateTo: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BookingCalendar;
