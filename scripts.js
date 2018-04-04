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
  var keysOmine = $(event.target).parent('article').attr("id");
  localStorage.removeItem(keysOmine); 
  $(event.target).parent('article').remove();
};


  // return $('article').attr("id");
  // console.log($('article').attr("id"));




