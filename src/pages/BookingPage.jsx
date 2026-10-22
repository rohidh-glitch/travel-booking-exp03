
import { Link, useNavigate } from "react-router-dom";
import useBookingCart from "../context/useBookingCart";
import { logAction } from "../logger";

export default function BookingPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateCartItem } = useBookingCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.travelers,
    0
  );

  const discount = subtotal >= 10000 ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * 0.05;
  const total = subtotal - discount + tax;

  const readyToCheckout =
    cart.length > 0 && cart.every((item) => item.travelDate);

  const handleCheckout = () => {
    if (!readyToCheckout) {
      logAction("Checkout blocked - travel date missing");
      return;
    }

    logAction("Continue to checkout clicked", {
      packageCount: cart.length,
      subtotal,
      discount,
      tax,
      total,
    });

    navigate("/checkout");
  };

  return (
    <main className="page">
      <nav className="navbar">
        <Link className="brand" to="/">TravelGo</Link>
        <Link to="/packages">Explore Packages</Link>
      </nav>

      <h1>Your Booking Cart</h1>

      {cart.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <Link className="button" to="/packages">
            Explore Packages
          </Link>
        </>
      ) : (
        <>
          <section className="cart-list">
            {cart.map((item) => (
              <article className="cart-item" key={item.id}>
                <div>
                  <h2>{item.name}</h2>
                  <p>₹{item.price.toLocaleString("en-IN")} per person</p>
                </div>

                <label>
                  Travel date
                  <input
                    type="date"
                    min={new Date().toLocaleDateString("en-CA")}
                    value={item.travelDate}
                    onChange={(e) =>
                      updateCartItem(item.id, {
                        travelDate: e.target.value,
                      })
                    }
                    required
                  />
                </label>

                <label>
                  Travelers
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={item.travelers}
                    onChange={(e) => {
                      const count = Number(e.target.value);

                      if (count >= 1 && count <= 20) {
                        updateCartItem(item.id, { travelers: count });
                      }
                    }}
                    required
                  />
                </label>

                <p>
                  Item total: ₹
                  {(item.price * item.travelers).toLocaleString("en-IN")}
                </p>

                <button
                  className="button button-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </article>
            ))}
          </section>

          <section className="summary">
            <h2>Price Summary</h2>
            <p>Subtotal: ₹{subtotal.toLocaleString("en-IN")}</p>
            <p>Discount: −₹{discount.toLocaleString("en-IN")}</p>
            <p>Tax (5%): ₹{tax.toLocaleString("en-IN")}</p>
            <h2>Total: ₹{total.toLocaleString("en-IN")}</h2>

            <button
              className="button"
              disabled={!readyToCheckout}
              onClick={handleCheckout}
            >
              Continue to Checkout
            </button>

            {!readyToCheckout && (
              <p role="status">
                Select a travel date for every package to continue.
              </p>
            )}
          </section>
        </>
      )}
    </main>
  );
}
