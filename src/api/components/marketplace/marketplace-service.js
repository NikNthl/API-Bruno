const marketplaceRepository = require('./marketplace-repository');

/**
 * Get list of marketplace items
 * @returns {Array}
 */
async function getMarketplaces() {
  const marketplaces = await marketplaceRepository.getMarketplaces();

  const results = [];
  for (let i = 0; i < marketplaces.length; i += 1) {
    const marketplace = marketplaces[i];
    results.push({
      id: marketplace.id,
      nama_barang: marketplace.nama_barang,
      harga_barang: marketplace.harga_barang,
      stok_barang: marketplace.stok_barang,
    });
  }

  return results;
}

/**
 * Get marketplace items detail
 * @param {string} id - item ID
 * @returns {Object}
 */
async function getMarketplace(id) {
  const marketplace = await marketplaceRepository.getMarketplace(id);

  if (!marketplace) {
    return null;
  }

  return {
    id: marketplace.id,
    nama_barang: marketplace.nama_barang,
    harga_barang: marketplace.harga_barang,
    stok_barang: marketplace.stok_barang,
  };
}

/**
 * Create marketplace items
 * @param {string} nama_barang - Nama Barang
 * @param {number} harga_barang - Harga Barang
 * @param {number} stok_barang - Stok Barang
 * @returns {boolean}
 */
async function createMarketplace(nama_barang, harga_barang, stok_barang) {
  try {
    await marketplaceRepository.createMarketplace(
      nama_barang,
      harga_barang,
      stok_barang
    );
  } catch (error) {
    return null;
  }

  return true;
}

/**
 * Change marketplace items
 * @param {id} id - item ID
 * @param {string} nama_barang - item name
 * @param {number} harga_barang - item price
 * @param {number} stok_barang - item stock
 * @returns {boolean}
 */
async function updateMarketplace(id, nama_barang, harga_barang, stok_barang) {
  const marketplace = await marketplaceRepository.getMarketplace(id);

  if (!marketplace) {
    return null;
  }

  try {
    await marketplaceRepository.updateMarketplace(
      id,
      nama_barang,
      harga_barang,
      stok_barang
    );
  } catch (error) {
    return null;
  }

  return true;
}

/**
 * Delete marketplace items
 * @param {id} id - item ID
 * @returns {boolean}
 */
async function deleteMarketplace(id) {
  const marketplace = await marketplaceRepository.getMarketplace(id);

  if (!marketplace) {
    return null;
  }

  try {
    await marketplaceRepository.deleteMarketplace(id);
  } catch (error) {
    return null;
  }

  return true;
}

module.exports = {
  getMarketplaces,
  getMarketplace,
  createMarketplace,
  updateMarketplace,
  deleteMarketplace,
};
