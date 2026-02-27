import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import styles from "/styles/jss/nextjs-material-kit/pages/kagwiriaSections.js";

const useStyles = makeStyles(styles);

export default function SponsorshipCallSection({
  title = "Partner the Africa Ride",
  body = "Sponsor a continental expedition advancing rural education access across Africa. We offer structured tiers, brand exposure, and verified impact reporting.",
  ctaLabel = "Download sponsorship deck",
  ctaHref = "/africa-ride",
}) {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <div className={classes.callout}>
            <h3>{title}</h3>
            <p className={classes.calloutText}>{body}</p>
            <Button color="white" size="lg" href={ctaHref}>
              {ctaLabel}
            </Button>
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
}
