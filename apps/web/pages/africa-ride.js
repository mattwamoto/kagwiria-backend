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

const pageStyles = {
  sectionTitle: {
    margin: "0 0 8px",
    fontSize: "1.9rem",
    color: "#1c2538",
    fontWeight: 700,
  },
  sectionText: {
    margin: "0 0 16px",
    color: "#4d596b",
    maxWidth: "760px",
  },
  heroPanel: {
    padding: "16px 18px",
    borderRadius: "12px",
    border: "1px solid #e5dbc9",
    background: "#fffdf8",
    marginBottom: "18px",
  },
  inlineGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "10px",
    marginBottom: "12px",
  },
  cell: {
    border: "1px solid #e9dfce",
    borderRadius: "10px",
    padding: "10px",
    background: "#fff",
  },
  cellLabel: {
    fontSize: "0.74rem",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    color: "#6b7280",
    marginBottom: "4px",
  },
  cellValue: {
    fontSize: "0.95rem",
    color: "#1f2937",
    fontWeight: 700,
  },
  postCard: {
    overflow: "hidden",
    margin: "0 0 18px !important",
    borderRadius: "12px",
    border: "1px solid #e8dece",
    boxShadow: "0 8px 20px rgba(15, 23, 42, 0.08)",
  },
  postMedia: {
    width: "100%",
    height: "220px",
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
    inlineGrid: {
      gridTemplateColumns: "1fr",
    },
    postMedia: {
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
};

const useStyles = makeStyles({ ...styles, ...sectionStyles, ...pageStyles });

const fallbackCountries = [
  "Kenya",
  "Uganda",
  "Tanzania",
  "Rwanda",
  "Ethiopia",
  "Namibia",
  "Botswana",
  "South Africa",
  "Zambia",
  "Malawi",
];

const fallbackRidePosts = [
  {
    slug: "africa-ride-route-build-01",
    title: "Africa Ride Route Build 01",
    excerpt: "Mapping access corridors and sponsor checkpoints before cross-border rollout.",
  },
  {
    slug: "africa-ride-community-briefings",
    title: "Community Briefings Before Stage Launch",
    excerpt: "How local education leads are onboarded before each stage starts.",
  },
  {
    slug: "africa-ride-border-logistics",
    title: "Border Logistics and Equipment Planning",
    excerpt: "A practical breakdown of permits, routing, and support convoy timing.",
  },
  {
    slug: "africa-ride-media-partner-pack",
    title: "Media Partner Packout",
    excerpt: "Story capture strategy for consistent visibility across ride stages.",
  },
  {
    slug: "africa-ride-stage-1-review",
    title: "Stage 1 Performance Review",
    excerpt: "Outputs tracked from sponsor visibility to school-level impact touchpoints.",
  },
  {
    slug: "africa-ride-safety-protocol",
    title: "Safety Protocols Across Long-Haul Segments",
    excerpt: "Field standards used to protect riders, crew, and community logistics teams.",
  },
  {
    slug: "africa-ride-funding-cycle",
    title: "Funding Cycle Architecture",
    excerpt: "How brand partnerships are translated into recurring program delivery.",
  },
  {
    slug: "africa-ride-stage-2-plan",
    title: "Stage 2 Build Plan",
    excerpt: "Refined route model informed by data from stage one and partner feedback.",
  },
  {
    slug: "africa-ride-hub-readiness",
    title: "Hub Readiness Checklist",
    excerpt: "Pre-stage readiness criteria for classrooms, libraries, and local custodians.",
  },
  {
    slug: "africa-ride-documentary-notes",
    title: "Documentary Notes from the Road",
    excerpt: "Long-form narrative planning tied to impact verification milestones.",
  },
  {
    slug: "africa-ride-route-metrics",
    title: "Route Metrics Dashboard",
    excerpt: "The KPI set used to track movement, engagement, and educational outcomes.",
  },
  {
    slug: "africa-ride-stage-retrospective",
    title: "Stage Retrospective",
    excerpt: "What changed operationally after each stage and why.",
  },
  {
    slug: "africa-ride-route-brief-03",
    title: "Route Brief 03",
    excerpt: "Stage-level updates on corridor selection and regional lead coordination.",
  },
  {
    slug: "africa-ride-partner-kit-ops",
    title: "Partner Kit Operations",
    excerpt: "Managing visibility kits, media packs, and activation schedules.",
  },
  {
    slug: "africa-ride-checkpoint-readiness",
    title: "Checkpoint Readiness Review",
    excerpt: "Field readiness standards before major route transitions.",
  },
  {
    slug: "africa-ride-education-hub-sync",
    title: "Education Hub Sync",
    excerpt: "Synchronizing route outputs with hub-level literacy programs.",
  },
  {
    slug: "africa-ride-security-protocol-v2",
    title: "Security Protocol v2",
    excerpt: "Updated safety controls for crew, cargo, and documentary units.",
  },
  {
    slug: "africa-ride-sponsor-evidence-pack",
    title: "Sponsor Evidence Pack",
    excerpt: "Evidence framework for sponsor reporting and program verification.",
  },
  {
    slug: "africa-ride-crew-health-log",
    title: "Crew Health Log",
    excerpt: "Crew readiness and wellness practices for sustained field execution.",
  },
  {
    slug: "africa-ride-quarterly-outlook",
    title: "Quarterly Outlook",
    excerpt: "Projection of route expansion, partnerships, and impact targets.",
  },
];

const fallbackPlaylists = [
  {
    id: "playlist-1",
    title: "Africa Ride Stage Briefings",
    description: "Pre-stage briefings and route execution summaries.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PL590L5WQmH8fJ54F7fR7vN7B0n4w4A5vX",
  },
  {
    id: "playlist-2",
    title: "Road Logistics and Support",
    description: "Vehicle support, route safety, and supply operations.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PLFgquLnL59amL4kQyA8h6zYQJm0W0wT4u",
  },
  {
    id: "playlist-3",
    title: "Community Impact Highlights",
    description: "Short films documenting school and library outcomes.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PL9tY0BWXOZFt3y4I8MUQyGvOqkQ4R5Q1B",
  },
  {
    id: "playlist-4",
    title: "Partnership and Sponsor Features",
    description: "Partner narratives and value-delivery case stories.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PL590L5WQmH8fXxYh1hGo4k1uW2Z7L0AA9",
  },
  {
    id: "playlist-5",
    title: "Rider Diary: Africa Edition",
    description: "Diary clips from each major stage checkpoint.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PLFgquLnL59alW3xmYiWRaoz0oM3H17Lth",
  },
  {
    id: "playlist-6",
    title: "Desert Pages to Continental Route",
    description: "From local model to continental expansion story arc.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PL9tY0BWXOZFv2r4J8M2Z0h0YVx3Gx1Q2X",
  },
  {
    id: "playlist-7",
    title: "Field Team Debriefs",
    description: "Weekly team debriefs and execution updates.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PL590L5WQmH8fX0kR8P0a2D8M5Q7E6R1T2",
  },
  {
    id: "playlist-8",
    title: "Africa Ride Documentary Assembly",
    description: "Assembly cuts and long-form documentary segments.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PLFgquLnL59alM1M4B4Yk5x5x2r7z9f2Jm",
  },
  {
    id: "playlist-9",
    title: "Stage Recap Archives",
    description: "Archived recaps from each completed stage.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PLsP4qQ7Tz1hQ6nX7w4b2w9c8m3r5u7a9x",
  },
  {
    id: "playlist-10",
    title: "Continental Sponsor Features",
    description: "Playlist of sponsor integrations across route activations.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PLxA687tYuMWi7K8v9N2p4Q5R6S7T8U9V0",
  },
  {
    id: "playlist-11",
    title: "Rider Media Room",
    description: "Media-room cuts, interviews, and stage narration.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PLc4f7P9mR2bQ8x6Y3n5v1k0z7a4w2t6p9",
  },
  {
    id: "playlist-12",
    title: "Education Impact Episodes",
    description: "Episodes focused on school and community impact outcomes.",
    youtubeUrl: "https://www.youtube.com/playlist?list=PLd3k2L7vQ9pN4b8m1w6x0c5r2t7y9u3a6",
  },
];

const fallbackRideVlogs = [
  {
    slug: "africa-vlog-01",
    title: "Stage 1 Launch",
    summary: "Departure log and first checkpoint delivery.",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    slug: "africa-vlog-02",
    title: "Cross-Border Transit",
    summary: "Cross-border logistics and documentation process.",
    youtubeUrl: "https://www.youtube.com/watch?v=M7lc1UVf-VE",
  },
  {
    slug: "africa-vlog-03",
    title: "School Cluster Stop",
    summary: "A full stop sequence from arrival to final handover.",
    youtubeUrl: "https://www.youtube.com/watch?v=3JZ_D3ELwOQ",
  },
  {
    slug: "africa-vlog-04",
    title: "Sponsor Visibility Day",
    summary: "On-road sponsor activation and audience engagement.",
    youtubeUrl: "https://www.youtube.com/watch?v=9bZkp7q19f0",
  },
  {
    slug: "africa-vlog-05",
    title: "Long-Haul Route Night",
    summary: "Night operations and crew rotation on long segments.",
    youtubeUrl: "https://www.youtube.com/watch?v=fJ9rUzIMcZQ",
  },
  {
    slug: "africa-vlog-06",
    title: "Checkpoint Debrief",
    summary: "Post-stage debrief and dashboard update.",
    youtubeUrl: "https://www.youtube.com/watch?v=Zi_XLOBDo_Y",
  },
  {
    slug: "africa-vlog-07",
    title: "Stage 2 Planning",
    summary: "Planning adjustments after field feedback.",
    youtubeUrl: "https://www.youtube.com/watch?v=hTWKbfoikeg",
  },
  {
    slug: "africa-vlog-08",
    title: "Impact Verification",
    summary: "How on-ground verification is recorded and shared.",
    youtubeUrl: "https://www.youtube.com/watch?v=kXYiU_JCYtU",
  },
  {
    slug: "africa-vlog-09",
    title: "Regional Media Brief",
    summary: "A media briefing from a regional checkpoint stop.",
    youtubeUrl: "https://www.youtube.com/watch?v=YQHsXMglC9A",
  },
  {
    slug: "africa-vlog-10",
    title: "Sponsor Strategy Clip",
    summary: "Sponsor activation strategy and route-facing visibility decisions.",
    youtubeUrl: "https://www.youtube.com/watch?v=60ItHLz5WEA",
  },
  {
    slug: "africa-vlog-11",
    title: "Community Partner Session",
    summary: "Community partner alignment and next-stage commitments.",
    youtubeUrl: "https://www.youtube.com/watch?v=ktvTqknDobU",
  },
  {
    slug: "africa-vlog-12",
    title: "Monthly Route Overview",
    summary: "End-of-month route and impact summary from the field desk.",
    youtubeUrl: "https://www.youtube.com/watch?v=RgKAFK5djSk",
  },
];

function asText(value, fallback) {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function hasRideSignal(entry) {
  const blob = [entry?.title, entry?.excerpt, entry?.summary, entry?.content]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (blob.includes("ride") || blob.includes("stage") || blob.includes("route") || blob.includes("africa")) {
    return true;
  }

  const tags = entry?.tags;
  if (Array.isArray(tags)) {
    return tags.some((tag) => {
      const value = String(tag).toLowerCase();
      return value.includes("ride") || value.includes("africa") || value.includes("route");
    });
  }

  return false;
}

function asPlaylistItems(documentaries) {
  const fromDocs = documentaries
    .map((doc, index) => {
      const source = doc?.watchUrl || doc?.trailerYoutubeUrl;
      const playlistId = getYoutubePlaylistId(source);
      if (!playlistId) return null;

      return {
        id: `doc-playlist-${doc.id || index}`,
        title: doc.title || "Documentary playlist",
        description: doc.logline || "Documentary segments and assembly cuts.",
        playlistId,
      };
    })
    .filter(Boolean);

  const merged = [...fromDocs];
  const seen = new Set(merged.map((item) => item.playlistId));

  for (const playlist of fallbackPlaylists) {
    const playlistId = getYoutubePlaylistId(playlist.youtubeUrl);
    if (playlistId && !seen.has(playlistId)) {
      merged.push({
        id: playlist.id,
        title: playlist.title,
        description: playlist.description,
        playlistId,
      });
      seen.add(playlistId);
    }
  }

  return merged.slice(0, 12);
}

export default function AfricaRidePage({ plan, sponsorTiers, posts, vlogs, documentaries }) {
  const classes = useStyles();

  const countries = Array.isArray(plan?.projectedCountries) && plan.projectedCountries.length
    ? plan.projectedCountries
    : fallbackCountries;

  const ridePosts = posts.length
    ? (posts.filter(hasRideSignal).length ? posts.filter(hasRideSignal) : posts).slice(0, 18)
    : fallbackRidePosts;

  const rideVlogs = vlogs.length
    ? (vlogs.filter(hasRideSignal).length ? vlogs.filter(hasRideSignal) : vlogs).slice(0, 12)
    : fallbackRideVlogs;

  const playlists = asPlaylistItems(documentaries);
  const heroImage = getMediaUrl(plan?.heroAsset) || pickFallbackImage(0);

  return (
    <div>
      <Header
        color="transparent"
        brand="Africa Ride"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{ height: 260, color: "overlay" }}
      />
      <Parallax small filter image={heroImage}>
        <div className={classes.container}>
          <GridContainer>
            <GridItem xs={12} sm={12} md={9}>
              <h1 className={classes.title}>Africa Ride: Posts, Playlists, and Vlogs</h1>
              <h4>{asText(plan?.overview, "Continental expedition built as a media-and-impact engine for rural education access.")}</h4>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.section}>
          <div className={classes.heroPanel}>
            <div className={classes.inlineGrid}>
              <div className={classes.cell}>
                <div className={classes.cellLabel}>Coverage</div>
                <div className={classes.cellValue}>{countries.length} countries planned</div>
              </div>
              <div className={classes.cell}>
                <div className={classes.cellLabel}>Sponsorship Tiers</div>
                <div className={classes.cellValue}>{sponsorTiers.length || 4} active tiers</div>
              </div>
              <div className={classes.cell}>
                <div className={classes.cellLabel}>Budget Summary</div>
                <div className={classes.cellValue}>{asText(plan?.budgetSummary, "Logistics, media, safety, and program delivery")}</div>
              </div>
              <div className={classes.cell}>
                <div className={classes.cellLabel}>Primary CTA</div>
                <div className={classes.cellValue}>Partner the Africa Ride</div>
              </div>
            </div>
            <div className={classes.inlineList}>
              {countries.map((country) => (
                <span className={classes.badge} key={country}>{country}</span>
              ))}
            </div>
            <Button color="primary" href="/get-involved">Download proposal</Button>
          </div>

          <h2 className={classes.sectionTitle}>Past Ride Posts</h2>
          <p className={classes.sectionText}>Posts from route stages, field logistics, and delivery milestones.</p>
          <GridContainer>
            {ridePosts.map((post, index) => {
              const image = getMediaUrl(post.featuredImage) || pickFallbackImage(index);

              return (
                <GridItem xs={12} sm={6} md={4} key={post.slug || post.id || post.title}>
                  <Card className={classes.postCard}>
                    <img src={image} alt={post.title || "Ride post"} className={classes.postMedia} />
                    <CardBody>
                      <h4 className={classes.cardTitle}>{post.title || "Ride update"}</h4>
                      <p>{post.excerpt || "Africa Ride post update."}</p>
                      <Button color="primary" simple href={`/blog?story=${post.slug || "africa-ride"}`}>
                        Open post
                      </Button>
                    </CardBody>
                  </Card>
                </GridItem>
              );
            })}
          </GridContainer>

          <h2 className={classes.sectionTitle}>YouTube Playlists</h2>
          <p className={classes.sectionText}>Playlist bundles used as long-form post and vlog collections.</p>
          <GridContainer>
            {playlists.map((playlist, index) => (
              <GridItem xs={12} sm={6} md={4} key={playlist.id || index}>
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

          <h2 className={classes.sectionTitle}>Ride Vlogs</h2>
          <p className={classes.sectionText}>Frequent vlog dispatches from stage execution and route verification.</p>
          <GridContainer>
            {rideVlogs.map((vlog, index) => {
              const videoId = getYoutubeId(vlog.youtubeVideoId) || getYoutubeId(vlog.youtubeUrl);
              const preview = youtubeThumb(videoId) || getMediaUrl(vlog.thumbnail) || pickFallbackImage(index + 1);

              return (
                <GridItem xs={12} sm={6} md={4} key={vlog.slug || vlog.id || vlog.title}>
                  <Card className={classes.vlogCard}>
                    {videoId ? (
                      <iframe
                        title={vlog.title || `Ride vlog ${index + 1}`}
                        src={`https://www.youtube.com/embed/${videoId}`}
                        className={classes.vlogFrame}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    ) : (
                      <img src={preview} alt={vlog.title || "Ride vlog"} className={classes.vlogImage} />
                    )}
                    <CardBody>
                      <h4 className={classes.cardTitle}>{vlog.title || "Ride vlog"}</h4>
                      <p>{vlog.summary || "Africa Ride vlog update."}</p>
                      <Button color="primary" simple href="/vlogs">View vlog feed</Button>
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
  const [plan, sponsorTiers, posts, vlogs, documentaries] = await Promise.all([
    safeCms("/api/africa-ride-plan?populate=heroAsset", null),
    safeCms("/api/sponsor-tiers?sort=name:asc", []),
    safeCms("/api/blog-posts?populate=featuredImage&sort=publishedOn:desc&pagination[limit]=20", []),
    safeCms("/api/vlogs?populate=thumbnail&sort=publishedOn:desc&pagination[limit]=16", []),
    safeCms("/api/documentaries?sort=releaseDate:desc&pagination[limit]=12", []),
  ]);

  return { props: { plan, sponsorTiers, posts, vlogs, documentaries } };
}
