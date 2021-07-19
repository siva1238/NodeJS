const express = require('express');
const { check, body } = require('express-validator/check');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', [body('email').isEmail().withMessage('Please enter a valid email address'),
body('password', 'password has to be valid')
    .isLength({ min: 5 }).isAlphanumeric().trim()], authController.postLogin);
//check() is for validate email with custom message 
router.post('/signup', [check('email').isEmail()
    .withMessage('PLease Enter a valid email').custom((value, { req }) => {
        // if (value == 'test@test.com') {
        //     throw new Error('this email address is forbidden')
        // }
        // return true;
        //Async vaidaytion by Promise
        //Express validator detects as error when promise rejects and returns same.
        return User.findOne({ email: value })
            .then(userDoc => {
                if (userDoc) {
                    return Promise.reject('E-Mail exists already, please pick a different one.');
                }

            })
    }).normalizeEmail(),
body('password', 'please enter a password with only numbers nd text and atleast 5 characters')
    .isLength({ min: 5 }).isAlphanumeric().trim(),
body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error("Passwords have to match")
    }
    return true;
})
], authController.postSignup);


router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
