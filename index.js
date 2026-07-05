#!/usr/bin/env node

import inquirer from "inquirer";
import pc from "picocolors";
import figlet from "figlet";
import gradient from 'gradient-string';
import chalk from "chalk";
import { createSpinner } from 'nanospinner';
import Table from 'cli-table3';



async function mainMenu() {

    console.clear();

    const asciiArt = figlet.textSync('To Do List', {
        font: 'Standard',
        horizontalLayout: 'fitted',
        verticalLayout: 'default',
    });

    const coloredArt = chalk.magenta.bold(asciiArt);
    console.log(coloredArt);

    console.log(pc.cyan(pc.bold('Welcome to Interactive To-Do List \n')));

    // main menu prompts
    let isRunnig = true;
    let tasks = [];


    while (isRunnig) {

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

        if (answer.action === 'Add a new task') {
            // Asking user to add the tasks
            const taskAnswer = await inquirer.prompt([
                {
                    name: 'newTask',
                    type: 'input',
                    message: 'Enter your new task:'
                }
            ]);

            tasks.push(taskAnswer.newTask);
            // fake loading spinner
            const spinner = createSpinner('Saving task...').start();

            // wait for the 1 sec for spinner effect
            await new Promise(r => setTimeout(r, 1000));

            // stoping the spinner
            spinner.success({ text: 'Task added successfully!\n' });
        }
        else if (answer.action === 'view all tasks') {
            // first checking if the array is empty
            if (tasks.length === 0) {
                console.log(pc.red('\n No tasks found ! Try adding some first.\n'));
            } else {
                // creating new table instance and colums
                const table = new Table({
                    head: [pc.cyan('ID'), pc.cyan('Task')],
                    colWidths: [10, 50],
                    style: {
                        head: ['yellow'],
                        border: ['white']
                    }
                });
                // loop through task array and pushing row into the table
                tasks.forEach((task, index) => {
                    table.push([index + 1, task]);
                });

                // printing the table
                console.log('\n' + table.toString() + '\n');
            }
        }
        else if (answer.action === 'Exit') {
            console.log(pc.red('\nGood Bye! Thanks for using the To-Do CLI\n'));
            isRunnig = false;
        }

    }
}

// function call
mainMenu();