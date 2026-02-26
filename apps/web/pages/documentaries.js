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

export default function DocumentariesPage(props) {
  const classes = useStyles();
  const docs = [
    { title: "Africa Ride Documentary", status: "In development" },
    { title: "Turkana Literacy Hub", status: "In production" }
  ];

  return (
    <div>
      <Header
        color="transparent"
        brand="Documentaries"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 300, color: "white" }}
        {...props}
      />
      <Parallax small filter image="/img/bg5.jpg">
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
            {docs.map((doc) => (
              <GridItem xs={12} sm={6} md={4} key={doc.title}>
                <Card>
                  <CardBody>
                    <h4 className={classes.cardTitle}>{doc.title}</h4>
                    <p>{doc.status}</p>
                  </CardBody>
                </Card>
              </GridItem>
            ))}
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}
