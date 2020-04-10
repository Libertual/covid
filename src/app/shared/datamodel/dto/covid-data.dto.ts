export interface CovidDataDTO {
  date: string;
  hour: string;
  cases: number;
  deaths: number;
  recovered: number;
  hospitalized: number;
  last24h: number;
  casesLast24h?: number;
  deathsLast24h?: number;
  hospitalizedLast24h?: number;
  actives?: number;
}
