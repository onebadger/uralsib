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

function calculatePayment () {
  $("#credit_payment").val( $("#credit_sum").val() * ( 1 + $("#credit_percent").val() / 100 ) /  $("#credit_period").val() );
}

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
      
      // if user accept the offer
      $('#yes_button, #no_button').click(function () {
        if (this.id == 'yes_button') {
              
          // hide modal
          $modalWindow.hide("fast");
          // apply conditions to the calculator
          // let user change the sum and the period of credit according to conditions applied 
          $("#credit_sum, #credit_sum_range").attr('min', 35000);
          $("#credit_sum, #credit_sum_range").attr('max', 1500000);
          $("#credit_sum").val(900000);
          $('#credit_sum_range').val(900000);
          $("#credit_period, #credit_period_range").attr('min', 12);
          $("#credit_period, #credit_period_range").attr('max', 84);
          $("#credit_period, #credit_period_range").attr('step', 1);
          $("#credit_period").val(24);
          $('#credit_period_range').val(24);
          $("#credit_sum, #credit_sum_range").prop('disabled', false);
          $("#credit_period, #credit_period_range").prop('disabled', false);
          $("#credit_percent").val(15);
          calculatePayment();
          // hide insurance field below
          $("#insurance").hide();
            
        // if user doesn't accept the offer    
        } else if (this.id == 'no_button') {
          
          // hide modal
          $modalWindow.hide("fast");
          // use calculator with common conditions
          // let user change the sum and the period of credit according to conditions applied
          $("#credit_sum, #credit_sum_range").attr('min', 50000);
          $("#credit_sum, #credit_sum_range").attr('max', 1000000);
          $("#credit_sum").val(500000);
          $('#credit_sum_range').val(500000);
          $("#credit_period, #credit_period_range").attr('min', 12);
          $("#credit_period, #credit_period_range").attr('max', 60);
          $("#credit_period, #credit_period_range").attr('step', 1);
          $("#credit_period").val(24);
          $('#credit_period_range').val(24);
          $("#credit_sum, #credit_sum_range").prop('disabled', false);
          $("#credit_period, #credit_period_range").prop('disabled', false);
          $("#credit_percent").val(19);
          calculatePayment();
          // show insurance field below
          $("#insurance").show();
          // change credit percent if insurance on/off
          if ( $('input:radio[id="insurance_on"]').attr('checked', true) ) {
            $("#credit_percent").val(19);
          } else if ( $('input:radio[id="insurance_off"]').attr('checked', true) ) {
            $("#credit_percent").val(22);
          }
        }
      });
      
    // if the user data doesn't match 
    } else if ( $("#first_name").val() && $("#last_name").val() && $("#middle_name").val() && $("#birth_date").val() ) {
      // use calculator with common conditions
      // let user change the sum and the period of credit according to conditions applied
      $("#credit_sum, #credit_sum_range").attr('min', 50000);
      $("#credit_sum, #credit_sum_range").attr('max', 1000000);
      $("#credit_sum").val(500000);
      $('#credit_sum_range').val(500000);
      $("#credit_period, #credit_period_range").attr('min', 12);
      $("#credit_period, #credit_period_range").attr('max', 60);
      $("#credit_period, #credit_period_range").attr('step', 1);
      $("#credit_period").val(24);
      $('#credit_period_range').val(24);
      $("#credit_sum, #credit_sum_range, #credit_period, #credit_period_range").prop('disabled', false);
      $("#credit_percent").val(19);
      calculatePayment();
      // show insurance field below
        $("#insurance").show();
      // change credit percent if insurance on/off
      if ( $('input:radio[id="insurance_on"]').attr('checked', true) ) {
        $("#credit_percent").val(19);
      } else if ( $('input:radio[id="insurance_off"]').attr('checked', true) ) {
        $("#credit_percent").val(22);
      }
    
    // if there is no user data
    } else if ( !$("#first_name").val() || !$("#last_name").val() || !$("#middle_name").val() || !$("#birth_date").val() ) { 
      // block form if user delete data
      $("#credit_sum, #credit_sum_range, #credit_period, #credit_period_range").prop('disabled', true);
      $('#credit_sum_range').val(0);
      $('#credit_period_range').val(0);
      $('#credit_sum').val("");
      $('#credit_period').val("");
      $("#credit_percent").val("")
    }
  }
      

}

$("#first_name, #last_name, #middle_name, #birth_date").on("input", function () {
  updateResults();
});

$("#credit_sum, #credit_sum_range, #credit_period, #credit_period_range, #insurance_on, #insurance_off").on("change", function () {
  calculatePayment();
});

$("#credit_sum, #credit_sum_range, #credit_period, #credit_period_range, #insurance_on, #insurance_off").on("change", function () {
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



