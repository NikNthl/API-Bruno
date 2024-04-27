const usersRepository = require('./users-repository');
const { hashPassword, passwordMatched } = require('../../../utils/password');

/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers(pageNumber, pageSize, search, sort) {
  // Set default values if not provided or invalid
  pageNumber = parseInt(pageNumber) || 1;
  pageSize = parseInt(pageSize) || 0; // Default to 0 to indicate all data in one page

  // Validate page number and page size
  if (isNaN(pageNumber) || isNaN(pageSize) || pageNumber <= 0 || pageSize < 0) {
    throw new Error('Invalid page_number or page_size');
  }

  let filter = {};
  let sortField = 'email';
  let sortOrder = 1; // Default sort order is ascending

  // Parse and validate sort parameter
  if (sort) {
    const parts = sort.split(':');
    if (parts.length === 2) {
      sortField = parts[0];
      sortOrder = parts[1].toLowerCase() === 'desc' ? -1 : 1;
    } else {
      throw new Error('Invalid sort parameter format');
    }
  }

  // Parse and validate search parameter
  if (search) {
    const parts = search.split(':');
    if (parts.length === 2 && (parts[0] === 'email' || parts[0] === 'name')) {
      filter[parts[0]] = { $regex: new RegExp(parts[1], 'i') };
    } else {
      throw new Error('Invalid search parameter format');
    }
  }

  const { users, totalCount } = await usersRepository.getUsers(
    pageNumber,
    pageSize,
    filter,
    sortField,
    sortOrder
  );

  const results = [];
  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    results.push({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  const totalPages = Math.ceil(totalCount / pageSize);
  const hasPreviousPage = pageNumber > 1;
  const hasNextPage = pageNumber < totalPages;

  return {
    totalCount,
    totalPages,
    hasPreviousPage,
    hasNextPage,
    data: results,
  };
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  // Hash password
  const hashedPassword = await hashPassword(password);

  try {
    await usersRepository.createUser(name, email, hashedPassword);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.updateUser(id, name, email);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Delete user
 * @param {string} id - User ID
 * @returns {boolean}
 */
async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  // User not found
  if (!user) {
    return null;
  }

  try {
    await usersRepository.deleteUser(id);
  } catch (err) {
    return null;
  }

  return true;
}

/**
 * Check whether the email is registered
 * @param {string} email - Email
 * @returns {boolean}
 */
async function emailIsRegistered(email) {
  const user = await usersRepository.getUserByEmail(email);

  if (user) {
    return true;
  }

  return false;
}

/**
 * Check whether the password is correct
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {boolean}
 */
async function checkPassword(userId, password) {
  const user = await usersRepository.getUser(userId);
  return passwordMatched(password, user.password);
}

/**
 * Change user password
 * @param {string} userId - User ID
 * @param {string} password - Password
 * @returns {boolean}
 */
async function changePassword(userId, password) {
  const user = await usersRepository.getUser(userId);

  // Check if user not found
  if (!user) {
    return null;
  }

  const hashedPassword = await hashPassword(password);

  const changeSuccess = await usersRepository.changePassword(
    userId,
    hashedPassword
  );

  if (!changeSuccess) {
    return null;
  }

  return true;
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  emailIsRegistered,
  checkPassword,
  changePassword,
};
