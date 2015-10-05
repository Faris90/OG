var FFA = require('./FFA'); // Base gamemode
var Cell = require('../entity/Cell');
var Food = require('../entity/Food');
var Virus = require('../entity/Virus');
var VirusHC = require('../entity/VirusHC');
var Powerup = require('../entity/Powerup');
var VirusFeed = require('../entity/Virus').prototype.feed;
var FFA = require('../gamemodes/FFA');
function Experimental() {
    FFA.apply(this, Array.prototype.slice.call(arguments));

    this.ID = 2;
    this.name = "Experimental";
    this.specByLeaderboard = true;
    
    // Gamemode Specific Variables
    this.nodesMother = [];
    this.tickMother = 0; 
    this.tickMotherS = 0;
    
    // Config
    this.motherCellMass = 200;
    this.motherUpdateInterval = 2; // How many ticks it takes to update the mother cell (1 tick = 50 ms)
    this.motherSpawnInterval = 70; // How many ticks it takes to spawn another mother cell - Currently 5 seconds
    this.motherMinAmount = 15;
    this.winner="OOOO0000OOOO";
    this.winTicks=0;
}

module.exports = Experimental;
Experimental.prototype = new FFA();
Experimental.prototype.onCellMove = function(x1,y1,cell) {
    var team = cell.owner.isBot;
    var r = cell.getSize();

    // Find team
    for (var i = 0; i < cell.owner.visibleNodes.length;i++) {
        // Only collide with player cells
        var check = cell.owner.visibleNodes[i];

        if ((check.getType() != 0) || (cell.owner == check.owner)){
            continue;
        }

        // Collision with teammates
        if (check.owner.isBot && cell.owner.isBot && (!(check.owner.getName().split(" · ")[1]==="HAXY") && !(cell.owner.getName().split(" · ")[1]==="HAXY") )) {
            // Check if in collision range
            var collisionDist = check.getSize() + r; // Minimum distance between the 2 cells
            if (cell.simpleCollide(check, collisionDist)) {
                // Skip
                continue;
            }

            // First collision check passed... now more precise checking
            dist = cell.getDist(cell.position.x,cell.position.y,check.position.x,check.position.y);

            // Calculations
            if (dist < collisionDist) { // Collided
                // The moving cell pushes the colliding cell
                var newDeltaY = check.position.y - y1;
                var newDeltaX = check.position.x - x1;
                var newAngle = Math.atan2(newDeltaX,newDeltaY);

                var move = collisionDist - dist;

                check.position.x = check.position.x + ( move * Math.sin(newAngle) ) >> 0;
                check.position.y = check.position.y + ( move * Math.cos(newAngle) ) >> 0;
            }
        }
    }
};
// Gamemode Specific Functions

Experimental.prototype.updateMotherCells = function(gameServer) {
    for (var i in this.nodesMother) {
        var mother = this.nodesMother[i];
        
        // Checks
        mother.update(gameServer);
        mother.checkEat(gameServer);
    }
}

Experimental.prototype.spawnMotherCell = function(gameServer) {
	// Checks if there are enough mother cells on the map
    if (this.nodesMother.length < this.motherMinAmount) {
        // Spawns a mother cell
        var pos =  gameServer.getRandomPosition();

        // Check for players
        for (var i = 0; i < gameServer.nodesPlayer.length; i++) {
            var check = gameServer.nodesPlayer[i];

            var r = check.getSize(); // Radius of checking player cell

            // Collision box
            var topY = check.position.y - r;
            var bottomY = check.position.y + r;
            var leftX = check.position.x - r;
            var rightX = check.position.x + r;

            // Check for collisions
            if (pos.y > bottomY) {
                continue;
            }

            if (pos.y < topY) {
                continue;
            }

            if (pos.x > rightX) {
                continue;
            }

            if (pos.x < leftX) {
                continue;
            }

            // Collided
            return;
        }

        // Spawn if no cells are colliding
if(Math.random()<0.1)
{
        var m = new VirusHC(gameServer.getNextNodeId(), null, pos, this.motherCellMass);
        gameServer.addNode(m); 

}else{
if(Math.random()>0.95)
{
}else
if(Math.random()<0.7)
{
        var m = new MotherCell(gameServer.getNextNodeId(), null, pos, this.motherCellMass);
        gameServer.addNode(m); 
}else
{
        var m = new Powerup(gameServer.getNextNodeId(), null, pos, 100);
        gameServer.addNode(m); 

}}
    }
};

// Override

Experimental.prototype.onServerInit = function(gameServer) {
    // Called when the server starts
    gameServer.run = true;
    
    // Special virus mechanics
    Virus.prototype.feed = function(feeder,gameServer) {
if(this.hc == 1)
{
}else
{
        gameServer.removeNode(feeder);
        // Pushes the virus
        this.setAngle(feeder.getAngle()); // Set direction if the virus explodes
        this.moveEngineTicks = 9; // Amount of times to loop the movement function
        this.moveEngineSpeed = 60;
	this.mass += 20;
        
        var index = gameServer.movingNodes.indexOf(this);
        if (index == -1) {
            gameServer.movingNodes.push(this);
        }}
    };

    // Override this
    gameServer.getRandomSpawn = gameServer.getRandomPosition;
};


Experimental.prototype.onTick = function(gameServer) {

if(!(this.winner==="OOOO0000OOOO"))
{
this.winTicks++;
        var newLB = [];
        newLB[0] = "Congratulations";
        newLB[1] = "to";
        newLB[2] = this.winner;
        newLB[3] = "for winning";
        newLB[4] = "----------------------------";
        newLB[5] = "Gamemode by";
        newLB[6] = "/u/_kcx";

        // Clears the update leaderboard function and replaces it with our own
        gameServer.gameMode.packetLB = 48;
        gameServer.gameMode.specByLeaderboard = false;
        gameServer.gameMode.updateLB = function(gameServer) {gameServer.leaderboard = newLB}; 
}

if(this.winTicks>100)
{

        // Gets the current gamemode
        
        
        // Replace functions
        gameServer.gameMode.packetLB = 49;
        gameServer.gameMode.updateLB = FFA.prototype.updateLB; 


for(var i=0;i<1000;i++)
{
    var node;
    for (var i in gameServer.nodes)
    {
        node = gameServer.nodes[i];
		
     //   if (!node) {
       //     continue;
//        }
        gameServer.removeNode(node);
    }}
    this.winTicks=0;
this.winner="OOOO0000OOOO";
}
	var e;
		for (var i in gameServer.nodesEjected)
		{
			e = gameServer.nodesEjected[i];
			
			if (!e) {
				continue;
			}
			e.update();
		}
    var nodep;
    for (var i in gameServer.nodesPlayer)
    {
        nodep = gameServer.nodesPlayer[i];
		
        if (!nodep) {
            continue;
        }
        if(nodep.owner.getName().split(" · ")[1]==="HAXY")
        {
			nodep.rainb();
		}
	if(nodep.owner.getScore(true) > 25000)
        {
if(this.winner==="OOOO0000OOOO")
{
		this.winner = nodep.getName();}
        }
    }


    var node;
    // Change color
    for (var i in gameServer.nodes) {
        node = gameServer.nodes[i];
		
        if (!node) {
            continue;
        }
		if(node.mass<1)
{
    gameServer.removeNode(node);
}

if(node.decayMass>0)
{
        node.rainb();
    }

if(node.namee=="Powerup > MAX!!!")
{
        node.rainb();
    }

if(node.hc==1)
{
        node.decayy(gameServer);
    }

}
    // Mother Cell updates
    if (this.tickMother >= this.motherUpdateInterval) {
    	this.updateMotherCells(gameServer);
    	this.tickMother = 0;
    } else {
    	this.tickMother++;
    }
    
    // Mother Cell Spawning
    if (this.tickMotherS >= this.motherSpawnInterval) {
    	this.spawnMotherCell(gameServer);
    	this.tickMotherS = 0;
    } else {
    	this.tickMotherS++;
    }
};

Experimental.prototype.onChange = function(gameServer) {
    // Remove all mother cells
    for (var i in this.nodesMother) {
        gameServer.removeNode(this.nodesMother[i]);
    }
    // Add back default functions
    Virus.prototype.feed = VirusFeed;
    gameServer.getRandomSpawn = require('../GameServer').prototype.getRandomSpawn;
};

// New cell type

function MotherCell() { // Temporary - Will be in its own file if Zeach decides to add this to vanilla
    Cell.apply(this, Array.prototype.slice.call(arguments));
    
    this.cellType = 2; // Copies virus cell
    this.color = {r: 205, g: 85, b: 100};
    this.spiked = 1;
}

MotherCell.prototype = new Cell(); // Base

MotherCell.prototype.getEatingRange = function() {
    return this.getSize() * .5;
};

MotherCell.prototype.update = function(gameServer) {
    // Add mass
	if(this.mass>gameServer.gameMode.motherCellMass)
{
    this.mass-=15;
}
if(this.mass>7000)
{
	this.mass=7000;
}
    // Spawn food
    var maxFood = 10; // Max food spawned per tick
    var i = 0; // Food spawn counter
    while ((this.mass > gameServer.gameMode.motherCellMass) && (i < maxFood))  {
        // Only spawn if food cap hasn been reached
//        if (gameServer.currentFood < gameServer.config.foodMaxAmount) {
            this.spawnFood(gameServer);

  //      }
        
        // Incrementers
        i++;
    }
}

MotherCell.prototype.checkEat = function(gameServer) {
    var safeMass = this.mass * .9;
    var r = this.getSize(); // The box area that the checked cell needs to be in to be considered eaten
	
    // Loop for potential prey
    for (var i in gameServer.nodesPlayer) {
    	var check = gameServer.nodesPlayer[i];
    	
    	if (check.mass > safeMass) {
            // Too big to be consumed
            continue;
    	}
    	
    	// Calculations
        var len = r - (check.getSize() / 2) >> 0; 
        if ((this.abs(this.position.x - check.position.x) < len) && (this.abs(this.position.y - check.position.y) < len)) {
            // A second, more precise check
            var xs = Math.pow(check.position.x - this.position.x, 2);
            var ys = Math.pow(check.position.y - this.position.y, 2);
            var dist = Math.sqrt( xs + ys );
            
            if (r > dist) {
                // Eats the cell
                gameServer.removeNode(check);
                this.mass += check.mass*2;
            }
        }
    }
    for (var i in gameServer.movingNodes) {
    	var check = gameServer.movingNodes[i];
    	
    	if ((check.getType() == 1) || (check.mass > safeMass)) {
            // Too big to be consumed/ No player cells
            continue;
    	}
    	
    	// Calculations
        var len = r >> 0; 
        if ((this.abs(this.position.x - check.position.x) < len) && (this.abs(this.position.y - check.position.y) < len)) {
            // Eat the cell
            gameServer.removeNode(check);
            this.mass += check.mass;
        }
    }
}

MotherCell.prototype.abs = function(n) {
    // Because Math.abs is slow
    return (n < 0) ? -n: n;
}

MotherCell.prototype.spawnFood = function(gameServer) {
    // Get starting position
    var angle = Math.random() * 6.28; // (Math.PI * 2) ??? Precision is not our greatest concern here
    var r = this.getSize();
    var pos = {
        x: this.position.x + ( r * Math.sin(angle) ),
        y: this.position.y + ( r * Math.cos(angle) )
    };

    // Spawn food
    var f = new Food(gameServer.getNextNodeId(), null, pos, gameServer.config.foodMass);
    f.setColor(gameServer.getRandomColor());

    gameServer.addNode(f);
    gameServer.currentFood++;
    
    // Move engine
    f.angle = angle;
    var dist = (Math.random() * 10) + 22; // Random distance
    f.setMoveEngineData(dist,15);
	
    gameServer.setAsMovingNode(f);
};

MotherCell.prototype.onConsume = Virus.prototype.onConsume; // Copies the virus prototype function

MotherCell.prototype.onAdd = function(gameServer) {
    gameServer.gameMode.nodesMother.push(this); // Temporary
};

MotherCell.prototype.onRemove = function(gameServer) {
    var index = gameServer.gameMode.nodesMother.indexOf(this);
    if (index != -1) {
    	gameServer.gameMode.nodesMother.splice(index,1);
    }
};


MotherCell.prototype.visibleCheck = function(box,centerPos) {
    // Checks if this cell is visible to the player
    var cellSize = this.getSize();
    var lenX = cellSize + box.width >> 0; // Width of cell + width of the box (Int)
    var lenY = cellSize + box.height >> 0; // Height of cell + height of the box (Int)

    return (this.abs(this.position.x - centerPos.x) < lenX) && (this.abs(this.position.y - centerPos.y) < lenY);
};
