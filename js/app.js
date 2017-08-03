// change and count calc. conditions according to the users input


var $firstName = $("#first_name").val();
var $lastName = $("#last_name").val();
var $middleName = $("#middle_name").val();
var $birthDate = $("#birth_date").val();
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
  clientFirstName = clientsList[i];
  clientLastName = clientsList[i];
  clientMiddleName = clientsList[i];
  clientBirthDate = clientsList[i];
  console.log('hi');
  // if the user data matches
    if ( clientFirstName.firstName ===  $firstName.toUpperCase() ) {
    // show modal window asking if the user wants to accept the bank offer 
      $modalWindow.show();
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









