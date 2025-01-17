const adminAuth = (req, res, next) => {
    console.log("Admin Auth");
    const token = "xyz";
    const isAdminAuthenticated = token === "xyz";
    if (isAdminAuthenticated) {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
};

module.exports = {adminAuth};