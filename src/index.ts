import { setupCanvas } from './canvas';
import { bindControlListeners } from './controls';
import { startAnimationLoop } from './loop';

setupCanvas();

startAnimationLoop();
bindControlListeners();
