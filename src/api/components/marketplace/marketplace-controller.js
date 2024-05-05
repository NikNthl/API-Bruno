const marketplaceService = require('./marketplace-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

/**
 * Handle get list of items marketplace
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getMarketplaces(request, response, next) {
  try {
    const marketplaces = await marketplaceService.getMarketplaces();
    return response.status(200).json(marketplaces);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle marketplace items detail
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function getMarketplace(request, response, next) {
  try {
    const marketplace = await marketplaceService.getMarketplace(
      request.params.id
    );

    if (!marketplace) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Unknown marketplace'
      );
    }

    return response.status(200).json(marketplace);
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle create marketplace items
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function createMarketplace(request, response, next) {
  try {
    const { nama_barang, harga_barang, stok_barang } = request.body;

    const success = await marketplaceService.createMarketplace(
      nama_barang,
      harga_barang,
      stok_barang
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to create item'
      );
    }

    return response
      .status(200)
      .json({ nama_barang, harga_barang, stok_barang });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle change marketplace items
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function updateMarketplace(request, response, next) {
  try {
    const id = request.params.id;
    const { nama_barang, harga_barang, stok_barang } = request.body;

    const success = await marketplaceService.updateMarketplace(
      id,
      nama_barang,
      harga_barang,
      stok_barang
    );

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to update item'
      );
    }

    return response
      .status(200)
      .json({ id, nama_barang, harga_barang, stok_barang });
  } catch (error) {
    return next(error);
  }
}

/**
 * Handle delete marketplace items
 * @param {object} request - Express request object
 * @param {object} response - Express response object
 * @param {object} next - Express route middlewares
 * @returns {object} Response object or pass an error to the next route
 */
async function deleteMarketplace(request, response, next) {
  try {
    const id = request.params.id;

    const success = await marketplaceService.deleteMarketplace(id);

    if (!success) {
      throw errorResponder(
        errorTypes.UNPROCESSABLE_ENTITY,
        'Failed to delete item'
      );
    }

    return response.status(200).json({ id });
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getMarketplaces,
  getMarketplace,
  createMarketplace,
  updateMarketplace,
  deleteMarketplace,
};
