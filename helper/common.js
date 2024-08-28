const { createProfile } = require("../services/profileServices");
const { findUserByEmail, generateAccountNumber, createUser } = require("../services/userServices");
const { hashedPassword } = require("./PasswordManager");

const generateRandomEmail = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let email = '';

    // Generate a random string for the local part of the email
    for (let i = 0; i < 10; i++) {
        email += chars[Math.floor(Math.random() * chars.length)];
    }

    // List of common email domains
    const domains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'example.com'];

    // Choose a random domain from the list
    const domain = domains[Math.floor(Math.random() * domains.length)];

    // Concatenate the local part and the domain to form the email address
    return email + '@' + domain;
}
const createDummyUser = async () => {
    const email = generateRandomEmail();
    const parts = email.split('@');
    const username = parts[0];
    const checkUserExists = await findUserByEmail(email);
    if (checkUserExists) {
        // If user already exists with this email, return or handle accordingly
        console.log("User email already exists");
        return null;
    }
    const pass = await hashedPassword('password'); // Hash the password
    const profile = await createProfile({ firstName: username, lastName: username }); // Generate a random profile
    const accountNumber = await generateAccountNumber(); // Generate a random account number
    const userInfo = {
        email,
        username,
        password: pass,
        profile: profile._id,
        accountNumber
    }
    const user = await createUser(userInfo); // Create the user
    // console.log("Dummy user created:", user);
    return user;
}
module.exports = { generateRandomEmail, createDummyUser }
