import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-JYFQSL0K3R"); // ← replace with your ID
};

export const trackPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

export const trackEvent = (category: string, action: string) => {
  ReactGA.event({
    category,
    action,
  });
};