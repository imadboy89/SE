import * as SQLite from 'expo-sqlite';


export default class Teams {
    db_version="3.0";
    db_displayname="database";
    db_size=20000000;
    table_name="Teams_logos";


    fields_defenition = [
        "id INTEGER PRIMARY KEY",
        //"name text",
        //"name_ar text",
        "logo text",
    ];
    constructor() {
        this.fields_defenition_str = this.fields_defenition.join(",")
        this.database_path="SQLite/";
        this.db_name="teams.db";
        this.sqlDB = SQLite.openDatabase(this.db_name,this.db_version, this.db_displayname, this.db_size);
        //this.init_first()
    }
    async init_first(){
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
            return;
        }
        console.log("DB init ... !")

        const teams_dict = require("./teams_logos_db.js");


        for(k in teams_dict.default){
            k = parseInt(k);
            await this.addTeams(k,teams_dict.default[k]);
        }
        console.log("DB init ... done");
        

    }
    async addTeams(id,logo){
        const sqlQuery = `INSERT INTO ${this.table_name} VALUES(?,?)`;
        const readOnly = false;
        return await this.sqlDB.transactionAsync(async tx => {
            const result = await tx.executeSqlAsync(sqlQuery, [id,logo]);
            return true
            }, false);

    }
    async updateTeams(id,logo){
        const sqlQuery = `INSERT INTO ${this.table_name} VALUES(?,?) ON CONFLICT(id) DO UPDATE SET logo = excluded.logo`;
        const readOnly = false;
        return await this.sqlDB.transactionAsync(async tx => {
            const result = await tx.executeSqlAsync(sqlQuery, [id,logo]);
            console.log(result);
            return true
            }, false);

    }
    async get_teams_logo(ids){
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
        const sqlQuery = `DELETE * FROM ${this.table_name}`;
        await this.sqlDB.transactionAsync(async tx => {
          const result = await tx.executeSqlAsync(sqlQuery, [],null, null);

          return true

          }, false);
    }
}