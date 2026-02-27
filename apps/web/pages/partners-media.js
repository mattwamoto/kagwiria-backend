import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import Carousel from "react-slick";

import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import Button from "/components/CustomButtons/Button.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Parallax from "/components/Parallax/Parallax.js";

import styles from "/styles/jss/nextjs-material-kit/pages/landingPage.js";
import sectionStyles from "/styles/jss/nextjs-material-kit/pages/kagwiriaSections.js";
import { safeCms } from "/lib/cms";
import { getMediaUrl, pickFallbackImage } from "/lib/content";

const pageStyles = {
  sectionTitle: {
    margin: "0 0 8px",
    fontSize: "1.9rem",
    color: "#1c2538",
    fontWeight: 700,
  },
  sectionText: {
    margin: "0 0 16px",
    color: "#4d596b",
    maxWidth: "760px",
  },
  logoCarouselWrap: {
    border: "1px solid #ece3d4",
    borderRadius: "14px",
    padding: "16px 10px 8px",
    background: "#fffdf9",
    boxShadow: "0 12px 28px rgba(15, 23, 42, 0.08)",
    marginBottom: "26px",
  },
  logoSlide: {
    padding: "0 8px",
  },
  logoLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #ece3d4",
    borderRadius: "12px",
    height: "120px",
    background: "#fff",
    padding: "8px",
    textDecoration: "none !important",
  },
  logoImage: {
    maxWidth: "100%",
    maxHeight: "84px",
    objectFit: "contain",
    display: "block",
  },
  logoFallback: {
    textAlign: "center",
    fontWeight: 700,
    fontSize: "0.86rem",
    color: "#1f2937",
    padding: "0 6px",
    lineHeight: 1.4,
  },
  mediaCard: {
    overflow: "hidden",
    margin: "0 0 18px !important",
    borderRadius: "12px",
    border: "1px solid #e8dece",
    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)",
  },
  mediaImageWrap: {
    width: "100%",
    height: "220px",
    background: "#111",
    overflow: "hidden",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  mediaMeta: {
    display: "inline-block",
    marginBottom: "8px",
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#7a4d24",
  },
  "@media (max-width: 767px)": {
    logoLink: {
      height: "100px",
    },
    mediaImageWrap: {
      height: "200px",
    },
  },
};

const useStyles = makeStyles({ ...styles, ...sectionStyles, ...pageStyles });

const fallbackPartners = [
  { name: "Education Access Fund", url: "#" },
  { name: "Ride for Literacy Africa", url: "#" },
  { name: "Desert Pages Coalition", url: "#" },
  { name: "Community Learning Network", url: "#" },
  { name: "Kenya Mobility Trust", url: "#" },
  { name: "Girls in Adventure Initiative", url: "#" },
  { name: "Impact Route Partners", url: "#" },
  { name: "African Storytelling Lab", url: "#" },
];

const fallbackMediaMentions = [
  {
    id: "mm-1",
    title: "How One Ride Is Reframing Access to Education in Remote Regions",
    publisher: "Impact Journal Africa",
    type: "digital",
    publishedAtSource: "2026-01-12T00:00:00.000Z",
    url: "#",
  },
  {
    id: "mm-2",
    title: "Field Dispatch: Mobile Library Logistics Across Northern Kenya",
    publisher: "Education Weekly East Africa",
    type: "press",
    publishedAtSource: "2025-12-28T00:00:00.000Z",
    url: "#",
  },
  {
    id: "mm-3",
    title: "Kagwiria Murungi on Building Sponsor-Backed Literacy Routes",
    publisher: "The Continental Podcast",
    type: "podcast",
    publishedAtSource: "2025-11-19T00:00:00.000Z",
    url: "#",
  },
  {
    id: "mm-4",
    title: "Inside the Africa Ride Program Model",
    publisher: "Rural Futures TV",
    type: "tv",
    publishedAtSource: "2025-10-03T00:00:00.000Z",
    url: "#",
  },
  {
    id: "mm-5",
    title: "Sponsor Visibility and Verified Impact on the Road",
    publisher: "Partnership Review",
    type: "digital",
    publishedAtSource: "2025-09-16T00:00:00.000Z",
    url: "#",
  },
  {
    id: "mm-6",
    title: "Desert Pages: Community Reading Circles and Route Discipline",
    publisher: "Public Service Radio",
    type: "radio",
    publishedAtSource: "2025-08-10T00:00:00.000Z",
    url: "#",
  },
];

function formatDate(value) {
  const stamp = Date.parse(value || "");
  if (Number.isNaN(stamp)) return "Date not available";
  return new Date(stamp).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

export default function PartnersMediaPage({ partners, mediaMentions }) {
  const classes = useStyles();
  const partnerItems = partners.length ? partners : fallbackPartners;
  const mentionItems = mediaMentions.length ? mediaMentions : fallbackMediaMentions;

  const logoCarouselSettings = {
    dots: true,
    arrows: true,
    infinite: partnerItems.length > 4,
    speed: 450,
    autoplay: partnerItems.length > 4,
    autoplaySpeed: 2600,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div>
      <Header
        color="transparent"
        brand="Partners & Media"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 300, color: "white" }}
      />
      <Parallax small filter image="/img/bg3.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={9}>
              <h1 className={classes.title}>Credibility and exposure.</h1>
              <h4>Trusted by partners and covered by regional and international media.</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>Partner Logos</h2>
          <p className={classes.sectionText}>A rotating carousel of organizations backing delivery, visibility, and route continuity.</p>
          <div className={classes.logoCarouselWrap}>
            <Carousel {...logoCarouselSettings}>
              {partnerItems.map((partner, index) => {
                const logo = getMediaUrl(partner.logoAsset);
                const href = partner.url || "#";
                const key = partner.id || partner.name || `partner-${index}`;

                return (
                  <div className={classes.logoSlide} key={key}>
                    <a
                      href={href}
                      target={href === "#" ? undefined : "_blank"}
                      rel={href === "#" ? undefined : "noopener noreferrer"}
                      className={classes.logoLink}
                      aria-label={partner.name || `Partner ${index + 1}`}
                    >
                      {logo ? (
                        <img src={logo} alt={partner.name || "Partner logo"} className={classes.logoImage} />
                      ) : (
                        <span className={classes.logoFallback}>{partner.name || "Partner"}</span>
                      )}
                    </a>
                  </div>
                );
              })}
            </Carousel>
          </div>

          <h2 className={classes.sectionTitle}>Media Mentions</h2>
          <p className={classes.sectionText}>Press, digital, podcast, and broadcast stories linking to the full mention.</p>
          <GridContainer>
            {mentionItems.map((mention, index) => {
              const cover = getMediaUrl(mention.logoAsset) || pickFallbackImage(index);
              const href = mention.url || "#";

              return (
                <GridItem xs={12} sm={6} md={4} key={mention.id || mention.title || `mention-${index}`}>
                  <Card className={classes.mediaCard}>
                    <div className={classes.mediaImageWrap}>
                      <img src={cover} alt={mention.publisher || mention.title || "Media mention"} className={classes.mediaImage} />
                    </div>
                    <CardBody>
                      <span className={classes.mediaMeta}>{mention.type || "media"}</span>
                      <h4 className={classes.cardTitle}>{mention.title || "Media mention"}</h4>
                      <p>{mention.publisher || "Publication"} • {formatDate(mention.publishedAtSource)}</p>
                      <Button
                        color="primary"
                        simple
                        href={href}
                        target={href === "#" ? undefined : "_blank"}
                        rel={href === "#" ? undefined : "noopener noreferrer"}
                      >
                        Read story
                      </Button>
                    </CardBody>
                  </Card>
                </GridItem>
              );
            })}
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const [partners, mediaMentions] = await Promise.all([
    safeCms("/api/partner-logos?populate=logoAsset&sort=createdAt:desc&pagination[limit]=30", []),
    safeCms("/api/media-mentions?populate=logoAsset&sort=publishedAtSource:desc&pagination[limit]=24", []),
  ]);

  return { props: { partners, mediaMentions } };
}
