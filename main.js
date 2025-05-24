// get all countires url https://restcountries.com/v3.1/all
const countryContainer = document.querySelector("#countryContainer");
const score = document.querySelector("#score b");
const lives = document.querySelectorAll("#lives i");

fetchPhotos();

let incorrectAnswers = 0;
let correctAnswers = Number(score.innerHTML);
countryContainer.addEventListener("click", (e) => {
  let clickedFlag = e.target;
  let countryName = clickedFlag.getAttribute("id");

  const requestedCountry = countryContainer
    .querySelector("h2")
    .innerText.split("Which of the flags represents ")[1];

  const imgDiv = clickedFlag.parentElement;

  if (countryName === requestedCountry) {
    imgDiv.style.backgroundColor = "green";
    correctAnswers++;
    score.innerHTML = correctAnswers;
  } else {
    incorrectAnswers++;
    imgDiv.style.backgroundColor = "red";
    console.log(incorrectAnswers);
    lives[lives.length - incorrectAnswers].classList.replace("fas", "far");
  }
  if (incorrectAnswers === lives.length) {
    alert("Game over");
    resetGame();
  } else {
    setTimeout(fetchPhotos, 1000);
  }
});

async function fetchPhotos() {
  countryContainer.innerHTML = "";
  const response = await fetch("https://restcountries.com/v3.1/all");
  const data = await response.json();
  let randomNumbers = generateThreeRandomNumbers(0, data.length - 1);
  let randomNumber = getRandomIntInclusive(0, 2);
  const h2 = document.createElement("h2");
  h2.innerText = `Which of the flags represents ${
    data[randomNumbers[randomNumber]].name.common
  }`;
  h2.setAttribute("class", "text-center");
  countryContainer.append(h2);
  randomNumbers.forEach((number) => {
    const card = document.createElement("div");
    card.classList.add("card", "p-3", "col-4");
    const img = document.createElement("img");
    img.src = data[number].flags.png;
    img.setAttribute("id", `${data[number].name.common}`);
    card.append(img);
    countryContainer.append(card);
    console.log(data[number]);
  });
}

function getRandomIntInclusive(min, max) {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

function generateThreeRandomNumbers(min, max) {
  let randomNumbersArray = [];
  for (i = 0; i < 3; i++) {
    randomNumbersArray.push(getRandomIntInclusive(min, max));
  }
  return randomNumbersArray;
}

function resetGame() {
  incorrectAnswers = 0;
  correctAnswers = 0;
  score.innerHTML = 0;

  lives.forEach((heart) => {
    heart.classList.remove("far");
    heart.classList.add("fas");
  });

  fetchPhotos();
}
