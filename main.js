//QUERY SELECTORS
var album = JSON.parse(localStorage.getItem('photos')) || [];
var addToAlbumBtn = document.querySelector('.add-to-album-btn');
var photoGallery = document.querySelector('.image-card-container');
var imageTitle = document.querySelector('#title');
var titleContent = document.getElementsByClassName('card-title');
var imageCaption = document.querySelector('#caption');
var captionContent = document.querySelectorAll('.card-caption');
var favoriteBtn = document.querySelector('view-favorities-btn');
var reader = new FileReader();


//EVENT LISTENERS
addToAlbumBtn.addEventListener('click', createURL);
photoGallery.addEventListener('keypress', blurContent);
photoGallery.addEventListener('focusout', updateText);
// photoGallery.addEventListener('mouseover', editDeleteButton);
// photoGallery.addEventListener('mouseout', editDeleteButtonActive);
photoGallery.addEventListener('click', cardClick);
// favoriteBtn.addEventListener('click', favoriteButtonFilter);



//FUNCTIONS()

window.onload = function() {
  loadImg(album);
  updateFavoritesButton(); 
  for(var i = 0; i < titleContent.length; i++) {
    titleContent[i].addEventListener('blur', saveCardChanges);
  }

  for(var i = 0; i < captionContent.length; i++) {
    captionContent[i].addEventListener('blur', saveCardChanges);
}
}

function loadImg(photos) {
  album = [];
  for (let i = 0; i < photos.length; i++) {
    var newPhoto = reinstantiatePhoto(photos, i);
    album.push(newPhoto);
    createImageCard(newPhoto);
  }
}

function createURL(album) {
  var imgInput = document.querySelector('.choose-file-input');
  if (imgInput.files[0]) {
    reader.readAsDataURL(imgInput.files[0]); 
    reader.onload = addImgToAlbum
  } 
}

function reinstantiatePhoto(photos, i) {
   return new Photo(photos[i].title, photos[i].caption, photos[i].upload, photos[i].id, photos[i].favorite);
}

function addImgToAlbum(e) {
  var newPhoto = new Photo(imageTitle.value, imageCaption.value, e.target.result, Date.now());
    album.push(newPhoto);
    createImageCard(newPhoto);
    newPhoto.saveToStorage(album);
}

function createImageCard(photo) {
  var favClass = photo.favorite ? 'favorite-btn-active' : 'favorite-btn';
  var imageContainer = document.querySelector('.image-card-container');
  var imageCard = 
  `<section class="image-card" data-id="${photo.id}">
    <textarea class="card-title" contenteditable type="text">
      ${photo.title}
    </textarea>
    <img src="${photo.upload}" alt="Uploaded Image">
    <textarea class="card-caption" contenteditable type="text">
      ${photo.caption}
    </textarea>
    <footer class="image-card-buttons">
    <div class="delete-btn-icon delete-btn"></div>
    <div class="favorite-btn-icon favorite-btn ${favClass}"></div>
    </footer>
  </section>`
  imageContainer.insertAdjacentHTML('afterbegin',imageCard);
}

function appendPhotos() {
  album.forEach(function (photo) {
    createImageCard(photo);
  })
  clearFields();
}

function clearFields() {
  imageTitle.value = '';
  imageCaption.value = '';
}

function blurContent(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    e.target.blur(); 
  }
}

function getPhotoIndex(e) {
    var parent = e.target.closest('.image-card')
    var photoId = parseInt(parent.getAttribute('data-id'));
    var index = album.findIndex(function(photo){
      return photoId === photo.id;
    });
      return index;
}

function saveCardChanges(e) {
    var index = getPhotoIndex(e);
    var photo = reinstantiatePhoto(album, index);
    photo.updatePhoto(album, index);
  }

function editDeleteButton(e) {
  if (e.target.classList.contains('delete-btn-container')) {
    e.target.classList.add('delete-btn-active');
    e.target.classList.remove('delete-btn'); 
   } 
}

function editDeleteButtonActive(e) {
  if (e.target.classList.contains('delete-btn-container')) {
    e.target.classList.remove('delete-btn-active');
    e.target.classList.add('delete-btn'); 
   } 
}

//used for many functions
function cardClick(e) {
  var currentCard = e.target.closest('.image-card');
  var cardId = parseInt(currentCard.dataset.id);
  if (e.target.classList.contains('delete-btn-icon')) {
    removeCard(currentCard, cardId);
  } else if (e.target.classList.contains('favorite-btn-icon')) {
    addFavorite(currentCard, cardId, e);
  } 
}

  function updateText(e) {
    var currentCard = e.target.closest('.image-card');
    var cardId = parseInt(currentCard.dataset.id);
    if (e.target.classList.contains('card-title')) {
      updateInput(currentCard, cardId, e, 'title');
  } else { 
      updateInput(currentCard, cardId, e, 'caption');
  }
  }

  function updateInput(currentCard, cardId, e, label) {
    var targetPhoto = findCard(currentCard, cardId);
    targetPhoto.updateInput(album, e.target.value, label);

  }


function findCard(currentCard, cardId) {
    return album.find(function(photo) {
    return cardId === photo.id
  });
}

function removeCard(currentCard, cardId) {
    currentCard.remove();
    var targetPhoto = findCard(currentCard, cardId);
    targetPhoto.deleteFromStorage(album); 
}

// function updateText(currentCard, cardTarget) {
//   console.log(album);
//   var targetPhoto = findCard(currentCard);
//   targetPhoto.blurContent();
//   targetPhoto.saveCardChanges();
// }


function addFavorite(currentCard, cardId, e) {
  var targetPhoto = findCard(currentCard, cardId);
  targetPhoto.favoritePhoto(album);
  updateFavoritesButton(); 
  updateFavoritesClass(e);
}

function viewFavorites() {
  return album.filter(function(photo){
    return photo.favorite === true;
  });
}

function updateFavoritesButton() {
  var update = document.getElementById('number');
  update.innerText = viewFavorites().length;
}

  function updateFavoritesClass(e) {
        e.target.classList.toggle('favorite-btn-active');
}


//if button favorite = true
//filter results 

// function favoriteButtonFilter() {
//   var trueCount = album.filter(function(photo){
//         return photo.favorite === true;
//   if (photo.favorite === true;) {

//  } else {

//  }
// }

// function searchCards(e) {
//   var currentSearch = e.target.value;
//   var regex = new RegExp(currentSearch, 'i');
//   var cardMatches = [];
//   removeCards();
//   for (let i = 0; i < photos.length; i++) {
//     if (regex.test(photos[i].title) || regex.test(photos[i].caption)) {
//       catdMatches.push(photos[i]);
//       createImageCard(photos[i]);
//     }
//   }
// }
 







