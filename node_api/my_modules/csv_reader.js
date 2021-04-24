const fs = require('fs')
const path = require('path')
const { pathToFileURL } = require('url')
let CSVtranfromer = class {
    constructor(){
        this.raw = fs.readFileSync(path.resolve(__dirname,'../..','time_stat.csv'),'utf-8')
        this.split_line = this.raw.split(/\r?\n/)
        this.header = this.split_line[0].split(',')
        this.data = this.split_line.map(x=>x.split(','))
    }
    today_stat()
    {
        let today_data = this.data[this.data.length - 2]
        let yester_data = this.data[this.data.length - 3]
        return{
            "new_patient":today_data[1],
            "diff_new":today_data[1] - yester_data[1],
            "accum":today_data[2],
            "new_death":today_data[3],
            "diff_new_death":today_data[3] - yester_data[3],
        }
    }
    graph_stat_accum(){
        let rtn_data = []
        let rtn_day = []
        for(var i=1;i<this.data.length - 1;i++){
            if(this.data[i][2] != "0")
            {
                rtn_data.push(this.data[i][2])
                rtn_day.push(this.data[i][0])
            }
        }
        return{
            "date":rtn_day,
            "data":rtn_data,
        }
    }
}
module.exports = {
    CSVtranfromer:CSVtranfromer
}