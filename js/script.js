$(function () { // Same as document.addEventListener("DOMContentLoaded"...

  // Same as document.querySelector("#navbarToggle").addEventListener("blur",...
  $("#navbarToggle").blur(function (event) {
    var screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
  });
});

(function (global) {

var gsne = {};

var categoriesUrl = "categories.json";
var menuItemsTitleHtml = "snippets/cards-title.html";
var menuItemHtml = "snippets/single-card.html";

// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='text-center'>";
  html += "<img src='images/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// Return substitute of '{{propName}}' 
// with propValue in given 'string' 
var insertProperty = function (string, propName, propValue) {
  var propToReplace = "{{" + propName + "}}";
  string = string
    .replace(new RegExp(propToReplace, "g"), propValue);
  return string;
};

// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {
  
// On first load, show home view
showLoading("#main-content");
$ajaxUtils.sendGetRequest(
  categoriesUrl, 
  buildAndShowCardItemsHTML, 
  true); // Explicitely setting the flag to get JSON from server processed into an object literal
});

// Builds HTML for the single category page based on the data
// from the server
function buildAndShowCardItemsHTML (categoryMenuItems) {
  // Load title snippet of menu items page
  $ajaxUtils.sendGetRequest(
    menuItemsTitleHtml,
    function (menuItemsTitleHtml) {
      // Retrieve single menu item snippet
      $ajaxUtils.sendGetRequest(
        menuItemHtml,
        function (menuItemHtml) {
          // Switch CSS class active to menu button
          var menuItemsViewHtml = 
            buildCardItemsViewHtml(categoryMenuItems, 
                                    menuItemsTitleHtml,
                                    menuItemHtml);
          insertHtml("#main-content", menuItemsViewHtml);
        },
        false);
    },
    false);
}

// Using category and menu items data and snippets html
// build menu items view HTML to be inserted into page
function buildCardItemsViewHtml(categoryMenuItems, 
                                menuItemsTitleHtml,
                                menuItemHtml) {
  menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, "name", "424 ΓΣΝΕ");
  menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, "desc", "Χρήσιμα site");
  var finalHtml = menuItemsTitleHtml;
  finalHtml += "<section class='row'>";

  // Loop over menu items
  var menuItems = categoryMenuItems;
  for (var i = 0; i < menuItems.length; i++) {

    if (i % 3 == 0) {finalHtml += "<div class='col-sm-1'></div>";
    }

    // Insert menu item values
    var html = menuItemHtml;
    html = insertProperty(html, "short_name", menuItems[i].short_name);
    html = insertProperty(html, "name", menuItems[i].name);
    html = insertProperty(html, "description", menuItems[i].desc);
    html = insertProperty(html, "icon", menuItems[i].icon);
    html = insertProperty(html, "url", menuItems[i].url);

    // Add clearfix after every third menu item
    if (i % 3 == 2) {
      html += 
        "<div class='clearfix visible-lg-block visible-md-block visible-sm-block'></div>";
    }

    finalHtml += html;
  }

  finalHtml += "</section>";
  return finalHtml;
}

global.$gsne = gsne;

})(window);

