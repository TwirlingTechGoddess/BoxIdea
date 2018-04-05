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
$('main').on('click', $downVote, downVoteQuality);
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
  debugger;
  prependCards(newIdea);
  storeMyIdea(newIdea);
}


function prependCards(newIdea) {
  $('.info-from-inputs').prepend(`
    <article id=${newIdea.id}>
      <h2 class="output-title" contenteditable="true" aria-label="editable-idea-title">${newIdea.title}</h2>
      <button class="delete-button" name="Delete-Button" aria-label="button-to-delete-this-idea"></button>
      <br>
      <p class="output-body" contenteditable="true" aria-label="editable-idea-body">${newIdea.body}</p>
      <form>
        <button class="upvote-button" aria-label="Up-Vote-Button"></button>
        <button class="downvote-button" aria-label="Down-Vote-Button"></button>
        <h3>quality: ${newIdea.quality}</h3>
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
}

function upVoteQuality(event) {
  event.preventDefault();
  var capturedId = $(event.target).parent().parent().attr("id");
  var pullStorage = localStorage.getItem(capturedId);
  var parsedStorage = JSON.parse(pullStorage);
  if (parsedStorage.quality === 'swill') {
    parsedStorage.quality = 'plausible';
  } else if (parsedStorage.quality === 'plausible') {
    parsedStorage.quality = 'genius';
  } 
  stringifyQuality = JSON.stringify(parsedStorage);
  localStorage.setItem(capturedId, stringifyQuality);
  prependCards(parsedStorage);
  window.location.reload(true);
}

function downVoteQuality(event) {
  event.preventDefault();
  var capturedId = $(event.target).parent().parent().attr("id");
  var pullStorage = localStorage.getItem(capturedId);
  var parsedStorage = JSON.parse(pullStorage);
  if (parsedStorage.quality === 'genius') {
    parsedStorage.quality = 'plausible';
  } else if (parsedStorage.quality === 'plausible') {
    parsedStorage.quality = 'swill';
  } 
  stringifyQuality = JSON.stringify(parsedStorage);
  localStorage.setItem(capturedId, stringifyQuality);
  prependCards(parsedStorage);
  window.location.reload();
}

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

