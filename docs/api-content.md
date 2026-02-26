# Content API Reference (Blog, Vlog, Documentary)

This API is served by Strapi and exposes read-only public endpoints for published content.
Base URL (local): `http://localhost:1337`

## Blog Posts

### List blog posts
```
GET /api/blog-posts?sort=publishedOn:desc
```

Example:
```bash
curl "http://localhost:1337/api/blog-posts?sort=publishedOn:desc"
```

### Get a blog post by slug
```
GET /api/blog-posts?filters[slug][$eq]=<slug>
```

Example:
```bash
curl "http://localhost:1337/api/blog-posts?filters[slug][$eq]=why-the-ride-matters"
```

## Vlogs

### List vlogs
```
GET /api/vlogs?sort=publishedOn:desc
```

Example:
```bash
curl "http://localhost:1337/api/vlogs?sort=publishedOn:desc"
```

### Get a vlog by slug
```
GET /api/vlogs?filters[slug][$eq]=<slug>
```

Example:
```bash
curl "http://localhost:1337/api/vlogs?filters[slug][$eq]=ride-log-episode-1"
```

## Documentaries

### List documentaries
```
GET /api/documentaries?sort=releaseDate:desc
```

Example:
```bash
curl "http://localhost:1337/api/documentaries?sort=releaseDate:desc"
```

### Get a documentary by slug
```
GET /api/documentaries?filters[slug][$eq]=<slug>
```

Example:
```bash
curl "http://localhost:1337/api/documentaries?filters[slug][$eq]=africa-ride-documentary"
```

## Notes
- These endpoints return published content only.
- Use `populate=*` if you need media/relations included.
- Add pagination with `pagination[page]` and `pagination[pageSize]`.
