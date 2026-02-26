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

import ImpactNumbersSection from "/pages-sections/Kagwiria-Sections/ImpactNumbersSection.js";

const useStyles = makeStyles({ ...styles, ...sectionStyles });

export default function TheImpactPage(props) {
  const classes = useStyles();
  return (
    <div>
      <Header
        color="transparent"
        brand="The Impact"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 300, color: "white" }}
        {...props}
      />
      <Parallax small filter image="/img/bg3.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>Proof, not promises.</h1>
              <h4>Programs that turn visibility into classrooms, libraries, and long-term access.</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ImpactNumbersSection />
          <div className={classes.section}>
            <GridContainer>
              {[
                { title: "Turkana Literacy Hub", text: "Operational hub delivering literacy and digital access." },
                { title: "Book Drive 2026", text: "Nationwide mobilization for rural school libraries." },
                { title: "Digital Inclusion Equipment", text: "Secured desktops and printers for learning centers." },
                { title: "Samburu Classroom Initiative", text: "Infrastructure build with local partners." }
              ].map((item) => (
                <GridItem xs={12} sm={6} md={6} key={item.title}>
                  <Card>
                    <CardBody>
                      <h4 className={classes.cardTitle}>{item.title}</h4>
                      <p>{item.text}</p>
                    </CardBody>
                  </Card>
                </GridItem>
              ))}
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
