import { action, makeAutoObservable, observable } from "mobx";
import cryptoJS from "react-native-crypto-js";
import { jwtDecode } from "jwt-decode";
import sign from "jwt-encode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as NavigationService from "../NavigationService";
import RestClient from "../RestAPI/RestClient";
import AppUrl from "../RestAPI/AppUrl";

class AuthStore {
  appState = {};

  constructor() {
    makeAutoObservable(this, {
      appState: observable,
      saveToken: action,
      getToken: action,
      removeToken: action,
      redirectControl: action,
    });
  }

  saveToken = async (appState) => {
    try {
      await AsyncStorage.setItem("appState", cryptoJS.AES.encrypt(sign(appState, "secret"), "letgo").toString());
      this.appState = appState;
    } catch (e) {
      console.log(e);
    }
  };

  getAccessToken = async () => {  // api işlemlerinde de kullanmak için ayrı bir token yazdık (tokenControl)
    const appStateData = await AsyncStorage.getItem("appState");

    if (appStateData) {
      const bytes = cryptoJS.AES.decrypt(appStateData, "letgo");
      const originalText = bytes.toString(cryptoJS.enc.Utf8);
      this.appState = jwtDecode(originalText);
    } else {
      this.appState = null;
    }
  }

  getToken = async () => {
    try {
      await this.getAccessToken();
      this.redirectControl();

    } catch (e) {
      console.log(e);
    }
  };

  removeToken = async () => {
    try {
      await AsyncStorage.removeItem("appState");
      this.appState = null;
      this.redirectControl();
    } catch (e) {
      console.log(e);
    }
  };

  redirectControl = () => {
    if (!this.appState) {
      NavigationService.navigate("Login");
      return false;
    } else {
      const result = this.tokenControl();
      if (result){
        NavigationService.navigate("Welcome");
      }
    }
  };


  tokenControl = async () => {
   await this.getAccessToken();
    const token = this.appState.user.access_token;

    RestClient.getRequest(AppUrl.check, {
      headers: {
        "Authorization": "Bearer " + token,
      },
    }).then((res) => {
      const result = res.data;
      if (result.isLoggedIn !== true) {
        this.removeToken();
      } else {
        let userData = {
          id: result.data.id,
          name: result.data.name,
          email: result.data.email,
          access_token: result.data.access_token,
        };

        let appState = {
          isLoggedIn: true,
          user: userData,
        };

        this.saveToken(appState);
        return true;
      }
    }).catch((err) => {
      console.log(err);
      this.removeToken();
    });
  };

}

export default new AuthStore();
