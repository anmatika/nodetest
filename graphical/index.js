var { Rectangle, graphical } = require('graphical');

graphical(8111); // listen on port 8111
var rectangle = new Rectangle();
rectangle.setPos(0, 0);
rectangle.setColor('blue');
rectangle.setSize(20, 20);
