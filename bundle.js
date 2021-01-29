var watch = require("node-watch");
let sassEs = require("essass");
var liveServer = require("live-server");

////confs
let confs = {
  entry: ["src/App.js"],
  out: "dist/app.js",
  port: 8181,
};

var params = {
  port: 8181,
  host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
  root: "./dist", // Set root directory that's being served. Defaults to cwd.
  open: false, // When false, it won't load your browser by default.
  ignore: "scss,my/templates", // comma-separated string for paths to ignore
  file: "index.html", // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
  //wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
  mount: [["/components", "./node_modules"]], // Mount a directory to a route.
  logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
  middleware: [
    function (req, res, next) {
      next();
    },
  ], // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
};

watch("./src/", { recursive: true }, function (evt, name) {
  require("esbuild")
    .build({
      entryPoints: confs.entry,
      bundle: true,
      outfile: confs.out,
      loader: { ".js": "jsx" },
      plugins: [sassEs],

      define: {
        "process.env.NODE_ENV": '"production"',
      },
    })
    .catch(() => process.exit(1))
    .then(() => {});
});

liveServer.start(params);
