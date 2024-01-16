const catchError = require('../utils/catchError');
const User = require('../models/User');

const getAll = catchError(async(req, res) => {
    // Operaciones...
    const user = await User.findAll()
    return res.json(user)
});

//Create
const create = catchError(async(req, res) => {
    const {email, password, first_name, last_name, birthday} = req.body;
    const user = await User.create({
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        birthday: birthday
    });
    return res.status(201).json(user);
});

//Get One

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    return res.json(user);
});

//Delate 

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await User.destroy({ where: { id: id } });
    return res.sendStatus(204);
});

//Update

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const { email, password, first_name, last_name, birthday } = req.body;

    const [updatedRowsCount, updatedUsers] = await User.update(
        {
            email: email,
            password: password,
            first_name: first_name,
            last_name: last_name,
            birthday: birthday
        },
        { where: { id: id }, returning: true }
    );

    if (updatedRowsCount === 0) {
        // No se actualizó ningún usuario, puede ser útil enviar un código de estado diferente
        return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Solo enviamos los datos actualizados del usuario, no toda la información sobre la actualización
    return res.json(updatedUsers[0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
};
