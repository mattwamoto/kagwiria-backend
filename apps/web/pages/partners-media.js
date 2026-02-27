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

const useStyles = makeStyles({ ...styles, ...sectionStyles });

export default function PartnersMediaPage({ partners, mediaMentions }) {
  const classes = useStyles();
  const partnerNames = partners.map((item) => item.name).filter(Boolean);
  const mediaNames = mediaMentions.map((item) => item.publisher || item.title).filter(Boolean);

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
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>Credibility and exposure.</h1>
              <h4>Trusted by partners and covered by regional and international media.</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.section}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardBody>
                  <h3 className={classes.cardTitle}>Partners</h3>
                  <div className={classes.inlineList}>
                    {(partnerNames.length ? partnerNames : ["Partner profiles coming soon"]).map((item) => (
                      <span className={classes.badge} key={item}>{item}</span>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardBody>
                  <h3 className={classes.cardTitle}>Media mentions</h3>
                  <div className={classes.inlineList}>
                    {(mediaNames.length ? mediaNames : ["Media mentions coming soon"]).map((item) => (
                      <span className={classes.badge} key={item}>{item}</span>
                    ))}
                  </div>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const [partners, mediaMentions] = await Promise.all([
    safeCms("/api/partner-logos?sort=createdAt:desc", []),
    safeCms("/api/media-mentions?sort=publishedAtSource:desc", []),
  ]);

  return { props: { partners, mediaMentions } };
}
