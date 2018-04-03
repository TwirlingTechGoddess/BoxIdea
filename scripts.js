var $inputTitle = $(".input-title");
var $inputBody = $(".input-body");
var $submitButton = $(".submit-button");
var $searchBar = $(".search-bar");
var $outputTitle = $(".output-title");
var $outputBody = $(".output-body");
var title = $outputTitle.val();
var body = $outputBody.val();

$inputTitle.keyup(toggleButton);
$inputBody.keyup(toggleButton);
$submitButton.on('click', createIdea);


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
// retrieveDataFromStorage(localStorage.key(newIdea[i])); 
}

retrieveDataFromStorage();

function retrieveDataFromStorage(idea) {
  for( var i = 0; i < localStorage.length; i++) {
  var storageContents = localStorage.getItem(localStorage.key(i));
  var parsedIdeas = JSON.parse(storageContents);
  var storedIdeas = new BoxIdea(parsedIdeas.title, parsedIdeas.body);
  prependCards(storedIdeas);
  }
}

// } 
// 5
