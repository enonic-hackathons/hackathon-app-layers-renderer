var contentLib = require('/lib/xp/content');
var portalLib = require('/lib/xp/portal');
var thymeleaf = require('/lib/xp/thymeleaf');
var ioLib = require('/lib/xp/io');

var view = resolve('layersrenderer.html');
var styles = ioLib.getResource(('/assets/css/layersrenderer.css'));
var css = ioLib.readText(styles.getStream());

function handleGet(req) {
    var uid = req.params.uid;
    var key = req.params.contentId || portalLib.getContent()._id;
    var data = contentLib.get({ key: key, branch: 'draft' });

    var params = {
        uid: uid,
        data: data.page || null
    };

    return {
        contentType: 'text/html',
        body: thymeleaf.render(view, params)
    };
}

exports.get = handleGet;
