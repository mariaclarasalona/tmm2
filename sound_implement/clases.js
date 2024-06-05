class Mancha {

    constructor(imagen) {
        this.imagen = imagen[int(random(3))];
        this.alpha = 255;
        this.velocidad = 2;
    }

    dibujar(x, y, width, height) {
        push();
        tint(255, this.alpha);
        noStroke();
        rect(x, y, width, 410);
        image(this.imagen, x, y, width, height);
        pop();
    }

    actualizar() {
        this.alpha -= this.velocidad;
    }

    check() {
        return this.alpha <= 0;
    }

}

class Trazo {

    constructor(imagen, miColor) {
        this.imagen = imagen;
        this.miColor = miColor;
        this.x = 0-50;
        this.y = random(400, 500);
        this.tamaño=50;
    }

    dibujar() {
       
        push();
        tint(this.miColor);
        noStroke();

        image(this.imagen,this.x,this.y,this.tamaño);
        pop();
    }

    mover(velocidad) {
        this.x+=velocidad;
    }

    checkForOutOfBounds(){
        return this.x>width;
    }

}

    class Dir_y_Vel {

        constructor() {
        this.posX = 0;
        this.posY = 0;
        this.prevPosX;
        this.prevPosY;
        this.miDireccionX;
        this.miDireccionY;
        this.vel;
        this.miDireccionPolar;
        }
    
        calcularTodo(amp, frec) {
        this.prevPosX = this.posX;
        this.prevPosY = this.posY;
        this.posX = frec;
        this.posY = amp;
    
        this.miDireccionX = this.posX - this.prevPosX;
        this.miDireccionY = this.posY - this.prevPosY;
        this.miDireccionPolar = degrees(atan2(this.posY - this.prevPosY, this.posX - this.prevPosX));
    
        this.vel = dist(this.posX, this.posY, this.prevPosX, this.prevPosY);
        }
    
    
/////////returns
    
        velocidad() {
        return this.vel;
        }
        direccionX() {
        return this.miDireccionX;
        }
    
        direccionY() {
        return this.miDireccionY;
        }
    
    
        direccionPolar() {
        return this.miDireccionPolar;
        }
    
    
///////////debug
    
        mostrarData() {
        textSize(24);
        fill(255);
        text("Velocidad: " + this.vel, 50, 50);
        text("Direccion X: " + this.miDireccionX, 50, 75);
        text("Direccion Y: " + this.miDireccionY, 50, 100);
        text("Direccion Polar: " + this.miDireccionPolar, 50, 125);
    
    
        push();
        noFill();
        stroke(255);
        strokeWeight(3);
        translate(width / 2, height / 2);
    
        ellipse(0, 0, 100, 100);
        rotate(radians(this.miDireccionPolar));
        line(0, 0, this.vel * 2, 0);
    
    
        pop();
        }
    
        ///////////// FIN DE LA CLASE  ///////
    }

