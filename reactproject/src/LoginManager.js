import history from "./history";
import { useHistory } from 'react-router-dom';
var apiHost = "http://localhost/index.php";
var tokenTarget = "/api";
var refreshTarget= '/api/refresh';

class LoginManager{
  static loggedIn = false;
  static instance = null ;
  static history = useHistory();
  #accessToken = null;
  #refreshToken = null;
  constructor(){
    this.#refreshToken = localStorage.getItem("LoginManager.refreshToken")
    if(this.#refreshToken === null){
      LoginManager.loggedIn = false;
    }else{
      LoginManager.loggedIn = true;
    }
  }
  static getLoginManager(){
    if(LoginManager.instance === null){
      LoginManager.instance = new LoginManager();

    }
    return (LoginManager.instance);
  }
  onExpiredRefresh(){
    this.loginWithCreds();
  }
  onLogout(){
    
    history.push("/login");//LoginPage.url
    this.loggedIn = false;
    this.app.setState({'loggedIn':false})
  }
  logout(){
    if(LoginManager.loggedIn){
      LoginManager.loggedIn = false;
      localStorage.removeItem("LoginManager.refreshToken");
      this.onLogout();
    }
    
  }
  onLogin(){
    LoginManager.loggedIn = true;
    history.push("/courseList");
  }
  loginWithCreds(username,password,callback = (data)=>{return data},errcallback = (data)=>{return data}){
    var data = {
      "EmailID":username,
      "Password":password
    }
    
    fetch(apiHost+tokenTarget,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    }).then(
      (response)=>{
        if(response.status===401){
          this.onLogout();
          errcallback("Non matching creds");
        }else if (response.status===500){
            this.onLogout();
            errcallback("Internal server error. Please try again later.");  
        } else {
          response.text().then(
            (text)=>{
              var out = JSON.parse(text)
              this.#accessToken= out.access_token;
              this.#refreshToken = out.refresh_token;
              localStorage.setItem("LoginManager.refreshToken",this.#refreshToken);
              localStorage.setItem("LoginManager.accessToken",this.#accessToken);
              this.onLogin();
              callback(out);
            }
          )
        }
      }
    ).catch(
      (e)=>{
        //console.error(e);
      }
    );
  }
  loginWithRefresh(callback = (data)=>{return data},errcallback = (data)=>{return data}){
    this.loginWithRefreshAsync().then(
      (response)=>{
        if(response.status===401){
          this.logout();
          errcallback("Non matching creds");
          return false
        }else{
          response.text().then(
            (text)=>{
              var out = JSON.parse(text)
              this.#accessToken= out.access;
              //this.#refreshToken = out.refresh;
              //localStorage.setItem("LoginManager.refreshToken",this.#refreshToken);
              localStorage.setItem("LoginManager.accessToken",this.#accessToken);
              //this.onLogin();
              callback(out);
            }
          )
        }
      }
    )
    return true;
  }
  async loginWithRefreshAsync(){
    var data = {
      "refresh":this.#refreshToken
    }
    return fetch(apiHost+refreshTarget,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
  }
  authfetch(url,options={}){
    var newUrl = url;
    if (!url.startsWith("http")){
      newUrl = apiHost+url;
    }
    var newOptions = Object.assign({mode: 'cors'},options);
    newOptions.headers = {"Authorization": "Bearer "+this.#accessToken,'Content-Type': 'application/json',...options.headers}//enter token here
    return fetch(newUrl,newOptions)
  }
  async getJson(fetchObject){

    let response = await fetchObject;

    if(response.status===401){
      var resp = await this.loginWithRefreshAsync();
      var res = false;
      console.log(resp.status)
      if(resp.status === 401){
        res = "RELOGIN";
      }else{
        try {
          let text = await resp.text();
          let out = JSON.parse(text);
          this.#accessToken= out.access;
          localStorage.setItem("LoginManager.accessToken",this.#accessToken);
        } catch (error) {
          res = "RELOGIN";
        }
      }
      return res;
    }else if(response.status>=400){
      throw new Error("Received "+response.status);
    }else{
      let data = await response.json();
      return data;
    }
  }
  async get(url){
    let res = await this.getJson(this.authfetch(url));
    if(res ==="RELOGIN"){
      this.logout();
    }else if(res){
      return res;
    }
    else{
      return this.get(url);
    }
  }
  async options(url){
    let res = await this.getJson(this.authfetch(url,{method:"OPTIONS"}));
    if(res ==="RELOGIN"){
      this.logout();

    }else if(res){
      return res;
    }
    else{
      return this.options(url);
    }
  }
  async post(url,requestBody){
    let res = await this.getJson(this.authfetch(url,{method:"POST",body:JSON.stringify(requestBody)}));
    if(res ==="RELOGIN"){
      this.logout();
    }else if(res){
      return res;
    }
    else{
      return this.post(url,requestBody);
    }
  }
  async put(url,requestBody){
    let res = await this.getJson(this.authfetch(url,{method:"PUT",body:JSON.stringify(requestBody)}));
    if(res ==="RELOGIN"){
      this.logout();
    }else if(res){
      return res;
    }
    else{
      return this.put(url,requestBody);
    }
  }
  async delete(url,requestBody){
    let res = await this.getJson(this.authfetch(url,{method:"DELETE",body:JSON.stringify(requestBody)}));
    if(res ==="RELOGIN"){
      this.logout();
    }
    else if(res){
      return res;
    }else {
      return this.delete(url,requestBody);
    }
  }
  async patch(url,requestBody){
    let res = await this.getJson(this.authfetch(url,{method:"PATCH",body:JSON.stringify(requestBody)}));
    if(res ==="RELOGIN"){
      this.logout();
    }
    else if(res){
      return res;
    }else {
      return this.patch(url,requestBody);
    }
  }
}export default LoginManager;