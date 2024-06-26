import { setupCanvas } from './canvas';
import { bindControlListeners } from './controls';
import { startAnimationLoop } from './animation';

setupCanvas();

startAnimationLoop();
bindControlListeners();
