//Hacker Mode
//Static_Variables
var current_rotation_ricochetA=0;
var current_rotation_semiricochetA=0;
var current_rotation_ricochetB=0;
var current_rotation_semiricochetB=0;
var controller;
var toggle_turn='A';
var second_click=false;
var is_game_paused=false;
var game_state;
var pause_3_cp='nothing';
var initial_id_play;
var arr_id_play;
var destroy=false;
var flag;
var mark;
var game_over=false;

var all_moves=[];
var move_or_rotate_array=[];
var history_of_moves=[];
var redo_if_needed=[];
var removed_element=[];

var body=document.querySelector("body");
var container=document.querySelector(".container");
var block=document.querySelectorAll(".block");

//1.1Setup outer box
function setupOuterFrameCB(){
    var newDiv=document.createElement("div");
    newDiv.style.position='relative';
    newDiv.style.border="3px solid #AF8F6F";
    var parent=document.querySelector("body");
    parent.appendChild(newDiv);
    newDiv.className='container';
    newDiv.style.backgroundColor='#AF8F6F';
   
}

//1.2Set up 64 boxes as (8x8)
function  setupInnerBlocks(){
    for(var i=7;i>=0;i--)
        {
            for(var j=0;j<=7;j++)
                {
                    var newDiv=document.createElement("div");
                    newDiv.className='r'+i.toString()+' c'+j.toString()+' block';
                    newDiv.setAttribute('id',(i).toString()+(j).toString());
                    document.querySelector(".container").appendChild(newDiv);
                    newDiv.style.width='70px';
                    newDiv.style.height='70px';
                    // newDiv.style.opacity='0.5';
                    newDiv.style.backgroundColor='black';
                }
        }
    var body=document.querySelector("body");
    var container=document.querySelector(".container");
    var block=document.querySelectorAll(".block");
    body.style.display='flex';
    body.style.justifyContent="center";
    container.style.display="grid";
    container.style.grid="repeat(8,70px) / repeat(8,70px)";
    container.style.columnGap="5px";
    container.style.rowGap="5px";
    console.log("done");
    const  audioElement=document.createElement('audio');
    audioElement.src='/resources/audio/Game_theme_song.mp3';
    // document.querySelector('audio').display='none';
    body.appendChild(audioElement);
    //deeppink
}

function clearBoard(){
    var block=document.querySelectorAll(".block");
    for (var i=0;i<64;i++)
        {
            block[i].innerHTML='';block[i].className=block[i].className.slice(0,11);
        }
}

//1.3Setup pieces in position
function setupPieces(){
    var block=document.querySelectorAll(".block");
    block[4].innerHTML="<img id='TitanA' src='/resources/images/pieces/TitanA.png' alt='TitanA'></img>";
    block[4].className=block[4].className+" A Titan";
    block[3].innerHTML="<img id='CannonA' src='/resources/images/pieces/CannonA.png' alt='CannonA'></img><div id='b73' class='r7 c3 down ballA'><img id='bulletA' src='/resources/images/pieces/bullet_down.svg'</div>";
    block[3].className=block[3].className+" A Cannon";
    block[12].innerHTML="<img id='TankA' src='/resources/images/pieces/TankA.png' alt='TankA'></img>";
    block[12].className=block[12].className+" A Tank";
    block[18].innerHTML="<img id='RicochetA' src='/resources/images/pieces/RicochetA.png' alt='RicochetA'></img>";
    block[18].className=block[18].className+" A Ricochet NE";
    block[21].innerHTML="<img id='Semi-RicochetA' src='/resources/images/pieces/Semi-RicochetA.png' alt='Semi-RicochetA'></img>";
    block[21].className=block[21].className+" A Semi-Ricochet NE";
    block[60].innerHTML="<img id='CannonB' src='/resources/images/pieces/CannonB.png' alt='CannonB'></img><div id='b04' class='r0 c4 up ballB'><img id='bulletB' src='/resources/images/pieces/bullet_down.svg'></div>";
    block[60].className=block[60].className+" B Cannon";
    block[59].innerHTML="<img id='TitanB' src='/resources/images/pieces/TitanB.png' alt='TitanB'></img>";
    block[59].className=block[59].className+" B Titan";
    block[51].innerHTML="<img id='TankB' src='/resources/images/pieces/TankB.png' alt='TankB'></img>";
    block[51].className=block[51].className+" B Tank";
    block[45].innerHTML="<img id='RicochetB' src='/resources/images/pieces/RicochetB.png' alt='RicochetB'></img>";
    block[45].className=block[45].className+" B Ricochet NE";
    block[42].innerHTML="<img id='Semi-RicochetB' src='/resources/images/pieces/Semi-RicochetB.png' alt='Semi-RicochetB'></img>";
    block[42].className=block[42].className+" B Semi-Ricochet NE";
   
    document.getElementById('moves_played').style.visibility='visible';
    var image=document.querySelectorAll("img");
    for  (var i=0;i<image.length;i++)
        {
            image[i].style.height='70px';
            image[i].style.width='70px';
             
        }
    document.getElementById("CannonA").style.zIndex='2';
    document.getElementById("CannonB").style.zIndex='2';    
    document.getElementById("CannonA").style.position='absolute';
    document.getElementById("CannonB").style.position='absolute';
    document.querySelector(".ballB").style.cssText="width:10px;height:10px;background-color:blue;border-radius:50%;position:absolute;left:330px;top:555px;z-index:1;";
    document.querySelector(".ballA").style.cssText="width:10px;height:10px;background-color:blue;border-radius:50%;position:absolute;left:255px;top:30px;z-index:1;";
    document.getElementById('bulletA').style.cssText='height:33.33px;width:10px;position:absolute;top:10px;left:-10px;';
    document.getElementById('bulletB').style.cssText='height:33.333px;width:10px;position:absolute;top:-33.33px;left:0px;';
    // document.getElementById('rotate').style.cssText='';
    // document.getElementById('rr').style.cssText='';
    // document.getElementById('rl').style.cssText='';
    var container=document.querySelector(".container");
    container.style.position='relative';
    container.style.left='-250px';
    container.style.top='40px';
    document.body.style.backgroundColor='#F8F4E1';
    //background-image: linear-gradient(144deg,#FE1F4E, #D1FE49 50%,#FBB23F);
}

function initialsetup()
    {
    setupOuterFrameCB();
    setupInnerBlocks();
    setupPieces();
    }
initialsetup();

function defaultBlockColor(){
    for(var i=0;i<64;i++)
        {
            document.querySelectorAll(".block")[i].style.backgroundColor="black";
        }  
}
//****************************************************************************************************************************** */
//0.)Timer
function setUpTimer(AorB){
    var timer=document.createElement('p');
    document.body.appendChild(timer);
    timer.id='timer'+AorB;
    timer.style.cssText='position:relative;width:100px;height:70px;padding:0px;margin:0px;background-color:#FFD0D0;border:1px solid black;top:40px';
    if (AorB=='A'){timer.style.left='-1000px';}
    else{timer.style.left='-280px';}
    timer.innerHTML='05:00';
    timer.style.fontSize='40px';
    timer.style.display='flex';
    timer.style.justifyContent='center';
    timer.style.paddingTop='10px';  
}

var timeA=300;
var timeB=300;
var timerIdA;
var timerIdB;
function timerOn(AorB){
    if (AorB=='A')
        {timer=document.getElementById('timerA');}
    else{timer=document.getElementById('timerB');}
    timer.innerHTML='05:00';
    timer.style.visibility='visible';
    if (AorB=='A')
        {timerIdA=setInterval(RunA,1000);}
    else{timerIdB=setInterval(RunB,1000);}
    
}
function RunA(){
    if (second_click) return;
    timer=document.getElementById('timerA');   
    minutes=Math.floor(timeA/60);
    if(timeA<0){
        clearInterval(timerIdA);
        alert("End game B-wins");
    }
    if (timeA>=0){
        seconds=(timeA%60).toString();
        if (seconds.length==1){
        seconds='0'+seconds;
        }
        timer.innerHTML='0'+minutes.toString()+':'+seconds;
        }
    
    timeA=timeA-1;
}
function RunB(){
    if (second_click) return;
    timer=document.getElementById('timerB');   
    minutes=Math.floor(timeB/60);
    if(timeB<0){
        clearInterval(timerIdB);
        alert("End game A-wins");
    }
    if (timeB>=0){
        seconds=(timeB%60).toString();
        if (seconds.length==1){
        seconds='0'+seconds;
        }
        timer.innerHTML='0'+minutes.toString()+':'+seconds;
        }
    timeB=timeB-1;
    
}
function pause_timer(){
    if (second_click){
        if(toggle_turn=='A'){clearInterval(timerIdA);}
        else{clearInterval(timerIdB);}
    }
}
setUpTimer('A');
setUpTimer('B');

//********************************************************************************************************** */
function store_moves_to_local_storage(array) {
    const movesJSON = JSON.stringify(array);
    localStorage.setItem('gameMoves', movesJSON);
}
function get_moves_from_local_storage() {
    const movesJSON = localStorage.getItem('gameMoves');
    const movesArray = movesJSON ? JSON.parse(movesJSON) : [];
    return movesArray;
}

function end_of_game(){
    store_moves_to_local_storage(history_of_moves);
    var div=document.getElementById('game_over');
    div.style.visibility='visible';
    document.querySelector('.winner').innerHTML=toggle_turn+' is the Winner';
    document.querySelector('.winner').style.cssText='position:relative;font-size: 25px;top: 320px;left: 120px;font-family:Franklin Gothic Medium, Arial Narrow, Arial, sans-serif;color:darkred;';
    document.getElementById('playAgain').addEventListener('click',resetGamePlay);
    document.getElementById('replay').addEventListener('click',replayGame);
}
//********************************************************************************************************** */

//Pause play button
function setUpPausePlayResetUndoRedo(){
    document.getElementById('pause').addEventListener('click',pauseGamePlay);
    document.getElementById('undo').addEventListener('click',Undo_turn);
    document.getElementById('redo').addEventListener('click',Redo_turn);
}   

setUpPausePlayResetUndoRedo();

async function replayGame(){
    var div=document.getElementById('game_over');
    div.style.visibility='hidden';
    var array=get_moves_from_local_storage();
    console.log(array);
    await delay(100);
    resetGamePlay();
    document.getElementById('playAgain').removeEventListener('click',resetGamePlay);
    document.getElementById('replay').removeEventListener('click',replayGame);
    document.getElementById('timerB').style.visibility='hidden';
    document.getElementById('moves_played').style.visibility='hidden';
    document.getElementById('undo').style.visibility='hidden';
    document.getElementById('redo').style.visibility='hidden';
    document.getElementById('pause').style.visibility='hidden';
    await delay(1000);
    document.getElementById('timerA').style.visibility='hidden';
    var i=0;
    timerid=setInterval(async function(){
        console.log(i); 
        // document.querySelector('.'+toggle_turn+'.'+array[i][0]).style.visibility='hidden';
        // await delay(2000);
        document.querySelector('.'+toggle_turn+'.'+array[i][0]).click();
        await delay(200);
        console.log(array[i]);
        if (array[i][1]=='rotate' || array[i][1]=='rl'|| array[i][1]=='rr')
            {   if (array[i][1]=='rotate')
                {document.getElementById('rotate').click();}
                else if (array[i][1]=='rr')
                {document.getElementById('rr').click();} 
                else{document.getElementById('rl').click();}
            }
        else{
            if((typeof array[i][1])=='string')
                {   
                    document.getElementById(array[i][2]).click();}
            else
                {document.getElementById(array[i][1][1]).click();}
        }
        i++;
        if (i>=array.length){console.log('Exit');clearInterval(timerid)}
    },5000);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function Redo_turn(){
    if (redo_if_needed.length==0){return;}
    if (game_state!=1){return;}
    clearInterval(timerIdA);
    clearInterval(timerIdB); 
    document.querySelectorAll("."+toggle_turn).forEach(item =>{item.removeEventListener("click",pinky);});
    document.getElementById('redo').removeEventListener('click',Redo_turn);
    var k=(toggle_turn=='A')?'B':'A';
    var last_move=redo_if_needed.pop();
    if (last_move[1]=='rotate' || (last_move[1]=='rr')||(last_move[1]=='rl'))
        {
            if (last_move[1]=='rotate')
                {rotate(document.querySelector('.'+k+'.Ricochet').id)}
            else if (last_move[1]=='rr'){rotateright(document.querySelector('.'+k+'.Semi-Ricochet').id)}
            else if (last_move[1]=='rl'){rotateleft(document.querySelector('.'+k+'.Semi-Ricochet').id)}
        }
        else{
            if( (typeof last_move[1])=='string'){
                console.log(last_move);
            {blackey(last_move[1],last_move[2])}
            }
            else{
                blocks=document.querySelectorAll('.block');
                for(var i=0;i<64;i++)
                    {
                        if (blocks[i].innerHTML==''){
                            blackey((last_move[1])[0],blocks[i].id);
                            blackey((last_move[1])[1],(last_move[1])[0]);
                            blackey(blocks[i].id,(last_move[1])[1]);break;
                        }
                    }
            }
        }
        if (last_move[4]!=''){
            document.getElementById((last_move[4])[0]).innerHTML='';
            document.getElementById((last_move[4])[0]).className=document.getElementById((last_move[4])[0]).className.slice(0,11);
        }

        toggle_turn=k;
        if (toggle_turn=='A'){timerIdA=setInterval(RunA,1000); }
        else{timerIdB=setInterval(RunB,1000);}
        highlightBoxes();
        all_moves.push(last_move);
        history_of_moves.push(last_move);  
        document.getElementById('redo').addEventListener('click',Redo_turn); 
        history_update(); 
}   

function Undo_turn(){
    if (history_of_moves.length==0){return};
    if (game_state!=1){return;}
    clearInterval(timerIdA);
    clearInterval(timerIdB); 
    document.querySelectorAll("."+toggle_turn).forEach(item =>{item.removeEventListener("click",pinky);});
    
    document.getElementById('undo').removeEventListener('click',Undo_turn);
    var k=(toggle_turn=='A')?'B':'A';
    var last_move=history_of_moves.pop();
    if (last_move[1]=='rotate' || (last_move[1]=='rr')||(last_move[1]=='rl'))
    {
        if (last_move[1]=='rotate')
            {rotate(document.querySelector('.'+k+'.Ricochet').id)}
        else if (last_move[1]=='rr'){rotateleft(document.querySelector('.'+k+'.Semi-Ricochet').id)}
        else if (last_move[1]=='rl'){rotateright(document.querySelector('.'+k+'.Semi-Ricochet').id)}
    }
    else{
        if(typeof last_move[1]=='string'){
            blackey(last_move[2],last_move[1]);
        }
        else{
            blocks=document.querySelectorAll('.block');
            for(var i=0;i<64;i++)
                {
                    if (blocks[i].innerHTML==''){
                            blackey((last_move[1])[0],blocks[i].id);
                            blackey((last_move[1])[1],(last_move[1])[0]);
                            blackey(blocks[i].id,(last_move[1])[1]);break;
                                            }
                }
                move_or_rotate_array[0]='Ricochet';
                move_or_rotate_array[1]=[last_move[1][1],last_move[1][0]];
                move_or_rotate_array[2]=document.getElementById(last_move[1][1]).classList[4];
            }
        }
    //Bringing the destroyed semiricochet back in case*
    if (last_move[4]!=''){
        document.getElementById((last_move[4])[0]).innerHTML=last_move[3];
        document.getElementById((last_move[4])[0]).classList.add((last_move[4])[1]);
        document.getElementById((last_move[4])[0]).classList.add((last_move[4])[2]);
        document.getElementById((last_move[4])[0]).classList.add((last_move[4])[3]);
        move_or_rotate_array.push('*'+last_move[3]);
        move_or_rotate_array.push(last_move[4]);
    }
    else{
        move_or_rotate_array.push('');
        move_or_rotate_array.push('');
    }
    all_moves=all_moves.concat(move_or_rotate_array);
    toggle_turn=k;
    if (toggle_turn=='A'){timerIdA=setInterval(RunA,1000); }
    else{timerIdB=setInterval(RunB,1000);}
    highlightBoxes();
    redo_if_needed.push(last_move);
    console.log('redo moves array elements');
    console.log(redo_if_needed);
    document.getElementById('undo').addEventListener('click',Undo_turn);
    history_update();
}

function resetGamePlay(){
    document.getElementById('playAgain').removeEventListener('click',resetGamePlay);
    document.getElementById('game_over').style.visibility='hidden';
    document.getElementById('reset').removeEventListener('click',resetGamePlay);
    document.getElementById('play').removeEventListener('click',resetGamePlay);
    document.getElementById('timerB').style.visibility='hidden';
    document.getElementById('moves_played').style.visibility='hidden';
    document.getElementById('undo').style.visibility='hidden';
    document.getElementById('redo').style.visibility='hidden';
    document.getElementById('pause').style.visibility='hidden';
    document.getElementById('timerA').style.visibility='hidden';
    history_of_moves.splice(0);
    redo_if_needed.splice(0);
    is_game_paused=true;
    var audioElement=document.querySelector('audio');
    audioElement.pause();
    audioElement.currentTime=0;
    audioElement.play();
    clearInterval(timerIdA);
    clearInterval(timerIdB);  
    if (game_state==1)
     {
         document.querySelectorAll(".A").forEach(item =>{item.removeEventListener("click",pinky);});
         document.querySelectorAll(".B").forEach(item =>{item.removeEventListener("click",pinky);});
     }
     else if (game_state==2){
         mark=2;controller.abort();
     }
   toggle_turn='A';
   for(var i=0;i<64;i++)
    {
        document.querySelectorAll(".block")[i].style.backgroundColor="black";
    }
   current_rotation_ricochetA=0;
   current_rotation_semiricochetA=0;
   current_rotation_ricochetB=0;
   current_rotation_semiricochetB=0;
   game_over=false;
   timeA=300;
   timeB=300;
   timer=document.getElementById('timerB');
   timer.innerHTML='05:00';
   timer=document.getElementById('timerA');
   timer.innerHTML='05:00';
   
   setTimeout(()=>{clearBoard();
    setupPieces();
    clearInterval(timerIdA);
    clearInterval(timerIdB);
    highlightBoxes();
   is_game_paused=false;
   timerOn('A');
   document.getElementById('game_pause').style.visibility='hidden';},1000);

}
function pauseGamePlay(){
   is_game_paused=true;
   second_click=true;
   var audioElement=document.querySelector('audio');
   audioElement.pause();
   clearInterval(timerIdA);
   clearInterval(timerIdB);
   second_click=false;  
   document.getElementById('game_pause').style.visibility='visible';
   if (game_state==1)
    {
        document.querySelectorAll(".A").forEach(item =>{item.removeEventListener("click",pinky);});
        document.querySelectorAll(".B").forEach(item =>{item.removeEventListener("click",pinky);});
    }
    else if (game_state==2){
        mark=2;controller.abort();
    }
    document.getElementById('play').addEventListener('click',playGamePlay);
    document.getElementById('reset').addEventListener('click',resetGamePlay);
}

async function playGamePlay(){
    is_game_paused=false;
    document.getElementById('play').removeEventListener('click',playGamePlay);
    document.getElementById('reset').removeEventListener('click',playGamePlay);
    document.getElementById('game_pause').style.visibility='hidden';
    var audioElement=document.querySelector('audio');
   audioElement.play();
    if (game_state==1||game_state==2){
        if (toggle_turn=='A'){timerIdA=setInterval(RunA,1000); }
        else{timerIdB=setInterval(RunB,1000);}

        if (game_state==1){highlightBoxes();}
        else if (game_state==2){mark=2;movements(arr_id_play,initial_id_play);
        }
    }
    else if (game_state==3){flag=2;await one_move_over();}
}
    
//******************************************************************************************************************/
function history_update()
{   document.getElementById('history').innerHTML='';
    for(i=0;i<history_of_moves.length;i++)
    {   
            document.getElementById('history').innerHTML+=((i%2==0)?'A:':'B:');
        if ((history_of_moves[i])[1]=='rotate'||(history_of_moves[i])[1]=='rl'||(history_of_moves[i])[1]=='rr')
            {   
                if ((history_of_moves[i])[1]=='rotate')
                    {document.getElementById('history').innerHTML+=history_of_moves[i][0]+' rotated<br>>';}
                else if((history_of_moves[i])[1]=='rl')
                    {document.getElementById('history').innerHTML+=history_of_moves[i][0]+' rotated left<br>';}
                else
                    {document.getElementById('history').innerHTML+=history_of_moves[i][0]+' rotated right<br>';}
            }
        else if(typeof (history_of_moves[i])[1]=='string')
            {
                document.getElementById('history').innerHTML+=history_of_moves[i][0]+' moved from '+String.fromCharCode(97+parseInt(history_of_moves[i][1][0]))+history_of_moves[i][1][1]+' to '+String.fromCharCode(97+parseInt(history_of_moves[i][2][0]))+history_of_moves[i][2][1]+'<br>';
            }
        else 
            {
                document.getElementById('history').innerHTML+=history_of_moves[i][0]+' swapped with '+history_of_moves[i][2]+' of '+document.getElementById((history_of_moves[i][1][0])).classList[3]+'<br>';
            }   
        if (history_of_moves[i][3]!='')
        {
            document.getElementById('history').innerHTML+='Semi-Ricochet of'+history_of_moves[i][4][1]+'is destroyed <br>';
        }
    }
}

//******************************************************************************************* */
//3.1Highlight
function move_buttonA(){
    var ba=document.querySelector(".ballA");
    var id=document.querySelector('.A.Cannon').id;
    var columnNumber = parseInt(id[1]); 
    ba.style.left=(columnNumber*75+30)+'px';
    ba.style.top='30px';
    
}
function move_buttonB(){
    var bb=document.querySelector(".ballB");
    var id=document.querySelector('.B.Cannon').id;
    var columnNumber = parseInt(id[1]); 
    bb.style.top='555px';
    bb.style.left=(columnNumber*75+30)+'px';
}

function highlightBoxes(){
    game_state=1;
        if (toggle_turn=='A'){
            document.querySelectorAll(".A").forEach(item =>{item.addEventListener("click",pinky)});
        }
        else{
            document.querySelectorAll(".B").forEach(item =>{item.addEventListener("click",pinky)}); 
        }      
}

function pinky()
{       redo_if_needed.splice(0);
        array_swap_ids=[];
        game_state=2;
        var id1=this.id;
        document.querySelectorAll(".A").forEach(item =>{item.removeEventListener("click",pinky);});
        document.querySelectorAll(".B").forEach(item =>{item.removeEventListener("click",pinky);});
        var arrOfHighlighted=[];
        if (this.classList[4]=="Cannon")
        {
            for(var i=-1;i<=1;i=i+2){
                var id2=id1[0]+(parseInt(id1[1])+i).toString();
                try{
                    var newDiv=document.getElementById(id2);
                    if (id2!=id1)
                        {   
                            if (newDiv.innerHTML==="")
                            {
                               newDiv.style.backgroundColor="#A1DD70";
                               arrOfHighlighted.push(id2);
                            }
                        }
                }
                catch(err){
                    continue;
                }
            }
        }
        else
        {
            for(var i=parseInt(id1[0])-1;(i<parseInt(id1[0])+2);i++)
              {
                  for(j=parseInt(id1[1])-1;(j<parseInt(id1[1])+2);j++)
                    {       try
                            {
                                var id2=i.toString()+j.toString();
                                var newDiv=document.getElementById(id2);
                                
                               
                                if (id2!=id1)
                                {   
                                    if (newDiv.innerHTML==="")
                                    {
                                       newDiv.style.backgroundColor="#A1DD70";
                                       arrOfHighlighted.push(id2);
                                    }
                                }
                            }
                            catch(err){
                                continue;
                            }
                    }
            }
            if (this.classList[4]=="Ricochet" || this.classList[4]=="Semi-Ricochet")
                {   if (this.classList[4]=="Semi-Ricochet")
                    {
                        document.getElementById("rr").style.visibility="visible";
                        document.getElementById("rl").style.visibility="visible";
                    }
                    else
                    {
                        document.getElementById("rotate").style.visibility="visible";
                        var arr1=document.querySelectorAll('.A');
                        var arr2=document.querySelectorAll('.B');
                        var row_no=this.className[1];
                        for (var i=0;i<arr1.length;i++)
                            {   if ((arr1[i].classList[4]=='Cannon') && (row_no!=arr1[i].className[1])){continue;}
                                else if ((arr1[i].classList[4]!='Ricochet')&& (arr1[i].classList[4]!='Titan'))
                                {   
                                    arr1[i].style.backgroundColor='#3AA6B9';
                                    array_swap_ids.push(arr1[i].id);
                                }
                            }
                         for (var i=0;i<arr2.length;i++)
                            {   if ((arr2[i].classList[4]=='Cannon') && (row_no!=arr2[i].className[1])){continue;}
                                if ((arr2[i].classList[4]!='Ricochet')&& (arr2[i].classList[4]!='Titan'))
                                {       
                                        arr2[i].style.backgroundColor='#3AA6B9';
                                        array_swap_ids.push(arr2[i].id);
                                }
                            }
                    }
                }
        }
        arr_id_play=arrOfHighlighted;
        initial_id_play=id1;
        //make movements
        mark=1;
        movements(arrOfHighlighted,id1,array_swap_ids);
 
}
async function move_bullet_with_promise(toggle_turn, id) {
    return new Promise((resolve) => {
        setTimeout(async () => {
            const  audioElement=document.createElement('audio');
            await move_bullet(toggle_turn, id);
            resolve();
        }, 200);
    });
}
async function one_move_over(arrOfHighlighted,array_swap_ids) {
    second_click = false;
    try {
        for(var j=0;j<arrOfHighlighted.length;j++)
            {               
              document.getElementById(arrOfHighlighted[j]).style.backgroundColor="black";         
            }
        for(var j=0;j<array_swap_ids.length;j++)
            {
                document.getElementById(array_swap_ids[j]).style.backgroundColor="black";
            }
            const  audioElement=document.createElement('audio');
            audioElement.src='/resources/audio/Bullet_fire.mp3';
            // audioElement.controls=true;
            body.appendChild(audioElement);
            audioElement.play();
            
            
        if (toggle_turn == 'A') {
            var ba=document.querySelector(".ballA");
            ba.style.visibility='visible';
            var newDiv = document.querySelector(".A.Cannon");
            move_buttonA();
            if (flag==1)
            {   
                await move_bullet_with_promise('A', newDiv.id);}
            else if (flag==2)
            {await move_bullet_with_promise('A',pause_3_cp);}
            
        } else {
            var bb=document.querySelector(".ballB");
            bb.style.visibility='visible';
            var newDiv = document.querySelector(".B.Cannon");
            move_buttonB();
            if (flag==1)
                {await move_bullet_with_promise('B', newDiv.id);}
            else if (flag==2)
                {await move_bullet_with_promise('B',pause_3_cp);}
        }

        if (!is_game_paused) {
            move_or_rotate_array=move_or_rotate_array.concat(removed_element);
            all_moves.push(move_or_rotate_array);
            history_of_moves.push(move_or_rotate_array);
            history_update();
            if (!game_over)
                {
                    if (toggle_turn == 'A') 
                        { toggle_turn = 'B'} 
                    else {toggle_turn = 'A'}
                    highlightBoxes();
                }
            else{
                clearInterval(timerIdA);
                clearInterval(timerIdB);
                end_of_game();
            }
        }

    } catch (error) {
        console.error("An error occurred:", error);
    }
}
   


function movements(arrOfHighlighted,id1,array_swap_ids){
    const controller1=new AbortController();
    const {signal}=controller1;
    var AorB=document.getElementById(id1).classList[3]; 
    if (document.getElementById(id1).classList[4]=="Ricochet" || document.getElementById(id1).classList[4]=="Semi-Ricochet")
        {   
            if (document.getElementById(id1).classList[4]=="Semi-Ricochet")
                {
                    document.getElementById("rr").addEventListener("click",function(){
                        game_state=3;
                        controller1.abort();
                        if (!is_game_paused)
                            {
                                second_click=true;pause_timer();
                                rotateright(id1);
                                flag=1;
                                one_move_over(arrOfHighlighted,array_swap_ids);
                            }
                         },{signal});
                    document.getElementById("rl").addEventListener("click",function(){
                        game_state=3;
                        controller1.abort();
                        if(!is_game_paused){
                            second_click=true;pause_timer()
                            rotateleft(id1);
                            flag=1;
                            one_move_over(arrOfHighlighted,array_swap_ids);
                        }
                    },{signal});
                }
            else{
                    document.getElementById("rotate").addEventListener("click",function(){
                            game_state=3;
                            controller1.abort();
                            if (!is_game_paused){
                                second_click=true;pause_timer();
                                rotate(id1);
                                flag=1;
                                one_move_over(arrOfHighlighted,array_swap_ids);
                            }
                    },{signal});
                    for(var i=0;i<array_swap_ids.length;i++)
                        {
                            document.getElementById(array_swap_ids[i]).addEventListener('click',function(){
                                game_state=3;
                                controller1.abort();
                                if(!is_game_paused){
                                    second_click=true;pause_timer();
                                    var id2=this.id;
                                    blocks=document.querySelectorAll('.block');
                                    for(var i=0;i<64;i++)
                                        {
                                            if (blocks[i].innerHTML==''){
                                                blackey(id1,blocks[i].id);
                                                blackey(id2,id1);
                                                blackey(blocks[i].id,id2);break;
                                            }
                                        }
                                    move_or_rotate_array[0]='Ricochet';
                                    move_or_rotate_array[1]=[id1,id2];
                                    move_or_rotate_array[2]=document.getElementById(id1).classList[4];
                                    flag=1;
                                    one_move_over(arrOfHighlighted,array_swap_ids);
                                }
                            },{signal})
                        }
                }
        }
    
    for(var i=0;i<arrOfHighlighted.length;i++){
        document.getElementById(arrOfHighlighted[i]).addEventListener("click",function(){
            game_state=3;
            controller1.abort();
            if (!is_game_paused){
                second_click=true;pause_timer();
                var id2=this.id;
                blackey(id1,id2);
                flag=1;
                one_move_over(arrOfHighlighted,array_swap_ids);
            }
            
        },{signal}
        );
        
    }
    controller=controller1;
}
function rotate(id1){
    var element=document.getElementById(id1);
    var AorB=element.classList[3];
    if (AorB=='A'){
        current_rotation_ricochetA=current_rotation_ricochetA+90;
        document.getElementById(id1).children[0].style.transform="rotate("+current_rotation_ricochetA+"deg)";
        var angle=current_rotation_ricochetA;
    }
    else{
        current_rotation_ricochetB=current_rotation_ricochetB+90;
        document.getElementById(id1).children[0].style.transform="rotate("+current_rotation_ricochetB+"deg)";
        var angle=current_rotation_ricochetB;
    }
    if (angle%180==0){
        element.classList.replace(element.classList[5],'NE');
    }
    else{
        element.classList.replace(element.classList[5],'NW');
    }
    document.getElementById("rotate").style.visibility="hidden";
    
    move_or_rotate_array=['Ricochet','rotate',''];
}
function rotateleft(id1){
    var AorB=document.getElementById(id1).classList[3];
    if (AorB=='A'){
        current_rotation_semiricochetA=current_rotation_semiricochetA-90;
    document.getElementById(id1).children[0].style.transform="rotate("+current_rotation_semiricochetA+"deg)";
        var angle=current_rotation_semiricochetA;
    }
    else{
        current_rotation_semiricochetB=current_rotation_semiricochetB-90;
    document.getElementById(id1).children[0].style.transform="rotate("+current_rotation_semiricochetB+"deg)";
        var angle=current_rotation_semiricochetB;
    }
    element=document.getElementById(id1);
    if (angle%360==0){
        element.classList.replace(element.classList[5],'NE');
    }
    else if((angle-180)%360==0){
        element.classList.replace(element.classList[5],'SW');
    }
    else if((angle-90)%360==0){
        element.classList.replace(element.classList[5],'SE');
    }
    else if((angle+90)%360==0){
       element.classList.replace(element.classList[5],'NW');
    }
    document.getElementById("rl").style.visibility="hidden";
    document.getElementById("rr").style.visibility="hidden";
    move_or_rotate_array=['Semi-Ricochet','rl',''];
}

function rotateright(id1){
    var AorB=document.getElementById(id1).classList[3];
    if (AorB=='A'){
        current_rotation_semiricochetA=current_rotation_semiricochetA+90;
    document.getElementById(id1).children[0].style.transform="rotate("+current_rotation_semiricochetA+"deg)";
    var angle=current_rotation_semiricochetA;
    }
    else{
        current_rotation_semiricochetB=current_rotation_semiricochetB+90
    document.getElementById(id1).children[0].style.transform="rotate("+current_rotation_semiricochetB+"deg)";
    var angle=current_rotation_semiricochetB;
    }
    element=document.getElementById(id1);
    if (angle%360==0){
        element.classList.replace(element.classList[5],'NE');
    }
    else if((angle-180)%360==0){
        element.classList.replace(element.classList[5],'SW');
    }
    else if((angle-90)%360==0){
        element.classList.replace(element.classList[5],'SE');
        
    }
    else if((angle+90)%360==0){
       element.classList.replace(element.classList[5],'NW');
    }
    
    document.getElementById("rl").style.visibility="hidden";
    document.getElementById("rr").style.visibility="hidden";
        move_or_rotate_array=['Semi-Ricochet','rr',''];
}

function blackey(id1,id)
 {       
        
     //image shifting
    var img1=document.getElementById(id1).innerHTML;
    document.getElementById(id1).innerHTML="";
    // console.log("image lost from "+id1);
    document.getElementById(id).innerHTML=img1;
     // console.log("image moved to"+id);
                              
    //class name shifting
    var piece1=document.getElementById(id1).classList[3];
    var piece2=document.getElementById(id1).classList[4];
    if (piece2=='Ricochet' || piece2=='Semi-Ricochet'){
        var piece3=document.getElementById(id1).classList[5];
    }
    document.getElementById(id1).className=(document.getElementById(id1).className).slice(0,11);
    document.getElementById(id).className=document.getElementById(id).className+" "+piece1+" "+piece2;
    if (piece2=='Ricochet' || piece2=='Semi-Ricochet'){
    document.getElementById(id).className=document.getElementById(id).className+" "+piece3;}
    if (piece2=='Cannon'){
        if (piece1=='A'){
             var ba=document.querySelector('.ballA');
             var b_s=ba.classList[2];
             ba.className=ba.className.slice(0,4)+id[1]+' '+b_s;                                    
             ba.id=ba.id.slice(0,2)+id[1];
             ba.className=ba.className+' ballA';
             move_buttonA();
                                    
        }
        else{
            var bb=document.querySelector('.ballB');
            var b_s=bb.classList[2];
            bb.className=bb.className.slice(0,4)+id[1]+' '+b_s;
            bb.id=bb.id.slice(0,2)+id[1];
            bb.className=bb.className+' ballB';
            move_buttonB();
        }
    }    
    move_or_rotate_array=[piece2,id1,id]; 
    document.getElementById("rr").style.visibility="hidden";
    document.getElementById("rl").style.visibility="hidden";
    document.getElementById("rotate").style.visibility="hidden";       
}    

function boxes_ahead(c_p,b_s){
    if (b_s=='right' || b_s=='left'){
        var r_n=c_p[0];
        var c_n=c_p[1];
        var i=parseInt(c_n);
        if (b_s=='right'){
            i=i+1;
            while(i<8){
                id=r_n+i.toString();
                newDiv=document.getElementById(id);
                if (newDiv.innerHTML!=''){
                    return [i,id];
                }
                i++;
            }
            return [i,'nothing'];
        }
        else if(b_s=='left'){
            i=i-1;
            while(i>-1){
                id=r_n+i.toString();
                newDiv=document.getElementById(id);
                if (newDiv.innerHTML!=''){
                    return [i,id];
                }
                i--; 
            }
            return [i,'nothing'];
        }
    }
    else if (b_s=='down' ||b_s=='up'){
        
        var r_n=c_p[0];
        var c_n=c_p[1];
        var i=parseInt(r_n);
        if (b_s=='up'){
            i=i+1;
            while(i<8){
                id=i.toString()+c_n;
                newDiv=document.getElementById(id);
                if (newDiv.innerHTML!=''){
                    if (b_s=='up' && newDiv.classList[3]=='B' && newDiv.classList[4]=='Tank'){i++;continue;}
                    else{return [i,id];}
                }
                i++;
            }return [i,'nothing'];
        }
        else if(b_s=='down'){
            i=i-1;
            while(i>-1){
                id=i.toString()+c_n;
                newDiv=document.getElementById(id);
                if (newDiv.innerHTML!=''){
                    if (b_s=='down' && newDiv.classList[3]=='A' && newDiv.classList[4]=='Tank'){i--;continue;}
                    else{return [i,id];}
                }
                i--; 
            }
            return [i,'nothing'];
        }
    }

    
}

function check_element_in_given_id(id,c_p,b_s){
    newDiv=document.getElementById(id);
    item=newDiv.classList[4];
    if (item=='Ricochet' || item=='Semi-Ricochet')
        {
            if (item=='Ricochet'){
                t_s=newDiv.classList[5];
                switch(b_s){
                    case 'up':{
                        switch(t_s){
                            case 'NE':{return 'left';}
                            case 'NW':{return 'right';}
                        }break;
                    }
                    case 'down':{
                        switch(t_s){
                            case 'NE': {return 'right';}
                            case 'NW':{return 'left';}
                        }break;
                    }
                    case 'left':{
                        switch(t_s){
                            case 'NE': {return 'up';}
                            case 'NW':{return 'down';}
                        }break;
                    }
                    case 'right':{
                        switch(t_s){
                            case 'NE':{return 'down';}
                            case 'NW':{return 'up';}
                        }break;
                    }
                }
            }
            else{
                t_s=newDiv.classList[5];
                switch(b_s){
                    case 'up':{
                        switch(t_s){
                            case 'NE':{destroy=true;return false;}
                            case 'NW':{destroy=true;return false;}
                            case 'SE':{return 'right';}
                            case 'SW':{return 'left';}
                        }break;
                    }
                    case 'down':{
                        switch(t_s){
                            case 'NE':{return 'right';}
                            case 'NW':{return 'left';}
                            case 'SE':{destroy=true;return false;}
                            case 'SW':{destroy=true;return false;}
                        }break;
                    }
                    case 'left':{
                        switch(t_s){
                            case 'NE':{return 'up';}
                            case 'NW':{destroy=true;return false;}
                            case 'SE':{return 'down';}
                            case 'SW':{destroy=true;return false;}
                        }break;
                    }
                    case 'right':{
                        switch(t_s){
                            case 'NE':{destroy=true;return false;}
                            case 'NW':{return 'up';}
                            case 'SE':{destroy=true;return false;}
                            case 'SW':{return 'down';}
                        }break;
                    }
                }
            }
        }
    else if(item==='Titan')
        {var titan=newDiv.classList[3];
        if (toggle_turn!=titan){game_over=toggle_turn}
        return false;}
    else {return false;}
}

async function move_bullet(AorB, c_p) {
    return new Promise((resolve, reject) => {
        try {
            var duration,j=0;
            if (AorB == 'A') {
                var ba = document.querySelector('.ballA');
                var b_s = ba.classList[2];
                var bullet=document.getElementById('bulletA');
            } else {
                var ba = document.querySelector('.ballB');
                var b_s = ba.classList[2];
                var bullet=document.getElementById('bulletB');
            }
            var a = boxes_ahead(c_p, b_s);
            var i = a[0];
            var id = a[1];
            var r_n = parseInt(c_p[0]);
            var c_n = parseInt(c_p[1]);
            if (b_s == 'right') {
                bullet.style.transform="rotate(-90deg)";
                bullet.style.top='0px';
                bullet.style.left='0px';
                duration = ((i - c_n - 1)*75+35)*5;
                var value=parseInt(ba.style.left);
                var k = false;
                if (id != 'nothing') {
                    k = check_element_in_given_id(id, c_p, b_s);
                }
                if (!k) {
                    var ta;
                    var new_id = c_p;
                    pause_3_cp = new_id; // mark1
                    ta = setInterval(() => {
                        ba.style.left=value+j+'px';
                        j=j+5;
                        
                        if (((j-35)/75) > (i - c_n - 1)) {
                            clearInterval(ta);   
                        }
                        if (is_game_paused) {
                            clearInterval(ta);
                            pause_3_cp = new_id;resolve();
                        } // mark2
                    }, 25);
                } else if (k != false) {
                    var ta;
                    var new_id = c_p;
                    pause_3_cp = new_id; // mark1
                    ta = setInterval(() => {
                        ba.style.left=value+j+'px';
                        j=j+5;
                        
                        if (((j)/75) > (i - c_n)) {
                            clearInterval(ta);
                            
                        }
                        if (is_game_paused) {
                            clearInterval(ta);
                            pause_3_cp = new_id;resolve();
                        } // mark2
                    }, 25);
                }
            } else if (b_s == 'left') {
                bullet.style.transform="rotate(90deg)";
                bullet.style.top='0px';
                bullet.style.left='0px';
                duration = ((c_n - i - 1)*75+35)* 5;
                var k = false;
                value=parseInt(ba.style.left);
                if (id != 'nothing') {
                    k = check_element_in_given_id(id, c_p, b_s);
                    
                }
                if (!k) {;
                    var new_id = c_p;
                    pause_3_cp = new_id; // mark1
                    ta = setInterval(() => {
                        ba.style.left=value-j+'px';
                        j=j+5;
                       if (((j-35)/75) > (c_n - i - 1)) {
                            clearInterval(ta);
                            
                        }
                        if (is_game_paused) {
                            clearInterval(ta);
                            pause_3_cp = new_id;resolve();
                        } // mark2
                    }, 25);
                } else if (k != false) {
                    var ta;
                    var new_id = c_p;
                    pause_3_cp = new_id; // mark1
                    ta = setInterval(() => {
                        ba.style.left=value-j+'px';
                        j=j+5;
                        if (((j)/75) > (c_n - i)) {
                            clearInterval(ta);
                        }
                        if (is_game_paused) {
                            clearInterval(ta);
                            pause_3_cp = new_id;resolve();
                        } // mark2
                    }, 25);
                }
            } else if (b_s == 'up') {
                bullet.style.transform="rotate(180deg)";
                bullet.style.top='-10px';
                bullet.style.left='10px';
                var duration = ((i - r_n - 1)*75+35) * 5;
                var k = false;
                value=parseInt(ba.style.top);
                if (id != 'nothing') {
                    k = check_element_in_given_id(id, c_p, b_s);
                    
                }
                if (!k) {
                    var ta;
                    var new_id = c_p;
                    pause_3_cp = new_id; // mark1
                    ta = setInterval(() => {
                        ba.style.top=value-j+'px';
                        j=j+5;
                        if (((j-35)/75) > (i - r_n - 1)) {
                            clearInterval(ta);
                        }
                        if (is_game_paused) {
                            clearInterval(ta);
                            pause_3_cp = new_id;resolve();
                        } // mark2
                    }, 25);
                } else if (k != false) {
                    var ta;
                    var new_id = c_p;
                    pause_3_cp = new_id; // mark1
                    ta = setInterval(() => {
                        ba.style.top=value-j+'px';
                        j=j+5;
                        if (((j)/75) > (i - r_n)) {
                            clearInterval(ta);
                        }
                        if (is_game_paused) {
                            clearInterval(ta);
                            pause_3_cp = new_id;resolve();
                        } // mark2
                    }, 25);
                }
            } else if (b_s == 'down') {
                bullet.style.transform="rotate(0deg)";
                bullet.style.top='-5px';
                bullet.style.left='-10px';
                duration = ((r_n - i - 1)*75+35)* 5; // 0.25
                var k = false;
                var value=parseInt(ba.style.top);
                if (id != 'nothing') {
                    k = check_element_in_given_id(id, c_p, b_s);
                    
                }
                if (!k) {
                    var ta ;
                    var new_id = c_p;
                    pause_3_cp = new_id; // mark1
                    ta = setInterval(() => {
                        ba.style.top=value+j+'px';
                        j=j+5;
                        if (((j-35)/75) > (r_n - i - 1)) {
                           clearInterval(ta);
                        }
                        if (is_game_paused) {
                            clearInterval(ta);
                            pause_3_cp = new_id;resolve();
                        } // mark2
                    }, 25);
                } else if (k != false) {
                    var ta;
                    var new_id = c_p;
                    pause_3_cp = new_id; // mark1
                    ta = setInterval(() => {
                        ba.style.top=value+j+'px';
                        j=j+5;
                        if (((j)/75) > (r_n - i)) {
                            clearInterval(ta);
                        }
                        if (is_game_paused) {
                            pause_3_cp = new_id;
                            clearInterval(ta);resolve();
                        } // mark2
                    }, 25);
                }
            }
            
            if (!k) {
                setTimeout(async function() {
                    if (!is_game_paused) {
                        if (AorB == 'A') {
                            ba.classList.replace(ba.classList[2], 'down');
                            removed_element=['',''];
                            if(destroy){
                                var div=document.getElementById(id);
                                removed_element[0]=div.innerHTML;
                                removed_element[1]=[id];
                                div.innerHTML='';
                                 //remove classname
                               removed_element[1].push(div.classList[3]);
                               removed_element[1].push(div.classList[4]);
                               removed_element[1].push(div.classList[5]);
                               div.className=div.className.slice(0,11);
                            }
                            ba.style.visibility='hidden';
                            var newDiv = document.querySelector(".A.Cannon");
                            pause_3_cp=newDiv.id;
                            newDiv.appendChild(ba);
                            move_buttonA();
                            await delay(500);
                            timerIdB = setInterval(RunB, 1000);
                            resolve(); 
                            
                        } else {
                            ba.classList.replace(ba.classList[2], 'up');
                            removed_element=['',''];
                            if(destroy){
                                //remove image
                                var div=document.getElementById(id);
                                removed_element[0]=div.innerHTML;
                                removed_element[1]=[id];
                                div.innerHTML='';
                                //remove classname
                               removed_element[1].push(div.classList[3]);
                               removed_element[1].push(div.classList[4]);
                               removed_element[1].push(div.classList[5]);
                                div.className=div.className.slice(0,11);
                            }
                            ba.style.visibility='hidden';
                            var newDiv = document.querySelector(".B.Cannon");
                            pause_3_cp=newDiv.id;
                            newDiv.appendChild(ba);
                            move_buttonB();
                            await delay(500);
                            ba.id='b'+newDiv;
                            timerIdA = setInterval(RunA, 1000);
                            resolve(); 
                        }
                        destroy=false;
                    }
                }, duration+10);
            } else if (k!= false) {
                setTimeout(() => {
                    if (!is_game_paused) {
                        b_s = k;
                        ba.classList.replace(ba.classList[2], k);
                        c_p = id;
                        
                        setTimeout(() => {
                            move_bullet_with_promise(AorB, c_p).then(resolve); 
                        }, 50);
                    }
                },duration+10);
            }
        } catch (error) {
            reject(error); 
        }
    });
}
timerOn('A');
highlightBoxes();