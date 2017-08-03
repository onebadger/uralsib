// change and count calc. conditions according to the users input

var clientFirstName;
var clientLastName;
var clientMiddleName;
var clientBirthDate;

var $modalWindow = $('#modal');

var amount = 0;
var duration = 0;
var insurance = false;

var personalOfferAvailable = false;
var personalOfferAccepted = false;


function updateResults() {

  // test if the user input data matches clients list elements
  for ( var i = 0; i < clientsList.length; i += 1 ) {
    client = clientsList[i];
    // if the user data matches
    if ( client.firstName ===  $("#first_name").val().toUpperCase() && 
        client.lastName === $("#last_name").val().toUpperCase() && 
        client.middleName === $("#middle_name").val().toUpperCase() && 
        client.birthDate === $("#birth_date").val() ) {
        // show modal window asking if the user wants to accept the bank offer 
        $modalWindow.show("fast");
        
        $('#yes_button, #no_button').click(function () {
          if (this.id == 'yes_button') {
            $modalWindow.hide("fast");
            $("#credit_sum").val('900000');
        }
        else if (this.id == 'no_button') {
          $modalWindow.hide("fast");
    }
});
      
      
      
      } else {
        
      }
  }
  
  
  
  


      // if user accept the offer
        // apply conditions to the calculator
        // hide insurance field below
        // let user change the sum and the period of credit according to conditions applied
      // if user doesn't accept the offer
        // use calculator without conditions
        // let user change the sum and the period of credit according to conditions applied
        // change credit percent if insurance on/off
  // if the user data doesn't match
    // use calculator without conditions
    // let user change the sum and the period of credit according to conditions applied
    // change credit percent if insurance on/off

}

$("#first_name, #last_name, #middle_name, #birth_date").on("input", function () {
  updateResults();
});

// personal bank offer
// credit sum 900000 rub.
// credit sum range 35000 - 1500000 rub.
// credit period 36 mo.
// credit period range 12 - 84 mo.
// credit percent 15% yr.


// common bank offer
// credit sum 900000 rub.
// credit sum range 50000 - 1000000 rub.
// credit period 36 mo.
// credit period range 12 - 60 mo.
// credit percent 19% yr. with insurance
// credit percent 22% yr. without insurance




$('#credit_sum_range').on("change mousemove", function() {
    $('#credit_sum').val($('#credit_sum_range').val());
});

$('#credit_sum').on("change input", function() {
    $('#credit_sum_range').val($('#credit_sum').val());
});

$('#credit_period_range').on("change mousemove", function() {
    $('#credit_period').val($('#credit_period_range').val());
});

$('#credit_period').on("change input", function() {
    $('#credit_period_range').val($('#credit_period').val());
});



