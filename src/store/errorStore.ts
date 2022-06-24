import { defineStore } from 'pinia';

interface prettyError {
  err: Error;
  msg: string;
}

interface errorCategories {
  login: prettyError; // for errors directly related to the login screen
  auth: prettyError; // for errors related to access token, refresh token, permissions
  drones: prettyError; // fetching or handling drones
  general: prettyError; // everything else
}

export const useErrors = defineStore('errorStore', {
  state: () => ({
    latestError: {} as errorCategories,
  }),
  actions: {
    setLoginError(err: Error, msg: string) {
      this.latestError.login = { err, msg };
    },
    setAuthError(err: Error, msg: string) {
      this.latestError.auth = { err, msg };
    },
    setDronesError(err: Error, msg: string) {
      this.latestError.drones = { err, msg };
    },
    setGeneralError(err: Error, msg: string) {
      this.latestError.general = { err, msg };
    },
  },
});
