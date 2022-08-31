function getDateTimeNow() {
    let dateNow = new Date();

    // current date
    // adjust 0 before single digit date
    let date = ("0" + dateNow.getDate()).slice(-2);

    // current month
    let month = ("0" + (dateNow.getMonth() + 1)).slice(-2);

    // current year
    let year = ("0" + dateNow.getFullYear()).slice(-2);

    // current hours
    let hours = ("0" + dateNow.getHours()).slice(-2);

    // current minutes
    let minutes = ("0" + dateNow.getMinutes()).slice(-2);

    // current seconds
    let seconds = ("0" + dateNow.getSeconds()).slice(-2);

    return `${year}-${month}-${date} ${hours}:${minutes}:${seconds}`
}

function logger(req, res, next) {
    log("Listener", req.url);
    next();
}

function log(mod, text) {
    console.log(`[${getDateTimeNow()}] (${mod}) ${text}`);
}

export { logger, getDateTimeNow, log };