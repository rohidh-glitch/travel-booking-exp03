
import { Link, useNavigate } from "react-router-dom";
import useBookingCart from "../context/useBookingCart";
import { logAction } from "../logger";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, createBooking } = useBookingCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.travelers,
    0
  );
  const discount = subtotal >= 10000 ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.05;
  const total = subtotal - discount + tax;

  const canConfirm =
    cart.length > 0 && cart.every((item) => item.travelDate);

  const handleConfirm = () => {
    if (!canConfirm) {
      logAction("Booking confirmation blocked", {
        reason: "Cart is empty or travel dates are missing",
      });
      return;
    }

    logAction("Confirm booking clicked", {
      packageCount: cart.length,
      subtotal,
      discount,
      tax,
      total,
    });

    const booking = createBooking();

    if (booking) {
      logAction("Navigating to booking history", {
        bookingId: booking.id,
      });

      navigate("/bookings", {
        state: { bookingId: booking.id },
      });
    }
  };

  if (cart.length === 0) {
    return (
      <main className="page">
        <h1>No packages to checkout</h1>
        <Link to="/packages">Explore Packages</Link>
      </main>
    );
  }

  return (
    <main className="page">
      <h1>Checkout</h1>
      <p>Review your trip before confirming your booking.</p>

      {cart.map((item) => (
        <article className="cart-item" key={item.id}>
          <h2>{item.name}</h2>
          <p>Travel date: {item.travelDate}</p>
          <p>Travelers: {item.travelers}</p>
          <p>
            ₹{(item.price * item.travelers).toLocaleString("en-IN")}
          </p>
        </article>
      ))}

      <section className="summary">
        <p>Subtotal: ₹{subtotal.toLocaleString("en-IN")}</p>
        <p>Discount: −₹{discount.toLocaleString("en-IN")}</p>
        <p>Tax: ₹{tax.toLocaleString("en-IN")}</p>
        <h2>Total: ₹{total.toLocaleString("en-IN")}</h2>

        <button
          className="button"
          disabled={!canConfirm}
          onClick={handleConfirm}
        >
          Confirm Booking
        </button>

        <button
          className="button button-secondary"
          onClick={() => {
            logAction("Back to cart clicked");
            navigate("/booking");
          }}
        >
          Back to Cart
        </button>
      </section>
    </main>
  );
}
