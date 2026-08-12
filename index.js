const PROD = !!process.argv[2];
const domain = "beta.jedelstetten.com";

const { nulls } = require("nulls");

(async () => {

  const server = await nulls({
    "nulls": "site",
    "static": "static",
    "uploads": false,
    "ready": () => console.log("Hello!"),
    "port": PROD ? parseInt(process.argv[2]) : 8080,
    "forceHTTPS": PROD,
    "proxies": PROD ? 1 : 0,
    "domain": domain,
    "redirects": { "/\*splat": req => "/" }
  });

  process.on("SIGINT", () => {
    server.close();
    console.log("\rReceived CTRL-C: Goodbye!");
  });

})();
