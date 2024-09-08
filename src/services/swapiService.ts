import axios from "axios";
import { envs } from "../envs"

const baseUrl = envs.SWAPI_BASE_URL

export class SwapiService {
  async getCharacter(id: number) {
    try {
      const response = await axios.get(`${baseUrl}/people/${id}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          throw new Error("Character not found");
        }
        throw new Error(`SWAPI Error: ${error.message}`);
      }
      throw new Error("An unexpected error occurred");
    }
  }

  async searchCharacters(query: string) {
    try {
      const response = await axios.get(`${baseUrl}/people`, {
        params: { search: query },
      });
      return response.data.results;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`SWAPI Error: ${error.message}`);
      }
      throw new Error("An unexpected error occurred");
    }
  }
}

export const swapiService = new SwapiService();
