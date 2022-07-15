const fs = require('fs');
const { exec } = require("child_process");
let filepath = "./index.bf"
const execute = (command) => {exec(command, (error, stdout, stderr) => {if (error) {console.log(`error: ${error.message}`);return;}if (stderr) {console.log(`stderr: ${stderr}`);return;}console.log(stdout)})};
if(!fs.existsSync("./index.bf")){fs.writeFileSync(filepath,"");process.exit(1);}
const code = fs.readFileSync(filepath,{encoding: "utf8",flag:"r"});
let wtf = "#include <stdio.h>\n#include <unistd.h>\nint main(){ char array[30000]={0}; char *ptr=array;";
let amount = 1;
let type = code[0];
for(let i = 0; i < code.length; i++){
    type = code.at(i - 1);
    switch(code[i]) {     
        case "+":
            if(code[i+1]!="+"||i==code.length){wtf += `*ptr+=${amount};`;amount=1;}else amount++;
            break;
        case "-":
            if(code[i+1]!="-"||i==code.length){wtf += `*ptr-=${amount};`;amount=1;}else amount++;
            break;  
        case ">":
            if(code[i+1]!=">"||i==code.length){wtf += `ptr+=${amount};`;amount=1;}else amount++;
            break;
        case "<":
            if(code[i+1]!="<"||i==code.length){wtf += `ptr-=${amount};`;amount=1;}else amount++;
            break;  
        case ",":
            amount = 1;
            wtf += "scanf(\"%c\",&*ptr);";
            break;
        case ".":
            amount = 1;
            wtf += "putchar(*ptr);";
            break;
        case "[":
            amount = 1;
            wtf += "while(*ptr){";
            break;
        case "]":
            amount = 1;
            wtf += "}";
            break;
        default:
            break;
        }
}
wtf += "}";
fs.writeFileSync("./main.c",wtf);
execute("gcc main.c -o main && rm main.c");
