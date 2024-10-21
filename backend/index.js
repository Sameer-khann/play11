import express from "express";
import bodyParser from "body-parser"
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import players from "./routes/player.route.js"
import teamRoutes from "./routes/team.route.js"


dotenv.config({});

const app = express();


// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));


const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
}
app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's
app.use("/players", players);
app.use("/teams", teamRoutes);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    })
}).catch((error) => {
    console.error('Failed to connect to DB:', error);
});


// Generic error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Something broke!' });
});