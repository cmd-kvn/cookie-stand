/*
Author: Kevin Wong
Date: 11/14/16
Description: cookie stand lab
*/

'use strict';

// Global variables
var openHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm','3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
var cookieTag = ' cookies';

// FirstAndPike===FirstAndPike===FirstAndPike===FirstAndPike===FirstAndPike===FirstAndPike===FirstAndPike===FirstAndPike===FirstAndPike===
var FirstAndPike = {
  // Store the min/max hourly customers, and the average cookies per customer, in object properties
  minCustPerHr: 23,
  maxCustPerHr: 65,
  avgCookiePerSale: 6.3,

  // Use a method of that object to generate a random number of customers per hour.
  custPerHr: function() {
    // Returns a random integer between min (included) and max (included)
    // Borrowed from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    var min = Math.ceil(this.minCustPerHr);
    var max = Math.floor(this.maxCustPerHr);
    var returnVal = Math.floor(Math.random() * (max - min + 1) + min);
    //console.log('returnVal custPerHr: ', returnVal);
    return returnVal;
  },

  // Calculate and store the simulated amounts of cookies purchased for each hour at each location using average cookies purchased and the random number of customers generated
  cookiesPerHr: function() {
    // Create a cookies per hour array to populate
    var cookiesPerHrArray = [];
    // Loop through the array to assign a value for cookies per hour for each hour
    for (var i = 0; i < openHours.length; i++) {
      cookiesPerHrArray[i] = Math.round(this.avgCookiePerSale * this.custPerHr());
      this.cookiesPerHrObjectArray[i] = cookiesPerHrArray[i]; // Populates array as a value for a property
    }
    // Return the array
    console.log('cookiesPerHrArray: ', cookiesPerHrArray);
    console.log('this.cookiesPerHrObjectArray: ' + this.cookiesPerHrObjectArray);
    return cookiesPerHrArray;
  },

  // This gets filled by the cookiesPerHr property
  cookiesPerHrObjectArray: [],

  // Store the results for each location in a separate array... perhaps as a property of the object representing that location
  cookiesAtHour: function() {
    var cookiesAtHourArray = []; // Create a cookies at a given hour array to populate
    var totalCookies = 0; // Create a variable to keep track of total cookies

    // Loop through the array to assign the open hour and cookies for that hour at each index
    for (var i = 0; i < openHours.length; i++) {
      cookiesAtHourArray[i] = openHours[i] + ': ' + this.cookiesPerHrObjectArray[i] + cookieTag;
      totalCookies += this.cookiesPerHrObjectArray[i]; // Add the cookies from that hour to the total daily cookies
      console.log('totalCookies: ', totalCookies);
    }

    // Store the total cookies at the last index of the cookiesAtHourArary
    cookiesAtHourArray[openHours.length] = 'Total: ' + totalCookies + ' ' + cookieTag;

    // Return the array
    console.log('cookiesAtHourArray: ', cookiesAtHourArray);
    return cookiesAtHourArray;
  },

  // Display the values of each array as unordered lists in the browser
  firstAndPikeHours: function () {
    // Locate the node
    var contentArea = document.getElementById('first_and_pike_hours_list');

    // Create elements on the node
    var p = document.createElement('p');
    var ul = document.createElement('ul');
    var li;

    p.textContent = '1st and Pike'; // Set the p element
    // Loop through the openHours (inclusive) to set each li element with an element from the array from cookiesAtHour()
    // The <= allows an index for the total cookies
    for (var i = 0; i <= openHours.length; i++) {
      li = document.createElement('li');

      li.textContent = this.cookiesAtHour()[i];
      ul.appendChild(li);
    }
    p.appendChild(ul);
    contentArea.appendChild(p);
  }
};

// Test FirstAndPike functions
console.log('openHours.length: ', openHours.length);
FirstAndPike.cookiesPerHr();
FirstAndPike.cookiesAtHour();
FirstAndPike.firstAndPikeHours();

// SeaTacAirport===SeaTacAirport===SeaTacAirport===SeaTacAirport===SeaTacAirport===SeaTacAirport===SeaTacAirport===SeaTacAirport===
// var SeaTacAirport = {
//
// };

// var SeattleCenter = {
// };

// CapitolHill===CapitolHill===CapitolHill===CapitolHill===CapitolHill===CapitolHill===CapitolHill===CapitolHill===CapitolHill===
var CapitolHill = {
  // Store the min/max hourly customers, and the average cookies per customer, in object properties
  minCustPerHr: 20,
  maxCustPerHr: 38,
  avgCookiePerSale: 2.3,

  // Use a method of that object to generate a random number of customers per hour.
  custPerHr: function() {
    // Returns a random integer between min (included) and max (included)
    // Borrowed from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    var returnVal = Math.floor(Math.random() * (this.maxCustPerHr - this.minCustPerHr + 1) + this.minCustPerHr);
    console.log('returnVal custPerHr: ', returnVal);
    return returnVal;
  },

  // Calculate and store the simulated amounts of cookies purchased for each hour at each location using average cookies purchased and the random number of customers generated
  cookiesPerHr: function() {
    // Create a cookies per hour array to populate
    var cookiesPerHrArray = [];
    // Loop through the array to assign a value for cookies per hour for each hour
    for (var i = 0; i < openHours.length; i++) {
      cookiesPerHrArray[i] = Math.round(this.avgCookiePerSale * this.custPerHr());
      this.cookiesPerHrObjectArray[i] = cookiesPerHrArray[i]; // Populates array as a value for a property
    }
    // Return the array
    console.log('cookiesPerHrArray: ', cookiesPerHrArray);
    console.log('this.cookiesPerHrObjectArray: ' + this.cookiesPerHrObjectArray);
    return cookiesPerHrArray;
  },

  // This gets filled by the cookiesPerHr property
  cookiesPerHrObjectArray: [],

  // Store the results for each location in a separate array... perhaps as a property of the object representing that location
  cookiesAtHour: function() {
    var cookiesAtHourArray = []; // Create a cookies at a given hour array to populate
    var totalCookies = 0; // Create a variable to keep track of total cookies

    // Loop through the array to assign the open hour and cookies for that hour at each index
    for (var i = 0; i < openHours.length; i++) {
      cookiesAtHourArray[i] = openHours[i] + ': ' + this.cookiesPerHrObjectArray[i] + cookieTag;
      totalCookies += this.cookiesPerHrObjectArray[i]; // Add the cookies from that hour to the total daily cookies
      console.log('totalCookies: ', totalCookies);
    }

    // Store the total cookies at the last index of the cookiesAtHourArary
    cookiesAtHourArray[openHours.length] = 'Total: ' + totalCookies + ' ' + cookieTag;

    // Return the array
    console.log('cookiesAtHourArray: ', cookiesAtHourArray);
    return cookiesAtHourArray;
  },

  // Display the values of each array as unordered lists in the browser
  capitolHillHours: function () {
    // Locate the node
    var contentArea = document.getElementById('capitol_hill_hours_list');

    // Create elements on the node
    var p = document.createElement('p');
    var ul = document.createElement('ul');
    var li;

    p.textContent = 'Capitol Hill'; // Set the p element
    // Loop through the openHours (inclusive) to set each li element with an element from the array from cookiesAtHour()
    // The <= allows an index for the total cookies
    for (var i = 0; i <= openHours.length; i++) {
      li = document.createElement('li');

      li.textContent = this.cookiesAtHour()[i];
      ul.appendChild(li);
    }
    p.appendChild(ul);
    contentArea.appendChild(p);
  }
};

// Test CapitolHill functions
CapitolHill.custPerHr();
CapitolHill.cookiesPerHr();
CapitolHill.cookiesAtHour();
CapitolHill.capitolHillHours();

// // Alki===Alki===Alki===Alki===Alki===Alki===Alki===Alki===Alki===Alki===Alki===Alki===Alki===Alki===Alki===Alki===Alki===Alki===Alki===
// var Alki = {
// // Store the min/max hourly customers, and the average cookies per customer, in object properties
//   minCustPerHr: 2,
//   maxCustPerHr: 16,
//   avgCookiePerSale: 4.6,
//
//   // Use a method of that object to generate a random number of customers per hour.
//   custPerHr: function() {
//     // Returns a random integer between min (included) and max (included)
//     // Borrowed from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//     var returnVal = Math.floor(Math.random() * (this.maxCustPerHr - this.minCustPerHr + 1) + this.minCustPerHr);
//     console.log('returnVal custPerHr: ', returnVal);
//     return returnVal;
//   },
//
//   // Calculate and store the simulated amounts of cookies purchased for each hour at each location using average cookies purchased and the random number of customers generated
//   cookiesPerHr: function() {
//     // Create a cookies per hour array to populate
//     var cookiesPerHrArray = [];
//     // Loop through the array to assign a value for cookies per hour for each hour
//     for (var i = 0; i < openHours.length; i++) {
//       cookiesPerHrArray[i] = Math.round(this.avgCookiePerSale * this.custPerHr());
//       this.cookiesPerHrObjectArray[i] = cookiesPerHrArray[i]; // Populates array as a value for a property
//     }
//     // Return the array
//     console.log('cookiesPerHrArray: ', cookiesPerHrArray);
//     console.log('this.cookiesPerHrObjectArray: ' + this.cookiesPerHrObjectArray);
//     return cookiesPerHrArray;
//   },
//
//   // This gets filled by the cookiesPerHr property
//   cookiesPerHrObjectArray: [],
//
//   // Store the results for each location in a separate array... perhaps as a property of the object representing that location
//   cookiesAtHour: function() {
//     var cookiesAtHourArray = []; // Create a cookies at a given hour array to populate
//     var totalCookies = 0; // Create a variable to keep track of total cookies
//
//     // Loop through the array to assign the open hour and cookies for that hour at each index
//     for (var i = 0; i < openHours.length; i++) {
//       cookiesAtHourArray[i] = openHours[i] + ': ' + this.cookiesPerHrObjectArray[i] + cookieTag;
//       totalCookies += this.cookiesPerHrObjectArray[i]; // Add the cookies from that hour to the total daily cookies
//       console.log('totalCookies: ', totalCookies);
//     }
//
//     // Store the total cookies at the last index of the cookiesAtHourArary
//     cookiesAtHourArray[openHours.length] = 'Total: ' + totalCookies + ' ' + cookieTag;
//
//     // Return the array
//     console.log('cookiesAtHourArray: ', cookiesAtHourArray);
//     return cookiesAtHourArray;
//   },
//
//   // Display the values of each array as unordered lists in the browser
//   alkiHours: function () {
//     // Locate the node
//     var contentArea = document.getElementById('alki_hours_list');
//
//     // Create elements on the node
//     var p = document.createElement('p');
//     var ul = document.createElement('ul');
//     var li;
//
//     p.textContent = 'Alki'; // Set the p element
//     // Loop through the openHours (inclusive) to set each li element with an element from the array from cookiesAtHour()
//     // The <= allows an index for the total cookies
//     for (var i = 0; i <= openHours.length; i++) {
//       li = document.createElement('li');
//
//       li.textContent = this.cookiesAtHour()[i];
//       ul.appendChild(li);
//     }
//     p.appendChild(ul);
//     contentArea.appendChild(p);
//   }
// };
//
// // Test Alki functions
// Alki.custPerHr();
// Alki.cookiesPerHr();
// Alki.cookiesAtHour();
// Alki.alkiHours();
