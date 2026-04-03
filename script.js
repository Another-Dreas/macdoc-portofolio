document.addEventListener('DOMContentLoaded', () => {

    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // ==========================================
    // 1. LENIS SMOOTH SCROLL INIT
    // ==========================================
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // ==========================================
    // 2. DATA-DRIVEN ARCHITECTURE (SKILLS & TIMELINE)
    // ==========================================
    const skillsData = [{
            icon: "fab fa-js",
            title: "JavaScript (ES6+)",
            desc: "Manipulasi DOM Dinamis & Logika Sistem",
            type: "wide"
        },
        {
            icon: "fab fa-html5",
            title: "HTML5",
            type: "square"
        },
        {
            icon: "fab fa-css3-alt",
            title: "CSS3",
            type: "square"
        },
        {
            icon: "fab fa-react",
            title: "Next.js",
            type: "square"
        },
        {
            icon: "fas fa-mobile-alt",
            title: "Capacitor",
            type: "square"
        },
        {
            icon: "fas fa-database",
            title: "SQLite & Relational DB",
            desc: "Penyimpanan Lokal & Optimasi Query",
            type: "wide"
        }
    ];

    const timelineData = [{
            date: "2026 - Saat Ini",
            title: "CTO & Lead Engineer",
            desc: "Memimpin visi teknis untuk platform berbasis AI terkemuka. Bertanggung jawab atas ketersediaan server tinggi."
        },
        {
            date: "2024 - 2026",
            title: "Senior Frontend Developer",
            desc: "Membangun antarmuka interaktif dan arsitektur micro-frontend enterprise global berskala jutaan pengguna."
        },
        {
            date: "2023 - 2024",
            title: "Junior Fullstack Developer",
            desc: "Mulai mendalami backend dengan Node.js. Menjadi finalis di berbagai Hackathon tingkat nasional."
        },
        {
            date: "2021 - 2023",
            title: "Intermediate UI/UX Designer",
            desc: "Berhasil merancang prototipe aplikasi dengan fokus pada pengalaman pengguna (UX) yang intuitif."
        }
    ];

    const quoteWords = ["Inovasi", "dimulai", "ketika", "logika", "bertemu", "imajinasi."];

    const renderSkills = () => {
        const container = document.getElementById('skills-container');
        container.innerHTML = '';
        skillsData.forEach((skill, index) => {
            const delay = (index % 3) * 0.15;
            let html = `<div class="skill-card modern-skill bento-${skill.type} animate-on-scroll" style="transition-delay: ${delay}s">
                <div class="skill-icon-wrap magnetic-btn"><i class="${skill.icon}"></i></div>`;
            if (skill.type === 'wide') {
                html += `<div class="skill-text"><span class="skill-name">${skill.title}</span>
                         <p class="skill-desc">${skill.desc}</p></div>`;
            } else {
                html += `<span class="skill-name">${skill.title}</span>`;
            }
            html += `</div>`;
            container.innerHTML += html;
        });
    };

    const renderTimeline = () => {
        const container = document.getElementById('timeline-container');
        container.innerHTML = '';
        timelineData.forEach((item, index) => {
            const delay = (index % 4) * 0.15;
            container.innerHTML += `
                <div class="carousel-card timeline-element" style="transition-delay: ${delay}s">
                    <span class="track-date">${item.date}</span>
                    <h4>${item.title}</h4>
                    <p>${item.desc}</p>
                </div>
            `;
        });
    };

    const renderQuote = () => {
        const container = document.getElementById('quote-container');
        container.innerHTML = '';
        quoteWords.forEach(word => {
            container.innerHTML += `<span class="q-word">${word}</span> `;
        });
    };

    renderSkills();
    renderTimeline();
    renderQuote();

    // ==========================================
    // 3. MAGNETIC BUTTONS PHYSICS
    // ==========================================
    const magneticElements = document.querySelectorAll('.magnetic-btn');

    if (window.innerWidth > 992) {
        magneticElements.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const h = rect.width / 2;
                const v = rect.height / 2;
                const x = e.clientX - rect.left - h;
                const y = e.clientY - rect.top - v;
                btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = `translate(0px, 0px)`;
            });
        });
    }

    // ==========================================
    // 4. LOADER & HERO ANIMATION (SAFE FADE-UP)
    // ==========================================
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';

                const heroTextContainer = document.querySelector('.hero-text');
                const heroImgContainer = document.querySelector('.hero-img');

                if (heroTextContainer) heroTextContainer.classList.add('is-visible');

                if (heroImgContainer) {
                    heroImgContainer.classList.add('is-visible');
                    setTimeout(() => {
                        const imgElement = heroImgContainer.querySelector('img');
                        if (imgElement) {
                            imgElement.classList.add('glitch-active');
                            setTimeout(() => {
                                imgElement.classList.remove('glitch-active');
                            }, 600);
                        }
                    }, 1500);
                }
            }, 300);
        }, 400);
    }

    // ==========================================
    // 5. THEME TOGGLE 
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const header = document.querySelector('.top-header');

    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            body.classList.replace('light-mode', 'dark-mode');
            if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
        }

        themeToggleBtn.addEventListener('click', () => {
            if (body.classList.contains('light-mode')) {
                body.classList.replace('light-mode', 'dark-mode');
                if (themeIcon) themeIcon.classList.replace('fa-moon', 'fa-sun');
                localStorage.setItem('theme', 'dark');
            } else {
                body.classList.replace('dark-mode', 'light-mode');
                if (themeIcon) themeIcon.classList.replace('fa-sun', 'fa-moon');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) header.classList.add('scrolled');
            else header.classList.remove('scrolled');
        });
    }

    // ==========================================
    // 6. MASTER SCROLL ALIGNMENT (Integrated with Lenis)
    // ==========================================
    const navLinks = document.querySelectorAll('.nav-btn, .nav-trigger');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#') && targetId !== '#') {
                e.preventDefault();

                if (targetId === '#home') {
                    history.pushState(null, null, targetId);
                    lenis.scrollTo(0, {
                        duration: 1.2
                    });
                    return;
                }

                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    history.pushState(null, null, targetId);

                    const headerNode = document.querySelector('.top-header');
                    const dockNode = document.querySelector('.sidebar');
                    const headerHeight = headerNode ? headerNode.offsetHeight : 80;
                    const dockHeight = dockNode ? dockNode.offsetHeight + 30 : 80;

                    const targetRect = targetSection.getBoundingClientRect();
                    const targetHeight = targetRect.height;
                    const windowHeight = window.innerHeight;

                    const absoluteTop = targetRect.top + window.scrollY;
                    const availableSpace = windowHeight - headerHeight - dockHeight;

                    let targetPosition;
                    if (targetHeight < availableSpace) {
                        const offsetTengah = (availableSpace - targetHeight) / 2;
                        targetPosition = absoluteTop - headerHeight - offsetTengah;
                    } else {
                        targetPosition = absoluteTop - headerHeight - 15;
                    }

                    targetPosition = Math.max(0, targetPosition);
                    lenis.scrollTo(targetPosition, {
                        duration: 1.2
                    });
                }
            }
        });
    });

    const sections = document.querySelectorAll('.section');
    const sidebarLinks = document.querySelectorAll('.nav-btn');
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        let current = '';
        if (backToTopBtn) {
            if (window.scrollY > 300) backToTopBtn.classList.add('show');
            else backToTopBtn.classList.remove('show');
        }
        const headerOffset = document.querySelector('.top-header') ? document.querySelector('.top-header').offsetHeight + 40 : 100;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= (sectionTop - headerOffset - (window.innerHeight / 4))) {
                current = section.getAttribute('id');
            }
        });
        sidebarLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (current && href && href.includes(current)) link.classList.add('active');
        });
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            lenis.scrollTo(0, {
                duration: 1.2
            });
        });
    }

    // ==========================================
    // 7. CARDS FADE UP OBSERVER
    // ==========================================
    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-anim');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    // Memberikan delay sedikit agar Data-Driven DOM siap diobserve
    setTimeout(() => {
        const elementsToAnimate = document.querySelectorAll('.section-title, .about-brief-text, #open-full-about, .modern-skill, .par-card, .project-minimal > a, .contact-minimal > *');
        elementsToAnimate.forEach((el, index) => {
            el.classList.add('animate-on-scroll');
            if (!el.style.transitionDelay) el.style.transitionDelay = `${(index % 3) * 0.15}s`;
            scrollObserver.observe(el);
        });
    }, 100);

    // ==========================================
    // 8. BOTTOM SHEET MODAL (FREEZE & PAUSE LENIS)
    // ==========================================
    const bottomSheetModal = document.getElementById('full-about-page');
    let modalLenis;
    if (bottomSheetModal) {
        bottomSheetModal.addEventListener('wheel', (e) => {
            e.stopPropagation();
        });

        bottomSheetModal.addEventListener('touchmove', (e) => {
            e.stopPropagation();
        });
    }
    const btnOpenFullAbout = document.getElementById('open-full-about');
    const btnCloseFullAbout = document.getElementById('close-full-about');
    const editorialPhoto = document.querySelector('.single-photo-featureSR');
    const modalBackdrop = document.getElementById('modal-backdrop');

    let scrollPosition = 0;

    const closeOverlayAction = () => {
        bottomSheetModal.classList.remove('active');
        if (modalBackdrop) modalBackdrop.classList.remove('active');

        document.body.classList.remove('modal-open-freeze');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollPosition);

        lenis.start();

        if (editorialPhoto) setTimeout(() => {
            editorialPhoto.classList.remove('overlay-animate-in');
        }, 400);
    };

    if (btnOpenFullAbout && bottomSheetModal) {
        btnOpenFullAbout.addEventListener('click', (e) => {
            e.preventDefault();
            scrollPosition = window.scrollY;

            lenis.stop();
            modalLenis = new Lenis({
                wrapper: bottomSheetModal,
                content: bottomSheetModal.querySelector('.full-page-content'),
                duration: 1.2,
                smoothWheel: true
            });

            // LOOP RAF UNTUK MODAL
            function modalRaf(time) {
                modalLenis.raf(time);
                requestAnimationFrame(modalRaf);
            }
            requestAnimationFrame(modalRaf);

            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPosition}px`;
            document.body.style.width = '100%';

            document.body.classList.add('modal-open-freeze');
            bottomSheetModal.classList.add('active');
            if (modalBackdrop) modalBackdrop.classList.add('active');

            if (editorialPhoto) editorialPhoto.classList.add('overlay-animate-in');
            history.pushState({
                overlayOpen: true
            }, null, "#about-detail");
        });
    }

    const handleModalClose = () => {
        if (history.state && history.state.overlayOpen) {
            history.back();
        } else {
            closeOverlayAction();
            if (window.location.hash === '#about-detail') history.pushState("", document.title, window.location.pathname + window.location.search);
        }
    };

    if (btnCloseFullAbout) btnCloseFullAbout.addEventListener('click', handleModalClose);
    if (modalBackdrop) modalBackdrop.addEventListener('click', handleModalClose);
    window.addEventListener('popstate', (e) => {
        if (bottomSheetModal && bottomSheetModal.classList.contains('active')) closeOverlayAction();
    });

    // 9. MODAL OBSERVER
    if (bottomSheetModal) {
        const overlayObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-anim');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: bottomSheetModal,
            threshold: 0.1,
            rootMargin: "0px 0px -20px 0px"
        });

        setTimeout(() => {
            const modalTitles = document.querySelectorAll('.journey-sectionSR .editorial-title, .journey-sectionSR .underline, .overlay-quote-section');
            modalTitles.forEach((el, index) => {
                el.classList.add('overlay-anim');
                el.style.transitionDelay = `${index * 0.1}s`;
                overlayObserver.observe(el);
            });

            const timelineItems = document.querySelectorAll('.swipe-hint, .carousel-card');
            timelineItems.forEach((el, index) => {
                el.classList.add('timeline-element');
                if (!el.style.transitionDelay) el.style.transitionDelay = `${(index % 4) * 0.15}s`;
                overlayObserver.observe(el);
            });
        }, 100);
    }

    // 10. ANIMASI QUOTE EKSKLUSIF
    const quoteSection = document.getElementById('overlay-quote');
    if (quoteSection && bottomSheetModal) {
        const quoteObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('load-quote-animate');
            });
        }, {
            root: bottomSheetModal,
            threshold: 0.5
        });
        quoteObserver.observe(quoteSection);
    }
});