#!/usr/bin/env node

// Require packages
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

// Template options
const templates = [
  'node-js',
  'node-ts',
  'express-js',
  'express-ts',
  'react-js',
  'react-ts',
];

// CLI Questions
const questions = [
  'What is your app name?',
  'Describe your app',
  'Choose your template',
];

// App name validation
const validateAppName = (name) => {
  const appNameRegex = /^[a-zA-Z0-9-_]+$/;
  return appNameRegex.test(name);
}

const inquirerQuestions = [{
  name: 'appName',
  type: 'input',
  message: questions[0],
  validate: function(value) {
    if (value.length) {
      return validateAppName(value) ? true : 'App name should only contain alphanumeric characters and dashes';
    }
    return 'App name cannot be empty';
  }
}, {
  name: 'appDescription',
  type: 'input',
  message: questions[1],
}, {
  name: 'template',
  type: 'list',
  message: questions[2],
  choices: templates,
}];


// Launch inquirer prompt
inquirer.prompt(inquirerQuestions).then(answers => {
  const appName = answers.appName;
  const template = answers.template;

  const templatePath = path.join(`${__dirname}/templates/${template}`);

  fs.mkdirSync(`${process.cwd()}/${appName}`);
  
  copyTemplateContents(templatePath, `${process.cwd()}/${appName}`, {
    name: appName
  });
});

function copyTemplateContents(templatePath, newPath, app) {
  const files = fs.readdirSync(templatePath);
  files.forEach(file => {
    const filePath = path.join(templatePath, file);
    const newFilePath = path.join(newPath, file);
        
    if (fs.lstatSync(filePath).isDirectory()) {
      fs.mkdirSync(newFilePath);
      copyTemplateContents(filePath, newFilePath, app);
    } else {
      const fileContents = fs.readFileSync(newFilePath, 'utf8');
      const newFileContents = fileContents.replace(/{{appName}}/g, app.name);

      if (file.indexOf('.tmp') > -1) {
        fs.writeFileSync(newFilePath.replace('.tmp', ''), newFileContents);
      } else {
        fs.writeFileSync(newFilePath, newFileContents);
      }
    }
  });
}