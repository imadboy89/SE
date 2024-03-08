import LocalStorage from "react-native-essential-tools/libs/LocalStorage.js";

class Favorites {
    favorites_types=[
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
            this[fav] = await this.LS.get_json(fav, []);    
        }
    }
    is_fav=(_type , id)=>{
        return this[_type] && this[_type].includes(id)?1:0;
    }
    toggle_favorite=(_type, id)=>{
        return this.set_favorite(_type, id, !this[_type].includes(id));
    }
    set_favorite=(_type, id, add=true)=>{
        if(!isNaN(parseInt(id)) && parseInt(id)==id){
            id = parseInt(id);
        }
        if (this[_type]==undefined){
            console.log(`Favorite type not found [${_type}]`)
            return false;
        }
        if(add === true){
            this[_type].push(id);
        }else{
            this[_type] = this[_type].filter(e=>e!=id);
        }
        console.log(`set Fav : ${_type} ${id} => ${add}`)
        return this.LS.set(_type, this[_type]);
    }

}

export default Favorites;

