module.exports = async function (err, req, res, next) {
  const code = err.code || 500;
  res.status(code).send({ error: { code, message: err.message } });
};
