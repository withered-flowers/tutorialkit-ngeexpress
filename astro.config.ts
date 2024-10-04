import tutorialkit from "@tutorialkit/astro";
import { defineConfig } from "astro/config";

export default defineConfig({
	devToolbar: {
		enabled: false,
	},
	integrations: [tutorialkit()],
	site: process.env.SITE_URL || "http://localhost:4321",
});
