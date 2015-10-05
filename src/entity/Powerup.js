var Cell = require('./Cell');

function Powerup() {
    Cell.apply(this, Array.prototype.slice.call(arguments));

    this.cellType = 2;
    this.spiked = 1;
    this.fed = 1;
    this.color = {r: 100, g: 100, b: 255};
    this.namee = "Powerup x1";

}

module.exports = Powerup;
Powerup.prototype = new Cell();


Powerup.prototype.feed = function(feeder,gameServer) {
    this.setAngle(feeder.getAngle()); // Set direction if the Powerup explodes
    this.fed++; // Increase feed count
    this.namee = "Powerup x"+this.fed;
    gameServer.removeNode(feeder);
if(this.fed>14)
{
this.fed=14;
    this.namee = "Powerup > MAX!!!";
}
};

// Main Functions

Powerup.prototype.getEatingRange = function() {


    return this.getSize() * .4; // 0 for ejected cells
};

Powerup.prototype.onConsume = function(consumer,gameServer) {
   consumer.addMass(this.fed*150);
   consumer.decayMass = this.fed*125;
};

Powerup.prototype.onAdd = function(gameServer) {
    gameServer.nodesVirus.push(this);
};

Powerup.prototype.onRemove = function(gameServer) {
    var index = gameServer.nodesVirus.indexOf(this);
    if (index != -1) {
        gameServer.nodesVirus.splice(index, 1);
    } else {
        console.log("[Warning] Tried to remove a non existing Powerup!");
    }
};

