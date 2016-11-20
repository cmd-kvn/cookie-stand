/*
Author: Kevin Wong
Date: 11/17/16
Description: cookie stand lab day 4
*/

'use strict';

// GLOBAL VARIABLES
var OPEN_HOURS = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm','3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];
var COOKIE_STORES_ARRAY = [];
var FOOTER_COOKIE_TOTAL_ARRAY = [];
var footerDailyTotal = 0;


function makeCookieStoreForm() {
  // Get the element
  var addStoreForm = document.getElementById('add_store_form');

  // Add the listener
  addStoreForm.addEventListener('submit', handleSubmit);

  // Create the handler
  // This function will take in the input from the user for a new cookie store, create a new cookie store object, and add it as a row to the table
  function handleSubmit(event) {
    event.preventDefault(); // Prevent the page from refreshing

    // Take in input
    var storeName = event.target.store_name.value; // event.target is the form (in this case), event.target.someTarget fetches the node
    var minCust = event.target.min_cust.value;
    var maxCust = event.target.max_cust.value;
    var avgCookiesPerSale = event.target.avg_cookies_per_sale.value;

    // Handle input
    var addedStore = new CookieStore(storeName, minCust, maxCust, avgCookiesPerSale); // add new instance of a cookie store
    addedStore.calcCookiesPerHr(); // make the store's cookiesPerHrObjectArray
    COOKIE_STORES_ARRAY.push(addedStore); // push the new store to the array

//*LOOK***LOOK***LOOK***LOOK***LOOK***LOOK***LOOK***LOOK***LOOK***LOOK***LOOK***LOOK***LOOK***LOOK***LOOK***LOOK***
// calc FOOTER_COOKIE_TOTAL_ARRAY here to update before makeCookieStoreTable()?

    // Reset the fields
    event.target.store_name.value = '';
    event.target.min_cust.value = '';
    event.target.max_cust.value = '';
    event.target.avg_cookies_per_sale.value = '';

//LOOK**********************************************************LOOK*****************************LOOK*******
//makeCookieStoreTable(); to refresh table
    addedStore.renderTableRow(); // generate the row on the table
  }
}

// Cookie store constructor
function CookieStore(storeName, minCustPerHr, maxCustPerHr, avgCookiesPerSale) {
  // Pass in store name, min/max hourly customers, average cookies per customer, and store hours, then assign them to the object properties
  this.storeName = storeName;
  this.minCustPerHr = minCustPerHr;
  this.maxCustPerHr = maxCustPerHr;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.cookiesPerHrObjectArray = [];  // to be populated by calcCookiesPerHr()
}

// Use a method of that object to generate a random number of customers per hour
CookieStore.prototype.calcCustPerHr = function() {
  // Returns a random integer between min (included) and max (included)
  // Borrowed from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  return Math.floor(Math.random() * (this.maxCustPerHr - this.minCustPerHr + 1) + this.minCustPerHr);
};

// Calculate and store the simulated amounts of cookies purchased for each hour at each location using average cookies purchased and the random number of customers generated
CookieStore.prototype.calcCookiesPerHr = function() {
  var totalCookies = 0;
  // Loop through the array to assign a value for cookies per hour for each hour
  for (var i = 0; i < OPEN_HOURS.length; i++) {
    this.cookiesPerHrObjectArray[i] = Math.round(this.avgCookiesPerSale * this.calcCustPerHr()); // Populates array as a value for a property
    totalCookies += this.cookiesPerHrObjectArray[i]; // Add the cookies from that hour to the total daily cookies
  }

  // Push the total to the end of the cookiesPerHrObjectArray array
  this.cookiesPerHrObjectArray.push(totalCookies);
};

CookieStore.prototype.renderTableRow = function() {
  var cookieStoreTable = document.getElementById('table_body'); // Locate
  var tableRow = document.createElement('tr'); // Create
  var storeNameTableHeader = document.createElement('th'); // Create
  var storeTotalTableData = document.createElement('td'); // Create
  var hourlyTableData;

  this.calcCookiesPerHr(); // Prepare the cookiesPerHrObjectArray via calcCookiesPerHr() to fill in the table data
  //this.calcFooterCookieTotals(); // TEST  TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST

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

// Calculates the hourly cookie sales after adding all the cookies at that hour at every store, then assembles the values in FOOTER_COOKIE_TOTAL_ARRAY
CookieStore.prototype.calcFooterCookieTotals = function() {
  var footerHourlyTotal = 0;

  // Loop through the open hours
  for(var i = 0; i < OPEN_HOURS.length; i++) {
    //footerHourlyTotal = 0; // Reset the hourly total
    footerHourlyTotal = this.cookiesPerHrObjectArray[i];
    footerDailyTotal += footerHourlyTotal; // add the store's hourly total to the daily total

    // If the FOOTER_COOKIE_TOTAL_ARRAY is empty, push the hourly total in
    // else add it to the total for that hour
    if(isNaN(FOOTER_COOKIE_TOTAL_ARRAY[i])) {
      FOOTER_COOKIE_TOTAL_ARRAY.push(footerHourlyTotal);
    } else {
      FOOTER_COOKIE_TOTAL_ARRAY[i] += footerHourlyTotal;
    }
    // // Loop through each store to find the cookie total for that hour
    // for(var j = 0; j < COOKIE_STORES_ARRAY.length; j++) {
    //
    // }
  }
  FOOTER_COOKIE_TOTAL_ARRAY.push(footerDailyTotal);
  console.log('footerDailyTotal: ', footerDailyTotal);
};

// CookieStore.prototype.calcFooterCookieTotals = function() {
//   var footerHourlyTotal = 0;
//
//   // loop through the cookiesPerHrObjectArray
//   for (var i = 0; i < this.cookiesPerHrObjectArray.length; i++) {
//     footerHourlyTotal = this.cookiesPerHrObjectArray[i];
//
//     // Loop through the array of cookies stores
//     for (var j = 0; j < COOKIE_STORES_ARRAY.length; j++) {
//       footerHourlyTotal += COOKIE_STORES_ARRAY[j].cookiesPerHrObjectArray[i];
//
//       // if there's nothing in the array do a push else do a += at [i]
//       if (FOOTER_COOKIE_TOTAL_ARRAY.length === 0) {
//         FOOTER_COOKIE_TOTAL_ARRAY.push(footerHourlyTotal);
//       } else {
//         FOOTER_COOKIE_TOTAL_ARRAY[i] += footerHourlyTotal;
//       }
//     }
//     // Reset footerHourlyTotal
//     footerHourlyTotal = 0;
//   }
// };

// Use a stand alone function to render the table header
function renderHeaderRow() {
  var storeHeaderRow = document.getElementById('table_header'); // Locate
  var tableHeaderRow = document.createElement('tr'); // Create
  var blankTableHeader = document.createElement('th'); // Create
  var totalTableHeader = document.createElement('th'); // Create
  var hourlyTableHeader;

  //calcFooterCookieTotals(); //  TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST

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
}

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
    hourlyTotals.textContent = FOOTER_COOKIE_TOTAL_ARRAY[i]; // Update content
    tableFooterRow.appendChild(hourlyTotals);  // Append after the footer label
  }

  totalTableFooter.textContent = footerDailyTotal; // Update content
  tableFooterRow.appendChild(totalTableFooter); // Append after hourly table headers
  storeFooterRow.appendChild(tableFooterRow); // Append the header row to the table
}

function makeCookieStoreTable() {
  // Make the table header row
  renderHeaderRow();

  // Add the table body rows
  // Push all the cookie stores to COOKIE_STORES_ARRAY
  COOKIE_STORES_ARRAY.push(new CookieStore('Pike', 23, 65, 6.3), new CookieStore('SeaTac Airport', 3, 24, 1.2), new CookieStore('Seattle Center', 11, 38, 3.7), new CookieStore('Capitol Hill', 20, 38, 2.3), new CookieStore('Alki', 2, 16, 4.6));

  // write a for loop to call the .renderTableRow function for each object[i]
  for (var i = 0; i < COOKIE_STORES_ARRAY.length; i++) {
    COOKIE_STORES_ARRAY[i].renderTableRow();
    COOKIE_STORES_ARRAY[i].calcFooterCookieTotals();// TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST
  }

  // Make the table footer row
  renderFooterRow();
}

// EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---
// EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---EXECUTE CODE---
makeCookieStoreForm();
makeCookieStoreTable();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// EVERYTHING ABOVE THIS LINE IS GOOD--EVERYTHING ABOVE THIS LINE IS GOOD---EVERYTHING ABOVE THIS LINE IS GOOD----
