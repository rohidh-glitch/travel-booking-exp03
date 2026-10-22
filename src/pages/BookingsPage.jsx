
import { Link, useLocation } from "react-router-dom";
import useBookingCart from "../context/useBookingCart";

export default function BookingsPage() {
  const { bookings, cancelBooking } = useBookingCart();
  const location = useLocation();
  const latestBookingId = location.state?.bookingId;

  return (
    <main className="page">
      <nav className="navbar">
        <Link className="brand" to="/">TravelGo</Link>
        <Link to="/packages">Explore Packages</Link>
      </nav>

      <h1>Booking History</h1>

      {latestBookingId && (
        <p className="success-message" role="status">
          Booking confirmed successfully! Reference: {latestBookingId}
        </p>
      )}

      {bookings.length === 0 ? (
        <>
          <p>You haven't made any bookings yet.</p>
          <Link className="button" to="/packages">Explore Packages</Link>
        </>
      ) : (
        <section className="booking-list">
          {bookings.map((booking) => (
            <article className="booking-card" key={booking.id}>
              <h2>Booking #{booking.id}</h2>
              <p>
                Booked on: {new Date(booking.createdAt).toLocaleDateString()}
              </p>

              {booking.items.map((item) => (
                <div key={item.id}>
                  <p><strong>{item.name}</strong></p>
                  <p>Travel date: {item.travelDate}</p>
                  <p>Travelers: {item.travelers}</p>
                </div>
              ))}

              <h3>
                Total: ₹{booking.total.toLocaleString("en-IN")}
              </h3>
              <p>Status: <strong>{booking.status}</strong></p>

              {booking.status !== "Cancelled" && (
                <button
                  className="button button-danger"
                  onClick={() => cancelBooking(booking.id)}
                >
                  Cancel Booking
                </button>
              )}
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
