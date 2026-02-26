/*eslint-disable*/
import React from "react";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "/components/CustomButtons/Button.js";
import styles from "/styles/jss/nextjs-material-kit/components/headerLinksStyle.js";

const useStyles = makeStyles(styles);

export default function HeaderLinks() {
  const classes = useStyles();
  return (
    <List className={classes.list}>
      {[
        { href: "/", label: "Home" },
        { href: "/the-rider", label: "The Rider" },
        { href: "/the-impact", label: "The Impact" },
        { href: "/desert-pages", label: "Desert Pages" },
        { href: "/africa-ride", label: "Africa Ride" },
        { href: "/partners-media", label: "Partners & Media" },
        { href: "/get-involved", label: "Get Involved" },
        { href: "/contact", label: "Contact" },
        { href: "/blog", label: "Stories" }
      ].map((item) => (
        <ListItem className={classes.listItem} key={item.href}>
          <Link href={item.href}>
            <a className={classes.navLink}>{item.label}</a>
          </Link>
        </ListItem>
      ))}
      <ListItem className={classes.listItem}>
        <Button
          href="/get-involved"
          color="primary"
          className={classes.navLink}
        >
          Partner the Africa Ride
        </Button>
      </ListItem>
    </List>
  );
}
