var express   = require('express');
var router    = express.Router();
var model     = require('../../models/index');

const awaitErrorHandler = middleware => {
    return async(req, res, next) => {
        try {
            await middleware(req, res, next);
        } catch (err) {
            next(err);
        }
    }
}

router.get('/', awaitErrorHandler(async(req, res, next) => {
        const member = await model.Member.findAll({});

        return res.json({
            error   : false,
            data    : member
        });
    })
);

module.exports = router;