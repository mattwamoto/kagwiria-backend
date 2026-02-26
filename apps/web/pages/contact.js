import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import CustomInput from "/components/CustomInput/CustomInput.js";
import Button from "/components/CustomButtons/Button.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Parallax from "/components/Parallax/Parallax.js";

import styles from "/styles/jss/nextjs-material-kit/pages/landingPage.js";
import sectionStyles from "/styles/jss/nextjs-material-kit/pages/kagwiriaSections.js";

const useStyles = makeStyles({ ...styles, ...sectionStyles });

export default function ContactPage(props) {
  const classes = useStyles();
  return (
    <div>
      <Header
        color="transparent"
        brand="Contact"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 300, color: "white" }}
        {...props}
      />
      <Parallax small filter image="/img/bg1.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>Let’s talk partnership.</h1>
              <h4>Corporate sponsorship, media requests, or speaking invitations.</h4>
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
                  <h3 className={classes.cardTitle}>Send a message</h3>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput labelText="Name" id="name" formControlProps={{ fullWidth: true }} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput labelText="Email" id="email" formControlProps={{ fullWidth: true }} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput labelText="Message" id="message" formControlProps={{ fullWidth: true }} inputProps={{ multiline: true, rows: 4 }} />
                    </GridItem>
                  </GridContainer>
                  <Button color="primary">Send</Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={5}>
              <Card>
                <CardBody>
                  <h3 className={classes.cardTitle}>Contact</h3>
                  <p>Email: partnerships@kagwiria.org</p>
                  <p>Location: Nairobi, Kenya</p>
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
