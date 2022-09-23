import { events } from "./events.js";
import { characters } from "./characters.js";
dayjs.extend(window.dayjs_plugin_customParseFormat);
gsap.registerPlugin(ScrollTrigger);

const startDate = dayjs("2017-01-01");
const today = dayjs();

// Create the month divs

const monthDiff = today.diff(startDate, "month");

const contentElement = document.getElementById("content");

for (var i = 0; i < monthDiff; i++) {
  const newMonth = document.createElement("div");

  const date = startDate.add(i, "month");
  newMonth.classList.add("month-container");
  newMonth.innerHTML = date.format("MMM YYYY");
  newMonth.id = "month_" + date.format("YYYY-MM");
  contentElement.appendChild(newMonth);
}

let charactersPresent = 0;
let charactersRendered = 0;

// Create character counter
const characterCounterDiv = document.createElement("div");
characterCounterDiv.id = "character-counter";
characterCounterDiv.innerHTML = "Characters present: ";
characterCounterDiv.dataset.charactersPresent = 0;
contentElement.appendChild(characterCounterDiv);

// Append events
for (let event of events) {
  const monthAndYear =
    "month_" + dayjs(event.date, "DD/MM/YYYY").format("YYYY-MM");
  const currentDiv = document.getElementById(monthAndYear);

  const newContent = document.createElement("div");
  newContent.classList.add("content-event");
  newContent.innerHTML = event.title;

  if (event.pics) {
    for (let pic of event.pics) {
      const newImg = document.createElement("img");
      newImg.src = "/assets/events/" + pic;
      newContent.appendChild(newImg);
    }
  }

  currentDiv.appendChild(newContent);
}

const modifyCharactersPresent = (val) => {
  charactersPresent += val;
  document.getElementById("character-counter").dataset.charactersPresent =
    charactersPresent;
};

const TWEEN_DISTANCE = -50;

// Append characters
for (let character of characters) {
  const newCharacter = document.createElement("div");
  newCharacter.classList.add("character");
  newCharacter.id = character.name + "_id";

  const newCharacterLabel = document.createElement("div");
  newCharacterLabel.classList.add("newCharacterLabel");

  newCharacterLabel.innerHTML = character.name;

  const characterImg = document.createElement("img");
  characterImg.src = `/assets/${character.img}`;
  newCharacter.appendChild(characterImg);
  newCharacter.appendChild(newCharacterLabel);

  contentElement.appendChild(newCharacter);

  const arrivalDiv =
    "#month_" + dayjs(character.arrival, "DD/MM/YYYY").format("YYYY-MM");

  const departureDiv =
    "#month_" + dayjs(character.departure, "DD/MM/YYYY").format("YYYY-MM");

  let triggerOpts = {
    trigger: arrivalDiv,
    markers: true,
    start: "top center",
    end: "top center",
    // endTrigger: departureDiv,
    toggleActions: "play reverse play reverse",
    onEnter: () => modifyCharactersPresent(1),
    onLeave: () => modifyCharactersPresent(-1),
    onEnterBack: () => modifyCharactersPresent(1),
    onLeaveBack: () => modifyCharactersPresent(-1),
  };

  if (character.departure) {
    triggerOpts.endTrigger = departureDiv;
  } else {
    triggerOpts.endTrigger = "body";
    triggerOpts.end = "bottom bottom";
  }

  const projectShrinkTimeline = gsap.timeline({
    scrollTrigger: triggerOpts,
  });

  const shrinkTween = gsap.fromTo(
    `#${character.name + "_id"}`,
    { xPercent: 0, opacity: 0 },
    {
      xPercent: () => {
        charactersRendered += 1;
        return charactersRendered * TWEEN_DISTANCE;
      },
      opacity: 1,
    }
  );
  projectShrinkTimeline.add(shrinkTween);
}
