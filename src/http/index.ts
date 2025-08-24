import AsyncStorage from "@react-native-async-storage/async-storage";
import { SportsListResponse, TournamentDemoResponse } from "./types";

// Helper function to fetch sports list
export const fetchSportsList = async (): Promise<SportsListResponse> => {
  const cacheKey = "cache:sportsList";
  try {
    const response = await fetch("https://stapubox.com/sportslist");
    if (!response.ok) {
      throw new Error("Failed to fetch sports list");
    }
    const json = (await response.json()) as SportsListResponse;
    // cache fresh data
    try {
      await AsyncStorage.setItem(cacheKey, JSON.stringify(json));
    } catch {
      // ignore cache write errors
    }
    return json;
  } catch (err) {
    // fallback to cache if available
    try {
      const cached = await AsyncStorage.getItem(cacheKey);
      if (cached) {
        return JSON.parse(cached) as SportsListResponse;
      }
    } catch {
      // ignore cache read errors
    }
    throw err;
  }
};

// Helper function to fetch tournaments
export const fetchTournamentDemo =
  async (): Promise<TournamentDemoResponse> => {
    const cacheKey = "cache:tournamentDemo";
    try {
      const response = await fetch("https://stapubox.com/tournament/demo");
      if (!response.ok) {
        throw new Error("Failed to fetch tournament demo");
      }
      const json = (await response.json()) as TournamentDemoResponse;
      // cache fresh data
      try {
        await AsyncStorage.setItem(cacheKey, JSON.stringify(json));
      } catch {
        // ignore cache write errors
      }
      return json;
    } catch (err) {
      // fallback to cache if available
      try {
        const cached = await AsyncStorage.getItem(cacheKey);
        if (cached) {
          return JSON.parse(cached) as TournamentDemoResponse;
        }
      } catch {
        // ignore cache read errors
      }
      throw err;
    }
  };
