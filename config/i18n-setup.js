import i18n from 'i18n';
import { fileURLToPath } from 'url';
import path from 'path';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure i18n
i18n.configure({
    locales: ['en', 'hi'], // List all supported languages
    directory: path.join(__dirname, '../locales'), // Directory where translation files are stored
    defaultLocale: 'en',
    objectNotation: true, // Allows for nested translation keys
    updateFiles: false, // Prevents overwriting locale files
    syncFiles: false,
    autoReload: true, // Automatically reload translation files when changed
    api: {
        __: 'translate', // Now req.__ becomes req.translate
        __n: 'translateN' // Now req.__n becomes req.translateN
    }
});

export default i18n;
