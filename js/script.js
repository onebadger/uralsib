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

function calculatePayment () {
  
  if (!isKnownClient) {
    
    $insuranceHolder.show();
    percentage = unknownClientPercent;
    
    if (!insuranceAccepted) {
      percentage += insurancePercent;
    }
    
  } else if (isKnownClient && personalOfferAccepted) {
    
    $insuranceHolder.hide();
    percentage = knownClientPercent;
    $percentHolder.val(percentage);
    
  } else {
    
    $insuranceHolder.hide();
    percentage = unknownClientPercent;
    $percentHolder.val(percentage);
    
  }
  
  $percentHolder.val(percentage);
  monthlyPayment = amount * (1 + percentage / 100) / duration;
  amount = $amountHolder.val();
  duration = $durationHolder.val();
  $paymentHolder.val(monthlyPayment);
}

function checkKnownClient() {
  
  for ( var i = 0; i < clientsList.length; i++ ) {
    
    var client = clientsList[i];
    if ( client.firstName === firstName.toUpperCase() && client.lastName === lastName.toUpperCase() && client.middleName === middleName.toUpperCase() && client.birthDate === birthDate ) {
      isKnownClient = true;
      $amountHolder.add($amountRangeHolder).attr('min', 35000);
      $amountHolder.add($amountRangeHolder).attr('max', 1500000);
      $amountHolder.add($amountRangeHolder).val(900000);
      $durationHolder.add($durationRangeHolder).attr('min', 12);
      $durationHolder.add($durationRangeHolder).attr('max', 84);
      $durationHolder.add($durationRangeHolder).val(36);
      return
    } else {
      isKnownClient = false;
      $amountHolder.add($amountRangeHolder).attr('min', 50000);
      $amountHolder.add($amountRangeHolder).attr('max', 1000000);
      $amountHolder.add($amountRangeHolder).val(500000);
      $durationHolder.add($durationRangeHolder).attr('min', 12);
      $durationHolder.add($durationRangeHolder).attr('max', 60);
      $durationHolder.add($durationRangeHolder).val(24);
    }
  };
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
  
    if (!personDetailsEntered) { 
      
      $amountHolder.attr('disabled', true);
      $amountRangeHolder.attr('disabled', true);
      $durationHolder.attr('disabled', true);
      $durationRangeHolder.attr('disabled', true);
      $insuranceAccept.attr('disabled', true);
      $insuranceDecline.attr('disabled', true);

      $amountHolder.val('');
      $amountRangeHolder.val(0);
      $durationHolder.val('');
      $durationRangeHolder.val(0);
      $percentHolder.val('');
      $paymentHolder.val('');
      
      return 
    }
  
    $amountHolder.attr('disabled', false);
    $amountRangeHolder.attr('disabled', false);
    $durationHolder.attr('disabled', false);
    $durationRangeHolder.attr('disabled', false);
    $insuranceAccept.attr('disabled', false);
    $insuranceDecline.attr('disabled', false);
  
    checkKnownClient();
  
    if (isKnownClient) { 
      
      $modalWindow.show(); 
      
    } else {
      
      calculatePayment();
      
    }
    
});
  
$offerAccept.click(function() {
  $modalWindow.hide();
  $insuranceHolder.hide();
  personalOfferAccepted = true;
  percentage = knownClientPercent;
  calculatePayment();
      
});

$offerDecline.click(function() {
  $modalWindow.hide();
  $insuranceHolder.show();
  personalOfferAccepted = false;
  percentage = unknownClientPercent;
  calculatePayment();
});

$insuranceAccept.click(function() {
  insuranceAccepted = true;
  calculatePayment();
});
                       
                       
$insuranceDecline.click(function() {
  insuranceAccepted = false;
  calculatePayment();
});                 


$amountRangeHolder.on("change mousemove", function() {
  $amountHolder.val($amountRangeHolder.val());
  calculatePayment ();
});

$amountHolder.on("change input", function() {
  $amountRangeHolder.val($amountHolder.val());
  calculatePayment ();
});

$durationRangeHolder.on("change mousemove", function() {
  $durationHolder.val($durationRangeHolder.val());
  calculatePayment ();
});

$durationHolder.on("change input", function() {
  $durationRangeHolder.val($durationHolder.val());
  calculatePayment ();
});
