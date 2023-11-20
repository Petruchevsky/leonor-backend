'use strict';

/**
 * tcs service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::tcs.tcs');
