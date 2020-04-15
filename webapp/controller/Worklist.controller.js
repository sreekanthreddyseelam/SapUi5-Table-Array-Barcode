sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Sorter",
	"sap/m/MessageBox",
	"com/de/Worklist/model/formatter"

], function (UIComponent, Controller, JSONModel, Sorter, MessageBox, formatter) {
	"use strict";
	return Controller.extend("com.de.Worklist.controller.Worklist", {
		formatter: formatter,
		onInit: function () {
			var me = this;

			me.bundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();

			var oProductsDataModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(oProductsDataModel, "oProductsDataModel");

			me._oRouter = sap.ui.core.UIComponent.getRouterFor(me);
			me._oRouter.attachRouteMatched(me._handleRouteMatched, me);
		},

		_handleRouteMatched: function () {
			var oProductsModel = this.getView().getModel("oProductsDataModel");
			$.ajax({
				url: "/destinations/northwind/V2/Northwind/Northwind.svc/Products",
				type: "GET",
				async: false,
				dataType: "json",
				contentType: "application/json",
				success: function (data, textStatus) {
					var odata = data.d;
					oProductsModel.setData(odata);
					oProductsModel.updateBindings(true);
				},

				error: function (oErr) {

				}

			});
		},
		onHandletablepress: function (oEvent) {
			var oCurrentObj = oEvent.getSource().getBindingContext("oProductsDataModel").getObject();
			//	var oCurrentPath = oEvent.getSource().getBindingContext("oProductsDataModel").getPath();
			this.getOwnerComponent().getModel("oProductDetailModel").setData(oCurrentObj);
			//	this.getOwnerComponent().getModel("oProductDetailModel").getData().sPath = oCurrentPath;
			this._oRouter.navTo("detailview1");
		},
		onHandledetailPage: function () {
			this._oRouter.navTo("detailview1");
		},

	onHandleSearch: function (oEvent) {
			var sQuery = oEvent.getSource().getValue();
			var filters = [];
			if (sQuery && sQuery.length > 0) {
				filters = new sap.ui.model.Filter([
					new sap.ui.model.Filter("ProductName", sap.ui.model.FilterOperator.Contains, sQuery),
					new sap.ui.model.Filter("SupplierID", sap.ui.model.FilterOperator.Contains, sQuery)
				], false);
			}
			var table = this.getView().byId("idProductsTable");
			var Binding = table.getBinding("items");
			Binding.filter(filters);
		},






		// BarCode
		onbarcodescan: function () {
			var me = this;
			var searchfield = this.getView().byId("sSearchFieldID");
			var callerClass = this;
			try {
				cordova.plugins.barcodeScanner.scan(function (result) {

					searchfield.setValue(result.text);
					callerClass.doFilter(result.text);
				}, function (error) {
					sap.m.MessageBox.show("Barcode scanning failed: ", error, "");
				});
			} catch (e) {
				sap.m.MessageBox.show("Cordova plugin is not available.", "");
			}
		},

		doFilter: function (number) {
			var filters = [];

			if (number && number.length > 0) {
				var aFilter = new sap.ui.model.Filter([
					new sap.ui.model.Filter("ProductName", sap.ui.model.FilterOperator.Contains, number),
					new sap.ui.model.Filter("SupplierID", sap.ui.model.FilterOperator.Contains, number)
					

				], false);

				filters.push(aFilter);
			}
			var table = this.getView().byId("idProductsTable");
			var Binding = table.getBinding("items");
			Binding.filter(filters);
		},
		
		
		
		
		onAddTable2Press: function (oEvent) {
			var data = {
				"ProductName": "",
				"ProductID": "",
				"SupplierID": "",
				"UnitsInStock": "",
				"Discontinued": ""
			};
			var oTablearray = this.getView().getModel("oProductsDataModel").getData().results;
			oTablearray.push(data);
			this.getView().getModel("oProductsDataModel").updateBindings(true);
		},
		onDeleteTableData: function (oEvent) {
			var tablearray = this.getView().getModel("oProductsDataModel").getData().results;
			if (tablearray.length > 1) {
				var currentPath = oEvent.getSource().getBindingContext("oProductsDataModel").sPath;
				var pathvalue = currentPath.split("/")[2];
				tablearray.splice(pathvalue, 1);
				this.getView().getModel("oProductsDataModel").updateBindings(true);
			}

		}

	});
});