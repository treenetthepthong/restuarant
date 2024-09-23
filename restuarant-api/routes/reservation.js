var express = require("express");
var router = express.Router();
var config = require("../config/dbconfig");
const sql = require("mssql");

/* GET reservation listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/addReservation", async function (req, res, next) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("guestName", sql.VarChar, req.body.name)
      .input("guestEmail", sql.VarChar, req.body.email)
      .input("guestTel", sql.VarChar, req.body.phone)
      .input("guestPax", sql.Int, req.body.guests)
      .input("guestRemarks", sql.VarChar, req.body.specialRequests)
      .input("guestDate", sql.Date, req.body.reserveDate)
      .input("guestTime", sql.VarChar, req.body.reserveTime)
      .query(
        "INSERT INTO tbl_reservation_table (name, email, tel, pax, remarks, reserve_date, reserve_time) VALUES (@guestName, @guestEmail, @guestTel, @guestPax, @guestRemarks, @guestDate, CAST(@guestTime AS TIME))"
      );
    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err });
  }
});

router.get("/getReservation", async function (req, res, next) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .query("SELECT * FROM tbl_reservation_table");
    return res.status(200).json({ data: result.recordset });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err });
  }
});

router.get("/getReservation/:id", async function (req, res, next) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("SELECT * FROM tbl_reservation_table WHERE id = @id");
    return res.status(200).json({ data: result.recordset });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err });
  }
});

router.put("/updateReservation/:id", async function (req, res, next) {
  try {
    let pool = await sql.connect(config);
    let result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .input("guestName", sql.VarChar, req.body.name)
      .input("guestEmail", sql.VarChar, req.body.email)
      .input("guestTel", sql.VarChar, req.body.phone)
      .input("guestPax", sql.Int, req.body.guests)
      .input("guestRemarks", sql.VarChar, req.body.specialRequests)
      .input("guestDate", sql.Date, req.body.reserveDate)
      .input("guestTime", sql.VarChar, req.body.reserveTime)
      .query(
        "UPDATE tbl_reservation_table SET name = @guestName, email = @guestEmail, tel = @guestTel, pax = @guestPax, remarks = @guestRemarks, reserve_date = @guestDate, reserve_time = CAST(@guestTime AS TIME) WHERE id = @id"
      );
    return res.status(200).json({ data: result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ data: err });
  }
});

module.exports = router;
