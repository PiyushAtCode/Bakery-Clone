if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejsMate = require("ejs-mate");
const cookieParser = require('cookie-parser');
const session = require('express-session');
// ✅ 1. connect-mongo ka sahi aur modern require syntax
const MongoStore = require('connect-mongo'); 
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const productRoutes = require('./routes/product');
const reviewRoutes = require('./routes/review');
const userRoutes = require('./routes/user');

// DB URL
const dbUrl = process.env.ATLAS_URI;

// MongoDB Connection
main()
.then(() => console.log("MongoDB Connected..."))
.catch(err => console.log("MongoDB Connection Error: ", err));

async function main() {
    await mongoose.connect(dbUrl);
}

// ✅ 2. MongoStore ka modern/sahi initialization (Vercel ke liye 100% stable)
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.session_secret || 'fallbackSecretKey'
    },
    touchAfter: 24 * 3600 // seconds me
});

store.on("error", function (e) {
    console.log("Session Store Error", e);
});

const sessionOptions = {
    store: store,
    secret: process.env.session_secret || 'fallbackSecretKey',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
};

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Locals
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currentUser = req.user;
    res.locals.search = "";  
    next();
});

// ✅ 3. Root Route Redirect (Website khulne par seedha /products par bhejne ke liye)
app.get('/', (req, res) => {
    res.redirect('/products');
});

// Routes
app.use("/products", productRoutes);
app.use("/products/:id/reviews", reviewRoutes);
app.use("/", userRoutes);

// 404 handler
app.use((req, res) => {
    res.status(404).send("Page Not Found!");
});

// Error middleware
app.use((err, req, res, next) => {
    console.log("ERROR:", err);
    let statusCode = err.statusCode || err.status || 500;
    let message = err.message || "Something wrong";
    res.status(statusCode).render("error.ejs", { message });
});

// ✅ 4. Port Configuration (Vercel ke liye process.env.PORT compulsory hai)
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
