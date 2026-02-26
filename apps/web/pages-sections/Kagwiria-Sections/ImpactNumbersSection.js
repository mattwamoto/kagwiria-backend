import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import styles from "/styles/jss/nextjs-material-kit/pages/kagwiriaSections.js";

const useStyles = makeStyles(styles);

const stats = [
  { number: "47", label: "Counties completed" },
  { number: "1", label: "Literacy hub in Turkana" },
  { number: "2026", label: "Nationwide book drive" },
  { number: "3", label: "Desktops and printer secured" },
  { number: "1", label: "Samburu classroom in development" },
  { number: "1", label: "Registered CBO partner" }
];

export default function ImpactNumbersSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Impact, measured</h2>
      <p className={classes.description}>
        Evidence-driven progress that sponsors and partners can audit.
      </p>
      <GridContainer>
        {stats.map((stat) => (
          <GridItem xs={12} sm={6} md={4} key={stat.label}>
            <Card>
              <CardBody className={classes.statCard}>
                <div className={classes.statNumber}>{stat.number}</div>
                <div className={classes.statLabel}>{stat.label}</div>
              </CardBody>
            </Card>
          </GridItem>
        ))}
      </GridContainer>
    </div>
  );
}
