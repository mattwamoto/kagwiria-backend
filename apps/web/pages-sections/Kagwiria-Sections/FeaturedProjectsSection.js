import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import Button from "/components/CustomButtons/Button.js";
import styles from "/styles/jss/nextjs-material-kit/pages/kagwiriaSections.js";

const useStyles = makeStyles(styles);

const defaults = [
  {
    title: "Turkana Literacy Hub",
    summary: "A functioning literacy hub providing books and digital access in Turkana.",
    slug: "turkana-literacy-hub",
  },
  {
    title: "Desert Pages Camel Library",
    summary: "A mobile camel library delivering books to remote desert villages.",
    slug: "desert-pages-camel-library",
  },
  {
    title: "Samburu Classroom Project",
    summary: "Classroom construction and learning infrastructure for Samburu.",
    slug: "samburu-classroom-project",
  },
  {
    title: "Africa Continental Ride",
    summary: "The flagship expedition that scales visibility and funding across Africa.",
    slug: "africa-continental-ride",
  },
];

export default function FeaturedProjectsSection({ projects = defaults }) {
  const classes = useStyles();

  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Featured projects</h2>
      <p className={classes.description}>Four pillars that drive the funding and impact cycle.</p>
      <GridContainer>
        {projects.map((project) => (
          <GridItem xs={12} sm={6} md={6} key={project.slug || project.title}>
            <Card>
              <CardBody>
                <h4 className={classes.cardTitle}>{project.title}</h4>
                <p>{project.summary}</p>
                <Button color="primary" size="sm" href={`/blog?project=${project.slug || "project"}`}>
                  View project
                </Button>
              </CardBody>
            </Card>
          </GridItem>
        ))}
      </GridContainer>
    </div>
  );
}
