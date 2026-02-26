import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import styles from "/styles/jss/nextjs-material-kit/pages/kagwiriaSections.js";

const useStyles = makeStyles(styles);

const awards = [
  "East Africa Female Biker of the Year 2024",
  "Influence and Impact Award 2026"
];

const media = ["Nation TV", "Citizen", "BBC Africa", "Al Jazeera", "Adventure Riders Network"];

export default function MediaAwardsSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Media and awards</h2>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <h4 className={classes.cardTitle}>Awards</h4>
          <div className={classes.inlineList}>
            {awards.map((award) => (
              <span className={classes.badge} key={award}>{award}</span>
            ))}
          </div>
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <h4 className={classes.cardTitle}>Media mentions</h4>
          <div className={classes.inlineList}>
            {media.map((item) => (
              <span className={classes.badge} key={item}>{item}</span>
            ))}
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
}
