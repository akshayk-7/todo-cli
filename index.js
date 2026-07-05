#!/usr/bin/env node

import inquirer from "inquirer";
import pc from "picocolors";
import figlet from "figlet";
import gradient from 'gradient-string';
import chalk from "chalk";
import { createSpinner } from 'nanospinner';
import Table from 'cli-table3';
import fs from 'fs/promises';




async function mainMenu() {

    console.clear();

    const asciiArt = figlet.textSync('To Do CLI', {
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

    try {
        const fileData = await fs.readFile('tasks.json', 'utf-8');
        tasks = JSON.parse(fileData);
    } catch (error) {
        tasks = [];
    }

    while (isRunnig) {

        const answer = await inquirer.prompt([
            {
                name: 'action',
                type: 'select',
                message: 'What would you like to do?',
                choices: [
                    'Add a new task',
                    'view all tasks',
                    'Mark task as done',
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

            // tasks.push(taskAnswer.newTask);
            const dateString = new Date().toLocaleString();
            tasks.push({
                name: taskAnswer.newTask,
                date: dateString
            });

            await fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2));
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
                    head: [pc.cyan('ID'), pc.cyan('Task'), pc.cyan('Date & Time')],
                    colWidths: [10, 50, 25],
                    chars: {
                        'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
                        , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
                        , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
                        , 'right': '║', 'right-mid': '╢', 'middle': '│'
                    },
                    style: {
                        head: [],       // Don't automatically color headers
                        border: []      // Keep border white
                    }
                });
                // loop through task array and pushing row into the table
                tasks.forEach((task, index) => {
                    table.push([index + 1, task.name, pc.gray(task.date)]);
                });

                // printing the table
                console.log('\n' + table.toString() + '\n');
            }
        } else if (answer.action === 'Mark task as done') {
            // first checking the tasks
            if (tasks.length === 0) {
                console.log(pc.red('\n No tasks to mark as done \n'));
            } else {
                // asking user to which task they want to delete
                const deleteAnswer = await inquirer.prompt([
                    {
                        name: 'taskDelete',
                        type: 'select',
                        message: 'which task did you complete?',
                        choices: tasks.map(task => task.name)
                    }
                ]);

                const index = tasks.findIndex(task => task.name === deleteAnswer.taskDelete);
                //  removing 1 item of that exact index
                tasks.splice(index, 1);

                // saving the data
                await fs.writeFile('tasks.json', JSON.stringify(tasks, null, 2));
                const spinner = createSpinner('Removing task...').start();

                await new Promise((r) => setTimeout(r, 1000));

                spinner.success({ text: pc.green('Task marked as done and removed ! \n') });
                // console.log(pc.green('\n✔ Task marked as done and removed \n'));
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