// ===== EFECTOS INTERACTIVOS PARA LA INVITACIÓN DE CARS =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== EFECTO DE SONIDO AL HACER CLIC EN EL BOTÓN =====
    const rsvpButton = document.querySelector('.rsvp-button');
    
    rsvpButton.addEventListener('click', function() {
        // Redirigir a WhatsApp
        const phoneNumber = '3322961969';
        const message = encodeURIComponent('¡Hola! Me gustaría confirmar mi asistencia a la fiesta de cumpleaños de Claudia, Angie y Dieguito. ¡Nos vemos allí!');
        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        
        // Efecto visual de confirmación
        this.style.background = 'linear-gradient(45deg, #00ff00, #32cd32)';
        this.textContent = '¡Confirmado! 🏁';
        
        // Crear efecto de partículas
        createParticles();
        
        // Restaurar el botón después de 2 segundos
        setTimeout(() => {
            this.style.background = 'linear-gradient(45deg, #ff0000, #ff6600)';
            this.textContent = 'Confirmar asistencia';
        }, 2000);
    });
    
    // ===== EFECTO DE PARTÍCULAS =====
    function createParticles() {
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '10px';
            particle.style.height = '10px';
            particle.style.background = getRandomColor();
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            // Posición inicial cerca del botón
            const buttonRect = rsvpButton.getBoundingClientRect();
            particle.style.left = (buttonRect.left + buttonRect.width / 2) + 'px';
            particle.style.top = (buttonRect.top + buttonRect.height / 2) + 'px';
            
            document.body.appendChild(particle);
            
            // Animación de la partícula
            animateParticle(particle);
        }
    }
    
    function animateParticle(particle) {
        const angle = Math.random() * 2 * Math.PI;
        const velocity = Math.random() * 200 + 100;
        const gravity = 500;
        const life = 2000;
        
        let startTime = Date.now();
        let startX = parseFloat(particle.style.left);
        let startY = parseFloat(particle.style.top);
        
        function update() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / life;
            
            if (progress >= 1) {
                particle.remove();
                return;
            }
            
            const x = startX + Math.cos(angle) * velocity * (elapsed / 1000);
            const y = startY + Math.sin(angle) * velocity * (elapsed / 1000) + 0.5 * gravity * Math.pow(elapsed / 1000, 2);
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = 1 - progress;
            
            requestAnimationFrame(update);
        }
        
        update();
    }
    
    function getRandomColor() {
        const colors = ['#ff0000', '#ffff00', '#ff6600', '#000000', '#ffffff'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    // ===== EFECTO DE HOVER EN LOS NOMBRES =====
    const celebrantNames = document.querySelectorAll('.celebrants p');
    
    celebrantNames.forEach(name => {
        name.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(2deg)';
            this.style.transition = 'all 0.3s ease';
        });
        
        name.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // ===== EFECTO DE PULSACIÓN EN EL TÍTULO =====
    const title = document.querySelector('h1');
    
    setInterval(() => {
        title.style.transform = 'scale(1.05)';
        setTimeout(() => {
            title.style.transform = 'scale(1)';
        }, 200);
    }, 3000);
    
    // ===== EFECTO DE MOVIMIENTO DEL MOUSE =====
    document.addEventListener('mousemove', function(e) {
        const container = document.querySelector('.container');
        const rect = container.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const deltaX = (e.clientX - centerX) / 50;
        const deltaY = (e.clientY - centerY) / 50;
        
        container.style.transform = `translateX(${deltaX}px) translateY(${deltaY}px)`;
    });
    
    // ===== ANIMACIÓN DE ENTRADA =====
    const container = document.querySelector('.container');
    container.style.opacity = '0';
    container.style.transform = 'scale(0.5) translateY(50px)';
    
    setTimeout(() => {
        container.style.transition = 'all 1s ease';
        container.style.opacity = '1';
        container.style.transform = 'scale(1) translateY(0px)';
    }, 100);
    
    // ===== EFECTO DE CLICK EN CUALQUIER PARTE =====
    document.addEventListener('click', function(e) {
        if (e.target !== rsvpButton) {
            createSparkle(e.clientX, e.clientY);
        }
    });
    
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        sparkle.style.width = '20px';
        sparkle.style.height = '20px';
        sparkle.style.background = 'radial-gradient(circle, #ffff00, transparent)';
        sparkle.style.borderRadius = '50%';
        sparkle.style.pointerEvents = 'none';
        sparkle.style.zIndex = '999';
        sparkle.style.animation = 'sparkleEffect 0.6s ease-out forwards';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 600);
    }
    
    // ===== AGREGAR KEYFRAMES PARA EL EFECTO SPARKLE =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sparkleEffect {
            0% {
                transform: scale(0) rotate(0deg);
                opacity: 1;
            }
            50% {
                transform: scale(1) rotate(180deg);
                opacity: 0.8;
            }
            100% {
                transform: scale(0) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});

// ===== FUNCIÓN PARA DISPOSITIVOS MÓVILES =====
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function(e) {
        const touch = e.touches[0];
        createSparkle(touch.clientX, touch.clientY);
    });
}

