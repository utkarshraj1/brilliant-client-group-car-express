const express = require('express');
const router = express.Router();
const { Sales } = require('../../db-schema/model');
const { search_limit } = require('../../constants/constants');

router
  // Basic route to test the express server
  .get('/', (req, res) => {
    res.json({ message: 'The express application is saying: Hello World' });
  })
  // Gets the sales details object
  .get('/sales/:salesid/:custid', async (req, res) => {
    const { salesid: sales_id, custid: customer_id } = req.params;
    const salesDetails = await Sales.find({ sales_id, customer_id });
    if (salesDetails.length === 0) {
      res.json({
        success: false,
        message: "There's no data matching the Sales ID and Customer ID.",
      });
      return;
    }
    res.json({
      message: 'Data is fetched successfully',
      success: true,
      data: salesDetails,
    });
  })
  // Gets the sales details list, pagination is enabled
  .get('/search/:id', async (req, res) => {
    const { id } = req.params;
    if (isNaN(id)) {
      res.json({
        message: 'Sales Id should be number.',
        success: false,
      });
      return;
    }
    const { offset: skip } = req.query;
    const orCondition = [{ sales_id: id }, { customer_id: id }];
    const [entireSalesDetails, salesDetailsList] = await Promise.all([
      Sales.find({
        $or: [...orCondition],
      }),
      Sales.find({
        $or: [...orCondition],
      })
        .skip(skip)
        .limit(search_limit),
    ]);

    res.json({
      message: 'Sales Details list is successfully fetched.',
      success: true,
      data: {
        list: salesDetailsList,
        totalCount: entireSalesDetails.length,
      },
    });
  })
  // Adds a new sales details object in database
  .post('/add', async (req, res) => {
    const { sales_id } = req.body;
    const salesDetailObjFromDb = await Sales.findOne({ sales_id });
    if (salesDetailObjFromDb) {
      res.json({
        success: false,
        message: 'Data already present',
      });
      return;
    }

    const salesData = new Sales({ ...req.body });
    const savedSalesData = await salesData.save();
    res.json({
      message: 'Sales data successfully pushed.',
      success: true,
      data: savedSalesData,
    });
  })
  // Updates the sales details object
  .patch('/edit/:id', async (req, res) => {
    const { id: sales_id } = req.params;
    const salesDetailsToBeUpdated = req.body;

    const salesDetails = await Sales.updateOne(
      {
        sales_id,
      },
      {
        $set: { ...salesDetailsToBeUpdated },
      }
    );

    res.json({
      message: 'Sales details object is updated.',
      success: true,
      data: {
        acknowledged: salesDetails.acknowledged,
      },
    });
  });

module.exports = router;
