import {
  container,
  hexToRGBAlpha,
  defaultFont,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  roseColor,
  transition,
  boxShadow,
  drawerWidth
} from "/styles/jss/nextjs-material-kit.js";

const headerStyle = {
  appBar: {
    display: "flex",
    border: "0",
    borderRadius: "3px",
    padding: "0.625rem 0",
    marginBottom: "20px",
    color: "#555",
    width: "100%",
    backgroundColor: "#fff",
    boxShadow:
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)",
    transition: "all 150ms ease 0s",
    alignItems: "center",
    flexFlow: "row nowrap",
    justifyContent: "flex-start",
    position: "relative",
    zIndex: "unset"
  },
  absolute: {
    position: "absolute",
    zIndex: "1100"
  },
  fixed: {
    position: "fixed",
    zIndex: "1100"
  },
  container: {
    ...container,
    minHeight: "74px",
    flex: "1",
    alignItems: "center",
    justifyContent: "space-between",
    display: "flex",
    flexWrap: "nowrap",
    transition: "min-height 220ms ease"
  },
  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    lineHeight: "30px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    padding: "6px 12px",
    letterSpacing: "unset",
    "&:hover,&:focus": {
      color: "inherit",
      background: "transparent"
    }
  },
  brandIdentity: {
    display: "inline-flex",
    alignItems: "center"
  },
  brandLogo: {
    width: "auto",
    height: "64px",
    maxWidth: "260px",
    borderRadius: "6px",
    objectFit: "contain",
    boxShadow: "0 6px 16px rgba(15, 23, 42, 0.25)",
    backgroundColor: "#fff",
    transition: "height 220ms ease, max-width 220ms ease, transform 220ms ease, box-shadow 220ms ease"
  },
  brandText: {
    fontWeight: "700",
    letterSpacing: "0.01em"
  },
  appResponsive: {
    margin: "20px 10px"
  },
  primary: {
    backgroundColor: primaryColor,
    color: "#FFFFFF",
    boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px ${hexToRGBAlpha(
      primaryColor,
      0.46
    )}`
  },
  info: {
    backgroundColor: infoColor,
    color: "#FFFFFF",
    boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px ${hexToRGBAlpha(
      infoColor,
      0.46
    )}`
  },
  success: {
    backgroundColor: successColor,
    color: "#FFFFFF",
    boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px ${hexToRGBAlpha(
      successColor,
      0.46
    )}`
  },
  warning: {
    backgroundColor: warningColor,
    color: "#FFFFFF",
    boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px ${hexToRGBAlpha(
      warningColor,
      0.46
    )}`
  },
  danger: {
    backgroundColor: dangerColor,
    color: "#FFFFFF",
    boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px ${hexToRGBAlpha(
      dangerColor,
      0.46
    )}`
  },
  rose: {
    backgroundColor: roseColor,
    color: "#FFFFFF",
    boxShadow: `0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px ${hexToRGBAlpha(
      roseColor,
      0.46
    )}`
  },
  transparent: {
    backgroundColor: "transparent !important",
    boxShadow: "none",
    paddingTop: "25px",
    color: "#FFFFFF"
  },
  overlay: {
    color: "#FFFFFF",
    backgroundColor: "rgba(7, 13, 24, 0.74) !important",
    backdropFilter: "blur(9px)",
    WebkitBackdropFilter: "blur(9px)",
    boxShadow: "0 8px 24px rgba(5, 10, 18, 0.35)"
  },
  scrolled: {
    paddingTop: "8px",
    paddingBottom: "8px",
    "& $container": {
      minHeight: "92px"
    },
    "& $brandLogo": {
      height: "82px",
      maxWidth: "340px",
      transform: "scale(1.03)",
      boxShadow: "0 10px 24px rgba(5, 10, 18, 0.34)"
    }
  },
  dark: {
    color: "#FFFFFF",
    backgroundColor: "#212121 !important",
    boxShadow:
      "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(33, 33, 33, 0.46)"
  },
  white: {
    border: "0",
    padding: "0.625rem 0",
    marginBottom: "20px",
    color: "#555",
    backgroundColor: "#fff !important",
    boxShadow:
      "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)"
  },
  drawerPaper: {
    border: "none",
    bottom: "0",
    transitionProperty: "top, bottom, width",
    transitionDuration: ".2s, .2s, .35s",
    transitionTimingFunction: "linear, linear, ease",
    width: drawerWidth,
    ...boxShadow,
    position: "fixed",
    display: "block",
    top: "0",
    height: "100vh",
    right: "0",
    left: "auto",
    visibility: "visible",
    overflowY: "visible",
    borderTop: "none",
    textAlign: "left",
    paddingRight: "0px",
    paddingLeft: "0",
    ...transition
  },
  "@media (max-width: 767px)": {
    container: {
      minHeight: "68px"
    },
    brandLogo: {
      height: "58px",
      maxWidth: "230px"
    },
    brandText: {
      fontSize: "16px"
    },
    scrolled: {
      "& $container": {
        minHeight: "82px"
      },
      "& $brandLogo": {
        height: "74px",
        maxWidth: "280px"
      }
    }
  }
};

export default headerStyle;
