sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (UIComponent, JSONModel, Device) {
	"use strict";
	return UIComponent.extend("com.de.Worklist.Component", {
		metadata: {
			manifest: "json"
		},

		init: function () {
			UIComponent.prototype.init.apply(this, arguments);

			var oModel = new sap.ui.model.json.JSONModel(jQuery.sap.getModulePath("com.de.Worklist.model", "/TableData.json"));
			this.setModel(oModel, "WorklistTableModel");
			
			 var oProductDetailModel = new sap.ui.model.json.JSONModel();
			this.setModel(oProductDetailModel, "oProductDetailModel");
			
			this.setModel(this.createDeviceModel(), "device");
			this.getRouter().initialize();

		},
		createDeviceModel: function () {
			var oModel = new JSONModel({
				isPhone: sap.ui.Device.system.phone
			});
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		}
	});

});