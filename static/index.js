
const CanvasBackground = class {
  constructor(canvasDOM) {
    this.DOM = canvasDOM;
    this.context = canvasDOM.getContext('2d');
    this.setDimension();
  }

  setDimension() {
    this.width = window.outerWidth;
    this.height = window.outerHeight;
    this.DOM.width = this.width;
    this.DOM.height = this.height;
  }

  startDraw() {
    this.context.beginPath();
    this.createBackgroundPoints();
  }

  createBackgroundPoints() {
    for(let coordX = 0; coordX < this.width; coordX += 30) {
      for(let coordY = 0; coordY < this.height; coordY += 30) {
        this.context.beginPath();
        this.context.arc(coordX, coordY, 1, 0, 2 * Math.PI);
        this.context.fillStyle = '#ccc';
        this.context.fill();
      }
    }
  }
}

new CanvasBackground(document.getElementById('indexBackground')).startDraw();