import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CovidDataDTO } from '../datamodel/dto/covid-data.dto';
import { IChartConfig } from '../../modules/home/chart/chart-config.interface';

import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CovidDataService {
  private totalCovidData = new ReplaySubject<CovidDataDTO>(null);
  private covidDailyData = new ReplaySubject<any>(null);
  private population = {
    spain: 47100396
  };

  private dataPath = 'assets/data/';

  private totalDataFile = 'covid.json';

  constructor(private http: HttpClient) {
    this.getCovidData().subscribe(
      (res: CovidDataDTO) => {
        this.covidDailyData.next(this.dailyCasesData(res));
        this.totalCovidData.next(res);
      }
    );
  }

  public getTotalCovidData(): ReplaySubject<CovidDataDTO> {
    return this.totalCovidData;
  }

  public getDailyCovidData(): ReplaySubject<any> {
    return this.covidDailyData;
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

      if (!chartData.data.datasets[2]) { chartData.data.datasets[2] = {data: [], label: 'Recuperados'}; }
      chartData.data.datasets[2].data.push(item.recovered);

      if (!chartData.data.datasets[3]) { chartData.data.datasets[3] = {data: [], label: 'Fallecidos'}; }
      chartData.data.datasets[3].data.push(item.deaths);
    });
    return chartData;
  }

  public parseTotalDataFile(data: any) {
    const totalData: CovidDataDTO = data[data.length - 1];
    totalData.deathsLast24h = data[data.length - 1].deaths - data[data.length - 2].deaths;
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

  public dailyCasesData(data: any) {
    const dailyData: any[] = [];

    data.map((item: any, index: number) => {
      let previous = 0;
      index === 0 ? previous = index : previous = index - 1;
      dailyData.push({
        date: item.date,
        deathsLast24h: item.deaths - data[previous].deaths,
        casesLast24h: item.cases - data[previous].cases,
        recoveredLast24: item.recovered - data[previous].recovered,
        hospitalizedLast24h: item.hospitalized - data[previous].hospitalized
      });
    });
    return dailyData;
  }
}
