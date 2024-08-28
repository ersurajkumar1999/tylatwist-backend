import slugify from 'slugify';
import mongoose from 'mongoose';
import connectDB from '../utils/db.js';
import { hashedPassword } from '../helper/PasswordManager.js';
import { createProfile } from '../services/profileServices.js';

import { findUserByEmail, createUser, generateAccountNumber } from '../services/userServices.js';
 
export const seedAdmin = async () => {
    console.log('Seeder started.');
    await connectDB();

    const adminPass = "password";
    const password = await hashedPassword(adminPass);
    const adminData = {
        firstName: 'Super',
        lastName: 'Admin',
        email: 'admin123@gmail.com',
        username: 'admin123',
        password: password,
        userType: 'ADMIN',
        isEmailVerified: new Date()
    };

    try {
        // Check if admin user already exists
        const existingAdmin = await findUserByEmail(adminData.email);
        if (existingAdmin) {
            console.log('Admin user already exists. Skipping seeder.');
        } else {
            const accountNumber = await generateAccountNumber();

            const safeString = (str) => str ? str.toString() : '';

            // Create the slug with safe string handling
            const slug = slugify(`${safeString(adminData.firstName)}-${safeString(adminData.lastName)}-${safeString(accountNumber)}`, {
                lower: true,
                strict: true
            });

            const profile = await createProfile({
                firstName: adminData.firstName,
                lastName: adminData.lastName,
                slug
            });

            const user = await createUser({
                username: adminData.username,
                email: adminData.email,
                password: adminData.password,
                accountNumber,
                userType: adminData.userType,
                profile: profile._id,
                isEmailVerified: adminData.isEmailVerified
            });
            console.log('Admin user created successfully.', user);
        }
    } catch (error) {
        console.error('Error seeding admin user:', error);
    } finally {
        mongoose.connection.close();
    }
};
