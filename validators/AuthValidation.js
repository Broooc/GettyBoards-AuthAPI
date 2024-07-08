const Yup = require('yup')

const signUpSchema = Yup.object({
    email: Yup.string()
        .required('Email is necessary')
        .email("Email is incorrect")
        .min(10, "Email is too short, at least 10 symbols")
        .max(50, 'Email is too long, the limit is 50'),
    password: Yup.string()
        .required('Password is necessary')
        .min(8, "Password is too short, at least 8 symbols")
        .max(40, 'Password is too long, the limit is 40'),
    role: Yup.number()
        .required('This is necessary')
        .typeError("This isn't look like a number"),
})

function signUpValidation(req, res, next) {
    signUpSchema.validate(req.body)
    .then(validatedData => {
        req.validatedData = validatedData
        next()
    })
    .catch(error => {
        return res.status(400).json({ error: error.message, status: 400 })
    });
}

const signInSchema = Yup.object({
    email: Yup.string()
        .required('Email is is necessary')
        .email("Email is incorrect")
        .min(10, "Email is too short, at least 10 symbols")
        .max(50, 'Email is too long, the limit is 50'),
    password: Yup.string()
        .required('Password is necessary')
        .min(8, "Password is too short, at least 8 symbols")
        .max(40, 'Password is too long, the limit is 40')
})

function signInValidation(req, res, next) {
    signInSchema.validate(req.body)
    .then(validatedData => {
        req.validatedData = validatedData
        next()
    })
    .catch(error => {
        return res.status(400).json({ error: error.message, status: 400 })
    });
}

module.exports = { signUpValidation, signInValidation }