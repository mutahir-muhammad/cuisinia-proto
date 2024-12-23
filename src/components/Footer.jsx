import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <p>© 2024 Cuisinia. All rights reserved.</p>
      <p>
        Follow us on{" "}
        <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
          Instagram
        </a>{" "}
        |{" "}
        <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
          Facebook
        </a>{" "}
        |{" "}
        <a href="https://www.twitter.com" target="_blank" rel="noreferrer">
          Twitter
        </a>
      </p>
    </footer>
  );
}

export default Footer;
