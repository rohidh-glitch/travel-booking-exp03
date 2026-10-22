
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookingProvider } from "./context/BookingContext";

const Home = lazy(() => import("./pages/Home"));
const PackageList = lazy(() => import("./pages/PackageList"));
const PackageDetailPage = lazy(() => import("./pages/PackageDetailPage"));
const BookingPage = lazy(() => import("./pages/BookingPage"));
const Checkout = lazy(() => import("./pages/Checkout"));
const BookingsPage = lazy(() => import("./pages/BookingsPage"));

function Loading() {
  return <p className="loading" role="status">Loading page...</p>;
}

export default function App() {
  return (
    <BookingProvider>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/packages" element={<PackageList />} />
            <Route path="/package/:id" element={<PackageDetailPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/bookings" element={<BookingsPage />} />
            <Route path="*" element={<main className="page"><h1>Page not found</h1><a href="/">Go Home</a></main>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </BookingProvider>
  );
}
