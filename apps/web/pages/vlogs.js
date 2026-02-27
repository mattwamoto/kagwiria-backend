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
import { getYoutubeId, youtubeThumb, pickFallbackImage } from "/lib/content";

const useStyles = makeStyles({ ...styles, ...sectionStyles });

const fallbackVlogs = [
  {
    slug: "ride-log-episode-1",
    title: "Ride Log Episode 1",
    summary: "First leg of the ride and route setup.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    slug: "field-requests-for-books",
    title: "Field Requests for Books",
    summary: "Short video dispatch from communities asking for book continuity.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    slug: "desert-pages-route-day",
    title: "Desert Pages Route Day",
    summary: "Camel-library movement and restocking workflow.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

function mergeWithFallback(vlogs) {
  const merged = [...vlogs];
  const slugs = new Set(merged.map((item) => item.slug));

  for (const fallback of fallbackVlogs) {
    if (!slugs.has(fallback.slug)) {
      merged.push(fallback);
    }
  }

  return merged.slice(0, 12);
}

export default function VlogsPage({ vlogs }) {
  const classes = useStyles();
  const items = mergeWithFallback(vlogs);

  return (
    <div>
      <Header
        color="transparent"
        brand="Vlogs"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 300, color: "white" }}
      />
      <Parallax small filter image="/img/bg2.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>On the road.</h1>
              <h4>Video logs from the ride and field operations.</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.section}>
          <GridContainer>
            {items.map((vlog, index) => {
              const videoId = getYoutubeId(vlog.youtubeVideoId) || getYoutubeId(vlog.youtubeUrl);
              const previewImage = youtubeThumb(videoId) || pickFallbackImage(index);

              return (
                <GridItem xs={12} sm={6} md={4} key={vlog.slug || vlog.title}>
                  <Card className={classes.mediaCard}>
                    <div className={classes.mediaWrap}>
                      {videoId ? (
                        <iframe
                          title={vlog.title}
                          src={`https://www.youtube.com/embed/${videoId}`}
                          className={classes.mediaFrame}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <img src={previewImage} alt={vlog.title} className={classes.mediaImage} />
                      )}
                    </div>
                    <CardBody>
                      <h4 className={classes.cardTitle}>{vlog.title}</h4>
                      <p>{vlog.summary || "Video update coming soon."}</p>
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
  const vlogs = await safeCms("/api/vlogs?sort=publishedOn:desc", []);
  return { props: { vlogs } };
}
