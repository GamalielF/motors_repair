const Repair = require("../models/repair.model");

exports.createRepair = async (req, res) => {
  try {
    const { date, status = "pending", userId } = req.body;

    const repair = await Repair.create({
      date,
      status,
      userId,
    });

    return res.status(201).json({
      message: "Repair Created",
      repair,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went very wrong",
    });
  }
};

exports.findRepairs = async (req, res) => {
  const time = req.requestTime;

  const repairs = await Repair.findAll({
    where: {
      status: "pending",
    },
  });

  return res.json({
    requestTime: time,
    results: repairs.length,
    status: "success",
    message: "Repairs Found",
    repairs,
  });
};

exports.findRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({
      where: {
        id,
        status: "pending",
      },
    });
    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `Repair with id: ${id} not found!`,
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Repair found",
      repair,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: "Something went very wrong!",
    });
  }
};

exports.updateRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({
      where: {
        id,
        status: "pending",
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `Repair with id: ${id} not found`,
      });
    }

    await repair.update({ status: "completed" });

    res.status(200).json({
      status: "success",
      message: "The repair has been updated to completed",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};

exports.deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;

    const repair = await Repair.findOne({
      where: {
        id,
        status: "pending",
      },
    });

    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: `Repair with id: ${id} not found`,
      });
    }

    await repair.update({ status: "cancelled" });

    res.status(200).json({
      status: "success",
      message: "The repair has been cancelled",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong",
    });
  }
};
