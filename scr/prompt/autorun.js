var fs = require('fs');
var run = require('./run');
var config = require('../../config.json');
var TEST_DIR = 'instance/' + config.instance.name || '';
var SYS_ATF_TEST_DIR = TEST_DIR + '/sys_atf_test';
var SYS_ATF_STEP_DIR = SYS_ATF_TEST_DIR + '/' + 'sys_atf_step';

/**
 * Watch for file changes in the local directory.
 */
function watch(dir) {
    fs.watch(dir, function() {
        run();
    });
}

/**
 * Module for autorunning your tests.
 * @module scr/prompt/autorun
 */
module.exports = function() {
    watch(SYS_ATF_STEP_DIR);
};