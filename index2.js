//Static_Variables

var current_rotation_ricochetA=0;
var current_rotation_semiricochetA=0;
var current_rotation_ricochetB=0;
var current_rotation_semiricochetB=0;
var toggle_turn='A';
var second_click=false;
var deepika=false;




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
                    newDiv.style.opacity='0.5';
                    newDiv.style.backgroundColor='black';
                }
        }
    var body=document.querySelector("body");
    var container=document.querySelector(".container");
    // body.style.backgroundImage="url('./resources/images/Cannon_tank.jpg')";
    // container.style.bckgroundImage.height='auto';
    // container.style.backgroundImage.column='auto';
    var block=document.querySelectorAll(".block");
    body.style.display='flex';
    body.style.justifyContent="center";
    container.style.display="grid";
    container.style.grid="repeat(8,70px) / repeat(8,70px)";
    container.style.columnGap="5px";
    container.style.rowGap="5px";

    
    // for(var i=0;i<block.length;i++)
    //     {
    //         block[i].style.border="5px solid deeppink";
    //     }
    
    // document.querySelector("body").style.csstext="display:flex;justify-content:center";
    console.log("done");

    // document.querySelector(".container").style.cssText="display:'grid'; grid-template:repeat(8,70px) / repeat(8,70px)";

}
//1.3Setup pieces in position
function setupPieces(){
    var block=document.querySelectorAll(".block");
    block[4].innerHTML="<img id='TitanA' src='resources/images/pieces/TitanA.png' alt='TitanA'></img>";
    block[4].className=block[4].className+" A Titan";
    block[3].innerHTML="<img id='CannonA' src='resources/images/pieces/CannonA.png' alt='CannonA'></img><div id='ballA' class='r7 c3 down'></div>";
    block[3].className=block[3].className+" A Cannon";
    block[12].innerHTML="<img id='TankA' src='resources/images/pieces/TankA.png' alt='TankA'></img>";
    block[12].className=block[12].className+" A Tank";
    block[18].innerHTML="<img id='RicochetA' src='resources/images/pieces/RicochetA.png' alt='RicochetA'></img>";
    block[18].className=block[18].className+" A Ricochet NE";
    block[21].innerHTML="<img id='Semi-RicochetA' src='resources/images/pieces/Semi-RicochetA.png' alt='Semi-RicochetA'></img>";
    block[21].className=block[21].className+" A Semi-Ricochet NE";
    block[60].innerHTML="<img id='CannonB' src='resources/images/pieces/CannonB.png' alt='CannonB'></img><div id='ballB' class='r0 c4 up'></div>";
    block[60].className=block[60].className+" B Cannon";
    block[59].innerHTML="<img id='TitanB' src='resources/images/pieces/TitanB.png' alt='TitanB'></img>";
    block[59].className=block[59].className+" B Titan";
    block[51].innerHTML="<img id='TankB' src='resources/images/pieces/TankB.png' alt='TankB'></img>";
    block[51].className=block[51].className+" B Tank";
    block[45].innerHTML="<img id='RicochetB' src='resources/images/pieces/RicochetB.png' alt='RicochetB'></img>";
    block[45].className=block[45].className+" B Ricochet NE";
    block[42].innerHTML="<img id='Semi-RicochetB' src='resources/images/pieces/Semi-RicochetB.png' alt='Semi-RicochetB'></img>";
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
    document.getElementById("ballB").style.cssText="width:10px;height:10px;background-color:blue;border-radius:50%;position:absolute;left:28.5px;bottom:27.5px;z-index:1;";
    document.getElementById("ballA").style.cssText="width:10px;height:10px;background-color:blue;border-radius:50%;position:absolute;left:27px;top:23.5px;z-index:1;";
    document.getElementById('rotate').style.position='relative';
    document.getElementById('rotate').style.top='350px';
    document.getElementById('rotate').style.left='-205px';
    document.getElementById('rr').style.position='relative';
    document.getElementById('rr').style.top='275px';
    document.getElementById('rr').style.left='-20px';
    document.getElementById('rl').style.position='relative';
    document.getElementById('rl').style.top='200px';
    document.getElementById('rl').style.left='165px';
    var container=document.querySelector(".container");
    container.style.position='relative';
    container.style.left='-100px';
    container.style.top='40px';
    document.body.style.backgroundColor='#B6FFFA';
    //background-image: linear-gradient(144deg,#FE1F4E, #D1FE49 50%,#FBB23F);

}



function initialsetup()
    {
    setupOuterFrameCB();
    setupInnerBlocks();
    setupPieces();
    }
initialsetup();

// const newDiv=document.createElement("div");
// newDiv.innerHTML="Hello, World!";
// newDiv.style.backgroundColor="blue";
// newDiv.style.color="white";
// newDiv.style.padding="10px";
// const parent=document.querySelector("body");
// parent.appendChild(newDiv);

function defaultBlockColor(){
    // document.querySelectorAll(".block").forEach(item =>{item.style.backgroundColor="black"})
    
    for(var i=0;i<=64;i++)
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
// function setUpTimer_B(){
//     var timer=document.createElement('p');
//     document.body.appendChild(timer);
//     timer.id='timerB';
//     timer.style.position='relative';
//     timer.style.width='150px';
//     timer.style.height='60px';
//     timer.style.backgroundColor='#E8FFCE';
//     timer.style.border="1px solid black";
//     timer.style.left='-150px';
//     timer.innerHTML='05:00';
//     timer.style.fontSize='40px';
//     timer.style.display='flex';
//     timer.style.justifyContent='center';
//     timer.style.paddingTop='10px';  
//     // timer.style.visibility='hidden';
// }
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
        alert("End game");
    }
    if (timeA>=0){
        seconds=(timeA%60).toString();
        if (seconds.length==1){
        seconds='0'+seconds;
        }
        timer.innerHTML='0'+minutes.toString()+':'+seconds;
        }
    
    timeA=timeA-1;
    
    // if (time!=0){
    //     Run(time);
    // }
}
function RunB(){
    if (second_click) return;
    timer=document.getElementById('timerB');   
    minutes=Math.floor(timeB/60);
    if(timeB<0){
        clearInterval(timerIdB);
        alert("End game");
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
    if (second_click==true){
        if(toggle_turn=='A'){clearInterval(timerIdA);console.log("paused A timer");}
        else{clearInterval(timerIdB);console.log('paused B timer');}
    }
}
setUpTimer('A');
setUpTimer('B');
// timerOn('A');
// timerOn('B');

//********************************************************************************************************** */
//Pause play button
function setUpPausePlay(){
    document.getElementById('pause').addEventListener('click',pauseGamePlay());}
function pauseGamePlay(){
   second_click=true;
   pause_timer();
   second_click=false;  
}
    



//******************************************************************************************************************/
//3.1Highlight
function move_buttonA(){
    var ba=document.getElementById("ballA");
    ba.style.left='27px';
    ba.style.top='23.5px';
    
}
function move_buttonB(){
    var bb=document.getElementById("ballB");
    bb.style.bottom='27px';
    bb.style.left='28.5px';
    
}
// timerOn('A');
function highlightBoxes(){
        if (toggle_turn=='A'){
            document.querySelectorAll(".A").forEach(item =>{item.addEventListener("click",pinky)});
        }
        else{
            document.querySelectorAll(".B").forEach(item =>{item.addEventListener("click",pinky)}); 
        }
        
               
}

function pinky()
{      
        var id1=this.id;
        document.querySelectorAll(".A").forEach(item =>{item.removeEventListener("click",pinky);});
        document.querySelectorAll(".B").forEach(item =>{item.removeEventListener("click",pinky);});
        var arrOfHighlighted=[];
        // alert(this.classList[4]);
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

        //make movements
        movements(arrOfHighlighted,id1);
 
}
function move_bullet_with_promise(toggle_turn,id){
    return new Promise(resolve=>{setTimeout(()=>{
        move_bullet(toggle_turn,id);resolve()
    },200);});
}
async function one_move_over(){
    second_click=false;
    if (toggle_turn=='A'){
        var newDiv=document.querySelector(".A.Cannon");
        await move_bullet_with_promise('A',newDiv.id);
    }
    else{
        var newDiv=document.querySelector(".B.Cannon");
        await move_bullet_with_promise('B',newDiv.id);
    }
    if (toggle_turn=='A'){
        toggle_turn='B';
        
        
    }          
    else{
        toggle_turn='A';
       
        
    }
    
    highlightBoxes();
}    


function movements(arrOfHighlighted,id1){
    const controller=new AbortController();
    const {signal}=controller;
    var AorB=document.getElementById(id1).classList[3];  
    // if (toggle_turn=='A'){
    //     toggle_turn='B';
    // }          
    // else{
    //     toggle_turn='A';
    // }
    if (document.getElementById(id1).classList[4]=="Ricochet" || document.getElementById(id1).classList[4]=="Semi-Ricochet")
        {   
            if (document.getElementById(id1).classList[4]=="Semi-Ricochet")
                {
                    document.getElementById("rr").addEventListener("click",function(){
                        second_click=true;pause_timer();

                        rotateright(id1,arrOfHighlighted);
                        controller.abort();
                        one_move_over();
                         },{signal});
                    document.getElementById("rl").addEventListener("click",function(){
                        second_click=true;pause_timer()
                        rotateleft(id1,arrOfHighlighted);
                        controller.abort();
                        one_move_over();
                    },{signal});
                }
            else{
                    document.getElementById("rotate").addEventListener("click",function(){
                            second_click=true;pause_timer();
                            rotate(id1,arrOfHighlighted);
                            controller.abort();
                            one_move_over();
                    },{signal});
                }
                   
         
        }
    
    for(var i=0;i<arrOfHighlighted.length;i++){
        document.getElementById(arrOfHighlighted[i]).addEventListener("click",function(){
            second_click=true;pause_timer();
            var id2=this.id;
            blackey(id2,arrOfHighlighted,id1);
            controller.abort();
            one_move_over();
        },{signal}
        );
        
        
    }
    
    
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
 {     // for(var i=0;i<arrOfHighlighted.length;i++)
//         {
//             document.getElementById(arrOfHighlighted[i]).removeEventListener("click",function(){var id2=this.id;
//             blackey(id2,arrOfHighlighted,id1);
//         console.log("removed");});
//         }
    // elem=document.querySelector(event);
            // var id=this.id;   
        //  alert(id);  
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
                            // alert(document.getElementById(id).className);
                            // alert(document.getElementById(id1).className);
                            //break
                            // alert(id);
                            //incase if it is cannon -shift of bullet

                            
                            if (piece2=='Cannon'){
                                if (piece1=='A'){
                                    // alert(id[1]);
                                    var ba=document.getElementById('ballA');
                                    var b_s=ba.classList[2];
                                    ba.className=ba.className.slice(0,4)+id[1]+' '+b_s;
                                    move_buttonA();
                                }
                                else{
                                    var bb=document.getElementById('ballB');
                                    var b_s=bb.classList[2];
                                    bb.className=bb.className.slice(0,4)+id[1]+' '+b_s;
                                    
                                    
                                    move_buttonB();
                                }
                            }
                            
                    }
                document.getElementById(arrOfHighlighted[i]).style.backgroundColor="black";
                document.getElementById(arrOfHighlighted[i]).removeEventListener("click",function(){var id2=this.id;
                        blackey(id2,arrOfHighlighted,id1);
                        });
            }

                    document.getElementById("rr").style.visibility="hidden";
                    document.getElementById("rl").style.visibility="hidden";
                    document.getElementById("rotate").style.visibility="hidden";
                
            // for(var j=0;j<arrOfHighlighted.length;j++)
            //     {               
            //       document.getElementById(arrOfHighlighted[j]).style.backgroundColor="black"; 
                              
            //      }
            
        //  defaultBlockColor();
        //Change color
        
        // if (i==arrOfHighlighted.length){
        //     document.querySelectorAll(".block").forEach(item =>{item.removeEventListener("click",blackey)})
        //     document.querySelectorAll(".A").forEach(item =>{item.removeEventListener("click",pinky)});
        //     document.querySelectorAll(".B").forEach(item =>{item.removeEventListener("click",pinky)});
            
        // }
        
        // highlightBoxes();
            // document.querySelectorAll(".block").forEach(item =>{item.removeEventListener("click",blackey)})
        // if (i==arrOfHighlighted.length){
        //     pinky();
        // }  
      
}    

highlightBoxes();

//Just practise
// var string="hello"
// string=string.slice(0,3)+'r'+string.slice(4);
// alert(string);
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
    item=newDiv.classList[4];//'Ricochet'
    
    if (item=='Ricochet' || item=='Semi-Ricochet')
        {
            if (item=='Ricochet'){
                t_s=newDiv.classList[5];//'NE'
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
    else {return false;}
}

function move_bullet(AorB,c_p)
{   
    
    if (AorB=='A'){
        var ba=document.getElementById('ballA');
        var b_s=ba.classList[2];
    }
    else{
        var ba=document.getElementById('ballB');
        var b_s=ba.classList[2];
    }
    var a=boxes_ahead(c_p,b_s);//'73','down')//[5,'52']
    var i=a[0];//5
    var id=a[1];//'52'
    var r_n=parseInt(c_p[0]);//7
    var c_n=parseInt(c_p[1]);//3
    if (b_s=='right'){
        distance=(i-c_n-1)*70+35;
        duration=(i-c_n-1)/2;
        
        
        var k=false;
        if (id!='nothing'){
            k=check_element_in_given_id(id,c_p,b_s);
            
        }
        // alert(k);
        /*************************************** */
        if (k==false){
            
            
            ba.style.transition='transform '+duration.toString()+'s linear,visibility '+duration+'s step-end';
            ///*,visibility '+duration+'s step-end*/
            ba.style.transform='translateX('+distance.toString()+'px)';
            
            ba.style.visibility='hidden';
            setTimeout(()=>{
                    ba.style.transform='';
                    ba.style.transition='';
                    ba.style.visibility='visible';
                    if (AorB=='A'){
                        ba.classList.replace(ba.classList[2],'down');
                        var newDiv=document.querySelector(".A.Cannon");
                        newDiv.appendChild(ba);
                        timerIdB=setInterval(RunB,1000);
                    }
                    else{
                        ba.classList.replace(ba.classList[2],'up');
                        var newDiv=document.querySelector(".B.Cannon");
                        newDiv.appendChild(ba);
                        timerIdA=setInterval(RunA,1000); 
                    }
                },(duration+0.5)*1000);
        }
        else if(k!=false){
            distance=distance+35;
            duration=(i-c_n-1)/2;
            ba.style.transition='transform '+duration.toString()+'s linear';
            ba.style.transform='translateX('+distance.toString()+'px)';
            
            setTimeout(()=>{
                b_s=k;
                ba.classList.replace(ba.classList[2],k);
                newDiv=document.getElementById(id);
                newDiv.appendChild(ba);
                c_p=id;
                ba.style.transition='';
                ba.style.transform='';
                setTimeout(()=>{
                    move_bullet(AorB,c_p);
                },50);
                
            },(duration)*1000);
        };
    }
    else if (b_s=='left'){
        distance=(c_n-i-1)*70+35;
        duration=(c_n-i-1)/2;
        var k=false;
        if (id!='nothing'){
            k=check_element_in_given_id(id,c_p,b_s);
        }
        if (k==false){
            ba.style.transition='transform '+duration.toString()+'s linear,visibility '+duration+'s step-end';
            ba.style.transform='translateX(-'+distance.toString()+'px';
            ba.style.visibility='hidden';
            setTimeout(()=>{
                    ba.style.transform='';
                    ba.style.transition='';
                    ba.style.visibility='visible';
                    /************************************************ */
                    if (AorB=='A'){
                        ba.classList.replace(ba.classList[2],'down');
                        var newDiv=document.querySelector(".A.Cannon");
                        newDiv.appendChild(ba);
                        timerIdB=setInterval(RunB,1000);
                    }
                    else{
                        ba.classList.replace(ba.classList[2],'up');
                        var newDiv=document.querySelector(".B.Cannon");
                        newDiv.appendChild(ba);
                        timerIdA=setInterval(RunA,1000); 
                    }
                },(duration+0.5)*1000);
        }
        else if(k!=false){
            distance=distance+35;
            duration=(c_n-i-1)/2;
            ba.style.transition='transform '+duration.toString()+'s linear';
            ba.style.transform='translateX(-'+distance.toString()+'px)';
            // setTimeout(()=>{
            //     ba.style.transform='';
            //     ba.style.transition='';
            //     if (AorB=='A'){
            //         move_buttonA();
            //     }
            //     else{
            //         move_buttonB();
            //     }
            // },duration*1000);
            
            setTimeout(()=>{
                b_s=k;
                ba.classList.replace(ba.classList[2],k);
                newDiv=document.getElementById(id);
                newDiv.appendChild(ba);
                c_p=id;
                ba.style.transition='';
                ba.style.transform='';
                setTimeout(()=>{
                    move_bullet(AorB,c_p);
                },50);
                
            },duration*1000);
        }
    }

    else if (b_s=='up'){
        var distance=(i-r_n-1)*70+50;
        var duration=(i-r_n-1)/2;
        var k=false;
        
        if (id!='nothing'){
            //'64','04','up'
            k=check_element_in_given_id(id,c_p,b_s);
            
        }
        
        if (k==false){
            ba.style.transition='transform '+duration.toString()+'s linear,visibility '+duration+'s step-end';
            ba.style.transform='translateY(-'+distance.toString()+'px)';
            ba.style.visibility='hidden';
            setTimeout(()=>{
                    ba.style.transform='';
                    ba.style.transition='';
                    ba.style.visibility='visible';
                    divtag=document.getElementById(c_p).getElementsByTagName('*')[1];
            document.getElementById(c_p).removeChild(divtag);
                    /************************************************ */
                    if (AorB=='A'){
                        ba.classList.replace(ba.classList[2],'down');
                        var newDiv=document.querySelector(".A.Cannon");
                        newDiv.appendChild(ba);
                        timerIdB=setInterval(RunB,1000);
                    }
                    else{
                        ba.classList.replace(ba.classList[2],'up');
                        var newDiv=document.querySelector(".B.Cannon");
                        newDiv.appendChild(ba);
                        timerIdA=setInterval(RunA,1000); 
                    }
                },(duration+0.5)*1000);
        }
        else if(k!=false){
           
            distance=distance+35;
            duration=(i-r_n-1)/2;
            ba.style.transition='transform '+duration.toString()+'s linear';
            ba.style.transform='translateY(-'+distance.toString()+'px)';
            // setTimeout(()=>{
            //     ba.style.transform='';
            //     ba.style.transition='';
            //     if (AorB=='A'){
            //         move_buttonA();
            //     }
            //     else{
            //         move_buttonB();
            //     }
            // },duration*1000);
            
            setTimeout(()=>{
                b_s=k;
                ba.classList.replace(ba.classList[2],k);
                newDiv=document.getElementById(id);
                newDiv.appendChild(ba);
                c_p=id;
                ba.style.transition='';
                ba.style.transform='';
                setTimeout(()=>{
                    move_bullet(AorB,c_p);
                },50);
                
            },(duration)*1000);
        }
    }

    else if (b_s=='down'){
        // alert("Entered");
        distance=(r_n-i-1)*75+25;//120
        duration=(r_n-i-1)/2;//0.5
        var k=false;
 
        if (id!='nothing'){
            k=check_element_in_given_id(id,c_p,b_s);//'53','73','down'//'right'
        }
        if (k==false){
            ba.style.transition='transform '+duration.toString()+'s linear,visibility '+duration+'s step-end';
            ba.style.transform='translateY('+distance.toString()+'px)';
            ba.style.visibility='hidden';
            setTimeout(()=>{
                    ba.style.transform='';
                    ba.style.transition='';
                    ba.style.visibility='visible';
                    divtag=document.getElementById(c_p).getElementsByTagName('*')[1];
            document.getElementById(c_p).removeChild(divtag);
                    /************************************************ */
                    if (AorB=='A'){
                        ba.classList.replace(ba.classList[2],'down');
                        var newDiv=document.querySelector(".A.Cannon");
                        newDiv.appendChild(ba);
                        timerIdB=setInterval(RunB,1000);
                    }
                    else{
                        ba.classList.replace(ba.classList[2],'up');
                        var newDiv=document.querySelector(".B.Cannon");
                        newDiv.appendChild(ba);
                        timerIdA=setInterval(RunA,1000); 
                    }

                },(duration+0.5)*1000);
        }
        else if(k!=false){
            distance=distance+35;//155
            duration=(r_n-i-1)/2;//0.5
            
            ba.style.transition='transform '+duration.toString()+'s linear';
            ba.style.transform='translateY('+distance.toString()+'px)';
            // setTimeout(()=>{
            //     ba.style.transform='';
            //     ba.style.transition='';
            //     if (AorB=='A'){
            //         move_buttonA();
            //     }
            //     else{
            //         move_buttonB();
            //     }
            // },duration*1000);
            
            setTimeout(()=>{
                // alert("Hello");
                b_s=k;//'right'
                ba.classList.replace(ba.classList[2],k);
                newDiv=document.getElementById(id);
                newDiv.appendChild(ba);
                c_p=id;//'53'
                ba.style.transition='';
                ba.style.transform='';
                // alert("Hello");
                setTimeout(()=>{
                    move_bullet(AorB,c_p);
                },50);
                
            },(duration)*1000);
            //'A','53'
        }
    }
}

