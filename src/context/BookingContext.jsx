
import {
  useEffect,
  useMemo,
  useState,
  useCallback,
} from "react";
import BookingContext from "./BookingContextStore";

import { logAction } from "../logger";

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

export function BookingProvider({ children }) {
  const [cart, setCart] = useState(() => readStorage("travel-cart", []));
  const [bookings, setBookings] = useState(() =>
    readStorage("travel-bookings", [])
  );

  useEffect(() => {
    localStorage.setItem("travel-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("travel-bookings", JSON.stringify(bookings));
  }, [bookings]);

  const addToCart = useCallback((pkg) => {
    setCart((current) => {
      const alreadyExists = current.some((item) => item.id === pkg.id);

      if (alreadyExists) {
        logAction("Add to cart skipped - package already exists", {
          packageId: pkg.id,
          packageName: pkg.title,
        });
        return current;
      }

      logAction("Package added to cart", {
        packageId: pkg.id,
        packageName: pkg.title,
      });

      return [...current, { ...pkg, travelDate: "", travelers: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCart((current) => {
      const removedItem = current.find((item) => item.id === id);

      logAction("Package removed from cart", {
        packageId: id,
        packageName: removedItem?.title,
      });

      return current.filter((item) => item.id !== id);
    });
  }, []);

  const updateCartItem = useCallback((id, changes) => {
    setCart((current) => {
      const updatedItem = current.find((item) => item.id === id);

      logAction("Cart item updated", {
        packageId: id,
        packageName: updatedItem?.title,
        changes,
      });

      return current.map((item) =>
        item.id === id ? { ...item, ...changes } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart((current) => {
      logAction("Cart cleared", {
        removedPackages: current.length,
      });

      return [];
    });
  }, []);

  const createBooking = useCallback(() => {
    let booking = null;

    setCart((currentCart) => {
      if (currentCart.length === 0) {
        logAction("Booking failed - cart is empty");
        return currentCart;
      }

      const items = currentCart.map((item) => ({ ...item }));

      const subtotal = items.reduce(
        (sum, item) => sum + item.price * item.travelers,
        0
      );

      const discount = subtotal >= 10000 ? subtotal * 0.1 : 0;
      const tax = (subtotal - discount) * 0.05;

      booking = {
        id: `TG${Date.now()}`,
        items,
        subtotal,
        discount,
        tax,
        total: subtotal - discount + tax,
        status: "Confirmed",
        createdAt: new Date().toISOString(),
      };

      logAction("Booking confirmed", {
        bookingId: booking.id,
        packages: items.map((item) => item.title),
        subtotal,
        discount,
        tax,
        total: booking.total,
        status: booking.status,
      });

      return [];
    });

    if (booking) {
      setBookings((current) => [booking, ...current]);
    }

    return booking;
  }, []);

  const cancelBooking = useCallback((id) => {
    setBookings((current) => {
      const bookingToCancel = current.find((booking) => booking.id === id);

      if (!bookingToCancel) {
        logAction("Booking cancellation failed - booking not found", {
          bookingId: id,
        });
        return current;
      }

      if (bookingToCancel.status === "Cancelled") {
        logAction("Booking already cancelled", { bookingId: id });
        return current;
      }

      logAction("Booking cancelled", {
        bookingId: id,
        packages: bookingToCancel.items.map((item) => item.title),
      });

      return current.map((booking) =>
        booking.id === id
          ? { ...booking, status: "Cancelled" }
          : booking
      );
    });
  }, []);

  const value = useMemo(
    () => ({
      cart,
      bookings,
      addToCart,
      removeFromCart,
      updateCartItem,
      clearCart,
      createBooking,
      cancelBooking,
    }),
    [
      cart,
      bookings,
      addToCart,
      removeFromCart,
      updateCartItem,
      clearCart,
      createBooking,
      cancelBooking,
    ]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

