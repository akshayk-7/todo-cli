#!/usr/bin/env node

import inquirer from "inquirer";
import pc from "picocolors";
import figlet from "figlet";
import gradient from 'gradient-string';


async function mainMenu() {

    console.clear();

    const asciiArt = figlet.textSync('TO-DO CLI', {
        font: 'Standard',
        horizontalLayout: 'fitted',
        verticalLayout: 'default',
    });

    const coloredArt = gradient.retro.multiline(asciiArt);
    console.log(coloredArt);

    console.log(pc.cyan(pc.bold('Welcome to Interactive To-Do List \n')));

    // main menu prompts
    const answer = await inquirer.prompt([
        {
            name: 'action',
            type: 'select',
            message: 'What would you like to do?',
            choices: [
                'Add a new task',
                'view all tasks',
                'Exit'
            ]
        }
    ]);

    console.log(pc.green(`\n You selected: ${answer.action}`));
}

// function call
mainMenu();