import React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";

import Header from "/components/Header/Header.js";
import Footer from "/components/Footer/Footer.js";
import GridContainer from "/components/Grid/GridContainer.js";
import GridItem from "/components/Grid/GridItem.js";
import Card from "/components/Card/Card.js";
import CardBody from "/components/Card/CardBody.js";
import Button from "/components/CustomButtons/Button.js";
import HeaderLinks from "/components/Header/HeaderLinks.js";
import Parallax from "/components/Parallax/Parallax.js";

import styles from "/styles/jss/nextjs-material-kit/pages/landingPage.js";
import sectionStyles from "/styles/jss/nextjs-material-kit/pages/kagwiriaSections.js";
import { safeCms } from "/lib/cms";
import {
  getMediaUrl,
  getYoutubeId,
  getYoutubePlaylistId,
  youtubePlaylistEmbed,
  youtubeThumb,
  pickFallbackImage,
} from "/lib/content";

const useStyles = makeStyles({
  ...styles,
  ...sectionStyles,
  storiesTitle: {
    margin: "0 0 8px",
    fontSize: "1.95rem",
    color: "#1c2538",
    fontWeight: 700,
  },
  storiesText: {
    margin: "0 0 16px",
    color: "#4d596b",
    maxWidth: "760px",
  },
  categoryRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "20px",
  },
  categoryChip: {
    display: "inline-flex",
    alignItems: "center",
    border: "1px solid #e2d9c8",
    borderRadius: "999px",
    padding: "5px 12px",
    fontSize: "0.75rem",
    fontWeight: 700,
    letterSpacing: "0.05em",
    textTransform: "uppercase",
    color: "#5b6474",
    background: "#fffdf8",
  },
  storyCard: {
    overflow: "hidden",
    margin: "0 0 18px !important",
    borderRadius: "12px",
    border: "1px solid #e8dece",
    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)",
  },
  storyMedia: {
    width: "100%",
    height: "225px",
    objectFit: "cover",
    display: "block",
    background: "#111",
  },
  playlistCard: {
    overflow: "hidden",
    margin: "0 0 18px !important",
    borderRadius: "12px",
    border: "1px solid #e8dece",
    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)",
  },
  playlistFrame: {
    width: "100%",
    height: "230px",
    border: 0,
    display: "block",
    background: "#111",
  },
  vlogCard: {
    overflow: "hidden",
    margin: "0 0 18px !important",
    borderRadius: "12px",
    border: "1px solid #e8dece",
    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)",
  },
  vlogFrame: {
    width: "100%",
    height: "220px",
    border: 0,
    display: "block",
    background: "#111",
  },
  vlogImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    display: "block",
    background: "#111",
  },
  "@media (max-width: 767px)": {
    storyMedia: {
      height: "210px",
    },
    playlistFrame: {
      height: "210px",
    },
    vlogFrame: {
      height: "210px",
    },
    vlogImage: {
      height: "210px",
    },
  },
});

const fallbackPosts = [
  {
    slug: "stories-books-for-my-other-children",
    title: "Books for My Other Children",
    excerpt: "A field reflection on how continuity of books changes long-term learning outcomes.",
    tags: ["impact", "education", "ride", "field-notes"],
  },
  {
    slug: "stories-birth-giver-classrooms",
    title: "From Birth Giver to Mother of Many Classrooms",
    excerpt: "What repeated route presence means for trust and school-level consistency.",
    tags: ["impact", "community", "field-notes"],
  },
  {
    slug: "stories-when-books-run-out",
    title: "When the Books Run Out",
    excerpt: "Operational lessons from stockouts and replenishment scheduling.",
    tags: ["impact", "operations", "supply-chain"],
  },
  {
    slug: "stories-hawa-wangu",
    title: "Hawa Wangu Tumeishanwo",
    excerpt: "Demand pressure, route discipline, and partnership-backed continuity.",
    tags: ["impact", "ride", "operations"],
  },
  {
    slug: "stories-ride-metrics",
    title: "Ride Metrics and School Reach",
    excerpt: "How route metrics are linked to practical education outputs.",
    tags: ["analytics", "impact", "route"],
  },
  {
    slug: "stories-turkana-hub",
    title: "Turkana Hub Monthly Report",
    excerpt: "One month of usage data, reading circles, and volunteer activity.",
    tags: ["report", "impact", "education"],
  },
  {
    slug: "stories-samburu-site-log",
    title: "Samburu Site Log",
    excerpt: "Infrastructure and learning checkpoint notes from the field.",
    tags: ["infrastructure", "field-notes", "education"],
  },
  {
    slug: "stories-africa-stage-brief",
    title: "Africa Stage Brief",
    excerpt: "Cross-border stage planning with impact targets and media timeline.",
    tags: ["africa-ride", "planning", "impact"],
  },
  {
    slug: "stories-library-route-compliance",
    title: "Library Route Compliance",
    excerpt: "Checklist model for quality control across route stops.",
    tags: ["operations", "compliance", "field-notes"],
  },
  {
    slug: "stories-community-custodians",
    title: "Community Custodian Network",
    excerpt: "How local custodians anchor continuity between route visits.",
    tags: ["community", "governance", "impact"],
  },
  {
    slug: "stories-digital-access-rollout",
    title: "Digital Access Rollout",
    excerpt: "Desktop and printer deployments tied to literacy center use.",
    tags: ["digital", "infrastructure", "impact"],
  },
  {
    slug: "stories-partner-review-pack",
    title: "Partner Review Pack",
    excerpt: "Sponsor-facing summary of milestones, evidence, and next actions.",
    tags: ["sponsorship", "report", "impact"],
  },
  {
    slug: "stories-route-learning-index",
    title: "Route Learning Index",
    excerpt: "A scoring model for tracking learning outcomes by route segment.",
    tags: ["analytics", "education", "impact"],
  },
  {
    slug: "stories-village-reading-logs",
    title: "Village Reading Logs",
    excerpt: "Reading log snapshots and facilitator notes from remote clusters.",
    tags: ["field-notes", "education", "community"],
  },
  {
    slug: "stories-sponsor-activation-journal",
    title: "Sponsor Activation Journal",
    excerpt: "How sponsor campaigns align with route milestones and media windows.",
    tags: ["sponsorship", "operations", "media"],
  },
  {
    slug: "stories-documentary-planning-board",
    title: "Documentary Planning Board",
    excerpt: "Narrative sequencing between route moments, interviews, and impact evidence.",
    tags: ["documentary", "planning", "field-notes"],
  },
  {
    slug: "stories-content-distribution-model",
    title: "Content Distribution Model",
    excerpt: "Operational flow for distributing posts, clips, and playlists across channels.",
    tags: ["media", "operations", "digital"],
  },
  {
    slug: "stories-education-access-pulse",
    title: "Education Access Pulse",
    excerpt: "Monthly pulse report across literacy points and program usage patterns.",
    tags: ["report", "impact", "education"],
  },
  {
    slug: "stories-field-team-rotation",
    title: "Field Team Rotation",
    excerpt: "Crew rotation strategy for continuity and quality under long routes.",
    tags: ["operations", "field-notes", "governance"],
  },
  {
    slug: "stories-local-language-support",
    title: "Local Language Support",
    excerpt: "How multilingual content support improves participation and retention.",
    tags: ["education", "community", "impact"],
  },
];

const fallbackVlogs = [
  { slug: "stories-vlog-01", title: "Route Dispatch 01", summary: "Stage opener and route briefing.", youtubeUrl: "https://www.youtube.com/watch?v=M7lc1UVf-VE" },
  { slug: "stories-vlog-02", title: "School Stop Log", summary: "Checkpoint delivery and classroom handover.", youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ" },
  { slug: "stories-vlog-03", title: "Field Debrief", summary: "Post-stage data and lessons learned.", youtubeUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0" },
  { slug: "stories-vlog-04", title: "Desert Pages Day", summary: "Camel route operations and reading sessions.", youtubeUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ" },
  { slug: "stories-vlog-05", title: "Sponsor Visibility Recap", summary: "Partner activation and audience engagement.", youtubeUrl: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ" },
  { slug: "stories-vlog-06", title: "Route Safety Review", summary: "Safety standards before long-haul stages.", youtubeUrl: "https://www.youtube.com/watch?v=Zi_XLOBDo_Y" },
  { slug: "stories-vlog-07", title: "Community Reading Clip", summary: "Local facilitators and reading outcomes.", youtubeUrl: "https://www.youtube.com/watch?v=hTWKbfoikeg" },
  { slug: "stories-vlog-08", title: "Weekly Ride Summary", summary: "Weekly KPI update from the road.", youtubeUrl: "https://www.youtube.com/watch?v=kXYiU_JCYtU" },
  { slug: "stories-vlog-09", title: "Route Dispatch 02", summary: "Another checkpoint dispatch from the field.", youtubeUrl: "https://www.youtube.com/watch?v=YQHsXMglC9A" },
  { slug: "stories-vlog-10", title: "School Hub Interview", summary: "Interview with a local school coordinator.", youtubeUrl: "https://www.youtube.com/watch?v=60ItHLz5WEA" },
  { slug: "stories-vlog-11", title: "Desert Team Brief", summary: "Briefing on route health, safety, and logistics.", youtubeUrl: "https://www.youtube.com/watch?v=ktvTqknDobU" },
  { slug: "stories-vlog-12", title: "Impact Snapshot", summary: "A short impact snapshot with field evidence.", youtubeUrl: "https://www.youtube.com/watch?v=RgKAFK5djSk" },
];

const fallbackDocPlaylists = [
  {
    id: "doc-playlist-1",
    title: "Africa Ride Documentary Assembly",
    description: "Long-form documentary cuts and timeline recaps.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PL590L5WQmH8fJ54F7fR7vN7B0n4w4A5vX",
  },
  {
    id: "doc-playlist-2",
    title: "Desert Pages Documentary Cut",
    description: "Visual case study from local routes to impact milestones.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PLFgquLnL59amL4kQyA8h6zYQJm0W0wT4u",
  },
  {
    id: "doc-playlist-3",
    title: "Turkana Literacy Storyline",
    description: "Episode sequence on literacy hub evolution.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PL9tY0BWXOZFt3y4I8MUQyGvOqkQ4R5Q1B",
  },
  {
    id: "doc-playlist-4",
    title: "Samburu Classroom Build",
    description: "Documentary progression from planning to site readiness.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PL590L5WQmH8fXxYh1hGo4k1uW2Z7L0AA9",
  },
  {
    id: "doc-playlist-5",
    title: "Partnership Stories",
    description: "Media features and partner story arcs in playlist form.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PLFgquLnL59alW3xmYiWRaoz0oM3H17Lth",
  },
  {
    id: "doc-playlist-6",
    title: "Road-to-Impact Episodes",
    description: "Chronological episodes following route-to-impact conversion.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PL9tY0BWXOZFv2r4J8M2Z0h0YVx3Gx1Q2X",
  },
  {
    id: "doc-playlist-7",
    title: "Field Verification Documentaries",
    description: "Verification-focused documentary modules.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PL590L5WQmH8fX0kR8P0a2D8M5Q7E6R1T2",
  },
  {
    id: "doc-playlist-8",
    title: "Education Access Chronicle",
    description: "A long-form chronicle of access expansion.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PLFgquLnL59alM1M4B4Yk5x5x2r7z9f2Jm",
  },
  {
    id: "doc-playlist-9",
    title: "Community Story Vault",
    description: "Long-form playlists centered on community education stories.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PLsP4qQ7Tz1hQ6nX7w4b2w9c8m3r5u7a9x",
  },
  {
    id: "doc-playlist-10",
    title: "Route Documentary Sessions",
    description: "Session-based documentary episodes from each major route stage.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PLxA687tYuMWi7K8v9N2p4Q5R6S7T8U9V0",
  },
  {
    id: "doc-playlist-11",
    title: "Schools and Stories Archive",
    description: "Archive playlist focused on school-level narrative continuity.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PLc4f7P9mR2bQ8x6Y3n5v1k0z7a4w2t6p9",
  },
  {
    id: "doc-playlist-12",
    title: "Field Evidence Features",
    description: "Playlist collection featuring evidence-led field reporting.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PLd3k2L7vQ9pN4b8m1w6x0c5r2t7y9u3a6",
  },
];

const fallbackCategories = [
  "impact",
  "education",
  "field-notes",
  "operations",
  "africa-ride",
  "community",
  "documentary",
  "vlog",
  "sponsorship",
  "infrastructure",
  "digital",
  "analytics",
  "media",
  "planning",
  "report",
  "compliance",
];

function collectCategories(posts) {
  const values = new Set();

  posts.forEach((post) => {
    const tags = post?.tags;
    if (Array.isArray(tags)) {
      tags.forEach((tag) => values.add(String(tag).toLowerCase()));
      return;
    }

    if (typeof tags === "string") {
      values.add(tags.toLowerCase());
      return;
    }

    if (tags && typeof tags === "object") {
      Object.values(tags).forEach((value) => values.add(String(value).toLowerCase()));
    }
  });

  const collected = Array.from(values).filter(Boolean);
  return (collected.length ? collected : fallbackCategories).slice(0, 18);
}

function buildPlaylists(documentaries) {
  const fromDocs = documentaries
    .map((doc, index) => {
      const source = doc?.watchUrl || doc?.trailerYoutubeUrl;
      const playlistId = getYoutubePlaylistId(source);
      if (!playlistId) return null;

      return {
        id: `doc-pl-${doc.id || index}`,
        title: doc.title || "Documentary playlist",
        description: doc.logline || "Documentary stories and field sequences.",
        playlistId,
      };
    })
    .filter(Boolean);

  const merged = [...fromDocs];
  const seen = new Set(merged.map((item) => item.playlistId));

  for (const fallback of fallbackDocPlaylists) {
    const playlistId = getYoutubePlaylistId(fallback.youtubeUrl);
    if (playlistId && !seen.has(playlistId)) {
      merged.push({
        id: fallback.id,
        title: fallback.title,
        description: fallback.description,
        playlistId,
      });
      seen.add(playlistId);
    }
  }

  return merged.slice(0, 12);
}

export default function BlogPage({ posts, vlogs, documentaries }) {
  const classes = useStyles();

  const storyPosts = (posts.length ? posts : fallbackPosts).slice(0, 18);
  const vlogItems = (vlogs.length ? vlogs : fallbackVlogs).slice(0, 12);
  const docPlaylists = buildPlaylists(documentaries);
  const categories = collectCategories(storyPosts);

  return (
    <div>
      <Header
        color="transparent"
        brand="Stories"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 260, color: "overlay" }}
      />
      <Parallax small filter image="/img/bg4.jpg">
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={9}>
              <h1 className={classes.title}>Stories: Posts, Documentary Playlists, and Vlogs</h1>
              <h4>One hub for written posts, playlist documentaries, vlog cuts, and topic categories.</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.section}>
          <h2 className={classes.storiesTitle}>Story Categories</h2>
          <p className={classes.storiesText}>Filter mindset: impact, operations, community, documentaries, and ride logs.</p>
          <div className={classes.categoryRow}>
            {categories.map((category) => (
              <span key={category} className={classes.categoryChip}>{category}</span>
            ))}
          </div>

          <h2 className={classes.storiesTitle}>Story Posts</h2>
          <p className={classes.storiesText}>Written posts with field evidence, route notes, and implementation details.</p>
          <GridContainer>
            {storyPosts.map((post, index) => {
              const image = getMediaUrl(post.featuredImage) || pickFallbackImage(index);

              return (
                <GridItem xs={12} sm={6} md={4} key={post.slug || post.id || post.title}>
                  <Card className={classes.storyCard}>
                    <img src={image} alt={post.title || "Story post"} className={classes.storyMedia} />
                    <CardBody>
                      <h4 className={classes.cardTitle}>{post.title || "Story post"}</h4>
                      <p>{post.excerpt || "Story update coming soon."}</p>
                    </CardBody>
                  </Card>
                </GridItem>
              );
            })}
          </GridContainer>

          <h2 className={classes.storiesTitle}>Documentary Playlists</h2>
          <p className={classes.storiesText}>YouTube playlist documentaries arranged as long-form story collections.</p>
          <GridContainer>
            {docPlaylists.map((playlist) => (
              <GridItem xs={12} sm={6} md={4} key={playlist.id}>
                <Card className={classes.playlistCard}>
                  <iframe
                    title={playlist.title}
                    src={youtubePlaylistEmbed(playlist.playlistId)}
                    className={classes.playlistFrame}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <CardBody>
                    <h4 className={classes.cardTitle}>{playlist.title}</h4>
                    <p>{playlist.description}</p>
                  </CardBody>
                </Card>
              </GridItem>
            ))}
          </GridContainer>

          <h2 className={classes.storiesTitle}>Vlog Stories</h2>
          <p className={classes.storiesText}>Short-form vlog narratives paired with the written and documentary threads.</p>
          <GridContainer>
            {vlogItems.map((vlog, index) => {
              const videoId = getYoutubeId(vlog.youtubeVideoId) || getYoutubeId(vlog.youtubeUrl);
              const preview = youtubeThumb(videoId) || getMediaUrl(vlog.thumbnail) || pickFallbackImage(index + 1);

              return (
                <GridItem xs={12} sm={6} md={4} key={vlog.slug || vlog.id || vlog.title}>
                  <Card className={classes.vlogCard}>
                    {videoId ? (
                      <iframe
                        title={vlog.title || `Vlog ${index + 1}`}
                        src={`https://www.youtube.com/embed/${videoId}`}
                        className={classes.vlogFrame}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <img src={preview} alt={vlog.title || "Vlog"} className={classes.vlogImage} />
                    )}
                    <CardBody>
                      <h4 className={classes.cardTitle}>{vlog.title || "Vlog story"}</h4>
                      <p>{vlog.summary || "Vlog update coming soon."}</p>
                      <Button color="primary" simple href="/vlogs">Open vlogs</Button>
                    </CardBody>
                  </Card>
                </GridItem>
              );
            })}
          </GridContainer>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const [posts, vlogs, documentaries] = await Promise.all([
    safeCms("/api/blog-posts?populate=featuredImage&sort=publishedOn:desc&pagination[limit]=24", []),
    safeCms("/api/vlogs?populate=thumbnail&sort=publishedOn:desc&pagination[limit]=18", []),
    safeCms("/api/documentaries?sort=releaseDate:desc&pagination[limit]=16", []),
  ]);

  return { props: { posts, vlogs, documentaries } };
}
