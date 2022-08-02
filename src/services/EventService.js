//We need to have all the code to the API calls and axios and one place that can be uset within the whole app.
//If we have the axios imported in each component then every component woulld make its instance of the axios
//and the code will be messy and hard to debug because of API calls code everywhere.
//Axios can be installed in vue CLI with 'npm install axios --save' command.
import axios from "axios";

//Single Axios instance for our app.
const apiClient = axios.create({
  // Base URL for all calls to use.
  // Base URL from real world vue 3 course.
  // baseURL: "https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3",
  baseURL: "https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router",
  withCredentials: false,
  //For autentication and configuration for communication with pur server.
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getEvents(perPage, page) {
    //'/events' will be added at the end of our baseURL.
    return apiClient.get("/events?_limit=" + perPage + "&_page=" + page);
  },
  getEvent(id) {
    return apiClient.get("/events/" + id);
  },
};
