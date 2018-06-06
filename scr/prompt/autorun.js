var fs = require('fs');
var chokidar = require('chokidar');
var run = require('./run');
var config = require('../../config.json');
var TEST_DIR = 'instance/' + config.instance.name || '';
var SYS_ATF_TEST_DIR = TEST_DIR + '/sys_atf_test';
var SYS_ATF_STEP_DIR = SYS_ATF_TEST_DIR + '/' + 'sys_atf_step';

/**
 * Watch for file changes in the local directory.
 */
function watch(dir) {
    var log = console.log.bind(console);
    var watcher = chokidar.watch(dir, {
        ignored: /(^|[\/\\])\../,
        persistent: true
    });

    watcher.on('change', function(file) {
        var filename = file.toString().slice(-48);
        var sys_id = file.toString().slice(-35, -3);
        run(sys_id, filename);
    });
}

/**
 * Module for autorunning your tests.
 * @module scr/prompt/autorun
 */
module.exports = function() {
    watch(SYS_ATF_STEP_DIR);
};