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

var documentsCategoriesUrl = "documents/categories.json";
var menuItemsTitleHtml = "snippets/cards-title.html";
var menuDocumentsCategoriesHtml = "snippets/documents-categories-list.html";
var menuDocumentsHtml = "snippets/documents-list.html";

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
  documentsCategoriesUrl, 
  buildAndShowDocumentsCategoriesHTML, 
  true); // Explicitely setting the flag to get JSON from server processed into an object literal
});
var categoryName;
gsne.showDocuments = function(url,name){
  showLoading("#main-content");
  categoryName = name;
  $ajaxUtils.sendGetRequest(
  "documents/".concat(url,"/files.json"),
  buildAndShowDocumentsHTML);
};

function buildAndShowDocumentsCategoriesHTML (categoryMenuItems) {
  // Load title snippet of menu items page
  $ajaxUtils.sendGetRequest(
    menuItemsTitleHtml,
    function (menuItemsTitleHtml) {
      // Retrieve single menu item snippet
      $ajaxUtils.sendGetRequest(
        menuDocumentsCategoriesHtml,
        function (menuDocumentHtml) {
          // Switch CSS class active to menu button
          var menuDocumentsCategoriesViewHtml = 
            buildDocumentsCategoriesMenuHtml(categoryMenuItems, 
                                    menuItemsTitleHtml,
                                    menuDocumentHtml);
          insertHtml("#main-content", menuDocumentsCategoriesViewHtml);
        },
        false);
    },
    false);
}

function buildDocumentsCategoriesMenuHtml(categoryMenuItems, 
                                menuItemsTitleHtml,
                                menuDocumentHtml){
  menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, "name", "424 ΓΣΝΕ");
  menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, "desc", "ΠΡΟΤΥΠΑ ΕΓΓΡΑΦΩΝ");
  var finalHtml = menuItemsTitleHtml;
  finalHtml += "<section class='row'>";
  finalHtml += "<dic class='col-sm-12'>";
  finalHtml += "<table class='table table-striped'>";
  finalHtml += "<thead><tr><th><a href='index.html'><span class='glyphicon glyphicon-chevron-left'></span> Πίσω</a></th></tr><tr><th>Κατηγορίες Εντύπων</th></tr></thead>"
  finalHtml += "<tbody>";
  // Loop over menu items
  var menuItems = categoryMenuItems;
  for (var i = 0; i < menuItems.length; i++) {
    var html = menuDocumentHtml;
    html = insertProperty(html, "short_name", menuItems[i].short_name);
    html = insertProperty(html, "name", menuItems[i].name);
    finalHtml += html;
  }
  finalHtml += "</tbody>";
  finalHtml += "</table>";
  finalHtml += "</div>";
  finalHtml += "</section>";
  return finalHtml;
}

function buildAndShowDocumentsHTML (category) {
  // Load title snippet of menu items page
  $ajaxUtils.sendGetRequest(
    menuItemsTitleHtml,
    function (menuItemsTitleHtml) {
      // Retrieve single menu item snippet
      $ajaxUtils.sendGetRequest(
        menuDocumentsHtml,
        function (menuDocumentHtml) {
          // Switch CSS class active to menu button
          var menuDocumentsViewHtml = 
            buildDocumentsMenuHtml(category,
                                    menuItemsTitleHtml,
                                    menuDocumentHtml);
          insertHtml("#main-content", menuDocumentsViewHtml);
        },
        false);
    },
    false);
}

function buildDocumentsMenuHtml(category,
                                menuItemsTitleHtml,
                                menuDocumentHtml){
  menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, "name", "424 ΓΣΝΕ");
  menuItemsTitleHtml = insertProperty(menuItemsTitleHtml, "desc", "Πρότυπα ".concat(categoryName));
  var finalHtml = menuItemsTitleHtml;
  finalHtml += "<section class='row'>";
  finalHtml += "<dic class='col-sm-12'>";
  finalHtml += "<table class='table table-striped'>";
  finalHtml += "<thead><tr><th><a href=''><span class='glyphicon glyphicon-chevron-left'></span> Πίσω</a></th></tr><tr><th>Έντυπα</th></tr></thead>"
  finalHtml += "<tbody>";
  // // Loop over menu items
  var menuItems = category;
  for (var i = 0; i < menuItems.length; i++) {
    var html = menuDocumentHtml;
    html = insertProperty(html, "short_name", menuItems[i].short_name);
    html = insertProperty(html, "name", menuItems[i].name);
    html = insertProperty(html, "file_name", menuItems[i].file_name);
    finalHtml += html;
  }
  finalHtml += "</tbody>";
  finalHtml += "</table>";
  finalHtml += "</div>";
  finalHtml += "</section>";
  return finalHtml;
}

global.$gsne = gsne;

})(window);

