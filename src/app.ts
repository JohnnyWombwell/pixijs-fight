import * as PIXI from './pixi/pixi.js';

// Create the application helper and add its render target to the page
const app = new PIXI.Application({ backgroundColor: 0x000000 });
document.body.appendChild(app.view);

const text = new PIXI.Text('pixijs Fighter');
text.x = 50;
text.y = 100;
text.style.fill = 'green';

app.stage.addChild(text);
