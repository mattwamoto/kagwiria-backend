/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { List, ListItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import styles from "/styles/jss/nextjs-material-kit/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });

  return (
    <footer className={footerClasses}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a href="/the-rider" className={classes.block}>The Rider</a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/the-impact" className={classes.block}>The Impact</a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/africa-ride" className={classes.block}>Africa Ride</a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/get-involved" className={classes.block}>Get Involved</a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a href="/blog" className={classes.block}>Stories</a>
            </ListItem>
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} Kagwiria Murungi. Built for verified impact.
          <a href="/contact" className={aClasses}> Contact</a>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};
