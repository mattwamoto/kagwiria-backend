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

export default function GetInvolvedPage(props) {
  const classes = useStyles();
  return (
    <div>
      <Header
        color="transparent"
        brand="Get Involved"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 300, color: "white" }}
        {...props}
      />
      <Parallax small filter image="/img/bg10.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <h1 className={classes.title}>Fund access. Build legacy.</h1>
              <h4>Corporate sponsorships, one-time donations, monthly support, and speaking invitations.</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.section}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <CardBody>
                  <h3 className={classes.cardTitle}>Corporate sponsorship</h3>
                  <p>Structured tiers with brand exposure and verified impact reporting.</p>
                  <Button color="primary">Request deck</Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <CardBody>
                  <h3 className={classes.cardTitle}>One-time donation</h3>
                  <p>Support libraries, classrooms, and digital inclusion.</p>
                  <Button color="primary">Donate now</Button>
                </CardBody>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={12} md={4}>
              <Card>
                <CardBody>
                  <h3 className={classes.cardTitle}>Monthly supporter</h3>
                  <p>Provide recurring resources for rural education access.</p>
                  <Button color="primary">Become a supporter</Button>
                </CardBody>
              </Card>
            </GridItem>
          </GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8}>
              <Card>
                <CardBody>
                  <h3 className={classes.cardTitle}>Contact and payment</h3>
                  <p>M-Pesa and international card payments are available.</p>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput labelText="Name" id="name" formControlProps={{ fullWidth: true }} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput labelText="Email" id="email" formControlProps={{ fullWidth: true }} />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={12}>
                      <CustomInput
                        labelText="Message"
                        id="message"
                        formControlProps={{ fullWidth: true }}
                        inputProps={{ multiline: true, rows: 4 }}
                      />
                    </GridItem>
                  </GridContainer>
                  <Button color="primary">Submit</Button>
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
