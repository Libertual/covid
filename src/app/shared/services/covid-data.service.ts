import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CovidDataDTO } from '../datamodel/dto/covid-data.dto';
import { IChartConfig } from '../../modules/home/chart/chart-config.interface';

import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CovidDataService {
  private covidData = new ReplaySubject<CovidDataDTO>(null);
  private population = {
    spain: 47100396
  };

  private dataPath = 'assets/data/';

  private totalDataFile = 'covid.json';

  constructor(private http: HttpClient) {
  this.getCovidData().subscribe(
      (res) => {
        this.covidData.next(res as CovidDataDTO);
      }
    );
  }

  public getResponse(): ReplaySubject<any> {
    return this.covidData;
  }
  public getCovidData() {
    return this.http.get(this.dataPath + this.totalDataFile, {responseType: 'json'});
  }

  public parseTotalData(data: any): IChartConfig {
    const chartData: IChartConfig = {
      data: { datasets: [],
              labels: []
            }
      };
    data.map((item: any) => {
      chartData.data.labels.push(item.date);

      if (!chartData.data.datasets[0]) { chartData.data.datasets[0] = {data: [], label: 'Afectados'}; }
      chartData.data.datasets[0].data.push(item.cases);

      if (!chartData.data.datasets[1]) { chartData.data.datasets[1] = {data: [], label: 'Hospitalizados'}; }
      chartData.data.datasets[1].data.push(item.hospitalized);

      if (!chartData.data.datasets[2]) { chartData.data.datasets[2] = {data: [], label: 'UCI'}; }
      chartData.data.datasets[2].data.push(item.uci);

      if (!chartData.data.datasets[3]) { chartData.data.datasets[3] = {data: [], label: 'Fallecidos'}; }
      chartData.data.datasets[3].data.push(item.deaths);
    });
    return chartData;
  }

  public parseTotalDataFile(data: any) {
    const totalData: CovidDataDTO = data[data.length - 1];
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

  public parseCasesDataByField(data: any, field: string): IChartConfig {
    const chartData: IChartConfig = {
      data: { datasets: [],
              labels: []
            }
      };

    data.map((item: any) => {
    chartData.data.labels.push(item.date);

    if (!chartData.data.datasets[0]) { chartData.data.datasets[0] = {data: [], label: 'Nuevos casos en 24h'}; }
    chartData.data.datasets[0].data.push(item[field]);
    });

    return chartData;
  }
}
