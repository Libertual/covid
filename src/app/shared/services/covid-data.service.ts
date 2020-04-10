import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CovidDataDTO } from '../datamodel/dto/covid-data.dto';
import { IChartConfig } from '../../modules/home/chart/chart-config.interface';

import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CovidDataService {
  private covidData = new ReplaySubject<CovidDataDTO[]>(null);
  private population = {
    spain: 47100396
  };

  private dataPath = 'assets/data/';

  private totalDataFile = 'covid.json';

  constructor(private http: HttpClient) {
    this.getCovidDataResponse().subscribe(
      (res: CovidDataDTO[]) => {
        this.covidData.next(this.calculateCovidData(res));
      }
    );
  }

  public getCovidData(): ReplaySubject<CovidDataDTO[]> {
    return this.covidData;
  }

  public calculateCovidData(data: CovidDataDTO[]): CovidDataDTO[] {
    data.map((item: CovidDataDTO, index) => {
      let before: number;
      index === 0 ? before = 0 : before = index - 1;
      item.deathsLast24h = data[index].deaths - data[before].deaths;
      item.casesLast24h = data[index].cases - data[before].cases;
      item.hospitalizedLast24h = data[index].hospitalized - data[before].hospitalized;
      item.actives = item.cases - item.recovered - item.deaths;
      return item;
    });
    return data;
  }

  public getCovidDataResponse() {
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

      if (!chartData.data.datasets[2]) { chartData.data.datasets[2] = {data: [], label: 'Recuperados'}; }
      chartData.data.datasets[2].data.push(item.recovered);

      if (!chartData.data.datasets[3]) { chartData.data.datasets[3] = {data: [], label: 'Fallecidos'}; }
      chartData.data.datasets[3].data.push(item.deaths);

      if (!chartData.data.datasets[4]) { chartData.data.datasets[4] = {data: [], label: 'Activos'}; }
      chartData.data.datasets[4].data.push(item.actives);
    });
    return chartData;
  }

  public getLastDayData(data: any) {
    return data[data.length - 1];
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

  public dailyCasesChartDataByFields(data: any, fields: any[]): IChartConfig {
    const chartData: IChartConfig = {
      data: { datasets: [],
              labels: []
            }
      };
    data.map((item: any) => {
      chartData.data.labels.push(item.date);
      fields.map((field, index) => {
        if (!chartData.data.datasets[index]) {
           chartData.data.datasets[index] = {data: [], label: field.label}; }
        chartData.data.datasets[index].data.push(item[field.name]);
      });
    });
    return chartData;
  }
}
