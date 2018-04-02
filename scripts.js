
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
  this.quality = 'normal';
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
  console.log(newIdea.title);
  var $ideaCardList = $('.info-from-inputs');
  $ideaCardList.prepend(`
    <article>
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
  var $articleToStore = { 'id': newIdea.id, 'title': newIdea.title, 'body':newIdea.body};
  var $stringifiedArticle = JSON.stringify($articleToStore);
  localStorage.setItem('$articleToStore.$uniqueId', $stringifiedArticle);
}

// FOR LOOP & PARSE TOGETHER
// var puppies = [{name: "Fido", numLegs: 4}, {name: "Greg", numLegs: 5}]
// for( var i = 0; i < puppies.length; i++) {
//     puppies[0].numLegs
// }
// 4
// for( var i = 0; i < puppies.length; i++) {
//     puppies[1].numLegs
// } 
// 5
