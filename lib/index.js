var _           = require('lodash'),
    hyperquest  = require('hyperquest');

module.exports = function (id, secret, version, host) {
    // Params
    if (typeof id === 'undefined')      id = '';
    if (typeof secret === 'undefined')  secret = '';
    if (typeof version === 'undefined') version = 'v2';
    if (typeof host === 'undefined')    host = 'https://api.foursquare.com';

    /**
     * Hyperquest adapter.
     *
     * @param {Object} Options
     *      - method {String}
     *      - uri {String}
     *      - auth {String, Optional} 'username:password'
     *      - token {String, Optional}
     *      - params {Object, Optional}
     * @param {Function} Callback (optional)
     *
     * @return {Object}
     */
    return function (options, callback) {
        // Defaults & storage objects
        var buffer  = '';
        var body    = null;

        _.defaults(options, {
            method:     'GET',
            uri:        '/',
            headers:    {}
        });

        // Host
        options.uri = host + '/' + version + '/' + options.uri + '&client_id=' + id + '&client_secret=' + secret + '&v=20130627';

        // Headers
        options.headers['accept-version'] = version;
        options.headers['accept-type'] = 'application/json';

        // Post data
        if (typeof options.params !== 'undefined') {
            body = JSON.stringify(options.params);
            options.headers['content-type'] = 'application/json';
            options.headers['content-length'] = body.length;
            delete options.params;
        }

        // Create hyperquest object
        var request = hyperquest(options);

        // Send post data
        if (body !== null) {
            request.write(body);
        }

        // If no callback is provided, return hyperquest object
        if (typeof callback === 'undefined') return request;

        // Callback handler
        request.on('error', function (err) {
            return callback(err);
        });

        request.on('data', function (data) {
            buffer += data.toString();
        });

        request.on('end', function (data) {
            try {
                callback(null, JSON.parse(buffer));
            } catch (e) {
                callback(e);
            }
        });
    }
}
