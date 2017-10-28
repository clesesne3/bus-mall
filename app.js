'use strict';

// arrays to store image names, filepaths, and text ids
var imageNameArr = ['R2-D2 Bag', 'Banana Slicer', 'I-Roll', 'Boot-Flops', 'Ultimate Breakfast', 'Bubblegum',
  'Chair', 'Cthulhu', 'Dog Duck', 'Dragon Meat', 'U-Pen-sils', 'Pet Sweep', 'Scissors', 'Shark Sleeper', 'Baby Sweep', 'Tauntaun', 'Unicorn Meat', 'USB', 'Water Can', 'Wine Glass'];

var filePathArr = ['img/bag.jpg', 'img/banana.jpg', 'img/bathroom.jpg', 'img/boots.jpg',
  'img/breakfast.jpg', 'img/bubblegum.jpg', 'img/chair.jpg', 'img/cthulhu.jpg', 'img/dog-duck.jpg', 'img/dragon.jpg', 'img/pen.jpg', 'img/pet-sweep.jpg', 'img/scissors.jpg', 'img/shark.jpg', 'img/sweep.png', 'img/tauntaun.jpg', 'img/unicorn.jpg', 'img/usb.gif', 'img/water-can.jpg', 'img/wine-glass.jpg'];

var textIdArr = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum',
  'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];

// array for created image objects
var allImages = [];

// counter variable to track total clicks
var numTotalClick = 0;

var displayHappened = false; // use Boolean to switch if image is displayed
var clickHappened = false; // use Boolean to switch if image is clicked

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
    return this.percentClicks.toFixed(1); // rounds percentage to tenths place
  };
}

// function to create image instances from constructor
function makeAllImages() {
  for (var i = 0; i < imageNameArr.length; i++) {
    new CreateImage(imageNameArr[i], filePathArr[i], textIdArr[i]);
  }
}
makeAllImages();

var prevRandNum1; //
var prevRandNum2; // variables to store immediate previously generated random numbers
var prevRandNum3; //

var randNum1; //
var randNum2; // variables to store current randomly generated numbers
var randNum3; //

// generate three random, unique numbers
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

// create image element variables to insert into DOM
var imgEl1 = document.getElementById('image-1');
var imgEl2 = document.getElementById('image-2');
var imgEl3 = document.getElementById('image-3');

// create image description paragraph variables to insert into DOM
var imgPara1 = document.getElementById('image-1-para');
var imgPara2 = document.getElementById('image-2-para');
var imgPara3 = document.getElementById('image-3-para');

// function to select three random images and display using DOM manipulation
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

// event listeners to run 'randomImages' and click-counting functions
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

// function to display message for user that voting process has ended
function alertEndMessage() {
  var endMessageEl = document.createElement('h3');
  var endMessage = document.createTextNode('The voting process has ended! Thank you for your input!');
  endMessageEl.appendChild(endMessage);
  document.getElementById('end-message').appendChild(endMessageEl);
  displayResults();
}

// function to generate results in list form
function displayResults() {
  var resultHeaderElement = document.createElement('h2');
  var resultHeader = document.createTextNode('Survey Results');
  resultHeaderElement.appendChild(resultHeader);
  document.getElementById('result-list-div').appendChild(resultHeaderElement);

  var resultList = document.createElement('ul');
  resultList.id = 'result-list';
  for (var j = 0; j < allImages.length; j++) {
    var resultListElement = document.createElement('li');
    resultListElement.textContent = allImages[j].numClicks + ' votes for the ' + allImages[j].name;
    resultList.appendChild(resultListElement);
  }
  document.getElementById('result-list-div').appendChild(resultList);
}
