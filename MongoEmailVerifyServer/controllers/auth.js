// controllers/auth.js
const User = require('../models/user');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

// Function to send activation email
const sendActivationEmail = async (email, token) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.smtpAddress,
            port: process.env.portNumber,
            secure: false,
            auth: {
                user: process.env.senderEmail,
                pass: process.env.password
            }
        });

        // Define the email options
        const mailOptions = {
            from: 'hello@gmail.com',
            to: email,
            subject: 'Account Activation Link',
            html: `
                <p>Please click on the given link to activate your account:</p>
                <a id="activationLink" href="${process.env.clientUrl}#${token}">Activation Link</a>
            `
        };

        await transporter.sendMail(mailOptions);
        console.log('Activation email sent to:', email);
    } catch (err) {
        throw new Error('Error sending activation email');
    }
};

// Function to create a new user
const createUser = async (name, email, password) => {
    const newUser = new User({ name, email, password });
    await newUser.save();
    console.log('User created:', email);
};

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Generate activation token
        const token = jwt.sign({ name, email, password }, process.env.JWT_ACCOUNT_ACTIVATION, { expiresIn: '10m' });

        // Send activation email
        await sendActivationEmail(email, token);

        // Respond with success message
        return res.json({ message: 'Activation email sent. Please check your email inbox.' });
    } catch (err) {
        console.log('Signup error: ', err);
        return res.status(400).json({ error: 'Failed to signup. Please try again later.' });
    }
};

exports.activate = async (req, res) => {
    const { token } = req.body;

    try {
        if (!token) {
            return res.status(400).json({ error: 'Token is required' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_ACCOUNT_ACTIVATION);
        const { name, email, password } = decoded;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User with this email already exists' });
        }

        // Create new user
        await createUser(name, email, password);

        // Respond with success message
        return res.json({ message: 'Signup success! Please signin' });
    } catch (err) {
        console.log('Activation error: ', err);
        return res.status(400).json({ error: 'Failed to activate account. Please try again later.' });
    }
};
