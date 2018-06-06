var request = require('request');
var config = require('../../config.json');
var API_URL = 'api/snc/tdd/';

/**
 * Module to handle the REST calls to the ServiceNow instance.
 * @module scr/rest/api
 */

module.exports = {
    headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: config.authorization,
    },
    /**
     * Create a test via REST.
     * @param {string} name - The test name.
     * @param {string} description - The test description.
     * @param {function} callback - The callback function to log the response.
     */
    create: function(name, description, callback) {
        request.post({
                headers: this.headers,
                json: {
                    name: name,
                    description: description,
                },
                url: config.instance.url + API_URL + 'test',
            },
            function(err, res, body) {
                if (err) {
                    throw err;
                    return;
                }

                if (res.statusCode === 201) {
                    callback(body);
                }
            }
        );
    },
    /**
     * Add a test step via REST.
     * @param {string} sys_id - The sys_id of the test to be exectuted.
     * @param {function} callback - The callback function to log the response.
     */
    addTestStep: function(sys_id, callback) {
        request.post({
                headers: this.headers,
                url: config.instance.url + API_URL + 'test/' + sys_id,
            },
            function(err, res, body) {
                if (err) {
                    throw err;
                    return;
                }

                if (res.statusCode === 201) {
                    callback(body);
                }
            }
        );
    },
    /**
     * Update a test via REST.
     * @param {string} sys_id - The sys_id of the test to be exectuted.
     * @param {string} script - The test code that will be will be replaced.
     * @param {function} callback - The callback function to log the response.
     */
    run: function(sys_id, script, callback) {
        request.put({
                headers: this.headers,
                json: {
                    script: script,
                },
                url: config.instance.url + API_URL + 'step/' + sys_id,
            },
            function(err, res, body) {
                if (err) {
                    throw err;
                    return;
                }

                if (res.statusCode === 200) {
                    callback(body);
                }
            }
        );
    },
    /**
     * Run a test via REST.
     * @param {string} executionId - The id of the the that will be executed.
     * @param {function} callback - The callback function to log the response.
     */
    result: function(executionId, callback) {
        request.get({
                headers: this.headers,
                url: config.instance.url + API_URL + 'result/' + executionId,
            },
            function(err, res, body) {
                if (err) {
                    throw err;
                    return;
                }

                if (res.statusCode === 200) {
                    callback(body);
                }
            }
        );
    },
};