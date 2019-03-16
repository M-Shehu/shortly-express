const parseCookies = (req, res, next) => {
    if (req.headers.cookie !== undefined) {
        var cookie = {};
        var cookieStr = req.headers.cookie;
        var cookieArr = cookieStr.split('; ');
        cookieArr.forEach((element) => {
            var key = element.slice(0, element.indexOf('='));
            var value = element.slice(element.indexOf('=') + 1);
            cookie[key] = value;
        });
        req.cookies = cookie;
    }
    next();
};

module.exports = parseCookies;