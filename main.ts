namespace SpriteKind {
    export const Setup = SpriteKind.create()
    export const SelectScreen = SpriteKind.create()
    export const LettersRound = SpriteKind.create()
    export const EnteringWordLengths = SpriteKind.create()
    export const EnteringWord = SpriteKind.create()
    export const WordWaiting = SpriteKind.create()
    export const NumbersRound = SpriteKind.create()
    export const EnteringTargets = SpriteKind.create()
    export const EnteringNumbers = SpriteKind.create()
    export const ConundrumRound = SpriteKind.create()
    export const Waiting = SpriteKind.create()
}

const COUNTDOWN_SPRITE_KINDS: number[] = [
    SpriteKind.Setup,
    SpriteKind.SelectScreen,
    SpriteKind.LettersRound,
    SpriteKind.EnteringWordLengths,
    SpriteKind.EnteringWord,
    SpriteKind.WordWaiting,
    SpriteKind.NumbersRound,
    SpriteKind.EnteringTargets,
    SpriteKind.EnteringNumbers,
    SpriteKind.ConundrumRound,
    SpriteKind.Waiting,
]

let gameMode: number = 0
let numPlayers: number = 4
let accentColors: number[] = [
    0, // no player zero
    2, // player 1 = red
    6, // player 2 = steel blue
    4, // player 3 = orange
    7, // player 4 = green
]
let wordLengths: number[] = [0, 0, 0, 0, 0,]
let wordLengthSprites: TextSprite[] = []

function updateWordLengthSprite(player: number) {
    wordLengthSprites[player].setText(wordLengths[player].toString())
}

function drawWordLengthPanel(left: number, top: number, player: number): void {
    let accentColor: number = accentColors[player]
    let x: number = left + 40
    let y: number = top + 20
    let ts: TextSprite = textsprite.create(`Player ${player}`, 0, accentColor)
    ts.setMaxFontHeight(8)
    ts.setPosition(x, y)
    ts.setKind(gameMode)
    y += 15
    ts = textsprite.create(" ", 0, accentColor)
    ts.setMaxFontHeight(12)
    ts.setPosition(x, y)
    ts.setKind(gameMode)
    wordLengthSprites[player] = ts
    wordLengths[player] = 3
    updateWordLengthSprite(player)
}

function drawWordLengthInstructions(): void {
    let x: number = 80
    let y: number = 110
    let ts: TextSprite = textsprite.create(
        "Enter longest word length", 0, 1
    )
    ts.setMaxFontHeight(5)
    ts.setPosition(x, y)
    y += 7
    ts = textsprite.create(
        "Arrow=change A=select", 0, 1
    )
    ts.setMaxFontHeight(5)
    ts.setPosition(x, y)
}

function getWordLengths(): void {
    wordLengthSprites = []
    drawWordLengthPanel(0, 0, 1)
    drawWordLengthPanel(80, 0, 2)
    drawWordLengthPanel(0, 60, 3)
    drawWordLengthPanel(80, 60, 4)
    drawWordLengthInstructions()
    gameMode = SpriteKind.EnteringWordLengths
}

function changeWordLength(player: number, delta: number): void {
    wordLengths[player] += delta
    if (wordLengths[player] < 3) {
        wordLengths[player] = 9
    }
    if (wordLengths[player] > 9) {
        wordLengths[player] = 3
    }
    updateWordLengthSprite(player)
}

let numberSolutions: number[] = [0, 0, 0, 0, 0]
let numberSolnSprites: TextSprite[] = []
let target: number = 789

function updateNumberSolnSprite(player: number): void {
    numberSolnSprites[player].setText(
        Math.abs(target - numberSolutions[player]) > 10 ?
        "Miss" :
        numberSolutions[player].toString()
    )
}

function drawNumberSolnPanel(left: number, top: number, player: number): void {
    let accentColor: number = accentColors[player]
    let x: number = left + 40
    let y: number = top + 20
    let ts: TextSprite = textsprite.create(`Player ${player}`, 0, accentColor)
    ts.setMaxFontHeight(8)
    ts.setPosition(x, y)
    ts.setKind(gameMode)
    y += 15
    ts = textsprite.create("   ", 0, accentColor)
    ts.setMaxFontHeight(12)
    ts.setPosition(x, y)
    ts.setKind(gameMode)
    numberSolnSprites[player] = ts
    numberSolutions[player] = target
    updateNumberSolnSprite(player)
}

function drawNumberSolnInstructions(): void {
    let x: number = 80
    let y: number = 110
    let ts: TextSprite = textsprite.create(
        "Enter closest solution", 0, 1
    )
    ts.setMaxFontHeight(5)
    ts.setPosition(x, y)
    y += 7
    ts = textsprite.create(
        "Arrow=change A=select", 0, 1
    )
    ts.setMaxFontHeight(5)
    ts.setPosition(x, y)
}

function getNumbersSolns(): void {
    numberSolnSprites = []
    drawNumberSolnPanel(0, 0, 1)
    drawNumberSolnPanel(80, 0, 2)
    drawNumberSolnPanel(0, 60, 3)
    drawNumberSolnPanel(80, 60, 4)
    drawNumberSolnInstructions()
    gameMode = SpriteKind.EnteringTargets
}

function changeTarget(player: number, delta: number): void {
    numberSolutions[player] += delta
    if (numberSolutions[player] < target - 11) {
        numberSolutions[player] = target + 10
    }
    if (numberSolutions[player] > target + 11) {
        numberSolutions[player] = target - 10
    }
    updateNumberSolnSprite(player)
}

function buttonAPressed(player: number): void {
    if (gameMode == SpriteKind.EnteringWordLengths) {

    }
}

function buttonBPressed(player: number): void {

}

function buttonDownPressed(player: number): void {
    switch (gameMode) {
        case SpriteKind.EnteringWordLengths:
            changeWordLength(player, -1)
            break

        case SpriteKind.EnteringTargets:
            changeTarget(player, -1)
            break
    }
}

function buttonLeftPressed(player: number): void {
    switch (gameMode) {
        case SpriteKind.EnteringWordLengths:
            changeWordLength(player, -1)
            break

        case SpriteKind.EnteringTargets:
            changeTarget(player, -1)
            break
    }
}

function buttonRightPressed(player: number): void {
    switch (gameMode) {
        case SpriteKind.EnteringWordLengths:
            changeWordLength(player, 1)
            break

        case SpriteKind.EnteringTargets:
            changeTarget(player, 1)
            break
    }
}

function buttonUpPressed(player: number): void {
    switch (gameMode) {
        case SpriteKind.EnteringWordLengths:
            changeWordLength(player, 1)
            break

        case SpriteKind.EnteringTargets:
            changeTarget(player, 1)
            break
    }
}

// getWordLengths()
getNumbersSolns()
