import { useEffect, useState } from "react";
import { PostShape } from "../../lib/types";

export default function CalculateTimeLeft({ listingId = "no ID!", data = [] }) {
  const [timeLeft, setTimeLeft] = useState("");

  const calculator = (endsAt) => {
    const currentDate = new Date();
    const endDate = new Date(endsAt);

    const difference = endDate - currentDate;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    } else {
      setTimeLeft("Bidding has ended");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      data.forEach(({ endsAt }) => calculator(endsAt));
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [data]);

  return (
    <>
      <p className="text-red-300 text-sm">{timeLeft}</p>
    </>
  );
}
CalculateTimeLeft.propTypes = PostShape;
