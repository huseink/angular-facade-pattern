const router = require('express').Router();

const users = [];


router.get('/', (req, res) => {
    res.json(users)
});

router.get('/:username/basket', (req, res) => {
    const { username } = req.params;
    const user = users.find((usr) => usr.username === username);
    res.json(user.basket)
});

router.post('/', (req, res) => {
    const user = req.body;
    users.push(user);
    res.json('User is added to the database');
});

router.post('/:username/basket', (req, res) => {
    const basket = req.body;
    const { username } = req.params;
    users.forEach((usr) => {
        if(usr.username === username) {
            usr.basket = basket;
        }
    })
    res.json('User basket is updated');
});

router.post('/sign-in/', (req, res) => {
    const user = req.body;
    const userFound = users.find((usr) => (usr.username === user.username && usr.password === user.password));
    res.json(userFound ? userFound : 'User not found!');
});

module.exports = router;