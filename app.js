/*
Author: Kevin Wong
Date: 11/15/16
Description: cookie stand lab day 2
*/

'use strict';

// Global variables
var OPEN_HOURS = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm','3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

function CookieStore(storeName, minCustPerHr, maxCustPerHr, avgCookiesPerSale) {
  // Pass in store name, min/max hourly customers, average cookies per customer, and store hours, then assign them to the object properties
  this.storeName = storeName;
  this.minCustPerHr = minCustPerHr;
  this.maxCustPerHr = maxCustPerHr;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.cookiesPerHrObjectArray = [];  // to be populated by calcCookiesPerHr()
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
  var totalCookies = 0;
  // Loop through the array to assign a value for cookies per hour for each hour
  for (var i = 0; i < OPEN_HOURS.length; i++) {
    cookiesPerHrArray[i] = Math.round(this.avgCookiesPerSale * this.calcCustPerHr());
    this.cookiesPerHrObjectArray[i] = cookiesPerHrArray[i]; // Populates array as a value for a property
    totalCookies += this.cookiesPerHrObjectArray[i]; // Add the cookies from that hour to the total daily cookies
  }

  // Push the total to the end of the array with cookies per hour
  this.cookiesPerHrObjectArray.push(totalCookies);
  // Return the array
  return cookiesPerHrArray;
};

CookieStore.prototype.renderTableRow = function() {
  var cookieStoreTable = document.getElementById('table_body'); // Locate
  var tableRow = document.createElement('tr'); // Create
  var storeNameTableHeader = document.createElement('th'); // Create
  var storeTotalTableData = document.createElement('td'); // Create
  var hourlyTableData;

  storeNameTableHeader.textContent = this.storeName; // Update content
  tableRow.appendChild(storeNameTableHeader); // Append to the table row

  for (var i = 0; i < this.cookiesPerHrObjectArray.length; i++) {
    hourlyTableData = document.createElement('td'); // Create
    hourlyTableData.textContent = this.cookiesPerHrObjectArray[i]; // Update content
    tableRow.appendChild(hourlyTableData); // Append to the table row
  }

  storeTotalTableData.textContent = this.cookiesPerHrObjectArray[this.cookiesPerHrObjectArray.length]; // Update content
  tableRow.appendChild(storeTotalTableData); // Append to the table row

  cookieStoreTable.appendChild(tableRow); // Append the row of the object to the table
};

// Use a stand alone function to render the table header
function renderHeaderRow() {
  var storeHeaderRow = document.getElementById('table_header'); // Locate
  var tableHeaderRow = document.createElement('tr'); // Create
  var blankTableHeader = document.createElement('th'); // Create
  var totalTableHeader = document.createElement('th'); // Create
  var hourlyTableHeader;

  blankTableHeader.textContent = ''; // Update content
  tableHeaderRow.appendChild(blankTableHeader); // Append blank header at first column in the row

  for (var i = 0; i < OPEN_HOURS.length; i++) {
    hourlyTableHeader = document.createElement('th'); // Create
    hourlyTableHeader.textContent = OPEN_HOURS[i]; // Update content
    tableHeaderRow.appendChild(hourlyTableHeader);  // Append after the blank header
  }

  totalTableHeader.textContent = 'Daily Location Total'; // Update content
  tableHeaderRow.appendChild(totalTableHeader); // Append after hourly table headers
  storeHeaderRow.appendChild(tableHeaderRow); // Append the header row to the table
};

// Use a stand alone function to render the table footer
function renderFooterRow() {
  var storeFooterRow = document.getElementById('table_footer'); // Locate
  var tableFooterRow = document.createElement('tr'); // Create
  var labelTableFooter = document.createElement('th'); // Create
  var totalTableFooter = document.createElement('td'); // Create
  var hourlyTotals;

  labelTableFooter.textContent = 'Totals'; // Update content
  tableFooterRow.appendChild(labelTableFooter); // Append footer label at first column in the row

  for (var i = 0; i < OPEN_HOURS.length; i++) {
    hourlyTotals = document.createElement('td'); // Create
    hourlyTotals.textContent = 'calculate hourly totals'; // Update content
    tableFooterRow.appendChild(hourlyTotals);  // Append after the footer label
  }

  totalTableFooter.textContent = 'Calculate daily total'; // Update content
  tableFooterRow.appendChild(totalTableFooter); // Append after hourly table headers
  storeFooterRow.appendChild(tableFooterRow); // Append the header row to the table
};



// EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---
// EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---

// Make the table on html
// Make the table header row
renderHeaderRow();
// Add the table body rows
var pike = new CookieStore('Pike', 23, 65, 6.3); // Create the cookie store
pike.calcCookiesPerHr(); // Call this to populate the array that will be used to render the table row
pike.renderTableRow(); // Make the row
var seaTac = new CookieStore('SeaTac Airport', 3, 24, 1.2);
seaTac.calcCookiesPerHr(); // the calcCookiesPerHr function can be in the definition of the renderTableRow function so you only call renderTableRow()
seaTac.renderTableRow();
var seattleCenter = new CookieStore('Seattle Center', 11, 38, 3.7);
seattleCenter.calcCookiesPerHr();
seattleCenter.renderTableRow();
var capitolHill = new CookieStore('Capitol Hill', 20, 38, 2.3);
capitolHill.calcCookiesPerHr();
capitolHill.renderTableRow();
var alki = new CookieStore('Alki', 2, 16, 4.6);
alki.calcCookiesPerHr();
alki.renderTableRow();
// Make the table footer row
renderFooterRow();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EVERYTHING ABOVE THIS LINE IS GOOD--EVERYTHING ABOVE THIS LINE IS GOOD---EVERYTHING ABOVE THIS LINE IS GOOD----
