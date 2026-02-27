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
import { safeCms } from "/lib/cms";

const useStyles = makeStyles({ ...styles, ...sectionStyles });

const fallbackPrograms = [
  { title: "Turkana Literacy Hub", text: "Operational hub delivering literacy and digital access." },
  { title: "Book Drive 2026", text: "Nationwide mobilization for rural school libraries." },
  { title: "Digital Inclusion Equipment", text: "Secured desktops and printers for learning centers." },
  { title: "Samburu Classroom Initiative", text: "Infrastructure build with local partners." },
];

export default function TheImpactPage({ metrics, programs }) {
  const classes = useStyles();

  return (
    <div>
      <Header
        color="transparent"
        brand="The Impact"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 300, color: "white" }}
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
          <ImpactNumbersSection
            stats={metrics.map((item) => ({ value: item.value || "-", label: item.label || "Impact metric" }))}
          />
          <div className={classes.section}>
            <GridContainer>
              {(programs.length ? programs : fallbackPrograms).map((item) => (
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

export async function getServerSideProps() {
  const [metrics, projects] = await Promise.all([
    safeCms("/api/impact-metrics?sort=sortOrder:asc", []),
    safeCms("/api/projects?sort=createdAt:desc", []),
  ]);

  const programs = projects.map((item) => ({
    title: item.title || "Program",
    text: item.summary || "Program update coming soon.",
  }));

  return { props: { metrics, programs } };
}
