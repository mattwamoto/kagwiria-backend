import { container, title } from "/styles/jss/nextjs-material-kit.js";

const kagwiriaSectionsStyle = {
  section: {
    padding: "70px 0",
    ...container
  },
  title: {
    ...title,
    marginBottom: "15px"
  },
  description: {
    color: "#555",
    marginBottom: "30px"
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
  }
};

export default kagwiriaSectionsStyle;
