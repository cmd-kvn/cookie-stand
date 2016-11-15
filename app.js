/*
Author: Kevin Wong
Date: 11/15/16
Description: cookie stand lab day 2
*/

'use strict';

// Global variables
var cookieTag = ' cookies';

function CookieStore(storeName, minCustPerHr, maxCustPerHr, avgCookiesPerSale) {
  // Pass in store name, min/max hourly customers, average cookies per customer, and store hours, then assign them to the object properties
  this.storeName = storeName;
  this.minCustPerHr = minCustPerHr;
  this.maxCustPerHr = maxCustPerHr;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.cookiesPerHrObjectArray = [];  // to be populated by calcCookiesPerHr()
  this.openHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm','3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
};

// Use a method of tha tobject to generate a random number of customers per hour
CookieStore.prototype.calcCustPerHr = function() {
  // Returns a random integer between min (included) and max (included)
  // Borrowed from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  var returnCustPerHr = Math.floor(Math.random() * (this.maxCustPerHr - this.minCustPerHr + 1) + this.minCustPerHr);
  console.log('returnCustPerHr: ', returnCustPerHr);
  return returnCustPerHr;
};

// Calculate and store the simulated amounts of cookies purchased for each hour at each location using average cookies purchased and the random number of customers generated
CookieStore.prototype.calcCookiesPerHr = function() {
  // Create a cookies per hour array to populate
  var cookiesPerHrArray = [];
  // Loop through the array to assign a value for cookies per hour for each hour
  for (var i = 0; i < this.openHours.length; i++) {
    cookiesPerHrArray[i] = Math.round(this.avgCookiesPerSale * this.calcCustPerHr());
    this.cookiesPerHrObjectArray[i] = cookiesPerHrArray[i]; // Populates array as a value for a property
  }
  // Return the array
  return cookiesPerHrArray;
};

// Store the results for each location in a separate array... perhaps as a property of the object representing that location
CookieStore.prototype.calcCookiesAtHour = function() {
  var cookiesAtHourArray = []; // Create a cookies at a given hour array to populate
  var totalCookies = 0; // Create a variable to keep track of total cookies

  // Loop through the array to assign the open hour and cookies for that hour at each index
  for (var i = 0; i < this.openHours.length; i++) {
    cookiesAtHourArray[i] = this.openHours[i] + ': ' + this.cookiesPerHrObjectArray[i] + cookieTag;
    totalCookies += this.cookiesPerHrObjectArray[i]; // Add the cookies from that hour to the total daily cookies
    console.log('totalCookies: ', totalCookies);
  }

  // Store the total cookies at the last index of the cookiesAtHourArary
  cookiesAtHourArray[this.openHours.length] = 'Total: ' + totalCookies + cookieTag;

  // Return the array
  console.log('cookiesAtHourArray: ', cookiesAtHourArray);
  return cookiesAtHourArray;
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EVERYTHING ABOVE THIS LINE IS GOOD--EVERYTHING ABOVE THIS LINE IS GOOD---EVERYTHING ABOVE THIS LINE IS GOOD----

// Display the values of each array as a table in the browser
CookieStore.prototype.displayToHtml = function() {
  var storeTable = document.getElementById('store_table');
  var tableRow = document.createElement('tr');
  var nameTableHeader = document.createElement('th');
  var totalTableData = document.createElement('td');
  var hourlyTableData;

  nameTableHeader.textContent = this.name;
  tableRow.appendChild(nameTableHeader);

  for (var i = 0; i < this.hours.length; i++) {
    hourlyTableData = document.createElement('td');
    hourlyTableData.textContent = 5; // use different data here in lab
    tableRow.appendChild(hourlyTableData);
  }

  totalTableData.textCon = 15; // use instead calc total from other methods
  tableRow.appendChild(totalTableData);

  storeTable.appendChild(tableRow);
};


function () {
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

var pike = new CookieStore('Pike', 5, 10, 2);
pike.calcCustPerHr();
pike.calcCookiesPerHr();
pike.calcCookiesAtHour();


// // Calculate daily sales projections on sales.html
// FirstAndPike.firstAndPikeHours();
// SeaTacAirport.seaTacAirportHours();
// SeattleCenter.seattleCenterHours();
// CapitolHill.capitolHillHours();
// Alki.alkiHours();
