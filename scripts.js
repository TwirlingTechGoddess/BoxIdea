
var $inputTitle = $(".input-title");
var $inputBody = $(".input-body");
var $submitButton = $(".submit-button");
var $searchBar = $(".search-bar");
var $uniqueId = Date.now()


$inputTitle.keyup(toggleButton);
$inputBody.keyup(toggleButton);
$submitButton.on('click', addItemToList);


function toggleButton() {
  if ($inputTitle.val() === '' || $inputBody.val() === '') {
    $submitButton.prop( "disabled", true);
  } else {
    $submitButton.prop( "disabled", false);
  }
}

function addItemToList(event) {
  event.preventDefault();
  $uniqueId;
  var $ideaCardList = $('.info-from-inputs');
  $ideaCardList.prepend(`
    <article id=${$uniqueId}>
      <h2 class="output-title" contenteditable="true">${$inputTitle.val()}</h2>
        <button class="delete-button"></button>
        <br>
        <p class="output-body" contenteditable="true">${$inputBody.val()}</p>
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
  BoxIdea();
  clearInputs();
  toggleButton();
}

function clearInputs() {
  $inputTitle.val('');
  $inputBody.val('');
}

// function BoxIdea(title, body) {
//   this.title = title;
//   this.body = body;
//   this.quality = 'normal';
//   this.id = Date.now();
// }

// var $ideaBox = new function BoxIdea($inputTitle.val(), $inputBody.val() {
//   var $articleToStore = { id:$uniqueId, h2:$inputTitle.val(), p:$inputBody.val()};
//   var $stringifiedArticle = JSON.stringify($articleToStore);
//   localStorage.setItem('$articleToStore.$uniqueId', $stringifiedArticle);
// }
