const { Marketplace } = require('../../../models');

async function getMarketplaces() {
  return Marketplace.find({});
}

async function getMarketplace(id) {
  return Marketplace.findById(id);
}

async function createMarketplace(nama_barang, harga_barang, stok_barang) {
  return Marketplace.create({
    nama_barang,
    harga_barang,
    stok_barang,
  });
}

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
