var express = require('express'),
        Bourne = require('bourne'),
        bodyParser = require('body-parser'),
        db_leave = new Bourne('leave.json'),
        db_user = new Bourne('users.json'),
        router = express.Router();

router
        .use(bodyParser.json())
        .route('/leave')
        .get(function (req, res) {
            db_leave.find({userId: parseInt(req.user.id, 10)}, function (err, data) {
                res.json(data);
            });
        })
        .post(function (req, res) {
            var leave = req.body;
            leave.userId = req.user.id;

            db_leave.insert(leave, function (err, data) {
                res.json(data);
            });
        });

router
        .param('id', function (req, res, next) {
            req.dbQuery = {id: parseInt(req.params.id, 10)};
            next();
        })
        .route('/leave/:id')
        .get(function (req, res) {
            db_leave.findOne(req.dbQuery, function (err, data) {
                res.json(data);
            });
        })
        .put(function (req, res) {
            var leave = req.body;
            delete leave.$promise;
            delete leave.$resolved;
            db_leave.update(req.dbQuery, leave, function (err, data) {
                res.json(data[0]);
            });
        })
        .delete(function (req, res) {
            db_leave.delete(req.dbQuery, function () {
                res.json(null);
            });
        });


router
        .use(bodyParser.json())
        .route('/user')
        .get(function (req, res) {
            db_user.find({}, function (err, data) {
                res.json(data);
            });
        })
        .post(function (req, res) {
            var user = req.body;
            user.userId = req.user.id;

            db_user.insert(user, function (err, data) {
                res.json(data);
            });
        });
module.exports = router;
