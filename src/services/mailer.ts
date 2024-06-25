import { google, Auth } from 'googleapis';

const OAuth2 = google.auth.OAuth2;

const clientId = '579282624825-j7bv2hf3q9pgilajkepbaqqrgcs5rb6u.apps.googleusercontent.com';
const clientSecret = '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';
const redirectUrl = 'https://nyongiot-2ab9d.firebaseapp.com/__/auth/handler';

// Initialize OAuth2 client
const authClient = new OAuth2(clientId, clientSecret, redirectUrl);

/**
 * Function to send an email using Gmail API
 * @param content - Content of the email
 * @param to - Recipient email address
 * @param from - Sender email address
 * @param subject - Email subject
 * @param cb - Callback function to handle response
 */
export const sendMail = (content: string, to: any, from: any, subject: any, cb: any) => {

    authClient.setCredentials({
        "access_token": "ya29.a0AXooCgusk436jQCM1toGb8Ysm00muh2C0S7FNGHBPQeeH-9J74XaTduDK7PfIbu-I0dndRwlws2-ROGllgR1lmLTV0Ju2rNYvLZ1DszYfPScTsS14OcdpeM1tUhFYWhqu7vWd9_HG6b-d2AGrc-hVZFqwNwKIubRe2liaCgYKAf8SARASFQHGX2Mi7w2eS5_5rTAJSWRoHKSYLQ0171",
        "refresh_token": "1//09HEtbL4826bgCgYIARAAGAkSNwF-L9IrKN8OWIUM9kp2TooOONJoKqDA8ci5xxiLfr53XtZVGPE27DI5q2dQs7jkQALvgRImH9w",
        "scope": "https://www.googleapis.com/auth/gmail.send",
        "token_type": "Bearer"
    });

    if (isAccessTokenExpired(authClient)) {
        refreshAccessToken(authClient)
            .then(() => {
                sendEmail(authClient, content, to, from, subject, cb);
            })
            .catch(err => {
                console.error('Error refreshing access token:', err);
                cb(err);
            });
    } else {
        sendEmail(authClient, content, to, from, subject, cb);
    }
}

/**
 * Helper function to check if the access token has expired
 * @param authClient - OAuth2 client instance
 * @returns true if access token is expired, false otherwise
 */
const isAccessTokenExpired = (authClient: Auth.OAuth2Client): boolean => {
    const expiryDate = authClient.credentials.expiry_date;
    if (!expiryDate) {
        return true; // No expiry date means token is considered expired
    }
    return Date.now() >= expiryDate;
}

/**
 * Helper function to refresh the access token
 * @param authClient - OAuth2 client instance
 * @returns Promise<void>
 */
const refreshAccessToken = (authClient: Auth.OAuth2Client): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
        authClient.refreshAccessToken((err, tokens) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

/**
 * Helper function to send email using Gmail API
 * @param authClient - OAuth2 client instance
 * @param content - Content of the email
 * @param to - Recipient email address
 * @param from - Sender email address
 * @param subject - Email subject
 * @param cb - Callback function to handle response
 */
const sendEmail = (authClient: Auth.OAuth2Client, content: string, to: any, from: any, subject: any, cb: any) => {
    let emailLines = [
        `Content-Type: text/plain; charset="UTF-8"`,
        `MIME-Version: 1.0`,
        `Content-Transfer-Encoding: 7bit`,
        `to: ${to}`,
        `from: ${from}`,
        `subject: ${subject}`,
        '',
        `${content}`
    ];

    let email = emailLines.join('\n');
    let encodedMail = Buffer.from(email).toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');

    const gmail = google.gmail({ version: 'v1', auth: authClient });

    gmail.users.messages.send({
        userId: 'me',
        requestBody: {
            raw: encodedMail
        }
    }, cb);
}
