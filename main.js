var program = require('commander');
var prompt_config = require('./scr/prompt/config');
var prompt_run = require('./scr/prompt/run');
var prompt_autorun = require('./scr/prompt/autorun');
var prompt_create = require('./scr/prompt/create');


program
    .version('0.0.1')
    .usage('[options] <file ...>')
    .option('-c, --config', 'Configuration')
    .option(
        '-t --test <option>',
        'Test option <create|autorun|run>',
        /^(create|autorun|run)$/i
    )
    .parse(process.argv);

if (program.config) {
    console.log('Please enter your configuration:');
    prompt_config();
}

if (program.test) {
    switch (program.test) {
        case 'run':
            console.log('RUN');
            prompt_run();
            break;
        case 'autorun':
            console.log('AUTORUN');
            prompt_autorun();
            break;
        case 'create':
            prompt_create();
            break;
    }
}