const router = require('express').Router();

const users = [];


router.get('/', (req, res) => {
    res.json(users)
});

router.post('/', (req, res) => {
    const user = req.body;
    users.push(user);
    res.json('User is added to the database');
});

router.post('/sign-in/', (req, res) => {
    const user = req.body;
    const userFound = users.find((usr) => (usr.username === user.username && usr.password === user.password));
    res.json(userFound ? userFound : 'User not found!');
});

module.exports = router;