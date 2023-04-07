import axios from "axios";

export const axiosCookie = (axios.defaults.xsrfCookieName = "csrftoken");
export const axiosHeader = (axios.defaults.xsrfHeaderName = "X-CSRFToken");
export const axiosCredential = (axios.defaults.withCredentials = true);
