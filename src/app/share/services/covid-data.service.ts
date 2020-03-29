import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ISummary } from '../interfaces/summary.interface';

@Injectable({
  providedIn: 'root'
})
export class CovidDataService {
  private dataPath = 'assets/data/';
  // private dataPath = '/resources/';

  private covidCCAAFile = 'serie_historica_acumulados.csv';
  private totalDataFile = 'data.csv';
  // private ccaaFile = 'ccaa.csv';
  // private covidUrl = '/resources/serie_historica_acumulados.csv';

  constructor(private http: HttpClient) { }

  public getTotalData() {
    return this.http.get(this.dataPath + this.totalDataFile, {responseType: 'text'});
  }

  public getCovidData() {
    return this.http.get(this.dataPath + this.covidCCAAFile, {responseType: 'text'});
  }

  public parseTotalData(data: any) {
    const lines = data.split('\n');
    const totals = lines[1].split(',');
    const totalData: ISummary = {
      date: totals[0],
      hour: totals[1],
      cases: totals[2],
      deads: totals[3],
      recovered: totals[4],
      hospitalized: totals[5],
      latest24h: totals[6]
    };
    return totalData;
  }

  public extractData(data: any) {
    const lines = data.split('\n');

    lines.splice(0, 1);
    lines.splice(lines.length - 2, 2);
    let fields: string[];
    const casesByDateAndRegion = [];
    const chartData = {
      lineChartData: [],
      lineChartLabels: []
    };
    lines.map((line: string) => {
        fields = line.split(',');

        if (!casesByDateAndRegion[fields[1]]) {casesByDateAndRegion[fields[1]] = []; }
        if (!casesByDateAndRegion[fields[1]][fields[0]]) {casesByDateAndRegion[fields[1]][fields[0]] = {}; }
        casesByDateAndRegion[fields[1]][fields[0]] = { cases: +fields[2], hospitalized: +fields[3], uci: +fields[4], deads: +fields[5] };
        if (!casesByDateAndRegion[fields[1]].total) {
          casesByDateAndRegion[fields[1]].total = { cases: 0, hospitalized: 0, uci: 0, deads: 0};
        }
        casesByDateAndRegion[fields[1]].total = {
          cases: casesByDateAndRegion[fields[1]].total.cases += parseInt(fields[2], 10) || 0,
          hospitalized: casesByDateAndRegion[fields[1]].total.hospitalized += parseInt(fields[3], 10) || 0,
          uci: casesByDateAndRegion[fields[1]].total.uci += parseInt(fields[4], 10) || 0,
          deads: casesByDateAndRegion[fields[1]].total.deads += parseInt(fields[5], 10) || 0
        };
    });
    Object.keys(casesByDateAndRegion).map((date) => {
      const dateFields = date.split('/');
      chartData.lineChartLabels.push(`${dateFields[2]}-${dateFields[1]}-${dateFields[0]}`);

      if (!chartData.lineChartData[0]) { chartData.lineChartData[0] = {data: [], label: 'Afectados'}; }
      chartData.lineChartData[0].data.push(casesByDateAndRegion[date].total.cases);

      if (!chartData.lineChartData[1]) { chartData.lineChartData[1] = {data: [], label: 'Hospitalizados'}; }
      chartData.lineChartData[1].data.push(casesByDateAndRegion[date].total.hospitalized);

      if (!chartData.lineChartData[2]) { chartData.lineChartData[2] = {data: [], label: 'UCI'}; }
      chartData.lineChartData[2].data.push(casesByDateAndRegion[date].total.uci);

      if (!chartData.lineChartData[3]) { chartData.lineChartData[3] = {data: [], label: 'Fallecidos'}; }
      chartData.lineChartData[3].data.push(casesByDateAndRegion[date].total.deads);
    });
    // console.log('chartData ', chartData);
    return chartData;
  }
}
