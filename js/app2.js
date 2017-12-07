var $firstName = $('#first_name');
var $lastName = $('#last_name');
var $middleName = $('#middle_name');
var $birthDate = $('#birth_date');

var firstName;
var lastName;
var middleName;
var birthDate;

var $amountHolder = $('#amount');
var $amountRangeHolder = $('#amount_range');
var $durationHolder = $('#duration');
var $durationRangeHolder = $('#duration_range');
var $percentHolder = $('#credit_percent');
var $paymentHolder = $('#credit_payment');
var $insuranceHolder = $('#insurance');

var amount = 0;
var amountRange = 0;
var duration = 0;
var durationRange = 0;
var percentage = 0;
var monthlyPayment = 0;

var $modalWindow = $('#modal');
var $offerAccept = $('#yes_button');
var $offerDecline = $('#no_button');
var $insuranceAccept = $('#insurance_on');
var $insuranceDecline = $('#insurance_off');

var personDetailsEntered = false;
var isKnownClient = false;
var personalOfferAccepted = false;
var insuranceAccepted = false;

var knownClientPercent = 15;
var unknownClientPercent = 19;
var insurancePercent = 3;

$(function($){
   $("#birth_date").mask("99/99/9999",{placeholder:"ДД/ММ/ГГГГ"});
});

$('#submit').on('click', function (event) {
  event.preventDefault();
  calculatePayment();
});

function checkKnownClient() {
  for ( var i = 0; i < clientsList.length; i++ ) {
    var client = clientsList[i];
    if ( client.firstName === firstName.toUpperCase() && client.lastName === lastName.toUpperCase() && client.middleName === middleName.toUpperCase() && client.birthDate === birthDate ) {
      isKnownClient = true;
      return;
    } else {
      isKnownClient = false;
    }
  };
}

function personalOffer () {
  $amountHolder.add($amountRangeHolder).attr('min', 35000);
  $amountHolder.add($amountRangeHolder).attr('max', 1500000);
//  normalizeAmountValue();
  
  $durationHolder.add($durationRangeHolder).attr('min', 12);
  $durationHolder.add($durationRangeHolder).attr('max', 84);
  $durationHolder.add($durationRangeHolder).attr('step', 1);
//  normalizeDurationValue();
}

function commonOffer () {
  $amountHolder.add($amountRangeHolder).attr('min', 50000);
  $amountHolder.add($amountRangeHolder).attr('max', 1000000);
//  normalizeAmountValue();

  $durationHolder.add($durationRangeHolder).attr('min', 12);
  $durationHolder.add($durationRangeHolder).attr('max', 60);
  $durationHolder.add($durationRangeHolder).attr('step', 1);
//  normalizeDurationValue();
}



function calculatePayment() {
  
  
  monthlyPayment = amount * (1 + percentage / 100) / duration;
  $paymentHolder.val(monthlyPayment);
  
}

$firstName
  .add($lastName)
  .add($middleName)
  .add($birthDate)
  .on('change', function () {
    firstName = $firstName.val();
    lastName = $lastName.val();
    middleName = $middleName.val();
    birthDate = $birthDate.val();
    
    personDetailsEntered = firstName && lastName && middleName && birthDate;
  
    $amountHolder.attr('disabled', !personDetailsEntered);
    $amountRangeHolder.attr('disabled', !personDetailsEntered);
    $durationHolder.attr('disabled', !personDetailsEntered);
    $durationRangeHolder.attr('disabled', !personDetailsEntered);
    $insuranceAccept.attr('disabled', !personDetailsEntered);
    $insuranceDecline.attr('disabled', !personDetailsEntered);
  
    if (!personDetailsEntered) {
      $( '#submit' ).removeClass('submit-active');
      return;
    } else {
      $( '#submit' ).addClass('submit-active');
    }
  
    checkKnownClient();
  
    if (isKnownClient) { 
      $modalWindow.show(); 
    } else {
      personalOfferAccepted = false;

      commonOffer();

//      calculatePayment();
    }
});

$offerAccept.click(function() {
  $modalWindow.hide();
  personalOfferAccepted = true;

  personalOffer();

  calculatePayment();
});

$offerDecline.click(function() {
  $modalWindow.hide();
  personalOfferAccepted = false;
  
  commonOffer();
  
  calculatePayment();
});

$amountRangeHolder.on("change mousemove", function() {
  $amountHolder.val($amountRangeHolder.val());
  amount = $amountHolder.val();
});

$amountHolder.on("change input", function() {
  $amountRangeHolder.val($amountHolder.val());
  amount = $amountHolder.val();
});

//$amountHolder.on('blur', normalizeAmountValue);

$durationRangeHolder.on("change mousemove", function() {
  $durationHolder.val($durationRangeHolder.val());
  duration = $durationHolder.val();
});

$durationHolder.on("change input", function() {
  $durationRangeHolder.val($durationHolder.val());
  duration = $durationHolder.val();
});

//$durationHolder.on('blur', normalizeDurationValue);