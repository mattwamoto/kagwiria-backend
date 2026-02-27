import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import Button from "/components/CustomButtons/Button.js";
import styles from "/styles/jss/nextjs-material-kit/pages/kagwiriaSections.js";
import { pickFallbackImage } from "/lib/content";

const useStyles = makeStyles(styles);

const fallbackPosts = [
  {
    id: "fallback-1",
    type: "Blog",
    title: "Books for My Other Children",
    excerpt: "Field story from the latest ride stop, focused on book continuity for remote learners.",
    href: "/blog",
    date: "2026-02-27",
    image: pickFallbackImage(0),
  },
  {
    id: "fallback-2",
    type: "Vlog",
    title: "Ride Log: Route and Resupply",
    excerpt: "Video dispatch on route planning and replenishment constraints.",
    href: "/vlogs",
    date: "2026-02-26",
    image: pickFallbackImage(1),
  },
  {
    id: "fallback-3",
    type: "Documentary",
    title: "Africa Ride Documentary",
    excerpt: "Long-form production update from field to edit.",
    href: "/documentaries",
    date: "2026-02-25",
    image: pickFallbackImage(2),
  },
  {
    id: "fallback-4",
    type: "Blog",
    title: "When the Books Run Out",
    excerpt: "How sponsorship closes the supply chain gap in arid regions.",
    href: "/blog",
    date: "2026-02-24",
    image: pickFallbackImage(3),
  },
  {
    id: "fallback-5",
    type: "Vlog",
    title: "Desert Pages Field Day",
    excerpt: "Camel library movement and route-level operations.",
    href: "/vlogs",
    date: "2026-02-23",
    image: pickFallbackImage(4),
  },
];

function formatDate(value) {
  if (!value || typeof value !== "string") return "";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(parsed);
}

export default function LatestStoriesSection({ posts = [] }) {
  const classes = useStyles();
  const items = posts.length ? posts : fallbackPosts;
  const lead = items[0];
  const sideItems = items.slice(1, 5);

  return (
    <div className={classes.magazineSection}>
      <div className={classes.magazineHeader}>
        <div>
          <div className={classes.storyKicker}>Latest Edition</div>
          <h2 className={classes.magazineTitle}>Latest From the Road</h2>
          <p className={classes.description}>
            Fresh stories from blogs, vlogs, and documentaries in one curated feed.
          </p>
        </div>
        <Button color="primary" href="/desert-pages">
          View all posts
        </Button>
      </div>
      <GridContainer className={classes.editorialGrid}>
        <GridItem xs={12} sm={12} md={7}>
          <Card className={classes.leadStoryCard}>
            <div className={classes.leadMediaWrap}>
              <img src={lead.image} alt={lead.title} className={classes.mediaImage} />
              {lead.videoId ? <div className={classes.mediaTag}>Video</div> : null}
            </div>
            <CardBody className={classes.leadStoryBody}>
              <div className={classes.storyKicker}>{lead.type}</div>
              <h3 className={classes.storyTitle}>{lead.title}</h3>
              <p className={classes.leadExcerpt}>{lead.excerpt}</p>
              <div className={classes.storyFooter}>
                <p className={classes.cardMeta}>{formatDate(lead.date)}</p>
                <Button color="primary" simple href={lead.href}>
                  Open story
                </Button>
              </div>
            </CardBody>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={5}>
          <div className={classes.storyStack}>
            {sideItems.map((item) => (
              <Card key={item.id} className={classes.sideStoryCard}>
                <div className={classes.sideStoryRow}>
                  <div className={classes.sideMediaWrap}>
                    <img src={item.image} alt={item.title} className={classes.mediaImage} />
                    {item.videoId ? <div className={classes.mediaTag}>Video</div> : null}
                  </div>
                  <CardBody className={classes.sideStoryBody}>
                    <div className={classes.storyKicker}>{item.type}</div>
                    <h4 className={classes.sideStoryTitle}>{item.title}</h4>
                    <p className={classes.sideStoryExcerpt}>{item.excerpt}</p>
                    <p className={classes.cardMeta}>{formatDate(item.date)}</p>
                    <Button color="primary" simple href={item.href}>
                      Read
                    </Button>
                  </CardBody>
                </div>
              </Card>
            ))}
          </div>
        </GridItem>
      </GridContainer>
    </div>
  );
}
