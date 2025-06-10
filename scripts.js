document.addEventListener('DOMContentLoaded', () => {
  // Animacija kartic s pomočjo Intersection Observerja
  const cards = document.querySelectorAll('.service-card');
  
  if (cards.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible'); // Dodamo razred "visible"
            observer.unobserve(entry.target); // Animacija se zgodi samo enkrat
          }
        });
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Kartica postane vidna, ko je 10 % viden
      }
    );

    cards.forEach((card) => {
      observer.observe(card);
    });
  }

  // Obdelava obrazcev
  const forms = document.querySelectorAll('form');
  if (forms.length > 0) {
    forms.forEach((form) => {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const button = form.querySelector('button');
        if (!button) return; // Preveri, ali gumb obstaja

        // Onemogoči gumb med pošiljanjem
        button.disabled = true;
        button.innerHTML = 'Pošiljam... <i class="fas fa-spinner fa-spin"></i>';

        try {
          const response = await fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
            headers: { 'Accept': 'application/json' }
          });

          if (response.ok) {
            // Prikaži sporočilo o uspehu
            button.innerHTML = 'Poslano! <i class="fas fa-check"></i>';
            form.reset();
            setTimeout(() => {
              button.innerHTML = 'Pošlji';
              button.disabled = false;
            }, 3000); // Ponastavi po 3 sekundah
          } else {
            throw new Error('Napaka pri pošiljanju');
          }
        } catch (error) {
          // Prikaži sporočilo o napaki
          button.innerHTML = 'Napaka! <i class="fas fa-exclamation"></i>';
          setTimeout(() => {
            button.innerHTML = 'Pošlji';
            button.disabled = false;
          }, 3000); // Ponastavi po 3 sekundah
        }
      });
    });
  }
});
