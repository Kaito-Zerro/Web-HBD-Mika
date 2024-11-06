function showMessage() {
    var message = document.getElementById('special-message');
    message.classList.remove('hidden');
  }
  
  // Fungsi untuk menampilkan confetti
  function showConfetti() {
    var canvas = document.getElementById('confetti-canvas');
    canvas.classList.remove('hidden');
    confettiEffect(canvas);
  }
  
  // Efek confetti menggunakan canvas
  function confettiEffect(canvas) {
    const ctx = canvas.getContext('2d');
    const confettiPieces = Array.from({ length: 300 }, () => createConfettiPiece(canvas.width, canvas.height));
  
    function createConfettiPiece(width, height) {
      return {
        x: Math.random() * width,
        y: Math.random() * height - height,
        r: Math.random() * 4 + 1,
        d: Math.random() * 4 + 1,
        color: `hsl(${Math.random() * 360}, 100%, 50%)`,
        tilt: Math.random() * 10 - 5
      };
    }
  
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      confettiPieces.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        ctx.fill();
      });
      update();
    }
  
    function update() {
      confettiPieces.forEach((p) => {
        p.y += p.d;
        p.x += Math.sin(p.tilt);
        if (p.y > canvas.height) {
          p.y = -p.r;
          p.x = Math.random() * canvas.width;
        }
      });
    }
  
    function animate() {
      draw();
      requestAnimationFrame(animate);
    }
  
    animate();
  }
  
  // Mengatur ulang ukuran canvas sesuai jendela
  window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti-canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
  
  window.dispatchEvent(new Event('resize'));  // Memicu pengaturan ukuran awal canvas
  