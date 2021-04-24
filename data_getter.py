"""
    Translate api from https://data.go.th/dataset/covid-19-daily
    This python script use for update data
"""
import requests
from os import path
import json
import datetime
def write_report(file,FirstTime):
    """
        Store in csv format for regression and prediction or other statistic application 
    """
    if FirstTime:
        x = requests.get("https://covid19.th-stat.com/api/open/timeline")
        file.write("Date,Newly confirm,Accumulate Patient,New Death,Accumulate Death,Hospitalized,Recovered\n")
        json_data = json.loads(x.text)
        for i in json_data['Data']:
            file.write(f"{i['Date']},{i['NewConfirmed']},{i['Confirmed']},{i['NewDeaths']},{i['Deaths']},{i['Hospitalized']},{i['Recovered']}\n")
    else:
        x = requests.get("https://covid19.th-stat.com/api/open/today")
        json_data = json.loads(x.text)
        now = datetime.datetime.now().date()
        #date format are not the same for each api !!!!!
        if now.month < 10:
            str_month = f"0{now.month}"
        else:
            str_month = f"{now.month}"
        if now.day < 10:
            str_day = f"0{now.day}"
        else:
            str_day = f"{now.day}"
        str_date = f"{str_day}/{str_month}/{now.year}" 
        write_time = f"{str_month}/{str_day}/{now.year}"
        api_date = json_data['UpdateDate'].split(" ")[0]
        print(str_date)
        print(api_date)
        if str_date != api_date:
            print('Not update yet')
        else:
            file.write(f"{write_time},{json_data['NewConfirmed']},{json_data['Confirmed']},{json_data['NewDeaths']},{json_data['Deaths']},{json_data['Hospitalized']},{json_data['Recovered']}\n")
if __name__ == "__main__":
    if path.exists("time_stat.csv"):
        time_stat = open("time_stat.csv","a")
        write_report(time_stat,False)
    else:
        time_stat = open("time_stat.csv","w")
        write_report(time_stat,True)

