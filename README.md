<!-- prettier-ignore-start -->

# sn-tdd-cli

TDD command line tool for ServiceNow's Automated Testing Framework (ATF).

## Installation

1. Import update set `sys_remote_update_set_4627e787db4e17002acaf13daf96196f.xml` to your ServiceNow instance and commit update set.
2. [Download node](http://www.nodejs.org) - This will include the NPM module which is used to install the dependencies.
3. Once node is installed, navigate to the sn-tdd-cli folder you downloaded and run `npm install`. This will populate the `node_modules` directory. If you are behind a proxy or can't install node via the binary (to get npm) then you may have to run this on another machine and send yourself a zip archive of the directory.

* Confirm setup is complete by running `node main.js --help`. This should show a list of options.
* Follow the configuration section below and setup the **[config.json](#Configuration)** file.

## Configuration

Before you can create or execute any test you need to run the configuration.

1. Run `node main.js --config` to create your initial configuration.

## Test

After you setup the configuration you could add the first test by running `node main.js --test create` and follow the dialog. This will create the subfolders "your_instance_name/sys_atf_test/sys_atf_step/" under the "instance" folder and add a test file "sys_atf_step_your_test_sys_id.js".

This is your local test file which will be synced to your ServiceNow instance, whenever you run the command `node main.js --test run` or on save if you are in "autorun" mode. The test results will be shown.

## Available command options

* -V, or --version = Output the version number
* -c, or --config = Configuration
* -t or --test = Test option <create|autorun|run>
  * create = Add new test
  * autorun = Watches your local test for changes and executes the test on save.
  * run = Run the test manually
* -h or --help = Output usage information

<!-- prettier-ignore-end -->
