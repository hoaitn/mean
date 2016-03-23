'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('shop', ['core']);
ApplicationConfiguration.registerModule('shop.admin', ['core.admin']);
ApplicationConfiguration.registerModule('shop.admin.routes', ['core.admin.routes']);