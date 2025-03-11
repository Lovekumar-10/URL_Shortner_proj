// Import Required Modules
import express from 'express';
import mongoose, { get } from 'mongoose';
import {shortURL , orginalURL} from './Controllers/url.js';

const app = express();  // Initialize Express App
const port = 8000;  // Define Port Number

// to render ejs
app.set("view engine", "ejs");

// ✅ Middleware to Parse URL-Encoded Data
app.use(express.urlencoded({ extended: true }));  

// ✅ Connect to MongoDB
mongoose.connect("mongodb+srv://lovekumar161129:rJi9qBMx9v1rmrw7@cluster0.vp53h.mongodb.net/", {
    dbName: "NodeJs_Trails"  // Set Database Name
}).then(() => {
    console.log("✅ Connected to MongoDB");  // Success Message
}).catch((err) => {
    console.log(" Error in connecting to MongoDB", err);  // Error Handling
});

// ✅ Define Routes

// Route to Render Home Page
app.get('/', (req, res) => {
    res.render('index.ejs', {shortURL: null});  // Rendering EJS Template
});

// short URL logic
app.post('/run', shortURL)

// redirecting to orginsl url : dynamic route
app.get('/:shortCode', orginalURL)

// Start Server and Listen on Port
app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});