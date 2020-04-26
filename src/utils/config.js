const result = require('dotenv').config();
if (result.error) {
    throw result.error
}
const { parsed: envs } = result;
module.exports = envs;