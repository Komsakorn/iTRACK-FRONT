import React, { useState } from "react";
import "../page/login.css";
import NoAccount from "../NoAccount/NoAccount";
import "../NoAccount/NoAccount.css";
import "./SignUp.css";
import Button from "../button/Button";

const SignUp = () => {
  const [signUp, setSignUp] = useState(false);
  const handleOnClick = () => setSignUp(!signUp);
  return (
    <div className="sign-up">
      <div className="registration">
        <text className="no-regis">Don’t have an account?</text>
        <Button className="noacc-button custom-btn" onClick={handleOnClick}>
          Sign up
        </Button>
      </div>
      {signUp ? <NoAccount /> : null}
    </div>
  );
};

export default SignUp;
