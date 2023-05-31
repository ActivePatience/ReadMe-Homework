// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');

// TODO: Create an array of questions for user input
let questions = [];
questions.push(
{name: 'title', message: 'Please provide a title for your project:', default: 'Title'},
{name: 'desc', message: 'Please provide a description:'},
{name: 'install', message: 'Please provide installation instructions:'},
{name: 'usage', message: 'Please provide instructions and examples for use:'},
{type: 'list', name: 'license', message: 'Please select a license:', choices: ['MIT License','GPLv3 License','Unlicense']},
{name: 'contr', message: 'Please describe how other users may contribute to the project:'},
{name: 'testing', message: 'Please describe the way to best use the included project tests:'},
{name: 'user', message: 'Please provide your GitHub username:', default: 'usernameHere'},
{name: 'email', message: 'Please provide your email address:', default: 'nobody@something.net'}
);

// Functions for initiating the various sections of the readme
function cTitle(title) {
    return `# ` + title + ' ';
}
function cDesc(desc) {
    return `\n## Description <a name="description"></a>\n` + desc;
}
function cTOC() {
    return `\n## Table of Contents\n
- [Description](#description)\n
- [Installation](#installation)\n
- [Usage](#usage)\n
- [License](#license)\n
- [Contribution](#contribution)\n
- [Testing](#testing)\n
- [Questions](#questions)\n
`;
}
function cInstall(install) {
    if(install !== ''){return `\n## Installation Instructions <a name="installation"></a>\n` + install;}
    else{return '';}
}
function cUsage(use) {
    return `\n## Usage <a name="usage"></a>\n` + use;
}
function cLicense(license) {
    return `\n## License <a name="license"></a>\n` + license;
}
function cContr(contr) {
    if(contr !== ''){return `\n## How to Contribute <a name="contribution"></a>\n` + contr;}
    else{return '';}
}
function cTests(tst) {
    if(tst !== ''){return `\n## Testing <a name="testing"></a>\n` + tst;}
    else{return '';}
}
function cQuest(bool) {
    if(bool){return `\n## Questions <a name="questions"></a>\n`;}
    else{return '';}
}
function cUser(user) {
    if(user !== ''){return `\n[Click here to visit ` + user + `'s GitHub profile page](https://www.github.com/` + user + `)\n`;}
    else{return '';}
}
function cEmail(email) {
    if(email !== ''){`\nYou can reach the owner of this project at the following email address: ` + email;}
    else{return '';}
}

// TODO: Create a function to write README file
// fs.writeFile(fileName, data, callbackFunction); There's no need to separate this out into its own custom function.

// TODO: Create a function to initialize app
function init() {

    var body = '';

    inquirer
        .prompt(questions)
        .then(a => {
            var lic = '';
            switch(a.license) {
                case 'MIT License':
                  lic = '[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)';
                  break;
                case 'GPLv3 License':
                  lic = '[![GPLv3 license](https://img.shields.io/badge/License-GPLv3-blue.svg)](http://perso.crans.org/besson/LICENSE.html)';
                  break;
                case 'Unlicense':
                  lic = '[![Unlicense](https://img.shields.io/badge/License-Unlicense-blue.svg)](https://unlicense.org/)';
                  break;
            }
            body += cTitle(a.title + lic);
            body += cDesc(a.desc);
            body += cTOC();
            body += cInstall(a.install);
            body += cUsage(a.usage);
            body += cLicense(a.license);
            body += cContr(a.contr);
            body += cTests(a.testing);
            body += cQuest(true);
            body += cUser(a.user);
            body += cEmail(a.email);

            fs.writeFile('README.md', body, (err) => err && console.error(err));
        })
}

// Function call to initialize app
init();
