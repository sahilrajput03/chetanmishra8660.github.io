const divInstall = document.getElementById("installContainer");
const butInstall = document.getElementById("butInstall");
const divInstall22 = document.getElementById("pappu");

/* Put code here */
// KHATARNAAK AREA STARTS HERE.
// BOOBOOM TAMTAM
let flag = false;
window.addEventListener("beforeinstallprompt", (event) => {
  console.log("👍", "beforeinstallprompt", event);
  console.log("I have come.");
  console.log("I have come.");
  flag = "fired";
  // Stash the event so it can be triggered later.
  window.deferredPrompt = event;
  //my new install button callibratinon code below:--
  console.log("I have come.");
  // BOOM => FOR INSTANTLY ASKING FOR ADDING THE ADD TO MOBILE/DESKTOP
  // window.deferredPrompt.prompt()
  // BOOM ^^ FOR INSTANTLY ASKING FOR ADDING THE ADD TO MOBILE/DESKTOP

  // Remove the 'hidden' class from the install button container
  divInstall.classList.toggle("hidden", false);
});

setTimeout(() => {
  if (
    !window.matchMedia("(display-mode: standalone)").matches &&
    !flag &&
    navigator.userAgent.toLowerCase().indexOf("android") > -1
  ) {
    divInstall22.classList.toggle("hidden", false);
    console.log(flag);
  }
}, 3000);

console.log(
  "finished the window.deferredPrompteventcode..., checking for standalone state..now.."
);
if (!window.matchMedia("(display-mode: standalone)").matches) {
  document.getElementById("pappu").style.visibility = "visible";
}

butInstall.addEventListener("click", () => {
  console.log("👍", "butInstall-clicked");
  const promptEvent = window.deferredPrompt;
  if (!promptEvent) {
    // The deferred prompt isn't available.
    return;
  }
  // Show the install prompt.
  promptEvent.prompt();
  // Log the result
  promptEvent.userChoice.then((choiceresult) => {
    console.log("👍", "userChoice", choiceresult);
    // Reset the deferred prompt variable, since
    // prompt() can only be called once.
    if (choiceresult.outcome === "accepted") {
      console.log("User accepted the install prompt");
      butInstall.innerHTML = "Cancel";
      setTimeout(() => {
        () => (window.location.href = "https://www.r1.jujn.ml");
      }, 3300);
    } else {
      console.log("User dismissed the install prompt");
    }
    window.deferredPrompt = null;
    // Hide the install button.
    divInstall.classList.toggle("hidden", true);
  });
});
// BOOBOOM TAMTAM
// KHATARNAAK AREA ENDS HERE.

/* Only register a service worker if it's supported */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js");
}

/**
 * Warn the page must be served over HTTPS
 * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
 * Installability requires a service worker with a fetch event handler, and
 * if the page isn't served over HTTPS, the service worker won't load.
 */
if (window.location.protocol === "http:") {
  try {
    const requireHTTPS = document.getElementById("requireHTTPS");
    const link = requireHTTPS.querySelector("a");
    link.href = window.location.href.replace("http://", "https://");
    requireHTTPS.classList.remove("hidden");
  } catch (err) {
    console.log(err);
  }
}
