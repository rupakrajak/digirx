require("dotenv").config();
require("./database/connect");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const notFound = require("./middlewares/not-found")
const errorHandler = require("./middlewares/error-handler");
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/users", require("./routes/users"));
app.use("/clinical-labs", require("./routes/clinical-labs"));

// app.get("/", (req, res) => {
//     res.json({
//         status: "success",
//         message: "Hello from the server",
//         request: {
//             method: req.method,
//             url: `${req.protocol}://${req.get("host")}${req.originalUrl}`,
//         },
//     });
// });

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    console.log(
        `[server] starting server...\n[server] listening on port ${process.env.PORT}`
    );
});
