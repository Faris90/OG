var Cell = require('./Cell');

function EjectedMass() {
    Cell.apply(this, Array.prototype.slice.call(arguments));

    this.cellType = 3;
    this.size = Math.ceil(Math.sqrt(100 * this.mass));
this.squareSize = (100 * this.mass) >> 0; // not being decayed -> calculate one time
this.oww = "";
this.adbc=0;
}

module.exports = EjectedMass;
EjectedMass.prototype = new Cell();

EjectedMass.prototype.getSize = function() {
    return this.size;
};

EjectedMass.prototype.calcMove = null; // Only for player controlled movement

// Main Functions

EjectedMass.prototype.sendUpdate = function() {
    // Whether or not to include this cell in the update packet

    return true;
};

EjectedMass.prototype.onRemove = function(gameServer) { 
    // Remove from list of ejected mass
    var index = gameServer.nodesEjected.indexOf(this);
    if (index != -1) {
        gameServer.nodesEjected.splice(index,1);
    }
};

EjectedMass.prototype.onConsume = function(consumer,gameServer) {
    // Adds mass to consumer
    consumer.addMass(this.mass);
};

EjectedMass.prototype.onAutoMove = function(gameServer) {
//    if (gameServer.nodesVirus.length < gameServer.config.virusMaxAmount)
{
        // Check for viruses
        var v = gameServer.getNearestVirus(this);
        if (v && this.oww==="") { // Feeds the virus if it exists
            v.feed(this,gameServer);
            return true;
        }
    }
};

EjectedMass.prototype.moveDone = function(gameServer) {
    if (!this.onAutoMove(gameServer)) {

    }
};

EjectedMass.prototype.update = function(){
		if(this.oww==="")
	{
	}else
	{
			if(this.adbc>350)
			{
		this.namee = "Owner: "+this.oww;
		}else
		{
						this.adbc++;

			this.namee = "Playermass · " + (350-this.adbc);
			
		}}
};


EjectedMass.prototype.getSquareSize = function () 
{
    return this.squareSize;
};
