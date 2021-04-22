// See index.scss for comments on Owl Carousel 2, Calendly, and Fancybox.
import "owl.carousel/dist/assets/owl.carousel.css";
import "../css/calendly.css";
import "@fancyapps/fancybox/dist/jquery.fancybox.css";

import "./partners.scss";

import "../js/global.js";
import "@fancyapps/fancybox";
import "owl.carousel";
import "wow.js";

import netlifyIdentity from "netlify-identity-widget";

(function ($) {
  "use strict";

  $("#partner-logout").on("click", function () {
    netlifyIdentity.init();
    netlifyIdentity.on("logout", () => {
      console.log("Logged out.");
      window.location.href = "/index.html";
    });
    netlifyIdentity.logout();
  });
})(jQuery);
