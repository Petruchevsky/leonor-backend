'use strict';

/**
 * privacy-police service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::privacy-police.privacy-police');
