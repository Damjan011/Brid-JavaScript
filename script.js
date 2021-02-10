const winArr = [];
const initArr = ['P', 'O', 'S', 'A', 'O'];

let resetInterval = navigator.maxTouchPoints === 2 ? 8000 : 8000;

const winChecker = (e) => {
  winArr.push(e.target.textContent);
  console.log(winArr);
  winArr.forEach((el, index) => {
    if (winArr[index] !== initArr[index]) {
      winArr.length = 0;
      console.log(winArr);
      clearInterval(timer);
      timer = setInterval(reset, resetInterval);
      reset();
    } else if (winArr.length === 5) {
      clearInterval(timer);
      setWin();
    }
  })
}

const generateRandomPos = (count, min, max, interval) => {
  let arr = [];
  let randomX;
  while (count > 0) {
    randomX = (Math.floor(Math.random() * (max - (min + interval)) / interval)) * interval + 'px';
    if (arr.indexOf(randomX) === -1) {
      arr.push(randomX);
      count--;
    }
  }
  return arr;
}

let fontSize = navigator.maxTouchPoints === 2 ? window.innerWidth / 12 : window.innerWidth / 8;

const paraHeight = fontSize * 1.1;
const letterWidth = fontSize * 0.75;

const letterParent = document.getElementById("letter-wrapper");

let paraWidth = letterWidth * 5;

let calculateWidth = () => {
  let arr = [];
  let begin = paraWidth / 2;
  for (let i = 0; i < 5; i++) {
    arr.push(begin);
    begin -= letterWidth;
  }
  return arr;
}

let widthArray = calculateWidth();

letterParent.style.fontSize = fontSize + 'px';

const gameInit = () => {
  initArr.forEach(el => {
    const node = document.createElement('p');
    const textNode = document.createTextNode(el);
    node.appendChild(textNode);
    node.style.top = `calc(50vh - ${paraHeight / 2 + 'px'})`;
    letterParent.appendChild(node);
  });
  widthArray.forEach((el, index) => {
    letterParent.childNodes[index + 1].style.left = `calc(50vw - ${el + 'px'})`;
  });
  (randomizePosition = () => {
    setTimeout(() => {
      generateRandomPos(5, 0, window.innerWidth, letterWidth).forEach((el, index) => {
        letterParent.childNodes[index + 1].style.left = el;
      });
      generateRandomPos(5, 0, window.innerHeight, paraHeight).forEach((el, index) => {
        letterParent.childNodes[index + 1].style.top = el;
      });
    }, 1000);
  })();
  setTimeout(() => {
    letterParent.childNodes.forEach(el => {
      el.onclick = winChecker;
    })
  }, 1000);
}

gameInit();

const reset = () => {
  let child = letterParent.lastElementChild;
  while (child) {
    letterParent.removeChild(child);
    child = letterParent.lastElementChild;
  }
  winArr.length = 0;
  gameInit();
}

document.getElementById('play-again').onclick = () => {
  document.getElementById('win').classList.remove('win-display');
  document.getElementById('letter-wrapper').style.display = 'block';
  reset();
  timer = setInterval(reset, resetInterval);
}

const setWin = () => {
  document.getElementById('win').classList.add('win-display');
  document.getElementById('letter-wrapper').style.display = 'none';
}

var timer = setInterval(reset, resetInterval);
