const authenticationRepository = require('./authentication-repository');
const { generateToken } = require('../../../utils/session-token');
const { passwordMatched } = require('../../../utils/password');

// Define constant for limit failed login
const limitLoginFailed = 5;
// Define constant banned (30 minutes)
const banned = 30 * 60 * 1000;
// Object to store failed login
const loginFailed = {};

// Function to check if user is banned due to too many failed login attempts
function userBanned(email, password) {
  return (
    loginFailed[(email, password)] &&
    loginFailed[(email, password)].attempts >= limitLoginFailed
  );
}

/**
 * Check username and password for login.
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {object} An object containing, among others, the JWT token if the email and password are matched. Otherwise returns null.
 */
async function checkLoginCredentials(email, password) {
  // Check if email is banned due to too many failed login attempts
  if (userBanned(email, password)) {
    const lastLoginAttempts = loginFailed[(email, password)].timestamp;
    // Check if user unbanned
    if (Date.now() - lastLoginAttempts < banned) {
      // Return null to indicate too many failed attempts
      return null;
    } else {
      // Reset failed login attempts if already unbanned
      delete loginFailed[(email, password)];
    }
  }

  const user = await authenticationRepository.getUserByEmail(email);

  // We define default user password here as '<RANDOM_PASSWORD_FILTER>'
  // to handle the case when the user login is invalid. We still want to
  // check the password anyway, so that it prevents the attacker in
  // guessing login credentials by looking at the processing time.
  const userPassword = user ? user.password : '<RANDOM_PASSWORD_FILLER>';
  const passwordChecked = await passwordMatched(password, userPassword);

  // Because we always check the password (see above comment), we define the
  // login attempt as successful when the `user` is found (by email) and
  // the password matches.
  if (user && passwordChecked) {
    delete loginFailed[(email, password)];

    return {
      email: user.email,
      name: user.name,
      user_id: user.id,
      token: generateToken(user.email, user.id),
    };
  } else {
    // Update failed login attempts and timestamp
    if (!loginFailed[(email, password)]) {
      loginFailed[(email, password)] = {
        attempts: 1,
        timestamp: Date.now(),
      };
    } else {
      loginFailed[(email, password)].attempts++;
      loginFailed[(email, password)].timestamp = Date.now();
    }

    // Check if user should be banned
    if (loginFailed[(email, password)].attempts >= limitLoginFailed) {
      loginFailed[(email, password)].timestamp = Date.now(); // Update timestamp for ban
    }
  }
  return null;
}

module.exports = {
  userBanned,
  checkLoginCredentials,
};
