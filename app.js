'use strict';

// arrays to store image names, filepaths, and text ids
var imageNameArr = ['Bag', 'Banana', 'Bathroom', 'Boots', 'Breakfast', 'Bubblegum',
  'Chair', 'Cthulhu', 'Dog Duck', 'Dragon', 'Pen', 'Pet Sweep', 'Scissors', 'Shark', 'Sweep', 'Tauntaun', 'Unicorn', 'USB', 'Water Can', 'Wine Glass'];

var filePathArr = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg',
  'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.gif', 'img/water-can.jpg', 'img/wine-glass.jpg'];

var textIdArr = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum',
  'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

// array for created image objects
var allImages = [];

// counter variable to track total clicks
var numTotalClick = 0;

// constructor function for image object
function CreateImage(name, filePath, idText) {
  this.name = name;
  this.filePath = filePath;
  this.idText = idText;
  this.numDisplay = 0;
  this.numClick = 0;
  allImages.push(this);
}

// function to create image instances from constructor
function makeAllImages() {
  for (var i = 0; i < imageNameArr.length; i++) {
    new CreateImage(imageNameArr[i], filePathArr[i], textIdArr[i]);
  }
}
makeAllImages();

// generate three random, unique numbers
var randNumArr;
var prevRandNum1;
var prevRandNum2;
var prevRandNum3;
var randNum1 = Math.floor(Math.random() * filePathArr.length);
var randNum2 = Math.floor(Math.random() * filePathArr.length);
var randNum3 = Math.floor(Math.random() * filePathArr.length);

function generateRandomNumbers(){
  randNum1 = Math.floor(Math.random() * filePathArr.length);
  while (randNum1 === prevRandNum1 || prevRandNum2 || prevRandNum3) {
    randNum1 = Math.floor(Math.random() * filePathArr.length);
  }
  console.log(randNum1);

  randNum2 = Math.floor(Math.random() * filePathArr.length);
  while (randNum2 === randNum1 || randNum2 === prevRandNum1 || randNum2 === prevRandNum2 || randNum2 === prevRandNum3) {
    randNum2 = Math.floor(Math.random() * filePathArr.length);
  }
  console.log(randNum2);

  randNum3 = Math.floor(Math.random() * filePathArr.length);
  while (randNum3 === randNum2 || randNum3 === randNum1 || randNum3 === prevRandNum1 || randNum3 === prevRandNum2 || randNum3 === prevRandNum3) {
    randNum3 = Math.floor(Math.random() * filePathArr.length);
  }
  console.log(randNum3);
  randNumArr = [randNum1, randNum2, randNum3];
  console.log(randNumArr);
}

// store previously generated random numbers to compare against current generated random numbers

// create image element variables
var imgEl1 = document.getElementById('image-1');
var imgEl2 = document.getElementById('image-2');
var imgEl3 = document.getElementById('image-3');

// function to select three random images and display using DOM manipulation
function randomImages() {
  generateRandomNumbers();
  prevRandNum1 = randNum1;
  prevRandNum2 = randNum2;
  prevRandNum3 = randNum3;

  var randomId1 = allImages[randNumArr[0]].idText; // access id attribute for randomly selected image
  var randomId2 = allImages[randNumArr[1]].idText;
  var randomId3 = allImages[randNumArr[2]].idText;
  imgEl1.id = randomId1;
  imgEl1.src = allImages[randNumArr[0]].filePath;

  imgEl2.id = randomId2;
  imgEl2.src = allImages[randNumArr[1]].filePath;

  imgEl3.id = randomId3;
  imgEl3.src = allImages[randNumArr[2]].filePath;
}
randomImages();

// event listeners to run "randomImage" function
imgEl1.addEventListener('click', randomImages);
imgEl2.addEventListener('click', randomImages);
imgEl3.addEventListener('click', randomImages);
