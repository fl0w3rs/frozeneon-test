export declare namespace JsdelivrApi {
  interface Links {
    self: string;
    versions: string;
  }

  interface StatsNumbers {
    total: number;
    dates: { [key: string]: number };
  }

  export interface Stats {
    hits: StatsRankings;
    bandwidth: StatsRankings;
    links: Links;
  }

  export interface StatsRankings extends StatsNumbers {
    rank: number;
    typeRank: number;
    prev: {
      rank: number;
      typeRank: number;
      total: number;
    };
  }

  export interface Version {
    type: string;
    version: string;
    hits: StatsNumbers;
    bandwidth: StatsNumbers;
    links: Links;
  }

  export interface File {
    name: string;
    hits: StatsNumbers;
    bandwidth: StatsNumbers;
  }
}
