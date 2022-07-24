//We need to have all the code to the API calls and axios and one place that can be uset within the whole app.
//If we have the axios imported in each component then every component woulld make its instance of the axios
//and the code will be messy and hard to debug because of API calls code everywhere.
//Axios can be installed in vue CLI with 'npm install axios --save' command.
import axios from "axios";

//Single Axios instance for our app.
const apiClient = axios.create({
  //Base URL for all calls to use.
  baseURL: "https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3",
  withCredentials: false,
  //For autentication and configuration for communication with pur server.
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default {
  getEvents() {
    //'/events' will be added at the end of our baseURL.
    return apiClient.get("/events");
  },
  getEvent(id) {
    return apiClient.get("/events/" + id);
  },
};
