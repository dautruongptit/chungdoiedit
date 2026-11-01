import fs from "fs";

const html = fs.readFileSync("docs/survey/raw/minimalism_green_demo_outer.html", "utf8");

// Extract root container attributes
const rootMatch = html.match(/<div[^>]*data-testid="minimalism-green-template"[^>]*>/);
console.log("Root element:", rootMatch ? rootMatch[0] : "not found");

// Check child sections
const secMatches = [...html.matchAll(/<(header|section|footer)\b([\s\S]*?)<\/\1>/g)];
console.log("Found sections:", secMatches.length);

fs.mkdirSync("web/src/features/invitation/shell/blocks/minimalism_green", { recursive: true });
fs.mkdirSync("web/src/features/invitation/shell/specs/minimalism_green", { recursive: true });

// Convert HTML to JSX helper
function htmlToJsx(str) {
  let s = str
    .replace(/\bclass="/g, 'className="')
    .replace(/\bfor="/g, 'htmlFor="')
    .replace(/\baria-hidden="true"/g, 'aria-hidden="true"')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/style="([^"]*)"/g, (_, css) => {
      const rules = css.split(";").filter(r => r.trim());
      const obj = {};
      for (const r of rules) {
        const colon = r.indexOf(":");
        if (colon === -1) continue;
        const prop = r.slice(0, colon).trim();
        const val = r.slice(colon + 1).trim();
        const camel = prop.replace(/-([a-z])/g, (_, g) => g.toUpperCase());
        obj[camel] = val;
      }
      return `style={${JSON.stringify(obj)}}`;
    });
  return s;
}

// 1. Theme.json
const themeJson = {
  "assets": "/images/themes/minimalism-green",
  "colors": {
    "ink": "rgb(107, 123, 79)",
    "inkRgb": "107, 123, 79",
    "sub": "rgba(107, 123, 79, 0.15)",
    "muted": "rgb(135, 161, 114)",
    "paper": "rgb(255, 255, 255)",
    "line": "rgb(205, 217, 189)",
    "accent": "rgb(233, 239, 225)",
    "edge": "rgba(108, 128, 78, 0.1)"
  }
};
fs.writeFileSync("web/src/features/invitation/shell/specs/minimalism_green/theme.json", JSON.stringify(themeJson, null, 2));

// 2. Capabilities.json
const capsJson = {
  "id": "minimalism_green",
  "family": "minimalism_green",
  "testId": "minimalism-green-template",
  "blocks": [
    "Paper",
    "Hero",
    "Ceremony",
    "Banquet",
    "Venue",
    "Schedule",
    "Guestbook",
    "Footer",
    "Credit",
    "Lightbox"
  ],
  "cover": {
    "seal": "heart",
    "ambient": "fall",
    "particle": "petal",
    "skin": "card"
  },
  "gift": {
    "widget": "envelope"
  },
  "hero": {
    "kind": "photo",
    "introLine": true,
    "shape": "portrait"
  },
  "album": {
    "indicator": "counter",
    "defaultLayout": "3d"
  },
  "countdown": false,
  "layout": {
    "contentMaxMd": 900,
    "behaviorMd": "padded",
    "parallaxDecor": false
  },
  "editor": {
    "albumCardAfter": "ceremony",
    "cards": {
      "hero": false,
      "coupleHero": true,
      "introLine": true
    }
  }
};
fs.writeFileSync("web/src/features/invitation/shell/specs/minimalism_green/capabilities.json", JSON.stringify(capsJson, null, 2));

console.log("Created capabilities.json and theme.json for minimalism_green");
