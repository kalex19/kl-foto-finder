class Photo {
  constructor(title,caption, upload, id, favorite) {
    this.title = title
    this.caption = caption
    this.upload = upload;
    this.id = id;
    this.favorite = favorite || false;
  }

  saveToStorage(array) {
    localStorage.setItem('photos', JSON.stringify(array));
  }

  updatePhoto(album) {
    var index = album.indexOf(this)
    album.splice(index, 1, this);
    this.saveToStorage(album);
  }

  favoritePhoto() {
    if (this.favorite === true) {
      this.favorite = false;
    } else {
      this.favorite = true;
    }
    this.saveToStorage(album);
  }

   deleteFromStorage() {
    var index = album.indexOf(this)
    album.splice(index, 1);
    if (this === undefined) {
      album = [];
      localStorage.clear();
    } else {
      this.saveToStorage(album);
    }
}

}

