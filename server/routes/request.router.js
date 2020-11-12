const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated, } = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', rejectUnauthenticated, (req, res) => {
  const queryText = `SELECT * FROM "requests" WHERE "completed"='FALSE'`; //AND "event_id"=$1
  pool
    .query(queryText)
    .then((response) => {
      res.send(response.rows);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
  const queryText = `INSERT INTO "requests" ("table_number", "artist_count", "event_id")
    VALUES ($1, $2, $3)`;
  pool
    .query(queryText, [
      req.body.tableNumber,
      req.body.artistNumber,
      req.body.location,
    ])
    .then((results) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.error(`POST /Request Materials failed`, err);
      res.sendStatus(500);
    });
});

//complete an event
router.put('/completed/:id', rejectUnauthenticated, (req, res) => {
  let e = req.params
  const queryText = `UPDATE "requests" SET "completed"='TRUE' WHERE "id" =$1;`;
  pool.query(queryText, [e.id])
    .then((response) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.warn(err);
      res.sendStatus(500);
    });
});



module.exports = router;
