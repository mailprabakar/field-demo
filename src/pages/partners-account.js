import "./partners-account.scss";
import "../js/global.js";
import netlifyIdentity from "netlify-identity-widget";

const compareDate = (exp) => {
  const d = Date.now();
  if (d > exp) {
    console.log("The session has expired.");
    // If we do nothing here, the Netlify widget will open and say that they
    // are logged in. Rather we want a new (not expired) token and for the user
    // to see our gated content.
    netlifyIdentity.refresh().then(() => {
      window.location.href = "/partners.html";
    });
    // If the refresh fails to get a new token, then at least the old cookie
    // is removed. However, the user will see Netlify's "You are logged in"
    // UI since that was already initialized before this refresh request was
    // sent. HACK: Force a redirect.
    setTimeout(function () {
      window.location.href = "/partners.html";
    }, 2000);
  } else {
    // In this case, the redirect to our partners page will load
    // that gated content - assuming our Netlify _redirects file is correct.
    setTimeout(function () {
      window.location.href = "/partners.html";
    }, 200);
  }
};
if (netlifyIdentity) {
  // Redirect to the partners page after a successful sign in.
  netlifyIdentity.on("init", (user) => {
    if (!user) {
      netlifyIdentity.on("login", () => {
        console.log("Redirecting from partners-account.js to partners.js.");
        location.href = "/partners.html";
      });
      netlifyIdentity.on("close", () => {
        console.log("Reopening the identity widget.");
        netlifyIdentity.open("login");
      });
    } else {
      // console.log(user);
      if (
        user.app_metadata.roles.includes("admin") ||
        user.app_metadata.roles.includes("partner")
      ) {
        compareDate(user.token.expires_at);
      } else {
        alert("Only admin and partner users are authorized.");
      }
    }
  });
}

netlifyIdentity.init();
netlifyIdentity.open();
