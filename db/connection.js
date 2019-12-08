const { Pool, Client } = require('pg')
// pools will use environment variables
// for connection information
const getPool = () => {
	return new Pool({
  user: 'root',
  host: '127.0.0.1', //database 127.0.0.1
  database: 'election',
  password: 'docker',
  port: 5432,
  connectionTimeoutMillis: 2000,
})
}

const getPoolLDAP = () => {
	return new Pool({
  user: 'root',
  host: '127.0.0.1', //database 127.0.0.1
  database: 'election-LDAP',
  password: 'docker',
  port: 5433,
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 20000
})
}

module.exports = {getPool, getPoolLDAP};