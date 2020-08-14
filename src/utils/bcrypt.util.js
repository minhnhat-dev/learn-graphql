const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

const comparePassword = (pw, hash) => (
  bcrypt.compareSync(pw, hash)
);

module.exports = {
  hashPassword,
  comparePassword,
};
