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

const useStyles = makeStyles({ ...styles, ...sectionStyles });

export default function TheRiderPage(props) {
  const classes = useStyles();
  return (
    <div>
      <Header
        color="transparent"
        brand="The Rider"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 300, color: "white" }}
        {...props}
      />
      <Parallax small filter image="/img/bg2.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>Rider first. Impact anchored in riding.</h1>
              <h4>Since 2021, Kagwiria has ridden every county in Kenya, building a proven path from story to infrastructure.</h4>
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
                  <h3 className={classes.cardTitle}>Journey since 2021</h3>
                  <p>47 counties completed. 2024 East Africa Female Biker of the Year. 2026 Influence and Impact Award.</p>
                  <p>Riding is not a campaign. It is the infrastructure for access, visibility, and sustained support.</p>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <Card>
                <CardBody>
                  <h3 className={classes.cardTitle}>Philosophy of the road</h3>
                  <p>Every kilometer is evidence. Every stop builds trust. Every partnership funds classrooms, libraries, and digital access.</p>
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
