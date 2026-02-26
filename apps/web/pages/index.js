import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Parallax from "/components/Parallax/Parallax.js";

import styles from "/styles/jss/nextjs-material-kit/pages/landingPage.js";

import ImpactNumbersSection from "/pages-sections/Kagwiria-Sections/ImpactNumbersSection.js";
import FeaturedProjectsSection from "/pages-sections/Kagwiria-Sections/FeaturedProjectsSection.js";
import SponsorshipCallSection from "/pages-sections/Kagwiria-Sections/SponsorshipCallSection.js";
import MediaAwardsSection from "/pages-sections/Kagwiria-Sections/MediaAwardsSection.js";
import EmailCaptureSection from "/pages-sections/Kagwiria-Sections/EmailCaptureSection.js";

const useStyles = makeStyles(styles);

export default function HomePage(props) {
  const classes = useStyles();
  return (
    <div>
      <Header
        color="transparent"
        brand="Kagwiria Murungi"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 400, color: "white" }}
        {...props}
      />
      <Parallax filter responsive image="/img/bg7.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={7}>
              <h1 className={classes.title}>47 Counties. A Continent Next.</h1>
              <h4>
                From Turkana libraries to Samburu classrooms, every kilometer builds education access.
                Kagwiria is Africa’s leading female adventure rider building rural infrastructure through the road.
              </h4>
              <br />
              <Button color="primary" size="lg" href="/get-involved">Partner the Africa Ride</Button>
              <Button color="white" size="lg" simple href="/get-involved">Support the Library</Button>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ImpactNumbersSection />
          <FeaturedProjectsSection />
          <SponsorshipCallSection />
          <MediaAwardsSection />
          <EmailCaptureSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}
