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

const useStyles = makeStyles({ ...styles, ...sectionStyles });

export default function DesertPagesPage({ desertProject }) {
  const classes = useStyles();

  return (
    <div>
      <Header
        color="transparent"
        brand="Desert Pages"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 300, color: "white" }}
      />
      <Parallax small filter image="/img/bg4.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>A mobile camel library for remote villages.</h1>
              <h4>{desertProject?.summary || "Structured, costed, and operational. Not a dream. A plan."}</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.section}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={7}>
              <Card>
                <CardBody>
                  <h3 className={classes.cardTitle}>Operational plan</h3>
                  <p>{desertProject?.bodyRichText || "Caravan-based distribution with a fixed route, local custodians, and scheduled restocks."}</p>
                  <p>Each caravan includes books, mobile shelving, solar lighting, and a trained local guide.</p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
              <Card>
                <CardBody>
                  <h3 className={classes.cardTitle}>Estimated cost</h3>
                  <p>KES 1.8M per caravan (camels, books, logistics, maintenance).</p>
                  <Button color="primary" href="/get-involved">Sponsor a caravan</Button>
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
  const [filtered, allProjects] = await Promise.all([
    safeCms("/api/projects?filters[title][$containsi]=desert&pagination[limit]=1", []),
    safeCms("/api/projects?pagination[limit]=1", []),
  ]);

  const desertProject = filtered[0] || allProjects[0] || null;
  return { props: { desertProject } };
}
