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
}));

router.post('/', function(req, res, mext) {
    var {name, nrp}  = req.body;

    const member = model.Member.create({
        name : name,
        nrp : nrp
    });

    return res.status(201).json({
        error   : false,
        message : "Member already created !",
        data    : member,
    });
});

router.put('/:id', (req, res) => {
    const id            = req.params.id;
    const {name, nrp}   = req.body;

    model.Member.update({
        name : name,
        nrp  : nrp
    }, {
        where : {
            id : id
        }
    })
    .then(member =>  res.json({
        error   : false,
        message : "Member already updated !",
        data    : member
    }))
    .catch(error =>  res.json({
        error   : true,
        message : error
    }));
});

router.delete('/:id', (req, res) => {
    const id    = req.params.id;

    model.Member.destroy({
        where : {
            id : id
        }
    })
    .then(status =>  res.json({
        error   : false,
        message : "Member already deleted !"
    }))
    .catch(error =>  res.json({
        error   : true,
        message : error
    }));
});

module.exports = router;