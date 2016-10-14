$(document).ready(function(){
 getExpenses();
 makeButton();
 makeNavbar();
});

var getExpenses = function(){
	   $.ajax({
		      type: "GET",
		      url: "api/expenses",
		      dataType: "json",
		      success: displayExpenses
		  }).fail(function(e){
		      console.log(e);
		      console.log('It blew up');
		    });


}
var $total = 0;

  var displayExpenses = function(data){
    $('#data-table').empty();
    $('#form').empty();

    $total=0;

    var $table = $('<table>');
    var $thead = $('<thead>');
    var $headRow = $('<tr>');
    var $headerName = $('<th>');
    $headerName.text("Name");
    var $headerCost = $('<th>');
    $headerCost.text("Cost");
    var $headerDescription = $('<th>');
    $headerDescription.text("Description");

    var $headerEdit = $('<th>');
    $headerEdit.text("Edit")

    var $headerDelete = $('<th>');
    $headerDelete.text("Delete")

    var $tbody = $('<tbody>');

    $headRow.append($headerName, $headerCost, $headerDescription, $headerEdit, $headerDelete);
    $thead.append($headRow);
    $table.append($thead);

    data.forEach(function(expense, index, array){
      for(var variable in expense){
        var $tRow = $('<tr>');
        if(variable === "name"){
          var $tdName = $('<td>');
          $tdName.text(expense[variable])
        }

        if(variable === "cost"){
          var $tdCost = $('<td>');
          $tdCost.text("$" + expense[variable])
          $total += expense[variable];
        }

        if(variable === "description"){
          var $tdDescription = $('<td>');
          $tdDescription.text(expense[variable])
        }

        $tRow.append($tdName);
        $tRow.append($tdCost);
        $tRow.append($tdDescription);
      }
      var $tdEdit = $('<td>');
      $tdEdit.text("Edit");
      $tdEdit.on('click', function(data){
       editExpense(expense);
      });

      var $tdDelete = $('<td>');
      $tdDelete.text("Delete");
      $tdDelete.on('click', function(data){
       deleteExpense(expense);
      });

      $tRow.append($tdEdit);
      $tRow.append($tdDelete);
      $tbody.append($tRow);

    })
    if (document.getElementById("total")){
      var $totalDisplay = $('#total');
      $totalDisplay.text("Total Monthly Expenses = $" + $total);
    }
    else {
      console.log("IN ELSE");
      var $text = $('<span id="total">');
      $text.text("Total Monthly Expenses = $" + $total);
    	$('#totalAndButton').append($text);
      makeButton();
    }

    $table.append($tbody);
    $('#data-table').append($table);
};

var deleteExpense = function(expense){
  $.ajax({
    type: "DELETE",
    url: "api/expenses/" + expense.id,
    success: getExpenses
}).fail(function(e){
    console.log(e);
    console.log('It blew up');
  });

};
var $submit = $('<input>');
$submit.attr("type", "submit");
$submit.attr("class", "submit");

var makeButton = function(){

  var $btn = $('<button id="createBtn">');
  $btn.text("Add New Expense");

  $('#totalAndButton').append($btn);

  $('#createBtn').on('click', function(){
  $('#data-table').empty();
  $('#form').empty();
  $('#totalAndButton').empty();

    var $form = $('<form>');
    var $inputName = $('<input>');
    $inputName.attr("name", "name");
    $inputName.attr("placeholder", "Name");
    $inputName.attr("type", "text");

    var $inputCost = $('<input>');
    $inputCost.attr("name", "cost");
    $inputCost.attr("placeholder", "Cost");
    $inputCost.attr("type", "text");

    var $break = $('<br>');

    $inputCost.append($('<br>'));

    var $inputDescription = $('<input>');
    $inputDescription.attr("name", "description");
    $inputDescription.attr("placeholder", "description");
    $inputDescription.attr("type", "text");
    $inputDescription.attr("class", "desc");

    $form.append($inputName, $inputCost, $break, $inputDescription, $submit);
    $('#form').append($form);

    $submit.click(function(e){
      e.preventDefault();

  var expense = {name : $inputName.val(), cost : $inputCost.val(), description : $inputDescription.val()};
  var stringifyExpense = JSON.stringify(expense);
    $.ajax({
        type: "POST",
        url: "api/expenses",
        contentType: "application/json",
        data: stringifyExpense,
        success: getExpenses
      });
  });
});
};

var editExpense = function(expense){

  $('#data-table').empty();
  $('#form').empty();
  $('#totalAndButton').empty();

    var $form = $('<form>');
    var $inputName = $('<input>');
    $inputName.attr("value", expense.name);
    $inputName.attr("name", "name");
    $inputName.attr("placeholder", "Name");
    $inputName.attr("type", "text");

    var $inputCost = $('<input>');
    $inputCost.attr("value", expense.cost);
    $inputCost.attr("name", "cost");
    $inputCost.attr("placeholder", "Cost");
    $inputCost.attr("type", "text");

    var $break = $('<br>');

    var $inputDescription = $('<input>');
    $inputDescription.attr("value", expense.description);
    $inputDescription.attr("name", "description");
    $inputDescription.attr("placeholder", "description");
    $inputDescription.attr("type", "text");
    $inputDescription.attr("class", "desc");

    $form.append($inputName, $inputCost, $break, $inputDescription, $submit);
    $('#form').append($form);

    $submit.click(function(e){
      e.preventDefault();

  var editExpense = {name : $inputName.val(), cost : $inputCost.val(), description : $inputDescription.val()};
  var stringifyExpense = JSON.stringify(editExpense);
    $.ajax({
        type: "PUT",
        url: "api/expenses/" + expense.id,
        contentType: "application/json",
        data: stringifyExpense,
        success: getExpenses
      });
  });
};

var makeNavbar = function(){

  var $navbar = $('<ul>');
  var $navbarLogo = $('<li>');
  $navbarLogo.text("Budget Tracker");
  $navbarLogo.attr("id","logo")
  var $navbarHome = $('<li>');
  $navbarHome.text("See Expenses");
  var $navbarAbout = $('<li>');
  $navbarAbout.text("About");

  $navbar.append($navbarLogo, $navbarHome);
  $('#navbar').append($navbar);
  
  $navbarHome.click(function(){
	  getExpenses();
  });
  
};
