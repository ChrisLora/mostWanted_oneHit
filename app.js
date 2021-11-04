"use strict";

//Menu functions.
//Used for the overall flow of the application.
/////////////////////////////////////////////////////////////////
//#region

// app is the function called to start the entire application
function app(people) {
  let searchType = promptFor(
    "Do you know the name of the person you are looking for? Enter 'yes' or 'no'",
    yesNo
  ).toLowerCase();
  let searchResults;
  switch (searchType) {
    case "yes":
      searchResults = searchByName(people);
      break;
    case "no":
      searchResults = determineTrait(people,searchBy);
      break;
    default:
      app(people); // restart app
      break;
  }

  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people) {

  if (!person) {
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = promptFor(
    "Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", autoValid);

  switch (displayOption) {
    case "info":
      alert(person[0].firstName + " " + person[0].lastName + 
      "\nGender: " + 
      person[0].gender + 
      "\nDob: " + 
      person[0].dob + 
      "\nHeight: " +
      person[0].height +
      "\nWeight: " + 
      person[0].weight +
      "\nEye Color: " + 
      person[0].eyeColor +
      "\nOccupation: " + 
      person[0].occupation
      )
      break;
    case "family":
      identifySpouse(person, people)
      break;
    case "descendants":
      identifyDescendants(person, people)
      break;
    case "restart":
      app(people); // restart
      break;
    case "quit":
      return; // stop execution
    default:
      return mainMenu(person, people); // ask again
  }
}

//#endregion
// Identify and display relatives functions

function identifySpouse(person, people){
  let spouseId = person[0].currentSpouse
  let spouse = people.filter(function (spouseMatch){
    if (spouseMatch.id === spouseId){
      return true;
    }
  })

  alert("Current Spouse:\n" + spouse[0].firstName + " " + spouse[0].lastName + 
  "\nGender: " + 
  spouse[0].gender + 
  "\nDob: " + 
  spouse[0].dob + 
  "\nHeight: " +
  spouse[0].height +
  "\nWeight: " + 
  spouse[0].weight +
  "\nEye Color: " + 
  spouse[0].eyeColor +
  "\nOccupation: " + 
  spouse[0].occupation
  )
}

function identifyDescendants(person, people){
  let descendants = people.filter(function(descMatch){
    if (descMatch.parents.includes(person[0].id)){
      return true;
    }
    })
  function displayDesc(kids){
    return [kids.firstName,kids.lastName].join(" ");
  }
  let displayResult = descendants.map(displayDesc)
  alert(displayResult);
}


//Filter functions.
//Ideally you will have a function for each trait.
/////////////////////////////////////////////////////////////////
//#region

//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.
//nearly finished function used to search through an array of people to find matching first and last name and return a SINGLE person object.

function searchByName(people) {
  let firstName = promptFor("What is the person's first name?", autoValid);
  let lastName = promptFor("What is the person's last name?", autoValid);

  let foundPerson = people.filter(function (potentialMatch) {
    if (potentialMatch.firstName === firstName && potentialMatch.lastName === lastName) {
      return true;
    }
  });
  return foundPerson;
}

function searchBy(people,promptText){
  let searchedTrait = prompt(promptText);
  let foundPeople = people.filter(function (potentialMatch){
    if (potentialMatch[0].includes(searchedTrait)){
    return true;
    }})
  function displayFoundPeople(foundPeople){
    return [foundPeople.firstName,foundPeople.lastName].join(" ");
  }
  let displayResult = foundPeople.map(displayFoundPeople)
  alert("Here are the results:\n" + displayResult);
}


function determineTrait(people,searchFunction){
  let trait = prompt("Which trait would you like to search by? Enter the corresponding number.\n (1)Eyecolor\n(2)D.O.B.\n(3)Height\n(4)Gender\n(5)Weight\n(6)Occupation")
  switch (trait){
    case "1":
      searchFunction(people,"Please enter one of the following options:\nblue\nbrown\ngreen")
      break;
    case "2":
      searchFunction(people,"Please enter in the following format:\n1/1/2000\nMonth/Day/Year")
      break;
    case "3":
      searchFunction(people,"Please enter the total number of inches tall the person is.\nNumbers only.\nI.E. 63")
      break;
    case "4":
      searchFunction(people,"Please enter one of the following options:\nMale\nFemale")
      break;
    case "5":
      searchFunction(people,"Please enter the total weight of the person in pounds, numbers only.\nI.E. 155")
      break;
    case "6":
      searchFunction(people,"Please enter one of the following options:\nProgrammer\nAssistant\nLandscaper\nNurse\nStudent\nArchitect\nDoctor\nPolitician")
      break;
  }
}


function searchByEyeColor(people) {}
function searchByGender(people) {}
function searchByDob(people) {}
function searchByHeight(people) {}
function searchByWeight(people) {}
function searchByOccupation(people) {}
function searchByTraits(people){}


//#endregion

//Display functions.
//Functions for user interface.
/////////////////////////////////////////////////////////////////
//#region

// alerts a list of people
function displayPeople(people) {
  alert(
    people
      .map(function (person) {
        return person.firstName + " " + person.lastName;
      })
      .join("\n")
  );
}

function displayPerson(person) {
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  // TODO: finish getting the rest of the information to display.
  alert(personInfo);
}

//#endregion

//Validation functions.
//Functions to validate user input.
/////////////////////////////////////////////////////////////////
//#region

//a function that takes in a question to prompt, and a callback function to validate the user input.
//response: Will capture the user input.
//isValid: Will capture the return of the validation function callback. true(the user input is valid)/false(the user input was not valid).
//this function will continue to loop until the user enters something that is not an empty string("") or is considered valid based off the callback function(valid).
function promptFor(question, valid) {
  let isValid;
  let response
  do {
    response = prompt(question).trim();
    isValid = valid(response);
  } while (response === "" || isValid === false);
  return response;
}

// helper function/callback to pass into promptFor to validate yes/no answers.
function yesNo(input) {
  if (input.toLowerCase() == "yes" || input.toLowerCase() == "no") {
    return true;
  } else {
    return false;
  }
}

// helper function to pass in as default promptFor validation.
//this will always return true for all inputs.
function autoValid(input) {
  return true; // default validation only
}

//Unfinished validation function you can use for any of your custom validation callbacks.
//can be used for things like eye color validation for example.
function customValidation(input) {}

//#endregion
