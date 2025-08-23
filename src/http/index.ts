import { SportsListResponse, TournamentDemoResponse } from "./types";

// Helper function to fetch sports list
export const fetchSportsList = async (): Promise<SportsListResponse> => {
  const response = await fetch("https://stapubox.com/sportslist");
  if (!response.ok) {
    throw new Error("Failed to fetch sports list");
  }
  return response.json();
};

// Helper function to fetch tournament demo
export const fetchTournamentDemo =
  async (): Promise<TournamentDemoResponse> => {
    const response = await fetch("https://stapubox.com/tournament/demo");
    if (!response.ok) {
      throw new Error("Failed to fetch tournament demo");
    }
    return response.json();
  };
