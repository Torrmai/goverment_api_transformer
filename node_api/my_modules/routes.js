const express = require('express')
const routes = express.Router()
const CSVtranfromer = require('./csv_reader')
const reader = new CSVtranfromer.CSVtranfromer

routes.get('/today_stat',function(req,res) {
    let stat = reader.today_stat()
    res.json(stat)
})
routes.get('/tot_graph',function(req,res) {
    let grap_data = reader.graph_stat_accum()
    res.json(grap_data)
})

routes.get('*',function(req,res) {
    res.json({'err':'api not found',
               'err_code':404,})
})

module.exports = routes