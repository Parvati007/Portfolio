    // AOS init
    AOS.init({ once: true, duration: 700, easing: 'ease-out-quart' });

    // Mobile menu toggle (visible only under 960px)
    const menuBtn = document.querySelector('.menu-btn');
    const mobile = document.getElementById('mobilePanel');
    const mq = window.matchMedia('(max-width: 960px)');
    const updateMenuVisibility = () => { menuBtn.style.display = mq.matches ? 'inline-grid' : 'none'; if(!mq.matches) mobile.style.display = 'none'; };
    updateMenuVisibility();
    mq.addEventListener('change', updateMenuVisibility);
    menuBtn?.addEventListener('click', () => { mobile.style.display = mobile.style.display === 'block' ? 'none' : 'block'; });
    mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobile.style.display = 'none'));

    // Animated skill bars
    const inView = (el) => {
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight - 80 && r.bottom > 0;
    };
    const bars = document.querySelectorAll('.skill');
    const animateBars = () => {
      bars.forEach(card => {
        const span = card.querySelector('.bar > span');
        if (inView(card) && span.style.width === '') {
          const pct = card.getAttribute('data-skill');
          span.style.transition = 'width 1200ms cubic-bezier(.2,.8,.2,1)';
          requestAnimationFrame(()=> span.style.width = pct + '%');
        }
      });
    };
    animateBars();
    window.addEventListener('scroll', animateBars);

    // Typewriter intro (simple)
    const typedTitle = document.getElementById('typedTitle');
    const fullText = typedTitle.innerHTML;
    typedTitle.innerHTML = '';
    let idx = 0;
    const type = () => {
      typedTitle.innerHTML = fullText.slice(0, idx++);
      if (idx <= fullText.length) requestAnimationFrame(type);
    };
    setTimeout(type, 300);

    // Modal controls
    document.querySelectorAll('.project .open').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = btn.closest('.project').getAttribute('data-modal');
        const n = document.querySelector(modal);
        n.classList.add('active');
      });
    });
    document.querySelectorAll('.modal').forEach(m => {
      m.addEventListener('click', (e) => { if(e.target === m) m.classList.remove('active'); });
      m.querySelector('.close').addEventListener('click', ()=> m.classList.remove('active'));
    });

    // Certificates carousel
    const track = document.getElementById('certTrack');
    const prev = document.getElementById('prevCert');
    const next = document.getElementById('nextCert');
    let offset = 0;
    const step = 316; // card width + gap
    next.addEventListener('click', () => { offset = Math.min(offset + step, (track.scrollWidth - track.clientWidth)); track.style.transform = `translateX(${-offset}px)`; });
    prev.addEventListener('click', () => { offset = Math.max(offset - step, 0); track.style.transform = `translateX(${-offset}px)`; });

    // Footer year
    document.getElementById('y').textContent = new Date().getFullYear();

    // Fake contact (demo only)
    const form = document.getElementById('contactForm');
    form.addEventListener('submit', () => {
      document.getElementById('formNote').textContent = 'Thanks! This demo uses a mailto link. Replace with Formspree/EmailJS to make it live.';
      window.location.href = `mailto:parvati000777@gmail.com?subject=${encodeURIComponent(form.subject.value)}&body=${encodeURIComponent(form.message.value + '\n\nFrom: ' + form.name.value + ' (' + form.email.value + ')')}`;
    });
