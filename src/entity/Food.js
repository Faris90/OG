var Cell = require('./Cell');

function Food() {
    Cell.apply(this, Array.prototype.slice.call(arguments));

    this.cellType = 1;
    this.spiked=Math.random()<0.3;
    if(this.spiked)
    {
		this.mass*=2;
	}
	this.mass += 3*Math.random()*Math.random();
    this.size = Math.ceil(Math.sqrt(100 * this.mass));
    this.squareSize = (100 * 1) >> 0; // not being decayed -> calculate one time 
}

module.exports = Food;
Food.prototype = new Cell();

Food.prototype.getSize = function() {
    return this.size;
};

Food.prototype.calcMove = null; // Food has no need to move

// Main Functions

Food.prototype.sendUpdate = function() {
    // Whether or not to include this cell in the update packet
    if (this.moveEngineTicks == 0) {
        return false;
    }
    return true;
};

Food.prototype.onRemove = function(gameServer) {
    gameServer.currentFood--;
};

Food.prototype.onConsume = function(consumer,gameServer) {
	var m = 1;
	if(this.spiked)
	{
		m=2;
	}
	if(consumer.owner.isBot)
	{	
		consumer.addMass(m*4);
	}
    consumer.addMass(m);
};


Food.prototype.getSquareSize = function () {
    return this.squareSize;
};
