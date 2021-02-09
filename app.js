const searchSongs = async() => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
 
    //load data
    // const res= await fetch(url)
    //     const data= await res.json();
    //     displaySongs(data.data)

    fetch(url)
    .then(res => res.json())
    .then(data => displaySongs(data.data))
    .catch(error => displayError('something went wrong! Try again later'));

}


const displaySongs = songs => {
    const SongContainer = document.getElementById('song-container');
    SongContainer.innerHTML=' ';
    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `  <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${song.artist.name}</span></p>
        <audio controls>
            <source src="${song.preview}" type="audio/mpeg">
        </audio>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick="getLyric('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
    </div>`;
        SongContainer.appendChild(songDiv);
    });
}


const getLyric = async (artist,title) =>{
    const url= `https://api.lyrics.ovh/v1/${artist}/${title}`;
    //load data
    try{
        const res= await fetch(url);
    const data= await res.json();
     displayLyric(data.lyrics);
    }
    catch{
        displayError('sorry! I failed to load lyrics, Please try again later!!!');
    }
   
}


// const getLyric = (artist,title) =>{
//     const url= `https://api.lyrics.ovh/v1/${artist}/${title}`;

//     try{
//         fetch(url)
//         .then(res => res.json())
//         .then(data => displayLyric(data.lyrics));
//     }
//     catch(error)
//     {
//         displayError("something went wrong!");
//     }
   
// }

const displayLyric = lyrics =>{
    const lyricsDiv = document.getElementById('song-lyrics');
    lyricsDiv.innerText = lyrics;
}


const displayError =error =>{
    const errorTag = document.getElementById("error");
    errorTag.innerText=error;
}