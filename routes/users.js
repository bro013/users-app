const express = require('express');
const userClient = require('../clients/userClient')
const router = express.Router()

router.route('/')
    .get(async (req, res) => {
        const users = await userClient.getUsers();
        res.json(users);
    })
    .post(async (req, res) => {
        const name = req.body.name
        if (!name) {
            res.status(400).json({ "message": "Invalid name" })
        }
        const user = { name: name }
        const result = await userClient.insertUser(user)
        res.json(result)
    });

router.route('/:id')
    .get(async (req, res) => {
        const id = req.params.id
        const user = await userClient.getUser(req.params.id)

        if (user) {
            res.json(user);
        }
        else {
            res.status(404).json({ error: `User ${id} not found` });
        }
    }).delete(async (req, res) => {
        const id = req.params.id
        const result = await userClient.deleteUser(id)
        res.json(result)
    });

module.exports = router