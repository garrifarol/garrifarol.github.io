// ================================ Toogle Dark Light Mode ===========================
const themeBtn = document.querySelector('.theme-btn');
const logoSpan = document.querySelector('.logo-span');

const userTheme = localStorage.getItem('theme');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;

const themeCheck = () => {
    if (userTheme === 'dark' || (!userTheme && systemTheme)) {
        document.documentElement.classList.add('dark');
        logoSpan.classList.add('text-ter-color');
        themeBtn.classList.add('bxs-sun', 'text-ter-color');
        return;
    }
    logoSpan.classList.add('text-qua-color');
    themeBtn.classList.add('bxs-moon', 'text-qua-color');
}

const themeSwitch = () => {
    if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        logoSpan.classList.add('text-qua-color');
        logoSpan.classList.remove('text-ter-color');
        themeBtn.classList.add('bxs-moon', 'text-qua-color');
        themeBtn.classList.remove('bxs-sun', 'text-ter-color');
        localStorage.setItem('theme', 'light');
        return;
    }
    logoSpan.classList.add('text-ter-color');
    logoSpan.classList.remove('text-qua-color');
    themeBtn.classList.add('bxs-sun', 'text-ter-color');
    themeBtn.classList.remove('bxs-moon', 'text-qua-color');
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
}

themeBtn.addEventListener('click', () => {
    themeSwitch();
});

themeCheck();

// ===================== Loading ======================
const loading = document.querySelector('#loading');
const loadingContent = document.querySelector('#loading .content');

const loadingText = document.querySelector('.loading-text');

const textLoad = () => {
    setTimeout(() => {
        loadingText.textContent = 'hola.';
    }, 0);
    setTimeout(() => {
        loadingText.textContent = 'こんにちは';
    }, 150);
    setTimeout(() => {
        loadingText.textContent = 'guten tag.';
    }, 300);
    setTimeout(() => {
        loadingText.textContent = 'shalom.';
    }, 450);
    setTimeout(() => {
        loadingText.textContent = '您好';
    }, 600);
    setTimeout(() => {
        loadingText.textContent = 'salve.';
    }, 750);
    setTimeout(() => {
        loadingText.textContent = 'नमस्ते';
    }, 900);
    setTimeout(() => {
        loadingText.textContent = 'bonjour.';
    }, 1040);
    setTimeout(() => {
        loadingText.textContent = 'kumusta.';
    }, 1200);
}

window.addEventListener('load', () => {
    textLoad();
    setTimeout(() => {
        // document.documentElement.classList.add('overflow-auto')
        loadingContent.classList.add('scale-0');
    }, 1700);
    setTimeout(() => {
        document.documentElement.classList.add('overflow-auto')
        loading.classList.add('hidden');
    }, 1900);
})

// ======================= Number of years as software Engineer ========================

const startDate = new Date('2021', '01');
const currentDate = new Date();
const diffYear = currentDate.getFullYear() - startDate.getFullYear();

const years = document.querySelector('#years');

years.textContent = diffYear

// header shadow

const header = document.querySelector

// ============================ Scroll to section ===============================

const navigation = document.querySelector("#header");

const navigationHeight = navigation.offsetHeight;

document.documentElement.style.setProperty(
  "--scroll-padding",
  navigationHeight + "px"
);

const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.scrollY;

    for(const section of sections) {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 400;

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(`.nav-list a[href*=${section.id}]`).classList.add('active-link')
        }
        else document.querySelector(`.nav-list a[href*=${section.id}]`).classList.remove('active-link')
    }
}

scrollActive();
window.addEventListener('scroll', scrollActive);

// ========================== About me animation ==========================

const aboutMe = document.querySelector('.about-me');
const aboutSkills = document.querySelector('.about-skills');
const tldr = document.querySelector('.tldr');
const aboutBack = document.querySelector('.about-back');

tldr.addEventListener('click', () => {
    aboutMe.classList.add('hidden');
    aboutSkills.classList.remove('hidden');
    document.getElementById("about").scrollIntoView({behavior: 'smooth'});
})

aboutBack.addEventListener('click', () => {
    aboutMe.classList.remove('hidden');
    aboutSkills.classList.add('hidden');
    document.getElementById("about").scrollIntoView({behavior: 'smooth'});
})

// ============================== get contact form details ===========================

const getContactFormFields = () => {
    return {
        name: document.querySelector('#name'),
        email: document.querySelector('#email'),
        message: document.querySelector('#message'),
    }
}

// send contact form

const sendEmail = () => {
    const {name, email, message} = getContactFormFields();
    const params = {
        name: name.value.trim(),
        email: email.value.trim(),
        message: message.value.trim(),
    }
    emailjs.send('service_lh78hme', 'template_t5xu37p', params)
        .then( (response) => {
            const msgSuccessful = document.querySelector('#msgSuccessful')
            msgSuccessful.classList.add('flex');
            msgSuccessful.classList.remove('hidden');

            setTimeout(() => {
                msgSuccessful.classList.remove('flex');
                msgSuccessful.classList.add('hidden');
            }, 5000)
        })
        .catch( () => {
            const msgUnsuccessful = document.querySelector('#msgUnsuccessful')
            msgUnsuccessful.classList.add('flex');
            msgUnsuccessful.classList.remove('hidden');
            
            setTimeout(() => {
                msgSuccessful.classList.remove('flex');
                msgSuccessful.classList.add('hidden');
            }, 5000)
        })
}

// contact form validation
const contactForm = document.querySelector('#contactForm');

const pushError = (field, message) => {
    const parentEl = field.parentElement;
    if(!field.classList.contains('error')) field.classList.add('error');
    
    const [errorTextExist] = document.getElementsByClassName(`error-text ${field.id}`);
    if(errorTextExist) errorTextExist.remove();
    const errorText = document.createElement('span');
    errorText.textContent = message;
    errorText.classList.add('error-text', field.id);
    parentEl.parentElement.append(errorText);
}

const removeError = (field) => {
    field.classList.remove('error');
    const [errorText] = document.getElementsByClassName(`error-text ${field.id}`);
    if(errorText) {
        errorText.remove();
    }
}

const validateContactForm = () => {
    let valid = true;
    const validEmailRegex = /^[a-z0-9.]{1,64}@[a-z0-9.]{1,64}$/i;
    const {name, email, message} = getContactFormFields();

    if(!name.value.trim()) {
        pushError(name, 'Name is required.');
        valid = false;
    }
    else {
        removeError(name);
    }

    if(!email.value.trim()) {
        pushError(email, 'Email is required.');
        valid = false;
    }
    else if(!email.value.trim().match(validEmailRegex)) {
        pushError(email, 'Email is invalid.');
        valid = false;
    }
    else {
        removeError(email);
    }

    if(!message.value.trim()) {
        pushError(message, 'Message is required.');
        valid = false;
    }
    else {
        removeError(message);
    }

    return valid;
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if(validateContactForm()) {
        sendEmail();
        contactForm.reset();
    }
})

// close toast

const toastCloseBtns = document.querySelectorAll('.toast button');

for(const toastCloseBtn of toastCloseBtns) {
    toastCloseBtn.addEventListener('click', () => {
        toastCloseBtn.closest('.toast').classList.add('hidden')
        toastCloseBtn.closest('.toast').classList.remove('flex');
    }) 
}

