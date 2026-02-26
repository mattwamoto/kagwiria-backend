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

export default function VlogsPage(props) {
  const classes = useStyles();
  const vlogs = [
    { title: "Ride Log Episode 1", summary: "First leg of the ride." },
    { title: "Desert Pages Field Day", summary: "Camel library operations." },
    { title: "Samburu Classroom Update", summary: "Site visit and progress." }
  ];

  return (
    <div>
      <Header
        color="transparent"
        brand="Vlogs"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 300, color: "white" }}
        {...props}
      />
      <Parallax small filter image="/img/bg6.jpg">
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
            {vlogs.map((vlog) => (
              <GridItem xs={12} sm={6} md={4} key={vlog.title}>
                <Card>
                  <CardBody>
                    <h4 className={classes.cardTitle}>{vlog.title}</h4>
                    <p>{vlog.summary}</p>
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
