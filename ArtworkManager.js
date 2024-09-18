class ArtworkManager {
    saveArtwork(canvas, name) {
      const dataURL = canvas.toDataURL('image/png');
      localStorage.setItem(name, dataURL);
      console.log('Artwork saved!');
    }
  
    loadArtwork(canvas, ctx, name) {
      const dataURL = localStorage.getItem(name);
      if (dataURL) {
        const image = new Image();
        image.src = dataURL;
        image.onload = function () {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image, 0, 0);
          console.log('Artwork loaded!');
        };
      } else {
        console.log('No saved artwork found!');
      }
    }

    clearLS() {
      localStorage.clear();
    }
  }
    const artworkManager = new ArtworkManager();