var width = 800;
var height = 600;
var game = new Phaser.Game(width, height, Phaser.AUTO, null, { preload: preload, create: create, update: update });

var ammon;
var sheep;
var goons;
var goonTop;
var goonBottom;
var score = 0;
var scoreText;
var winText;
var loseText;
var ammonSpeed = 175;
var goonSpeed = 50;
var gameStarted = false;
var spaceBar;

function preload() {
    this.load.image('ammon', 'assets/ammon75.png');
    this.load.image('sheep', 'assets/sheep75.png');
    this.load.image('goon', 'assets/goon75.png');

}
function create() {
    this.stage.backgroundColor = '#578018';

    this.physics.startSystem(Phaser.Physics.ARCADE);
    cursors = this.input.keyboard.createCursorKeys();
    //spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    sheep = this.add.sprite(width * .5, height * .5, 'sheep');
    sheep.anchor.setTo(.5, .5);

    ammon = this.add.sprite(width * .6, height * .5, 'ammon');
    ammon.anchor.setTo(.5, .5);

    goonTop = this.add.sprite(width * .5, 50, 'goon');
    goonTop.anchor.setTo(.5, .5);

    goonBottom = this.add.sprite(width * .5, height * .9, 'goon');
    goonBottom.anchor.setTo(.5, .5);

    this.physics.enable(ammon, Phaser.Physics.ARCADE);
    this.physics.enable(sheep, Phaser.Physics.ARCADE);
    this.physics.enable(goonTop, Phaser.Physics.ARCADE);
    this.physics.enable(goonBottom, Phaser.Physics.ARCADE);

    goonTop.body.velocity.y = goonSpeed;
    goonBottom.body.velocity.y = -goonSpeed;

    ammon.body.collideWorldBounds = true;
    goonTop.body.collideWorldBounds = true;
    goonBottom.body.collideWorldBounds = true;

    scoreText = this.add.text(5, 3, score);
}
function update() {
    if (cursors.up.isDown) {
        ammon.body.velocity.y = -ammonSpeed;
    }
    else if (cursors.down.isDown) {
        ammon.body.velocity.y = ammonSpeed;
    }
    else {
        ammon.body.velocity.y = 0;
    }

    if (cursors.left.isDown) {
        ammon.body.velocity.x = -ammonSpeed;
    }
    else if (cursors.right.isDown) {
        ammon.body.velocity.x = ammonSpeed;
    }
    else {
        ammon.body.velocity.x = 0;
    }

    this.physics.arcade.overlap(ammon, goonBottom, killGoonBottom);

    this.physics.arcade.overlap(ammon, goonTop, killGoonTop)

    this.physics.arcade.overlap(goonTop, sheep, endGameTop);

    this.physics.arcade.overlap(goonBottom, sheep, endGameBottom)

    if (score == 10) {
        winText = this.add.text(width * .5, height * .5, "You Win!");
        winText.anchor.setTo(.5, .5);
        goonBottom.body.velocity.y = 0;
        goonTop.body.velocity.y = 0;
        ammon.body.velocity = 0;
        gameStarted = false;
    }

}

function killGoonBottom(ammon, goonBottom) {
    goonBottom.kill();
    score++;
    scoreText.text = score;
    goonSpeed += 2;

    goonBottom.reset(width * .5, height * .9);
    goonBottom.body.velocity.y = -goonSpeed;
}

function killGoonTop(ammon, goonTop) {
    goonTop.kill();
    score++;
    scoreText.text = score;
    goonSpeed += 2;

    goonTop.reset(width * .5, 50);
    goonTop.body.velocity.y = goonSpeed;
}

function endGameTop(goonTop, sheep) {
    sheep.kill();
    goonTop.body.velocity.y = 0;
    goonBottom.body.velocity.y = 0;
    ammon.body.velocity = 0;

    loseText = this.add.text(width * .5, height * .5, "You lose!");
    loseText.anchor.setTo(.5, .5);
}

function endGameBottom(goonBottom, sheep) {
    sheep.kill();
    goonTop.body.velocity.y = 0;
    goonBottom.body.velocity.y = 0;
    ammon.body.velocity = 0;

    loseText = this.add.text(width * .5, height * .5, "You lose!");
    loseText.anchor.setTo(.5, .5);
}

