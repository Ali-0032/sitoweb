const k_outer = [0, 10, 4.5, 0, 9, 10, 7.5, 10, 6.5, 7.5, 2.5, 7.5, 1.5, 10];
const k_inner = [4.5, 2.5, 6, 6, 3, 6];

function setup() {
    createCanvas(windowWidth, windowHeight);
    noCursor(); // Nasconde il mouse originale
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    // Sfondo nero con scia persistente
    fill(0, 40); 
    noStroke();
    rect(0, 0, width, height);
    
    noFill();
    
    // Configurazione griglia
    let cols = 8;
    let rows = 6;
    let spacingX = width / cols;
    let spacingY = height / rows;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let posX = spacingX * i + spacingX / 2;
            let posY = spacingY * j + spacingY / 2;
            
            push();
            translate(posX, posY);
            
            // Calcolo distanza dal mouse per la luminosità
            let d = dist(mouseX, mouseY, posX, posY);
            let proximity = map(d, 0, 400, 255, 50, true); 
            
            // Rotazione verso il mouse
            let angle = atan2(mouseY - posY, mouseX - posX);
            rotate(angle + PI/2);
            
            // --- COLORE ACCESO PER LE A DI SFONDO ---
            // Un azzurro neon che brilla più forte se il mouse è vicino
            stroke(0, 255, 255, proximity); 
            strokeWeight(2);
            
            drawLetterA(10); 
            pop();
        }
    }

    // --- DISEGNO IL CURSORE "A" SUPER ACCESO ---
    drawCursorA();
}

function drawCursorA() {
    push();
    translate(mouseX, mouseY);
    
    // Rotazione automatica veloce per il cursore
    rotate(frameCount * 0.08);
    
    // Effetto "Glow" (disegniamo la forma due volte con spessori diversi)
    // 1. Aura esterna (Magenta)
    stroke(255, 0, 255, 150);
    strokeWeight(6);
    drawLetterA(5.5);
    
    // 2. Nucleo interno (Bianco)
    stroke(255);
    strokeWeight(2);
    drawLetterA(5);
    
    pop();
}

function drawLetterA(s) {
    beginShape();
    for (let k = 0; k < k_outer.length; k += 2) {
        vertex((k_outer[k] - 4.5) * s, (k_outer[k+1] - 5) * s);
    }
    beginContour();
    for (let k = 0; k < k_inner.length; k += 2) {
        vertex((k_inner[k] - 4.5) * s, (k_inner[k+1] - 5) * s);
    }
    endContour();
    endShape(CLOSE);
}