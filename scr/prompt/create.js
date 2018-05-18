var fs = require('fs');
var prompt = require('prompt');
var colors = require('colors/safe');
var test = require('../rest/api');
var config = require('../../config.json');
var TEST_DIR = 'instance/' + config.instance.name || '';
var SYS_ATF_TEST_DIR = TEST_DIR + '/sys_atf_test';
var SYS_ATF_STEP_DIR = SYS_ATF_TEST_DIR + '/' + 'sys_atf_step';
var SYS_SCRIPT_INCLUDE_DIR = TEST_DIR + '/sys_scipt_include';

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
    config.atf_test = obj.result.atf_test;
    _writeFile(
        SYS_ATF_STEP_DIR,
        config.atf_test.atf_steps.sys_update_name + '.js',
        config.atf_test.atf_steps.script
    );
    delete config.atf_test.atf_steps.script;
    _writeFile(process.cwd(), 'config.json', JSON.stringify(config));
}

module.exports = function() {
    prompt.message = 'Create Test';
    prompt.delimiter = colors.green(' > ');
    prompt.get(
        [{
                name: 'name',
                required: true,
            },
            {
                name: 'description',
                required: false,
            },
        ],
        function(err, result) {
            _mkdirSnyc(TEST_DIR);
            _mkdirSnyc(SYS_ATF_TEST_DIR);
            _mkdirSnyc(SYS_ATF_STEP_DIR);
            _mkdirSnyc(SYS_SCRIPT_INCLUDE_DIR);

            test.create(result.name, result.description, _getAtfTest);
        }
    );
};