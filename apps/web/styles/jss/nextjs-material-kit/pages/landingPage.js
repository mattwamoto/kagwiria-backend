import { container, title } from "/styles/jss/nextjs-material-kit.js";

const landingPageStyle = {
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    ...container
  },
  heroCarouselShell: {
    position: "relative",
    overflow: "hidden",
    minHeight: "84vh",
    background: "#0b1220"
  },
  heroTrack: {
    position: "relative",
    height: "100%",
    minHeight: "84vh"
  },
  heroSlide: {
    position: "absolute",
    inset: 0,
    height: "84vh",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    opacity: 0,
    transform: "scale(1.02)",
    transition: "opacity 700ms ease, transform 6200ms linear"
  },
  heroSlideActive: {
    opacity: 1,
    transform: "scale(1)"
  },
  heroDots: {
    position: "absolute",
    left: "50%",
    bottom: "20px",
    transform: "translateX(-50%)",
    zIndex: "8",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  heroDot: {
    width: "9px",
    height: "9px",
    borderRadius: "999px",
    border: "1px solid rgba(255,255,255,0.72)",
    background: "rgba(255,255,255,0.36)",
    cursor: "pointer",
    transition: "all 150ms ease"
  },
  heroDotActive: {
    width: "24px",
    background: "#fff"
  },
  heroOverlay: {
    position: "absolute",
    inset: "0",
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
    zIndex: "5"
  },
  heroOverlayContent: {
    pointerEvents: "auto"
  },
  title: {
    ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  "@media (max-width: 991px)": {
    heroCarouselShell: {
      minHeight: "72vh"
    },
    heroTrack: {
      minHeight: "72vh"
    },
    heroSlide: {
      height: "72vh"
    }
  },
  "@media (max-width: 767px)": {
    heroCarouselShell: {
      minHeight: "68vh"
    },
    heroSlide: {
      height: "68vh",
      backgroundPosition: "center center"
    },
    heroDots: {
      bottom: "14px"
    }
  }
};

export default landingPageStyle;
