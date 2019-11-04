#!/usr/bin/env node
import chalk from "chalk";
import program from "commander";
import * as fs from "fs";
import path from "path";
import axiso from "axios";

const PKG = JSON.parse(fs.readFileSync(path.join(__dirname, "..", "package.json")).toString());

program.version(PKG.version);

program
    .command("http:ping <url>")
    .description("TODO")
    .action(onHttpPing);

program
    .command("help", { isDefault: true })
    .description('Print this help \n <PUT SOME DESCRIPTION HERE>"')
    .action(() => {
        program.outputHelp();
    });

program.parse(process.argv);

if (process.argv.length === 2) {
    program.outputHelp();
}

/////////////////////////////////////////////////
// Command
/////////////////////////////////////////////////

function onHttpPing(url:string) {
    console.log(`Doing ping ${url}`);
}


/////////////////////////////////////////////////
// Helper function
/////////////////////////////////////////////////

function errorAndExit(message: string) {
    console.log(chalk.bgRed(message));
    process.exit(-1);
}


function getObject<T>(name: string, pkg: any): T {
    if (pkg[name]) {
        return pkg[name] as T;
    } else {
        errorAndExit(`Missing or undefined configuration object ${name}! Found ${Object.keys(pkg).join(", ")}`);
    }
}

