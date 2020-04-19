const NodeCache = require( "node-cache" );
const myCache = new NodeCache();


const cache = (duration) => {
   return (req, res, next) => {
        if (req.method === 'GET') {

            let key = '__express__' + req.url || req.originalUrl;
            let cachedBody = myCache.get( key )

            if (cachedBody) {
                res.send(cachedBody)
                return

            } else {
                res.sendResponse = res.send
                res.send = (body) => {
                    myCache.set(key, body, duration)
                    res.sendResponse(body)
                }
            }
            return next();
        }
    }
};


module.exports = cache
