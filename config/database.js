const path = require('path');

module.exports = ({ env }) => {
  const useSSL = env.bool('DATABASE_SSL', false);

  const sslConfig = useSSL ? {
    rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', false),
    ca: env('DATABASE_SSL_CA', undefined), // Opcional, para certificado CA personalizado
  } : false;

  const connection = env('DATABASE_URL')
    ? {
        connectionString: env('DATABASE_URL'),
        ssl: sslConfig,
      }
    : {
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'postgres'),
        password: env('DATABASE_PASSWORD'),
        ssl: sslConfig,
      };

  return {
    connection: {
      client: 'postgres',
      connection,
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
      debug: env.bool('DEBUG', false),
    },
  };
};
