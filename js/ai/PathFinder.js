Array.matrix = function(numrows, numcols, initial){
    var arr = [];
    for (var i = 0; i < numrows; ++i){
       var columns = [];
       for (var j = 0; j < numcols; ++j){
          columns[j] = initial;
       }
       arr[i] = columns;
     }
     return arr;
 }

class Point{
    constructor(x, y){
        if(x === null || y == null){
            this.x = this.y = -1;
          }else{
            this.x = x;
            this.y = y;            
        }
        this.g = this.h = this.f = 0;
        this.father = null;
    }

    isEqualTo (point){
        if (point != null && this.x == point.x && this.y == point.y){
            return true;
        }else{
            return false;
        }
    }

    assign(point){
        if(point != null){
            this.x = point.x;
            this.y = point.y;
        }
    }

    plus(point){
        return new Point(this.x + point.x, this.y + point.y);
    }
}
var PathFinder = {
    DIRECTION: {
        TL: new Point(-1, -1),
        T:  new Point(0, -1),
        TR: new Point(1, -1),
        L:  new Point(-1, 0),
        R:  new Point(1, 0),
        BL: new Point(-1 , 1),
        B:  new Point(0, 1),
        BR: new Point(1, 1)
    },

    notVisited:     0,
    inOpenlist:     1,
    inCloselist:    2,

    isWall: function(point, grid){
        if(grid[point.y][point.x].isPassable)
            return true;
        return false;
    },

    isDiagonalAllow: function(grid, point, side1, side2){
        if(grid[point.y + side1.y][point.x + side1.x].isPassable && grid[point.y + side2.y][point.x + side2.x].isPassable)
            return true;
        return false;
    },

    calcG: function(point){
        if(point.father == null){
            return 0;
        }
        return point.father.g + 1;
    },

    calcH: function(point, endPoint){
        return Math.abs(point.x-endPoint.x)+Math.abs(point.y-endPoint.y);
    },

    calcF: function(point){
        return point.g + point.h;
    },

    shiftMinFpoint: function(openlist){
        var minFPoint=null;
        var index = null;
        for(var i=0; i < openlist.length; i++){
            if (minFPoint == null || minFPoint.F > openlist[i]){
                minFPoint = openlist[i];
                index = i;
            }
        }
        openlist.splice(index, 1);
        return minFPoint;
    },

    findNeighbors: function(grid, point, source){
        var neighbors = [];
        //L
        nPoint = point.plus(this.DIRECTION.L);
        if(nPoint.x >= 0 && grid[nPoint.y][nPoint.x].isPassable 
            || (grid[nPoint.y][nPoint.x].creep != null && source.player != grid[nPoint.y][nPoint.x].creep.player)){
            neighbors.push(nPoint);
        }
        //R
        nPoint = point.plus(this.DIRECTION.R);
        if(nPoint.x < grid.width && grid[nPoint.y][nPoint.x].isPassable 
            || (grid[nPoint.y][nPoint.x].creep != null && source.player != grid[nPoint.y][nPoint.x].creep.player)){
            neighbors.push(nPoint);
        }
        //T
        var nPoint = point.plus(this.DIRECTION.T);
        if(nPoint.y >= 0 && grid[nPoint.y][nPoint.x].isPassable
            || (grid[nPoint.y][nPoint.x].creep != null && source.player != grid[nPoint.y][nPoint.x].creep.player)){
            neighbors.push(nPoint);
        }
        //B
        nPoint = point.plus(this.DIRECTION.B);
        if(nPoint.y < grid.height && grid[nPoint.y][nPoint.x].isPassable 
            || (grid[nPoint.y][nPoint.x].creep != null && source.player != grid[nPoint.y][nPoint.x].creep.player)){
            neighbors.push(nPoint);
        }
        return neighbors;
    },

    addNeighborToOpenList: function(neighbors, openlist, fatherPoint, endPoint, gridCheck){
        for(var i = 0; i < neighbors.length; i++){
            var point = neighbors[i];
            if (gridCheck[point.y][point.x] != this.inCloselist && gridCheck[point.y][point.x] != this.inOpenlist){
                point.father = fatherPoint;
                point.g = this.calcG(point);
                point.h = this.calcH(point, endPoint);
                point.f = this.calcF(point);
                openlist.push(point)
                gridCheck[point.y][point.x] = this.inOpenlist;
            }
        }
    },
    
    findPath: function(grid, source, target){
        var startP = new Point(source.gridX, source.gridY), endP= new Point(target.gridX, target.gridY);
        if(!grid[endP.y][endP.x].isPassable && grid[endP.y][endP.x].creep == null) return [];
        var openlist = new MinHeap (function(elem){
            return elem.f;
        });
        var shortestPath = [];
        var gridCheck = Array.matrix(grid.width, grid.height, 0);
        openlist.push(startP);
        while(gridCheck[endP.y][endP.x] != this.inOpenlist || openlist.length == 0){
            var curPoint = openlist.pop();
            //path no find
            if(curPoint==null) return [];
            gridCheck[curPoint.y][curPoint.x] = this.inCloselist;
            this.addNeighborToOpenList(this.findNeighbors(grid, curPoint, source), openlist, curPoint, endP, gridCheck);
        }

        var p = openlist.find(function(elem){
            return elem.isEqualTo(endP);
        });

        shortestPath.push(p);
        while(p.father != null && !startP.isEqualTo(p.father ) ){
            p= p.father;
            shortestPath.unshift(p);
        }
        return shortestPath;
    }
}


