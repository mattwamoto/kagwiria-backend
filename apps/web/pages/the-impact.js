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
import ImpactNumbersSection from "/pages-sections/Kagwiria-Sections/ImpactNumbersSection.js";
import { safeCms } from "/lib/cms";
import { getMediaUrl, pickFallbackImage } from "/lib/content";

const useStyles = makeStyles({ ...styles, ...sectionStyles });

const fallbackImpactPosts = [
  {
    slug: "impact-books-for-my-other-children",
    title: "Books for My Other Children",
    excerpt: "Field evidence from remote schools where continuity of books directly affects retention and confidence.",
    publishedOn: "2026-02-27",
  },
  {
    slug: "impact-birth-giver-classrooms",
    title: "From Birth Giver to Mother of Many Classrooms",
    excerpt: "How repeated route presence translates into durable sponsor trust and school-level outcomes.",
    publishedOn: "2026-02-27",
  },
  {
    slug: "impact-when-books-run-out",
    title: "When the Books Run Out",
    excerpt: "A practical impact report on stockouts, replenishment cadence, and sponsor-backed stabilization.",
    publishedOn: "2026-02-27",
  },
  {
    slug: "impact-hawa-wangu",
    title: "Why Supply Continuity Matters",
    excerpt: "Demand pressure from the field and the operational model used to keep access reliable.",
    publishedOn: "2026-02-27",
  },
];

function hasImpactTag(post) {
  const tags = post?.tags;
  if (Array.isArray(tags)) {
    return tags.some((tag) => String(tag).toLowerCase().includes("impact"));
  }

  if (typeof tags === "string") {
    return tags.toLowerCase().includes("impact");
  }

  if (tags && typeof tags === "object") {
    return Object.values(tags).some((value) => String(value).toLowerCase().includes("impact"));
  }

  return false;
}

function shortDate(value) {
  if (!value || typeof value !== "string") return "";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(parsed);
}

export default function TheImpactPage({ metrics, posts }) {
  const classes = useStyles();
  const impactPosts = posts.filter(hasImpactTag);
  const items = (impactPosts.length ? impactPosts : posts).slice(0, 8);
  const cards = items.length ? items : fallbackImpactPosts;

  return (
    <div>
      <Header
        color="transparent"
        brand="The Impact"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 260, color: "overlay" }}
      />
      <Parallax small filter image="/img/bg3.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>Proof, not promises.</h1>
              <h4>Impact stories that show how each ride becomes measurable education outcomes.</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ImpactNumbersSection
            stats={metrics.map((item) => ({ value: item.value || "-", label: item.label || "Impact metric" }))}
          />
          <div className={classes.section}>
            <h2 className={classes.title}>Impact Stories</h2>
            <p className={classes.description}>
              Blog posts focused on verified outcomes, delivery milestones, and community-level change.
            </p>
            <GridContainer>
              {cards.map((item, index) => {
                const image = getMediaUrl(item.featuredImage) || pickFallbackImage(index);

                return (
                  <GridItem xs={12} sm={6} md={4} key={item.slug || item.id || item.title}>
                    <Card className={classes.mediaCard}>
                      <div className={classes.mediaWrap}>
                        <img src={image} alt={item.title || "Impact story"} className={classes.mediaImage} />
                      </div>
                      <CardBody>
                        <h4 className={classes.cardTitle}>{item.title || "Impact story"}</h4>
                        <p>{item.excerpt || "Impact update coming soon."}</p>
                        <p className={classes.cardMeta}>{shortDate(item.publishedOn || item.createdAt)}</p>
                        <Button color="primary" simple href="/blog">
                          Read in Stories
                        </Button>
                      </CardBody>
                    </Card>
                  </GridItem>
                );
              })}
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const [metrics, posts] = await Promise.all([
    safeCms("/api/impact-metrics?sort=sortOrder:asc", []),
    safeCms("/api/blog-posts?populate=featuredImage&sort=publishedOn:desc&pagination[limit]=12", []),
  ]);

  return { props: { metrics, posts } };
}
