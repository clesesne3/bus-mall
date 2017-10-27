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
  this.numDisplays = 0;
  this.numClicks = 0;
  this.percentClicks;
  allImages.push(this);

  // method to track number of times image displayed
  this.calcNumDisplay = function() {
    if(displayHappened) {
      this.numDisplays ++;
    }
  };

  // method to track number of times image is clicked
  this.calcNumClicks = function() {
    if(clickHappened) {
      this.numClicks ++;
    }
  };

  this.calcPercentClicks = function() {
    if (this.numDisplays > 0) {
      this.percentClicks = (this.numClicks / this.numDisplays) * 100;
    }
  };
}

// function to create image instances from constructor
function makeAllImages() {
  for (var i = 0; i < imageNameArr.length; i++) {
    new CreateImage(imageNameArr[i], filePathArr[i], textIdArr[i]);
  }
}
makeAllImages();

// generate three random, unique numbers
var prevRandNum1; //
var prevRandNum2; // variables to store immediate previously generated random numbers
var prevRandNum3; //

var randNum1; //
var randNum2; // variables to store current randomly generated numbers
var randNum3; //

function generateRandomNumbers(){

  randNum1 = Math.floor(Math.random() * filePathArr.length);
  while (randNum1 === prevRandNum1 || randNum1 === prevRandNum2 || randNum1 === prevRandNum3) {
    randNum1 = Math.floor(Math.random() * filePathArr.length);
  }

  randNum2 = Math.floor(Math.random() * filePathArr.length);
  while (randNum2 === randNum1 || randNum2 === prevRandNum1 || randNum2 === prevRandNum2 || randNum2 === prevRandNum3) {
    randNum2 = Math.floor(Math.random() * filePathArr.length);
  }

  randNum3 = Math.floor(Math.random() * filePathArr.length);
  while (randNum3 === randNum2 || randNum3 === randNum1 || randNum3 === prevRandNum1 || randNum3 === prevRandNum2 || randNum3 === prevRandNum3) {
    randNum3 = Math.floor(Math.random() * filePathArr.length);
  }

  console.log('randNum1: ' + randNum1);
  console.log('randNum2: ' + randNum2);
  console.log('randNum3: ' + randNum3);
}

// create image element variables
var imgEl1 = document.getElementById('image-1');
var imgEl2 = document.getElementById('image-2');
var imgEl3 = document.getElementById('image-3');

// create image description paragraph variables
var imgPara1 = document.getElementById('image-1-para');
var imgPara2 = document.getElementById('image-2-para');
var imgPara3 = document.getElementById('image-3-para');

// function to select three random images and display using DOM manipulation
var displayHappened = false;

function randomImages() {

  generateRandomNumbers();

  var randomId1 = allImages[randNum1].idText; //
  var randomId2 = allImages[randNum2].idText; // access id attribute for randomly selected image
  var randomId3 = allImages[randNum3].idText; //

  imgEl1.id = randomId1;
  imgEl1.src = allImages[randNum1].filePath;
  imgPara1.textContent = allImages[randNum1].name;

  imgEl2.id = randomId2;
  imgEl2.src = allImages[randNum2].filePath;
  imgPara2.textContent = allImages[randNum2].name;

  imgEl3.id = randomId3;
  imgEl3.src = allImages[randNum3].filePath;
  imgPara3.textContent = allImages[randNum3].name;

  // store previously generated random numbers to compare against current generated random numbers
  prevRandNum1 = randNum1;
  prevRandNum2 = randNum2;
  prevRandNum3 = randNum3;

  //run display count method for images that are displayed
  displayHappened = true;
  allImages[randNum1].calcNumDisplay();
  allImages[randNum2].calcNumDisplay();
  allImages[randNum3].calcNumDisplay();
}
randomImages();

var clickHappened = false; // use Boolean to switch if image is clicked

// event listeners to run 'randomImages' and click counting functions
function image1Click() {
  clickHappened = true;
  allImages[randNum1].calcNumClicks();
  randomImages();
  numTotalClick ++;
  if(numTotalClick > 24) {
    imgEl1.removeEventListener('click', image1Click);
    alertEndMessage();
  }
  console.log('click count: ' + numTotalClick);
}
function image2Click() {
  clickHappened = true;
  allImages[randNum2].calcNumClicks();
  randomImages();
  numTotalClick ++;
  if(numTotalClick > 24) {
    imgEl2.removeEventListener('click', image2Click);
    alertEndMessage();
  }
  console.log('click count: ' + numTotalClick);
}
function image3Click() {
  clickHappened = true;
  allImages[randNum3].calcNumClicks();
  randomImages();
  numTotalClick ++;
  if(numTotalClick > 24) {
    imgEl3.removeEventListener('click', image3Click);
    alertEndMessage();
  }
  console.log('click count: ' + numTotalClick);
}

imgEl1.addEventListener('click', image1Click);
imgEl2.addEventListener('click', image2Click);
imgEl3.addEventListener('click', image3Click);

// alert for user that voting process has ended
var endMessageEl = document.createElement('h3');
var endMessage = document.createTextNode('The voting process has ended! Thank you for your input!');

function alertEndMessage() {
  endMessageEl.appendChild(endMessage);
  document.getElementById('end-message').appendChild(endMessageEl);
}
