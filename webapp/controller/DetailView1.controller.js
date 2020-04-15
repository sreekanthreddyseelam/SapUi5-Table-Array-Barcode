sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Sorter",
	"sap/m/MessageBox",
	"com/de/Worklist/model/formatter"

], function (UIComponent, Controller, JSONModel, Sorter, MessageBox, formatter) {
	"use strict";
	return Controller.extend("com.de.Worklist.controller.DetailView1", {

		formatter: formatter,

		onInit: function () {
			var me = this;

			me.bundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
			//Table Data Model
			var data = {
				"Customerarray": [{
					"CustomerId": "1234",
					"CustomerName": "asdfg",
					"Location": "sdsd",
					"PostalCode": "54456",
					"valueStateCustID": "None",
					"valueStateTextCustID": "",
					"valueStateCustName": "None",
					"valueStateTextCustName": "",
					"valueStateCustLocation": "None",
					"valueStateTextCustLocation": "",
					"valueStateCustPostalCode": "None",
					"valueStateTextCustPostalCode": ""
				}]
			};
			var oTempModel = new sap.ui.model.json.JSONModel(data);
			this.getView().setModel(oTempModel, "oTempModel");

			//SliderModel

			var oSlider = {
				"SliderValue": 0

			};

			var oSliderModel = new sap.ui.model.json.JSONModel(oSlider);
			this.getView().setModel(oSliderModel, "oSliderModel");

			var odata = {
				"valueState": "None",

				"valueStateText": ""

			};
			var oContactmodel = new sap.ui.model.json.JSONModel(odata);
			this.getView().setModel(oContactmodel, "oContactmodel");

			me._oRouter = sap.ui.core.UIComponent.getRouterFor(me);
			me._oRouter.attachRouteMatched(me._handleRouteMatched, me);
		},

		_handleRouteMatched: function () {

		},
		//AddTablePress

		onAddTablePress: function (oEvent) {
			var data = {
				"CustomerId": "",
				"CustomerName": "",
				"Location": "",
				"PostalCode": "",
				"valueStateCustID": "None",
				"valueStateTextCustID": "",
				"valueStateCustName": "None",
				"valueStateTextCustName": "",
				"valueStateCustLocation": "None",
				"valueStateTextCustLocation": "",
				"valueStateCustPostalCode": "None",
				"valueStateTextCustPostalCode": ""
			};
			var oTablearray = this.getView().getModel("oTempModel").getData().Customerarray;
			oTablearray.push(data);
			this.getView().getModel("oTempModel").updateBindings(true);
		},

		onDeleteTableData: function (oEvent) {
			var oModel = this.getView().getModel("oTempModel");
			var currentPath = oEvent.getSource().getBindingContext("oTempModel").sPath;
			var currentpathvalue = currentPath.split("/")[2];
			var currentObject = oEvent.getSource().getBindingContext("oTempModel").getObject();
			var sCustId = currentObject.CustomerId;
			var sCustName = currentObject.CustomerName;
			var sCustLocation = currentObject.Location;
			var sCustPostalCode = currentObject.PostalCode;
			if (sCustId === "" || sCustName === "" || sCustLocation === "" || sCustPostalCode === "") {
				MessageBox.error("Please fill the complete details");
			} else {
				this._onDeleteCurrentValidInput(currentPath);
				MessageBox.success("Item is Successfully Deleted");
			}
			if (sCustId === "") {
				oModel.getData().Customerarray[currentpathvalue].valueStateCustID = "Error";
				oModel.getData().Customerarray[currentpathvalue].valueStateTextCustID = "Please Enter Customer ID";
				oModel.updateBindings(true);
			} else {
				oModel.getData().Customerarray[currentpathvalue].valueStateCustID = "None";
				oModel.getData().Customerarray[currentpathvalue].valueStateTextCustID = "";
				oModel.updateBindings(true);
			}
			if (sCustName === "") {
				oModel.getData().Customerarray[currentpathvalue].valueStateCustName = "Error";
				oModel.getData().Customerarray[currentpathvalue].valueStateTextCustName = "Please Enter Customer Name";
				oModel.updateBindings(true);
			} else {
				oModel.getData().Customerarray[currentpathvalue].valueStateCustName = "None";
				oModel.getData().Customerarray[currentpathvalue].valueStateTextCustName = "";
				oModel.updateBindings(true);
			}
			if (sCustLocation === "") {
				oModel.getData().Customerarray[currentpathvalue].valueStateCustLocation = "Error";
				oModel.getData().Customerarray[currentpathvalue].valueStateTextCustLocation = "Please Enter Customer Location";
				oModel.updateBindings(true);
			} else {
				oModel.getData().Customerarray[currentpathvalue].valueStateCustLocation = "None";
				oModel.getData().Customerarray[currentpathvalue].valueStateTextCustLocation = "";
				oModel.updateBindings(true);
			}
			if (sCustPostalCode === "") {
				oModel.getData().Customerarray[currentpathvalue].valueStateCustPostalCode = "Error";
				oModel.getData().Customerarray[currentpathvalue].valueStateTextCustPostalCode = "Please Enter Customer Postal Code";
				oModel.updateBindings(true);
			} else {
				oModel.getData().Customerarray[currentpathvalue].valueStateCustPostalCode = "None";
				oModel.getData().Customerarray[currentpathvalue].valueStateTextCustPostalCode = "";
				oModel.updateBindings(true);
			}
		},

		_onDeleteCurrentValidInput: function (currentPath) {
			var tablearray = this.getView().getModel("oTempModel").getData().Customerarray;
			var pathvalue = currentPath.split("/")[2];
			tablearray.splice(pathvalue, 1);
			this.getView().getModel("oTempModel").updateBindings(true);
		},

		onInputChange: function (oEvent) {

			var oInput = oEvent.getSource();

			this.getView().getModel("oTempModel").updateBindings(true);

		},

		// Contact Form Validation

		onContinue: function (oEvent) {

			var sInputIDD = this.getView().byId("emailInput").getValue();
			var sInputIDD1 = this.getView().byId("inputTel").getValue();

			if (sInputIDD === "") {
				this.getView().getModel("oContactmodel").getData().valueState = "Error";
				this.getView().getModel("oContactmodel").getData().valueStateText = "Please Enter details";

				this.getView().getModel("oContactmodel").updateBindings(true);
			} else {
				this.getView().getModel("oContactmodel").getData().valueState = "None";
				this.getView().getModel("oContactmodel").getData().valueStateText = "";

				this.getView().getModel("oContactmodel").updateBindings(true);
			}

			if (sInputIDD1 === "") {
				this.getView().getModel("oContactmodel").getData().valueState1 = "Error";
				this.getView().getModel("oContactmodel").getData().valueStateText = "Please Enter details";

				this.getView().getModel("oContactmodel").updateBindings(true);
			} else {
				this.getView().getModel("oContactmodel").getData().valueState1 = "None";
				this.getView().getModel("oContactmodel").getData().valueStateText = "";

				this.getView().getModel("oContactmodel").updateBindings(true);
			}

		},

		onTelNumChange: function (oEvent) {
			var oInput = oEvent.getSource();
			var val = oInput.getValue();
			val = val.replace(/[^\d]/g, '');
			oInput.setValue(val);
		},

		// slider function 

		onSlider: function (oEvent) {
			var oSlider1 = this.getView().byId("Slider1").getValue();
			var oSlider2 = this.getView().byId("Slider2").getValue();
			var slidervalue1 = parseInt(oSlider1);
			var slidervalue2 = parseInt(oSlider2);
			var result = slidervalue1 + slidervalue2;

			if (result <= 100) {
				this.getView().getModel("oSliderModel").getData().SliderValue = result;
				this.getView().getModel("oSliderModel").updateBindings(true);
			} else {
				this.getView().getModel("oSliderModel").getData().SliderValue = 0;
				this.getView().getModel("oSliderModel").updateBindings(true);
			}

			if (oSlider1 === "" || oSlider2 === "") {

				this.getView().getModel("oSliderModel").getData().SliderValue = 0;
				this.getView().getModel("oSliderModel").updateBindings(true);

			}

		},

		onHandleDialogOpen: function (oEvent) {
			var me = this;
			if (!this._oDialog) {
				this._oDialog = sap.ui.xmlfragment(
					"com.de.Worklist.fragment.OpenDialog",
					this
				);
				this.getView().addDependent(this._oDialog);
			}
			this._oDialog.open();
			setTimeout(function () {

				me.onOkPress();
			}, 3000);
		},

		onOkPress: function (oEvent) {
			this._oDialog.close();
		},

		onCancelPress: function (oEvent) {
			this._oDialog.close();
		}

	});
});