import PromptCreator from "./prompt";
import IdeCreator from "./ide";
import { LEVELS } from './levels'

export default class Game {
  constructor(interfaceContainer) {
    this.hero = document.querySelector('.hero')
    this.interfaceContainer = interfaceContainer;
    this.currentLevel = this.currentLevel() || LEVELS[0];
    this.lessonIndex = 0;
    this.promptContainer = new PromptCreator();
    this.ide = new IdeCreator();
    this.bindHandlers();
    this.gameSetup();
    this.userSubmitListener();
  }

  // TODO: Refactor lessonNumbr to use lessonIdex (game and ide/prompt)
  // get level from localStorage, return undefined if none
  currentLevel() {
    const lessonNumber = localStorage.getItem('lessonNumber');
    if (lessonNumber) {
      this.lessonIndex = lessonNumber;
      const currentLevel = JSON.parse(LEVELS[lessonNumber]);
      return LEVELS[currentLevel];
    }
    return undefined;
  }

  bindHandlers() {
    this.gameSetup = this.gameSetup.bind(this);
    this.nextLevel = this.nextLevel.bind(this);
    this.prevLevel = this.prevLevel.bind(this);
    this.checkUserInput = this.checkUserInput.bind(this);
    // TODO: debounce & throttle bind method to check if solution?
  }

  gameSetup() {
    // render prompt instructions 
    this.promptContainer.addPromptContent(this.currentLevel);
    this.promptContainer.attachPrompt(this.interfaceContainer);
    // render ide with boiler code and form
    this.ide.addIdeContent(this.currentLevel);
    this.ide.attachIde(this.interfaceContainer);
  }

  levelNavListeners() {
    // select lesson nav buttons, add listeners
    const back = document.querySelector('.prev-lesson')
    const next = document.querySelector('.next-lesson')
    // TODO querySelect dropdown
    // TODO querySelect reset button
    back.addEventListener('click', this.nextLevel)
    next.addEventListener('click', this.prevLevel)
  }

  nextLevel(e) {
    console.log(e.target); // NOT LOGGING
    e.stopPropagation();
    if (this.currentLevel.lessonNumber + 1 === LEVELS.length) {
      return;
    }
    this.levelSuccess();
  }
  
  prevLevel(e) {
    console.log(e.target); // NOT LOGGING
    e.stopPropagation();
    // go to prev unless this is level 0
    if (this.currentLevel === 0) return;
    let prevLevel = this.currentLevel - 1;
    this.currentLevel = LEVELS[prevLevel];
    // load prev level
    this.renderNewLevel()
  }

  userSubmitListener() {
    const ideContainer = document.querySelector('#ide')
    ideContainer.addEventListener(
      'click', this.checkUserInput
    );
  }

  checkUserInput(e) {
    console.log(e.target);
    const button = document.querySelector('.ide-button');
    const userInput = document.getElementsByClassName('code-input');
    const inputText = userInput[0].value;
    const solution = this.currentLevel.solution;
    // get user input
    if (e.target === button && inputText === solution) {
      console.log('SUCCESS: Render new level pls')
      this.levelSuccess();
    }
    undefined;
  }

  renderNewLevel() {
    console.log('in renderNewLevel');
    localStorage.setItem("lessonNumber",
      JSON.stringify(this.currentLevel.lessonNumber));
    this.gameSetup();
  }

  levelSuccess() {
    this.lessonIndex = this.lessonIndex + 1;
    console.log(`new level: ${this.lessonIndex}`)
    debugger
    if (LEVELS[this.lessonIndex]) {
      this.currentLevel = LEVELS[this.lessonIndex];
      this.renderNewLevel();
    }
    undefined;
  }

}