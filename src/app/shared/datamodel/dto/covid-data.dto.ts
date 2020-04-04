export interface CovidDataDTO {
  date: string;
  hour: string;
  cases: number;
  deaths: number;
  recovered: number;
  hospitalized: number;
  latest24h: number;
}
