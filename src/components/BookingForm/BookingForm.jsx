import { useState } from "react";
import styles from "./BookingForm.module.css";

const BookingForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    date: "",
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking successful!");
  };

  return (
    <form className={styles.bookingForm} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Book your campervan now</h2>
      <p className={styles.subtitle}>
        Stay connected! We are always ready to help you.
      </p>

      <input
        name="name"
        type="text"
        placeholder="Name*"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        name="email"
        type="email"
        placeholder="Email*"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        name="date"
        type="text"
        placeholder="Booking date*"
        value={form.date}
        onChange={handleChange}
        required
      />

      <textarea
        name="comment"
        placeholder="Comment"
        value={form.comment}
        onChange={handleChange}
      />

      <button type="submit">Send</button>
    </form>
  );
};

export default BookingForm;
