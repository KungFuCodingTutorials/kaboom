const FLOOR_HEIGHT = 150;
const JUMP_FORCE = 800;
const SPEED = 480;

// initialize kaboom
kaboom();

// Load assets
loadSprite('mascotte','mascotte.png');

scene("game", () => {

    // define gravity
    gravity(2400);

    // add the character
    const player = add([
        sprite("mascotte"),
        scale(0.5),
        pos(0,40),
        area(),
        body()
    ])

    // floor
    add([
        rect(width(),FLOOR_HEIGHT),
        outline(4),
        pos(0,height()),
        origin("botleft"),
        area(),
        solid(),
        color(127,200,255),
    ])

    // Write a function for jump
    function jump(){
        if(player.isGrounded()){
            player.jump(JUMP_FORCE);
        }
    }

    // jUMP WHEN PRESS THE SPACE BAR
    onKeyPress("space",jump);
    onClick(jump);


    // spawn obstacoles
    function spawnObject(){
        add([
            rect(48,rand(32,96)),
            area(),
            outline(4),
            pos(width(),height() - FLOOR_HEIGHT),
            origin("botleft"),
            color(255,180,255),
            move(LEFT,SPEED),
            "tree"
        ]);

        // spawn randomly
        wait(rand(0.5,1.5),spawnObject);
    }
    spawnObject();



    // lose if collide with object
   let score = 0;
   player.onCollide("tree", function(){
       go("lose",score);
       burp();
       addKaboom();
   })

   const scoreLabel = add([
       text(score),
       pos(24,24),
   ])

   // Increment the score
   onUpdate(function(){
       score++;
       scoreLabel.text = score;
   })

   scene("lose", function(score){
       add([
           sprite("mascotte"),
           pos(width()/2,height()/2),
           scale(1),
           origin("center"),
       ]);

       // display score
       add([
           text(score),
           pos(width()/2,height()/2 + 40),
           scale(1),
           origin("center"),

       ])

       //go back to game on press space
       onKeyPress("space", function(){
           go("game");
       });
       onClick(function(){
           go("game"); 
       })
   })

});
go("game");