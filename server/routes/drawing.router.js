const express = require('express');
const {
    rejectUnauthenticated,
} = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

/**
 * GET route template
 */
router.get('/pending', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "drawings"
    WHERE "approved" IS NULL;`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        // catch for query
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});
router.get('/approved', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "drawings"
    WHERE "approved" IS TRUE;`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        // catch for query
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});
router.get('/disapproved', rejectUnauthenticated, (req, res) => {
    const queryText = `SELECT * FROM "drawings"
    WHERE "approved" IS FALSE;`;
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        // catch for query
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});


router.put('/approve/:id', (req, res) => {
    console.log('req.params.id', req.params.id);
    const queryText = `UPDATE "drawings" 
    SET "approved" = TRUE WHERE "id"=$1;`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.sendStatus(200);
        })
        // catch for query
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

router.put('/disapprove/:id', (req, res) => {
    console.log('req.params.id', req.params.id);
    const queryText = `UPDATE "drawings" 
    SET "approved" = FALSE WHERE "id"=$1;`;
    pool.query(queryText, [req.params.id])
        .then((result) => {
            res.sendStatus(200);
        })
        // catch for query
        .catch((error) => {
            console.log(`Error on query ${error}`);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    // POST route code here
});

module.exports = router;
