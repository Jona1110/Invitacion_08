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
        
        // Crear efecto de confeti
        createConfetti();
        
        // Restaurar el botón después de 2 segundos
        setTimeout(() => {
            this.style.background = 'linear-gradient(45deg, #ff0000, #ff6600)';
            this.textContent = 'Confirmar asistencia';
        }, 2000);
    });
    
    // ===== EFECTO DE CONFETI =====
    function createConfetti() {
        const confettiCount = 100;
        const colors = ['#ff0000', '#ffff00', '#ff6600', '#00ff00', '#0066ff', '#ff00ff', '#ffffff', '#000000'];
        const shapes = ['square', 'circle', 'triangle'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            confetti.style.position = 'fixed';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = confetti.style.width;
            confetti.style.background = color;
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '1000';
            
            // Formas diferentes
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            } else if (shape === 'triangle') {
                confetti.style.width = '0';
                confetti.style.height = '0';
                confetti.style.borderLeft = '5px solid transparent';
                confetti.style.borderRight = '5px solid transparent';
                confetti.style.borderBottom = '10px solid ' + color;
                confetti.style.background = 'transparent';
            }
            
            // Posición inicial aleatoria en la parte superior
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-20px';
            
            document.body.appendChild(confetti);
            
            // Animación del confeti
            animateConfetti(confetti);
        }
    }
    
    function animateConfetti(confetti) {
        const fallSpeed = Math.random() * 3 + 2;
        const horizontalSpeed = (Math.random() - 0.5) * 4;
        const rotationSpeed = Math.random() * 10 + 5;
        const life = 4000;
        
        let startTime = Date.now();
        let rotation = 0;
        
        function update() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / life;
            
            if (progress >= 1 || parseFloat(confetti.style.top) > window.innerHeight) {
                confetti.remove();
                return;
            }
            
            const currentTop = parseFloat(confetti.style.top) || 0;
            const currentLeft = parseFloat(confetti.style.left) || 0;
            
            confetti.style.top = (currentTop + fallSpeed) + 'px';
            confetti.style.left = (currentLeft + horizontalSpeed) + 'px';
            
            rotation += rotationSpeed;
            confetti.style.transform = `rotate(${rotation}deg)`;
            
            // Efecto de desvanecimiento
            confetti.style.opacity = 1 - (progress * 0.5);
            
            requestAnimationFrame(update);
        }
        
        update();
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
        
        // Solo aplicar el efecto de movimiento sutil, no interferir con las animaciones CSS
        if (!container.style.animation || container.style.animation.includes('bounce')) {
            container.style.transform = `translateX(${deltaX}px) translateY(${deltaY}px)`;
        }
    });
    
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

