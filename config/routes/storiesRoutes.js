const express = require('express');

const db = require('../../database/dbConfig.js');

const Stories = require('../dbModels/storiesDBRequestModels.js');

const storiesRoutes = express.Router();


//endpoint route handler to get all of the approved stories
storiesRoutes.get('/', async (req, res) => {
    try {
        const stories = await Stories.getApproved();
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json(error);
    }
}); 

//endpoint route handler that gets a single approved story by id
storiesRoutes.get('/:id', async (req, res) => {
    try {
        const stories = await Stories.findById(req.params.id);
        res.status(200).json(stories);
    } catch (error) {
        res.status(500).json(error);
    }
}); 






module.exports = storiesRoutes;



