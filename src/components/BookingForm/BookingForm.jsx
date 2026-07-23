import { useState } from "react";
import { BsExclamationCircleFill } from "react-icons/bs";

import styles from "./BookingForm.module.css";

const initialForm = {
  name: "",
  email: "",
};

const initialErrors = {
  name: "",
  email: "",
};

const validateName = (name) => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    return "Please enter your name.";
  }

  if (trimmedName.split(/\s+/).length < 2) {
    return "Please enter your name.";
  }

  return "";
};

const validateEmail = (email) => {
  const trimmedEmail = email.trim();

  if (!trimmedEmail) {
    return "Please enter your email.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(trimmedEmail)) {
    return "Please enter a valid email.";
  }

  return "";
};

const BookingForm = () => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);

  const validateField = (name, value) => {
    if (name === "name") {
      return validateName(value);
    }

    if (name === "email") {
      return validateEmail(value);
    }

    return "";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((previousErrors) => ({
        ...previousErrors,
        [name]: validateField(name, value),
      }));
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const nextErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
    };

    setErrors(nextErrors);

    const hasErrors = Object.values(nextErrors).some(Boolean);

    if (hasErrors) {
      return;
    }

    alert("Booking successful!");

    setForm(initialForm);
    setErrors(initialErrors);
  };

  return (
    <form
      className={styles.bookingForm}
      onSubmit={handleSubmit}
      noValidate
    >
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>Book your campervan now</h2>

        <p className={styles.subtitle}>
          Stay connected! We are always ready to help you.
        </p>
      </div>

      <div className={styles.formContent}>
        <div className={styles.fields}>
          <div className={styles.field}>
            <div
              className={`${styles.inputContainer} ${
                errors.name ? styles.inputError : ""
              }`}
            >
              {errors.name && (
                <span className={styles.floatingLabel}>Name*</span>
              )}

              <input
                className={styles.input}
                id="booking-name"
                name="name"
                type="text"
                placeholder={errors.name ? "" : "Name*"}
                value={form.name}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={
                  errors.name ? "booking-name-error" : undefined
                }
                autoComplete="name"
                required
              />

              {errors.name && (
                <BsExclamationCircleFill
                  className={styles.errorIcon}
                  aria-hidden="true"
                />
              )}
            </div>

            {errors.name && (
              <p
                className={styles.errorMessage}
                id="booking-name-error"
              >
                {errors.name}
              </p>
            )}
          </div>

          <div className={styles.field}>
            <div
              className={`${styles.inputContainer} ${
                errors.email ? styles.inputError : ""
              }`}
            >
              {errors.email && (
                <span className={styles.floatingLabel}>Email*</span>
              )}

              <input
                className={styles.input}
                id="booking-email"
                name="email"
                type="email"
                placeholder={errors.email ? "" : "Email*"}
                value={form.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "booking-email-error" : undefined
                }
                autoComplete="email"
                required
              />

              {errors.email && (
                <BsExclamationCircleFill
                  className={styles.errorIcon}
                  aria-hidden="true"
                />
              )}
            </div>

            {errors.email && (
              <p
                className={styles.errorMessage}
                id="booking-email-error"
              >
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <button className={styles.submitButton} type="submit">
          Send
        </button>
      </div>
    </form>
  );
};

export default BookingForm;