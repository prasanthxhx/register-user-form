import React, { useState } from "react";
import { ColorRing } from "react-loader-spinner";
import "./index.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch("http://127.0.0.1:8080/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: formData.firstname,
          lastname: formData.lastname,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to register. Please try again later."
        );
      }

      setSuccess(data.message);
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderLoadingPage = () => {
    return (
      <ColorRing
        visible={true}
        height="20"
        width="20"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
      />
    );
  };

  return (
    <div className="register-cont">
      <div className="register-card">
        <form className="form" onSubmit={handleSubmit}>
          <p className="title">Register</p>
          <p className="message">Signup now and get full access to our app.</p>
          {error && <p className="error">{error}</p>}
          {success && <p className="success">{success}</p>}
          <div className="flex">
            <label>
              <input
                className="input"
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
              <span>Firstname</span>
            </label>

            <label>
              <input
                className="input"
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
              <span>Lastname</span>
            </label>
          </div>

          <label>
            <input
              className="input"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <span>Email</span>
          </label>

          <label>
            <input
              className="input"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <span>Password</span>
          </label>

          <label>
            <input
              className="input"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <span>Confirm password</span>
          </label>
          <button className="submit" type="submit" disabled={loading}>
            {loading ? renderLoadingPage() : "Submit"}
          </button>
          <p className="signin">
            Already have an account? <a href="#">Signin</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
