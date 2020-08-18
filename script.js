
    // fetch('https://api.lyrics.ovh/suggest/summer')
    // .then(res => res.json())
    // .then(data => {
    //     console.log(data);
    // })
   
    
const srcBtn = document.getElementById('src-btn')  ;
const srcInput = document.getElementById('src-input') ;
const srcResult = document.querySelector('.search-result') ;
const singleLyrics = document.querySelector('.single-lyrics');


// Search button event

srcBtn.addEventListener('click', clickEvent);
srcInput.addEventListener('keypress', setQuery);


function clickEvent(){
    getResult(srcInput.value) ;
    // console.log(srcInput.value);
}

function setQuery(evt) {
    if (evt.keyCode === 13){
        getResult(srcInput.value);
        // console.log(srcInput.value);
    }
}


// Get Results from API

function getResult() {
    const songTitle = srcInput.value;
    const api = `https://api.lyrics.ovh/suggest/${songTitle}`;

    fetch(api)
    .then(res => res.json())
    .then(data => {
        const apiData = data.data;
        const songData = apiData.map((item) => item).slice(0, 10);
        // console.log(songData);

        if (!songData.length){
            srcResult.innerHTML = `<h3 class="text-center">Sorry! no songs found.</h3>`;
        } else {
            srcResult.innerHTML = "";
            songData.map((item) => {
                srcResult.innerHTML += `
                
                <div class="single-result row align-items-center my-3 p-3">
                    <div class="col-md-9">
                        <h3 class="lyrics-name">${item.title}</h3>
                        <p class="author lead">${item.album.title} By <span>${item.artist.name}</span></p>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button class="btn btn-success" onclick="getLyrics('${item.artist.name}', '${item.title}')">Get Lyrics</button>
                    </div>
                </div> 
                   
                `;
                
            })
        }
    });
}


// Get Lyrics from API

function getLyrics(artist, title){
    const api = `https://api.lyrics.ovh/v1/${artist}/${title}`

    fetch(api)
    .then(res => res.json())
    .then(data => {
        const lyrics = data.lyrics;
        // console.log(data);
        singleLyrics.innerHTML = `
        
        <button class="btn go-back" onclick="goBack()">Go Back</button>
        <h2 class="text-success mb-4">${artist} - ${title}</h2>
        <pre class="lyric text-white">${!lyrics ? `<h3>No lyrics Found</h3> `: lyrics }</pre>
        `;

        srcResult.style.display = 'none';

    });
    
}

                

function goBack() {
    // singleLyrics.style.display = 'none';
    singleLyrics.innerHTML = '';
    srcResult.style.display = 'block';
}



    

    
