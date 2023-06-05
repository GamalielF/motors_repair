const User = require('../models/user.model');

exports.createUser = async (req, res) => {
  try {
    // Paso 1: obtener la información del req body
    const { name, email, password, role, status } = req.body;

    // Paso 2: crear el usuario utilizando el modelo
    const user = await User.create({
      name,
      email,
      password,
      role,
      status,
    });
    // Paso 3: enviar respuesta al cliente
    return res.status(201).json({
      message: 'User Created',
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'something went very wrong',
    });
  }
};

exports.findUsers = async (req, res) => {
  const time = req.requestTime;

  const users = await User.findAll({
    where: {
      status: 'available',
    },
  });

  return res.json({
    requestTime: time,
    results: users.length,
    status: 'success',
    message: 'Users Found',
    users,
  });
};

exports.findUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });
    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `User with id: ${id} not found!`,
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'User found',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `User with id: ${id} not found`,
      });
    }

    await user.update({ name, email });

    res.status(200).json({
      status: 'success',
      message: 'The user has been updated',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
        status: 'available',
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: `User with id: ${id} not found`,
      });
    }

    await user.update({ status: 'unavailable' });

    res.status(200).json({
      status: 'success',
      message: 'The user has been deleted',
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went wrong',
    });
  }
};
