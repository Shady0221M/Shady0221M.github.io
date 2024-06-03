//Normal mode
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
var flag;
var mark;
var game_over=false;

var body=document.querySelector("body");
var container=document.querySelector(".container");
var block=document.querySelectorAll(".block");

//1.1Setup outer box
function setupOuterFrameCB(){
    var newDiv=document.createElement("div");
    newDiv.style.backgroundColor="black";
    newDiv.style.position='relative';
    newDiv.style.border="10px solid deeppink";
    var parent=document.querySelector("body");
    parent.appendChild(newDiv);
    newDiv.className='container';
    newDiv.style.backgroundColor='deeppink';
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
                    newDiv.style.position='relative';
                    // newDiv.style.opacity='1';
                    newDiv.style.backgroundColor='black';
                }
        }
    var body=document.querySelector("body");
    var container=document.querySelector(".container"); 
    body.style.display='flex';
    body.style.justifyContent="center";
    container.style.display="grid";
    container.style.grid="repeat(8,70px) / repeat(8,70px)";
    container.style.columnGap="5px";
    container.style.rowGap="5px";
}

function clearBoard(){
    var block=document.querySelectorAll(".block");
    for (var i=0;i<64;i++)
        {
            block[i].innerHTML='';block[i].className=block[i].className.slice(0,11);
        }
}
///resources/images/pieces/bullet_down.svg
//1.3Setup pieces in position
function setupPieces(){
    var block=document.querySelectorAll(".block");
    block[4].innerHTML="<img id='TitanA' src='/resources/images/pieces/TitanA.png' alt='TitanA'></img>";
    block[4].className=block[4].className+" A Titan";
    block[3].innerHTML="<img id='CannonA' src='/resources/images/pieces/CannonA.png' alt='CannonA'></img><div id='b73' class='r7 c3 down ballA'></div>";
    block[3].className=block[3].className+" A Cannon";
    block[12].innerHTML="<img id='TankA' src='/resources/images/pieces/TankA.png' alt='TankA'></img>";
    block[12].className=block[12].className+" A Tank";
    block[18].innerHTML="<img id='RicochetA' src='/resources/images/pieces/RicochetA.png' alt='RicochetA'></img>";
    block[18].className=block[18].className+" A Ricochet NE";
    block[21].innerHTML="<img id='Semi-RicochetA' src='/resources/images/pieces/Semi-RicochetA.png' alt='Semi-RicochetA'></img>";
    block[21].className=block[21].className+" A Semi-Ricochet NE";
    block[60].innerHTML="<img id='CannonB' src='/resources/images/pieces/CannonB.png' alt='CannonB'></img><div id='b04' class='r0 c4 up ballB'></div>";
    block[60].className=block[60].className+" B Cannon";
    block[59].innerHTML="<img id='TitanB' src='/resources/images/pieces/TitanB.png' alt='TitanB'></img>";
    block[59].className=block[59].className+" B Titan";
    block[51].innerHTML="<img id='TankB' src='/resources/images/pieces/TankB.png' alt='TankB'></img>";
    block[51].className=block[51].className+" B Tank";
    block[45].innerHTML="<img id='RicochetB' src='/resources/images/pieces/RicochetB.png' alt='RicochetB'></img>";
    block[45].className=block[45].className+" B Ricochet NE";
    block[42].innerHTML="<img id='Semi-RicochetB' src='/resources/images/pieces/Semi-RicochetB.png' alt='Semi-RicochetB'></img>";
    block[42].className=block[42].className+" B Semi-Ricochet NE";
   

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
    document.querySelector(".ballB").style.cssText="width:10px;height:10px;background-color:blue;border-radius:50%;position:absolute;left:28.5px;bottom:27.5px;z-index:1;";
    document.querySelector(".ballA").style.cssText="width:10px;height:10px;background-color:blue;border-radius:50%;position:absolute;left:27px;top:23.5px;z-index:1;";
    document.querySelector('.rotate').style.left='90px';
    var container=document.querySelector(".container");
    container.style.position='relative';
    container.style.left='-150px';
    container.style.top='40px';
    document.body.style.backgroundColor='#B6FFFA';
    document.getElementById('pause').style.left='300px';
    document.getElementById('undo').style.left='400px';
    document.getElementById('redo').style.left='500px';
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
    timer.style.position='relative';
    timer.style.width='150px';
    timer.style.height='60px';
    timer.style.backgroundColor='#E8FFCE';
    timer.style.border="1px solid black";
    if (AorB=='A'){timer.style.left='-900px';}
    else{timer.style.left='-150px';}
    timer.innerHTML='05:00';
    timer.style.fontSize='40px';
    timer.style.display='flex';
    timer.style.justifyContent='center';
    timer.style.paddingTop='10px';  
    // timer.style.visibility='hidden'; 

}
//Global variable declaration for timer static variables
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
        alert("End game - B wins");
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
        alert("End game -A wins");
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
//*************************************************************************** */
function end_of_game(){
    var div=document.getElementById('game_over');
    div.style.visibility='visible';
    document.querySelector('.winner').innerHTML=toggle_turn+' is the Winner';
    document.querySelector('.winner').style.cssText='position:relative;font-size: 25px;top: 320px;left: 120px;font-family:Franklin Gothic Medium, Arial Narrow, Arial, sans-serif;color:darkred;';
    document.getElementById('playAgain').addEventListener('click',resetGamePlay);
    document.getElementById('replay').style.opacity='0.2';
    document.getElementById('replay').style.fontSize='10px';
}
//********************************************************************************************************** */
//Pause play button
function setUpPausePlayReset(){
    document.getElementById('pause').addEventListener('click',pauseGamePlay);
    document.getElementById('reset').addEventListener('click',resetGamePlay);
}
    setUpPausePlayReset();

function resetGamePlay(){
    is_game_paused=true;
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
   document.getElementById('game_over').style.visibility='hidden';
   
   
}
function pauseGamePlay(){
    is_game_paused=true;
   second_click=true;
   clearInterval(timerIdA);
   clearInterval(timerIdB);
   second_click=false;  
   document.getElementById('game_pause').style.opacity='0.7';
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
}
async function playGamePlay(){
    is_game_paused=false;
    
    document.getElementById('game_pause').style.visibility='hidden';
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
//3.1Highlight
function move_buttonA(){
    var ba=document.querySelector(".ballA");
    ba.style.left='27px';
    ba.style.top='23.5px';
    
}
function move_buttonB(){
    var bb=document.querySelector(".ballB");
    bb.style.bottom='27px';
    bb.style.left='28.5px';
    
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
{      
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
                               newDiv.style.backgroundColor="#39ff14";
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
                                       newDiv.style.backgroundColor="#39ff14";
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
                {   if (this.classList[4]=="Semi-Ricochet"){
                    document.getElementById("rr").style.visibility="visible";
                    document.getElementById("rl").style.visibility="visible";}
                    else{
                        document.getElementById("rotate").style.visibility="visible";
                    }
                }
        }
        arr_id_play=arrOfHighlighted;
        initial_id_play=id1;
        //make movements
        mark=1;
        movements(arrOfHighlighted,id1);
 
}
async function move_bullet_with_promise(toggle_turn, id) {
    return new Promise((resolve) => {
        setTimeout(async () => {
            await move_bullet(toggle_turn, id);
            resolve();
        }, 200);
    });
}
async function one_move_over() {
    second_click = false;
    try {
        if (toggle_turn == 'A') {
            var newDiv = document.querySelector(".A.Cannon");
            if (flag==1)
            {await move_bullet_with_promise('A', newDiv.id);}
            else if (flag==2)
            {await move_bullet_with_promise('A',pause_3_cp);}
            
        } else {
            var newDiv = document.querySelector(".B.Cannon");
            if (flag==1)
                {await move_bullet_with_promise('B', newDiv.id);}
            else if (flag==2)
                {await move_bullet_with_promise('B',pause_3_cp);}
        }

        if (!is_game_paused) {
            if (!game_over)
                {
                if (toggle_turn == 'A') {
                    toggle_turn = 'B';
                } else {
                    toggle_turn = 'A';
                }highlightBoxes();
                }
                else{
                    clearInterval(timerIdA);clearInterval(timerIdB);end_of_game();
                }
            
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}
   


function movements(arrOfHighlighted,id1){
    const controller1=new AbortController();
    const {signal}=controller1;
    var AorB=document.getElementById(id1).classList[3]; 
    if (document.getElementById(id1).classList[4]=="Ricochet" || document.getElementById(id1).classList[4]=="Semi-Ricochet")
        {   
            if (document.getElementById(id1).classList[4]=="Semi-Ricochet")
                {
                    document.getElementById("rr").addEventListener("click",function(){
                        console.log('State 3');
                        game_state=3;
                        controller1.abort();
                        if (!is_game_paused)
                            {
                                second_click=true;pause_timer();
                                rotateright(id1,arrOfHighlighted);
                                flag=1;
                                one_move_over();
                            }
                         },{signal});
                    document.getElementById("rl").addEventListener("click",function(){
                        console.log('State 3');
                        game_state=3;
                        controller1.abort();
                        if(!is_game_paused){
                            second_click=true;pause_timer()
                            rotateleft(id1,arrOfHighlighted);
                            flag=1;
                            one_move_over();
                        }
                    },{signal});
                }
            else{
                    document.getElementById("rotate").addEventListener("click",function(){
                            console.log('State 3');
                            game_state=3;
                            controller1.abort();
                            if (!is_game_paused){
                                second_click=true;pause_timer();
                                rotate(id1,arrOfHighlighted);
                                flag=1;
                                one_move_over();
                            }
                    },{signal});
                }
        }
    
    for(var i=0;i<arrOfHighlighted.length;i++){
        document.getElementById(arrOfHighlighted[i]).addEventListener("click",function(){
            
            game_state=3;
            controller1.abort();
            if (!is_game_paused){
                second_click=true;pause_timer();
                var id2=this.id;
                blackey(id2,arrOfHighlighted,id1);
                flag=1;
                one_move_over();
            }
            
        },{signal}
        );
        
    }
    controller=controller1;
}
function rotate(id1,arrOfHighlighted){
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
    for(var j=0;j<arrOfHighlighted.length;j++)
        {               
          document.getElementById(arrOfHighlighted[j]).style.backgroundColor="black";      
         }
}
function rotateleft(id1,arrOfHighlighted){
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
    for(var j=0;j<arrOfHighlighted.length;j++)
        {               
          document.getElementById(arrOfHighlighted[j]).style.backgroundColor="black"; 
                      
         }
    
}

function rotateright(id1,arrOfHighlighted){
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
    for(var j=0;j<arrOfHighlighted.length;j++)
        {               
          document.getElementById(arrOfHighlighted[j]).style.backgroundColor="black";          
         }
}

function blackey(id,arrOfHighlighted,id1)
 {       
         for(var i=0;i<arrOfHighlighted.length;i++)
            {  // console.log(i);
                if (arrOfHighlighted[i]==id)
                    {
                         //image shifting
                            var img1=document.getElementById(id1).innerHTML;
                            document.getElementById(id1).innerHTML="";
                            console.log("image lost from "+id1);
                            document.getElementById(id).innerHTML=img1;
                            console.log("image moved to"+id);
                              
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
                                    // alert(id[1]);
                                    var ba=document.querySelector('.ballA');
                                    var b_s=ba.classList[2];
                                    ba.className=ba.className.slice(0,4)+id[1]+' '+b_s;
                                    ba.id[2]=id[1];
                                    ba.className=ba.className+' ballA';
                                    move_buttonA();
                                }
                                else{
                                    var bb=document.querySelector('.ballB');
                                    var b_s=bb.classList[2];
                                    bb.className=bb.className.slice(0,4)+id[1]+' '+b_s;
                                    bb.id[2]=id[1];
                                    bb.className=bb.className+' ballB';
                                    move_buttonB();
                                }
                            }
                            
                    }
                document.getElementById(arrOfHighlighted[i]).style.backgroundColor="black";
            }
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
                    return [i,id];
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
                    return [i,id];
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
                            case 'NE':
                                {return 'left';break;}
                            case 'NW':
                            {return 'right';break;}
                        }break;
                    }
                    case 'down':{
                        switch(t_s){
                            case 'NE':
                                {return 'right';break;}
                            case 'NW':
                            {return 'left';break;}
                        }break;
                    }
                    case 'left':{
                        switch(t_s){
                            case 'NE':
                                {return 'up';break;}
                            case 'NW':
                            {return 'down';break;}
                        }break;
                    }
                    case 'right':{
                        switch(t_s){
                            case 'NE':
                                {return 'down';break;}
                            case 'NW':
                            {return 'up';break;}
                        }break;
                    }
                }
            }
            else{
                t_s=newDiv.classList[5];
                switch(b_s){
                    case 'up':{
                        switch(t_s){
                            case 'NE':
                                {return false;break;}
                            case 'NW':
                                {return false;break;}
                            case 'SE':
                                {return 'right';break;}
                            case 'SW':
                                {return 'left';break;}
                        }break;
                    }
                    case 'down':{
                        switch(t_s){
                            case 'NE':
                                {return 'right';break;}
                            case 'NW':
                                {return 'left';break;}
                            case 'SE':
                                {return false;break;}
                            case 'SW':
                                {return false;break;}
                        }break;
                    }
                    case 'left':{
                        switch(t_s){
                            case 'NE':
                                {return 'up';break;}
                            case 'NW':
                                {return false;break;}
                            case 'SE':
                                {return 'down';break;}
                            case 'SW':
                                {return false;break;}
                        }break;
                    }
                    case 'right':{
                        switch(t_s){
                            case 'NE':
                                {return false;break;}
                            case 'NW':
                                {return 'up';break;}
                            case 'SE':
                                {return false;break;}
                            case 'SW':
                                {return 'down';break;}
                        }break;
                    }
                }
            }
        }
    else if(item=='Titan'){
        var titan=newDiv.classList[3];
        if (toggle_turn!=titan){game_over=toggle_turn;}
    }
    else {return false;}
}

function move_bullet(AorB, c_p) {
    return new Promise((resolve, reject) => {
        try {
            var duration;
            if (AorB == 'A') {
                var ba = document.querySelector('.ballA');
                var b_s = ba.classList[2];
            } else {
                var ba = document.querySelector('.ballB');
                var b_s = ba.classList[2];
            }
            var a = boxes_ahead(c_p, b_s);
            var i = a[0];
            var id = a[1];
            var r_n = parseInt(c_p[0]);
            var c_n = parseInt(c_p[1]);
            if (b_s == 'right') {
                duration = (i - c_n - 1) / 4;
                var k = false;
                if (id != 'nothing') {
                    k = check_element_in_given_id(id, c_p, b_s);
                }
                if (!k) {
                    var ta, j = 1;
                    var new_id = c_p;
                    pause_3_cp = new_id; // mark1
                    ta = setInterval(() => {
                        
                        new_id = c_p[0] + (c_n + j).toString();
                        ba.id='b'+new_id;
                        
                        var newDiv = document.getElementById(new_id);
                        newDiv.appendChild(ba);
                        j++;
                        
                        if (j > (i - c_n - 1)) {
                            clearInterval(ta);
                            
                        }
                        if (is_game_paused) {
                            clearInterval(ta);
                            pause_3_cp = new_id;resolve();
                        } // mark2
                    }, 250);
                } else if (k != false) {
                    var ta, j = 1;
                    var new_id = c_p;
                    pause_3_cp = new_id; // mark1
                    ta = setInterval(() => {
                        
                        new_id = c_p[0] + (c_n + j).toString();
                        var newDiv = document.getElementById(new_id);
                        newDiv.appendChild(ba);
                        ba.id='b'+newDiv;
                        j++;
                        
                        if (j > (i - c_n)) {
                            clearInterval(ta);
                            
                        }
                        if (is_game_paused) {
                            clearInterval(ta);
                            pause_3_cp = new_id;resolve();
                        } // mark2
                    }, 250);
                }
            } else if (b_s == 'left') {
                duration = (c_n - i - 1) / 4;
                var k = false;
                if (id != 'nothing') {
                    k = check_element_in_given_id(id, c_p, b_s);
                }
                if (!k) {
                    var ta, j = 1;
                    var new_id = c_p;
                    pause_3_cp = new_id; // mark1
                    ta = setInterval(() => {
                        
                        new_id = c_p[0] + (c_n - j).toString();
                        var newDiv = document.getElementById(new_id);
                        newDiv.appendChild(ba);
                        ba.id='b'+newDiv;
                        j++;
                       
                        if (j > (c_n - i - 1)) {
                            clearInterval(ta);
                            
                        }
                        if (is_game_paused) {
                            clearInterval(ta);
                            pause_3_cp = new_id;resolve();
                        } // mark2
                    }, 250);
                } else if (k != false) {
                    var ta, j = 1;
                    var new_id = c_p;
                    pause_3_cp = new_id; // mark1
                    ta = setInterval(() => {
                        
                        new_id = c_p[0] + (c_n - j).toString();
                        var newDiv = document.getElementById(new_id);
                        newDiv.appendChild(ba);
                        ba.id='b'+newDiv;
                        j++;
                        
                        if (j > (c_n - i)) {
                            clearInterval(ta);
                            
                        }
                        if (is_game_paused) {
                            clearInterval(ta);
                            pause_3_cp = new_id;resolve();
                        } // mark2
                    }, 250);
                }
            } else if (b_s == 'up') {
                var duration = (i - r_n - 1) / 4;
                var k = false;
                if (id != 'nothing') {
                    k = check_element_in_given_id(id, c_p, b_s);
                }
                if (!k) {
                    var ta, j = 1;
                    var new_id = c_p;
                    pause_3_cp = new_id; // mark1
                    ta = setInterval(() => {
                       
                        new_id = (r_n + j).toString() + c_p[1];
                        var newDiv = document.getElementById(new_id);
                        newDiv.appendChild(ba);
                        ba.id='b'+newDiv;
                        j++;
                        
                        if (j > (i - r_n - 1)) {
                            clearInterval(ta);
                            
                        }
                        if (is_game_paused) {
                            clearInterval(ta);
                            pause_3_cp = new_id;resolve();
                        } // mark2
                    }, 250);
                } else if (k != false) {
                    var ta, j = 1;
                    var new_id = c_p;
                    pause_3_cp = new_id; // mark1
                    ta = setInterval(() => {
                       
                        new_id = (r_n + j).toString() + c_p[1];
                        var newDiv = document.getElementById(new_id);
                        newDiv.appendChild(ba);
                        ba.id='b'+newDiv;
                        j++;
                        
                        if (j > (i - r_n)) {
                            clearInterval(ta);
                            
                        }
                        if (is_game_paused) {
                            clearInterval(ta);
                            pause_3_cp = new_id;resolve();
                        } // mark2
                    }, 250);
                }
            } else if (b_s == 'down') {
                duration = (r_n - i - 1) / 4; // 0.25
                var k = false;
                if (id != 'nothing') {
                    k = check_element_in_given_id(id, c_p, b_s);
                }
                if (!k) {
                    var ta, j = 1;
                    var new_id = c_p;
                    pause_3_cp = new_id; // mark1
                    ta = setInterval(() => {
                        
                        new_id = (r_n - j).toString() + c_p[1];
                        var newDiv = document.getElementById(new_id);
                        newDiv.appendChild(ba);
                        ba.id='b'+newDiv;
                        j++;
                        
                        if (j > (r_n - i - 1)) {
                            clearInterval(ta);
                            
                        }
                        if (is_game_paused) {
                            clearInterval(ta);
                            pause_3_cp = new_id;resolve();
                        } // mark2
                    }, 250);
                } else if (k != false) {
                    var ta, j = 1;
                    var new_id = c_p;
                    pause_3_cp = new_id; // mark1
                    ta = setInterval(() => {
                        
                        new_id = (r_n - j).toString() + c_p[1];
                        var newDiv = document.getElementById(new_id);
                        newDiv.appendChild(ba);
                        ba.id='b'+newDiv;
                        j++;
                        
                        if (j > (r_n - i)) {
                            clearInterval(ta);
                            
                        }
                        if (is_game_paused) {
                            pause_3_cp = new_id;
                            clearInterval(ta);resolve();
                        } // mark2
                    }, 250);
                }
            }
            
            if (!k) {
                setTimeout(() => {
                    if (!is_game_paused) {
                        if (AorB == 'A') {
                            ba.classList.replace(ba.classList[2], 'down');
                            var newDiv = document.querySelector(".A.Cannon");
                            pause_3_cp=newDiv.id;
                            newDiv.appendChild(ba);
                            timerIdB = setInterval(RunB, 1000);
                            resolve(); 
                        } else {
                            ba.classList.replace(ba.classList[2], 'up');
                            var newDiv = document.querySelector(".B.Cannon");
                            pause_3_cp=newDiv.id;
                            newDiv.appendChild(ba);
                            ba.id='b'+newDiv;
                            timerIdA = setInterval(RunA, 1000);
                            resolve(); 
                        }
                    }
                }, (duration + 0.5) * 1000);
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
                }, duration * 1000);
            }
        } catch (error) {
            reject(error); 
        }
    });
}
timerOn('A');
highlightBoxes();