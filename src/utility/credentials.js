/* Credentials */
import Cloak from "./cloak"
import config from "./config"

let console = config.console;

let _STORAGE_NAME_ = "Micab_Web_Data";

export default new class credentials {
  constructor(){}

  credentialUpdate() {
    console.info("### localStorage Updated");
    console.log({localStorage: this.getDataStorage()});
  }

  // Has stored accessToken
  isLoggedIn() {
    var accessToken = this.getAttribute('accessToken');
    return accessToken && accessToken.length > 0;
  }

  // Return stored accessToken from LocalStorage
  getAccessToken() {
    return this.getAttribute('accessToken');
  }

  // Return stored refreshToken from LocalStorage
  getRefreshToken() {
    return this.getAttribute('refreshToken');
  }

	// Store an attribute to LocalStorage
	setAttribute(attr, value, frmSaveCred) {
    var DataStorage = this.getDataStorage();
    DataStorage[attr] = value;
    localStorage[_STORAGE_NAME_] = Cloak.encrypt(JSON.stringify(DataStorage));
    
    if(!frmSaveCred) this.credentialUpdate(this.isLoggedIn());
  }

  // Return stored attribute from LocalStorage
	getAttribute(attr) {
    var DataStorage = this.getDataStorage();
    if(!DataStorage[attr]) return;
    return DataStorage[attr];
  }

  // Delete stored attribute from LocalStorage
  deleteAttribute(attr) {
    var DataStorage = this.getDataStorage();
    delete DataStorage[attr];
    localStorage[_STORAGE_NAME_] = Cloak.encrypt(JSON.stringify(DataStorage));
    this.credentialUpdate(this.isLoggedIn());
  }

  // Store object to LocalStorage
  saveCredentials(data) {
  	for(var attr in data)
      this.setAttribute(attr, data[attr], true);

    this.credentialUpdate(this.isLoggedIn());
  }

  // Get Data Storage
  getDataStorage() {
    this.checkDataStorage();

    return JSON.parse(Cloak.decrypt(localStorage[_STORAGE_NAME_]));
  }

  // Check Data Storage
  checkDataStorage() {
    if(!localStorage[_STORAGE_NAME_])
      localStorage[_STORAGE_NAME_] = Cloak.encrypt(JSON.stringify({}));
  }

  // Clear LocalStorage
	clear() {
		localStorage.clear();
    this.credentialUpdate(this.isLoggedIn());
	}
}