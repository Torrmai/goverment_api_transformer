let CSVtranfromer = require('./csv_reader')
var reader =new CSVtranfromer.CSVtranfromer
//console.log(reader.today_stat())
console.log(reader.graph_stat_accum())
