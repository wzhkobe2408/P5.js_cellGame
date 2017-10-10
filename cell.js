
function Cell(i, j, w){
  this.i = i;
  this.j = j;
  this.x = i*w;
  this.y = j*w;
  this.w = w;
  this.neighborCount = 0;
  this.bee = false;
  this.revealed = false;
}


Cell.prototype.show = function() {
  stroke(0);
  noFill();
  rect(this.x, this.y, this.w, this.w);
  if(this.revealed){
    if (this.bee) {
      stroke(0);
      fill(200);
      ellipse(this.x+this.w/2,this.y+this.w/2,this.w*0.5);
    } else {
      fill(200);
      rect(this.x, this.y, this.w, this.w);
      if(this.neighborCount > 0) {
        textAlign(CENTER);
        fill(0);
        text(this.neighborCount, this.x + this.w/2, this.y + this.w - 10);
      }
    }
  }
}

Cell.prototype.contains = function(x, y){
  return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
}

Cell.prototype.reveal = function(){
  this.revealed = true;
  if(this.neighborCount === 0 && !this.bee) {
    this.floodFill();
  }else if(this.bee) {
    for(var i = 0; i < cols; i++) {
      for(var j = 0; j < rows; j++) {
        grid[i][j].revealed = true;
      }
    }
  }
}

Cell.prototype.countBees = function() {
  if(this.bee){
    return -1;
  }

  var total = 0;
  for(var xoff = -1; xoff < 2; xoff++){
     for(var yoff = -1; yoff < 2; yoff++){
        var i = this.i + xoff;
        var j = this.j + yoff;
        if(i > -1 && i< cols && j > -1 && j < rows){
          var neighbor = grid[i][j];
          if(neighbor.bee){
            total++;
          }
        }
      }
    }
  this.neighborCount = total;
}

Cell.prototype.floodFill = function() {
  for(var xoff = -1; xoff < 2; xoff++){
     for(var yoff = -1; yoff < 2; yoff++){
        var i = this.i + xoff;
        var j = this.j + yoff;
        if(i > -1 && i< cols && j > -1 && j < rows) {
          var neighbor = grid[i][j];
          if(!neighbor.bee && !neighbor.revealed) {
            neighbor.reveal();
          }
        }
      }
    }
}
