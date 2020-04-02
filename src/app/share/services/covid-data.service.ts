import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { ISummary } from '../../modules/home/summary/summary.interface';
import { IChartConfig } from '../../modules/home/chart/chart-config.interface';

@Injectable({
  providedIn: 'root'
})

export class CovidDataService {
  private population = {
    spain: 47100396
  };
  private dataPath = 'assets/data/';
  // private dataPath = '/resources/';

  private covidCCAAFile = 'serie_historica_acumulados.csv';
  private totalDataFile = 'data.csv';
  private totalData = 'assets/data/' + 'covid.json';
  // private ccaaFile = 'ccaa.csv';
  // private covidUrl = '/resources/serie_historica_acumulados.csv';

  constructor(private http: HttpClient) { }

  public getTotalData() {
    return this.http.get(this.totalData, {responseType: 'json'});
  }

  public getTotalDataFile() {
    return this.http.get(this.dataPath + this.totalDataFile, {responseType: 'text'});
  }

  public getCovidData() {
    return this.http.get(this.dataPath + this.covidCCAAFile, {responseType: 'text'});
  }

  public parseTotalDataFile(data: any) {
    const lines = data.split('\n');
    const totals = lines[1].split(',');
    const totalData: ISummary = {
      date: totals[0],
      hour: totals[1],
      cases: totals[2],
      deaths: totals[3],
      recovered: totals[4],
      hospitalized: totals[5],
      latest24h: totals[6]
    };
    return totalData;
  }

  public parseDeathRateData(data: any): IChartConfig {
    const chartData: IChartConfig = {
      data: { datasets: [],
              labels: []
            }
      };

    data.map((item: any) => {
    chartData.data.labels.push(item.date);

    let recoveredRate = (item.deaths * 100) / (item.recovered + item.deaths);
    recoveredRate = Number(new Intl.NumberFormat('en-us', {maximumFractionDigits: 2}).format(recoveredRate));

    let casesRate = (item.deaths * 100) / item.cases;
    casesRate = Number(new Intl.NumberFormat('en-us', {maximumFractionDigits: 2}).format(casesRate));

    let populationRate = (item.deaths * 100) / this.population.spain;
    populationRate = Number(new Intl.NumberFormat('en-us', {maximumFractionDigits: 3}).format(populationRate));

    if (!chartData.data.datasets[0]) { chartData.data.datasets[0] = {data: [], label: 'Recuperados'}; }
    chartData.data.datasets[0].data.push(recoveredRate);

    if (!chartData.data.datasets[1]) { chartData.data.datasets[1] = {data: [], label: 'Afectados'}; }
    chartData.data.datasets[1].data.push(casesRate);

    if (!chartData.data.datasets[2]) { chartData.data.datasets[2] = {data: [], label: 'Población'}; }
    chartData.data.datasets[2].data.push(Number(populationRate));

    });

    return chartData;
  }

  public extractData(data: any): IChartConfig {
    const lines = data.split('\n');

    lines.splice(0, 1);
    lines.splice(lines.length - 2, 2);
    let fields: string[];
    const casesByDateAndRegion = [];
    const chartData: IChartConfig = {
      data: { datasets: [],
              labels: []
            }
      };
    lines.map((line: string) => {
        fields = line.split(',');

        if (!casesByDateAndRegion[fields[1]]) {casesByDateAndRegion[fields[1]] = []; }
        if (!casesByDateAndRegion[fields[1]][fields[0]]) {casesByDateAndRegion[fields[1]][fields[0]] = {}; }
        casesByDateAndRegion[fields[1]][fields[0]] = { cases: +fields[2], hospitalized: +fields[3], uci: +fields[4], deaths: +fields[5] };
        if (!casesByDateAndRegion[fields[1]].total) {
          casesByDateAndRegion[fields[1]].total = { cases: 0, hospitalized: 0, uci: 0, deaths: 0};
        }
        casesByDateAndRegion[fields[1]].total = {
          cases: casesByDateAndRegion[fields[1]].total.cases += parseInt(fields[2], 10) || 0,
          hospitalized: casesByDateAndRegion[fields[1]].total.hospitalized += parseInt(fields[3], 10) || 0,
          uci: casesByDateAndRegion[fields[1]].total.uci += parseInt(fields[4], 10) || 0,
          deaths: casesByDateAndRegion[fields[1]].total.deaths += parseInt(fields[5], 10) || 0
        };
    });
    Object.keys(casesByDateAndRegion).map((date) => {
      const dateFields = date.split('/');
      chartData.data.labels.push(`${dateFields[2]}-${dateFields[1]}-${dateFields[0]}`);

      if (!chartData.data.datasets[0]) { chartData.data.datasets[0] = {data: [], label: 'Afectados'}; }
      chartData.data.datasets[0].data.push(casesByDateAndRegion[date].total.cases);

      if (!chartData.data.datasets[1]) { chartData.data.datasets[1] = {data: [], label: 'Hospitalizados'}; }
      chartData.data.datasets[1].data.push(casesByDateAndRegion[date].total.hospitalized);

      if (!chartData.data.datasets[2]) { chartData.data.datasets[2] = {data: [], label: 'UCI'}; }
      chartData.data.datasets[2].data.push(casesByDateAndRegion[date].total.uci);

      if (!chartData.data.datasets[3]) { chartData.data.datasets[3] = {data: [], label: 'Fallecidos'}; }
      chartData.data.datasets[3].data.push(casesByDateAndRegion[date].total.deaths);
    });
    return chartData;
  }

  public parseDailyCasesData(data: any): IChartConfig {
    const chartData: IChartConfig = {
      data: { datasets: [],
              labels: []
            }
      };

    data.map((item: any) => {
    chartData.data.labels.push(item.date);

    if (!chartData.data.datasets[0]) { chartData.data.datasets[0] = {data: [], label: 'Nuevos casos en 24h'}; }
    chartData.data.datasets[0].data.push(item.latest24h);
    });

    return chartData;
  }

}
