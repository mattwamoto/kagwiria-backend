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
    maxWidth: "700px",
  },
  chipRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "18px",
  },
  chip: {
    display: "inline-flex",
    alignItems: "center",
    border: "1px solid #e2d9c8",
    borderRadius: "999px",
    padding: "5px 12px",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    color: "#5b6474",
    background: "#fffdf8",
  },
  postCard: {
    overflow: "hidden",
    margin: "0 0 18px !important",
    borderRadius: "12px",
    border: "1px solid #e8dece",
    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)",
  },
  postImageWrap: {
    position: "relative",
    width: "100%",
    height: "230px",
    background: "#111",
  },
  postImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  postTag: {
    position: "absolute",
    left: "10px",
    top: "10px",
    fontSize: "0.68rem",
    padding: "4px 8px",
    borderRadius: "999px",
    background: "rgba(14, 20, 32, 0.86)",
    color: "#fff",
    textTransform: "uppercase",
    letterSpacing: "0.07em",
    fontWeight: 700,
  },
  galleryGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "10px",
    marginBottom: "26px",
  },
  galleryTile: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    display: "block",
    border: "1px solid #e7dece",
  },
  galleryTileWide: {
    gridColumn: "span 2",
    height: "260px",
  },
  vlogCard: {
    overflow: "hidden",
    margin: "0 0 18px !important",
    borderRadius: "12px",
    border: "1px solid #e8dece",
    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)",
  },
  vlogFrame: {
    width: "100%",
    height: "220px",
    border: 0,
    display: "block",
    background: "#111",
  },
  vlogImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    display: "block",
    background: "#111",
  },
  "@media (max-width: 991px)": {
    galleryGrid: {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
    galleryTileWide: {
      gridColumn: "span 2",
    },
  },
  "@media (max-width: 767px)": {
    galleryGrid: {
      gridTemplateColumns: "1fr",
    },
    galleryTile: {
      height: "230px",
    },
    galleryTileWide: {
      gridColumn: "span 1",
      height: "230px",
    },
  },
};

const useStyles = makeStyles({ ...styles, ...sectionStyles, ...pageStyles });

const fallbackDesertPosts = [
  {
    slug: "camel-library-day-01",
    title: "Camel Library Day 01",
    excerpt: "How a single route stop served three remote learning clusters in one morning.",
  },
  {
    slug: "desert-reading-circle",
    title: "Desert Reading Circle",
    excerpt: "Children-led reading sessions built around rotating book packs and local facilitators.",
  },
  {
    slug: "turkana-restock-window",
    title: "Turkana Restock Window",
    excerpt: "A practical post on stockout prevention and book replenishment by route calendar.",
  },
  {
    slug: "samburu-learning-stop",
    title: "Samburu Learning Stop",
    excerpt: "What changed after repeat visits and structured lending records.",
  },
  {
    slug: "caravan-maintenance-log",
    title: "Caravan Maintenance Log",
    excerpt: "Field maintenance priorities that keep mobile libraries operational.",
  },
  {
    slug: "desert-pages-community-day",
    title: "Desert Pages Community Day",
    excerpt: "Community volunteers and school leads coordinate pickup and return cycles.",
  },
  {
    slug: "desert-audio-learning-kit",
    title: "Audio Learning Kit Pilot",
    excerpt: "Pairing books with low-cost audio modules for multilingual support.",
  },
  {
    slug: "books-coverage-map",
    title: "Books Coverage Map",
    excerpt: "Visual map of reach expansion and underserved route segments.",
  },
  {
    slug: "desert-pages-procurement",
    title: "Procurement on Desert Routes",
    excerpt: "How local procurement reduces delays and preserves route reliability.",
  },
  {
    slug: "teacher-feedback-loop",
    title: "Teacher Feedback Loop",
    excerpt: "Feedback from teachers shaping next-month content selection.",
  },
  {
    slug: "desert-pages-route-diary-01",
    title: "Route Diary 01",
    excerpt: "A day-by-day record of route changes after weather disruptions.",
  },
  {
    slug: "desert-pages-route-diary-02",
    title: "Route Diary 02",
    excerpt: "How team coordination reduced delays on long-distance village legs.",
  },
  {
    slug: "desert-pages-learning-outcomes",
    title: "Learning Outcomes Snapshot",
    excerpt: "Early signals from reading sessions and attendance consistency.",
  },
  {
    slug: "desert-pages-school-kit-audit",
    title: "School Kit Audit",
    excerpt: "On-site audit of education kits and replacement priorities.",
  },
  {
    slug: "desert-pages-facilitator-training",
    title: "Facilitator Training Day",
    excerpt: "Training local facilitators to run independent reading sessions.",
  },
  {
    slug: "desert-pages-route-safety-notes",
    title: "Route Safety Notes",
    excerpt: "A practical set of route safety checks and incident-prevention steps.",
  },
  {
    slug: "desert-pages-community-lending",
    title: "Community Lending Program",
    excerpt: "Lending records, return cycles, and accountability at village level.",
  },
  {
    slug: "desert-pages-coverage-expansion",
    title: "Coverage Expansion Plan",
    excerpt: "What it takes to expand to new learning clusters sustainably.",
  },
];

const fallbackDesertVlogs = [
  {
    slug: "desert-vlog-01",
    title: "Desert Route Briefing",
    summary: "Morning dispatch from route planning and safe-access checks.",
    youtubeUrl: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
  },
  {
    slug: "desert-vlog-02",
    title: "Camel Library Movement",
    summary: "Live movement footage and stop-by-stop learning pickups.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    slug: "desert-vlog-03",
    title: "Book Distribution Day",
    summary: "How distribution is logged and verified in each village.",
    youtubeUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
  },
  {
    slug: "desert-vlog-04",
    title: "Teacher Coordination",
    summary: "Teacher-led briefing on reading outcomes and gaps.",
    youtubeUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
  },
  {
    slug: "desert-vlog-05",
    title: "Resupply Convoy",
    summary: "Resupply operations under heat and terrain constraints.",
    youtubeUrl: "https://www.youtube.com/watch?v=kXYiU_JCYtU",
  },
  {
    slug: "desert-vlog-06",
    title: "Evening Debrief",
    summary: "Field debrief with route data and next-day priorities.",
    youtubeUrl: "https://www.youtube.com/watch?v=Zi_XLOBDo_Y",
  },
  {
    slug: "desert-vlog-07",
    title: "Village Reading Session",
    summary: "On-site reading activity with community facilitators.",
    youtubeUrl: "https://www.youtube.com/watch?v=hTWKbfoikeg",
  },
  {
    slug: "desert-vlog-08",
    title: "Route Safety Review",
    summary: "Safety protocol checks before long desert crossings.",
    youtubeUrl: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
  },
  {
    slug: "desert-vlog-09",
    title: "Reading Circle Highlights",
    summary: "Classroom highlights from rotating reading circles.",
    youtubeUrl: "https://www.youtube.com/watch?v=YQHsXMglC9A",
  },
  {
    slug: "desert-vlog-10",
    title: "Desert Team Logistics",
    summary: "How route teams coordinate inventory and classroom requests.",
    youtubeUrl: "https://www.youtube.com/watch?v=60ItHLz5WEA",
  },
  {
    slug: "desert-vlog-11",
    title: "Village Partner Brief",
    summary: "Partner briefing with teachers and local facilitators.",
    youtubeUrl: "https://www.youtube.com/watch?v=ktvTqknDobU",
  },
  {
    slug: "desert-vlog-12",
    title: "Weekly Route Review",
    summary: "End-of-week review of coverage, demand, and stock planning.",
    youtubeUrl: "https://www.youtube.com/watch?v=RgKAFK5djSk",
  },
];

function asText(value, fallback) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function asPlainText(value, fallback) {
  if (typeof value !== "string" || !value.trim()) return fallback;
  const cleaned = value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  return cleaned || fallback;
}

function hasDesertSignal(entry) {
  const blob = [entry?.title, entry?.excerpt, entry?.summary, entry?.content]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (blob.includes("desert") || blob.includes("camel") || blob.includes("turkana") || blob.includes("samburu") || blob.includes("library")) {
    return true;
  }

  const tags = entry?.tags;
  if (Array.isArray(tags)) {
    return tags.some((tag) => String(tag).toLowerCase().includes("desert") || String(tag).toLowerCase().includes("library"));
  }

  return false;
}

export default function DesertPagesPage({ desertProject, posts, vlogs }) {
  const classes = useStyles();

  const linkedPosts = posts.length
    ? (posts.filter(hasDesertSignal).length ? posts.filter(hasDesertSignal) : posts).slice(0, 18)
    : fallbackDesertPosts;

  const videoItems = vlogs.length
    ? (vlogs.filter(hasDesertSignal).length ? vlogs.filter(hasDesertSignal) : vlogs).slice(0, 12)
    : fallbackDesertVlogs;

  const projectGallery = Array.isArray(desertProject?.galleryAssets?.data)
    ? desertProject.galleryAssets.data.map((asset) => getMediaUrl(asset)).filter(Boolean)
    : [];

  const galleryItems = (projectGallery.length
    ? projectGallery
    : Array.from({ length: 18 }, (_, index) => pickFallbackImage(index))).slice(0, 18);

  const heroImage = getMediaUrl(desertProject?.heroAsset) || pickFallbackImage(0);

  return (
    <div>
      <Header
        color="transparent"
        brand="Desert Pages"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 260, color: "overlay" }}
      />
      <Parallax small filter image={heroImage}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>Desert Pages: Stories, Gallery, and Field Vlogs</h1>
              <h4>{asText(desertProject?.summary, "A mobile camel library program documented through posts, photos, and live route footage.")}</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.section}>
          <h2 className={classes.sectionTitle}>Photo Stories Linked to Posts</h2>
          <p className={classes.sectionText}>{asPlainText(desertProject?.bodyRichText, "Every image links to a story update so partners can follow route progress and delivery outcomes.")}</p>
          <div className={classes.chipRow}>
            <span className={classes.chip}>Camel Routes</span>
            <span className={classes.chip}>Village Libraries</span>
            <span className={classes.chip}>Field Verification</span>
            <span className={classes.chip}>Community Reading</span>
          </div>
          <GridContainer>
            {linkedPosts.map((post, index) => {
              const image = getMediaUrl(post.featuredImage) || pickFallbackImage(index);

              return (
                <GridItem xs={12} sm={6} md={4} key={post.slug || post.id || post.title}>
                  <Card className={classes.postCard}>
                    <div className={classes.postImageWrap}>
                      <img src={image} alt={post.title || "Desert story"} className={classes.postImage} />
                      <div className={classes.postTag}>Post</div>
                    </div>
                    <CardBody>
                      <h4 className={classes.cardTitle}>{post.title || "Story update"}</h4>
                      <p>{post.excerpt || "Desert Pages story update."}</p>
                      <Button color="primary" simple href={`/blog?story=${post.slug || "desert-story"}`}>
                        Open post
                      </Button>
                    </CardBody>
                  </Card>
                </GridItem>
              );
            })}
          </GridContainer>

          <h2 className={classes.sectionTitle}>Desert Photo Gallery</h2>
          <p className={classes.sectionText}>Visual logs from caravan days, school stops, and route operations.</p>
          <div className={classes.galleryGrid}>
            {galleryItems.map((image, index) => (
              <img
                key={`gallery-${index}`}
                src={image}
                alt={`Desert gallery ${index + 1}`}
                className={classNames(classes.galleryTile, { [classes.galleryTileWide]: index === 0 || index === 5 })}
              />
            ))}
          </div>

          <h2 className={classes.sectionTitle}>Desert Vlogs</h2>
          <p className={classes.sectionText}>Route videos, distribution footage, and short field briefings.</p>
          <GridContainer>
            {videoItems.map((vlog, index) => {
              const videoId = getYoutubeId(vlog.youtubeVideoId) || getYoutubeId(vlog.youtubeUrl);
              const preview = youtubeThumb(videoId) || getMediaUrl(vlog.thumbnail) || pickFallbackImage(index + 1);

              return (
                <GridItem xs={12} sm={6} md={4} key={vlog.slug || vlog.id || vlog.title}>
                  <Card className={classes.vlogCard}>
                    {videoId ? (
                      <iframe
                        title={vlog.title || `Desert vlog ${index + 1}`}
                        src={`https://www.youtube.com/embed/${videoId}`}
                        className={classes.vlogFrame}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <img src={preview} alt={vlog.title || "Desert vlog"} className={classes.vlogImage} />
                    )}
                    <CardBody>
                      <h4 className={classes.cardTitle}>{vlog.title || "Desert vlog"}</h4>
                      <p>{vlog.summary || "Field vlog update."}</p>
                      <Button color="primary" simple href="/vlogs">
                        View vlog feed
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
  const [filtered, allProjects, posts, vlogs] = await Promise.all([
    safeCms("/api/projects?filters[title][$containsi]=desert&populate=heroAsset&populate=galleryAssets&pagination[limit]=1", []),
    safeCms("/api/projects?populate=heroAsset&populate=galleryAssets&pagination[limit]=1", []),
    safeCms("/api/blog-posts?populate=featuredImage&sort=publishedOn:desc&pagination[limit]=16", []),
    safeCms("/api/vlogs?populate=thumbnail&sort=publishedOn:desc&pagination[limit]=14", []),
  ]);

  const desertProject = filtered[0] || allProjects[0] || null;
  return { props: { desertProject, posts, vlogs } };
}
