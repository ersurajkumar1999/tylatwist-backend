import { seedAdmin } from './adminSeeder.js';

const runSeeders = async () => {
    await seedAdmin();
};
runSeeders().then(() => {
    console.log('All seeders executed successfully');
}).catch(error => {
    console.error('Error executing seeders:', error);
});
