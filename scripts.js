var $searchBar = $(."search-bar");

var $inputTitle = $(."input-title");
var $inputBody = $(."input-body");
var $submitButton = $(."submit-button");

$submitButton.on('click', addItemToList);
//**5 (pt.1of2-pt is #6 below)button toggle active/non (comment deletes and moves up)
//.$inputTitle.on('keyup'. toggleButton);
//.$inputBody.on('keyup'. toggleButton);



function addItemToList(event) {
  event.preventDefault();
  console.log($inputTitle.val(), $inputBody.val());
}
//**1.the two var below go into function above when working
//var title = (.$inputTitle.val());
//var body = (.$inputBody.val());

//**2.add item to output; goes into function above
//var $outputBody = $('.output-body');
//$outputBody.prepend('
//<p>$(title) $(body)</p>
//');

//**3.final part of function above
//clearInputs()

//**4. New function to clear inputs
//function clearInputs() {
//  $itemTitle.val('');
// $inputBody.val('');
//}

//6.for pt.2of2 for button active/non sction (20.09on video..)
//function toggleButton() {
//  if ($inputTitle.val() === '' || $inputBody.val( === (''))) {
//  console.log('yup');
//  } else {
//    console.log('naw');
//  }
//}
