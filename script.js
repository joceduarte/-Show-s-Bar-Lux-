// Funcionalidades JavaScript para o Show's Bar Lux

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling para links internos
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efeito de fade-in nas seções ao fazer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar o observer a todas as seções
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Destacar link ativo na navegação
    const navLinks = document.querySelectorAll('nav a');
    const currentPage = window.location.pathname.split('/').pop();
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.style.color = '#fff';
            link.style.fontWeight = 'bold';
        }
    });

    // Validação e envio do formulário de contato
    const contatoForm = document.getElementById('contato-form');
    if (contatoForm) {
        contatoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefone = document.getElementById('telefone').value.trim();
            const tipoEvento = document.getElementById('tipo-evento').value;
            
            if (!nome || !email || !telefone || !tipoEvento) {
                alert('Por favor, preencha todos os campos obrigatórios.');
                return;
            }
            
            // Validação de email
            const emailRegex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
            if (!emailRegex.test(email)) {
                alert('Por favor, insira um e-mail válido.');
                return;
            }
            
            // Simulação de envio
            const submitButton = contatoForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.textContent = 'Enviando...';
            submitButton.disabled = true;
            
            setTimeout(() => {
                alert('Solicitação enviada com sucesso! Entraremos em contato em breve.');
                contatoForm.reset();
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Animação de contadores na página de portfólio
    const numeros = document.querySelectorAll('.numero h4');
    if (numeros.length > 0) {
        const animateNumbers = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.textContent.replace(/[^\d]/g, ''));
                    const isPercentage = target.textContent.includes('%');
                    const hasPlus = target.textContent.includes('+');
                    
                    let currentValue = 0;
                    const increment = Math.ceil(finalValue / 50);
                    
                    const timer = setInterval(() => {
                        currentValue += increment;
                        if (currentValue >= finalValue) {
                            currentValue = finalValue;
                            clearInterval(timer);
                        }
                        
                        let displayValue = currentValue;
                        if (hasPlus) displayValue += '+';
                        if (isPercentage) displayValue += '%';
                        
                        target.textContent = displayValue;
                    }, 30);
                    
                    numberObserver.unobserve(target);
                }
            });
        };
        
        const numberObserver = new IntersectionObserver(animateNumbers, {
            threshold: 0.5
        });
        
        numeros.forEach(numero => {
            numberObserver.observe(numero);
        });
    }

    // Efeito parallax suave no hero
    const heroImages = document.querySelectorAll('#hero img');
    if (heroImages.length > 0) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            heroImages.forEach(img => {
                img.style.transform = `translateY(${rate}px)`;
            });
        });
    }

    // Menu mobile responsivo
    const createMobileMenu = () => {
        const nav = document.querySelector('nav');
        const ul = nav.querySelector('ul');
        
        if (window.innerWidth <= 768) {
            if (!nav.querySelector('.mobile-toggle')) {
                const mobileToggle = document.createElement('button');
                mobileToggle.className = 'mobile-toggle';
                mobileToggle.innerHTML = '☰';
                mobileToggle.style.cssText = `
                    background: none;
                    border: none;
                    color: #d4af37;
                    font-size: 1.5rem;
                    cursor: pointer;
                    display: block;
                    margin: 0 auto;
                `;
                
                nav.insertBefore(mobileToggle, ul);
                ul.style.display = 'none';
                
                mobileToggle.addEventListener('click', () => {
                    ul.style.display = ul.style.display === 'none' ? 'flex' : 'none';
                });
            }
        } else {
            const mobileToggle = nav.querySelector('.mobile-toggle');
            if (mobileToggle) {
                mobileToggle.remove();
                ul.style.display = 'flex';
            }
        }
    };
    
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);
});

