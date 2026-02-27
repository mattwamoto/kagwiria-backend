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
import { getMediaUrl, getYoutubeId, youtubeThumb, pickFallbackImage } from "/lib/content";

const useStyles = makeStyles({ ...styles, ...sectionStyles });

const fallbackDocs = [
  {
    slug: "africa-ride-documentary",
    title: "Africa Ride Documentary",
    status: "in_development",
    logline: "A long-form account of how riding creates infrastructure funding.",
    trailerYoutubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    slug: "turkana-literacy-documentary",
    title: "Turkana Literacy Hub",
    status: "in_production",
    logline: "An on-ground portrait of community-led literacy expansion.",
    trailerYoutubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
];

function mergeWithFallback(documentaries) {
  const merged = [...documentaries];
  const slugs = new Set(merged.map((item) => item.slug));

  for (const fallback of fallbackDocs) {
    if (!slugs.has(fallback.slug)) {
      merged.push(fallback);
    }
  }

  return merged.slice(0, 12);
}

export default function DocumentariesPage({ documentaries }) {
  const classes = useStyles();
  const items = mergeWithFallback(documentaries);

  return (
    <div>
      <Header
        color="transparent"
        brand="Documentaries"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 300, color: "white" }}
      />
      <Parallax small filter image="/img/bg.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>Long-form impact storytelling.</h1>
              <h4>Documentary projects that build trust and visibility.</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.section}>
          <GridContainer>
            {items.map((doc, index) => {
              const trailerId = getYoutubeId(doc.trailerYoutubeVideoId) || getYoutubeId(doc.trailerYoutubeUrl);
              const poster = getMediaUrl(doc.poster) || youtubeThumb(trailerId) || pickFallbackImage(index + 2);

              return (
                <GridItem xs={12} sm={6} md={4} key={doc.slug || doc.title}>
                  <Card className={classes.mediaCard}>
                    <div className={classes.mediaWrap}>
                      {trailerId ? (
                        <iframe
                          title={doc.title}
                          src={`https://www.youtube.com/embed/${trailerId}`}
                          className={classes.mediaFrame}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <img src={poster} alt={doc.title} className={classes.mediaImage} />
                      )}
                    </div>
                    <CardBody>
                      <h4 className={classes.cardTitle}>{doc.title}</h4>
                      <p>{doc.logline || "Documentary update coming soon."}</p>
                      <p className={classes.cardMeta}>{String(doc.status || "status pending").replaceAll("_", " ")}</p>
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
  const documentaries = await safeCms("/api/documentaries?sort=releaseDate:desc", []);
  return { props: { documentaries } };
}
