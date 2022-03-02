const express = require('express');
const { send } = require('express/lib/response');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;

const { PostsModel} = require('../models/postsModel');

router.get('/', (req, res) => {
    PostsModel.find((err, docs) => {
        if (!err) {
            console.log(docs);
            res.send(docs);
        } else {
            console.log("Error to get data: " + err);
        }
    })
});

router.post('/', (req, res) => {
    console.log(req.body);
    const newRecord = new PostsModel({
        author: req.body.author,
        message: req.body.message
    });
    newRecord.save((err, docs) => {
        if (! err) res.send(docs);
        else console.log(`Error creating new data: ${err}`);
    })
});


router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id) ) {
        return res.status(400).send(`ID unknown: ${req.params.id}`)
    }

    const updateRecord = {
        author: req.body.author,
        message: req.body.message
    }

    PostsModel.findByIdAndUpdate(
        req.params.id,
        {$set: updateRecord},
        {new: true},
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log(`Error Updatind data: ${err}`);
        } 
    )
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id) ) {
        return res.status(400).send(`ID unknown: ${req.params.id}`)
    }

    PostsModel.findByIdAndRemove(
        req.params.id,
        (err, docs) => {
            if (!err) res.send(docs);
            else console.log(`Delete error: ${err}`);
        }
    )
});


module.exports = router;
