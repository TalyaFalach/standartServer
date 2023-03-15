const Sales = require("./../models/salesModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllSales = async (req, res) => {
  try {
    const sales = await Sales.find({});
    res.status(200).json({
      status: "success",
      data: {
        sales: sales,
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.getById = catchAsync(async (req, res, next) => {
  const sale = await Sales.findById(req.params.id);

  if (!sale) {
    return next(new AppError("This sale is not exist", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      sale: sale,
    },
  });
});

exports.createSale = async (req, res) => {
  try {
    const newSale = Sales.create(req.body);
    res.status(200).json({
      status: "success",
      message: "created",
    });
  } catch (err) {
    res.status(200).json({
      status: "failed",
      message: err,
    });
  }
};

exports.updateSale = async (req, res) => {
  try {
    const updateSale =await Sales.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      data: 'updated',
    });
  } catch (err) {
    res.status(200).json({
      status: "failed",
      message: err,
    });
  }
};

exports.deleteSale = catchAsync(async (req, res, next) => {
  const sale = await Sales.findByIdAndDelete(req.params.id);
  if (!sale) {
    return next(new AppError("this sale post do not exist", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      message: "deleted",
    },
  });
});
