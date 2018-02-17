const readline = require('readline');
const log = require('../libs/log')(module);
const nodemon = require('nodemon');

const printInfo = () => {
    log.info(`\n\n`);
    log.info(`Print 'exit' to stop script evaluation or...`);
    log.info(`\n\n`);
}

const checkOnQuit = (answer) => {
    if (answer.toLowerCase().trim() === 'exit') {
        process.exit();
        nodemon.emit('quit'); // why it does not work?
        log.info(`Press 'Cntrl + C' to shut down nodemon`);
    }
}

const readPrompt = () => {
    const rl = readline.createInterface(process.stdin, process.stdout);
    const handleFile = require('./handleFile');

    const answers = {
        input: '',
        output: ''
    }

    printInfo();

    rl.question(`Write down path to input file: `, (answer) => {
        checkOnQuit(answer);

        answers.input = answer;
        printInfo();
        rl.setPrompt(`Write down path to output file: `);
        rl.prompt();

        rl.on('line', (answer) => {
            checkOnQuit(answer);

            answers.output = answer;
            rl.close();
        });
    });

    rl.on('close', () => {
        handleFile(answers.input);
    });

}

module.exports = readPrompt;
