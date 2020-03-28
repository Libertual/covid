import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LineChartService {

  private covidUrl = 'assets/data/serie_historica_acumulados.csv';
  private ccaaUrl = '/api/resources/ccaa.csv';
  private dataUrl = '/api/resources/data.csv';
  // private covidUrl = '/resources/serie_historica_acumulados.csv';

  constructor(private http: HttpClient) { }

  public getCovidData() {
    return this.http.get(this.covidUrl, {responseType: 'text'});
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
