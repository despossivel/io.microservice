module.exports = application =>
    application.get('/', (req, res) =>
        application.server.controllers.site.index(application, req, res));