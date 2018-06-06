var program = require('commander');
var prompt_config = require('./scr/prompt/config');
var prompt_run = require('./scr/prompt/run');
var prompt_autorun = require('./scr/prompt/autorun');
var prompt_create = require('./scr/prompt/create');
var prompt_add_test_step = require('./scr/prompt/add_test_step');


program
    .version('0.0.2')
    .usage('[options] <file ...>')
    .option('-c, --config', 'Configuration')
    .option(
        '-t --test <option>',
        'Test option <create|autorun|[test step sys_id]|add-test-step>',
        /^(create|autorun|[0-9a-f]{32}|add-test-step)$/i
    )
    .parse(process.argv);

if (program.config) {
    console.log('Please enter your configuration:');
    prompt_config();
}

if (program.test) {
    switch (true) {
        case /[0-9a-f]{32}/.test(program.test):
            console.log('Run test ...');
            prompt_run(program.test, 'sys_atf_step_' + program.test + '.js');
            break;
        case /autorun/.test(program.test):
            console.log('Autorun active - Listening for file changes ...');
            prompt_autorun();
            break;
        case /create/.test(program.test):
            prompt_create();
            break;
        case /add-test-step/.test(program.test):
            prompt_add_test_step();
            break;
    }
}