// ===== EFECTOS INTERACTIVOS PARA LA INVITACIÓN DE CARS =====

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CONTROL DE MÚSICA DE FONDO =====
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');
    let isPlaying = false;
    
    // Intentar reproducir música automáticamente
    setTimeout(() => {
        backgroundMusic.play().then(() => {
            isPlaying = true;
            musicToggle.textContent = '🎵';
            musicToggle.classList.remove('paused');
        }).catch(() => {
            // Si falla la reproducción automática, mostrar botón pausado
            isPlaying = false;
            musicToggle.textContent = '🔇';
            musicToggle.classList.add('paused');
        });
    }, 1000);
    
    // Control manual de música
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            backgroundMusic.pause();
            musicToggle.textContent = '🔇';
            musicToggle.classList.add('paused');
            isPlaying = false;
        } else {
            backgroundMusic.play().then(() => {
                musicToggle.textContent = '🎵';
                musicToggle.classList.remove('paused');
                isPlaying = true;
            }).catch(error => {
                console.log('Error al reproducir música:', error);
            });
        }
    });
    
    // ===== CONFETI DE BIENVENIDA AL CARGAR LA PÁGINA =====
    setTimeout(() => {
        createWelcomeConfetti();
    }, 1500); // Delay para que coincida con las animaciones de entrada
    
    // ===== EFECTO DE SONIDO AL HACER CLIC EN EL BOTÓN =====
    const rsvpButton = document.querySelector('.rsvp-button');
    
// ===== FUNCIÓN PARA CONFIRMAR ASISTENCIA VÍA WHATSAPP =====
function confirmarAsistencia() {
    const telefono = "5213322961969"; // <-- Pon aquí tu número real
    const mensaje = encodeURIComponent("¡Hola! Confirmo mi asistencia a la fiesta 🥳");
    const url = `https://wa.me/${telefono}?text=${mensaje}`;
    window.open(url, "_blank");
}


        
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
    
    // ===== CONFETI DE BIENVENIDA (MÁS SUTIL) =====
    function createWelcomeConfetti() {
        const confettiCount = 50; // Menos cantidad para ser más sutil
        const colors = ['#ff0000', '#ffff00', '#ff6600', '#00ff00', '#0066ff', '#ff00ff', '#ffffff'];
        const shapes = ['square', 'circle'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            const shape = shapes[Math.floor(Math.random() * shapes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            confetti.style.position = 'fixed';
            confetti.style.width = Math.random() * 8 + 3 + 'px'; // Más pequeño
            confetti.style.height = confetti.style.width;
            confetti.style.background = color;
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '999'; // Menor z-index
            confetti.style.opacity = '0.8'; // Más transparente
            
            // Formas diferentes
            if (shape === 'circle') {
                confetti.style.borderRadius = '50%';
            }
            
            // Posición inicial desde los lados
            if (Math.random() > 0.5) {
                confetti.style.left = '-20px';
                confetti.style.top = Math.random() * window.innerHeight * 0.6 + 'px';
            } else {
                confetti.style.left = window.innerWidth + 'px';
                confetti.style.top = Math.random() * window.innerHeight * 0.6 + 'px';
            }
            
            document.body.appendChild(confetti);
            
            // Animación del confeti de bienvenida
            animateWelcomeConfetti(confetti);
        }
    }
    
    function animateWelcomeConfetti(confetti) {
        const moveSpeed = Math.random() * 2 + 1;
        const fallSpeed = Math.random() * 1 + 0.5;
        const rotationSpeed = Math.random() * 5 + 2;
        const life = 3000;
        
        let startTime = Date.now();
        let rotation = 0;
        const startLeft = parseFloat(confetti.style.left);
        const isFromLeft = startLeft < 0;
        
        function update() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / life;
            
            if (progress >= 1) {
                confetti.remove();
                return;
            }
            
            const currentTop = parseFloat(confetti.style.top) || 0;
            const currentLeft = parseFloat(confetti.style.left) || 0;
            
            // Movimiento hacia el centro y caída
            if (isFromLeft) {
                confetti.style.left = (currentLeft + moveSpeed) + 'px';
            } else {
                confetti.style.left = (currentLeft - moveSpeed) + 'px';
            }
            confetti.style.top = (currentTop + fallSpeed) + 'px';
            
            rotation += rotationSpeed;
            confetti.style.transform = `rotate(${rotation}deg)`;
            
            // Efecto de desvanecimiento
            confetti.style.opacity = 0.8 - (progress * 0.8);
            
            requestAnimationFrame(update);
        }
        
        update();
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

// ===== FUNCIÓN PARA DISPOSITIVOS MÓVILES =====
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function(e) {
        const touch = e.touches[0];
        createSparkle(touch.clientX, touch.clientY);
    });
}

  // Contador regresivo al 7 de junio
const countdown = () => {
    const targetDate = new Date("2025-08-10T16:00:00"); // Fecha y hora exacta
    const now = new Date();
    const difference = targetDate - now;
  
    if (difference <= 0) {
      document.getElementById("timer").innerHTML = "¡Ya comenzó la fiesta! 🎉";
      clearInterval(timerInterval);
      return;
    }
  
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
  
    document.getElementById("timer").innerHTML = 
      `${days} días, ${hours} horas, ${minutes} minutos, ${seconds} segundos`;
  };
  
  const timerInterval = setInterval(countdown, 1000);
  countdown(); // Ejecutar inmediatamente
