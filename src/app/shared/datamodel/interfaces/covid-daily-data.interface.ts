export interface ICovidDailyData {
  date: string;
  hospitalizedLast24h: number;
  casesLast24h: number;
  deathsLast24h?: number;
}
