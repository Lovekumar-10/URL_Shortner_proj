import { Url } from "../Models/URL.js"
import shortid from "shortid";


export const shortURL = async (req , res)=>{
    const longUrl = req.body.longUrl
    const shortCode = shortid.generate()

    const shortUrl = `http://localhost:8000/${shortCode}`

    // save to DB
    const newUrl = new Url({shortCode, longUrl})
    await newUrl.save()

    console.log("Short Saved = ", newUrl)

    res.render("index.ejs", { shortURL: shortUrl });

};

export const orginalURL = async (req , res)=>{
    const shortCode = req.params.shortCode

    // find on DB
    const RealURL = await Url.findOne({shortCode});

    if(RealURL){
        res.redirect(RealURL.longUrl);

    }else{
        res.json( {message : "Invalid shortCode  "})
    }
    

}