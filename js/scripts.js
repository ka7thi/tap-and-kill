const htmlGameAnchors = 
{
    score : document.querySelector('.interface__score'),
    hpBar : document.querySelector('.interface__hp-busy-bar'),
    hpPercentages : document.querySelector('.interface__hp-percentages'),
    playersHome : document.querySelector('.game__players-home')
}

const gameVariables = {
    scores : 0,
    createdEnemyCount : 0,
    enemyInHome : 0,
    hp : 100,
    mobs : [],
}


    
function startGame(){

    ifLost();
    createEnemy(1, 2, 1000);
    createEnemy(2, 2, 2000);
    createEnemy(3, 2, 3000);
    createEnemy(2, 2, 4000);
    createEnemy(3, 2, 5000);
    createEnemy(1, 2, 6000);
    createEnemy(1, 3, 7000);      
}
    
 function ifLost() {
    
     if ( gameVariables.hp <= 0 ) {
         htmlGameAnchors.hpPercentages.textContent = "0%";
         htmlGameAnchors.hpBar.style.width = 0 + "%";
         const othersEnemy = document.querySelectorAll('.game__enemy');
         for( i = 0; othersEnemy.length >= i; i++ ) {
             othersEnemy[i].parentNode.removeChild(othersEnemy[i]);
         }
     }   
}

function getMob(index) {
    return gameVariables.mobs[0][index];
}
   
function createEnemy(index, amount, time) {
    
    for(i=0; i <= amount - 1; i++) {
        setTimeout(function() {
               
    function respawnDistanceTop() {
            
        const x = Math.round(Math.random() * 600);
           
        if( x >= 46 ) {
            return x;
        } else {
            return respawnDistanceTop();
        }  
    };
        
    const respawnDistanceLeft = function() {
        return Math.round(Math.random() * 400);
    }
        
    const enemy = document.createElement('button')
    enemy.setAttribute('type', 'button');
    enemy.classList.add('game__enemy', getMob(index).cssStyleName);
    const enemyName = document.createElement('p');
    enemyName.classList.add('game__enemy-name');
    enemyName.textContent = getMob(index).name;
    enemy.appendChild(enemyName);
        
    function homeCenterTop() {
            
        const distanceHomeFromTop = htmlGameAnchors.playersHome.offsetTop;
        const homeHeight = htmlGameAnchors.playersHome.offsetHeight;
            
        return distanceHomeFromTop + ( homeHeight / 4 );       
    }
        
    function homeCenterLeft() {
            
        const distanceHomeFromLeft = htmlGameAnchors.playersHome.offsetLeft;
        const homeWidth = htmlGameAnchors.playersHome.offsetWidth;
            
        return distanceHomeFromLeft + ( homeWidth / 4 );
    }
        
    enemy.animate([
        { top: respawnDistanceTop() + "px" },
        { top: homeCenterTop() + "px" },
    ], {
       duration: 4000,
        iterations: Infinity
    });
        
    enemy.animate([
        { left: respawnDistanceLeft() + "px" },
        { left: homeCenterLeft() + "px" },
    ], {
       duration: 4000,
        iterations: Infinity
    });
        
    enemy.addEventListener('click', function() {
        this.parentNode.removeChild(this); 
        addScore(index);
    });
        
    removeEnemy(enemy, index);
        
    gameVariables.createdEnemyCount += 1;
        
    document.querySelector('.game-window').appendChild(enemy);
            
        }, time);
    }
} 
    
function removeEnemy(enemy, index) {
        
    setTimeout(function() {
        enemy.parentNode.removeChild(enemy);
        decreaseHp(index);
        ifLost();
    }, 4000); 
}
    
function addScore(index) {
    
    gameVariables.scores += getMob(index).scores;    
    htmlGameAnchors.score.textContent = gameVariables.scores;
        
}
    
function decreaseHp(index) {
        
    gameVariables.hp -= getMob(index).attack;
        
    function decreaseHpBar() {   
        htmlGameAnchors.hpBar.style.width = gameVariables.hp + "%";      console.log(htmlGameAnchors.hpBar.style.width); 
    }
        
    function decreaseHpPercentages() {    
        htmlGameAnchors.hpPercentages.textContent = gameVariables.hp + "%";
    }
        
    return decreaseHpBar(), decreaseHpPercentages();
        
}

function getMobsFile() {
    
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
                
        if(this.status === 200 && this.readyState === 4) {
            gameVariables.mobs.push(JSON.parse(this.responseText));
        };
    };
     
    xhr.open("GET", "assets/mob.json", true);
    xhr.send();
}

getMobsFile();

startGame();