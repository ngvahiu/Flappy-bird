const setup = function(){
    currentScore = 0;
    flight = jump;

    // initial flyHeight
    flightHeight = (canvas.height / 2) - (birdSize.height / 2);

    //setup first tube
    tube = [canvas.width,tubeLoc()];
}

const render = function(){
    // make the pipe and bird moving 
    index++;

    // background first part 
    context.drawImage(bg,  -(index % canvas.width) + canvas.width, 0, canvas.width, canvas.height);
    // background second part
    context.drawImage(bg, -index % canvas.width, 0, canvas.width, canvas.height);

    //tube display
    tubesHandling();

    // score handling
    scoreHandling();

    //bird display
    birdHandling(index);

    if(!isPlaying)
        drawText();

    //update scores
    document.getElementById('bestScore').innerHTML = `Best score : ${bestScore}`;
    document.getElementById('currentScore').innerHTML = `Current score : ${currentScore}`;

    // tell the browser to perform anim
    window.requestAnimationFrame(render);
}

// tubes handling
const tubesHandling = function(){
    if(isPlaying){
        tube[0] -= speed;

        //draw top tube
        context.drawImage(topTube, tube[0], -(tubeHeight - tube[1]), tubeWidth, tubeHeight);
        //draw bottom tube
        context.drawImage(botTube, tube[0], tubeGap + tube[1], tubeWidth, tubeHeight);

        // reset tube when it is out of scope
        if(tube[0] <= -tubeWidth){
            //create a new tube
            tube = [canvas.width,tubeLoc()];
            pass = false;
        } 

        // check hit the bottom or tube, end
        dieHandling();
    }
}

const scoreHandling = function(){
    // score + 1 if passing a tube
    if( birdX > tube[0] + tubeWidth && 
        flyHeight >= tube[1] && 
        flyHeight + birdSize.height <= tube[1] + tubeGap){
            pointSound.play();

            if(!pass) currentScore++;
            pass = true;
            //compare current score with best score
            bestScore = Math.max(currentScore, bestScore);
    }  
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}
// die handling
const dieHandling = function(){
    if( flyHeight >= canvas.height || 
        (birdX + birdSize.width >= tube[0] && birdX <= tube[0] + tubeWidth && (flyHeight < tube[1] || flyHeight + birdSize.height > tube[1] + tubeGap))){
            isPlaying = false;
            hitSound.play();
            sleep(1000);
            dieSound.play();
            sleep(1000);
            setup();
    }
}

//bird handling
const birdHandling = function(index){
    switch(index % 3){
        case 0:
            bird.src = '../assets/bird-1.png';
            break;
        case 1:
            bird.src = '../assets/bird-2.png';
            break;
        case 2:
            bird.src = '../assets/bird-3.png';
            break;
    }

    if(isPlaying){
        context.drawImage(bird, birdX, flyHeight, birdSize.width, birdSize.height);
        flight += gravity;
        flyHeight += flight;
    }else{
        context.drawImage(bird, birdX, flyHeight, birdSize.width, birdSize.height);
        flyHeight = canvas.height / 2 - birdSize.height / 2;
    }
}

const drawText = function(){
    context.fillText('Click to play !', 95, 400);
    context.font = "bold 30px courier";
}

//start
setup();
render();

// user handling
document.addEventListener('click', () =>{
    if(!isPlaying) swooshSound.play();
    isPlaying = true;
});
window.onclick = () => {
    flight = jump;
    wingSound.play();
}