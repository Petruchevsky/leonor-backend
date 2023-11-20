'use strict';

/**
 * homeopathy service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::homeopathy.homeopathy');
