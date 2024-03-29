import { Platform } from 'react-native';
import Scrap from "./scrap.js";
import {Base64} from "react-native-essential-tools";
import getUserAgent from './userAgent';

//const Platform = {OS:"ios"};

class API {
    constructor() {
        this.time_offset = (new Date()).getTimezoneOffset()/60;
        this.is_auth = false;
        this.running_calls = [];
        this.url_live_perm = "http://yallashoot.cloud/showiptv.json";
        this.url_live_list = 'http://yallashoot.cloud/tv.json';
        this.error = null;
        this.data = null;
        this.main_domain    = "goalzz.com";
        this.main_koora_domain="kooora.com";
        this.kooora_domain  = `https://${this.main_domain}/`;
        this.kooora_news    = `https://m.${this.main_domain}/?n=0&o=[cat]&arabic&pg=[pg]`;
        this.kooora_article = `https://m.${this.main_domain}/?[article_id]`;
        this.kooora_matches = `https://www.${this.main_domain}/?region=-1&area=[area]&dd=`;
        this.kooora_matches_live = `https://www.${this.main_domain}/?region=-1&area=6&dd=`;
        this.kooora_match   = `https://www.${this.main_domain}/?ajax=1&m=[id]`;
        this.kooora_team    = `https://m.${this.main_domain}/?team=[id]`;
        this.kooora_player  = `https://m.${this.main_domain}/?player=[id]`;
        this.kooora_squads  = `https://m.${this.main_domain}/?squads=[id]`;
        this.usingproxy = Platform.OS == 'web';
        this.isWeb = Platform.OS == 'web';
        if(this.isWeb){
          this.server_url = "https://imad.is-a.dev/imad_404/";
          this.proxy_post = `${this.server_url}.proxy2.php?url=`;
          this.proxy_get  = `${this.server_url}.proxy.php?url=`;
          this.proxy_scrp = `${this.server_url}scrp.php?url=`;
  
        }

        this.cc_url = `https://o.${this.main_koora_domain}/f/big/[cc].png`;
        this.cc_url_small = `https://o.${this.main_koora_domain}/f/[cc].png`;
        this.scraping_pages=false
        this.default_ua = "Mozilla/5.0 (iPhone14,3; U; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) Version/10.0 Mobile/19A346 Safari/602.1	";
        try {
          this.default_ua = getUserAgent();
        } catch (error) {console.log(error)}
        this.headers = {
          'Accept': 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
          'User-Agent': this.default_ua
        }
        this.player_positions={
          0:"Manager",
          1:"Gool-keeper",
          2:"Defense",
          3:"MidField",
          4:"Attack"
        };
        this.sport_types={
          0:'Football',
          1:'Basketball',
          2:'Handball',
          3:'voleyball',
          4:'Ice hockey',
          5:'-',
          6:'Tennis',
          7:'-',
          8:'Futsall',
        };
        this.sport_scoops={
          'l':'National',
          'o':'International',
        }
        this.matches_categories ={
          "0":"FootBall",
          "1":"Other",
          "6":"Palying now",
          "101":"Basketball",
          "103":"Voleyball",
          "106":"Tennis",
          "199":"Women competitions",
          "201":"Europ",
          "202":"Africa&Asia",
          "102":"Handball",
      };
      this.team_types= [
        " - ",
        "Club",
        "National team",
      ]
    }
    debugMsg(msg){
      console.log("debugMsg : "+msg)
    }
    showMsg(msg){
      console.log("showMsg : "+msg)
    }
    
    running_calls_remove(url){
        this.running_calls = this.running_calls.filter(u=>url!=url);
    }
    running_calls_add(url){
    this.running_calls.push(url);
    }
    running_calls_check(url){
    if( this.running_calls.includes(url) ){
        return false;
    }
    this.running_calls_add(url);
    return true;
    }

    
    
    async fetch(resource, options) {
        const { timeout = 8000 } = options;
        if(options && options.headers && options.headers["User-Agent"]==undefined){
          options.headers["User-Agent"]=this.default_ua;
        }
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        const response = await fetch(resource, {
          ...options,
          signal: controller.signal
        })
        .catch(err=>{
          if("AbortError" == err.name){
            throw "There is Issue with Network/Server!";
          }
          return err;
        });
        clearTimeout(id);
        return response;
      }

    http(url,method="GET",data=null,headers=null,is_json=false, use_proxy=false, force_origin=false){
      
        let configs = {
            method: method,
            headers: headers ? headers : this.headers,
        };
        if (data!=null){
          configs["body"] = data;
        }
        
        if( (this.isWeb || use_proxy) && force_origin!=true){
          if(url.split("scarp_").length==2){
            url = url.replace("scarp_","");
            const _url_enc = Base64.btoa(url);
            url = this.proxy_scrp+_url_enc;
          }else{
            const _url_enc = Base64.btoa(url);
            url = method=="GET" ? this.proxy_get+_url_enc : this.proxy_post+_url_enc; 
          }
        }
        return this.fetch(url, configs)
          .then(response => {
            try {
              let out = "";
              if(is_json && response && response.json){
                out = response.json();
              }else if(response && response.text){
                out = response.text();
              }
              if(out==""){
                let error_msg = "API->http : "+response;
                error_msg += "\nUrl : "+url;
                error_msg += "\nOptions : "+JSON.stringify(configs);
                this.debugMsg(error_msg,"warning");  
              }
              return out;
            } catch (error) {
              let error_msg = "API->http : "+(error.message ? error.message : error);
              error_msg += "\nUrl : "+url;
              error_msg += "\nOptions : "+JSON.stringify(configs);
              this.debugMsg(error_msg,"warning");
              return is_json ? [] : "" ;
            }
    
          }) 
          .catch(error => {
            let error_msg = "API->http : "+(error.message ? error.message : error);
            error_msg += "\nUrl : "+url;
            error_msg += "\nOptions : "+JSON.stringify(configs);
            this.debugMsg(error_msg,"warning");
            this.error = error;
            return "";
          });
    }
    get_cc_img(flag,small=false){
        return small ? this.cc_url_small.replace("[cc]",flag) : this.cc_url.replace("[cc]",flag) ; 
    }

    async get_news(news_id=0, page=0, ){

        this.scrap = new Scrap();
        let url = this.kooora_news.replace("[cat]",news_id).replace("[pg]",page);
        url = this.scraping_pages ? "scarp_"+url : url;
        let resp = await _Cache.get_api(url,"news");

        let scrap = new Scrap();
        scrap.isWeb = this.isWeb;
        let list = undefined;
        if(this.scraping_pages){
          try {
            list = JSON.parse(resp);
            list = scrap.get_news(resp, list.news);
            //list = list.news.map(line=>{ return {link:line[1], date:line[2], img:line[3].replace("//","https://"), title_news:line[4], desc:line[5],}; });
          } catch (error) {
            console.log(error);
            return [];
          }
        }else{
          list = scrap.get_news(resp);
        }
        if(url.includes("kooora.com")){
          let exist_list = [];
          list = list.filter(o=>{
            if(exist_list.includes(o.link) ){
              return false;
            }
            exist_list.push(o.link);
            return true;
          });
        }
        this.running_calls_remove(url);
        return list;
      }
    

    async get_article(link){
      if(link==undefined || link == null){
        return;
      }
      const url = this.kooora_article.replace("[article_id]",link);
      let resp = await _Cache.get_api(url,"article");
      try{
        let scrap = new Scrap();
        scrap.isWeb = this.isWeb;
        let article  = {};
        try {
          article  = scrap.get_article(resp) ;
        } catch (error) {console.log(error)}
        return article;
      }catch(err){console.log(err);}
      return []

    }
    add_favorite_teams_section(data){
      let fav_list = {"id":1,"title":"Favorite teams","img":"",data:[]};
      let added_fav_matches = [];
      for(let j=0;j<data.length;j++){
        for(let m=0;m<data[j]["data"].length;m++){
          const matche_f = JSON.parse(JSON.stringify(data[j]["data"][m]));
          const home_team_id = parseInt(matche_f["home_team_id"]) ? parseInt(matche_f["home_team_id"]) : 0 ;
          const away_team_id = parseInt(matche_f["away_team_id"]) ? parseInt(matche_f["away_team_id"]) : 0 ;
          if(added_fav_matches.includes(matche_f["id"])){
            continue;
          }
          /*
          if(_Favs.is_fav('matches',matche_f.id) ){
            added_fav_matches.push(matche_f["id"]);
            fav_list.data.push(matche_f);
          }else */
          if(_Favs.is_fav('teams',home_team_id) || _Favs.is_fav('teams',away_team_id)){
            added_fav_matches.push(matche_f["id"]);
            fav_list.data.push(matche_f);
          }
        }
      }
    
      data = fav_list.data.length>0 ? [fav_list,].concat(data) : data ;
      return data;
    }
    async get_matches(date_obj, is_only_live, area=0){
      let url = this.kooora_matches.replace("[area]",area);
      url = is_only_live ? this.kooora_matches_live: url;
      url +=date_obj.getDate()+"&mm="+(date_obj.getMonth()+1)+"&yy="+date_obj.getFullYear()+"&arabic&ajax=1";
      let resp = await _Cache.get_api(url,"matches");

      let scrap = new Scrap();
      scrap.isWeb = this.isWeb;
      let matches = [];
      //is_only_live = false;
      try {
        matches = scrap.get_matches(resp,date_obj,false, is_only_live);    
      } catch (e) { console.log(e);}
      matches = _Favs.prioritize_favorites("leagues",matches,"id");
      matches = this.add_favorite_teams_section(matches);
      return matches;//this.set_logos(matches);

      }
    
    async get_match(id){
        id = (""+id).replace("fav_","")
        const url = this.kooora_match.replace("[id]",id);
        let resp = await _Cache.get_api(url,"match");
        let scrap = new Scrap();
        scrap.isWeb = this.isWeb;
        let match = [];
        try {
          match = scrap.get_matche(resp,false,true);
        } catch (e) {console.log(e)}
        return match

    }
    


    async get_team(team_id){
      let url = this.kooora_team.replace("[id]", team_id);
      url = this.scraping_pages ? "scarp_"+url : url;
      let resp = await _Cache.get_api(url,"team");
      let res = [];
      if(this.scraping_pages){
        try {
          res = JSON.parse(resp);
        } catch (error) {
          console.log(error);
          return [];
        }
      }else{
        let scrap = new Scrap();
        scrap.isWeb = this.isWeb;
        res = scrap.get_team(resp);
      }
      let img_uri = res && res.team_group_photo ? res.team_group_photo : false;
      let img_logo_uri = res && res.team_logo ? res.team_logo : false;
      img_uri = img_uri && img_uri.slice(0,2)=="//" ? img_uri.replace("//","https://") : img_uri;
      img_logo_uri = img_logo_uri && img_logo_uri.slice(0,2)=="//" ? img_logo_uri.replace("//","https://") : img_logo_uri;
      img_logo_uri=res && res.team_type && res.team_type==2? this.get_cc_img(res.team_flag) : img_logo_uri;
      res.team_group_photo = img_uri;
      res.team_logo = img_logo_uri;
      if(img_logo_uri && img_logo_uri.split && img_logo_uri.split("?").length==2){
        res.l = "?"+img_logo_uri.split("?")[1];
      }
      res.team_country;
      if(res && (res.team_name_ar || res.team_name_en) ){
        //this.setTeam_logo_k(res,save_db);
        
      }else{
        console.log("not valide",res);
      }
      return res;
    }
    async get_player(player_id){
      let url = this.kooora_player.replace("[id]",player_id);
      url = this.scraping_pages ? "scarp_"+url : url;
      let resp = await _Cache.get_api(url,"player");
      if(this.scraping_pages){
        try {
          const player = JSON.parse(resp) ;
          player["player_position"] = player["player_position"] in this.player_positions ? this.player_positions[player["player_position"]] : player["player_position"];
          return player;
        } catch (error) {
          console.log(error);
          return [];
        }
      }
      let scrap = new Scrap();
      scrap.isWeb = this.isWeb;
      return scrap.get_player(resp);
    }
    async get_lineup(id){
      //https://www.kooora.com/?m=2469218&ajax=true
      let url = this.kooora_squads.replace("[id]",id);
      let resp = await _Cache.get_api(url,"match");
      let scrap = new Scrap();
      scrap.isWeb = this.isWeb;
      let lineup = [];
      try {
        lineup = scrap.get_lineup(resp);
      } catch (e) {}
      return lineup

    }
  
    async get_live_list(){
      let channels
      try {
        channels = await this.http(this.url_live_list,"GET",null,{},true); 
      } catch (error) {
        alert(error)
      }
      if(!channels){
        channels = await _Favs.LS.get_json("cache_live",[]);
      }else{
        await _Favs.LS.set("cache_live",channels);;
      }

      if(channels && channels.length){
        let id=1;
        channels = channels.map(l=>{
          l._id = ''+id;
          id=id+1;
          return l;
        });
      }
      channels = _Favs.prioritize_favorites("channels",channels,"name");
      return channels;
    }
    async saving_teams(){
      const team = await this.get_team(12);
      return;
      for (let i = 0; i < 100000; i++) {
        const team = this.get_team(i);
        this.fetch()
      }
    }
    async is_Live_allowed(){
      const res = await this.http(this.url_live_perm,"GET",null,{},true);
      if(res && res.length && res[0].display){
        return true;
      }
      return false;
    }
}


export default API;