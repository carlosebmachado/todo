const MacaddressValidation = async (req, res, next) => {
    if (!req.body.macaddress)
        return res.status(400).json({error: 'missing macaddress'});
    else
        next();
};

module.exports = MacaddressValidation;
