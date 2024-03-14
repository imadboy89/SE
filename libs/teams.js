//import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { sleep } from 'react-native-essential-tools';


export default class Teams {
    db_version="3.0";
    db_displayname="database";
    db_size=20000000;
    table_name="Teams";


    fields_defenition = [
        "id INTEGER PRIMARY KEY",
        //"name text",
        //"name_ar text",
        "logo text",
    ];
    constructor() {
        this.is_db_loaded=false;
        if(_API.isWeb){
            return;
        }
        this.fields_defenition_str = this.fields_defenition.join(",")
        this.db_dir="SQLite/";
        this.db_name="teams_logos.db";
        this.db_path=`${this.db_dir}${this.db_name}`;
        this.db_assets_path = `../assets/${this.db_path}`;
        //this.init_first()
        
    }
    async init(){
        if(_API.isWeb){
            return;
        }
        //this.sqlDB = SQLite.openDatabase(this.db_name,this.db_version, this.db_displayname, this.db_size);
        this.openDatabase();
        //this.emptying();
    }
    async openDatabase(){
        const SQLite = require('expo-sqlite');
        const dir_uri = FileSystem.documentDirectory+this.db_dir;
        const db_uri = FileSystem.documentDirectory+this.db_path;
        const db_exists = (await FileSystem.getInfoAsync(dir_uri)).exists ;
        
        if (!db_exists) {
          await FileSystem.makeDirectoryAsync(dir_uri);
        }
        const fileInfo = await FileSystem.getInfoAsync(db_uri);
        if(!fileInfo.exists || fileInfo.size < 1000){
            const db = require("../assets/SQLite/teams_logos.db");
            console.log(db);
            const rr = await FileSystem.downloadAsync(
              Asset.fromModule(db).uri,
              db_uri
            );
        }
        /*
        //FileSystem.deleteAsync(db_uri);
        let files = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory+"SQLite");
        for (let file of files) {
            const fileInfo2 = await FileSystem.getInfoAsync(db_uri);
            console.log(".........",file,":",fileInfo2.size)
            //FileSystem.deleteAsync(FileSystem.documentDirectory+this.db_dir+file);
        }*/
        this.sqlDB =  SQLite.openDatabase("teams_logos.db");
        this.is_db_loaded=true;
        return true;
        }
    async init_first(){
        if(_API.isWeb){
            return false;
        }
        return this.openDatabase();

        const create_table_sql = 'CREATE TABLE IF NOT EXISTS '+this.table_name+' ('+this.fields_defenition_str+')' ;
        //this.executeSql(create_table_sql,[])
        await this.sqlDB.transactionAsync(async tx => {
        const result = await tx.executeSqlAsync(create_table_sql, []);
        }, false);
        let length_items=0;
        await this.sqlDB.transactionAsync(async tx => {
            const result = await tx.executeSqlAsync("select count(*) as ct from "+this.table_name, []);
            length_items = result &&  result.rows && result.rows.length &&  result.rows[0].ct? parseInt(result["rows"][0]["ct"]) : 0;
            }, false);
        if(length_items>100){
            console.log("DB ready!")
            return false;
        }
        console.log("DB init ... !")

        const teams_dict = require("./teams_logos_db.js");

        let count = 0;
        for(k in teams_dict.default){
            count+=1;
            if(count%2000 == 0){
                console.log("DB init .... "+count);
            }
            k = parseInt(k);
            await this.addTeams(k,teams_dict.default[k]);
        }
        console.log("DB init ... done");
        return true;

    }
    async addTeams(id,logo){
        if(_API.isWeb){
            return;
        }
        const sqlQuery = `INSERT INTO ${this.table_name} VALUES(?,?)`;
        const readOnly = false;
        return await this.sqlDB.transactionAsync(async tx => {
            const result = await tx.executeSqlAsync(sqlQuery, [id,logo]);
            return true
            }, false);

    }
    async updateTeams(id,logo){
        if(_API.isWeb){
            return;
        }
        const sqlQuery = `INSERT INTO ${this.table_name} VALUES(?,?) ON CONFLICT(id) DO UPDATE SET logo = excluded.logo`;
        const readOnly = false;
        return await this.sqlDB.transactionAsync(async tx => {
            const result = await tx.executeSqlAsync(sqlQuery, [id,logo]);
            return true
            }, false);

    }
    async get_teams_logo(ids){
        if(!this.sqlDB || !this.sqlDB.transactionAsync){
            await sleep(5);
        }
        if(_API.isWeb){
            return;
        }
        let result = {}; 

        let holders_symbol = [];
        for (let k = 0; k < ids.length; k++) {
          holders_symbol.push("?");
        }

      const sqlQuery = `SELECT * FROM ${this.table_name} WHERE id in (${holders_symbol})`;
      await this.sqlDB.transactionAsync(async tx => {
        result = await tx.executeSqlAsync(sqlQuery, ids);
        }, false);
        return result&&result.rows ? result.rows : result;

    }
    async get_all(){
        if(_API.isWeb){
            return;
        }
      const sqlQuery = `SELECT * FROM ${this.table_name} limit 10`;
        let result = {}; 
      await this.sqlDB.transactionAsync(async tx => {
        result = await tx.executeSqlAsync(sqlQuery, []);
        return result
        }, false);
        return result&&result.rows ? result.rows : result;

    }
    async get_team_logo(id){

    }
    async emptying(){
        const sqlQuery = `DELETE FROM ${this.table_name}`;
        await this.sqlDB.transactionAsync(async tx => {
          const result = await tx.executeSqlAsync(sqlQuery, [],null, null);

          return true

          }, false);
    }
}