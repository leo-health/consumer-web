const LOCAL_API_SERVER = "http://localhost:3000";
const NGROK_API_SERVER = "http://lapi.ngrok.io";

const API_SERVER = LOCAL_API_SERVER;

export const API_BASE_URL = `${API_SERVER}/api/v1`;
export const DATE_FORMATS = {
  STANDARD_DATE_WITH_SLASHES: "MM/DD/YYYY",
  DAY_OF_MONTH: "D",
  DAY_OF_WEEK_3_LETTER: "ddd",
  HOUR_MINUTE_AM_PM: "h:mm A",
  FULL_SPELLED_DATE: "dddd, MMMM Do"
};
export const API_DATE_FORMAT = DATE_FORMATS.STANDARD_DATE_WITH_SLASHES;
