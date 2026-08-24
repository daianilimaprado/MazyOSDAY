/**
 * VIENTO DEL CARIBE — LUXURY BEACH RESORT & SPA
 * Interações e Link Inteligente do WhatsApp (Vanilla JavaScript)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Número de WhatsApp demonstrativo (Placeholder sem dados reais)
  const WHATSAPP_PHONE = '5511999999999';

  // Elementos do DOM
  const header = document.getElementById('main-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const bookingForm = document.getElementById('booking-form');
  const checkinInput = document.getElementById('checkin-date');
  const checkoutInput = document.getElementById('checkout-date');
  const guestPickerGroup = document.getElementById('guest-picker-group');
  const guestTrigger = document.getElementById('guest-trigger');
  const guestPanel = document.getElementById('guest-panel');
  const guestSummary = document.getElementById('guest-summary');
  const adultsMinus = document.getElementById('adults-minus');
  const adultsPlus = document.getElementById('adults-plus');
  const adultsCount = document.getElementById('adults-count');
  const childrenMinus = document.getElementById('children-minus');
  const childrenPlus = document.getElementById('children-plus');
  const childrenCount = document.getElementById('children-count');
  const childrenAges = document.getElementById('children-ages');
  const guestConfirm = document.getElementById('guest-confirm');
  const suiteSelect = document.getElementById('suite-select');
  
  const suiteBookBtns = document.querySelectorAll('.btn-suite-book');
  const faqItems = document.querySelectorAll('.faq-item');
  
  const modal = document.getElementById('whatsapp-modal');
  const modalClose = document.getElementById('modal-close');
  const modalCancel = document.getElementById('btn-modal-cancel');
  const modalConfirm = document.getElementById('btn-modal-confirm');
  const modalMessageText = document.getElementById('modal-message-text');

  let adults = 2;
  let childAges = [];

  /* ==========================================
     1. INICIALIZAÇÃO DE DATAS AUTOMÁTICAS
     ========================================== */
  const today = new Date();
  const defaultCheckin = new Date(today);
  defaultCheckin.setDate(today.getDate() + 7); // Daqui a 7 dias

  const defaultCheckout = new Date(defaultCheckin);
  defaultCheckout.setDate(defaultCheckin.getDate() + 5); // 5 diárias

  const formatDateToInput = (date) => date.toISOString().split('T')[0];
  const formatDateBR = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
  };

  if (checkinInput && checkoutInput) {
    checkinInput.min = formatDateToInput(today);
    checkinInput.value = formatDateToInput(defaultCheckin);
    
    checkoutInput.min = formatDateToInput(defaultCheckin);
    checkoutInput.value = formatDateToInput(defaultCheckout);

    // Ajusta o checkout mínimo quando o checkin muda
    checkinInput.addEventListener('change', () => {
      const selectedCheckin = new Date(checkinInput.value);
      const nextDay = new Date(selectedCheckin);
      nextDay.setDate(selectedCheckin.getDate() + 1);
      
      checkoutInput.min = formatDateToInput(nextDay);
      if (new Date(checkoutInput.value) <= selectedCheckin) {
        const newCheckout = new Date(selectedCheckin);
        newCheckout.setDate(selectedCheckin.getDate() + 4);
        checkoutInput.value = formatDateToInput(newCheckout);
      }
    });
  }

  /* ==========================================
     2. SELETOR DE HÓSPEDES
     ========================================== */
  const pluralize = (count, singular, plural) => `${count} ${count === 1 ? singular : plural}`;

  function getGuestSummary() {
    const adultText = pluralize(adults, 'adulto', 'adultos');
    if (childAges.length === 0) return adultText;
    return `${adultText} e ${pluralize(childAges.length, 'menor', 'menores')}`;
  }

  function classifyMinorAge(age) {
    if (age <= 5) return 'criança pequena';
    if (age <= 12) return 'criança';
    return 'adolescente';
  }

  function getGuestDetails() {
    const lines = [getGuestSummary()];
    childAges.forEach((age, index) => {
      lines.push(`   Criança ${index + 1}: ${pluralize(age, 'ano', 'anos')}`);
    });
    return lines.join('\n');
  }

  function renderChildAgeSelectors() {
    if (!childrenAges) return;

    childrenAges.innerHTML = '';
    childAges.forEach((age, index) => {
      const row = document.createElement('div');
      row.className = 'child-age-row';

      const info = document.createElement('div');
      info.className = 'child-age-info';

      const label = document.createElement('label');
      label.htmlFor = `child-age-${index}`;
      label.textContent = `Criança ${index + 1}`;

      const category = document.createElement('span');
      category.className = 'child-age-category';
      category.textContent = classifyMinorAge(age);

      const select = document.createElement('select');
      select.id = `child-age-${index}`;
      select.className = 'child-age-select';
      select.setAttribute('aria-label', `Idade da criança ${index + 1}`);

      for (let optionAge = 0; optionAge <= 17; optionAge += 1) {
        const option = document.createElement('option');
        option.value = optionAge;
        option.textContent = pluralize(optionAge, 'ano', 'anos');
        option.selected = optionAge === age;
        select.appendChild(option);
      }

      select.addEventListener('change', () => {
        childAges[index] = Number(select.value);
        category.textContent = classifyMinorAge(childAges[index]);
        select.dataset.ageGroup = classifyMinorAge(childAges[index]);
      });

      select.dataset.ageGroup = classifyMinorAge(age);
      info.append(label, category);
      row.append(info, select);
      childrenAges.appendChild(row);
    });
  }

  function updateGuestPicker() {
    if (adultsCount) adultsCount.textContent = adults;
    if (childrenCount) childrenCount.textContent = childAges.length;
    if (guestSummary) guestSummary.textContent = getGuestSummary();
    if (adultsMinus) adultsMinus.disabled = adults === 1;
    if (childrenMinus) childrenMinus.disabled = childAges.length === 0;
    renderChildAgeSelectors();
  }

  function setGuestPanel(open) {
    if (!guestPickerGroup || !guestTrigger || !guestPanel) return;
    guestPickerGroup.classList.toggle('is-open', open);
    guestTrigger.setAttribute('aria-expanded', String(open));
    guestPanel.setAttribute('aria-hidden', String(!open));
  }

  if (guestTrigger) {
    guestTrigger.addEventListener('click', (event) => {
      event.stopPropagation();
      const isOpen = guestPickerGroup.classList.contains('is-open');
      setGuestPanel(!isOpen);
    });
  }

  if (guestPanel) {
    guestPanel.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  }

  if (adultsMinus) adultsMinus.addEventListener('click', () => {
    adults = Math.max(1, adults - 1);
    updateGuestPicker();
  });

  if (adultsPlus) adultsPlus.addEventListener('click', () => {
    adults += 1;
    updateGuestPicker();
  });

  if (childrenMinus) childrenMinus.addEventListener('click', () => {
    childAges.pop();
    updateGuestPicker();
  });

  if (childrenPlus) childrenPlus.addEventListener('click', () => {
    childAges.push(0);
    updateGuestPicker();
  });

  if (guestConfirm) guestConfirm.addEventListener('click', () => {
    setGuestPanel(false);
    guestTrigger.focus();
  });

  document.addEventListener('click', (event) => {
    if (guestPickerGroup && !guestPickerGroup.contains(event.target)) {
      setGuestPanel(false);
    }
  });

  updateGuestPicker();

  /* ==========================================
     3. GERAÇÃO DE MENSAGEM DO WHATSAPP
     ========================================== */
  function buildWhatsAppMessage(checkin, checkout, guests, suite) {
    const checkinBR = formatDateBR(checkin);
    const checkoutBR = formatDateBR(checkout);

    return `Olá! Gostaria de consultar disponibilidade no Viento del Caribe:

📅 Check-in: ${checkinBR}
📅 Check-out: ${checkoutBR}
👥 Hóspedes: ${guests}
🏨 Acomodação: ${suite}

Poderiam me informar os valores para este período e os benefícios exclusivos da reserva direta?`;
  }

  function openWhatsAppPreview(messageText) {
    const encodedMessage = encodeURIComponent(messageText);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

    if (modal && modalMessageText && modalConfirm) {
      modalMessageText.textContent = messageText;
      modalConfirm.href = whatsappUrl;
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    } else {
      window.open(whatsappUrl, '_blank');
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  /* ==========================================
     4. EVENTOS DE FORMULÁRIO E SUÍTES
     ========================================== */
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const checkin = checkinInput.value;
      const checkout = checkoutInput.value;
      const guests = getGuestDetails();
      const suite = suiteSelect.value;

      const message = buildWhatsAppMessage(checkin, checkout, guests, suite);
      openWhatsAppPreview(message);
    });
  }

  // Cliques nos botões de cada card de suíte
  suiteBookBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const suiteName = btn.getAttribute('data-suite');
      
      if (suiteSelect) {
        suiteSelect.value = suiteName;
      }

      // Rola suavemente até a barra de consulta e destaca o campo
      const bookingBar = document.getElementById('consulta');
      if (bookingBar) {
        bookingBar.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Efeito visual sutil de destaque
        const card = bookingBar.querySelector('.booking-bar-card');
        if (card) {
          card.style.transform = 'scale(1.02)';
          card.style.borderColor = 'var(--color-gold)';
          setTimeout(() => {
            card.style.transform = '';
            card.style.borderColor = '';
          }, 600);
        }
      }
    });
  });

  /* ==========================================
     5. FAQ ACCORDION
     ========================================== */
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Fecha os outros
        faqItems.forEach(otherItem => {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-question');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        });

        // Alterna o atual
        if (!isActive) {
          item.classList.add('active');
          questionBtn.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  /* ==========================================
     6. HEADER SCROLL & MENU MOBILE
     ========================================== */
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', String(navMenu.classList.contains('active')));
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================
     7. EVENTOS DO MODAL
     ========================================== */
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalCancel) modalCancel.addEventListener('click', closeModal);
  
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && guestPickerGroup && guestPickerGroup.classList.contains('is-open')) {
      setGuestPanel(false);
      guestTrigger.focus();
    }

    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
});
