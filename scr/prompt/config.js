var fs = require('fs');
var prompt = require('prompt');
var colors = require('colors/safe');

/**
 * Module to setup your configuration.
 * Configuration is written to the config.json file.
 * @module scr/prompt/config
 */
module.exports = function() {
    var FILE_NAME = 'config.json';
    prompt.message = 'Config';
    prompt.delimiter = colors.green(' > ');
    prompt.get(
        [{
                name: 'instance',
                required: true,
            },
            {
                name: 'username',
                required: true,
            },
            {
                name: 'password',
                hidden: true,
                conform: function(value) {
                    return true;
                },
            },
        ],
        function(err, result) {
            var config = {};
            config.instance = {};
            config.instance.name = result.instance;

            config.instance.url = [
                'https://',
                result.instance,
                '.service-now.com/',
            ].join('');

            config.authorization =
                'Basic ' +
                new Buffer(result.username + ':' + result.password).toString(
                    'base64'
                );

            fs.writeFile(FILE_NAME, JSON.stringify(config), function(err) {
                if (err) {
                    throw err;
                }
                console.log('updated : ' + process.cwd() + '/' + FILE_NAME);
            });
        }
    );
};