#! /usr/bin/env node

import inquirer from 'inquirer';
import readline from 'readline';
import chalk from 'chalk';

// Print welcome message
console.log(chalk.bold.italic.rgb(73, 158, 255)(`${chalk.bold.hex('#499EFF')(`\n  \t\t <<<======================================>>>`)}`));
console.log(chalk.rgb(0, 255, 51).bold.italic("\n \t<================ Welcome to My Quiz App! ================>\n"));
console.log(chalk.bold.italic.rgb(73, 158, 255)(`${chalk.bold.hex('#499EFF')(`\t\t <<<======================================>>>\n`)}`));

// Define an interface for a question
interface Question {
    question: string;
    options: string[];
    correctAnswerIndex: number;
}

// Function to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create an instance of readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to display a question and prompt user for an answer
function displayQuestion(question: Question): Promise<number> {
    console.log(chalk.yellow.bold.italic(`\t\t\t${question.question}\n`));
    question.options.forEach((option, index) => {
        console.log(`\t\t\t${chalk.cyan.bold.italic(index + 1)}. ${chalk.bold.italic(option)}\n`);
    });
    return new Promise((resolve) => {
        rl.question(chalk.green.bold.italic("\t\t\tEnter your answer (1, 2, 3, etc.): "), (answer) => {
            resolve(parseInt(answer) || 0);
        });
    });
}

// Function to run the quiz
async function runQuiz(questions: Question[]): Promise<void> {
    let score = 0;
    const shuffledQuestions = shuffleArray(questions); // Shuffle the questions
    for (const question of shuffledQuestions) {
        const userAnswer = await displayQuestion(question);
        console.log();
        if (userAnswer === question.correctAnswerIndex + 1) {
            console.log(chalk.green.bold.italic("\t\t\tCorrect!\n"));
            score++;
        } else {
            console.log(chalk.red.bold.italic("\t\t\tIncorrect.\n"));
        }
        console.log(chalk.yellow.bold.italic("\t\t\t-------------------------------------------\n"));
    }
    console.log(chalk.blue.bold.italic(`\t\t\tQuiz complete! You scored ${score} out of ${questions.length} questions.\n`));
    rl.close();
}

// Define your questions
const questions: Question[] = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "Berlin", "London"],
        correctAnswerIndex: 0
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["China", "Japan", "South Korea"],
        correctAnswerIndex: 1
    },
    {
        question: "Which continent is the largest by land area?",
        options: ["Asia", "Africa", "North America"],
        correctAnswerIndex: 0
    },
    {
        question: "Which ocean is the largest?",
        options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean"],
        correctAnswerIndex: 2
    },
    {
        question: "Which is the longest river in the world?",
        options: ["Amazon River", "Nile River", "Yangtze River"],
        correctAnswerIndex: 1
    }
];

// Run the quiz
runQuiz(questions);
