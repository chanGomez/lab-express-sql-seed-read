const checkTitle = (req, res, next) => {
    if (!req.body.title){
        res.status(400).json({error:"Title is required"});
    }else{
        next();
    }
};
const checkArtist = (req, res, next) => {
    if (!req.body.artist){
        res.status(400).json({error:"Artist name is required"});
    }else{
        next();
    }
};

const checkIs_favorite = (req, res, next) => {

    const {is_favorite} = req.body
    
    if (typeof is_favorite !== "boolean"){
        res.status(400).json({error:"Is not a boolean"})
    }else{
        next()
    }
}

module.exports = { checkTitle, checkIs_favorite, checkArtist};