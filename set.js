const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUlDQ2ZPTG9pZ3ZkaXZmQzNjQjlXM0RlNkU5bWpJZjRTUDFvUWtieGlXND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQTRpa3F1RXJvVDRqZFFlaE80K3E4cC9YY0Y3eE5TZHFXb1ZrZnhueElHRT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ1SThBd2N1SVdSZis4c1JrMjJSUzMyUFJiZVFlY0lwUmlsQWt5YW9Wc2tzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLVm9JT3lBdlNJU1NZNWV2OUMrU0c4TTlEMnhaU2VRWStSeEpJb0tKV2hFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldPbk9CUDg1Ym1nYmQ1QXVqdVBZVWRSbGl5VEdvUGRBOHVlSmtFd2ZWMGc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJabHVSbGV1TEFCdCtjRUxIbTkvSExJU1JPcURPSXB6MThaOTJSQnlLaWM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTU14SlFZY3U1UzRGQ3BlWTJxbmErWTUzNzY0ZGJ1djRlUldpZlYrT1ZWND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicU9oaVBENjRwNk1TNEFFblhBZGZqSkNJZjNMQTJNb1h0VFVZZk9qMmpsST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkRENkJORHlDR2xwRkJpNWdYdHFVUGNOTzZOZXJRUmNOUVRqQTJkdVFweDkxTk1nT2hRMDk5ZUFBT1JTaG1pRGFpb3paVTNnSFRJNm5pYnFiQ2hjT2pBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODIsImFkdlNlY3JldEtleSI6Ikswa1A1eU82TzJSaS9qVjdrRFR6MVVLT3NvTDZGSXlXYndIRFQxYUxUL009IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjVlMEkyS1A3UTRxZ0M5bGFuVEdPd0EiLCJwaG9uZUlkIjoiNWYwY2QyZDItZWJmZi00MWRlLTkyYmMtNjE5YTIzY2JmY2JmIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1VSjNBOVNvY3ZPNGI4YlVJcTdUR0lNYnZQMD0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtOU9nZmJ0VkFGajRISWs3QjAzSzFBaWhqTlk9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiWlYyRVBTOUoiLCJtZSI6eyJpZCI6IjkxNzA4NTM0NTEwMjoyNkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLbnUFzdHJP250ifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tqeG05Y0RFTHJBeWJ3R0dBVWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImRYTkduL0FDYnRBYm9kY1lvaDArRGdEemtjbkJvei9YVmlraVVoVlFwZ3c9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkhIdGtZdG1FWHB1cXZXL3lXVlJDdU5VdmhvK3VNc240TkFZU21UQXhCeFJGdzkxRzdyblhSNFVidG9ZYjVucCtBa3FLQmliSk5jZHdVT1A5UHVTUkN3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJSOE90Y0ZJZW1TWVhzNmhQb0gwYTlkdHgxY01IayttWjJJQ3dTNWRDb0VnTTJtZnowSXpwUGZ1OWliKzV5NTBHNDRPdkVBTm1JSDF6NzVRWmZkUUZodz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkxNzA4NTM0NTEwMjoyNkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJYVnpScC93QW03UUc2SFhHS0lkUGc0QTg1SEp3YU0vMTFZcElsSVZVS1lNIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzM3NjQ2MTUwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUR4dyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "۝AstrO۝",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " ۝AstrO۝",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "nun",
    AUTO_REACT : process.env.AUTO_REACT || 'nun',
    ANTICALL: process.env.ANTICALL || 'nun',
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '۝AstrO۝',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    AUTOREAD_MESSAGE : process.env.AUTO_READ || "yes",
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    TECH : process.env.AUTO_REACT_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
