const express = require('express')
const router = express.Router();

const connection = require('../../config/db')

router.get('/', async (req, res) => {
    connection.query(
        'SELECT sum(total_homes_sold) as total_sales, region_name FROM zerodown.market group by region_id',
        function (err, results, fields) {
            if (err)
                res.send({ error: 'error' })
            res.send(results); // results contains rows returned by server
        }
    );
})


router.get('/region-name', async (req, res) => {
    connection.query(
        'SELECT distinct region_name FROM zerodown.market order by region_name',
        function (err, results, fields) {
            if (err)
                res.send({ error: 'error' })
            res.send(results); // results contains rows returned by server
        }
    );
})

f1 = async () => {

}
router.post('/get-region-info', async (req, res) => {
    let region = req.body.region;
    const ans = []
    let q = 'SELECT total_homes_sold,period_begin,period_end FROM zerodown.market where region_name = ? and duration="1 weeks";' +
        'SELECT total_homes_sold,period_begin,period_end FROM zerodown.market where region_name = ? and duration="4 weeks";' +
        'SELECT total_homes_sold,period_begin,period_end FROM zerodown.market where region_name = ? and duration="12 weeks";' +
        'SELECT sum(total_homes_sold) as total_sale,sum(total_active_listings) as total_active, avg(median_days_on_market) as median_days_on_market, avg(median_active_list_price) as median_active_list_price, avg(average_sale_to_list_ratio) as average_sale_to_list_ratio FROM zerodown.market where region_name = ?;' +
        'SELECT sum(total_new_listings) as total_new_listings, sum(pending_sales) as pending_sales FROM zerodown.market where region_name = ?;';
    connection.query(
        q, [region, region, region, region, region],
        function (err, results, fields) {

            if (err)
                res.send({ error: 'error' })
            else {
                res.send(results)
            }
        })
})


router.get('/region-price', async (req, res) => {
    connection.query(
        'SELECT distinct region_name FROM zerodown.market',
        function (err, results, fields) {
            if (err)
                res.send({ error: 'error' })
            res.send(results); // results contains rows returned by server
        }
    );
})

module.exports = router 