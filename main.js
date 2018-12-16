var topHeaderDiv = document.getElementsByClassName("top-header")[0];
var top,left,height;
var time = new Date();
var linksContainer = document.getElementsByClassName("grind-links-container")[0];
var linksLength =linksContainer.childElementCount-1;
var timerShowProperties;
var mainLinksProperties = [["https://www.facebook.com","facebook"],["https://www.youtube.com","youtube"],["https://www.instagram.com","instagram"]];
var elId; // used for determing which link is being saved
function createLines(){
    var newLine = document.createElement("DIV");
    newLine.setAttribute("class","falling-line");
    var height = Math.floor(Math.random()*55);
    var left = Math.floor(Math.random()*window.innerWidth);
    topHeaderDiv.appendChild(newLine);
    setTimeout(function(){
        newLine.style = "height: "+height+"px; left: "+left+"px; transform: rotate(20deg) translateY(255px); z-index: 2";
    },20)
    setTimeout(function(){
        newLine.outerHTML='';
    },2000)
}
setInterval(createLines,200);
var ticking = document.getElementById("ticking");
setInterval(function(){
    if(ticking.style.color == "rgb(40, 40, 40)"){
        ticking.style.color = "rgb(255,255,255)";
    }
    else{ticking.style.color = "rgb(40, 40 ,40)";}
},666)
if(time.getHours()>12){
    document.getElementById("amOrPm").innerHTML = "pm";
}
document.getElementById("clock-hours").innerHTML = time.getHours();
if(time.getMinutes()<=9){
    document.getElementById("clock-minutes").innerHTML ="0"+ time.getMinutes();
}
else{
    document.getElementById("clock-minutes").innerHTML = time.getMinutes();

}
setInterval(function(){
    time = new Date();
    document.getElementById("clock-minutes").innerHTML = time.getMinutes();
    if(time.getMinutes()<=9){
        document.getElementById("clock-minutes").innerHTML ="0"+ time.getMinutes();
    }
},1000*60)
var links = document.getElementsByClassName("main-link");
var lines = document.getElementsByClassName("line");
var linesColor = "blue"; 
var finishedAnimation = true;
for(var i = 0;i<=linksLength-1;i++){
    links[i].onmouseenter = function(){
        showPropertiesTimerFn(this);
    }
    links[i].onclick = function(){
        window.location = mainLinksProperties[Array.prototype.indexOf.call(this.parentNode.children, this)][0];
    }
    document.getElementsByClassName("main-link-options")[i].onclick = function(){
        showPropertiesModal(event,this);
    }
    links[i].addEventListener("mouseenter",function(){
        if(this.getAttribute("class").includes("instagram"))linesColor = "linear-gradient(to bottom,purple,orange,yellow)";
        if(this.getAttribute("class").includes("facebook"))linesColor = "#3A589E";
        if(this.getAttribute("class").includes("youtube"))linesColor = "red";
        if(finishedAnimation){
            for(var x = 0;x<=2;x++){
                lines[x].style.transform = "rotate(30deg) translateY(0%)";
                if(linesColor === "linear-gradient(to bottom,purple,orange,yellow)"){
                    lines[x].style.backgroundImage = linesColor;
                }
                else{
                    lines[x].style.backgroundImage = "unset";
                    lines[x].style.backgroundColor = linesColor;
                }
            }
            }
    })
    links[i].addEventListener("mouseleave",function(){
        if(finishedAnimation){
        lines[0].style.transform = "rotate(30deg) translateY(100%)";
        lines[1].style.transform = "rotate(30deg) translateY(100%)";
        lines[2].style.transform = "rotate(30deg) translateY(100%)";
        finishedAnimation = false;
        }
        setTimeout(function(){
            lines[0].style.transform = "rotate(30deg) translateY(-100%)";
            lines[1].style.transform = "rotate(30deg) translateY(-100%)";
            lines[2].style.transform = "rotate(30deg) translateY(-100%)";  
            finishedAnimation = true;
        },300)
    })
}

document.getElementById("input-header").addEventListener("keydown",function(e){
    if(!e) e = window.event;
    if(e.keyCode === 13){
        window.location = "https://google.com/search?q="+document.getElementById("input-header").value;
    }
})
function openNewLinkModal(){
    document.getElementsByClassName("modal-background")[0].style.display = "block";
    setTimeout(function(){
        document.getElementsByClassName("add-new-link")[0].style.transform = "translateX(-50%) translateY(55vh)";
    },20)
}
document.getElementsByClassName("new")[0].onclick = function(){ //open modal
    openNewLinkModal();
}
function closeAddNewLinkModal(){
    document.getElementsByClassName("modal-background")[0].style.display = "none";
    document.getElementsByClassName("add-new-link")[0].style.transform = "translateX(-50%) translateY(0vh)";
    document.getElementById("enter-url-input").value = "";
    document.getElementById("enter-name-input").value = "";
    document.getElementsByClassName("add-new-link-buttons")[1].innerHTML = "Add"
}
document.getElementsByClassName("add-new-link-buttons")[0].onclick = function(){ //close modal
    closeAddNewLinkModal();
}
function addNewLink(){
    let newLinkUrl = document.getElementById("enter-url-input").value;
    let newLinkName = document.getElementById("enter-name-input").value.toLowerCase();
    if (!(/https:/i.test(newLinkUrl)))  newLinkUrl = "https://"+ newLinkUrl;
    mainLinksProperties.push([newLinkUrl,newLinkName]);
    let newLinkNameParagraph = document.createElement("P");
    let newLinkNameParagraphText = document.createTextNode(newLinkName);
    newLinkNameParagraph.appendChild(newLinkNameParagraphText);
    let newLinkAnchor = document.createElement("DIV");
    let newLinkInnerDivOptions = document.createElement("DIV");
    newLinkInnerDivOptions.setAttribute("class","main-link-options");
    newLinkInnerDivOptions.setAttribute("id","main-link-"+linksLength);
    newLinkInnerDivOptions.onclick = function(){
        showPropertiesModal(event,this);
    }
    let newLinkInnerDivOptionsImg = document.createElement("IMG");
    newLinkInnerDivOptionsImg.setAttribute("src","https://img.icons8.com/metro/26/000000/more.png");
    newLinkInnerDivOptionsImg.style = "filter: invert(15%)";
    newLinkInnerDivOptions.appendChild(newLinkInnerDivOptionsImg);
    newLinkAnchor.setAttribute("class","main-link");
    newLinkAnchor.href = newLinkUrl;
    newLinkAnchor.appendChild(newLinkInnerDivOptions);
    newLinkAnchor.appendChild(newLinkNameParagraph);
    linksContainer.insertBefore(newLinkAnchor,linksContainer.childNodes[(linksLength)*2]);
    newLinkAnchor.onmouseenter = function(){
        showPropertiesTimerFn(this);
    }
    newLinkAnchor.onclick = function(){
        window.location = mainLinksProperties[this.children[0].getAttribute("id").charAt( this.children[0].getAttribute("id").length-1 )][0];
    }
    closeAddNewLinkModal();
    linksLength++;
}
document.getElementsByClassName("add-new-link-buttons")[1].onclick = function(){ //add element, modal
    if(document.getElementsByClassName("add-new-link-buttons")[1].innerHTML === "Save"){
        let newUrlValue = document.getElementById("enter-url-input").value;
        if (!(/https:/i.test(newUrlValue)))  newUrlValue = "https://"+ newUrlValue;
        mainLinksProperties[elId][0] = newUrlValue;
        mainLinksProperties[elId][1] = document.getElementById("enter-name-input").value;
        document.getElementById("main-link-"+elId.toString()).nextSibling.innerHTML = mainLinksProperties[elId][1];
        closeAddNewLinkModal();
    }
    else{
        addNewLink();
    }
}

function showPropertiesTimerFn(el){
    timerShowProperties = setTimeout(function(){
        el.children[0].style.display = "inline-block";
        el.children[0].style.backgroundColor = "rgba(0,0,0,0.0)";
        setTimeout(function(){
            el.children[0].style.backgroundColor = "rgba(0,0,0,0.2)";
        },10)
        
    },1000)
    el.onmouseleave = function(){
        clearTimeout(timerShowProperties);
        el.children[0].style.display = "none";
    }
}
function showPropertiesModal(event,el){
    event.stopPropagation();
    openNewLinkModal();
    elId = el.getAttribute("id").charAt( el.getAttribute("id").length-1 );
    document.getElementById("enter-url-input").value = mainLinksProperties[elId][0];
    document.getElementById("enter-name-input").value = mainLinksProperties[elId][1];
    document.getElementsByClassName("add-new-link-buttons")[1].innerHTML = "Save";
}