import React from "react";

import "./FacebookButton.css";

const FacebookButton = () => {
  return (
    <div
      class="fb-login-button"
      data-width=""
      data-size="small"
      data-button-type="continue_with"
      data-layout="default"
      data-auto-logout-link="false"
      data-use-continue-as="false"
    ></div>
  );
};

export default FacebookButton;
