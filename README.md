# UBank Website Automation Tests -(test)

# About

This repository contains automated tests for the UBank's website & Swagger Pet Store APIs using the Playwright testing framework. These tests cover functionalities like page navigation, menu interactions, form submissions & API automation tests, etc.

Git Repository URL : https://github.com/Chaitz01/ubanktest

## Prerequisites

Before running these tests, ensure you have Node.js installed on your machine. If you don't have Node.js installed, download and install it from [Node.js official website](https://nodejs.org/).

## Setup

To set up the test environment, follow these steps:

Go to Git Repository: https://github.com/Chaitz01/ubanktest

### 1. Clone the Repository

```bash
git clone https://github.com/Chaitz01/ubanktest.git

cd <your-repository-directory>
```

### 2. Install Dependencies

Ensure you are in the project directory and run:

```bash
npm install
```

This command installs all necessary dependencies, including Playwright. If your system doesn't have Playwright or is not yet installed, it will be installed as part of this process.

### 3. Recommended Development Tools

#### Visual Studio Code (VS Code):

Preferred editor for writing and managing code.

#### Playwright Test for Visual Studio Code Extension (Optional):

This extension provides rich features like test debugging and running Playwright tests directly from VS Code. You can install it from the VS Code extensions marketplace.

### 4. Running Tests & Generating Test Report

To run the automated tests, execute the following command in your VScode terminal:

```bash

npx playwright test
```

This command runs all tests in the project using Playwright. This same command above also automatically generates a detailed HTML report (which contains test run report for all default playwright supported browsers).

#### How to view report:

HTML test report will be available under **'playwright-report'** folder after the test run using the above command, which you can open using any web browser to view the test execution report.
