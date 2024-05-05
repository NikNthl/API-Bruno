const marketplaceRepository = require('./marketplace-repository');

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
