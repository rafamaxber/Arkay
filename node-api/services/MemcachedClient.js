const Memcached = require('memcached');

function createMemcachedClient() {
  const client = new Memcached('localhost:11211', {
    retries: 10,
    retry: 10000,
    failures: 5,
    remove: true
  });
  return client;
}

module.exports = () => {
  return createMemcachedClient;
}