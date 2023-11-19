import history from "./history";
var apiHost = "http://127.0.0.1:8000/api";
var tokenTarget = "/login";

class LoginManager{
    static loggedIn = false;
    static instance = null ;
    #accessToken = null;
    #id = null;
    #name = null;

    constructor(){
      this.#accessToken = localStorage.getItem("LoginManager.accessToken")
      if(this.#accessToken === null){
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
          localStorage.removeItem("LoginManager.accessToken");
          this.onLogout();
        }
        
      }
      onLogin(){
        LoginManager.loggedIn = true;
        
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
                  this.#accessToken = out.token;
                  this.#id = out.id;
                  this.#name = out.name;
                  localStorage.setItem("LoginManager.accessToken",this.#accessToken);
                  localStorage.setItem("LoginManager.id",this.#id);
                  localStorage.setItem("LoginManager.name",this.#name);
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
    
      authfetch(url,options={}){
        var newUrl = url;
        if (!url.startsWith("http")){
          newUrl = apiHost+url;
        }
        var newOptions = Object.assign({mode: 'cors'},options);
        let val = false;
        if (newOptions.body instanceof FormData){
          for (var pair of newOptions.body.entries()){
            if (pair[1] instanceof File){
              val = true
            }
          }
        }
    
        newOptions.headers = {
          "Authorization": "Bearer "+localStorage.getItem("LoginManager.accessToken"),

          ...options.headers}//enter token here

        return fetch(newUrl,newOptions)
      }
      async getJson(fetchObject){
    
        let response = await fetchObject;
    
        if(response.status===401){
          history.push("/login");
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
        try{
          console.log("making post request");
          let res = null;
          if (requestBody instanceof FormData){
            let res = await this.getJson(this.authfetch(url,{method:"POST",body:requestBody}));
          }else if(res){
            return res;
          }else{
            let res = await this.getJson(this.authfetch(url,{method:"POST",body:JSON.stringify(requestBody)}));
          }
          if(res ==="RELOGIN"){
            this.logout();
          }else{
            return res;
          }
        } catch (error){
          console.error("Error in post request: ", error); 
          throw error;
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