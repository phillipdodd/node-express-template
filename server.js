const cluster = require("cluster");
if (cluster.isMaster) {
    var cpuCount = require("os").cpus().length;
    for (var i = 0; i < cpuCount; i++) {
        cluster.fork();
    }
    cluster.on("exit", function(worker) {
        console.log(`Worker ${worker.id} died :(`);
        cluster.fork();
    });
} else {
    require("dotenv").config();
    const http = require("http");
    const logger = require("./lib/myWinston")("server.js");
    const express = require("express");
    const app = express();

    //* Apply Middleware
    const bodyParser = require("body-parser");
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(require("./middleware/removeEmptyProperties"));

    const serverPort = process.env.SSL_PORT || 4000;
    // var sslOptions = {
    //     pfx: fs.readFileSync(process.env.SSL_PFX),
    //     passphrase: process.env.SSL_PASS
    // }

    //* Apply Routes
    require("./api/routes/routes.js")(app);

    http.createServer(app).listen(serverPort);
    logger.info(`Cluster ${cluster.worker.id} listening on port ${serverPort}`);

}
