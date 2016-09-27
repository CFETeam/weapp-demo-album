/**
 * 通用路由分发器
 */

const express = require('express');
const path = require('path');
const _ = require('lodash');
const config = require('../config');
const routes = require('../routes');

const routeOptions = { 'caseSensitive': true, 'strict': true };
const routeDispatcher = express.Router(routeOptions);

_.each(routes, (route, subpath) => {
    const router = express.Router(routeOptions);

    let routePath;

    // ignore `config.ROUTE_BASE_PATH` if `subpath` begin with `~`
    if (subpath[0] === '~') {
        routePath = subpath.slice(1);
    } else {
        routePath = config.ROUTE_BASE_PATH + subpath;
    }

    require(path.join(global.SERVER_ROOT, 'routes', route))(router);

    routeDispatcher.use(routePath, router, (err, req, res, next) => {
        // mute `URIError` error
        if (err instanceof URIError) {
            return next();
        }

        throw err;
    });
});

module.exports = routeDispatcher;