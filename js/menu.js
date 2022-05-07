window.addEventListener('load', function(){
    
    const htmlAnchors = 
    {
        curtains : document.querySelectorAll('.curtain'),
        start : document.querySelectorAll(".menu__button")[0],
        howPlay : document.querySelectorAll(".menu__button")[1],
        about : document.querySelectorAll(".menu__button")[2],
        back : function() {
            return document.querySelector('.menu__return');
        }
    }
    
    addButtonsAction(htmlAnchors.start, htmlAnchors.howPlay, htmlAnchors.about);

//    function getBackButton() {
//        const backButton = document.querySelector(".menu__return");
//        return backButton;
//    };
    
    function returnMenu() {
        htmlAnchors.curtains[0].classList.add("startReturnAnimation", "holdAnimation");
        menu();
    }

    function addButtonsAction(start, howPlay, about) {
    
        htmlAnchors.start.addEventListener('click', function() {
        
            htmlAnchors.curtains[0].classList.add("startStartAnimation", "holdAnimation");
        
            setTimeout(function() {
            
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                
                    if(this.status === 200 && this.readyState === 4) {
                        document.querySelector('.wrapper').style.maxWidth = '100%';
                        document.querySelector('.wrapper').innerHTML = this.responseText;
                    };
                };
            
                xhr.onprogress = function(e) {
                
                    if(e.loaded >= e.total) {
                        htmlAnchors.curtains[0].classList.remove("startStartAnimation", "holdAnimation");
                        htmlAnchors.curtains[0].classList.add("endStartAnimation");
                    };
                };
        
                xhr.open("GET", "levels/level-1.html", true);
                xhr.send();
            
            
            
                const xhrInterface = new XMLHttpRequest();
                xhrInterface.onreadystatechange = function() {
                
                    if(this.status === 200 && this.readyState === 4) {
                        document.querySelector('.interface').innerHTML = this.responseText;
                    };
                };
            
                xhrInterface.onprogress = function(e) {
                
                    if(e.loaded >= e.total) {
                        htmlAnchors.curtains[0].classList.remove("startStartAnimation", "holdAnimation");
                        htmlAnchors.curtains[0].classList.add("endStartAnimation");
                    };
                };
        
                xhrInterface.open("GET", "assets/interface.html", true);
                xhrInterface.send();
            
                setTimeout(function() {
                    htmlAnchors.curtains[0].classList.remove("endStartAnimation");
                }, 1000);
            
                setTimeout(function() {
                
                    const scriptJs = document.createElement('script');
                    scriptJs.src = 'js/scripts.js';
                    const scriptMenu = document.createElement('script');
                    scriptMenu.src = 'js/menu.js';
                    document.body.appendChild(scriptJs, scriptMenu);    

                }, 3000);
            }, 1000); 
        });
    
        htmlAnchors.howPlay.addEventListener('click', function() {
        
            htmlAnchors.curtains[0].classList.add("startHowPlayAnimation", "holdAnimation");
        
            setTimeout(function() {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
                
                    if(this.status === 200 && this.readyState === 4) {
                        document.querySelector(".wrapper").innerHTML = this.responseText;
                        htmlAnchors.back().addEventListener("click", returnMenu);
                    };
                };
        
                xhr.onprogress = function(e) {
                
                    if(e.loaded >= e.total) {
                        htmlAnchors.curtains[0].classList.remove("startHowPlayAnimation", "holdAnimation");
                        htmlAnchors.curtains[0].classList.add("endHowPlayAnimation");
                    };
                };
        
                xhr.open("GET", "assets/how_play.html", true);
                xhr.send();
        
                setTimeout(function() {
                    htmlAnchors.curtains[0].classList.remove("endHowPlayAnimation");
                }, 1000);
            }, 1000);
        });
    
        htmlAnchors.about.addEventListener('click', function() {
        
            htmlAnchors.curtains[0].classList.add("startAboutAnimation", "holdAnimation");
    
            setTimeout(function() {
                const xhr = new XMLHttpRequest();
                xhr.onreadystatechange = function() {
            
                    if(this.status === 200 && this.readyState === 4) {
                        document.querySelector(".wrapper").innerHTML = this.responseText;
                        htmlAnchors.back().addEventListener("click", returnMenu);
                    };
                };
        
                xhr.onprogress = function(e) {
            
                    if(e.loaded >= e.total) {
                        htmlAnchors.curtains[0].classList.remove("startAboutAnimation", "holdAnimation");
                        htmlAnchors.curtains[0].classList.add("endAboutAnimation");
                    };      
                };
        
                xhr.open("GET", "assets/about.html", true);
                xhr.send();
        
                setTimeout(function() {
                    htmlAnchors.curtains[0].classList.remove("endAboutAnimation");
                }, 1000);
            }, 1000);
        });
    };
    
    function menu() {
    
        setTimeout(function() {
        
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
            
                if(this.status === 200 && this.readyState === 4) {
                    document.querySelector(".wrapper").innerHTML = this.responseText;
                    addButtonsAction(htmlAnchors.start, htmlAnchors.howPlay, htmlAnchors.about);
                };
            };
    
            xhr.onprogress = function(e) {
                
                if(e.loaded >= e.total) {
                    htmlAnchors.curtains[0].classList.remove("startReturnAnimation", "holdAnimation");
                    htmlAnchors.curtains[0].classList.add("endReturnAnimation");
                };    
            };
        
            xhr.open("GET", "assets/menu.html", true);
            xhr.send();
            
            setTimeout(function() {
                htmlAnchors.curtains[0].classList.remove("endReturnAnimation");
            }, 1000);   
        }, 1000);
    }; 
});