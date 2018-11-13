const settings = require("./settings.json");
const generator = require("./generator.json");

const basicMatrix = [];
const finalMatrix = [];


generateMatrix();


applyPoly('1', '101', 'u ^ v');


while (finalMatrix.length !== settings.iterations) {
    let poly = generateFunction();
    let zeroResult = eval(poly.replace(/num/g, (basicMatrix[0])));

    if (zeroResult === 0) {
        //console.log(zeroResult);
        let lines = getTwoLines();
        if (applyPoly(basicMatrix[lines.first], basicMatrix[lines.second], poly)) {
            finalMatrix.push({
                "generator": poly,
                "0": basicMatrix[0],
                "1": basicMatrix[lines.first],
                "2": basicMatrix[lines.second]
            });
        }
    }
}
printFinalResult();


// console.log(finalMatrix);

function applyPoly(u, v, poly) {
    let left, right;
    left = eval(poly.replace(/num/g, (u + v)));
    right = eval(poly.replace(/num/g, u)) ^ eval(poly.replace(/num/g, v));
    // console.log('U: ', u, 'V: ', v, 'Poly: ', poly, 'Left:', left, 'Right: ', right);
    return left !== right;
}

function getTwoLines() {
    let firstLine = getRandomInt(1, 7);
    let secondLine = getRandomInt(1, 7);
    while (firstLine === secondLine) {
        secondLine = getRandomInt(1, 7);
    }

    return {first: firstLine, second: secondLine};
}

function generateMatrix() {
    for (let i = 0; i < settings.vars + 1; i++) {
        basicMatrix.push(i.toString(2));
    }
}

function generateFunction() {
    let generator = 'num';
    for (let i = 0; i < settings.generatorLength; i++) {
        generator += `${getRandomSign()}`;
        (Math.random() >= 0.5) ? generator += 'num' : generator += `${getRandomNum()}`;
    }
    return generator;
}

function getRandomSign() {
    return generator.randOper[Math.floor(Math.random() * (3))];
}

function getRandomNum() {
    return `${eval(generator.randNum).toString(2)}`
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function prettyfy(value) {
    if (value.length === 1) {
        return `00${value}`;
    }
    if (value.length === 2) {
        return `0${value}`;
    }
    if (value.length === 3) {
        return `${value}`;
    }
}

function printFinalResult() {
    console.log(`We generated ${settings.iterations}.`);
    finalMatrix.forEach((object, index) => {
        console.log(`Matrix #${index}. Generated with ${object.generator}.`);
        console.log(prettyfy(object[0]));
        console.log(prettyfy(object[1]));
        console.log(prettyfy(object[2]));
        console.log('___________________');
    })
}