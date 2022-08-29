import { defineStore } from 'pinia';

interface prettyError {
  err: Error;
  msg: string;
}

export interface errorCategories {
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
  getters: {
    loginErrorMsg: (state) => {
      let latestError = state.latestError.login;
      if (latestError) {
        return latestError.msg;
      }
      return '';
    },
    generalErrorMsg: (state) => {
      let latestError = state.latestError.general;
      if (latestError) {
        return latestError.msg;
      }
      return '';
    },
    authErrorMsg: (state) => {
      let latestError = state.latestError.auth;
      if (latestError) {
        return latestError.msg;
      }
      return '';
    },
    dronesErrorMsg: (state) => {
      let latestError = state.latestError.drones;
      if (latestError) {
        return latestError.msg;
      }
      return '';
    },
  },
});
