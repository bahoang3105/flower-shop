// @ts-nocheck
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const readline = require('readline');
const async = require('async');
const path = require('path');
const { google } = require('googleapis');
const log4js = require('log4js');
const logger = new log4js.getLogger();
logger.level = 'debug';

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
// make generator-localization-gc
const TOKEN_PATH = path.resolve(__dirname, 'token.json');
const CREDENTIALS_PATH = path.resolve(__dirname, 'credentials.json');
let OUTPUT_LANG_INDEX;
let SPREADSHEET_ID;
let GID_ID;
let OUTPUT_FOLDER;

process.argv.forEach((val, index, array) => {
  const value = val.split('=');
  if (value[0] === 'OUTPUT_LANG_INDEX') {
    OUTPUT_LANG_INDEX = value[1];
  }
  if (value[0] === 'SPREADSHEET_ID') {
    SPREADSHEET_ID = value[1];
  }
  if (value[0] === 'GID_ID') {
    GID_ID = value[1];
  }
  if (value[0] === 'OUTPUT_FOLDER') {
    OUTPUT_FOLDER = value[1];
  }
});

// Load client secrets from a local file.
fs.readFile(CREDENTIALS_PATH, (err, content) => {
  if (err) return logger.error(`Error loading client secret file: ${err}`);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listMajors);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  logger.info(`Authorize this app by visiting this url: ${authUrl}`);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return logger.error(`Error while trying to retrieve access token: ${err}`);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return logger.error(err);
        logger.info(`Token stored to: ${TOKEN_PATH}`);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listMajors(auth) {
  if (!OUTPUT_LANG_INDEX || !SPREADSHEET_ID || !OUTPUT_FOLDER) {
    logger.error('=======================================================');
    logger.error('Input parameter is not enough!');
    logger.error('=======================================================');

    return;
  }

  let rangeSheet = 'A2:H';
  if (GID_ID) {
    rangeSheet = `${GID_ID}!A2:H`;
  }

  const sheets = google.sheets({ version: 'v4', auth });

  async.waterfall(
    [
      (next) => {
        sheets.spreadsheets.values.get(
          {
            spreadsheetId: SPREADSHEET_ID,
            range: rangeSheet,
          },
          (err, res) => {
            if (err) return logger.error(`The API returned an error: ${err}`);
            const rows = res.data.values;
            let obj = {};
            if (rows.length) {
              let groupBefore = rows[0][0];
              let subGroupBefore = rows[0][1];
              rows.map((row, index) => {
                if (row[0]) {
                  groupBefore = row[0];
                }

                if (row[1]) {
                  subGroupBefore = row[1];
                }

                let groupKey = groupBefore;
                let subGroupKey = subGroupBefore;

                let groups = obj[groupKey];
                if (!groups) {
                  groups = {};
                }

                let key = `${row[2]}`;
                let value = `${row[OUTPUT_LANG_INDEX]}`;
                if (subGroupKey === 'EMPTY') {
                  groups[key] = value;
                } else {
                  let subGroups = groups[subGroupKey];
                  if (!subGroups) {
                    subGroups = {};
                  }
                  subGroups[key] = value;
                  groups[subGroupKey] = subGroups;
                }

                obj[groupKey] = groups;
              });

              return next(null, JSON.stringify(obj, null, 2));
            } else {
              logger.info('No data found.');
            }
          }
        );
      },
      (res, next) => {
        fs.writeFile(OUTPUT_FOLDER, res, next);
      },
    ],
    (err, res) => {
      if (err) {
        logger.error(err);
      }
      logger.info('Generate localization file successful.');
    }
  );
}
