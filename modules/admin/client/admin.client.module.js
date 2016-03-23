'use strict';

// Use application configuration module to register a new module
ApplicationConfiguration.registerModule('admin', ['core.admin']);
ApplicationConfiguration.registerModule('lazyModel', ['core']);
ApplicationConfiguration.registerModule('admin.admin.routes', ['core.admin.routes']);
ApplicationConfiguration.registerModule('admin.admin.themes');