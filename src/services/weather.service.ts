export class WeatherService {
  static async getCurrentWeather(lat = 23.18, lon = 77.30) {
    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation`);
      const data = await response.json();
      return {
        temperature: data.current.temperature_2m,
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        precipitation: data.current.precipitation || 0,
      };
    } catch (error) {
      console.error("Failed to fetch weather from Open-Meteo", error);
      return {
        temperature: 32,
        humidity: 60,
        windSpeed: 12,
        precipitation: 0,
      };
    }
  }
}
