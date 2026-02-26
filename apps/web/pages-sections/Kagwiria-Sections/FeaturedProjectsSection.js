import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import Button from "/components/CustomButtons/Button.js";
import styles from "/styles/jss/nextjs-material-kit/pages/kagwiriaSections.js";

const useStyles = makeStyles(styles);

const projects = [
  {
    title: "Turkana Literacy Hub",
    description: "A functioning literacy hub providing books and digital access in Turkana."
  },
  {
    title: "Desert Pages Camel Library",
    description: "A mobile camel library delivering books to remote desert villages."
  },
  {
    title: "Samburu Classroom Project",
    description: "Classroom construction and learning infrastructure for Samburu."
  },
  {
    title: "Africa Continental Ride",
    description: "The flagship expedition that scales visibility and funding across Africa."
  }
];

export default function FeaturedProjectsSection() {
  const classes = useStyles();
  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Featured projects</h2>
      <p className={classes.description}>
        Four pillars that drive the funding and impact cycle.
      </p>
      <GridContainer>
        {projects.map((project) => (
          <GridItem xs={12} sm={6} md={6} key={project.title}>
            <Card>
              <CardBody>
                <h4 className={classes.cardTitle}>{project.title}</h4>
                <p>{project.description}</p>
                <Button color="primary" size="sm">View project</Button>
              </CardBody>
            </Card>
          </GridItem>
        ))}
      </GridContainer>
    </div>
  );
}
