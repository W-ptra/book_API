const { randomBytes } = require("node:crypto");

const key = randomBytes(32).toString("base64");
console.log(key);