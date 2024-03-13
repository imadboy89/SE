//import * as FileSystem from 'expo-file-system';


class Cache{
    constructor(){
        this.ttls={
            "leagues":60*60*60 *24,
            "platers":60*60*60 *24*30,
            "teams":60*60*60 *24*30,
            "news":60*30,
            "matches":60*2,
            "matche":60*2,
            "short":60*2,
            "long":60*60,
            "xlong":60*60*24,
        }
        if(_API.isWeb){return}
        this.cache_dir = FileSystem.cacheDirectory+"api/";
        this.FileSystem = require('expo-file-system');
        ensureDirExists();
    }
    async ensureDirExists() {
        const dirInfo = await this.FileSystem.getInfoAsync(this.cache_dir);
        if (!dirInfo.exists) {
          console.log("cache_dir directory doesn't exist, creating…");
          await this.FileSystem.makeDirectoryAsync(cache_dir, { intermediates: true });
        }
    }
    set = async (file_name,file_content) => {
        let fileUri = this.cache_dir + file_name;
        await this.FileSystem.writeAsStringAsync(fileUri, file_content);
    }

    async get(file_name,_type) {
        let fileUri = this.cache_dir + file_name;
        const fileInfo = await this.FileSystem.getInfoAsync(fileUri);
        const is_available = await this.is_file_available(fileInfo,_type);
        if (!fileInfo.exists || !is_available) {
            console.log("----- cached version")
          return false;
        }
        console.log("----- fresh version")
        return this.FileSystem.readAsStringAsync(fileUri);
    }
    url2filename(url){
        let _url = url.trim().split("/").pop();
        _url = _url.replace(/&/gi,"_");
        _url = _url.replace(/=/gi,"_");
        _url = _url.replace(/\//gi,"_");
        _url = _url.replace(/:/gi,"_");
        _url = _url.replace(/-/gi,"_");
        return _url;
    }
    async get_api(url,_type) {
        if(_API.isWeb){
            return this.http(url,"GET",null,{});
        }
        const file_name = this.url2filename(url);
        const file_chached = await this.get(file_name,_type);
        if(file_chached){
            return file_chached;
        }
        const fresh_data = await this.http(url,"GET",null,{});
        this.set(file_name, fresh_data);
        return fresh_data;
    }
    async is_file_available(fileInfo,_type){
        const now = (new Date()).getTime();
        fileInfo.modificationTime;
        const file_age = now-fileInfo.modificationTime;
        if(file_age>this.ttls[_type]){
            await this.FileSystem.deleteAsync(fileInfo.uri);
            return false;
        }else{
            return true;
        }
    }
}
export default Cache;