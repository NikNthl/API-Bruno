const { Marketplace } = require('../../../models');

/**
 * Get list of marketplace items
 * @returns {Promise}
 */
async function getMarketplaces() {
  return Marketplace.find({});
}

/**
 * Get marketplace items detail
 * @param {string} id - item ID
 * @returns {Promise}
 */
async function getMarketplace(id) {
  return Marketplace.findById(id);
}

/**
 * Create marketplace items
 * @param {string} nama_barang - item name
 * @param {number} harga_barang - item price
 * @param {number} stok_barang - item stock
 * @returns {Promise}
 */
async function createMarketplace(nama_barang, harga_barang, stok_barang) {
  return Marketplace.create({
    nama_barang,
    harga_barang,
    stok_barang,
  });
}

/**
 * Change marketplace items
 * @param {id} id - item ID
 * @param {string} nama_barang - item name
 * @param {number} harga_barang - item price
 * @param {number} stok_barang - item stock
 * @returns {Promise}
 */
async function updateMarketplace(id, nama_barang, harga_barang, stok_barang) {
  return Marketplace.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        nama_barang,
        harga_barang,
        stok_barang,
      },
    }
  );
}

/**
 * Delete marketplace items
 * @param {string} id - item ID
 * @returns {Promise}
 */
async function deleteMarketplace(id) {
  return Marketplace.deleteOne({ _id: id });
}

module.exports = {
  getMarketplaces,
  getMarketplace,
  createMarketplace,
  updateMarketplace,
  deleteMarketplace,
};
