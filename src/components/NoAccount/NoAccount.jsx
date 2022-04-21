import React, { useEffect, useState } from "react";
import "./NoAccount.css";
import Button from "../button/Button";
import Input from "../input/Input";

const NoAccount = ({ isLoggedIn = false }) => {
  const [isInvalid, setIsInvalid] = useState(false);
  const [regisEmail, setRegisEmail] = useState("");

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const register = () => {
    window.location.href = "https://itrack.vercel.app/Home";
  };

  useEffect(() => {
    if (regisEmail.length > 0) {
      setIsInvalid(!validateEmail(regisEmail));
    } else {
      setIsInvalid(false);
    }
  }, [regisEmail]);

  if (isLoggedIn) return null;

  return (
    <div className="no-account">
      <div className="regis-section">
        <h1 className="register">Register</h1>
        <div className="regis-input">
          <Input
            className="email-regis"
            placeholder="Enter your email"
            value={regisEmail}
            isInvalid={isInvalid}
            onChange={(e) => setRegisEmail(e.target.value)}
          />
          <Input
            className="password-regis"
            placeholder="Enter your password"
            type="password"
          />
          <Button className="regis-button custom-btn" onClick={register}>
            Register and Login
          </Button>
        </div>
      </div>
    </div>
  );
};
export default NoAccount;
