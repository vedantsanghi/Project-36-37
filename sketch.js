var database;
var currentPath = []
var drawing= [];
var isDrawing = false;

function setup() {
  canvas = createCanvas(400, 400);
  database = firebase.database();

  canvas.mousePressed(startPath)
  canvas.parent('canvascontainer')
  canvas.mouseReleased(endPath)

  var saveButton = select('#saveButton');
  saveButton.mousePressed(saveDrawing);

  var clearButton = select('#clearButton');
  clearButton.mousePressed(clearDrawing);

  var ref = database.ref('drawings');
  ref.on('value', gotData)
}
function startPath() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}
function endPath() {
  isDrawing = false
}
function draw() {
  background(0);

  if (isDrawing) {
    var point = {
      x: mouseX,
      y: mouseY

    }
    currentPath.push(point);
  }

  stroke(255)
  strokeWeight(4)
  noFill()
  for (var i = 0; i < drawing.length; i++) {
     var path = drawing[i];
     console.log(drawing)
     beginShape();
     for (var j = 0; j < path.length; j++) {
       vertex(path[j].x, path[j].y)
    }
    endShape();
  }
}

function saveDrawing() {


  var ref = database.ref('drawings');
  var data = {
    name: 'VEDANT',
    drawing: drawing
  };
  var result = ref.push(data, dataSent);
  console.log(result.key);



  function dataSent(err, status) {
    console.log(status)
  }
}
function gotData(data) {
  // var elts = selectAll('.listing')
  // for (var i = 0; i < elts.length; i++) {
  //   elts[i].remove();
  // }
  var drawings = data.val();
  // var keys = Object.keys(drawings);
  // for (var i = 0; i < keys.length; i++) {
  //   var key = keys[i];
  //   console.log(key)
  //   var li = createElement('li', '');
  //   li.class('listing');
  //   var ahref = createA('#', key);
  //   ahref.mousePressed(showDrawing)
  //   ahref.parent(li);
  //   li.parent('drawinglist');

    //console.log(key);


function errData(err) {
  console.log(err)
}
}
// function showDrawing() {
//   //if (key instanceof MouseEvent) {
//     key = this.html();
//   //}
//   var ref = database.ref('drawings/' + key)
//   ref.once('value', oneDrawing, errData)


// }

function oneDrawing(data) {
  var dbdrawing = data.val();
  drawing = dbdrawing.drawing
  console.log(drawing);
}
function clearDrawing() {
  drawing = []
}
