export interface Sport {
  sport_id: number;
  sport_name: string;
}

export interface SportsListResponse {
  status: string;
  msg: string;
  err: null | string;
  data: Sport[];
}

// For the Tournament Demo API
export interface Match {
  id: number;
  stage: string;
  team_a: string;
  team_b: string;
  start_time: string;
  venue: string;
  status: string;
}

export interface Tournament {
  id: number;
  name: string;
  tournament_img_url: string;
  level: string;
  start_date: string;
  matches: Match[];
}

export interface TournamentDemoResponse {
  status: string;
  msg: string;
  err: null | string;
  data: {
    sports_id: number;
    sport_name: string;
    tournaments: Tournament[];
  }[];
}
