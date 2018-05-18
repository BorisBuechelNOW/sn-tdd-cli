var fs = require('fs');
var prompt = require('prompt');
var chalk = require('chalk');
var test = require('../rest/api');
var config = require('../../config.json');
var TEST_DIR = 'instance/' + config.instance.name || '';
var SYS_ATF_TEST_DIR = TEST_DIR + '/sys_atf_test';
var SYS_ATF_STEP_DIR = SYS_ATF_TEST_DIR + '/' + 'sys_atf_step';
var SYS_SCRIPT_INCLUDE_DIR = TEST_DIR + '/sys_scipt_include';

/**
 * Get the test progress after a timeout.
 * @param {string} executionId - The exection id of the test.
 * @param {function} callback
 */
function _getAtfTestProgress(executionId, callback) {
    setTimeout(function() {
        test.result(executionId, callback);
    }, 1000);
}

function _getAtfTestExecutionId(obj) {
    if (obj) {
        _getAtfTestResult(obj.result.execution_tracker, _getAtfTestProgress);
    }
}

function _formatResult(obj) {
    if (obj.result.status === 'failure') {
        return chalk.red(obj.result.output);
    }

    return chalk.green(obj.result.output);
}

function _logResult(obj) {
    console.log(_formatResult(JSON.parse(obj)));
}

function _getAtfTestResult(executionId, callback) {
    return callback(executionId, _logResult);
}

/**
 *
 * @param {function} callback - The call to log the response.
 */
function readScript(callback) {
    fs.readFile(
        SYS_ATF_STEP_DIR +
        '/' +
        config.atf_test.atf_steps.sys_update_name +
        '.js',
        function(err, data) {
            if (err) {
                throw err;
            }
            callback(null, data);
        }
    );
}

/**
 * Rest module.
 * @module scr/prompt/run
 */
module.exports = function() {
    readScript(function(err, data) {
        test.run(
            config.atf_test.atf_steps.sys_id,
            data.toString(),
            _getAtfTestExecutionId
        );
    });
};