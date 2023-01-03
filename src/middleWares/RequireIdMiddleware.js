module.exports = (req, res, next) => {
    if (!req.params.id || !/^[0-9]+$/.test(req.params.id)) {
        res.status(400);
        res.send({
            errors: {
                id: 'Es requerido o no es un numero',
            },
        });
    } else {
        next();
    }
}
