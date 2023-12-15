// livresModel.js
const nano = require('nano')('http://Lyra:lek47269@127.0.0.1:5984');
const dblivres = nano.db.use('bibliotheque');

async function findlivres(query) {
    try {
        return await dblivres.find(query);
    } catch (error) {
        throw new Error(`Erreur lors de la recherche des livres : ${error.message}`);
    }
}

async function findlivresByQuery(titre, auteur) {
    try {
        let query = {
            selector: {},
            limit: 100
        };

        if (titre) {
            query.selector["titre"] = { "$regex": titre };
        }

        if (auteur) {
            query.selector["auteur"] = { "$regex": auteur };
        }

        const result = await findlivres(query);
        return result.docs;
    } catch (error) {
        throw new Error(`Erreur lors de la recherche des livres par titre/auteur : ${error.message}`);
    }
}

async function insertlivre(livre) {
    try {
        return await dblivres.insert(livre);
    } catch (error) {
        throw new Error(`Erreur lors de l'insertion du livre : ${error.message}`);
    }
}

async function findlivreByIdQuery(idQuery) {
    try {
        let query = {
            selector: {
                _id: idQuery
            },
            limit: 1
        };

        const result = await findlivres(query);
        return result.docs.length > 0 ? result.docs[0] : null;
    } catch (error) {
        throw new Error(`Erreur lors de la recherche du livre par ID : ${error.message}`);
    }
}

async function deletelivre(idQuery) {
    try {
        const livre = await findlivreByIdQuery(idQuery);
        if (!livre) {
            throw new Error("Livre non trouvé");
        }
        return await dblivres.destroy(livre._id, livre._rev);
    } catch (error) {
        throw new Error(`Erreur lors de la suppression du livre : ${error.message}`);
    }
}

async function updatelivre(idQuery, livreUpdates) {
    try {
        const livre = await findlivreByIdQuery(idQuery);
        if (!livre) {
            throw new Error("Livre non trouvé");
        }
        Object.assign(livre, livreUpdates);
        return await dblivres.insert(livre);
    } catch (error) {
        throw new Error(`Erreur lors de la mise à jour du livre : ${error.message}`);
    }
}

module.exports = {
    findlivres,
    findlivresByQuery,
    insertlivre,
    findlivreByIdQuery,
    deletelivre,
    updatelivre
};
