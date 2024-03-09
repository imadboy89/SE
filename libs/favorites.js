import LocalStorage from "react-native-essential-tools/libs/LocalStorage.js";

class Favorites {
    favorites_types=[
        "players",
        "teams",
        "leagues",
        "channels",
    ]
    constructor() {

        this.LS = new LocalStorage();
        this.init();
    }
    async init(){
        for(const fav of this.favorites_types){
            //this[fav] = await this.LS.set(fav, {});
            this[fav] = await this.LS.get_json(fav, {});

        }

        console.log("teams : ", this.teams);
        console.log("leagues : ", this.leagues);
    }
    format(id,name,img=undefined){
        return {id:id, name:name, img:img};
    }
    is_fav=(_type , id)=>{
        if(!this.check_type(_type)){
            return;
        }
        if(_type==undefined || id==undefined){
            console.log(`Fav : is_fav method require both args type and id : ${_type}-${id}`);
        }
        const _id =  typeof(id)=="object" ? id.id : id;
        //console.log("this[_type])",1 in typeof(this[_type]))

        return this[_type] && (_id in this[_type])?1:0;
    }
    toggle_favorite=(_type, item)=>{
        if(!this.check_type(_type)){
            return;
        }
        return this.set_favorite(_type, item, !(item.id in this[_type]));
    }
    check_type(_type){
        if (typeof(this[_type])!="object"){
            console.log(`Favorite type not found [${_type}] , available : teams:${this.teams} - leagues:${this.leagues}`)
            return false;
        }
        return true;
    }
    set_favorite=async (_type, item, add=true)=>{
        console.log("**",item)
        if(!isNaN(parseInt(item.id)) && parseInt(item.id)==item.id){
            item.id = parseInt(item.id);
        }
        if (!this.check_type(_type)){
            return false;
        }


        if(add === true ){
            if(this.is_fav(_type,item.id)){
                console.log(`Fav : id already favorite : ${_type}-${item.id} : ${this[_type]}`);
                return false;
            }
            this[_type][item.id] = item;
        }else{
            if(!this.is_fav(_type,item.id)){
                console.log(`Fav : id not favorite : ${_type}-${item.id} : ${this[_type]}`);
                return false;
            }
            delete this[_type][item.id];
        }
        console.log(`set Fav : ${_type} ${item.id} => ${add}`)
        if(typeof(this[_type])!="object"){
            alert("check log")
            console.log(`cannot save favorite, not object : ${this[_type]}`);
            return
        }
        await this.LS.set(_type, this[_type]);
        return true;
    }
    league_news(id){
        return `n=${id}`;
    }
    generate_chars(id){
        if(id==null){
            return
        }
        const chars2add_length = 7-id.toString().length;
        let chars2add="";
        for(let i=1;i<chars2add_length;i++){
            chars2add+="0";
        }
        return chars2add;
    }
    team_news(id){
        return `n1${this.generate_chars(id)}${id}`;
    }
    player_news(id){
        return `n3${this.generate_chars(id)}${id}`;
    }
    favorite_news(){
        let news_fav = [];
        for(let x in this.leagues){
            console.log("favorite_news",x)
            news_fav.push({link:_Favs.league_news(x),name:this.leagues[x].name });
        }
        for(let x in this.teams){
            news_fav.push({link:_Favs.team_news(x),name:this.teams[x].name });
        }
        for(let x in this.players){
            news_fav.push({link:_Favs.player_news(x),name:this.players[x].name });
        }

        return news_fav;
    }
    prioritize_favorites=(_type, data, key)=>{
        return data;
        if (!this.check_type(_type)){
            return false;
        }
        data = data.sort((a,b)=>{
            return (this[_type] && a[key] in this[_type] > b[key] in this[_type])?-1:1;
        });
        return data
    }

}

export default Favorites;

