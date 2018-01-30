/**
 * class to Validate CSV
 */
var CsvValidator = function() {
	/**
	 * validate csv
	 * @param  {Array} the CSV VALUES
     * @param  {Array} the CSV CONFIG FROM FIREBASE
     * @return {Json}  {result: boolean, error: string}	 
	 */
	 this.validate = function(csvValues,csvConfig) {
       var resultObj={}
 	   if(!this.checkColumnNumber(csvValues[0],csvConfig))
       {
         resultObj["result"]=false;
         resultObj["error"]="Please verified the number of column of your CSV file";
         return resultObj;
       }else if(!this.checkColumnMatch(csvValues[0],csvConfig)){
         resultObj["result"]=false;
         resultObj["error"]="The fields inside your CSV do NOT correspond to those agreed upon";
         return resultObj;
       }
       
       //if everything is fine
        resultObj["result"]=true;
        return resultObj;
       
 	};
  

    this.checkColumnNumber = function(csvHeader,csvConfig) {
      //the first row of csv is the HEADER 
      var csvHeaderLenght =csvHeader.length;
      //configuration HEADER length
      var confHeaderLength = Object.keys(csvConfig).length;;
      Logger.log(csvHeaderLenght);
      Logger.log(confHeaderLength);
      //if match return true, else return false
      return csvHeaderLenght===confHeaderLength ? true : false      
 	};
  
    this.checkColumnMatch = function(csvHeader,csvConfig) {
      //checkColumnNumber is called before this method, so we are sure that csvHeaderLenght=confHeaderLength
      var csvHeaderLenght =csvHeader.length;
      var label='';
      var result=true;
      
      for(var i=0;i<csvHeaderLenght;i++){
        label= csvHeader[i];
        //if csvConfig match csv header...continue, result is TRUE by default
        if(csvConfig[label]==i){
          continue;
        }
        //if csvConfig MISMATCH csv header... result=FALSE
        else{
          result=false;
          break;
        }
      }
 	   
      return result;
 	};

};
