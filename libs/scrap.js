//import DomSelector from 'react-native-html-parser';
//import {Translation} from "react-native-essential-tools";
import {Scrap_tools} from "react-native-essential-tools";

class Scrap extends Scrap_tools{

  constructor(isWeb) {
    super();
    this.error = null;
    this.html="";
    this.isWeb = isWeb==undefined || isWeb==null? 1 : isWeb;
    this.img_q = "410w";
    this.game_status = {
        "0":"ok", 
        "1":"Postboned", 
        "2":"Canceled", 
        "3":"Stopped"
    };

  }
  get_article(html){
    
    if(html == null || !html || !html.match){return []}

  
    const arr_end = '\\"\\"\\);';
    let patttern_body = /var\s*article_content\s*=\s*".*/gi;
    let m = html.match(patttern_body);
    let body = m && m.length>0 ? m[0].replace(/\\"/g,"'") : "";
    body = body.split('"').length>1 ? body.split('"')[1] : "Error";
    //body = body.replace("<p");
    const article = {}
    article.related        = this.get_var_array(html, "article_links",arr_end);
    article.related_news   = this.get_var_array(html, "article_related",arr_end);
    article.related_images = this.get_var_array(html, "article_images",arr_end);
    article.date           = this.get_var(html,"he_article_date");
    article.title_news     = this.get_var(html,"he_article_title");
    article.author         = this.get_var(html,"he_article_author");
    article.body           = body;
    article.author_cc      = "";

    article.related      = article.related    .map(n=> {return {related_link:n[0],related_title:n[1],url:n[0]} });
    article.related_news = article.related_news.map(n=> {return {related_news_id:n[0],related_news_title:n[1]} });
    article.related_images = article.related_images.map(n=> {return {img_link:n[0].replace(/^\/\//,"https://"),img_desc:n[1]} });
    //article.news =this.get_var_array(html, "news");
    article.body = this.decodeEntities(article.body);
    
    article.date = article.date && article.date.slice && article.date.slice(0,1) =='#' ? this.get_date2(new Date(article.date.replace("#","") * 1000)) : article.date ;

    return article;
  }
  get_matche_k(resp,date){
    
    let matche_dets = this.get_matches(resp,date,true);
    const league_name = matche_dets && matche_dets.length==1 && matche_dets[0]["title"] ? matche_dets[0]["title"] :"";
    let match_details = matche_dets && matche_dets.length==1 && matche_dets[0]["data"] && matche_dets[0]["data"].length==1 ? matche_dets[0]["data"][0] : false;
    if(match_details==false){return [];}
    let details_dict = this.parse_details(match_details['details']);
    let home_players_events_dict = this.parse_details(match_details['home_scorers']);
    let away_players_events_dict = this.parse_details(match_details['away_scorers']);
    /// chanels
    if(details_dict["r"] && details_dict["r"].length>0 && details_dict["r"][0].length >2 ){
      match_details["referee"] = details_dict["r"][0][2];
    }
    if(details_dict["l"] && details_dict["l"].length>0){
      let channels = [];
      for(let i=0; i<details_dict["l"].length;i++){
        const commentator = details_dict["l"][i].length >=4 && details_dict["l"][i][4] ? details_dict["l"][i][4] : "";
        channels.push({id:details_dict["l"][i][1] , en_name:details_dict["l"][i][2] ,"is_koora":true, commentator:commentator});
      }
      match_details["channels"] = channels
    }
    /// staduim
    if(details_dict["a"] && details_dict["a"].length>0){
      match_details["stadium"] = details_dict["a"][0] && details_dict["a"][0].length >=3 ? details_dict["a"][0][3] : "";
      match_details["stadium"] = details_dict["a"][0] && details_dict["a"][0][5]
      ? details_dict["a"][0][5]+" | "+match_details["stadium"] : match_details["stadium"];
    }
    if(details_dict["s"] && details_dict["s"].length>0){
      const m_status = details_dict["s"] && details_dict["s"][0] ? details_dict["s"][0][1] : details_dict["s"][0];
      match_details["match_status"] = m_status && this.game_status[m_status] ? this.game_status[m_status] : m_status;
    }
    // league name
    match_details["league"] = league_name;
    // scorers
    let scorers = [];
    let cards = [];
    const goal_keys = ["p","g","o"];
    for(let k=0;k<goal_keys.length;k++){
      const key_ = goal_keys[k];
      const scrorers_home = this.get_scorers_details("home",home_players_events_dict,key_);
      const scrorers_away = this.get_scorers_details("away",away_players_events_dict,key_);
      scorers = scorers.concat(scrorers_home).concat(scrorers_away);
    }
    const cards_keys = ["y","r"];
    for(let k=0;k<cards_keys.length;k++){
      const key_ = cards_keys[k];
      const cards_home = this.get_cards("home",home_players_events_dict,key_);
      const cards_away = this.get_cards("away",away_players_events_dict,key_);
      cards = cards.concat(cards_home).concat(cards_away);
    }
    match_details["goal_scorer"] = scorers;
    match_details["cards"] = cards;
    match_details["round"] = details_dict["o"] && details_dict["o"].length>0 ? "الجولة "+details_dict["o"][0][1] : "-" ;
    match_details["round"] = match_details["round"]=="-" && details_dict["w"] && details_dict["w"].length>0 ? "الأسبوع "+details_dict["w"][0][1] : match_details["round"] ;
    match_details["phase"] = details_dict["e"] && details_dict["e"].length>0 ? details_dict["e"][0][2] : "-" ;
    match_details["group"] = details_dict["sl"] && details_dict["sl"].length>0 ? details_dict["sl"][0][1] : "-" ;

    match_details["retour_score"] = details_dict["sl"] && details_dict["sl"].length>0 ? 
    match_details["away_team"]+" "+details_dict["sl"][0][2] + " - " +details_dict["sl"][0][1]+" "+match_details["home_team"] : "-" ;
    if(details_dict["no"] && details_dict["no"][0] && details_dict["no"][0][1]){
      match_details["desc"] = details_dict["no"][0][1];
    }
    return match_details;
  }
  get_scorers_details(_type,events_dict,key){
    let scorers = []
    if(events_dict[key] && events_dict[key].length>0){
      for(let i=0;i< events_dict[key].length;i++){
        let scorer = {"home_scorer":"","home_assist":"","away_scorer":"","away_assist":"","time":"", "player_id":0};
        scorer[`${_type}_scorer`] = events_dict[key][i][3];
        scorer["time"] = events_dict[key][i][1];
        scorer["type"] = key;
        scorer["player_id"] = events_dict[key][i][2];
        scorer["player_name"] = events_dict[key][i][3];
        scorer["team"] = _type;

        scorer["time"] = !isNaN(scorer["time"]) ? parseInt(scorer["time"]) : scorer["time"];

        scorers.push(scorer);
      }
    }
    return scorers;
  }
  get_cards(_type,events_dict,key){
    let scorers = []
    if(events_dict[key] && events_dict[key].length>0){
      for(let i=0;i< events_dict[key].length;i++){
        let scorer = {};
        scorer[`${_type}_scorer`] = events_dict[key][i][3];
        scorer["player_name"] = events_dict[key][i][3];
        scorer["team"] = _type;
        scorer["time"] = events_dict[key][i][1];
        scorer["type"] = key;
        scorer["player_id"] = events_dict[key][i][2];
        scorer["time"] = !isNaN(scorer["time"]) ? parseInt(scorer["time"]) : scorer["time"];
        scorers.push(scorer);
      }
    }
    return scorers;
  }
  get_standing(html){
    let json_={"match_squads":[]};
    try{
      json_ = JSON.parse(html);
    }catch(err){console.log(err);return [];}
    let standing =[];
    if(json_ && json_["ranks_table"] && JSON.stringify(json_["ranks_table"])==JSON.stringify([-1]) ){
      notifyMessage("empty");
      return standing;
    }
    const backgrounColor_alpha = "80";
    const standing_header_ = [
      "table_r",
      "backgroundColor",
      "position",
      "team",
      "played",
      "info_2",//"wins",
      "draws",
      "loses",
      "rest",
      "goals_scored",
      "goals_received",
      "goals_difference",
      "points",
      "i",
      "last_matches_res"
    ];
    const standing_header_cc = [
      "table_r",
      "backgroundColor",
      "position",
      "team",
      "c_code",
      "played",
      "info_2",//"wins",
      "draws",
      "loses",
      "rest",
      "goals_scored",
      "goals_received",
      "goals_difference",
      "points",
      "i",
      "last_matches_res"
    ];
    const standing_info_header=[
      "table_r",
      "background_1",
      "desc_1",
      "background_2",
      "desc_2",
      "background_3",
      "desc_3",
      "background_4",
      "desc_4",
      "background_5",
      "desc_5",
    ]
    let h =0;
    let team_st = {};
    let group_name=false;
    json_["ranks_table"] = json_["ranks_table"] ? json_["ranks_table"] : [];
    let standing_header = standing_header_;
    
    for(let i=0;i< json_["ranks_table"].length;i++){
      try{
        if(standing.length==0 && h==4 && json_["ranks_table"][i].includes("~") ){
          standing_header = standing_header_cc;
        }
        if(h==0 && json_["ranks_table"][i-1]=="g"){
          group_name = json_["ranks_table"][i];
          continue;
        }
        if(team_st["table_r"]=="x" &&  (["o","l","e"].includes(json_["ranks_table"][i]) || json_["ranks_table"].length-1 == i)  ){
          standing.push(team_st);
          h=0;
          team_st={};
        }
        if(team_st["table_r"]=="x"){
          team_st [ standing_info_header[h] ] = json_["ranks_table"][i];
          h++;
          continue
        }
        if(h==0 && ["r","x"].includes(json_["ranks_table"][i])==false){
          continue;
        }

        team_st [ standing_header[h] ] = json_["ranks_table"][i];
        h++;
        if(team_st["team"] && (h==standing_header.length || ["r","g"].includes(json_["ranks_table"][i+1])) ){
          //team_st["subs_in_time"] = team_st["subs_in_time"]+""
          if(h<standing_header.length){
            team_st["goals_received"] = team_st["goals_scored"];
            team_st["goals_scored"] = team_st["rest"];
            team_st["points"] = team_st["goals_difference"];
            team_st["goals_difference"] = team_st["goals_received"];
          }
          let team = team_st["team"] && team_st["team"].split  ? team_st["team"].split("~") : team_st["team"];
          team = team.length>=4 ? team : ["","",team.join(""),team.join("")];
          team_st["played"] = team_st["played"].includes("~") ? team_st["info_2"] : team_st["played"];

          team_st["team"] = {"id":team[2],"team_name":team[3],"team_badge":""};
          team_st["team_name"] = team_st["team"]["team_name"];
          team_st["team_badge"] = team_st["team"]["team_badge"];
          team_st["overall_league_position"] = parseInt(team_st["position"])         >0 ? parseInt(team_st["position"])         : 0 ;
          team_st["overall_league_PTS"]      = parseInt(team_st["points"])           >0 ? parseInt(team_st["points"])           : 0 ;
          team_st["overall_league_payed"]    = parseInt(team_st["played"])           >0 ? parseInt(team_st["played"])           : 0 ;
          team_st["overall_league_GF"]       = parseInt(team_st["goals_scored"])     >0 ? parseInt(team_st["goals_scored"])     : 0 ;
          team_st["overall_league_GA"]       = parseInt(team_st["goals_received"])   >0 ? parseInt(team_st["goals_received"])   : 0 ;
          team_st["overall_league_GD"]       = parseInt(team_st["goals_difference"]) >0 ? parseInt(team_st["goals_difference"]) : 0 ;
          if(team_st["backgroundColor"]){
            team_st["backgroundColor"] = team_st["backgroundColor"]+backgrounColor_alpha;
          }
          if(group_name){
            if(standing.length>0 && Object.keys(standing[standing.length-1])[0] == group_name){
              standing[standing.length-1][group_name].push(team_st);
            }else{
              const st = {};
              st[group_name] = [team_st,];
              standing.push(st);
            }
          }else{
            standing.push(team_st);
          }
          h=0;
          team_st={};
        }
      }catch(err){console.log(team_st, err)}
    }
    return standing;
  }
  get_matches_stages(headers){
    const stages = [];
    for(let i=0;i<headers.length;i+=4){
      if(headers[i]=="" || headers[i]==undefined || headers[i+1]==undefined){
        continue;
      }
      const max_id = headers[i+3+4] ? headers[i+3+4] : 0;
      stages.push({ name : headers[i], link : headers[i+1], info : headers[i+2], min_id : headers[i+3] , max_id : max_id })
    }
    return stages;
  }
  get_matches(html,date,is_oneMatch=false,is_only_live=false, ignoreBL=false){
    let json_={"matches_comps":[],"matches_list":[], "headers":[]};
    try{
      json_ = JSON.parse(html);
    }catch(err){return -1;}
    const date_str = date ? this.get_date2(date): false;
    //parse matches_comps
    const FILTERING = this.filtering;
    const blacklisted_comps = is_oneMatch || FILTERING==false ? [] : ["الدرجة الثانية","الدرجة الثالثة","الهواة","سيدات","الدرجة الخامسة","الدرجة الرابعة","رديف","جنوب",
    " الثاني","تحت ","شمال","الثالث"," A ", " B ", " C "," D ","الدرجة D","الدرجة C","الدرجة B",
    "الدوري النرويجي الدرجة"
  ]
    const hidden_leagues = is_oneMatch || FILTERING==false ? [] : [];
    const blacklisted_countries = is_oneMatch || FILTERING==false ? [] :  ["SA","BH","KW","IQ","PS","ND","AR","BR","CO","JO","SS","VN","ZA","TR","UZ"];
    const exceptions = ["افريقيا","مباريات دولية ودية"];
    let compititions = {};
    let compititions_bl = {};
    let compitition = {"country":""};
    
    const comp_header = ["divider","league_id","comp_name","comp_logo","comp_id_news","options"];
    const MIN_ALLOWED_OPTIONS = is_oneMatch || FILTERING==false ? 1 : 3;
    let k = 0;
    if(json_==undefined || json_["matches_comps"] == undefined ){
      return false;
    }
    const matches_stages = json_["headers"] ? this.get_matches_stages(json_["headers"]) : false;
    for(let i=0;i< json_["matches_comps"].length;i++){
      compitition[ comp_header[k] ] = json_["matches_comps"][i];
      if(comp_header[k]=="comp_logo" && compitition[ comp_header[k] ].length<=3){
        compitition[ "country" ] = compitition[ comp_header[k] ];
        compitition[ comp_header[k] ] = "//o.kooora.com/f/"+compitition[ comp_header[k] ]+".png";
      }
      //o.kooora.com/f/QA.png
      k++;
      if(comp_header.length==k){
        let is_allowed = true;
        for(let x=0;x<blacklisted_comps.length;x++){
          if(compitition["comp_name"].toLocaleLowerCase().indexOf(blacklisted_comps[x].toLocaleLowerCase())>=0){
            is_allowed = false;
          }
        }

        is_allowed = compitition["options"].length>=MIN_ALLOWED_OPTIONS ? is_allowed : false;
        compitition["comp_name"] = compitition["comp_name"].replace("القسم الأول","").replace("إنوي","").replace("الدرجة الاولى","").replace("الممتاز","").replace("الإحترافية","").replace("القسم الثاني","2").replace("الدرجة الأولى","").replace("الدرجة A","").replace("البطولة المغربية","الدوري المغربي").trim();
        compitition["comp_name"] = compitition["comp_name"].replace("-","").trim();
        if((compitition["comp_name"].indexOf("الأوروبي")>=0 || compitition["comp_name"].indexOf("أوروبا"))>=0 && compitition["country"]==""){
          compitition["country"]="EURO";
        }
        if((compitition["comp_name"].indexOf("الأفريقية")>=0 || compitition["comp_name"].indexOf("أفريقيا"))>=0 && compitition["country"]==""){
          compitition["country"]="AFRICA";
        }
        for(let x=0;x<exceptions.length;x++){
          if(compitition["comp_name"].toLocaleLowerCase().indexOf(exceptions[x].toLocaleLowerCase())>=0){
            is_allowed = true;
          }
        }
        if(blacklisted_countries.includes(compitition["country"]) || compitition["options"].includes("h")){
          is_allowed = false;
        }
        const league_id = parseInt(compitition["league_id"]) ;
        const is_league_hidden = hidden_leagues.includes(league_id);
        is_allowed = is_allowed && !is_league_hidden;
        is_allowed = is_allowed || ("MA"==compitition["country"] && !is_league_hidden) || FILTERING==false ;
        if(is_allowed){
          compititions[compitition["league_id"]] = compitition;
        }else{
          compititions_bl[compitition["league_id"]] = compitition;
        }

        //console.log(compitition);
        compitition = {"country":""};
        k=0;
      }
    }
    // parse matches_list
    const mat_header = ["league_id",
"com_id_page",
"id_1",
"id",
"datetime",
"inf_1",
"time",
"home_team_id",
"home_team_status",
"home_team",
"home_scorers",
"score",
"away_team_id",
"away_team_status",
"away_team",
"away_scorers",
"inf_7",
"inf_8",
"inf_9",
"details"]

    let matches = {};
    let matches_bl = {};
    let matche = {};
    let j = 0;
    let is_ok = true;
    let live = 0, is_done=0;
    let time_playerd=0;
    for(let f=0;f< json_["matches_list"].length;f++){
      matche[ mat_header[j] ] = json_["matches_list"][f].trim ? json_["matches_list"][f].trim() : json_["matches_list"][f];
      matche[ mat_header[j] ] = this.decodeEntities(matche[ mat_header[j] ]);
      if(mat_header[j]=="time"){
        //is_ok = matche[ mat_header[j] ].indexOf("$f")>=0 ? false : true;
        matche[ "time_old" ] = matche[ mat_header[j] ];
        live = matche[ mat_header[j] ].indexOf("@")>=0 || matche[ mat_header[j] ].indexOf("تبدأ قريبا")>=0  ? 1 : 0;
        is_done = matche[ mat_header[j] ].indexOf("$f")>=0 ? 1 : 0;
        matche[ mat_header[j] ] = matche[ mat_header[j] ].replace(/[^0-9\:]/g,"");
        matche[ mat_header[j] ] = matche[ mat_header[j] ].slice(0,5)
        try{
          matche.datetime = this.get_date_time(new Date(matche.datetime*1000));
          matche[ "date" ]= matche.datetime.split(" ")[0];
          matche[ "time" ]= matche.datetime.split(" ")[1];
          if(date_str && date_str != matche[ "date" ]){
            is_ok = false;
          }
          const _time_playerd = this.convert_time_spent(matche.date + " "+matche.time);
          time_playerd = matche[ "time_old" ].split("'").length==2 && matche[ "time_old" ].split("'")[0].length<=2 
            ? parseInt(matche[ "time_old" ].split("'")[0])
            : _time_playerd;
          //time_playerd = live==0 && parseInt(time_playerd)>0 && parseInt(time_playerd)<90 ? 45 : time_playerd;
          //live = (time_playerd+"").toLocaleLowerCase()=="half" || (parseInt(time_playerd)>=-30 && parseInt(time_playerd)<95) ? 1 : live;

          if(live==1 && time_playerd!=false && is_done==0){
            matche["time_played"] = matche[ "time_old" ].includes("$p") ? "Pen" :time_playerd;
            matche["live"] = live;
          }else if( is_done &&  live==0){
            matche["is_done"] = true;
          }
          
        }catch(err){console.log("Error",err)}
      }
      if( ["home_team","away_team"].includes(mat_header[j]) ){
        matche[ mat_header[j] ] = matche[ mat_header[j] ].split("-")[0].trim();
      }

      //if(f==300)break;
      j++;
      if(mat_header.length==j){
        const is_bl = compititions_bl[matche["league_id"]] && compititions[matche["league_id"]]==undefined ? true : false;
        const comp_match = is_bl ? compititions_bl[matche["league_id"]] : compititions[matche["league_id"]] ;
        if(is_only_live==false || (matche["live"]==1 && is_only_live) ){
          if(comp_match!=undefined && is_ok ){
            let league = {
              "title": comp_match["comp_name"].trim(), 
              "id":matche["league_id"],
              "img":comp_match["comp_logo"].replace("//","https://"), 
              "data":[],
              "country":comp_match["country"],
              "is_koora":true,
              "options" : comp_match["options"],
            };
            if(matches[ matche["league_id"] ]==undefined && !is_bl){
              matches[ matche["league_id"] ] = league;
            }
            if(matches_bl[ matche["league_id"] ]==undefined && is_bl){
              matches_bl[ matche["league_id"] ] = league;
            }
            const score_p = matche["score"].split("~")
            matche["score"] = score_p[0].trim();
            matche["score_penalties"] = score_p.length>1 && score_p[1] ?  score_p[1].trim().replace("&nbsp;","") :false;
            if(matche["score_penalties"]){
              const score_penalties = matche["score_penalties"].split(":");
              matche["home_team_score_penalties"] = score_penalties && score_penalties.length ==2 ? score_penalties[0].trim() : "-";
              matche["away_team_score_penalties"] = score_penalties && score_penalties.length ==2 ? score_penalties[1].trim() : "-";
            }
            const score = matche["score"].split("|");
            matche["home_team_score"] = score && score.length ==2 ? score[0] : "-";
            matche["away_team_score"] = score && score.length ==2 ? score[1] : "-";
            matche["league"] = league["title"];
            matche["status"] = "-";
            if(matche[ "time_old" ].includes("@")){
              matche["status"]="Live" ;
            }else if(matche[ "time_old" ].includes("$f")){
              matche["status"]="Finished" ;
            }else if(matche[ "time_old" ].includes("$n")){
              matche["status"]="Not Started Yet" ;
            }
            matche.is_koora = true;
            matche.league_img = comp_match && comp_match["comp_logo"] ? comp_match["comp_logo"].replace("//","https://") : null;
            if(matches_stages && matches_stages.map){
              matches_stages.map(s=>{
                if(s.min_id<=matche.id && (s.max_id>matche.id ) ){
                  matche.stage = s;
                  return false;
                }
              });
              if(matche.stage==undefined){
                matche.stage = JSON.parse(JSON.stringify(matches_stages[0]));
              }
              /*
              const parsed_details = this.parse_details(matche["details"]);
              matche.stage.name = parsed_details.g ? parsed_details.g : matche.stage.name;
              */
            }
            if(is_bl){
              matches_bl[ matche["league_id"] ]["data"].push(matche);
            }else{
              matches[ matche["league_id"] ]["data"].push(matche);
            }
          }
        }
        is_ok = true;
        live = 0;
        is_done = 0;
        matche = {};
        j=0;
        time_playerd=0;
      }
    }
    matches = Object.values(matches) ;
    matches_bl = Object.values(matches_bl) ;
    const periority_cc= ["AFRICA","MA","US","NL","DE","FR","ES","IT","EN","EURO"];
    matches = matches.sort((a,b)=>{return periority_cc.indexOf(a["country"]) >= periority_cc.indexOf(b["country"])? -1 : 1;});
    //matches = matches.sort((a,b)=>{return a["country"]=="MA"? -1 : 1;});
    return matches;
  }
  get_scorers(html,scorers=undefined){
    let scorers_details = [];
    if(scorers){
      scorers_details = scorers;
    }else{
      scorers_details = this.get_var_array(html,"scorers_details", '-1,-1\\s*\\);');
    }
    
    const header = [
      "goals",
      "goals_pn",
      "goals_pn_wasted",
      "goals_fiend",
      "ycards",
      "rcards",
      "player_id",
      "info_1",
      "player_number",
      "player_name_ar",
      "player_name_en",
      "team_id",
      "team_name",
      "info_2",
      "info_3",
      "info_4",
      "info_5",
      "info_6",
      "info_7",
      "info_8",
      "info_9",
      "info_10",
      "info_11",
    ];
    let final_out = [];
    try{
      for (let i=0; i<scorers_details.length;i++){
        if(scorers_details[i][0]==-1){continue;}
        let row = {};
        //continue;
        for (let h=0; h<scorers_details[i].length;h++){
          row[header[h]] = scorers_details[i][h];
        }
        final_out.push(row);
      }
    }catch (e){console.log(e);}
    return final_out.slice(0,50);
  }

  get_news(html, news=undefined){
    if(!news | news==undefined){
      news = this.get_var_array(html, "news");
    }
    let out_list = []; 
    for (let i=0; i<news.length;i++){
      let line = news[i];
      
      let img = this.isWeb==false && line[3] && line[3].replace && line[3].slice(0,2)=="//" ? line[3].replace("//","https://") : line[3];
      let date = line[2];
      try {
        date = date && date.slice && date.slice(0,1) =='#' ? this.get_date2(new Date(date.replace("#","") * 1000)) : date ;
      } catch (error) {}
      out_list.push({link:line[1], date:date, img:img, title_news:line[4], desc:line[5],});
    }
    return out_list;
  }
  get_head2head(html){
    let head2head_matches = this.get_var_array(html, "head2head_matches" , '-1,\\"\\"\\);');
    let head2head = [];
    /*
    for (let i=0; i<head2head_matches.length;i++){
      let line = head2head_matches[i];
      head2head.push({"img": "","league_name": this.removeHtml(line[2]), id:line[0],koora_id:line[0]});
    }*/
    return head2head_matches;
  }

  get_team(html){
    let infos = {
      "team_id":"",
      "team_type":"",
      "team_name_ar":"",
      "team_name_en":"",
      "team_sport":"",
      "team_class":"",
      "team_country":"",
      "team_url":"",
      "team_flag":"",
      "team_year_established":"",
      "team_year_closed":"",
      "team_team_merged_into":"",
      "team_logo":"",
      "team_group_photo":"",
      "team_dress_home":"",
      "team_dress_away":"",
      "team_info":"",
      "team_info2":"",
      "comps":"array",
      "squad_club":"array",
      //"news":"array",
      "transfers":"array",
      
      "squad_club":"array",
    }
    for(let i=0;i<Object.keys(infos).length;i++){
      const k = Object.keys(infos)[i];
      infos[k] = infos[k]=="array" ? this.get_var_array(html, k) : this.get_var(html, k);
    }
    return infos;
  }
  get_player(html){
    let infos = {
      "player_id":"",
      "player_sport":"",
      "player_gender":"",
      "player_position":"",
      "player_name_en":"",
      "player_nickname_ar":"",
      "player_photo":"",
      "player_nationality":"",
      "player_nationality_flag":"",
      "player_team_id":"",
      "player_team_name":"",
      "player_teamcountry":"",
      "player_weight":"",
      "player_height":"",
      "player_birthdate":"",
      "player_career":"",
      "transfers":[],
    }
    for(let i=0;i<Object.keys(infos).length;i++){
      const k = Object.keys(infos)[i];
      infos[k] = typeof infos[k] == "string" ? this.get_var(html, k) : this.get_var_array(html, k);
      if(k=="player_position"){
        infos[k] = _API.player_positions[infos[k]];
      }
      if(k=="player_photo" && infos[k].slice(0,2)=="//"){
        infos[k]  = infos[k] .replace("//","https://");
      }
      if(k=="player_birthdate"){
        try {
          infos[k] = infos[k] && infos[k].slice && infos[k].slice(0,1) =='#' ? this.get_date2(new Date(infos[k].replace("#","") * 1000)) : infos[k] ;
        } catch (error) {}
      }
    }
    return infos;
  }
}

export default Scrap;