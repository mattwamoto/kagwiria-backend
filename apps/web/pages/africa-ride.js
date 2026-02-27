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

const fallbackCountries = ["Kenya", "Uganda", "Tanzania", "Rwanda", "Ethiopia", "Namibia", "South Africa"];

export default function AfricaRidePage({ plan, sponsorTiers }) {
  const classes = useStyles();
  const countries = Array.isArray(plan?.projectedCountries) && plan.projectedCountries.length
    ? plan.projectedCountries
    : fallbackCountries;

  return (
    <div>
      <Header
        color="transparent"
        brand="Africa Ride"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 300, color: "white" }}
      />
      <Parallax small filter image="/img/bg.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>The flagship expedition.</h1>
              <h4>{plan?.overview || "Continental ride to scale partnerships, funding, and visibility for rural education."}</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <div className={classes.section}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <Card>
                  <CardBody>
                    <h3 className={classes.cardTitle}>Purpose</h3>
                    <p>{plan?.overview || "Generate visibility and funding for literacy hubs and classrooms across Africa."}</p>
                    <h3 className={classes.cardTitle}>Projected countries</h3>
                    <div className={classes.inlineList}>
                      {countries.map((country) => (
                        <span className={classes.badge} key={country}>{country}</span>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={6}>
                <Card>
                  <CardBody>
                    <h3 className={classes.cardTitle}>Budget summary</h3>
                    <p>{plan?.budgetSummary || "Multi-country logistics, media crew, safety, and program delivery."}</p>
                    <h3 className={classes.cardTitle}>Sponsorship tiers</h3>
                    <p>
                      {sponsorTiers.length
                        ? sponsorTiers.map((tier) => tier.name).filter(Boolean).join(", ")
                        : "Title Partner, Route Sponsor, Impact Sponsor, Media Partner."}
                    </p>
                    <Button color="primary" href="/get-involved">Download proposal</Button>
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const [plan, sponsorTiers] = await Promise.all([
    safeCms("/api/africa-ride-plan", null),
    safeCms("/api/sponsor-tiers?sort=name:asc", []),
  ]);

  return { props: { plan, sponsorTiers } };
}
