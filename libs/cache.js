import * as FileSystem from 'expo-file-system';


class Cache{
    constructor(){
        this.ttls={
            "short":60*2,
            "meduim":60*60,
            "long":60*60*24,
            "default":60*60*24,
            "league":60*60*60 *24,
            "player":60*60*60 *24*30,
            "article":60*60*60 *24*30,
            "team":60*60*60 *24*30,
            "news":60*30,
            "matches":60*2,
            "match":60*2,
        }

        this.max_file_age=60*60*24*30;
        if(_API.isWeb){return}
        this.cache_dir = `${FileSystem.cacheDirectory}api_cache/`;
        this.FileSystem = FileSystem;
        //this.FileSystem = require('expo-file-system');
        this.clean();
    }
    async ensureDirExists() {
        const dirInfo = await this.FileSystem.getInfoAsync(this.cache_dir);
        if (!dirInfo.exists) {
          await this.FileSystem.makeDirectoryAsync(this.cache_dir, { intermediates: true });
        }
    }
    async clean(){
        await this.ensureDirExists();
        let files = await FileSystem.readDirectoryAsync(this.cache_dir);
        for (let file of files) {
            const fileUri = this.cache_dir + file;
            const fileInfo = await this.FileSystem.getInfoAsync(fileUri);
            const now = (new Date()).getTime()/1000;
            const file_age = fileInfo.exists ? now-fileInfo.modificationTime : 0;
            if(file_age>this.max_file_age){
                await this.FileSystem.deleteAsync(fileInfo.uri);
            }
        }
    }
    set = async (file_name,file_content) => {
        console.log("--- set "+file_name)
        let fileUri = this.cache_dir + file_name;
        //await this.FileSystem.deleteAsync(fileUri);
        await this.FileSystem.writeAsStringAsync(fileUri, file_content);
    }

    async get(file_name,_type) {
        console.log("--- get "+file_name)
        let fileUri = this.cache_dir + file_name;
        const fileInfo = await this.FileSystem.getInfoAsync(fileUri);
        const is_available = await this.is_file_available(fileInfo,_type);
        if (!fileInfo.exists || !is_available) {
            console.log("----- fresh version")
          return false;
        }
        console.log("----- cached version")
        return this.FileSystem.readAsStringAsync(fileUri);
    }
    url2filename(url){
        let _url = url.trim().split("/").pop();
        _url = _url.replace(/&/gi,"_");
        _url = _url.replace(/\?/gi,"");
        _url = _url.replace(/=/gi,"_");
        _url = _url.replace(/\//gi,"_");
        _url = _url.replace(/:/gi,"_");
        _url = _url.replace(/-/gi,"_");
        return _url;
    }
    async get_api(url,_type) {
        if(_API.isWeb){
            return _API.http(url,"GET",null,{});
        }
        const file_name = this.url2filename(url);
        const file_chached = await this.get(file_name,_type);
        if(file_chached){
            return file_chached;
        }
        const fresh_data = await _API.http(url,"GET",null,{});
        this.set(file_name, fresh_data);
        return fresh_data;
    }
    async is_file_available(fileInfo,_type){
        const now = (new Date()).getTime()/1000;
        const file_age = fileInfo.exists ? now-fileInfo.modificationTime : 0;
        ttl = this.ttls[_type] ? this.ttls[_type] : this.ttls["default"];
        console.log(`--- TTL ${_type}: ${file_age}  : ${this.ttls[_type]}   :${now} : ${fileInfo.modificationTime}`)
        if(this.ttls[_type] && fileInfo.exists && file_age<this.ttls[_type]){
            return true;
        }
        if(fileInfo.exists){
            await this.FileSystem.deleteAsync(fileInfo.uri);
        }
        return false;
    }
}
export default Cache;