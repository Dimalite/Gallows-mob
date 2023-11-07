import puzzleList from "./base.js";
let searchId;
let starPoint;
// front
const frontPage = document.querySelector('.front');
const mainStartBtn = document.querySelector('.front_button');
mainStartBtn.addEventListener('click', () => {
  searchId = 1;
  starPoint = 0;
  removeRepeat();
  clearWordPuzzle();
  frontPage.style.display = "none";
  popupLevel.style.display = "none";
  document.querySelector(".game").style.display = "block";
  start(searchId, starPoint);
})
// front

const hangmanImages = [
  "./img_hangman/img_08.png",
  "./img_hangman/img_07.png",
  "./img_hangman/img_06.png",
  "./img_hangman/img_05.png",
  "./img_hangman/img_04.png",
  "./img_hangman/img_03.png",
  "./img_hangman/img_02.png",
  "./img_hangman/img_01.png",
];

let searchObject, word, desc;
let star = document.querySelector(".stars");
let numLevel = document.querySelector("#numLevel");

let pauseBtn = document.querySelector(".btn-pause");
let menuBtn = document.querySelector(".bx-menu");
let blockMenu = document.querySelector('.menu')

let endScreen = document.querySelector("#level-end");
let popupLevel = document.getElementById("nextLevel");


let btnExit = document.querySelector('.exit')
let btnRepeat = document.querySelector('.repeat')

document.querySelector("#close").addEventListener('click', () => {
  document.querySelector(".gameMenu").style.display = "none";
    console.log('sdgfsdgsd');
  })


const cartoonImage = document.querySelector(".cartoonImg");
const textInside = document.querySelector("#guess");
const children = textInside.childNodes;
function start(searchId, starPoint) {
  if (searchId === 11) {
    console.log('The end of word of list !');
    showEnd();
    btnRepeat.style.display = 'none';
    document.querySelector(".title").innerHTML = ". . .";
  } else {

    console.log("This is new word and start", searchId);
    searchObject = puzzleList.find((puzzle) => puzzle.id == searchId);
    word = searchObject.word;
    desc = searchObject.desc
    // searchObject.desc.style.fontSize = "20px";
    

    star.innerHTML = starPoint;
    console.log(word);
    // make a Description
    function makeDescription() {
      document.querySelector(".title").innerHTML = desc;
      numLevel.innerHTML = searchId;
      
    }
    // make  a word puzzle
    function makeWord() {
      for (let i = 0; i < word.length; i++) {
        const newDiv = document.createElement("div");
        newDiv.classList.add("hidden");

        const newContent = document.createTextNode(word[i]);
        newDiv.appendChild(newContent);
        document.getElementById("guess").appendChild(newDiv);
      }
    }
    makeDescription();
    makeWord();
  }
}

let popupLanguage = document.querySelector(".language");

let sign;


 // ++++++++++++++++++++++++
document.addEventListener("keydown", (event) => {
  document.querySelector('.assumption').focus()
  let key = event.key;

  if (isLatin(key)) {
    console.log("Change the language");
  

    showNotification(popupLanguage);
  } else {


    sign = key.toUpperCase();
    // console.log(sign);
    // console.log(word);
    let puzzleWord = word.split("");
    // console.log(puzzleWord);
    if (puzzleWord.includes(sign)) {
      console.log("right");
      // console.log(sign);
      checkAndAdd();
    } else {
      console.log("wrong");
      changeImage();
    }
  }
});
//  ++++++++++++++++++++++++
//  function keyboardShortcuts(e){
        
//   //Do some stuff when keyboard keys are pressed
//   if(e.target.matches(".defaultKeys")) return;
//   let key = e.key;
//   console.log(key)
// }

// document.addEventListener('keydown',keyboardShortcuts);
 // ++++++++++++++++++++++++





function isLatin(str) {
  return /[a-z]/i.test(str);
}
// Changing images of the gallows
let countPicture = -1;
function changeImage() {
  if (countPicture == 6) {
    // showMe();
    showEnd();
  }
  countPicture++;
  cartoonImage.src = hangmanImages[countPicture];
  cartoonImage.alt = "hangman";
}
changeImage();

function showMe() {
  children.forEach((li) => {
    if (li.classList.contains("hidden")) {
      li.classList.remove("hidden");
      li.classList.add("sign");
    } else {
      li.classList.add("sign");
    }
  });
}

function checkAndAdd() {
  children.forEach((li) => {
    if (li.innerText == sign) {
      li.classList.remove("hidden");
      li.classList.add("sign");
    }
  });

  let underline = document.querySelector(".hidden");
  if (!underline) {
    console.log("Well done"); ///        well done !!!       ///
    showNotification(popupLevel);
    cartoonImage.src = "./img_hangman/img_08.png";
    countPicture = 0;
    clearWordPuzzle();
    searchId++;
    starPoint = starPoint + 2;

    numLevel.innerHTML = searchId;
    start(searchId, starPoint);
  }
}

function clearWordPuzzle() {
  let element = document.getElementById("guess");
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

let clockTimeout = null;

function showNotification(element) {
  element.style.display = "flex";
  clearTimeout(clockTimeout);
  clockTimeout = setTimeout(() => {
    element.style.display = "none";
  }, 1500);
}

function showEnd() {
  endScreen.style.display = "block";
}

// buttons function
menuBtn.addEventListener('click', () => {
  console.log('click menu');
  // blockMenu.style.display = "block";

  if (blockMenu.style.display = "none") blockMenu.style.display = "block";
  else { blockMenu.style.display = "none" };
})

function removeRepeat() {
  if ((endScreen.style.display = "block")) {
    endScreen.style.display = "none";
    cartoonImage.src = "./img_hangman/img_08.png";
    countPicture = 0;
  }
  children.forEach((li) => {
    li.classList.remove("sign");
    li.classList.add("hidden");
  });
}

btnRepeat.addEventListener("click",removeRepeat)

btnExit.addEventListener("click", () => {
  // let endScreen = document.querySelector("#level-end");
  
  // if ((endScreen.style.display = "block")) {
    //   endScreen.style.display = "none";
    //   cartoonImage.src = "./img_hangman/img_08.png";
    //   countPicture = 0;
    //   clearWordPuzzle(); 
    // }
    // start(1, 2)


 
  
    document.querySelector('.game').style.display = "none"
  frontPage.style.display = "block";
});

