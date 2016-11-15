/*
Author: Kevin Wong
Date: 11/14/16
Description: cookie stand lab
*/

'use strict';

// Global variables
var openHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm','3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
var cookieTag = 'cookies';

var FirstAndPike = {
  // Store the min/max hourly customers, and the average cookies per customer, in object properties
  minCustPerHr: 23,
  maxCustPerHr: 65,
  avgCookiePerSale: 6, // CHANGE BACK TO 6.3
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
      cookiesPerHrArray[i] = this.avgCookiePerSale * this.custPerHr();
      this.cookiesPerHrObjectArray[i] = cookiesPerHrArray[i];
    }
    // Return the array
    console.log('cookiesPerHrArray: ', cookiesPerHrArray);
    console.log('this.cookiesPerHrObjectArray: ' + this.cookiesPerHrObjectArray);
    return cookiesPerHrArray;
  },
  // This gets filled by the cookiesPerHr property
  cookiesPerHrObjectArray: [],
  //cookiesPerHr(), app.js:37 Uncaught ReferenceError: cookiesPerHr is not defined(…)(anonymous function)
  //this.cookiesPerHr, cannot read property 0 of undefined(…)
  //FirstAndPike.cookiesPerHr, cannot read property 'cookiesPerHr' of undefined(…)

  // Store the results for each location in a separate array... perhaps as a property of the object representing that location
  cookiesAtHour: function() {
    // Create a cookies at a given hour array to populate
    var cookiesAtHourArray = [];
    var totalCookies = 0;
    // Loop through the array to assign the open hour and cookies for that hour at each index
    for (var i = 0; i < openHours.length; i++) {
      cookiesAtHourArray[i] = openHours[i] + ': ' + this.cookiesPerHrObjectArray[i] + ' ' + cookieTag; //this.cookiesPerHr()[i] is wrong
      // Add the cookies from that hour to the total daily cookies
      totalCookies += this.cookiesPerHrObjectArray[i];
      console.log('totalCookies: ', totalCookies);
    }
    // Store the total cookies at the last index of the cookiesAtHourArary
    cookiesAtHourArray[openHours.length] = 'Total: ' + totalCookies + ' ' + cookieTag;

    // Return the array
    console.log('cookiesAtHourArray: ', cookiesAtHourArray);
    return cookiesAtHourArray;
  },

  // Display the values of each array as unordered lists in the browser
  list_hours: function () {
    var contentArea = document.getElementById('list_hours');
    var ul = document.createElement('ul');
    var li = document.createElement('li');

    li.textContent = this.cookiesAtHour();

    ul.appendChild(li);
    contentArea.appendChild(ul);
  }

  // consoleLog: function () {
  //   console.log('minCustPerHr: ', this.minCustPerHr);
  //   console.log('maxCustPerHr: ', this.maxCustPerHr);
  //   console.log('avgCookiePerSale: ', this.avgCookiePerSale);
  //   console.log('custPerHr: ', this.custPerHr());
  //   console.log('cookiesPerHr: ', this.cookiesPerHr());
  //   console.log('typeof cookiesPerHr: ', typeof this.cookiesPerHr);
  //   console.log('cookiesPerHrObjectArray: ', this.cookiesPerHrObjectArray);
  //   console.log('typeof cookiesPerHrObjectArray: ', typeof this.cookiesPerHrObjectArray);
  //   console.log('cookiesAtHour: ', this.cookiesAtHour());
  // },
  //totalCookies: 0,
};

console.log('openHours.length: ', openHours.length);
FirstAndPike.cookiesPerHr();
FirstAndPike.cookiesAtHour();
FirstAndPike.list_hours();

// var SeaTacAirport = {
// }
//
// var SeattleCenter = {
// }
//
// var CapitolHill = {
// }
//
// var Alki = {
// }
