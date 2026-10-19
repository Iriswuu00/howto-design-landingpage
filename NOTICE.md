# Attribution and Changes

This project is an independent adaptation of the `brand-landingpage` skill from
[`wshobson/agents`](https://github.com/wshobson/agents), originally authored by
Seth Hobson and distributed under the MIT License.

Original source:

```text
https://github.com/wshobson/agents/tree/main/plugins/brand-landingpage/skills/brand-landingpage
```

The core design sequence—brand interview, design-system translation,
generate/review loop, and delivery—is preserved.

Material changes in this adaptation:

- Removed Stitch SDK, MCP, API-key setup, and all third-party design-platform
  dependencies.
- Replaced remote screen generation with local HTML/CSS implementation.
- Removed deployment, hosting, DNS, and publishing instructions.
- Added a local project-state model and HTML quality validator.
- Added a reusable, dependency-free landing-page starter.
- Added Chinese documentation explaining the product and design rationale.
- Added explicit boundaries for claims, image rights, privacy, accessibility,
  and production handoff.

This repository is not endorsed by or affiliated with the original author.
