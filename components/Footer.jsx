import React from "react";
import {
  AiOutlineTwitter,
  AiOutlineGithub,
  AiOutlineWhatsApp,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer-container">
      <p>2023 Kn_Beats All rights reserved</p>
      <p className="icons">
        {" "}
        <AiOutlineTwitter />
        <AiOutlineGithub />
        <AiOutlineWhatsApp />
      </p>
    </div>
  );
};

export default Footer;
