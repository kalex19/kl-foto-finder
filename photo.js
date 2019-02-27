class Photo {
  constructor(title, caption, upload, id, favorite) {
    this.title = title;
    this.caption = caption;
    this.upload = upload;
    this.id = id;
    this.favorite = favorite || false;
  }

  saveToStorage(array) {
    localStorage.setItem('photos', JSON.stringify(array));
  }

  updatePhoto(album, index) {
    album.splice(index, 1, this);
    this.saveToStorage(album);
  }

  updateInput(album,text,label) {
    if (label === 'title') {
      this.title = text;
    } else {
      this.caption = text;
    }
    this.saveToStorage(album);
  }


  favoritePhoto(album) {
    this.favorite = !this.favorite;
    this.saveToStorage(album);
  }

  deleteFromStorage(album) {
    album.splice(album.indexOf(this), 1);
    this.saveToStorage(album);
    
  }
}

