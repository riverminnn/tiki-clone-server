const jsonServer = require("json-server");
const path = require("path");
const dotenv = require("dotenv")
const auth = require("json-server-auth")
dotenv.config()

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, "api.json"));
const middlewares = jsonServer.defaults();
// /!\ Bind the router db to the app
server.db = router.db;

// Set a default port if PORT is undefined in the environment
const PORT = process.env.PORT || 3000;

// Define custom rules - no authentication for PUT requests
const rules = auth.rewriter({
  // Format: METHOD ENDPOINT: RULE
  // 640 means only the author has read/write access
  // 660 means everyone can access
  "PUT /*": 660,  // Allow PUT without authentication

  // Keep other default rules if needed
  // "users*": 640,  // Standard protection for user data
  // "products*": 640  // Standard protection for products
});

server.use(middlewares);
server.use(rules); // Apply custom rules
server.use(auth); // Apply auth after rules
server.use(router);
server.listen(PORT, () => {
  console.log("Welcome to mock API on port " + PORT);
});