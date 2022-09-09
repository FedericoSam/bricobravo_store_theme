// This is an example
function setVtexAppsConfig(vtexAppsConfig, appName) {
    if (appName == "checkout-v6-invoice-data") {
      vtexAppsConfig.locale = "it";
      vtexAppsConfig.invoiceDataMandatory = true;
      vtexAppsConfig.showSDIPECSelector = true;
      vtexAppsConfig.showPersonTypeSelector = true;
      vtexAppsConfig.defaultSDIPEC="sdi"
      vtexAppsConfig.defaultPersonType = "company";
      vtexAppsConfig.requiredFields.it = {
        profile: ["user-person-type", "custom-corporate-name"],
        address: ["custom-corporate-street"],
      };
    }
  }