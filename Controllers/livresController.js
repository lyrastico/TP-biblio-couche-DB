// livresController.js
const Joi = require('joi');
const livresModel = require('../Models/livresModel');

const schema = Joi.object({
    titre: Joi.string().min(3).max(100).required(),
    auteur: Joi.string().min(3).max(100).required(),
    date: Joi.date().required(),
    nombrePages: Joi.number().integer().min(1),
    isbn: Joi.number().integer(),
    resume: Joi.string(),
    numero: Joi.number().integer()
});

async function getlivres(req, res) {
    const { titre, auteur } = req.query;
    try {
        const livres = await livresModel.findlivresByQuery(titre, auteur);
        res.json(livres);
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la récupération des livres");
    }
}

async function addlivre(req, res) {
    const { value, error } = schema.validate(req.body);
    if (error) {
        console.error(error);
        return res.status(400).send(error.details[0].message);
    }

    try {
        const resultatAjout = await livresModel.insertlivre(value);
        res.json({ idlivre: resultatAjout.id });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de l'ajout du livre");
    }
}

async function deletelivre(req, res) {
    const { id } = req.query;
    try {
        await livresModel.deletelivre(id);
        res.json({ message: "Livre supprimé avec succès" });
    } catch (error) {
        console.error(error);
        res.status(404).json({ error: "Livre non trouvé" });
    }
}

async function updatelivre(req, res) {
    const { id } = req.query;
    const { value, error } = schema.validate(req.body);

    if (error) {
        console.error(error);
        return res.status(400).send(error.details[0].message);
    }

    try {
        await livresModel.updatelivre(id, value);
        res.json({ message: "Livre mis à jour avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Erreur lors de la mise à jour du livre");
    }
}

module.exports = {
    getlivres,
    addlivre,
    deletelivre,
    updatelivre
};
