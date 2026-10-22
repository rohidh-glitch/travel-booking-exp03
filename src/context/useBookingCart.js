import { useContext } from "react";
import BookingContext from "./BookingContextStore";

export default function useBookingCart() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error(
      "useBookingCart must be used inside BookingProvider"
    );
  }

  return context;
}