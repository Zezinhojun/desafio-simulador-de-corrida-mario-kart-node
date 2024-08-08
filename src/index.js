class Char {
    constructor(name, velocity, maneuverability, power, score = 0) {
        this.name = name,
            this.velocity = velocity,
            this.maneuverability = maneuverability,
            this.power = power,
            this.score = score
    }
}

const mario = new Char("Mario", 4, 3, 3, 0)
const luigi = new Char("Luigi", 3, 4, 4, 0)
const peach = new Char("Peach", 3, 4, 2, 0)
const yoshi = new Char("Yoshi", 2, 4, 3, 0)
const bowser = new Char("Bowser", 5, 2, 5, 0)
const donkeyKong = new Char("Donkey Kong", 2, 2, 5, 0)


async function rollDice() {
    return Math.floor((Math.random() * 6) + 1)
}

async function getRandomDamage() {
    let random = Math.random()
    return random < 0.75 ? "Bomb" : "Shell"

}

async function getTurboPower() {
    let random = Math.random()
    return random < 0.8 ? "Turbo" : ""
}

async function getRandomBlock() {
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = "Stretch"
            break;
        case random < 0.66:
            result = "Curve"
            break;
        default:
            result = "Challenge"
            break;
    }

    return result
}

async function logRollResult(charName, block, diceResult, attribute) {
    console.log(`${charName} 🎲 roll the dice of ${block} ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(char1, char2) {
    for (let round = 1; round <= 5; round++) {
        console.log(`Round ${round}`);

        //sortear codigo
        let block = await getRandomBlock()
        let damage = await getRandomDamage()
        let turbo = await getTurboPower()
        console.log(`Block: ${block}`)
        let diceResult1 = await rollDice()
        let diceResult2 = await rollDice()

        let totalSkillTest1 = 0;
        let totalSkillTest2 = 0;

        if (block === "Stretch") {
            totalSkillTest1 = diceResult1 + char1.velocity
            totalSkillTest2 = diceResult2 + char2.velocity

            await logRollResult(char1.name, "Velocity", diceResult1, char1.velocity)
            await logRollResult(char2.name, "Velocity", diceResult2, char2.velocity)
        }
        if (block === "Curve") {
            totalSkillTest1 = diceResult1 + char1.maneuverability
            totalSkillTest2 = diceResult2 + char2.maneuverability

            await logRollResult(char1.name, "Maneuverability", diceResult1, char1.maneuverability)
            await logRollResult(char2.name, "Maneuverability", diceResult2, char2.maneuverability)
        }
        if (block === "Challenge") {
            let powerResult1 = diceResult1 + char1.power
            let powerResult2 = diceResult2 + char2.power

            console.log(`${char1.name} challenged ${char2.name}! 🥊`)
            await logRollResult(char1.name, "Power", diceResult1, char1.power)
            await logRollResult(char2.name, "Power", diceResult2, char2.power)

            if (powerResult1 > powerResult2 && char2.score >= 0) {
                if (damage === "Bomb") {
                    console.log(`${char1.name} winned the challenge! ${char2.name} lost 2 point 💣`)
                    char2.score = (char2.score > 2) ? (char2.score - 2) : 0;

                } else if (damage === "Shell") {
                    console.log(`${char1.name} winned the challenge! ${char2.name} lost 1 point 🐢`)
                    char2.score = (char2.score > 2) ? (char2.score--) : 0;
                }

                if (turbo === "Turbo") {
                    console.log(`${char1.name} got turbo power 🚀`)
                    char1.score++
                }
            }
            if (powerResult2 > powerResult1 && char1.score >= 0) {
                if (damage === "Bomb") {
                    console.log(`${char2.name} winned the challenge! ${char1.name} lost 2 point 💣`)
                    char1.score = (char1.score > 2) ? (char1.score--) : 0;
                } else if (damage === "Shell") {
                    console.log(`${char2.name} winned the challenge! ${char1.name} lost 1 point 🐢`)
                    char1.score--
                }
                if (turbo === "Turbo") {
                    console.log(`${char2.name} got turbo power 🚀`)
                    char2.score++
                }
            }
            console.log(powerResult1 === powerResult2 ? "Challenge drawn, no points lost" : "")
        }
        if (totalSkillTest1 > totalSkillTest2) {
            console.log(`${char1.name} scored 1 point`)
            char1.score++
        } else if (totalSkillTest2 > totalSkillTest1) {
            console.log(`${char2.name} scored 1 point`)
            char2.score++
        }
        console.log("------------------------------")
    }

}



async function declareWinner(char1, char2) {
    console.log("End result: ")
    console.log(`${char1.name}: ${char1.score} score(s)`)
    console.log(`${char2.name}: ${char2.score} score(s)`)

    if (char1.score > char2.score) {
        console.log(`\n${char1.name} winned the run! Congratulations 🏆`)
    } else if (char2.score > char1.score) {
        console.log(`\n${char1.name} winned the run! Congratulations 🏆`)
    } else {
        console.log("The run finished drawn")
    }
}
(async function main() {
    console.log(`🏁🚨 Racing among ${peach.name} and ${donkeyKong.name} Starting... \n`);

    await playRaceEngine(peach, donkeyKong)
    await declareWinner(peach, donkeyKong)
})()

