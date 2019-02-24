//QUERY SELECTORS
var album = JSON.parse(localStorage.getItem('photos')) || [];
var addToAlbumBtn = document.querySelector('.add-to-album-btn');
var photoGallery = document.querySelector('.image-card-container');
var imageTitle = document.querySelector('#title');
var titleContent = document.getElementsByClassName('card-title');
var imageCaption = document.querySelector('#caption');
var captionContent = document.querySelectorAll('.card-caption');
var favortiteBtn = document.querySelector('.fav-btn');
var favortiteBtnActive = document.querySelector('.active-fav-btn');
var reader = new FileReader();


//EVENT LISTENERS
addToAlbumBtn.addEventListener('click', createURL);
photoGallery.addEventListener('keypress', blurContent);
// favortiteBtn.addEventListener('click', favoriteButton);
// favortiteBtnActive.addEventListener('click', favoriteButton);

//FUNCTIONS()

window.onload = function() {
  loadImg(album);
  for(var i = 0; i < titleContent.length; i++) {
    titleContent[i].addEventListener('blur', saveCardChanges);
  }

  for(var i = 0; i < captionContent.length; i++) {
    captionContent[i].addEventListener('blur', saveCardChanges);
}
}

function loadImg(photos) {
  for (let i = 0; i < photos.length; i++) {
  var newPhoto = reinstantiatePhoto(photos, i);
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
   return new Photo(photos[i].title, photos[i].caption, photos[i].upload, photos[i].id);
}

function addImgToAlbum(e) {
  var newPhoto = new Photo(imageTitle.value, imageCaption.value, e.target.result, Date.now());
    album.push(newPhoto);
    createImageCard(newPhoto);
    newPhoto.saveToStorage(album);
}

function createImageCard(photo) {
  var imageContainer = document.querySelector('.image-card-container');
  var imageCard = 
  `<section class="image-card" data-id="${photo.id}">
    <textarea class="card-title" contenteditable>
      ${photo.title}
    </textarea>
    <img src="${photo.upload}" alt="Uploaded Image">
    <textarea class="card-caption" contenteditable>
      ${photo.caption}
    </textarea>
    <footer class=image-card-buttons>
    <button class='delete-btn'><img src="images/delete.svg" alt="Trash Can"></button>
    <button class='active-fav-btn'><img src="" alt="Heart"
    <button class='fav-btn'><img src="images/favorite.svg" alt="Heart"></button>
    </footer>
  </section>`
  imageContainer.insertAdjacentHTML('afterbegin',imageCard);
}

function appendPhotos() {
  album.forEach(function (photo) {
    createImageCard(photo);
  })
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
    if (e.target.classList.contains('card-title')) {
      photo.title = e.target.innerText;
    } else {
      photo.caption = e.target.innerText;
    }
    photo.updatePhoto(album);
  }
    
// function favoriteButton() {
//   var buttonActiveSwitch = document.classList('fav-btn');
//     if(buttonActiveSwitch){ element.classList.toggle('active-fav-btn')
//     }
//   var buttonDisabledSwitch = document.classList('active-fav-btn');
//      if(buttonActiveSwitch){ element.classList.toggle('fav-btn')
//     }
// }
