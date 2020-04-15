sap.ui.define([], function() {
	"use strict";
	return {
	onCityChangeState: function(ovalue){
		if(ovalue == "México D.F."){
			return "Error";
		}else if(ovalue == "London"){
			return "Success";
		}else{
			return "Warning";
		}
	},

onNumberChange: function(ovalue){
   return parseFloat(ovalue).toFixed(2);
	
	
}


	};
});