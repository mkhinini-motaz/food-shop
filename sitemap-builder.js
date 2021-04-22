require("babel-register")({
	presets: ["es2015", "react"],
});
const router = require("./sitemap-routes").default;
const Sitemap = require("react-router-sitemap").default;

async function generateSitemap() {
	return new Sitemap(router)
		.build("https://ghostchef.shop/")
		.save("./public/sitemap.xml")
		.save("./public/sitemap_index.xml");
}
generateSitemap();
