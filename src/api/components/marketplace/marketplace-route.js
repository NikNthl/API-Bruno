const express = require('express');

const authenticationMiddleware = require('../../middlewares/authentication-middleware');
const celebrate = require('../../../core/celebrate-wrappers');
const marketplaceControllers = require('./marketplace-controller');
const marketplaceValidator = require('./marketplace-validator');

const route = express.Router();

module.exports = (app) => {
  app.use('/marketplace', route);

  // Get list of items
  route.get(
    '/',
    authenticationMiddleware,
    marketplaceControllers.getMarketplaces
  );

  // Create items
  route.post(
    '/',
    celebrate(marketplaceValidator.createMarketplace),
    marketplaceControllers.createMarketplace
  );

  // Get item details
  route.get(
    '/:id',
    authenticationMiddleware,
    marketplaceControllers.getMarketplace
  );

  // Change items
  route.put(
    '/:id',
    celebrate(marketplaceValidator.updateMarketplace),
    marketplaceControllers.updateMarketplace
  );

  // Delete items
  route.delete(
    '/:id',
    authenticationMiddleware,
    marketplaceControllers.deleteMarketplace
  );
};
