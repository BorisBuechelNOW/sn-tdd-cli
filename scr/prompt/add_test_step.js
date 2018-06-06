var fs = require('fs');
var prompt = require('prompt');
var colors = require('colors/safe');
var test = require('../rest/api');
var config = require('../../config.json');
var TEST_DIR = 'instance/' + config.instance.name || '';
var SYS_ATF_TEST_DIR = TEST_DIR + '/sys_atf_test';
var SYS_ATF_STEP_DIR = SYS_ATF_TEST_DIR + '/' + 'sys_atf_step';

function _mkdirSnyc(dirPath) {
    try {
        fs.mkdirSync(dirPath);
    } catch (err) {
        if (err.code !== 'EEXIST') {
            throw err;
        }
    }
}

function _writeFile(dir, name, content) {
    fs.writeFile(dir + '/' + name, content, function(err) {
        if (err) {
            throw err;
        }
        console.log('created : ' + dir + '/' + name);
    });
}

function _getAtfTest(obj) {
    obj = JSON.parse(obj);
    _writeFile(
        SYS_ATF_STEP_DIR,
        obj.result.atf_steps.sys_update_name + '.js',
        obj.result.atf_steps.script
    );
    delete obj.result.atf_steps.script;
    config.atf_test.atf_steps.push(obj.result.atf_steps);
    _writeFile(process.cwd(), 'config.json', JSON.stringify(config));
}

/**
 * Module for autorunning your tests.
 * @module scr/prompt/add_test
 */
module.exports = function() {
    console.log('Add test step.');
    test.addTestStep(config.atf_test.sys_id, _getAtfTest);
};