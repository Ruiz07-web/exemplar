"use strict";
(function(){
  const d = document;
  const html = d.documentElement;

  // Menu mobile acessível
  const toggle = d.getElementById('menu-toggle');
  const nav = d.getElementById('principal-nav');
  const navLinks = nav ? nav.querySelectorAll('a[data-nav]') : [];
  let lastFocused = null;

  function openNav(){
    if(!nav) return;
    lastFocused = d.activeElement;
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded','true');
    // Foco no primeiro link
    const firstLink = nav.querySelector('a');
    if(firstLink) firstLink.focus();
  }
  function closeNav(){
    if(!nav) return;
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded','false');
    if(lastFocused) toggle.focus();
  }
  if(toggle && nav){
    toggle.addEventListener('click', ()=>{
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      expanded ? closeNav() : openNav();
    });
    // Fechar ao clicar em links
    navLinks.forEach(a=>a.addEventListener('click', ()=> closeNav()));
    // Fechar com ESC
    d.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape' && nav.classList.contains('is-open')) closeNav();
    });
  }

  // Scroll suave respeitando prefers-reduced-motion
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  d.querySelectorAll('a[href^="#"]').forEach(link=>{
    link.addEventListener('click', function(e){
      const id = this.getAttribute('href').slice(1);
      if(!id) return;
      const target = d.getElementById(id);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior: prefersReduced ? 'auto' : 'smooth', block: 'start'});
        // Ajuste de foco para acessibilidade
        target.setAttribute('tabindex','-1');
        target.focus({preventScroll:true});
      }
    });
  });

  // Indicar seção ativa no menu ao rolar
  const sections = ['inicio','sobre','servicos','portfolio','depoimentos','contato']
    .map(id => d.getElementById(id)).filter(Boolean);
  const navMap = new Map();
  navLinks.forEach(a=>{ const hash = a.getAttribute('href').replace('#',''); navMap.set(hash, a); });
  const io = ('IntersectionObserver' in window) ? new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const id = entry.target.id;
        navLinks.forEach(a=>a.removeAttribute('aria-current'));
        const active = navMap.get(id);
        if(active){ active.setAttribute('aria-current','page'); }
      }
    });
  }, {threshold:0.6}) : null;
  if(io){ sections.forEach(sec=>io.observe(sec)); }

  // Revelar elementos com animação leve
  const revealEls = d.querySelectorAll('.section, .card, .media, .testimonial');
  if(io && !prefersReduced){
    revealEls.forEach(el=>{ el.classList.add('reveal'); io.observe(el); });
  }

  // Back to top
  const onScroll = () => {
    const backTop = document.getElementById('voltar-topo');
    if (backTop) {
      if (window.scrollY > 600) {
        backTop.classList.add('is-visible');
      } else {
        backTop.classList.remove('is-visible');
      }
    }
  };
  window.addEventListener('scroll', onScroll, {passive:true});
  backTop && backTop.addEventListener('click', ()=>{
    window.scrollTo({top:0, behavior: prefersReduced ? 'auto' : 'smooth'});
  });

  // Ano atual no rodapé
  const ano = d.getElementById('ano-atual');
  if(ano){ ano.textContent = String(new Date().getFullYear()); }

  // Validação do formulário
  const form = d.getElementById('form-contato');
  if(form){
    const nome = d.getElementById('nome');
    const email = d.getElementById('email');
    const telefone = d.getElementById('telefone');
    const assunto = d.getElementById('assunto');
    const mensagem = d.getElementById('mensagem');
    const lgpd = d.getElementById('lgpd');
    const feedback = d.getElementById('form-feedback');

    const errs = {
      nome: d.getElementById('erro-nome'),
      email: d.getElementById('erro-email'),
      telefone: d.getElementById('erro-telefone'),
      assunto: d.getElementById('erro-assunto'),
      mensagem: d.getElementById('erro-mensagem')
    };

    function setError(field, msg){ if(errs[field]) errs[field].textContent = msg || ''; }

    function validateNome(){
      if(!nome.value.trim()) { setError('nome','Informe seu nome.'); return false; }
      if(nome.value.trim().length < 2){ setError('nome','Nome muito curto.'); return false; }
      setError('nome',''); return true;
    }
    function validateEmail(){
      if(!email.value.trim()) { setError('email','Informe seu e-mail.'); return false; }
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim());
      if(!ok){ setError('email','E-mail inválido.'); return false; }
      setError('email',''); return true;
    }
    function maskPhone(v){
      const nums = v.replace(/\D/g,'').slice(0,11);
      if(nums.length <= 10){ return nums.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').trim(); }
      return nums.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3').trim();
    }
    function validateTelefone(){
      if(!telefone.value.trim()){ setError('telefone',''); return true; }
      const ok = /\(\d{2}\) \d{4,5}-\d{4}$/.test(telefone.value.trim());
      if(!ok){ setError('telefone','Telefone inválido.'); return false; }
      setError('telefone',''); return true;
    }
    function validateAssunto(){
      if(!assunto.value.trim()) { setError('assunto','Informe o assunto.'); return false; }
      if(assunto.value.trim().length < 3){ setError('assunto','Assunto muito curto.'); return false; }
      setError('assunto',''); return true;
    }
    function validateMensagem(){
      if(!mensagem.value.trim()) { setError('mensagem','Escreva sua mensagem.'); return false; }
      if(mensagem.value.trim().length < 10){ setError('mensagem','Mensagem muito curta.'); return false; }
      setError('mensagem',''); return true;
    }

    // Máscara telefone
    telefone && telefone.addEventListener('input', ()=>{ telefone.value = maskPhone(telefone.value); validateTelefone(); });

    nome.addEventListener('input', validateNome);
    email.addEventListener('input', validateEmail);
    assunto.addEventListener('input', validateAssunto);
    mensagem.addEventListener('input', validateMensagem);

    form.addEventListener('submit', function(e){
      const ok = [validateNome(), validateEmail(), validateTelefone(), validateAssunto(), validateMensagem()].every(Boolean) && lgpd.checked;
      if(!lgpd.checked){ feedback.textContent = 'Você deve autorizar o uso dos dados (LGPD).'; feedback.style.color = '#DC2626'; }
      if(!ok){ e.preventDefault(); return; }
      // Simulação de envio
      e.preventDefault();
      feedback.style.color = '#111827';
      feedback.textContent = 'Enviando...';
      setTimeout(()=>{
        feedback.style.color = '#16A34A';
        feedback.textContent = 'Mensagem enviada com sucesso! Em breve entraremos em contato.';
        form.reset();
      }, 900);
    });
  }
})();
