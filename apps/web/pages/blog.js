import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Parallax from "/components/Parallax/Parallax.js";

import styles from "/styles/jss/nextjs-material-kit/pages/landingPage.js";
import sectionStyles from "/styles/jss/nextjs-material-kit/pages/kagwiriaSections.js";
import { safeCms } from "/lib/cms";
import { getMediaUrl, pickFallbackImage } from "/lib/content";

const useStyles = makeStyles({ ...styles, ...sectionStyles });

const reelUrl = "https://www.facebook.com/reel/2078515732931698/?mibextid=rS40aB7S9Ucbxw6v";

const fallbackPosts = [
  {
    slug: "books-for-my-other-children",
    title: "Books for My Other Children",
    excerpt: "A field reflection on learners in remote areas who ask for one thing first: books that stay with them.",
    source: reelUrl,
  },
  {
    slug: "birth-giver-to-many-classrooms",
    title: "From Birth Giver to Mother of Many Classrooms",
    excerpt: "The road expands family: every school stop adds new children we are accountable to, not in words but in delivery.",
    source: reelUrl,
  },
  {
    slug: "when-the-books-run-out",
    title: "When the Books Run Out",
    excerpt: "A practical look at replenishment: inventory gaps, transport constraints, and how sponsorship closes the loop.",
    source: reelUrl,
  },
  {
    slug: "hawa-wangu-tumeishanwo",
    title: "Hawa Wangu Tumeishanwo: Why Supply Continuity Matters",
    excerpt: "A story from the field on demand pressure and the operational discipline needed to keep access alive.",
    source: reelUrl,
  },
];

function mergeAtLeastFour(posts) {
  const merged = [...posts];
  const slugs = new Set(merged.map((item) => item.slug));

  for (const fallback of fallbackPosts) {
    if (merged.length >= 4) {
      break;
    }

    if (!slugs.has(fallback.slug)) {
      merged.push(fallback);
      slugs.add(fallback.slug);
    }
  }

  return merged.slice(0, 12);
}

export default function BlogPage({ posts }) {
  const classes = useStyles();
  const items = mergeAtLeastFour(posts);

  return (
    <div>
      <Header
        color="transparent"
        brand="Blog"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 300, color: "white" }}
      />
      <Parallax small filter image="/img/bg4.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>Field notes and impact reports.</h1>
              <h4>Stories backed by data and real road logs.</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.section}>
          <GridContainer>
            {items.map((post, index) => {
              const image = getMediaUrl(post.featuredImage) || pickFallbackImage(index);

              return (
                <GridItem xs={12} sm={6} md={4} key={post.slug || post.title}>
                  <Card className={classes.mediaCard}>
                    <div className={classes.mediaWrap}>
                      <img src={image} alt={post.title} className={classes.mediaImage} />
                    </div>
                    <CardBody>
                      <h4 className={classes.cardTitle}>{post.title}</h4>
                      <p>{post.excerpt || "Update coming soon."}</p>
                      {post.source ? (
                        <p className={classes.cardMeta}>
                          Source: <a href={post.source} target="_blank" rel="noopener noreferrer">Facebook Reel</a>
                        </p>
                      ) : null}
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
  const posts = await safeCms("/api/blog-posts?sort=publishedOn:desc", []);
  return { props: { posts } };
}
