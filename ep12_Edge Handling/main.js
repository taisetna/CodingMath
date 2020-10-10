window.onload = function() {
    var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight;
    particles = [],
    numParticles = 100;

    for(var i = 0; i < numParticles ; i +=1) {
        var p = particle.create(width/2,height,Math.random() * 8 + 5, -Math.PI / 2 + (Math.random() * .2 - .1), 0.1);
        p.radius = Math.random() * 10 + 2;
        p.bounce = -0.9;

        particles.push(p);
    }

    update();

    function update() {
        context.clearRect(0,0, width, height);
        
        console.log(particles.length);

        for(var i = 0 ; i < particles.length ; i +=1){
            var p = particles[i];
            p.update();

            context.beginPath();
            context.arc(p.position.getX(), p.position.getY(), p.radius , 0, Math.PI * 2, false);
            context.fill();

            if(p.position.getX() + p.radius > width) {
                p.position.setX(width - p.radius);
                p.velocity.setX(p.velocity.getX() * p.bounce);
            }
            if(p.position.getX() - p.radius < 0) {
                p.position.setX(p.radius);
                p.velocity.setX(p.velocity.getX() * p.bounce);
            }
            if(p.position.getY() + p.radius > height) {
                p.position.setY(height - p.radius);
                p.velocity.setY(p.velocity.getY() * p.bounce);
            }
            if(p.position.getY() - p.radius < 0) {
                p.position.setY(p.radius);
                p.velocity.setY(p.velocity.getY() * p.bounce);
            }
        } 

        removeDeadParticles();

        requestAnimationFrame(update);
    }

    function removeDeadParticles() {
        for(var i = particles.length - 1; i >=0 ; i -=1) {
            var p = particles[i];

            if(p.position.getX() - p.radius > width ||
               p.position.getX() + p.radius < 0 ||
               p.position.getY() - p.radius > height ||
               p.position.getY() + p.radius < 0){
              
                particles.splice(i,1);
              }
        }
    }
}