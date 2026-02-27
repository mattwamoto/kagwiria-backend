import { container, title } from "/styles/jss/nextjs-material-kit.js";

const kagwiriaSectionsStyle = {
  section: {
    padding: "60px 0",
    ...container
  },
  title: {
    ...title,
    marginBottom: "14px"
  },
  description: {
    color: "#4f5b6a",
    marginBottom: "26px",
    maxWidth: "640px"
  },
  statCard: {
    padding: "20px",
    textAlign: "center"
  },
  statNumber: {
    fontSize: "2.2rem",
    fontWeight: "600",
    marginBottom: "6px",
    color: "#2d2d2d"
  },
  statLabel: {
    fontSize: "0.95rem",
    color: "#666"
  },
  cardTitle: {
    fontWeight: "600",
    marginBottom: "6px"
  },
  badge: {
    display: "inline-block",
    padding: "6px 12px",
    borderRadius: "20px",
    background: "#f2f2f2",
    color: "#333",
    fontSize: "0.8rem",
    marginRight: "8px",
    marginBottom: "8px"
  },
  callout: {
    padding: "30px",
    borderRadius: "8px",
    background: "linear-gradient(135deg, #1b1b1b 0%, #4b3b2f 100%)",
    color: "#fff"
  },
  calloutText: {
    marginBottom: "15px"
  },
  inlineList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px"
  },
  formRow: {
    marginBottom: "16px"
  },
  mediaCard: {
    overflow: "hidden"
  },
  mediaWrap: {
    width: "100%",
    height: "220px",
    overflow: "hidden",
    background: "#111"
  },
  mediaImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block"
  },
  mediaFrame: {
    width: "100%",
    height: "100%",
    border: 0,
    display: "block"
  },
  cardMeta: {
    color: "#6b7280",
    fontSize: "0.82rem",
    marginTop: "6px",
    marginBottom: 0
  },
  magazineSection: {
    ...container,
    padding: "54px 0 38px"
  },
  magazineHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: "20px",
    marginBottom: "20px",
    paddingBottom: "12px",
    borderBottom: "1px solid #ece5d9"
  },
  magazineTitle: {
    ...title,
    margin: "0 0 8px",
    color: "#1e293b",
    fontSize: "2.05rem",
    lineHeight: "1.18"
  },
  editorialGrid: {
    alignItems: "stretch"
  },
  leadStoryCard: {
    overflow: "hidden",
    height: "100%",
    margin: "0 !important",
    borderRadius: "14px",
    border: "1px solid #ece7dd",
    boxShadow: "0 16px 36px rgba(17, 24, 39, 0.12)"
  },
  leadMediaWrap: {
    position: "relative",
    width: "100%",
    height: "360px",
    overflow: "hidden",
    background: "#111"
  },
  leadStoryBody: {
    padding: "22px 24px"
  },
  storyKicker: {
    display: "inline-block",
    fontSize: "0.7rem",
    fontWeight: "700",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#8a5a2c",
    marginBottom: "8px"
  },
  storyTitle: {
    fontWeight: "700",
    marginBottom: "8px",
    color: "#172033"
  },
  leadExcerpt: {
    margin: "0 0 10px",
    color: "#465165"
  },
  storyFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px"
  },
  storyStack: {
    display: "grid",
    gap: "14px"
  },
  sideStoryCard: {
    overflow: "hidden",
    margin: "0 !important",
    borderRadius: "12px",
    border: "1px solid #ece7dd",
    boxShadow: "0 9px 20px rgba(15, 23, 42, 0.08)"
  },
  sideStoryRow: {
    display: "grid",
    gridTemplateColumns: "168px 1fr"
  },
  sideMediaWrap: {
    position: "relative",
    width: "100%",
    minHeight: "120px",
    background: "#111"
  },
  sideStoryBody: {
    padding: "12px 14px"
  },
  sideStoryTitle: {
    fontSize: "1rem",
    margin: "0 0 6px",
    fontWeight: "700",
    color: "#1f2937"
  },
  sideStoryExcerpt: {
    margin: "0 0 6px",
    fontSize: "0.89rem",
    lineHeight: "1.5",
    color: "#4f5b6a"
  },
  mediaTag: {
    position: "absolute",
    top: "10px",
    left: "10px",
    background: "rgba(17, 24, 39, 0.85)",
    color: "#f8fafc",
    fontSize: "0.68rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontWeight: "700",
    padding: "5px 8px",
    borderRadius: "999px"
  },
  "@media (max-width: 991px)": {
    magazineHeader: {
      alignItems: "flex-start",
      flexDirection: "column"
    },
    sideStoryRow: {
      gridTemplateColumns: "150px 1fr"
    }
  },
  "@media (max-width: 767px)": {
    magazineTitle: {
      fontSize: "1.7rem"
    },
    leadMediaWrap: {
      height: "260px"
    },
    sideStoryRow: {
      gridTemplateColumns: "1fr"
    },
    sideMediaWrap: {
      minHeight: "180px"
    }
  }
};

export default kagwiriaSectionsStyle;
