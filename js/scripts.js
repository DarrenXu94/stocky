import { events } from "./events.js";
import { characters } from "./characters.js";
dayjs.extend(window.dayjs_plugin_customParseFormat);
gsap.registerPlugin(ScrollTrigger);

const isLocalHost =
  location.hostname === "localhost" ||
  location.hostname === "127.0.0.1" ||
  location.hostname === "";

const contentElement = document.getElementById("content");
const footerElement = document.getElementById("sticky-footer");

const fullEventList = [
  ...events,
  ...characters.reduce((acc, character) => {
    const characterEnd = { ...character };
    characterEnd.date = character.departure;
    characterEnd.status = "leaving";
    character.date = character.arrival;

    return [...acc, character, characterEnd];
  }, []),
];

const sortedList = fullEventList.sort(function (a, b) {
  // Turn your strings into dates, and then subtract them
  // to get a value that is either negative, positive, or zero.
  return (dayjs(b.date, "DD/MM/YYYY") - dayjs(a.date, "DD/MM/YYYY")) * -1;
});

// Append events
for (let event of sortedList) {
  const newContent = document.createElement("div");
  newContent.classList.add("content-event");

  const newParagraph = document.createElement("p");

  newParagraph.classList.add("content-event-paragraph");
  newContent.appendChild(newParagraph);

  if (event.name) {
    if (event.status == "leaving") {
      newContent.id = event.name + "_end";
      newParagraph.innerHTML = "Departure: " + event.name;
    } else {
      newParagraph.innerHTML = "New arrival: " + event.name;
      newContent.id = event.name + "_start";
    }
  } else {
    newParagraph.innerHTML = event.title;
  }

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("image-container");

  if (event.pics) {
    for (let pic of event.pics) {
      const newImg = document.createElement("img");
      newImg.src = "/assets/events/" + pic;
      imageContainer.appendChild(newImg);
    }
  }

  newContent.appendChild(imageContainer);

  contentElement.appendChild(newContent);
}

const TWEEN_DISTANCE = 60;

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

  footerElement.appendChild(newCharacter);

  const arrivalDiv = "#" + character.name + "_start";

  const departureDiv = "#" + character.name + "_end";

  let triggerOpts = {
    trigger: arrivalDiv,
    markers: isLocalHost,
    start: "top center",
    end: "top center",
    // endTrigger: departureDiv,
    toggleActions: "play reverse play reverse",
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
        return character.room * TWEEN_DISTANCE;
      },
      opacity: 1,
    }
  );
  projectShrinkTimeline.add(shrinkTween);
}
