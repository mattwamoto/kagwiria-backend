import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

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
import { getMediaUrl, getYoutubeId, youtubeThumb, pickFallbackImage } from "/lib/content";

const riderStyles = {
  portfolioHeader: {
    marginBottom: "22px"
  },
  portfolioEyebrow: {
    display: "inline-block",
    textTransform: "uppercase",
    letterSpacing: "0.09em",
    fontSize: "0.72rem",
    fontWeight: 700,
    color: "#7a4b2a",
    marginBottom: "8px"
  },
  portfolioTitle: {
    margin: "0 0 8px",
    fontSize: "2rem",
    color: "#1b2435",
    fontWeight: 700
  },
  bioSection: {
    marginBottom: "20px"
  },
  bioCard: {
    overflow: "hidden",
    margin: "0 !important",
    borderRadius: "14px",
    border: "1px solid #e5ddcf",
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.1)"
  },
  bioMedia: {
    width: "100%",
    height: "380px",
    objectFit: "cover",
    display: "block",
    background: "#111"
  },
  bioBody: {
    padding: "8px 4px 4px 14px"
  },
  bioTitle: {
    margin: "0 0 10px",
    color: "#172033",
    fontWeight: 700
  },
  bioText: {
    marginBottom: "12px",
    color: "#364152",
    lineHeight: "1.72"
  },
  profileLeadCard: {
    overflow: "hidden",
    margin: "0 !important",
    borderRadius: "14px",
    border: "1px solid #e5ddcf",
    boxShadow: "0 14px 34px rgba(15, 23, 42, 0.12)"
  },
  profileLeadMedia: {
    width: "100%",
    height: "460px",
    objectFit: "cover",
    display: "block",
    background: "#111"
  },
  profileLeadBody: {
    padding: "20px 22px"
  },
  profileName: {
    margin: "0 0 8px",
    fontWeight: 700,
    color: "#172033"
  },
  statsRow: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: "10px",
    marginBottom: "16px"
  },
  statPill: {
    border: "1px solid #eadfcb",
    borderRadius: "10px",
    padding: "10px",
    background: "#fffdf8"
  },
  statValue: {
    display: "block",
    fontWeight: 700,
    fontSize: "1.05rem",
    color: "#172033"
  },
  statLabel: {
    display: "block",
    fontSize: "0.78rem",
    color: "#5b6474",
    marginTop: "2px"
  },
  featureGrid: {
    display: "grid",
    gap: "12px"
  },
  featureCard: {
    overflow: "hidden",
    margin: "0 !important",
    borderRadius: "12px",
    border: "1px solid #ece4d6",
    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)"
  },
  featureMedia: {
    width: "100%",
    height: "205px",
    objectFit: "cover",
    display: "block",
    background: "#111"
  },
  featureBody: {
    padding: "14px 16px"
  },
  featureTitle: {
    margin: "0 0 4px",
    fontWeight: 700,
    color: "#1f2937"
  },
  featureMeta: {
    margin: 0,
    color: "#5b6474",
    fontSize: "0.82rem"
  },
  mediaSection: {
    paddingTop: "14px"
  },
  mediaCard: {
    overflow: "hidden",
    margin: "0 0 18px !important",
    borderRadius: "12px",
    border: "1px solid #ece4d6",
    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)"
  },
  mediaCover: {
    width: "100%",
    height: "250px",
    objectFit: "cover",
    display: "block",
    background: "#111"
  },
  mediaFrame: {
    width: "100%",
    height: "250px",
    border: 0,
    display: "block",
    background: "#111"
  },
  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "10px"
  },
  galleryImage: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    display: "block",
    borderRadius: "10px",
    border: "1px solid #e5ddcf"
  },
  "@media (max-width: 991px)": {
    bioMedia: {
      height: "320px"
    },
    profileLeadMedia: {
      height: "360px"
    },
    statsRow: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))"
    },
    galleryGrid: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))"
    }
  },
  "@media (max-width: 767px)": {
    portfolioTitle: {
      fontSize: "1.6rem"
    },
    bioMedia: {
      height: "270px"
    },
    profileLeadMedia: {
      height: "300px"
    },
    statsRow: {
      gridTemplateColumns: "1fr"
    },
    galleryGrid: {
      gridTemplateColumns: "1fr"
    },
    mediaCover: {
      height: "220px"
    },
    mediaFrame: {
      height: "220px"
    },
    galleryImage: {
      height: "210px"
    }
  }
};

const useStyles = makeStyles({ ...styles, ...sectionStyles, ...riderStyles });

function asText(value, fallback) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function asPlainText(value, fallback) {
  if (typeof value !== "string" || !value.trim()) return fallback;
  const cleaned = value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return cleaned || fallback;
}

function asMediaUrls(mediaField) {
  if (!mediaField) return [];
  const raw = Array.isArray(mediaField?.data)
    ? mediaField.data
    : Array.isArray(mediaField)
      ? mediaField
      : mediaField?.data
        ? [mediaField.data]
        : [mediaField];

  return raw.map((item) => getMediaUrl(item)).filter(Boolean);
}

function shortDate(value) {
  if (!value) return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric" }).format(parsed);
}

export default function TheRiderPage({ rider, vlogs, documentaries }) {
  const classes = useStyles();
  const portraitGallery = asMediaUrls(rider?.portraitAssets);
  const heroImage = portraitGallery[0] || pickFallbackImage(0);
  const bioImage = portraitGallery[1] || pickFallbackImage(1);
  const riderBio = asPlainText(
    rider?.philosophy,
    "Kagwiria Murungi is an adventure rider and education-access advocate whose routes connect remote communities to books, infrastructure, and long-term partner support."
  );
  const riderMission = asPlainText(
    rider?.ridingToAccessNarrative,
    "Her portfolio is built on movement: ride, verify, document, deliver. Each route leg is translated into measurable programs and accountable impact reporting."
  );

  const achievementCards = [
    {
      title: "National Ride Completion",
      meta: `${rider?.countiesCompleted || 47} counties completed`,
      image: portraitGallery[1] || pickFallbackImage(1),
    },
    {
      title: "Desert Pages Founder",
      meta: "Camel library and mobile access model",
      image: portraitGallery[2] || pickFallbackImage(2),
    },
    {
      title: "Africa Ride Buildout",
      meta: "Continental sponsorship and route strategy",
      image: portraitGallery[3] || pickFallbackImage(3),
    },
  ];

  const mediaPortfolio = [
    ...vlogs.map((item, index) => {
      const videoId = getYoutubeId(item.youtubeVideoId) || getYoutubeId(item.youtubeUrl);
      return {
        id: `vlog-${item.id || index}`,
        type: "Vlog",
        title: item.title || "Ride vlog",
        description: item.summary || "Road dispatch from the latest leg.",
        date: shortDate(item.publishedOn || item.createdAt),
        videoId,
        image: youtubeThumb(videoId) || getMediaUrl(item.thumbnail) || pickFallbackImage(index),
      };
    }),
    ...documentaries.map((item, index) => {
      const videoId = getYoutubeId(item.trailerYoutubeVideoId) || getYoutubeId(item.trailerYoutubeUrl);
      return {
        id: `doc-${item.id || index}`,
        type: "Documentary",
        title: item.title || "Documentary segment",
        description: item.logline || "Long-form production from the field.",
        date: shortDate(item.releaseDate || item.createdAt),
        videoId,
        image: getMediaUrl(item.poster) || youtubeThumb(videoId) || pickFallbackImage(index + 1),
      };
    }),
  ].slice(0, 4);

  return (
    <div>
      <Header
        color="transparent"
        brand="The Rider"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 260, color: "overlay" }}
      />
      <Parallax small filter image={heroImage}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>Rider Profile and Portfolio</h1>
              <h4>
                Since {asText(String(rider?.journeySince || "2021"), "2021")}, Kagwiria has turned every ride into public trust, partnerships, and visible educational impact.
              </h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.section}>
          <div className={classes.portfolioHeader}>
            <div className={classes.portfolioEyebrow}>Portfolio</div>
            <h2 className={classes.portfolioTitle}>The rider behind the mission</h2>
            <p className={classes.description}>
              A visual profile of the routes, field operations, and media footprint powering Kagwiria’s work.
            </p>
          </div>

          <div className={classes.bioSection}>
            <GridContainer alignItems="center">
              <GridItem xs={12} sm={12} md={5}>
                <Card className={classes.bioCard}>
                  <img src={bioImage} alt="Kagwiria bio portrait" className={classes.bioMedia} />
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={7}>
                <div className={classes.bioBody}>
                  <h3 className={classes.bioTitle}>Bio</h3>
                  <p className={classes.bioText}>{riderBio}</p>
                  <p className={classes.bioText}>{riderMission}</p>
                  <div className={classes.inlineList}>
                    <span className={classes.badge}>Adventure Rider</span>
                    <span className={classes.badge}>Education Access Advocate</span>
                    <span className={classes.badge}>Desert Pages Founder</span>
                    <span className={classes.badge}>Africa Ride Lead</span>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
          </div>

          <GridContainer>
            <GridItem xs={12} sm={12} md={7}>
              <Card className={classes.profileLeadCard}>
                <img src={heroImage} alt="Kagwiria rider portrait" className={classes.profileLeadMedia} />
                <CardBody className={classes.profileLeadBody}>
                  <h3 className={classes.profileName}>Kagwiria Murungi</h3>
                  <p>
                    {asPlainText(
                      rider?.ridingToAccessNarrative,
                      "Riding is not a campaign. It is infrastructure for access, visibility, and sustained support."
                    )}
                  </p>
                  <div className={classes.statsRow}>
                    <div className={classes.statPill}>
                      <span className={classes.statValue}>{rider?.countiesCompleted || 47}</span>
                      <span className={classes.statLabel}>Counties ridden</span>
                    </div>
                    <div className={classes.statPill}>
                      <span className={classes.statValue}>{asText(String(rider?.journeySince || "2021"), "2021")}</span>
                      <span className={classes.statLabel}>Journey since</span>
                    </div>
                    <div className={classes.statPill}>
                      <span className={classes.statValue}>Africa Next</span>
                      <span className={classes.statLabel}>Expansion track</span>
                    </div>
                  </div>
                  <Button color="primary" href="/get-involved">
                    Partner the rider
                  </Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
              <div className={classes.featureGrid}>
                {achievementCards.map((item) => (
                  <Card key={item.title} className={classes.featureCard}>
                    <img src={item.image} alt={item.title} className={classes.featureMedia} />
                    <CardBody className={classes.featureBody}>
                      <h4 className={classes.featureTitle}>{item.title}</h4>
                      <p className={classes.featureMeta}>{item.meta}</p>
                    </CardBody>
                  </Card>
                ))}
              </div>
            </GridItem>
          </GridContainer>

          <div className={classes.mediaSection}>
            <h3 className={classes.cardTitle}>Ride Films and Video Portfolio</h3>
            <p className={classes.description}>
              Documentary cuts and vlog dispatches that show how the mission runs on the ground.
            </p>
            <GridContainer>
              {mediaPortfolio.map((item, index) => (
                <GridItem xs={12} sm={6} md={6} key={item.id || `${item.type}-${index}`}>
                  <Card className={classes.mediaCard}>
                    {item.videoId ? (
                      <iframe
                        title={item.title}
                        src={`https://www.youtube.com/embed/${item.videoId}`}
                        className={classes.mediaFrame}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <img src={item.image} alt={item.title} className={classes.mediaCover} />
                    )}
                    <CardBody>
                      <div className={classes.storyKicker}>{item.type}</div>
                      <h4 className={classes.featureTitle}>{item.title}</h4>
                      <p>{item.description}</p>
                      <p className={classes.cardMeta}>{item.date}</p>
                    </CardBody>
                  </Card>
                </GridItem>
              ))}
            </GridContainer>
          </div>

          <div className={classes.mediaSection}>
            <h3 className={classes.cardTitle}>On-Road Gallery</h3>
            <div className={classes.galleryGrid}>
              {(portraitGallery.length ? portraitGallery : [0, 1, 2, 3].map((index) => pickFallbackImage(index))).slice(0, 4).map((image, index) => (
                <img key={`gallery-${index}`} src={image} alt={`Rider gallery ${index + 1}`} className={classes.galleryImage} />
              ))}
            </div>
            <p className={classes.description} style={{ marginTop: "14px" }}>
              {asPlainText(
                rider?.philosophy,
                "Every kilometer is evidence. Every stop builds trust. Every partnership funds classrooms, libraries, and digital access."
              )}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const [rider, vlogs, documentaries] = await Promise.all([
    safeCms("/api/rider-profile?populate=portraitAssets", null),
    safeCms("/api/vlogs?populate=thumbnail&sort=publishedOn:desc&pagination[limit]=2", []),
    safeCms("/api/documentaries?populate=poster&sort=releaseDate:desc&pagination[limit]=2", []),
  ]);

  return { props: { rider, vlogs, documentaries } };
}
