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

export default function BlogPage(props) {
  const classes = useStyles();
  const posts = [
    { title: "Why the Ride Matters", excerpt: "Visibility funds infrastructure." },
    { title: "Turkana Literacy Hub", excerpt: "Building a permanent access point." },
    { title: "The Road to Samburu", excerpt: "Classroom development update." }
  ];

  return (
    <div>
      <Header
        color="transparent"
        brand="Blog"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 300, color: "white" }}
        {...props}
      />
      <Parallax small filter image="/img/bg9.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>Field notes and impact reports.</h1>
              <h4>Stories backed by data, not sentiment.</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.section}>
          <GridContainer>
            {posts.map((post) => (
              <GridItem xs={12} sm={6} md={4} key={post.title}>
                <Card>
                  <CardBody>
                    <h4 className={classes.cardTitle}>{post.title}</h4>
                    <p>{post.excerpt}</p>
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
