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
        <select class="quality-selector" name="quality">
          <option value="swill" selected>swill</option>
          <option value="plausible">plausible</option>
          <option value="genius">genius</option>
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
  var newIdea = new BoxIdea(newIdea.title, newIdea.body);
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


function upVoteQuality(event) {
  event.preventDefault();
  $(event.target) === $upVote;
  var qualityBox = $(event.target).siblings('select');
  var selectBubble = qualityBox.children('option');
 var capturedId = $(event.target).parent().parent().attr("id");
 var storedId = localStorage.getItem(capturedId);
 var parsedId = JSON.parse(storedId);
  if (selectBubble[0].selected === true) {
    selectBubble[0].selected = false;
    selectBubble[1].selected = true;
    parsedId.quality = "plausible";
  } else if(selectBubble[1].selected === true) {
    selectBubble[1].selected = false;
    selectBubble[2].selected = true;
    parsedId.quality = "genius";
  }
  var stringifyQuality = JSON.stringify(parsedId);
  localStorage.setItem(capturedId, stringifyQuality);
  var storedId = localStorage.getItem(capturedId);
  var parsedId = JSON.parse(storedId);
  selectBubble.text = parsedId.quality
  debugger;
}