import React, { useState } from 'react';

const ContactUs = () => {
  // State to toggle the form visibility
  const [isFormVisible, setIsFormVisible] = useState(false);

  // State to store form input values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload on form submit
    alert('Form submitted successfully!');
    console.log(formData); // For debugging, log the form data to the console
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
    setIsFormVisible(false); // Hide the form after submission
  };

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="contact-us-page">
      <button
        className="services-btn"
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        Contact Us
      </button>

      {isFormVisible && (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-field">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-field">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-field">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      )}

      <style>
        {`
          .contact-us-page {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 50px;
          }

          .services-btn {
            padding: 15px 30px;
            font-size: 16px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s ease;
          }

          .services-btn:hover {
            background-color: #45a049;
          }

          .contact-form {
            display: flex;
            flex-direction: column;
            gap: 15px;
            background-color: rgba(255, 255, 255, 0.9);
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            width: 100%;
            max-width: 500px;
            margin-top: 20px;
          }

          .input-field {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }

          .input-field input,
          .input-field textarea {
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 16px;
            width: 100%;
            box-sizing: border-box;
          }

          .submit-btn {
            padding: 15px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            transition: background-color 0.3s ease;
          }

          .submit-btn:hover {
            background-color: #45a049;
          }
        `}
      </style>
    </div>
  );
};

export default ContactUs;
