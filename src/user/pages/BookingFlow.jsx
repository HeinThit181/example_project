import { useState } from "react";
import "../../styles/user.css";

import Step2Details from "../components/Step2Details";
import Step3Court from "../components/Step3Court";
import Step4Payment from "../components/Step4Payment";
import Step5Confirm from "../components/Step5Confirm";
import Step6CreditCard from "../components/Step6CreditCard";
import Step6QR from "../components/Step6QR";
import Step7Success from "../components/Step7Success";

export default function BookingFlow() {
  const [step, setStep] = useState(2);
  const [bookingData, setBookingData] = useState({});

  // basic navigation
  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => prev - 1);
  const skip = () => setStep((prev) => prev + 2);

  // 🔥 decide AFTER confirm page
  const handleConfirmPayment = () => {
    if (bookingData.paymentMethod === "Credit Card") {
      setStep(6);
    } else if (bookingData.paymentMethod === "QR Code") {
      setStep(7);
    }
  };

  return (
    <section className="booking-page">
      <div className="booking-wrapper">

        {step === 2 && (
          <Step2Details
            bookingData={bookingData}
            setBookingData={setBookingData}
            next={next}
            skip={skip}
          />
        )}

        {step === 3 && (
          <Step3Court
            bookingData={bookingData}
            next={next}
            back={back}
          />
        )}

        {step === 4 && (
          <Step4Payment
            setBookingData={setBookingData}
            next={next}
            back={back}
          />
        )}

        {step === 5 && (
          <Step5Confirm
            bookingData={bookingData}
            next={handleConfirmPayment} // 🔥 route by payment
            back={back}
          />
        )}

        {step === 6 && (
          <Step6CreditCard onDone={() => setStep(8)} />
        )}

        {step === 7 && (
          <Step6QR onDone={() => setStep(8)} />
        )}

        {step === 8 && <Step7Success bookingData={bookingData} />}
      </div>
    </section>
  );
}
