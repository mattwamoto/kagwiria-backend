import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import styles from "/styles/jss/nextjs-material-kit/pages/kagwiriaSections.js";

const useStyles = makeStyles(styles);

export default function SponsorshipCallSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div className={classes.callout}>
            <h3>Partner the Africa Ride</h3>
            <p className={classes.calloutText}>
              Sponsor a continental expedition advancing rural education access across Africa. We offer structured tiers, brand exposure, and verified impact reporting.
            </p>
            <Button color="white" size="lg">Download sponsorship deck</Button>
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
}
