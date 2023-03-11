export default async function auth(req, res, next) {
        
    if (!req.session.hasOwnProperty("userId")) {
        req.session.redirect = `/dashboard/api${req.url}`;
        res.redirect("/login");
        return;
    }

    next();
}