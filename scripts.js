var $inputTitle = $(".input-title");
var $inputBody = $(".input-body");
var $submitButton = $(".submit-button");
var $searchBar = $(".search-bar");
var $outputTitle = $(".output-title");
var $outputBody = $(".output-body");
var title = $outputTitle.val();
var body = $outputBody.val();
var $upVote = $('.upvote-button');
var $downVote = $('.downvote-button');


$inputTitle.keyup(toggleButton);
$inputBody.keyup(toggleButton);
$submitButton.on('click', createIdea);
$('main').on('click', '.delete-button', deleteIdea);
$('main').on('click', $upVote, upVoteQuality);
// $('main').on('click', $downVote, downVoteQuality);
// $('main').on('change', $outputTitle, editTexts);
// $('main').on('change', $outputBody, editTexts);
$searchBar.keyup(searchIdeas);




function toggleButton() {
  if ($inputTitle.val() === '' || $inputBody.val() === '') {
    $submitButton.prop( "disabled", true);
  } else {
    $submitButton.prop( "disabled", false);
  }
}
function BoxIdea(title, body) {
  this.title = title;
  this.body = body;
  this.quality = 'swill';
  this.id = Date.now();
}

function createIdea(event) {
  event.preventDefault();
  title = $inputTitle.val();
  body = $inputBody.val();
  var newIdea = new BoxIdea(title, body);
  prependCards(newIdea);
  storeMyIdea(newIdea);
}
  
function prependCards(newIdea) {
  var swillOptions = `<option value="swill" selected>swill</option>
          <option value="plausible">plausible</option>
          <option value="genius">genius</option>`



  $('.info-from-inputs').prepend(`
    <article id=${newIdea.id}>
      <h2 class="output-title" contenteditable="true">${newIdea.title}</h2>
      <button class="delete-button"></button>
      <br>
      <p class="output-body" contenteditable="true">${newIdea.body}</p>
      <form>
        <button class="upvote-button"></button>
        <button class="downvote-button"></button>
        <h3>quality:</h3>
        <select class="quality-selector" name="quality">\
          ${swillOptions}
        </select>
      </form>
    </article>
  `);
  clearInputs();
  toggleButton();
}

function clearInputs() {
  $inputTitle.val('');
  $inputBody.val('');
}

function storeMyIdea(newIdea) {
  var stringifiedIdea = JSON.stringify(newIdea);
  localStorage.setItem(newIdea.id, stringifiedIdea);
}

retrieveDataFromStorage();

function retrieveDataFromStorage(newIdea) {
  for( var i = 0; i < localStorage.length; i++) {
    var storageContents = localStorage.getItem(localStorage.key(i));
    var newIdea = JSON.parse(storageContents);
    prependCards(newIdea);
  }
}

function deleteIdea(event) {
  event.preventDefault();
  $(event.target) === $('delete-button');
  var keysOmine = $(event.target).parent('article').attr("id");
  localStorage.removeItem(keysOmine); 
  $(event.target).parent('article').remove();
};

// upVoteQuality();

function upVoteQuality(event) {
  event.preventDefault();
  var capturedId = $(event.target).parent().parent().attr("id");
  var pullStorage = localStorage.getItem(capturedId);
  var parsedStorage = JSON.parse(pullStorage);
  var qualityBox = $(event.target).siblings('select').children('option');
  if (qualityBox[0].selected === true) {
    qualityBox[0].selected = false;
    qualityBox[1].selected = true;
    debugger;
    parsedStorage.quality = "plausible";
  } else {
    qualityBox[2].selected = true;
    parsedStorage.quality = "genius";
  } 
  stringifyQuality = JSON.stringify(parsedStorage);
  localStorage.setItem(capturedId, stringifyQuality);
}

// function downVoteQuality(event) {
//   event.preventDefault();
//   $(event.target) === $downVote;
//   var capturedId = $(event.target).parent().parent().attr("id");
//   var qualityBox = $(event.target).siblings('select');
//   var selectBubble = $qualityBox.children('option');
//   if (selectBubble[2].selected === true) {
//     selectBubble[2].selected = false;
//     selectBubble[1].selected = true;
//   } else if($selectBubble[1].selected === true) {
//     selectBubble[1].selected = false;
//     selectBubble[0].selected = true;
//   }
// }

// function editTexts() {
//   event.preventDefault();
    // var contenteditable = $($outputBody).text($outputBody.html());
//   var editedTextId = $(event.target).parent('article').attr("id");
//   var pullStorage = localStorage.getItem(editedTextId);
//   var parsedStorage = JSON.parse(pullStorage);
//   createIdea(parsedStorage);
// }
// }

function searchIdeas() {
   var valThis = $(this).val().toLowerCase();
    if(valThis == ""){
        $('main > article').show();           
    } else {
        $('main > article').each(function() {
            var text = $(this).text().toLowerCase();
            (text.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
   };
};

