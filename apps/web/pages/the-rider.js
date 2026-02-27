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

function asText(value, fallback) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

export default function TheRiderPage({ rider }) {
  const classes = useStyles();

  return (
    <div>
      <Header
        color="transparent"
        brand="The Rider"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 300, color: "white" }}
      />
      <Parallax small filter image="/img/bg2.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>Rider first. Impact anchored in riding.</h1>
              <h4>
                Since {asText(String(rider?.journeySince || "2021"), "2021")}, Kagwiria has ridden every county in Kenya.
              </h4>
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
                  <h3 className={classes.cardTitle}>Journey</h3>
                  <p>Counties completed: {rider?.countiesCompleted || 47}</p>
                  <p>
                    {asText(
                      rider?.ridingToAccessNarrative,
                      "Riding is not a campaign. It is the infrastructure for access, visibility, and sustained support."
                    )}
                  </p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardBody>
                  <h3 className={classes.cardTitle}>Philosophy of the road</h3>
                  <p>
                    {asText(
                      rider?.philosophy,
                      "Every kilometer is evidence. Every stop builds trust. Every partnership funds classrooms, libraries, and digital access."
                    )}
                  </p>
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
  const rider = await safeCms("/api/rider-profile", null);
  return { props: { rider } };
}
