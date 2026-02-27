import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Button from "/components/CustomButtons/Button.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";

import styles from "/styles/jss/nextjs-material-kit/pages/landingPage.js";
import ImpactNumbersSection from "/pages-sections/Kagwiria-Sections/ImpactNumbersSection.js";
import LatestStoriesSection from "/pages-sections/Kagwiria-Sections/LatestStoriesSection.js";
import FeaturedProjectsSection from "/pages-sections/Kagwiria-Sections/FeaturedProjectsSection.js";
import SponsorshipCallSection from "/pages-sections/Kagwiria-Sections/SponsorshipCallSection.js";
import MediaAwardsSection from "/pages-sections/Kagwiria-Sections/MediaAwardsSection.js";
import EmailCaptureSection from "/pages-sections/Kagwiria-Sections/EmailCaptureSection.js";
import { safeCms } from "/lib/cms";
import { getMediaUrl, getYoutubeId, youtubeThumb, pickFallbackImage } from "/lib/content";

const useStyles = makeStyles(styles);

const heroImages = [
  "/img/kagwiria/hero/hero-1.jpeg",
  "/img/kagwiria/hero/hero-2.jpeg",
  "/img/kagwiria/hero/hero-3.jpeg",
  "/img/kagwiria/hero/hero-4.jpeg",
];

function asText(value, fallback) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

export default function HomePage(props) {
  const classes = useStyles();
  const { homeData, metrics, projects, awards, mediaMentions, latestPosts } = props;
  const [activeSlide, setActiveSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroImages.length);
    }, 5200);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div>
      <Header
        color="transparent"
        brand="Kagwiria Murungi"
        logoSrc="/img/brand/kagwiria-logo.jpg"
        logoAlt="Kagwiria logo"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 260, color: "overlay" }}
      />
      <div className={classes.heroCarouselShell}>
        <div className={classes.heroTrack}>
          {heroImages.map((image, index) => (
            <div
              key={image}
              className={classNames(classes.heroSlide, {
                [classes.heroSlideActive]: activeSlide === index,
              })}
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(8, 14, 26, 0.68) 0%, rgba(8, 14, 26, 0.26) 55%, rgba(8, 14, 26, 0.55) 100%), url(${image})`,
              }}
            />
          ))}
        </div>
        <div className={classes.heroDots}>
          {heroImages.map((_, index) => (
            <button
              key={`hero-dot-${index}`}
              type="button"
              className={classNames(classes.heroDot, {
                [classes.heroDotActive]: activeSlide === index,
              })}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to hero slide ${index + 1}`}
            />
          ))}
        </div>
        <div className={classes.heroOverlay}>
          <div className={classes.container}>
            <GridContainer className={classes.heroOverlayContent}>
              <GridItem xs={12} sm={12} md={7}>
                <h1 className={classes.title}>{asText(homeData?.heroHeadline, "47 Counties. A Continent Next.")}</h1>
                <h4>
                  {asText(
                    homeData?.heroSubline,
                    "From Turkana libraries to Samburu classrooms, every kilometer builds education access."
                  )}
                </h4>
                <br />
                <Button color="primary" size="lg" href="/get-involved">Partner the Africa Ride</Button>
                <Button color="white" size="lg" simple href="/get-involved">Support the Library</Button>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <LatestStoriesSection posts={latestPosts} />
          <ImpactNumbersSection
            stats={metrics.map((item) => ({ value: item.value || "-", label: item.label || "Impact metric" }))}
          />
          <FeaturedProjectsSection
            projects={projects.map((item) => ({
              title: item.title || "Project",
              summary: item.summary || "Project details coming soon.",
              slug: item.slug || "project",
            }))}
          />
          <SponsorshipCallSection body={asText(homeData?.sponsorshipSection, undefined)} />
          <MediaAwardsSection
            awards={awards.map((item) => item.title).filter(Boolean)}
            mediaMentions={mediaMentions.map((item) => item.publisher || item.title).filter(Boolean)}
          />
          <EmailCaptureSection />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const [homeData, metrics, projects, awards, mediaMentions, blogPosts, vlogs, documentaries] = await Promise.all([
    safeCms("/api/home-page", null),
    safeCms("/api/impact-metrics?sort=sortOrder:asc", []),
    safeCms("/api/projects?pagination[limit]=4&sort=createdAt:desc", []),
    safeCms("/api/awards?sort=awardedAt:desc", []),
    safeCms("/api/media-mentions?pagination[limit]=6&sort=publishedAtSource:desc", []),
    safeCms("/api/blog-posts?populate=featuredImage&sort=publishedOn:desc&pagination[limit]=8", []),
    safeCms("/api/vlogs?populate=thumbnail&sort=publishedOn:desc&pagination[limit]=8", []),
    safeCms("/api/documentaries?populate=poster&sort=releaseDate:desc&pagination[limit]=8", []),
  ]);

  const latestBlog = blogPosts.map((item, index) => ({
    id: `blog-${item.id || index}`,
    type: "Blog",
    title: item.title || "Blog post",
    excerpt: item.excerpt || "Story update coming soon.",
    href: "/blog",
    date: item.publishedOn || item.createdAt || "",
    image: getMediaUrl(item.featuredImage) || pickFallbackImage(index),
    videoId: null,
  }));

  const latestVlogs = vlogs.map((item, index) => {
    const videoId = getYoutubeId(item.youtubeVideoId) || getYoutubeId(item.youtubeUrl);
    return {
      id: `vlog-${item.id || index}`,
      type: "Vlog",
      title: item.title || "Vlog update",
      excerpt: item.summary || "Road video update.",
      href: "/vlogs",
      date: item.publishedOn || item.createdAt || "",
      image: youtubeThumb(videoId) || getMediaUrl(item.thumbnail) || pickFallbackImage(index + 2),
      videoId,
    };
  });

  const latestDocs = documentaries.map((item, index) => {
    const videoId = getYoutubeId(item.trailerYoutubeVideoId) || getYoutubeId(item.trailerYoutubeUrl);
    return {
      id: `doc-${item.id || index}`,
      type: "Documentary",
      title: item.title || "Documentary update",
      excerpt: item.logline || "Production update from the field.",
      href: "/documentaries",
      date: item.releaseDate || item.createdAt || "",
      image: getMediaUrl(item.poster) || youtubeThumb(videoId) || pickFallbackImage(index + 4),
      videoId,
    };
  });

  const latestPosts = [...latestBlog, ...latestVlogs, ...latestDocs]
    .sort((a, b) => {
      const left = Date.parse(a.date || "");
      const right = Date.parse(b.date || "");
      return (Number.isNaN(right) ? 0 : right) - (Number.isNaN(left) ? 0 : left);
    })
    .slice(0, 6);

  return {
    props: {
      homeData,
      metrics,
      projects,
      awards,
      mediaMentions,
      latestPosts,
    },
  };
}
