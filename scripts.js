
var $inputTitle = $(".input-title");
var $inputBody = $(".input-body");
var $submitButton = $(".submit-button");
var $searchBar = $(".search-bar");


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
  var $ideaCardList = $('.info-from-inputs');
  $ideaCardList.prepend(`
    <article id=${Date.now()}>
      <h2 class="output-title">${$inputTitle.val()}</h2>
        <button class="delete-button"></button>
        <br>
        <p class="output-body">${$inputBody.val()}</p>
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

