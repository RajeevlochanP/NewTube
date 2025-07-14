import express from "express";
import session from 'express-session';
const app = express();
const port = 3000;


// body Parsing middleware
app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ extended: true, limit: "500mb" }));
app.use(session({
  secret: 'Ali is the best',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 *1000 }, // 24 hours cookie expiry time
}));

// Static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


app.listen(port, () => {
  console.log(`app listening on port http://localhost:${port}`);
});