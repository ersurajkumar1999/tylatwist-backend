import validator from 'validator';
import jwt from 'jsonwebtoken';
import useragent from 'useragent';
import { verify } from '../config/verify-token.js';
import { hashedPassword, comparePassword } from '../helper/PasswordManager.js';
import { errorResponseMessage, successResponseMessage } from '../helper/responseMessage.js';
import { validatePassword, validateEmail, validateFirstName, validateLastName } from '../validations/index.js';
import { findUserByEmail, findUserByUserName, generateAccountNumber, createUser } from '../services/userServices.js';
import { generateSlug } from '../helper/generalHelper.js';
import { createProfile } from '../services/profileServices.js';

export const doLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check email validation
        const isEmailValid = await validateEmail(res, email);
        if (isEmailValid !== true) return;

        // Check password validation
        const isPasswordValid = await validatePassword(res, password);
        if (isPasswordValid !== true) return;

        const checkUserExists = await findUserByEmail(email);
        if (!checkUserExists) {
            return errorResponseMessage(res, "User is not registered, Please signup first!", 401);
        }

        const checkPassword = await comparePassword(password, checkUserExists.password);
        if (!checkPassword) {
            return errorResponseMessage(res, "Incorrect Password", 401);
        }

        const token = jwt.sign(
            {
                email: checkUserExists.email,
                id: checkUserExists._id,
                userType: checkUserExists.userType
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );

        checkUserExists.token = "Bearer " + token;

        const tokenExpiry = new Date();
        tokenExpiry.setDate(tokenExpiry.getDate() + 7); // Set expiry date to 7 days from now

        const agent = useragent.parse(req.headers['user-agent']);

        return successResponseMessage(res, "Login successfully!", checkUserExists);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
};

export const doSignUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check validations
        const isFirstNameValid = await validateFirstName(res, firstName);
        const isLastNameValid = await validateLastName(res, lastName);
        const isEmailValid = await validateEmail(res, email);
        const isPasswordValid = await validatePassword(res, password);

        if (isPasswordValid !== true || isEmailValid !== true || isLastNameValid !== true || isFirstNameValid !== true) return;

        const checkUserExistsByEmail = await findUserByEmail(email);
        if (checkUserExistsByEmail) {
            return errorResponseMessage(res, "User email already exists");
        }

        let parts = email.split('@');
        let username = parts[0];

        const checkUserExistBYUserName = await findUserByUserName(username);
        if (checkUserExistBYUserName) {
            return errorResponseMessage(res, "User UserName already exists");
        }

        const pass = await hashedPassword(password);
        const accountNumber = await generateAccountNumber();
        const slug = generateSlug(firstName, lastName, accountNumber);
        const profile = await createProfile({ firstName, lastName, slug });

        const user = await createUser({
            username,
            email,
            password: pass,
            accountNumber,
            profile: profile._id,
        });

        return successResponseMessage(res, "User created successfully!", user);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
};

export const doLogout = async (req, res) => {
    try {
        const userId = req.user.id;
        const jwtToken = verify(req);
        return successResponseMessage(res, "Logout successfully!");
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (validator.isEmpty(email)) {
            return errorResponseMessage(res, "Email field is required");
        } else if (!validator.isEmail(email)) {
            return errorResponseMessage(res, "Invalid email address");
        }

        const checkUserExists = await findUserByEmail(email);
        if (!checkUserExists) {
            return errorResponseMessage(res, "User is not registered, Please signup first!", 401);
        }

        if (!checkUserExists.isEmailVerified) {
            return errorResponseMessage(res, "Email is not verified!", 401);
        }

        const emailSend = await sendMail();
        return successResponseMessage(res, "Email sent", emailSend);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
};

export const emailVerification = async (req, res) => {
    try {
        const { email } = req.body;

        if (validator.isEmpty(email)) {
            return errorResponseMessage(res, req.translate('validation.email_required'));
        } else if (!validator.isEmail(email)) {
            return errorResponseMessage(res, req.translate('validation.invalid_email'));
        }

        const checkUserExists = await findUserByEmail(email);
        if (!checkUserExists) {
            return errorResponseMessage(res, "Email is not registered!", 401);
        }

        const otp = await generateOTP();
        const html = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ccc; border-radius: 10px;">
                <div style="text-align: center; padding: 10px 0;">
                    <img src="https://cdn.pixabay.com/photo/2017/03/16/21/18/logo-2150297_640.png" alt="Company Logo" style="width: 150px;"/>
                </div>
                <h2 style="text-align: center; color: #333;">${req.translate('verification.email_subject')}</h2>
                <p style="font-size: 16px; color: #333;">
                    ${req.translate('greetings.hello')} <strong>${checkUserExists.username}</strong>,
                </p>
                <p style="font-size: 16px; color: #333;">
                    ${req.translate('verification.otp_message')}
                </p>
                <div style="text-align: center; margin: 20px 0;">
                    <h3 style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; border-radius: 5px;">${otp}</h3>
                </div>
                <p style="font-size: 16px; color: #333;">
                    ${req.translate('verification.follow_up_message')}
                </p>
                <p style="font-size: 16px; color: #333;">
                    ${req.translate('verification.regards')},<br/>
                    <strong>${req.translate('verification.company_name')}</strong>
                </p>
                <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;"/>
                <p style="font-size: 12px; color: #777; text-align: center;">
                    ${req.translate('verification.disclaimer')}
                </p>
            </div>
        `;

        const data = {
            subject: `${req.translate('verification.email_subject')}`,
            email: "spandev23@gmail.com",
            body: html
        };

        const emailSend = await sendMail(data);
        return successResponseMessage(res, "Email sent", emailSend);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
};

export const createDummyUsers = async (req, res) => {
    try {
        const numUsers = 100;
        const users = [];
        for (let i = 0; i < numUsers; i++) {
            const user = await createDummyUser();
            users.push(user);
        }

        return successResponseMessage(res, "Dummy users created successfully!", users);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
};
