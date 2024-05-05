const joi = require('joi');

module.exports = {
  createMarketplace: {
    body: {
      nama_barang: joi.string().min(1).max(100).required().label('Nama Barang'),
      harga_barang: joi.number().min(1).required().label('Harga Barang'),
      stok_barang: joi.number().min(1).required().label('Stok Barang'),
    },
  },

  updateMarketplace: {
    body: {
      nama_barang: joi.string().min(1).max(100).required().label('Nama Barang'),
      harga_barang: joi.number().min(1).required().label('Harga Barang'),
      stok_barang: joi.number().min(1).required().label('Stok Barang'),
    },
  },
};
