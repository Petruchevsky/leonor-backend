const path = require('path');

module.exports = ({ env }) => {
  return {
    connection: {
      client: 'postgres',
      connection: {
        connectionString: env('DATABASE_URL'),
        ssl: env.bool('DATABASE_SSL', true) ? {
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
          ca: env('DATABASE_SSL_CA', undefined), // Opcional, solo si tienes un certificado CA personalizado
        } : false,
      },
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
      debug: true, // Cambiar a true si necesitas ver más detalles en los logs
    },
  };
};
