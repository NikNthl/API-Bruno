const { User } = require('../../../models');

/**
 * Get a list of users
 * @param {number} pageNumber - Nomor halaman
 * @param {number} pageSize - Jumlah data per halaman
 * @param {string} search - Pencarian
 * @param {string} sort - Pengurutan
 * @returns {Promise}
 */
async function getUsers(pageNumber, pageSize, search, sort) {
  const filter = (pageNumber - 1) * pageSize;

  let query = User.find({});

  // Searching
  if (search) {
    const [field, order] = search.toLowerCase().split(':');
    const regex = new RegExp(order, 'i');
    query = query.find({ [field]: { $regex: regex } });
  }

  // Sorting
  if (sort) {
    const [field, order] = sort.toLowerCase().split(':');
    query = query.sort({ [field]: order === 'asc' ? 1 : -1 });
  } else {
    // default sorting secara ascending
    query = query.sort({ name: 1 });
  }

  const users = await query.skip(filter).limit(pageSize);
  const count = await User.countDocuments();

  return { users, count };
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function getUser(id) {
  return User.findById(id);
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Hashed password
 * @returns {Promise}
 */
async function createUser(name, email, password) {
  return User.create({
    name,
    email,
    password,
  });
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {Promise}
 */
async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

/**
 * Delete a user
 * @param {string} id - User ID
 * @returns {Promise}
 */
async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Get user by email to prevent duplicate email
 * @param {string} email - Email
 * @returns {Promise}
 */
async function getUserByEmail(email) {
  return User.findOne({ email });
}

/**
 * Update user password
 * @param {string} id - User ID
 * @param {string} password - New hashed password
 * @returns {Promise}
 */
async function changePassword(id, password) {
  return User.updateOne({ _id: id }, { $set: { password } });
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserByEmail,
  changePassword,
};
