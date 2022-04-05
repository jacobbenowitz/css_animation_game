// entry point, bundler will take required files here for use in main.js
import NavLinkCreator from "./scripts/nav_bar";
import Hero from "./scripts/hero";
import TodoCreator from "./scripts/todo_creator";
import TodoFunctionality from "./scripts/todo";
import ProductsCreator from "./scripts/products";
import Game from "./scripts/game";
import { LEVELS } from "./scripts/levels"

document.addEventListener("DOMContentLoaded", () => {

    // create the nav bar links
    const headerList = document.querySelector('.header-list');
    new NavLinkCreator(headerList);
    // create the hero section
    const hero = document.querySelector('.hero');
    new Hero(hero);
    // create todo section and form
    const todoSection = document.querySelector('.todo');
    new TodoCreator(todoSection);
    // add todo functionality
    const todoForm = document.querySelector('.todo-form');
    const todoList = document.querySelector('.todo-list');
    const todoStorage = JSON.parse(localStorage.getItem('todo-items')) || [];
    new TodoFunctionality(todoList, todoForm, todoStorage);
    // create products 
    const productsContainer = document.querySelector('.products-grid')
    new ProductsCreator(productsContainer);

    // create new game
    const interfaceContainer = document.querySelector('.interface');
    const game = new Game(interfaceContainer);

    // TODO: Load without ide, wait for play button click
    // const playButton = document.querySelector('.play-now')
    // playButton.addEventListener('click', startGame)

    // function startGame () {
    //     game.currentLevel = LEVELS[0];
    //     game.gameSetup();
    // }

})