import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import CustomInput from "/components/CustomInput/CustomInput.js";
import Button from "/components/CustomButtons/Button.js";
import styles from "/styles/jss/nextjs-material-kit/pages/kagwiriaSections.js";

const useStyles = makeStyles(styles);

export default function EmailCaptureSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={8}>
          <h2 className={classes.title}>Ride with the mission</h2>
          <p className={classes.description}>
            Get impact reports, ride updates, and partner opportunities.
          </p>
          <GridContainer>
            <GridItem xs={12} sm={12} md={8} className={classes.formRow}>
              <CustomInput
                labelText="Your email"
                id="newsletter"
                formControlProps={{ fullWidth: true }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={4} className={classes.formRow}>
              <Button color="primary" fullWidth>Subscribe</Button>
            </GridItem>
          </GridContainer>
        </GridItem>
      </GridContainer>
    </div>
  );
}
