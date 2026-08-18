// ---------- Carousel ----------
const slidesData = [
  {
    badge: 'Discover',
    title: 'Stories Worth Taking the Time to Read',
    desc: "Take a moment to explore Horizone Journal — thoughtful stories, inspiring journeys, and ideas written for curious minds who love to discover the world at their own pace.",
    author: 'Theodore Reginald',
    img: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=100&q=80',
    date: '24 Jan 2024',
    read: '10 min read',

    i18n: {
      fr: {
        badge: 'Découvrir',
        title: 'Des histoires qui méritent votre temps',
        desc: "Prenez le temps de découvrir Horizone Journal — des récits inspirants, des voyages authentiques et des idées pensées pour les esprits curieux qui aiment découvrir le monde à leur rythme."
      },

      es: {
        badge: 'Descubrir',
        title: 'Historias que merecen tu tiempo',
        desc: 'Tómate un momento para descubrir Horizone Journal — historias inspiradoras, viajes auténticos e ideas para mentes curiosas que disfrutan descubriendo el mundo a su propio ritmo.'
      }
    }
  },

  {
    badge: 'Inspiration',
    title: 'Read. Explore. See the World Differently.',
    desc: "From inspiring journeys to thoughtful reflections, every article invites you to slow down, discover something new, and see familiar places from a different perspective.",
    author: 'Amara Voss',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    date: '02 Feb 2024',
    read: '7 min read',

    i18n: {
      fr: {
        badge: 'Inspiration',
        title: 'Lisez. Explorez. Voyez le monde autrement.',
        desc: "Des voyages inspirants aux réflexions personnelles, chaque article vous invite à ralentir, à découvrir quelque chose de nouveau et à regarder les lieux familiers sous un autre angle."
      },

      es: {
        badge: 'Inspiración',
        title: 'Lee. Explora. Mira el mundo de otra manera.',
        desc: 'Desde viajes inspiradores hasta reflexiones personales, cada artículo te invita a detenerte, descubrir algo nuevo y observar lugares conocidos desde una perspectiva diferente.'
      }
    }
  },

  {
    badge: 'Journal',
    title: 'Your Next Favorite Story Is Waiting',
    desc: "There is always another story to discover. Browse the journal, find a subject that speaks to you, and let each article take you somewhere new.",
    author: 'Julien Ferreira',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    date: '19 Feb 2024',
    read: '6 min read',

    i18n: {
      fr: {
        badge: 'Journal',
        title: 'Votre prochaine histoire préférée vous attend',
        desc: "Il y a toujours une nouvelle histoire à découvrir. Parcourez le journal, choisissez un sujet qui vous interpelle et laissez chaque article vous emmener ailleurs."
      },

      es: {
        badge: 'Diario',
        title: 'Tu próxima historia favorita te está esperando',
        desc: 'Siempre hay una nueva historia por descubrir. Explora el diario, encuentra un tema que te interese y deja que cada artículo te lleve a un lugar diferente.'
      }
    }
  }
];

const slideEls = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.dot');
let current = 0, timer;

function renderSlide(i) {
  slideEls.forEach((s, idx) => s.classList.toggle('active', idx === i));
  dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
  current = i;
  applySlideText();
}

function nextSlide() { renderSlide((current + 1) % slidesData.length); }
function startAutoplay() { timer = setInterval(nextSlide, 5000); }
function stopAutoplay() { clearInterval(timer); }

dots.forEach(d => {
  d.addEventListener('click', () => {
    renderSlide(parseInt(d.dataset.dot));
    stopAutoplay(); startAutoplay();
  });
});

const heroEl = document.getElementById('slides').parentElement;
heroEl.addEventListener('mouseenter', stopAutoplay);
heroEl.addEventListener('mouseleave', startAutoplay);

let touchX = null;
heroEl.addEventListener('touchstart', e => touchX = e.touches[0].clientX, { passive: true });
heroEl.addEventListener('touchend', e => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 40) {
    renderSlide(dx > 0 ? (current - 1 + slidesData.length) % slidesData.length : (current + 1) % slidesData.length);
    stopAutoplay(); startAutoplay();
  }
  touchX = null;
}, { passive: true });

startAutoplay();

// ---------- Compteurs de style panneau à volets ----------
function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = parseInt(el.dataset.decimals || '0');
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const value = target * eased;
    el.textContent = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-US');
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = (decimals ? target.toFixed(decimals) : target.toLocaleString('en-US')) + suffix;
  }
  requestAnimationFrame(tick);
}

window.addEventListener('load', () => {
  document.querySelectorAll('.counter').forEach(el => animateCounter(el));
});

// ---------- Menu burger mobile avec panneau coulissant ----------
const burgerBtn = document.getElementById('burgerBtn');
const drawer = document.getElementById('drawer');
const backdrop = document.getElementById('backdrop');
const closeDrawerBtn = document.getElementById('closeDrawer');

function openDrawer() {
  burgerBtn.classList.add('open');
  drawer.classList.add('open');
  backdrop.classList.remove('opacity-0', 'pointer-events-none');
  backdrop.classList.add('opacity-100');
}
function closeDrawerFn() {
  burgerBtn.classList.remove('open');
  drawer.classList.remove('open');
  backdrop.classList.add('opacity-0', 'pointer-events-none');
  backdrop.classList.remove('opacity-100');
}
burgerBtn.addEventListener('click', () => drawer.classList.contains('open') ? closeDrawerFn() : openDrawer());
closeDrawerBtn.addEventListener('click', closeDrawerFn);
backdrop.addEventListener('click', closeDrawerFn);

// ---------- Défilement fluide pour tous les liens d'ancre internes ----------
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    // animation de tap sur les liens du drawer mobile uniquement
    const isDrawerLink = link.closest('#drawer ul');
    if (isDrawerLink) {
      link.classList.add('nav-tapped');
    }

    // ferme le drawer mobile ou le drawer de filtres s'ils sont ouverts
    // (délai court pour laisser l'animation se voir avant la fermeture)
    setTimeout(() => {
      if (typeof closeDrawerFn === 'function') closeDrawerFn();
      if (typeof closeFilterDrawerFn === 'function') closeFilterDrawerFn();
      if (isDrawerLink) link.classList.remove('nav-tapped');
    }, 180);

    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 480); 
  });
});

// ---------- Bascule du mode sombre ----------
// Par défaut, utilise la préférence système du visiteur au chargement (session uniquement —
// remplacez par votre propre persistance, par ex. un paramètre utilisateur sauvegardé, dans votre vraie app).
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeToggleDrawer = document.getElementById('themeToggleDrawer');
const themeKnob = themeToggle.querySelector('.knob');

function setTheme(dark) {
  root.classList.toggle('dark', dark);

  themeKnob.innerHTML = dark
    ? '<i class="fa-solid fa-sun"></i>'
    : '<i class="fa-solid fa-moon"></i>';

  localStorage.setItem(
    'horizone_theme',
    dark ? 'dark' : 'light'
  );
}

const savedTheme = localStorage.getItem('horizone_theme');
setTheme(savedTheme === 'dark'); // clair si rien n'est sauvegardé, sinon respecte le choix précédent

function toggleTheme() {
  setTheme(!root.classList.contains('dark'));
}

themeToggle.addEventListener('click', toggleTheme);
themeToggleDrawer.addEventListener('click', toggleTheme);


// ---------- Navbar : transparente en haut, fixe au défilement ----------
const siteHeader = document.getElementById('siteHeader');
function updateHeaderOnScroll() {
  siteHeader.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
updateHeaderOnScroll();

/* =====================================================================
   LOGIQUE DE LA SECTION BLOG
   Source : API publique DEV.to (https://dev.to/api/articles) — gratuite,
   sans clé requise. Si la requête échoue (prévisualisation hors ligne / CORS
   dans un visualiseur sandboxé) on tombe sur des articles fictifs locaux
   pour que l'UI fonctionne toujours. "Ajouter un article" et "commentaires"
   sont seulement en mémoire dans cette démo — branchez-les sur votre propre
   backend Express/Prisma pour les persister réellement.
===================================================================== */

let articles = [];
let comments = {};      // { id: [{author,text,date}] }
let ratings = {};        // { id: {avg, count, mine} }
let reactions = {};       // { id: {liked, likeCount, thumbs, heart, wow} }
let favorites = new Set();
let filters = { search: '', category: null, author: null, sortBy: 'date', order: 'desc' };

const grid = document.getElementById('articleGrid');
const loadingMsg = document.getElementById('loadingMsg');

// ---------- repli fictif ----------
const MOCK_ARTICLES = [
  { id: 'm1', title: 'Ten Days Crossing the Andes on Foot', description: 'A slow, deliberate trek through switchbacks, thin air, and villages that time forgot.', cover_image: 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&w=900&q=80', user: { name: 'Elena Marchetti', profile_image_90: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80' }, tag_list: ['hiking', 'andes'], published_at: '2024-01-20T10:00:00Z', positive_reactions_count: 214, comments_count: 2, body: 'The first morning above 3,000 meters teaches you to walk differently — shorter steps, longer breaths. Somewhere past the tree line, the trail stops pretending to be gentle.\n\nWe passed through three villages that week, each one quieter than the last, each one generous anyway. By day seven the silence stopped feeling empty and started feeling earned.' },
  { id: 'm2', title: 'What the Sahara Teaches You About Stillness', description: 'Notes from three nights camping under a sky with no light pollution for two hundred kilometers.', cover_image: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=900&q=80', user: { name: 'Julien Ferreira', profile_image_90: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=80&q=80' }, tag_list: ['desert', 'solo-travel'], published_at: '2024-02-19T10:00:00Z', positive_reactions_count: 341, comments_count: 1, body: 'There is a particular kind of quiet that only exists far from roads. The first night it is unsettling; by the third, you start to resent the sound of your own footsteps for interrupting it.\n\nThe stars do something to your sense of scale that no photograph replicates.' },
  { id: 'm3', title: 'Sunrise Ridgelines of the Dolomites', description: 'Why 4:30am starts are worth it — a photographer\u2019s account of chasing alpenglow.', cover_image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=900&q=80', user: { name: 'Amara Voss', profile_image_90: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80' }, tag_list: ['mountains', 'photography'], published_at: '2024-02-02T10:00:00Z', positive_reactions_count: 178, comments_count: 0, body: 'You set the alarm the night before knowing you will regret it, and every single time, you don\u2019t.\n\nThe rock turns pink for about four minutes. Everything else in the day is scheduled around those four minutes.' },
  { id: 'm4', title: 'A Field Guide to Slow Travel', description: 'Fewer cities, longer stays — what changed when we stopped rushing between destinations.', cover_image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=900&q=80', user: { name: 'Theodore Reginald', profile_image_90: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=80&q=80' }, tag_list: ['travel-tips'], published_at: '2024-01-05T10:00:00Z', positive_reactions_count: 96, comments_count: 3, body: 'We used to measure a trip by how many pins we could add to a map. Somewhere along the way that stopped being satisfying.\n\nStaying in one place for two weeks instead of two days changes what you notice — the bakery\u2019s schedule, the neighbor\u2019s dog, the way the light moves across the square.' },
  { id: 'm5', title: 'Packing Light for Six Months on the Road', description: 'Everything we own now fits in two 40L bags. Here is what actually earned its place.', cover_image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80', user: { name: 'Elena Marchetti', profile_image_90: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80' }, tag_list: ['travel-tips', 'minimalism'], published_at: '2024-02-11T10:00:00Z', positive_reactions_count: 152, comments_count: 1, body: 'The packing list changed more from what we removed than what we added. Three shirts, not seven. One pair of shoes that has to do everything.\n\nThe real weight, we learned, is decision fatigue — fewer objects means fewer choices each morning.' },
  { id: 'm6', title: 'Camping Above the Clouds in the Alps', description: 'A one-night bivouac at 3,200 meters, and the sunrise that made the cold worth it.', cover_image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80', user: { name: 'Julien Ferreira', profile_image_90: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=80&q=80' }, tag_list: ['mountains', 'camping'], published_at: '2024-01-28T10:00:00Z', positive_reactions_count: 203, comments_count: 0, body: 'We reached the ledge an hour before dark, just enough time to pitch the tent before the temperature dropped fast.\n\nAt 5am the cloud layer sat below us like a second horizon. Nobody said much. There wasn\u2019t much to add.' }
];

// Traductions intégrées pour les articles fictifs de la démo hors ligne, pour que la grille,
// la barre latérale et la lightbox se traduisent instantanément sans aucune dépendance réseau.
// Les articles réels de dev.to (quand l'API est accessible) sont traduits en direct
// via MyMemory à la place — voir translateArticles() plus bas.
const MOCK_TRANSLATIONS = {
  m1: {
    fr: {
      title: "Dix jours à traverser les Andes à pied", description: "Une traversée lente et réfléchie à travers des lacets, l'air raréfié, et des villages oubliés du temps.",
      body: "Le premier matin au-dessus de 3 000 mètres vous apprend à marcher différemment — des pas plus courts, une respiration plus longue. Quelque part après la limite des arbres, le sentier cesse de faire semblant d'être facile.\n\nNous avons traversé trois villages cette semaine-là, chacun plus silencieux que le précédent, chacun généreux malgré tout. Au septième jour, le silence n'était plus vide — il était mérité."
    },
    es: {
      title: 'Diez días cruzando los Andes a pie', description: 'Una travesía lenta y deliberada por curvas, aire enrarecido y pueblos que el tiempo olvidó.',
      body: 'La primera mañana por encima de los 3.000 metros te enseña a caminar de otra manera — pasos más cortos, respiraciones más largas. En algún punto tras el límite del bosque, el sendero deja de fingir que es amable.\n\nPasamos por tres pueblos esa semana, cada uno más silencioso que el anterior, cada uno generoso de todos modos. Al séptimo día, el silencio dejó de sentirse vacío y empezó a sentirse merecido.'
    }
  },
  m2: {
    fr: {
      title: "Ce que le Sahara vous apprend sur l'immobilité", description: "Notes de trois nuits de camping sous un ciel sans pollution lumineuse sur deux cents kilomètres.",
      body: "Il existe un genre de silence particulier qui n'existe que loin des routes. La première nuit, c'est déstabilisant ; à la troisième, on en vient à en vouloir au bruit de ses propres pas de l'interrompre.\n\nLes étoiles font quelque chose à notre sens de l'échelle qu'aucune photo ne peut reproduire."
    },
    es: {
      title: 'Lo que el Sahara te enseña sobre la quietud', description: 'Notas de tres noches acampando bajo un cielo sin contaminación lumínica en doscientos kilómetros.',
      body: 'Existe un tipo particular de silencio que solo existe lejos de las carreteras. La primera noche resulta inquietante; para la tercera, empiezas a resentir el sonido de tus propios pasos por interrumpirlo.\n\nLas estrellas hacen algo a tu sentido de la escala que ninguna fotografía puede replicar.'
    }
  },
  m3: {
    fr: {
      title: 'Crêtes au lever du soleil dans les Dolomites', description: 'Pourquoi les départs à 4h30 en valent la peine — le récit d\u2019un photographe à la poursuite de l\u2019alpenglow.',
      body: "On règle le réveil la veille en sachant qu'on va le regretter, et à chaque fois, on ne le regrette pas.\n\nLa roche devient rose pendant environ quatre minutes. Tout le reste de la journée s'organise autour de ces quatre minutes."
    },
    es: {
      title: 'Crestas al amanecer en las Dolomitas', description: 'Por qué madrugar a las 4:30 vale la pena — el relato de un fotógrafo persiguiendo el resplandor alpino.',
      body: 'Pones la alarma la noche anterior sabiendo que te arrepentirás, y cada vez, no te arrepientes.\n\nLa roca se vuelve rosa durante unos cuatro minutos. El resto del día se organiza en torno a esos cuatro minutos.'
    }
  },
  m4: {
    fr: {
      title: 'Petit guide du voyage lent', description: 'Moins de villes, des séjours plus longs — ce qui a changé quand nous avons arrêté de courir entre les destinations.',
      body: "Nous avions l'habitude de mesurer un voyage au nombre d'épingles ajoutées sur une carte. À un moment, cela a cessé d'être satisfaisant.\n\nRester au même endroit deux semaines au lieu de deux jours change ce que l'on remarque — les horaires de la boulangerie, le chien du voisin, la façon dont la lumière traverse la place."
    },
    es: {
      title: 'Guía de campo para el viaje lento', description: 'Menos ciudades, estancias más largas — lo que cambió cuando dejamos de correr entre destinos.',
      body: 'Solíamos medir un viaje por cuántos pines añadíamos a un mapa. En algún momento, eso dejó de ser satisfactorio.\n\nQuedarse en un mismo lugar dos semanas en vez de dos días cambia lo que notas — el horario de la panadería, el perro del vecino, cómo se mueve la luz por la plaza.'
    }
  },
  m5: {
    fr: {
      title: 'Voyager léger pendant six mois sur la route', description: 'Tout ce que nous possédons tient désormais dans deux sacs de 40L. Voici ce qui a vraiment mérité sa place.',
      body: "La liste d'affaires a changé davantage par ce que nous avons retiré que par ce que nous avons ajouté. Trois chemises, pas sept. Une seule paire de chaussures qui doit tout faire.\n\nLe vrai poids, nous l'avons appris, c'est la fatigue décisionnelle — moins d'objets veut dire moins de choix chaque matin."
    },
    es: {
      title: 'Viajar ligero durante seis meses en la carretera', description: 'Todo lo que tenemos ahora cabe en dos bolsas de 40L. Esto es lo que realmente se ganó su lugar.',
      body: 'La lista de equipaje cambió más por lo que quitamos que por lo que añadimos. Tres camisas, no siete. Un solo par de zapatos que tiene que servir para todo.\n\nEl verdadero peso, aprendimos, es la fatiga de decisión — menos objetos significa menos decisiones cada mañana.'
    }
  },
  m6: {
    fr: {
      title: 'Camper au-dessus des nuages dans les Alpes', description: 'Un bivouac d\u2019une nuit à 3 200 mètres, et le lever de soleil qui a rendu le froid supportable.',
      body: "Nous avons atteint la corniche une heure avant la nuit, juste assez de temps pour monter la tente avant que la température ne chute rapidement.\n\nÀ 5h du matin, la couche de nuages reposait sous nous comme un second horizon. Personne ne disait grand-chose. Il n'y avait pas grand-chose à ajouter."
    },
    es: {
      title: 'Acampar sobre las nubes en los Alpes', description: 'Un vivac de una noche a 3.200 metros, y el amanecer que hizo que el frío valiera la pena.',
      body: 'Llegamos a la cornisa una hora antes del anochecer, con el tiempo justo para montar la tienda antes de que la temperatura cayera rápido.\n\nA las 5 de la mañana, la capa de nubes quedaba bajo nosotros como un segundo horizonte. Nadie dijo mucho. No había mucho que añadir.'
    }
  }
};

function normalize(a, isMock) {
  return {
    id: String(a.id),
    title: a.title,
    description: a.description || '',
    image: a.cover_image || 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80',
    author: a.user?.name || 'Unknown',
    avatar: a.user?.profile_image_90 || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&w=80&q=80',
    tags: a.tag_list || [],
    date: a.published_at,
    likes: a.positive_reactions_count || 0,
    commentsCount: a.comments_count || 0,
    body: isMock ? a.body : null,   // les articles réels dev.to chargent le corps à la demande
    url: a.url || null,
    isMock,
    i18n: {}
  };
}

async function loadArticles() {
  try {
    const res = await fetch('https://dev.to/api/articles?per_page=18');
    if (!res.ok) throw new Error('mauvaise réponse');
    const data = await res.json();
    articles = data.map(a => normalize(a, false));
  } catch (err) {
    articles = MOCK_ARTICLES.map(a => normalize(a, true));
    articles.forEach(a => { a.i18n = MOCK_TRANSLATIONS[a.id] ? { ...MOCK_TRANSLATIONS[a.id] } : {}; });
  }

  // Articles publiés depuis notre backend (Google Sheets) — affichés en premier
  try {
    const res = await fetch(`${API_BASE}/articles`);
    if (res.ok) {
      const backendArticles = (await res.json()).map(a => {
        const na = normalize(a, true);
        na.authorId = a.authorId;
        return na;
      });
      articles = [...backendArticles, ...articles];
    }
  } catch (err) { /* backend hors ligne — le reste de la grille fonctionne quand même */ }

  articles.forEach(a => {
    comments[a.id] = comments[a.id] || [];
    ratings[a.id] = ratings[a.id] || { avg: 4.3 + Math.random() * 0.6, count: 8 + Math.floor(Math.random() * 40), mine: false };
    reactions[a.id] = reactions[a.id] || { liked: false, likeCount: a.likes, thumbs: Math.floor(Math.random() * 30), heart: Math.floor(Math.random() * 20), wow: Math.floor(Math.random() * 10) };
  });
  loadingMsg.remove();
  renderSidebarLists();
  renderMyArticles();
  applyFiltersAndSort();
  loadingMsg.remove();
  renderSidebarLists();
  renderMyArticles();
  applyFiltersAndSort();
  if (currentLang !== 'en') translateArticles(currentLang);
}

// ---------- listes de la barre latérale ----------
function renderSidebarLists() {
  const byDate = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date));
  const byLikes = [...articles].sort((a, b) => reactions[b.id].likeCount - reactions[a.id].likeCount);

  document.getElementById('recentList').innerHTML = byDate.slice(0, 5).map(a =>
    `<li><button class="sidebar-link" onclick="openLightbox('${a.id}')">${truncate(getTitle(a), 42)}</button></li>`).join('');

  document.getElementById('popularList').innerHTML = byLikes.slice(0, 5).map(a =>
    `<li><button class="sidebar-link" onclick="openLightbox('${a.id}')">${truncate(getTitle(a), 42)}</button></li>`).join('');

  const cats = {};
  articles.forEach(a => a.tags.forEach(tg => cats[tg] = (cats[tg] || 0) + 1));
  const catList = document.getElementById('categoryList');
  catList.innerHTML = Object.keys(cats).slice(0, 10).map(tg =>
    `<button class="tag-pill ${filters.category === tg ? 'active' : ''}" onclick="setCategory('${tg}')">${tg}</button>`).join('') || `<span class="text-base" style="color:var(--text-secondary)" data-i18n="no_categories">Aucune catégorie pour le moment</span>`;

  const authorsMap = {};
  articles.forEach(a => authorsMap[a.author] = a.avatar);
  document.getElementById('authorList').innerHTML = Object.keys(authorsMap).slice(0, 6).map(name =>
    `<li class="flex items-center gap-2"><img src="${authorsMap[name]}" class="w-6 h-6 rounded-full object-cover"><button class="sidebar-link" onclick="setAuthor('${name.replace(/'/g, "\\'")}')">${name}</button></li>`).join('');

  syncMobileFilterDrawer();
}

function renderFavoritesList() {
  const list = document.getElementById('favoritesList');
  if (favorites.size === 0) { list.innerHTML = `<li class="text-base" style="color:var(--text-secondary)" data-i18n="no_favorites">${t('no_favorites')}</li>`; return; }
  list.innerHTML = [...favorites].map(id => {
    const a = articles.find(x => x.id === id); if (!a) return '';
    return `<li><button class="sidebar-link" onclick="openLightbox('${id}')">${truncate(getTitle(a), 42)}</button></li>`;
  }).join('');
}

function renderMyArticles() {
  const section = document.getElementById('myArticlesSection');
  const list = document.getElementById('myArticlesList');
  if (!section || !list) return;
  if (typeof authUser === 'undefined' || !authUser) { list.innerHTML = ''; return; }

  const mine = articles.filter(a => a.authorId === authUser.id);
  list.innerHTML = mine.length
    ? mine.map(a => `<li><button class="sidebar-link" onclick="openLightbox('${a.id}')">${truncate(getTitle(a), 42)}</button></li>`).join('')
    : `<li class="text-base" style="color:var(--text-secondary)">${t('no_my_articles')}</li>`;
}

function setCategory(tag) { filters.category = filters.category === tag ? null : tag; renderSidebarLists(); applyFiltersAndSort(); }
function setAuthor(name) { filters.author = filters.author === name ? null : name; applyFiltersAndSort(); }

// ---------- filtrage / tri / rendu de la grille ----------
function applyFiltersAndSort() {
  let list = articles.filter(a => {
    const matchSearch = !filters.search || a.title.toLowerCase().includes(filters.search) || a.tags.join(' ').toLowerCase().includes(filters.search);
    const matchCat = !filters.category || a.tags.includes(filters.category);
    const matchAuthor = !filters.author || a.author === filters.author;
    return matchSearch && matchCat && matchAuthor;
  });

  list.sort((a, b) => {
    let va, vb;
    if (filters.sortBy === 'date') { va = new Date(a.date).getTime(); vb = new Date(b.date).getTime(); }
    else if (filters.sortBy === 'likes') { va = reactions[a.id].likeCount; vb = reactions[b.id].likeCount; }
    else { va = a.commentsCount + comments[a.id].length; vb = b.commentsCount + comments[b.id].length; }
    return filters.order === 'desc' ? vb - va : va - vb;
  });

  renderGrid(list);
}

function renderGrid(list) {
  if (list.length === 0) {
    grid.innerHTML = `<p class="col-span-full text-base" style="color:var(--text-secondary)" data-i18n="no_match_filters">${t('no_match_filters')}</p>`;
    return;
  }
  grid.innerHTML = list.map(a => {
    const r = reactions[a.id], rt = ratings[a.id];
    const isFav = favorites.has(a.id);
    return `
      <article class="card reveal">
        <div class="card-img" style="background-image:url('${a.image}')" onclick="openLightbox('${a.id}')"></div>
        <div class="p-4 flex flex-col flex-1">
          <div class="flex flex-wrap gap-1.5 mb-2">${a.tags.slice(0, 2).map(t => `<span class="tag-pill">${t}</span>`).join('')}</div>
          <h3 class="font-display text-base mb-1.5 cursor-pointer" style="color:var(--text-primary)" onclick="openLightbox('${a.id}')">${getTitle(a)}</h3>
          <p class="text-[0.8125rem] mb-3 flex-1" style="color:var(--text-secondary)">${truncate(getDescription(a), 90)}</p>
          <div class="flex items-center gap-2 mb-3">
            <img src="${a.avatar}" class="w-6 h-6 rounded-full object-cover">
            <span class="text-base font-medium" style="color:var(--text-primary)">${a.author}</span>
            <span class="text-base" style="color:var(--text-secondary)">· ${formatDate(a.date)}</span>
          </div>
          <div class="flex items-center flex-wrap gap-1 pt-2 border-t" style="border-color:var(--surface-border)">
            <button class="card-icon-btn like-btn ${r.liked ? 'active' : ''}" onclick="toggleLike('${a.id}')" aria-label="Like">
              <i class="${r.liked ? 'fa-solid' : 'fa-regular'} fa-heart like-icon"></i>
              <span>${r.likeCount}</span>
            </button>
            <button class="card-icon-btn" onclick="openLightbox('${a.id}')" aria-label="Comments">
              <i class="fa-regular fa-comment"></i>
              <span>${a.commentsCount + comments[a.id].length}</span>
            </button>
            <button class="card-icon-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('${a.id}')" aria-label="Favorite">
              <i class="${isFav ? 'fa-solid fa-bookmark' : 'fa-regular fa-bookmark'}"></i>
            </button>
            <button class="card-icon-btn" onclick="shareArticle('${a.id}')" aria-label="Share">
              <i class="fa-solid fa-arrow-up-from-bracket"></i>
            </button>
            <span class="ml-auto flex items-center">
              ${renderStars(a.id, rt.avg, false)}
            </span>
          </div>
        </div>
      </article>`;
  }).join('');
}

function renderStars(id, avg, interactive) {
  let html = '';
  for (let i = 1; i <= 5; i++) {
    const filled = i <= Math.round(avg);
    html += `<span class="star ${filled ? 'filled' : ''}" ${interactive ? `onclick="rateArticle('${id}',${i})"` : ''}>★</span>`;
  }
  return html;
}

function truncate(s, n) { return s.length > n ? s.slice(0, n).trim() + '…' : s; }
function formatDate(d) { return new Date(d).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }); }

// ---------- accesseurs de contenu i18n ----------
function getTitle(a) { return (a.i18n[currentLang] && a.i18n[currentLang].title) || a.title; }
function getDescription(a) { return (a.i18n[currentLang] && a.i18n[currentLang].description) || a.description; }
function getBody(a) { return (a.i18n[currentLang] && a.i18n[currentLang].body) || a.body; }

// ---------- actions ----------
function toggleLike(id) {
  const r = reactions[id];

  r.liked = !r.liked;
  r.likeCount += r.liked ? 1 : -1;

  applyFiltersAndSort();

  if (currentLightboxId === id) {
    renderLightboxActions(id);
  }
}
function toggleFavorite(id) {
  favorites.has(id) ? favorites.delete(id) : favorites.add(id);
  renderFavoritesList(); applyFiltersAndSort(); if (currentLightboxId === id) renderLightboxActions(id);
  showToast(favorites.has(id) ? t('toast_added_favorite') : t('toast_removed_favorite'));
}
function rateArticle(id, stars) {
  const rt = ratings[id];
  if (!rt.mine) { rt.avg = ((rt.avg * rt.count) + stars) / (rt.count + 1); rt.count++; rt.mine = true; }
  else { rt.avg = stars; } // met à jour sa propre note
  applyFiltersAndSort(); if (currentLightboxId === id) renderLightboxActions(id);
}
function setReaction(id, type) {
  reactions[id][type]++;
  if (currentLightboxId === id) renderLightboxActions(id);
}
function shareArticle(id) {
  const a = articles.find(x => x.id === id);
  const url = a.url || (location.href.split('#')[0] + '#' + id);
  if (navigator.clipboard) { navigator.clipboard.writeText(url).then(() => showToast(t('toast_link_copied'))); }
  else showToast(url);
}
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.opacity = '1';
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.style.opacity = '0', 2200);
}

// ---------- lightbox ----------
let currentLightboxId = null;
const lightbox = document.getElementById('lightbox');

async function openLightbox(id) {
  currentLightboxId = id;
  const a = articles.find(x => x.id === id);
  document.getElementById('lbImage').style.backgroundImage = `url('${a.image}')`;
  document.getElementById('lbTags').innerHTML = a.tags.map(tg => `<span class="tag-pill">${tg}</span>`).join('');
  document.getElementById('lbTitle').textContent = getTitle(a);
  document.getElementById('lbMeta').innerHTML = `<img src="${a.avatar}" class="w-6 h-6 rounded-full object-cover"><span>${a.author}</span><span>· ${formatDate(a.date)}</span>`;

  let bodyHtml = a.body ? getBody(a).split('\n\n').map(p => `<p>${p}</p>`).join('') : `<p>${t('loading_body')}</p>`;
  document.getElementById('lbBody').innerHTML = bodyHtml;

  if (!a.isMock && !a.body) {
    try {
      const res = await fetch(`https://dev.to/api/articles/${a.id}`);
      const full = await res.json();
      a.body = full.body_markdown || a.description;
      document.getElementById('lbBody').innerHTML = a.body.split('\n\n').map(p => `<p>${escapeHtml(p)}</p>`).join('');
      if (currentLang !== 'en') translateArticleBody(a);
    } catch (err) {
      document.getElementById('lbBody').innerHTML = `<p>${escapeHtml(getDescription(a))}</p>`;
    }
  } else if (currentLang !== 'en' && !a.i18n[currentLang]?.body) {
    translateArticleBody(a);
  }

  renderLightboxActions(id);
  renderLightboxShare(id);
  renderComments(id);

  lightbox.classList.remove('hidden'); lightbox.classList.add('flex');
}

function escapeHtml(s) { const d = document.createElement('div'); d.textContent = s; return d.innerHTML; }

function renderLightboxActions(id) {
  const r = reactions[id], rt = ratings[id], isFav = favorites.has(id);
  document.getElementById('lbActions').innerHTML = `
    <button class="card-icon-btn ${r.liked ? 'active' : ''}" onclick="toggleLike('${id}')">❤️ ${t('like')} · ${r.likeCount}</button>
    <button class="card-icon-btn ${isFav ? 'active' : ''}" onclick="toggleFavorite('${id}')">${isFav ? '🔖 ' + t('favorited') : '🏷️ ' + t('favorite')}</button>
    <span class="flex items-center gap-0.5">${renderStars(id, rt.avg, true)}</span>
    <span class="text-base" style="color:var(--text-secondary)">(${rt.count} ${t('ratings_label')})</span>
    <div class="flex items-center gap-1 ml-auto">
      <button class="card-icon-btn" onclick="setReaction('${id}','thumbs')">👍 ${r.thumbs}</button>
      <button class="card-icon-btn" onclick="setReaction('${id}','heart')">❤️ ${r.heart}</button>
      <button class="card-icon-btn" onclick="setReaction('${id}','wow')">😮 ${r.wow}</button>
    </div>`;
}

function renderLightboxShare(id) {
  const a = articles.find(x => x.id === id);
  const url = a.url || (location.href.split('#')[0] + '#' + id);
  document.getElementById('lbShare').innerHTML = `
    <span class="text-base font-semibold uppercase tracking-wide" style="color:var(--text-secondary)">${t('share')}</span>
    <button class="card-icon-btn" onclick="shareArticle('${id}')">🔗 ${t('copy_link')}</button>
    <a class="card-icon-btn" target="_blank" href="https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(getTitle(a))}">𝕏 Twitter</a>
    <a class="card-icon-btn" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}">Facebook</a>`;
}

function renderComments(id) {
  const list = comments[id];
  const el = document.getElementById('lbComments');
  el.innerHTML = list.length ? list.map(c => `
    <div class="text-base p-3 rounded-xl" style="background:var(--surface); border:1px solid var(--surface-border)">
      <p class="font-semibold" style="color:var(--text-primary)">${escapeHtml(c.author)} <span class="font-normal text-base" style="color:var(--text-secondary)">· ${formatDate(c.date)}</span></p>
      <p style="color:var(--text-primary)">${escapeHtml(c.text)}</p>
    </div>`).join('') : `<p class="text-base" style="color:var(--text-secondary)">${t('no_comments_yet')}</p>`;
}

document.getElementById('lbClose').addEventListener('click', () => { lightbox.classList.add('hidden'); lightbox.classList.remove('flex'); currentLightboxId = null; });
lightbox.addEventListener('click', e => { if (e.target === lightbox) { lightbox.classList.add('hidden'); lightbox.classList.remove('flex'); currentLightboxId = null; } });

document.getElementById('lbCommentForm').addEventListener('submit', e => {
  e.preventDefault();
  const input = document.getElementById('lbCommentInput');
  if (!input.value.trim()) return;
  comments[currentLightboxId].push({ author: 'Vous', text: input.value.trim(), date: new Date().toISOString() });
  input.value = '';
  renderComments(currentLightboxId);
  applyFiltersAndSort();
});

// ---------- ajouter un article (vue en ligne qui remplace la grille dans la colonne 2) ----------
const articleGridView = document.getElementById('articleGridView');
const articleFormView = document.getElementById('articleFormView');

function showArticleForm() {
  if (!authUser) {
    showToast(t('login_required_publish'));
    openAuthModal('login');
    return;
  }
  articleGridView.classList.add('hidden');
  articleFormView.classList.remove('hidden');
  document.getElementById('blogSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
function hideArticleForm() {
  articleFormView.classList.add('hidden');
  articleGridView.classList.remove('hidden');
}
document.getElementById('addArticleBtn').addEventListener('click', showArticleForm);
document.getElementById('heroCreateArticleBtn')?.addEventListener('click', showArticleForm);
document.getElementById('articleFormBackBtn').addEventListener('click', hideArticleForm);

document.getElementById('addArticleForm').addEventListener('submit', async e => {
  e.preventDefault();
  if (!authUser) { showToast(t('login_required_publish')); return; }

  const f = new FormData(e.target);
  const btn = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;

  try {
    const token = localStorage.getItem('horizone_token');
    const res = await fetch(`${API_BASE}/articles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify({
        title: f.get('title'),
        description: f.get('description'),
        body: f.get('body'),
        image: f.get('image') || '',
        category: f.get('category') || ''
      })
    });
    const data = await res.json();
    if (!res.ok) { showToast(data.error || t('err_generic')); return; }

    const newArticle = normalize(data, true);
    newArticle.authorId = data.authorId;
    articles.unshift(newArticle);
    comments[data.id] = []; ratings[data.id] = { avg: 0, count: 0, mine: false }; reactions[data.id] = { liked: false, likeCount: 0, thumbs: 0, heart: 0, wow: 0 };

    e.target.reset();
    hideArticleForm();
    renderSidebarLists(); applyFiltersAndSort(); renderMyArticles();
    showToast(t('toast_published'));
  } catch (err) {
    showToast(t('err_backend_unreachable'));
  } finally {
    btn.disabled = false;
  }
});

// ---------- contrôles de recherche / tri ----------

function syncSearchInputs(value) {
  ['searchInput', 'searchInputNav', 'searchInputDrawer'].forEach(id => {
    const el = document.getElementById(id);
    if (el && el.value !== value) el.value = value;
  });
}

function performSearch(value) {
  filters.search = value.toLowerCase();
  syncSearchInputs(value);
  applyFiltersAndSort();
}

// Barre de la sidebar (déjà fonctionnelle, on la relie au nouveau système)
document.getElementById('searchInput')?.addEventListener('input', e => performSearch(e.target.value));

// Barre du navbar desktop — filtre en direct + scroll fluide vers la grille au focus
const searchInputNav = document.getElementById('searchInputNav');
searchInputNav?.addEventListener('input', e => performSearch(e.target.value));
searchInputNav?.addEventListener('focus', () => {
  document.getElementById('blogSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Barre du drawer mobile — filtre en direct, ferme le drawer puis scroll vers la grille
const searchInputDrawer = document.getElementById('searchInputDrawer');
searchInputDrawer?.addEventListener('input', e => performSearch(e.target.value));
searchInputDrawer?.addEventListener('focus', () => {
  closeDrawerFn();
  setTimeout(() => {
    document.getElementById('blogSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 350);
});

document.getElementById('sortSelect').addEventListener('change', e => { filters.sortBy = e.target.value; applyFiltersAndSort(); });
document.getElementById('orderToggle').addEventListener('click', e => {
  filters.order = filters.order === 'desc' ? 'asc' : 'desc';
  e.target.textContent = filters.order === 'desc' ? '↓' : '↑';
  applyFiltersAndSort();
});
document.getElementById('exploreBtn').addEventListener('click', () => {
  filters = { search: '', category: null, author: null, sortBy: 'date', order: 'desc' };
  document.getElementById('searchInput').value = '';
  document.getElementById('sortSelect').value = 'date';
  renderSidebarLists(); applyFiltersAndSort();
});

// ---------- tiroir de filtres mobile ----------
// Réutilise le MÊME élément de la barre latérale (déplacé dans le tiroir) plutôt que de le cloner,
// afin que les écouteurs de recherche/tri/catégories continuent de fonctionner sur mobile sans dupliquer les ID.
function syncMobileFilterDrawer() { /* sans effet : géré par l'ouverture/fermeture qui déplace le vrai nœud */ }
const filterDrawer = document.getElementById('filterDrawer');
const filterBackdrop = document.getElementById('filterBackdrop');
const filterDrawerContent = document.getElementById('filterDrawerContent');
const sidebarHomeParent = document.getElementById('columnsWrap');
const sidebarLeftEl = document.getElementById('sidebarLeft');

function openFilterDrawer() {
  sidebarLeftEl.classList.add('mobile-in-drawer');
  filterDrawerContent.appendChild(sidebarLeftEl);
  filterDrawer.classList.add('open');
  filterBackdrop.classList.remove('opacity-0', 'pointer-events-none'); filterBackdrop.classList.add('opacity-100');
}
function closeFilterDrawerFn() {
  filterDrawer.classList.remove('open');
  filterBackdrop.classList.add('opacity-0', 'pointer-events-none'); filterBackdrop.classList.remove('opacity-100');
  sidebarLeftEl.classList.remove('mobile-in-drawer');
  sidebarHomeParent.insertBefore(sidebarLeftEl, sidebarHomeParent.firstChild);
}
document.getElementById('filterToggleBtn').addEventListener('click', openFilterDrawer);
document.getElementById('closeFilterDrawer').addEventListener('click', closeFilterDrawerFn);
filterBackdrop.addEventListener('click', closeFilterDrawerFn);

// ---------- Chatbot (3ème colonne) ----------
const chatPanel = document.getElementById('chatPanel');
const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const chatClose = document.getElementById('chatClose');

const chatToggleMobile = document.getElementById('chatToggleMobile');
const chatbotColEl = document.getElementById('chatbotCol');

const chatMobileOverlay = document.getElementById('chatMobileOverlay');

function openMobileChat() {
  chatMobileOverlay.appendChild(chatPanel);   
  chatMobileOverlay.classList.add('open');
}
function closeMobileChat() {
  chatMobileOverlay.classList.remove('open');
  chatbotColEl.appendChild(chatPanel);        
}

chatToggleMobile?.addEventListener('click', openMobileChat);
chatClose?.addEventListener('click', closeMobileChat);
chatMobileOverlay?.addEventListener('click', (e) => {
  if (e.target === chatMobileOverlay) closeMobileChat();
});

// Fonction pour ajouter un message dans le panneau de chat
function addChatMessage(who, html) {
  const bubble = document.createElement('div');
  bubble.className = who === 'bot'
    ? 'max-w-[85%] rounded-2xl rounded-bl-sm px-3.5 py-2.5'
    : 'max-w-[85%] ml-auto rounded-2xl rounded-br-sm px-3.5 py-2.5';
  bubble.style.background = who === 'bot' ? 'var(--surface)' : 'var(--accent)';
  bubble.style.color = who === 'bot' ? 'var(--text-primary)' : '#fff';
  bubble.style.border = who === 'bot' ? '1px solid var(--surface-border)' : 'none';
  bubble.innerHTML = html;
  chatMessages.appendChild(bubble);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Soumission du formulaire de chat
chatForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = chatInput.value.trim();
  if (!message) return;

  addChatMessage('user', message);
  chatInput.value = '';

  const loadingId = 'loading-' + Date.now();
  const loadingMessage = document.createElement('div');
  loadingMessage.id = loadingId;
  loadingMessage.className = 'max-w-[85%] rounded-2xl rounded-bl-sm px-3.5 py-2.5';
  loadingMessage.style.background = 'var(--surface)';
  loadingMessage.style.color = 'var(--text-primary)';
  loadingMessage.style.border = '1px solid var(--surface-border)';
  loadingMessage.textContent = 'Réflexion en cours...';
  chatMessages.appendChild(loadingMessage);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message })
    });

    if (!res.ok) throw new Error(`Erreur HTTP : ${res.status}`);

    const data = await res.json();
    const loadingElement = document.getElementById(loadingId);
    if (loadingElement) {
      loadingElement.textContent = data.reply || "Aucune réponse reçue.";
    }
  } catch (err) {
    console.error("Erreur lors de l'appel à /api/chat :", err);
    const loadingElement = document.getElementById(loadingId);
    if (loadingElement) {
      loadingElement.textContent = "Erreur de connexion avec le serveur.";
    }
  }
});
// Charger les articles (si nécessaire)
loadArticles();

// ---------- newsletter du pied de page ----------
const footerNewsletterForm = document.getElementById('footerNewsletterForm');
if (footerNewsletterForm) {
  footerNewsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    footerNewsletterForm.reset();
    showToast(t('toast_subscribed'));
  });
}

/* =====================================================================
  COUCHE DE TRADUCTION / i18n
  - Les chaînes UI statiques proviennent du dictionnaire TRANSLATIONS ci-dessous (instantané).
  - Le contenu dynamique (titres/descriptions/corps des articles, slides du carrousel, réponses du chatbot)
    est traduit à la volée via l'API MyMemory gratuite et mis en cache par langue
    pour n'appeler qu'une seule fois chaque chaîne.
  Langue par défaut : EN. Le changement traduit toute la page, pas seulement la navigation.
===================================================================== */
let currentLang = 'en';

const TRANSLATIONS = {
  en: {
    nav_home: 'Home', nav_articles: 'Articles', nav_categories: 'Categories', nav_about: 'About', nav_contact: 'Contact',
    search_placeholder: 'Search articles…', language: 'Language', dark_mode: 'Dark mode', login: 'Log In', subscribe: 'Subscribe',
    signup: 'Sign Up', logout: 'Log Out', login_title: 'Login', signup_title: 'Sign Up',
    email_label: 'Email', password_label: 'Password', name_label: 'Name', forgot_password: 'Forgot password?',
    ph_enter_email: 'Enter your email', ph_enter_password: 'Enter your password', ph_create_password: 'Create a password', ph_enter_name: 'Enter your name',
    login_btn: 'Log In', signup_btn: 'Sign Up', or_continue_with: 'or continue with',
    not_registered: 'Not registered yet?', signup_link: 'Sign Up ›', already_registered: 'Already have an account?', login_link: 'Log In ›',
    add_photo: '+ Photo',
    err_fill_fields: 'Please fill in every field.', err_generic: 'Something went wrong. Please try again.',
    err_backend_unreachable: 'Could not reach the server. Is the backend running?',
    toast_welcome: 'Welcome back!', toast_account_created: 'Account created — welcome!', toast_logged_out: 'Logged out.',
    stat_articles: 'Articles', stat_readers: 'Monthly readers', stat_rating: 'Reader rating',
    hero_create_article: 'Write your own article', back_to_articles: 'Back to articles',
    latest_articles: 'Latest articles', filters_btn: 'Filters ▾', filters_title: 'Filters',
    sort_by: 'Sort by', sort_date: 'Date created', sort_likes: 'Number of likes', sort_comments: 'Most commented',
    recent_articles: 'Recent articles', popular_articles: 'Popular articles', categories: 'Categories',
    authors: 'Authors', favorites: 'Favorites', no_favorites: 'No favorites yet — click 🔖 on a card.',
    my_articles: 'My articles', no_my_articles: "You haven't published any article yet.",
    login_required_publish: 'Please log in to publish an article.',
    no_categories: 'No categories yet', explore_all: 'Explore all', new_article: '+ New article',
    loading_articles: 'Loading articles…', loading_body: 'Loading article…', no_match_filters: 'No articles match your filters.',
    journal_assistant: 'Journal Assistant', ask_placeholder: 'Ask about an article…',
    comments: 'Comments', write_comment: 'Write a comment…', post: 'Post', no_comments_yet: 'Be the first to comment.',
    new_article_title: 'New article', ph_title: 'Title', ph_author: 'Author name', ph_category: 'Category (e.g. Hiking)',
    ph_image: 'Cover image URL (optional)', ph_description: 'Short description', ph_body: 'Full article text', publish: 'Publish',
    footer_tagline: 'Stories from the trail, the desert, and the ridgeline — a mini blog for people who travel slowly and on foot.',
    explore: 'Explore', footer_home: 'Home', footer_all_articles: 'All Articles', footer_popular_posts: 'Popular Posts',
    support: 'Support', contact_us: 'Contact Us', faq: 'FAQ', write_for_us: 'Write for Us',
    community_guidelines: 'Community Guidelines', report_issue: 'Report an Issue',
    stay_connected: 'Stay Connected', newsletter_text: 'Subscribe to get new stories and trail notes in your inbox.',
    email_placeholder: 'Your email address', rights_reserved: '© 2026 Horizone Journal. All rights reserved.',
    privacy_policy: 'Privacy Policy', terms_of_service: 'Terms of Service',
    like: 'Like', favorite: 'Favorite', favorited: 'Favorited', share: 'Share', copy_link: 'Copy link', ratings_label: 'ratings',
    toast_added_favorite: 'Added to favorites', toast_removed_favorite: 'Removed from favorites',
    toast_link_copied: 'Link copied to clipboard', toast_subscribed: 'Subscribed! Check your inbox soon.',
    toast_published: 'Article published (stored locally in this session)',
    chat_greeting: "Hi! I'm the Journal assistant. Ask me to find articles by topic — try \"hiking\" or \"desert\" — or ask how favorites and comments work.",
    chat_hello: 'Hello! Ask me to find articles by keyword, or ask about favorites, ratings, or comments.',
    chat_favorites: "Click the 🔖 icon on any card (or in an article) to save it — you'll find it under 'Favorites' in the left sidebar.",
    chat_comments: 'Open any article to read and post comments at the bottom of the lightbox.',
    chat_rating: 'Click the stars on a card or inside an article to leave your rating.',
    chat_add: "Use the '+ New article' button above the grid to publish your own post to this session.",
    chat_found: "Here's what I found:", chat_not_found: "I couldn't find an article about that — try another keyword, or browse Categories in the left sidebar.",

    // ---- Reviews section ----
    reviews_title: "What travelers say",
    reviews_subtitle: "Real notes from readers who've walked the trails with us.",
    give_review_btn: "Give your review",
    review_modal_heading_1: "Want to",
    review_modal_heading_2: "share your story?",
    review_modal_heading_accent: "Get in touch.",
    review_form_intro: "We read every review — it usually shapes our next trip.",
    review_form_title: "Please fill in the form below.",
    review_form_note: "We aim to publish it within 1 business day.",
    ph_first_name: "First name *",
    ph_last_name: "Last name *",
    ph_your_message: "Your message",
    review_rating_label: "Your rating",
    review_updates_checkbox: "Would you like to receive updates from us? (We promise no spam!)",
    submit_review: "Submit review",
    no_reviews_yet: "Be the first to leave a review.",
    toast_review_submitted: "Thanks! Your review has been added."
  },
  fr: {
    nav_home: 'Accueil', nav_articles: 'Articles', nav_categories: 'Catégories', nav_about: 'À propos', nav_contact: 'Contact',
    search_placeholder: 'Rechercher des articles…', language: 'Langue', dark_mode: 'Mode sombre', login: 'Connexion', subscribe: "S'abonner",
    signup: 'Créer un compte', logout: 'Déconnexion', login_title: 'Connexion', signup_title: 'Créer un compte',
    email_label: 'Email', password_label: 'Mot de passe', name_label: 'Nom', forgot_password: 'Mot de passe oublié ?',
    ph_enter_email: 'Entrez votre email', ph_enter_password: 'Entrez votre mot de passe', ph_create_password: 'Créez un mot de passe', ph_enter_name: 'Entrez votre nom',
    login_btn: 'Se connecter', signup_btn: 'Créer un compte', or_continue_with: 'ou continuer avec',
    not_registered: 'Pas encore inscrit ?', signup_link: 'Créer un compte ›', already_registered: 'Vous avez déjà un compte ?', login_link: 'Se connecter ›',
    add_photo: '+ Photo',
    err_fill_fields: 'Merci de remplir tous les champs.', err_generic: "Une erreur s'est produite. Réessayez.",
    err_backend_unreachable: 'Impossible de joindre le serveur. Le backend est-il lancé ?',
    toast_welcome: 'Content de vous revoir !', toast_account_created: 'Compte créé — bienvenue !', toast_logged_out: 'Déconnecté.',
    stat_articles: 'Articles', stat_readers: 'Lecteurs mensuels', stat_rating: 'Note des lecteurs',
    hero_create_article: '✦ Écrivez votre propre article', back_to_articles: 'Retour aux articles',
    latest_articles: 'Derniers articles', filters_btn: 'Filtres ▾', filters_title: 'Filtres',
    sort_by: 'Trier par', sort_date: 'Date de création', sort_likes: "Nombre de j'aime", sort_comments: 'Les plus commentés',
    recent_articles: 'Articles récents', popular_articles: 'Articles populaires', categories: 'Catégories',
    authors: 'Auteurs', favorites: 'Favoris', no_favorites: "Aucun favori pour l'instant — cliquez sur 🔖 sur une carte.",
    my_articles: 'Mes articles', no_my_articles: "Vous n'avez encore publié aucun article.",
    login_required_publish: 'Connectez-vous pour publier un article.', no_categories: 'Aucune catégorie pour le moment', explore_all: 'Tout explorer', new_article: '+ Nouvel article',
    loading_articles: 'Chargement des articles…', loading_body: "Chargement de l'article…", no_match_filters: 'Aucun article ne correspond à vos filtres.',
    journal_assistant: 'Assistant du journal', ask_placeholder: 'Posez une question sur un article…',
    comments: 'Commentaires', write_comment: 'Écrire un commentaire…', post: 'Publier', no_comments_yet: 'Soyez le premier à commenter.',
    new_article_title: 'Nouvel article', ph_title: 'Titre', ph_author: "Nom de l'auteur", ph_category: 'Catégorie (ex. Randonnée)',
    ph_image: "URL de l'image de couverture (facultatif)", ph_description: 'Courte description', ph_body: "Texte complet de l'article", publish: 'Publier',
    footer_tagline: 'Récits du sentier, du désert et de la crête — un mini-blog pour ceux qui voyagent lentement, à pied.',
    explore: 'Explorer', footer_home: 'Accueil', footer_all_articles: 'Tous les articles', footer_popular_posts: 'Articles populaires',
    support: 'Assistance', contact_us: 'Nous contacter', faq: 'FAQ', write_for_us: 'Écrire pour nous',
    community_guidelines: 'Règles de la communauté', report_issue: 'Signaler un problème',
    stay_connected: 'Restez connecté', newsletter_text: 'Abonnez-vous pour recevoir de nouvelles histoires et notes de sentier.',
    email_placeholder: 'Votre adresse e-mail', rights_reserved: '© 2026 Horizone Journal. Tous droits réservés.',
    privacy_policy: 'Politique de confidentialité', terms_of_service: "Conditions d'utilisation",
    like: "J'aime", favorite: 'Favori', favorited: 'Favori ajouté', share: 'Partager', copy_link: 'Copier le lien', ratings_label: 'notes',
    toast_added_favorite: 'Ajouté aux favoris', toast_removed_favorite: 'Retiré des favoris',
    toast_link_copied: 'Lien copié dans le presse-papiers', toast_subscribed: 'Abonné ! Vérifiez votre boîte mail bientôt.',
    toast_published: 'Article publié (stocké localement pour cette session)',
    chat_greeting: "Salut ! Je suis l'assistant du journal. Demandez-moi de trouver des articles par thème — essayez « randonnée » ou « désert » — ou posez une question sur les favoris et les commentaires.",
    chat_hello: 'Bonjour ! Demandez-moi de trouver des articles par mot-clé, ou posez une question sur les favoris, les notes ou les commentaires.',
    chat_favorites: "Cliquez sur l'icône 🔖 sur une carte (ou dans un article) pour le sauvegarder — vous le retrouverez dans « Favoris » dans la barre latérale.",
    chat_comments: 'Ouvrez un article pour lire et publier des commentaires en bas de la fenêtre.',
    chat_rating: 'Cliquez sur les étoiles sur une carte ou dans un article pour laisser votre note.',
    chat_add: "Utilisez le bouton « + Nouvel article » au-dessus de la grille pour publier votre propre article dans cette session.",
    chat_found: 'Voici ce que j\'ai trouvé :', chat_not_found: "Je n'ai trouvé aucun article à ce sujet — essayez un autre mot-clé, ou parcourez les catégories dans la barre latérale.",

    // ---- Section avis ----
    reviews_title: "Ce que disent les voyageurs",
    reviews_subtitle: "De vrais retours de lecteurs qui ont parcouru les sentiers avec nous.",
    give_review_btn: "Donner votre avis",
    review_modal_heading_1: "Envie de",
    review_modal_heading_2: "partager votre histoire ?",
    review_modal_heading_accent: "Écrivez-nous.",
    review_form_intro: "On lit chaque avis — ça influence souvent notre prochain voyage.",
    review_form_title: "Merci de remplir le formulaire ci-dessous.",
    review_form_note: "On vise une publication sous 1 jour ouvré.",
    ph_first_name: "Prénom *",
    ph_last_name: "Nom *",
    ph_your_message: "Votre message",
    review_rating_label: "Votre note",
    review_updates_checkbox: "Souhaitez-vous recevoir nos actualités ? (Promis, pas de spam !)",
    submit_review: "Envoyer l'avis",
    no_reviews_yet: "Soyez le premier à laisser un avis.",
    toast_review_submitted: "Merci ! Votre avis a été ajouté."
  },
  es: {
    nav_home: 'Inicio', nav_articles: 'Artículos', nav_categories: 'Categorías', nav_about: 'Acerca de', nav_contact: 'Contacto',
    search_placeholder: 'Buscar artículos…', language: 'Idioma', dark_mode: 'Modo oscuro', login: 'Iniciar sesión', subscribe: 'Suscribirse',
    signup: 'Crear cuenta', logout: 'Cerrar sesión', login_title: 'Iniciar sesión', signup_title: 'Crear cuenta',
    email_label: 'Email', password_label: 'Contraseña', name_label: 'Nombre', forgot_password: '¿Olvidaste tu contraseña?',
    ph_enter_email: 'Ingresa tu email', ph_enter_password: 'Ingresa tu contraseña', ph_create_password: 'Crea una contraseña', ph_enter_name: 'Ingresa tu nombre',
    login_btn: 'Iniciar sesión', signup_btn: 'Crear cuenta', or_continue_with: 'o continuar con',
    not_registered: '¿Aún no tienes cuenta?', signup_link: 'Crear cuenta ›', already_registered: '¿Ya tienes una cuenta?', login_link: 'Iniciar sesión ›',
    add_photo: '+ Foto',
    err_fill_fields: 'Completa todos los campos.', err_generic: 'Algo salió mal. Inténtalo de nuevo.',
    err_backend_unreachable: 'No se pudo conectar con el servidor. ¿Está corriendo el backend?',
    toast_welcome: '¡Bienvenido de nuevo!', toast_account_created: '¡Cuenta creada, bienvenido!', toast_logged_out: 'Sesión cerrada.',
    stat_articles: 'Artículos', stat_readers: 'Lectores mensuales', stat_rating: 'Valoración de lectores',
    hero_create_article: '✦ Escribe tu propio artículo', back_to_articles: 'Volver a los artículos',
    latest_articles: 'Últimos artículos', filters_btn: 'Filtros ▾', filters_title: 'Filtros',
    sort_by: 'Ordenar por', sort_date: 'Fecha de creación', sort_likes: 'Número de me gusta', sort_comments: 'Más comentados',
    recent_articles: 'Artículos recientes', popular_articles: 'Artículos populares', categories: 'Categorías',
    authors: 'Autores', favorites: 'Favoritos', no_favorites: 'Aún no hay favoritos — haz clic en 🔖 en una tarjeta.',
    my_articles: 'Mis artículos', no_my_articles: 'Aún no has publicado ningún artículo.',
    login_required_publish: 'Inicia sesión para publicar un artículo.', no_categories: 'Aún no hay categorías', explore_all: 'Explorar todo', new_article: '+ Nuevo artículo',
    loading_articles: 'Cargando artículos…', loading_body: 'Cargando artículo…', no_match_filters: 'Ningún artículo coincide con tus filtros.',
    journal_assistant: 'Asistente del diario', ask_placeholder: 'Pregunta sobre un artículo…',
    comments: 'Comentarios', write_comment: 'Escribe un comentario…', post: 'Publicar', no_comments_yet: 'Sé el primero en comentar.',
    new_article_title: 'Nuevo artículo', ph_title: 'Título', ph_author: 'Nombre del autor', ph_category: 'Categoría (p. ej. Senderismo)',
    ph_image: 'URL de la imagen de portada (opcional)', ph_description: 'Descripción breve', ph_body: 'Texto completo del artículo', publish: 'Publicar',
    footer_tagline: 'Historias del sendero, el desierto y la cresta — un mini-blog para quienes viajan despacio y a pie.',
    explore: 'Explorar', footer_home: 'Inicio', footer_all_articles: 'Todos los artículos', footer_popular_posts: 'Publicaciones populares',
    support: 'Soporte', contact_us: 'Contáctanos', faq: 'Preguntas frecuentes', write_for_us: 'Escribe para nosotros',
    community_guidelines: 'Normas de la comunidad', report_issue: 'Reportar un problema',
    stay_connected: 'Mantente conectado', newsletter_text: 'Suscríbete para recibir nuevas historias y notas de senderos.',
    email_placeholder: 'Tu correo electrónico', rights_reserved: '© 2026 Horizone Journal. Todos los derechos reservados.',
    privacy_policy: 'Política de privacidad', terms_of_service: 'Términos de servicio',
    like: 'Me gusta', favorite: 'Favorito', favorited: 'Favorito añadido', share: 'Compartir', copy_link: 'Copiar enlace', ratings_label: 'valoraciones',
    toast_added_favorite: 'Añadido a favoritos', toast_removed_favorite: 'Eliminado de favoritos',
    toast_link_copied: 'Enlace copiado al portapapeles', toast_subscribed: '¡Suscrito! Revisa tu correo pronto.',
    toast_published: 'Artículo publicado (guardado localmente en esta sesión)',
    chat_greeting: '¡Hola! Soy el asistente del diario. Pídeme encontrar artículos por tema — prueba "senderismo" o "desierto" — o pregunta cómo funcionan los favoritos y comentarios.',
    chat_hello: '¡Hola! Pídeme encontrar artículos por palabra clave, o pregunta sobre favoritos, valoraciones o comentarios.',
    chat_favorites: "Haz clic en el icono 🔖 de cualquier tarjeta (o dentro de un artículo) para guardarlo — lo encontrarás en 'Favoritos' en la barra lateral.",
    chat_comments: 'Abre cualquier artículo para leer y publicar comentarios al final de la ventana.',
    chat_rating: 'Haz clic en las estrellas de una tarjeta o dentro de un artículo para dejar tu valoración.',
    chat_add: "Usa el botón '+ Nuevo artículo' encima de la cuadrícula para publicar tu propio artículo en esta sesión.",
    chat_found: 'Esto es lo que encontré:', chat_not_found: 'No encontré ningún artículo sobre eso — prueba otra palabra clave, o explora las categorías en la barra lateral.',

    // ---- Sección de opiniones ----
    reviews_title: "Lo que dicen los viajeros",
    reviews_subtitle: "Comentarios reales de lectores que han recorrido los senderos con nosotros.",
    give_review_btn: "Deja tu opinión",
    review_modal_heading_1: "¿Quieres",
    review_modal_heading_2: "compartir tu historia?",
    review_modal_heading_accent: "Escríbenos.",
    review_form_intro: "Leemos cada opinión — suele influir en nuestro próximo viaje.",
    review_form_title: "Completa el formulario a continuación.",
    review_form_note: "Intentamos publicarlo en 1 día hábil.",
    ph_first_name: "Nombre *",
    ph_last_name: "Apellido *",
    ph_your_message: "Tu mensaje",
    review_rating_label: "Tu valoración",
    review_updates_checkbox: "¿Quieres recibir novedades? (¡Sin spam, lo prometemos!)",
    submit_review: "Enviar opinión",
    no_reviews_yet: "Sé el primero en dejar una opinión.",
    toast_review_submitted: "¡Gracias! Tu opinión se ha añadido."
  }
};

function t(key) { return (TRANSLATIONS[currentLang] && TRANSLATIONS[currentLang][key]) || TRANSLATIONS.en[key] || key; }

function applyStaticTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.getAttribute('data-i18n'));
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    el.setAttribute('placeholder', t(el.getAttribute('data-i18n-placeholder')));
  });
}

function applySlideText() {
  const d = slidesData[current];
  const badge = (d.i18n && d.i18n[currentLang] && d.i18n[currentLang].badge) || d.badge;
  const title = (d.i18n && d.i18n[currentLang] && d.i18n[currentLang].title) || d.title;
  const desc = (d.i18n && d.i18n[currentLang] && d.i18n[currentLang].desc) || d.desc;
  document.getElementById('slideBadge').textContent = badge;
  document.getElementById('slideTitle').textContent = title;
  document.getElementById('slideDesc').textContent = desc;
  document.getElementById('authorName').textContent = d.author;
  document.getElementById('authorImg').src = d.img;
  document.getElementById('authorDate').textContent = d.date;
  document.getElementById('authorRead').textContent = d.read;
  if (currentLang !== 'en') translateSlide(current);
}

// ---------- Traduction dynamique via MyMemory, avec cache ----------
const translationCache = {};
async function translateText(text, targetLang) {
  if (targetLang === 'en' || !text) return text;
  const cacheKey = targetLang + '::' + text;
  if (translationCache[cacheKey]) return translationCache[cacheKey];
  try {
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}`);
    const data = await res.json();
    const translated = data?.responseData?.translatedText || text;
    translationCache[cacheKey] = translated;
    return translated;
  } catch (err) {
    return text;
  }
}

async function translateSlide(i) {
  const d = slidesData[i];
  d.i18n = d.i18n || {};
  if (d.i18n[currentLang]) { if (i === current) applySlideText(); return; }
  const [badge, title, desc] = await Promise.all([
    translateText(d.badge, currentLang), translateText(d.title, currentLang), translateText(d.desc, currentLang)
  ]);
  d.i18n[currentLang] = { badge, title, desc };
  if (i === current) applySlideText();
}

async function translateArticles(lang) {
  for (const a of articles) {
    if (a.i18n[lang]) continue;
    const [title, description] = await Promise.all([
      translateText(a.title, lang), translateText(a.description, lang)
    ]);
    a.i18n[lang] = { title, description };
    if (currentLang === lang) { applyFiltersAndSort(); renderSidebarLists(); renderFavoritesList(); }
  }
}

async function translateArticleBody(a) {
  if (!a.body) return;
  a.i18n[currentLang] = a.i18n[currentLang] || {};
  const translated = await translateText(a.body, currentLang);
  a.i18n[currentLang].body = translated;
  if (currentLightboxId === a.id) {
    document.getElementById('lbBody').innerHTML = translated.split('\n\n').map(p => `<p>${p}</p>`).join('');
  }
}

function setLanguage(lang) {
  currentLang = lang;
  document.getElementById('langSelect').value = lang;
  document.getElementById('langSelectDrawer').value = lang;
  applyStaticTranslations();
  applySlideText();
  renderFavoritesList();
  renderMyArticles();
  if (articles.length) {
    if (lang === 'en') { applyFiltersAndSort(); renderSidebarLists(); }
    else translateArticles(lang);
  }
  if (typeof renderReviews === 'function') renderReviews();
  if (currentLightboxId) {
    const a = articles.find(x => x.id === currentLightboxId);
    if (a) {
      document.getElementById('lbTitle').textContent = getTitle(a);
      renderLightboxActions(currentLightboxId);
      renderLightboxShare(currentLightboxId);
      renderComments(currentLightboxId);
      if (lang !== 'en' && a.body && !a.i18n[lang]?.body) translateArticleBody(a);
      else if (a.body) document.getElementById('lbBody').innerHTML = getBody(a).split('\n\n').map(p => `<p>${p}</p>`).join('');
    }
  }
}

document.getElementById('langSelect').addEventListener('change', e => setLanguage(e.target.value));
document.getElementById('langSelectDrawer').addEventListener('change', e => setLanguage(e.target.value));

applyStaticTranslations();

/* =====================================================================
   AUTH — Connexion / Inscription contre le backend Express + Google Sheets.
   Changez API_BASE vers l'endroit où vous déployez horizone-backend/ (par défaut
   en développement local). La session est un JWT stocké dans localStorage.
===================================================================== */
const API_BASE = 'https://micro-blog.up.railway.app/api';

let authUser = null;   // { id, name, email, avatarUrl } | null
let pendingAvatarFile = null;

const authModal = document.getElementById('authModal');
const loginCard = document.getElementById('loginCard');
const signupCard = document.getElementById('signupCard');

function openAuthModal(mode) {
  authModal.classList.remove('hidden'); authModal.classList.add('flex');
  showAuthCard(mode);
}
function closeAuthModal() {
  authModal.classList.add('hidden'); authModal.classList.remove('flex');
  document.getElementById('loginError').textContent = '';
  document.getElementById('signupError').textContent = '';
}
function showAuthCard(mode) {
  loginCard.classList.toggle('hidden', mode !== 'login');
  signupCard.classList.toggle('hidden', mode !== 'signup');
}

document.getElementById('openLoginBtn').addEventListener('click', () => openAuthModal('login'));
document.getElementById('openSignupBtn').addEventListener('click', () => openAuthModal('signup'));
document.getElementById('openLoginBtnMobile').addEventListener('click', () => { closeDrawerFn(); openAuthModal('login'); });
document.getElementById('openSignupBtnMobile').addEventListener('click', () => { closeDrawerFn(); openAuthModal('signup'); });
document.getElementById('authModalCloseLogin').addEventListener('click', closeAuthModal);
document.getElementById('authModalCloseSignup').addEventListener('click', closeAuthModal);
authModal.addEventListener('click', e => { if (e.target === authModal) closeAuthModal(); });
document.getElementById('switchToSignup').addEventListener('click', () => showAuthCard('signup'));
document.getElementById('switchToLogin').addEventListener('click', () => showAuthCard('login'));

// ---------- sélecteur d'avatar (Inscription) ----------
const avatarInput = document.getElementById('signupAvatarInput');
const avatarPreview = document.getElementById('avatarPreview');
const avatarPlaceholder = document.getElementById('avatarUploadPlaceholder');

document.getElementById('avatarUploadLabel').addEventListener('click', () => avatarInput.click());
avatarInput.addEventListener('change', () => {
  const file = avatarInput.files[0];
  if (!file) return;
  pendingAvatarFile = file;
  avatarPreview.src = URL.createObjectURL(file);
  avatarPreview.classList.remove('hidden');
  avatarPlaceholder.classList.add('hidden');
});

/**
 * Obtient une autorisation d'upload signée et à durée limitée depuis notre backend, puis
 * envoie le fichier directement à Cloudinary depuis le navigateur. La clé secrète Cloudinary
 * ne quitte jamais le serveur — seule la signature est transmise.
 */
async function uploadAvatarToCloudinary(file) {
  const sigRes = await fetch(`${API_BASE}/upload/signature`);
  if (!sigRes.ok) throw new Error('échec de la demande de signature');
  const { timestamp, signature, apiKey, cloudName, folder } = await sigRes.json();

  const form = new FormData();
  form.append('file', file);
  form.append('api_key', apiKey);
  form.append('timestamp', timestamp);
  form.append('signature', signature);
  form.append('folder', folder);

  const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST', body: form,
  });
  if (!uploadRes.ok) throw new Error('échec de l\'upload Cloudinary');
  const data = await uploadRes.json();
  return data.secure_url;
}

// ---------- connexion ----------
document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const errEl = document.getElementById('loginError');
  const btn = document.getElementById('loginSubmitBtn');
  errEl.textContent = '';
  const f = new FormData(e.target);
  const email = f.get('email'), password = f.get('password');
  if (!email || !password) { errEl.textContent = t('err_fill_fields'); return; }

  btn.disabled = true;
  try {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (!res.ok) { errEl.textContent = data.error || t('err_generic'); return; }
    setSession(data.token, data.user);
    closeAuthModal(); e.target.reset();
    showToast(t('toast_welcome'));
  } catch (err) {
    errEl.textContent = t('err_backend_unreachable');
  } finally {
    btn.disabled = false;
  }
});

// ---------- inscription ----------
document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const errEl = document.getElementById('signupError');
  const btn = document.getElementById('signupSubmitBtn');
  errEl.textContent = '';
  const f = new FormData(e.target);
  const name = f.get('name'), email = f.get('email'), password = f.get('password');
  if (!name || !email || !password) { errEl.textContent = t('err_fill_fields'); return; }

  btn.disabled = true;
  try {
    let avatarUrl = '';
    if (pendingAvatarFile) {
      try { avatarUrl = await uploadAvatarToCloudinary(pendingAvatarFile); }
      catch (err) { /* non bloquant : continue l'inscription même si la photo échoue */ }
    }

    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, avatarUrl })
    });
    const data = await res.json();
    if (!res.ok) { errEl.textContent = data.error || t('err_generic'); return; }
    setSession(data.token, data.user);
    closeAuthModal(); e.target.reset();
    pendingAvatarFile = null;
    avatarPreview.classList.add('hidden'); avatarPlaceholder.classList.remove('hidden');
    showToast(t('toast_account_created'));
  } catch (err) {
    errEl.textContent = t('err_backend_unreachable');
  } finally {
    btn.disabled = false;
  }
});

// ---------- gestion de session ----------
function setSession(token, user) {
  authUser = user;
  localStorage.setItem('horizone_token', token);
  localStorage.setItem('horizone_user', JSON.stringify(user));
  renderAuthState();
}
function clearSession() {
  authUser = null;
  localStorage.removeItem('horizone_token');
  localStorage.removeItem('horizone_user');
  renderAuthState();
}
function renderAuthState() {
  const loggedIn = !!authUser;

  document.getElementById('navLoggedOut').classList.toggle('hidden', loggedIn);
  const navLoggedIn = document.getElementById('navLoggedIn');
  navLoggedIn.classList.toggle('hidden', !loggedIn);
  navLoggedIn.classList.toggle('flex', loggedIn);

  document.getElementById('drawerLoggedOut').classList.toggle('hidden', loggedIn);
  const drawerLoggedIn = document.getElementById('drawerLoggedIn');
  drawerLoggedIn.classList.toggle('hidden', !loggedIn);
  drawerLoggedIn.classList.toggle('flex', loggedIn);

  const myArticlesSection = document.getElementById('myArticlesSection');
  if (myArticlesSection) myArticlesSection.classList.toggle('hidden', !loggedIn);

  if (loggedIn) {
    const fallbackAvatar = 'https://api.dicebear.com/7.x/initials/svg?seed=' + encodeURIComponent(authUser.name);
    document.getElementById('navUserAvatar').src = authUser.avatarUrl || fallbackAvatar;
    document.getElementById('navUserName').textContent = authUser.name;
    document.getElementById('drawerUserAvatar').src = authUser.avatarUrl || fallbackAvatar;
    document.getElementById('drawerUserName').textContent = authUser.name;
  }
  renderMyArticles();
}



function logout() {
  clearSession();
  showToast(t('toast_logged_out'));
}
document.getElementById('logoutBtn').addEventListener('click', logout);
document.getElementById('logoutBtnMobile').addEventListener('click', () => { closeDrawerFn(); logout(); });

// restaurer la session au chargement
(function restoreSession() {
  const token = localStorage.getItem('horizone_token');
  const userJson = localStorage.getItem('horizone_user');
  if (token && userJson) {
    try { authUser = JSON.parse(userJson); renderAuthState(); }
    catch (err) { clearSession(); }
  }
})();

/* =====================================================================
AVIS — auto-hébergés, d'abord le backend, avec repli fictif (même modèle
que les articles). Les avatars viennent de ui-avatars.com (gratuit, sans clé).
===================================================================== */
let reviews = [];
let selectedRating = 5;

const MOCK_REVIEWS = [
  // 🇫🇷 Français
  {
    firstName: 'Camille',
    lastName: 'Moreau',
    rating: 5,
    message: 'Un site vraiment agréable à lire. Les articles sont bien écrits, clairs et surtout très intéressants.',
    date: '2026-06-15'
  },

  {
    firstName: 'Thomas',
    lastName: 'Bernard',
    rating: 5,
    message: 'J’apprécie énormément la qualité des contenus. Les articles sont détaillés sans être trop longs et vont vraiment à l’essentiel.',
    date: '2026-06-08'
  },

  {
    firstName: 'Élodie',
    lastName: 'Martin',
    rating: 4,
    message: 'Très belle plateforme de lecture. Le design est propre, moderne et rend la navigation vraiment agréable.',
    date: '2026-05-27'
  },

  {
    firstName: 'Nicolas',
    lastName: 'Laurent',
    rating: 5,
    message: 'Les articles sont de qualité et donnent vraiment envie de découvrir de nouveaux sujets. Une excellente expérience de lecture.',
    date: '2026-05-12'
  },

  {
    firstName: 'Manon',
    lastName: 'Dubois',
    rating: 5,
    message: 'J’aime beaucoup la diversité des articles. Le contenu est intéressant, bien présenté et facile à parcourir.',
    date: '2026-04-29'
  },

  // 🇬🇧 English
  {
    firstName: 'James',
    lastName: 'Anderson',
    rating: 5,
    message: 'One of the best reading websites I have discovered recently. The articles are thoughtful, well written, and genuinely enjoyable.',
    date: '2026-06-21'
  },

  {
    firstName: 'Olivia',
    lastName: 'Carter',
    rating: 5,
    message: 'The quality of the articles is impressive. Everything feels carefully written instead of being generic content.',
    date: '2026-06-04'
  },

  {
    firstName: 'Daniel',
    lastName: 'Wilson',
    rating: 4,
    message: 'I really like the clean design and the reading experience. The website feels simple, modern, and easy to navigate.',
    date: '2026-05-20'
  },

  {
    firstName: 'Emma',
    lastName: 'Thompson',
    rating: 5,
    message: 'The articles are informative without feeling overwhelming. I always end up discovering something new when I visit the site.',
    date: '2026-05-06'
  },

  {
    firstName: 'Liam',
    lastName: 'Harrison',
    rating: 5,
    message: 'A great platform for people who enjoy reading quality content. The articles are engaging and the overall experience is excellent.',
    date: '2026-04-18'
  },

  // 🇪🇸 Español
  {
    firstName: 'Lucía',
    lastName: 'García',
    rating: 5,
    message: 'Me encanta este sitio. Los artículos están muy bien escritos y siempre encuentro contenido interesante para leer.',
    date: '2026-06-11'
  },

  {
    firstName: 'Mateo',
    lastName: 'Fernández',
    rating: 5,
    message: 'La calidad de los contenidos es excelente. Los artículos son claros, interesantes y aportan información realmente útil.',
    date: '2026-05-30'
  },

  {
    firstName: 'Sofía',
    lastName: 'Martínez',
    rating: 4,
    message: 'El diseño del sitio es muy limpio y moderno. La navegación es sencilla y hace que leer los artículos sea muy cómodo.',
    date: '2026-05-16'
  },

  {
    firstName: 'Diego',
    lastName: 'Rodríguez',
    rating: 5,
    message: 'Me gusta mucho la variedad de temas. Siempre puedo encontrar algo nuevo e interesante para leer.',
    date: '2026-04-30'
  },

  {
    firstName: 'Valentina',
    lastName: 'López',
    rating: 5,
    message: 'Una excelente experiencia de lectura. Los contenidos son atractivos, están bien organizados y se nota el cuidado en cada artículo.',
    date: '2026-04-12'
  }
];

function avatarUrl(name) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FCA311&color=fff&bold=true`;
}

function starsHtml(rating) {
  let html = '';
  for (let i = 1; i <= 5; i++) html += `<span class="star ${i <= rating ? 'filled' : ''}">★</span>`;
  return html;
}

function reviewCardHtml(r) {
  const name = `${r.firstName} ${r.lastName}`;
  return `
    <div class="review-card">
      <div class="review-card-head">
        <img src="${avatarUrl(name)}" class="w-9 h-9 rounded-full object-cover" alt="">
        <div>
          <p class="review-card-name">${escapeHtml(name)}</p>
          <p class="review-card-date">${formatDate(r.date)}</p>
        </div>
      </div>
      <div class="flex items-center gap-0.5 mb-2">${starsHtml(r.rating)}</div>
      <p class="review-card-text">${escapeHtml(r.message)}</p>
    </div>`;
}

function renderReviews() {
  const track = document.getElementById('reviewsTrack');
  if (!reviews.length) { track.innerHTML = `<p class="text-base" style="color:var(--text-secondary)">${t('no_reviews_yet')}</p>`; return; }
  const cards = reviews.map(reviewCardHtml).join('');
  track.innerHTML = cards + cards; // dupliqué pour un défilement continu
}

async function loadReviews() {
  try {
    const res = await fetch(`${API_BASE}/reviews`);
    if (!res.ok) throw new Error('mauvaise réponse');
    reviews = await res.json();
  } catch (err) {
    reviews = MOCK_REVIEWS;
  }
  renderReviews();
}

// ---------- sélecteur d'étoiles dans la modale ----------
function renderStarsInput() {
  const el = document.getElementById('reviewStarsInput');
  el.innerHTML = starsHtml(selectedRating);
  el.querySelectorAll('.star').forEach((s, i) => {
    s.style.cursor = 'pointer';
    s.addEventListener('click', () => { selectedRating = i + 1; renderStarsInput(); });
  });
}

// ---------- ouverture/fermeture de la modale ----------
const reviewModal = document.getElementById('reviewModal');
function openReviewModal() {
  selectedRating = 5;
  renderStarsInput();
  reviewModal.classList.remove('hidden'); reviewModal.classList.add('flex');
}
function closeReviewModal() {
  reviewModal.classList.add('hidden'); reviewModal.classList.remove('flex');
  document.getElementById('reviewError').textContent = '';
}
document.getElementById('openReviewBtn').addEventListener('click', openReviewModal);
document.getElementById('reviewModalClose').addEventListener('click', closeReviewModal);
reviewModal.addEventListener('click', e => { if (e.target === reviewModal) closeReviewModal(); });

// ---------- soumission ----------
document.getElementById('reviewForm').addEventListener('submit', async e => {
  e.preventDefault();
  const errEl = document.getElementById('reviewError');
  const btn = document.getElementById('reviewSubmitBtn');
  errEl.textContent = '';
  const f = new FormData(e.target);
  const payload = {
    firstName: f.get('firstName'), lastName: f.get('lastName'), email: f.get('email'),
    message: f.get('message') || '', rating: selectedRating, updates: !!f.get('updates'),
    date: new Date().toISOString()
  };
  if (!payload.firstName || !payload.lastName || !payload.email) { errEl.textContent = t('err_fill_fields'); return; }

  btn.disabled = true;
  try {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
    });
    if (res.ok) { const saved = await res.json(); reviews.unshift(saved); }
    else { reviews.unshift(payload); } // l'affiche quand même localement même si le backend rejette
  } catch (err) {
    reviews.unshift(payload); // backend hors ligne — conservé localement pour cette session
  } finally {
    renderReviews();
    e.target.reset();
    closeReviewModal();
    showToast(t('toast_review_submitted'));
    btn.disabled = false;
  }
});

loadReviews();

// pagination

// Variables pour la pagination
let currentPage = 1;
let articlesPerPage = 8;
let totalPages = 1;

// ---------- filtrage / tri / rendu de la grille ----------
function applyFiltersAndSort() {
  let list = articles.filter(a => {
    const matchSearch = !filters.search || a.title.toLowerCase().includes(filters.search) || a.tags.join(' ').toLowerCase().includes(filters.search);
    const matchCat = !filters.category || a.tags.includes(filters.category);
    const matchAuthor = !filters.author || a.author === filters.author;
    return matchSearch && matchCat && matchAuthor;
  });

  // Trier les articles
  list.sort((a, b) => {
    let va, vb;
    if (filters.sortBy === 'date') { va = new Date(a.date).getTime(); vb = new Date(b.date).getTime(); }
    else if (filters.sortBy === 'likes') { va = reactions[a.id].likeCount; vb = reactions[b.id].likeCount; }
    else { va = a.commentsCount + comments[a.id].length; vb = b.commentsCount + comments[b.id].length; }
    return filters.order === 'desc' ? vb - va : va - vb;
  });

  // Calculer le nombre total de pages
  totalPages = Math.ceil(list.length / articlesPerPage);

  // Extraire les articles pour la page actuelle
  const startIndex = (currentPage - 1) * articlesPerPage;
  const paginatedList = list.slice(startIndex, startIndex + articlesPerPage);

  renderGrid(paginatedList);
  renderPagination(); // Appel de la fonction pour afficher la pagination
}

// Fonction pour rendre la pagination
function renderPagination() {
  const paginationContainer = document.getElementById('pageNumbers');
  if (!paginationContainer) return;

  paginationContainer.innerHTML = '';

  // Boutons pour les pages
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
    pageBtn.textContent = i;
    pageBtn.addEventListener('click', () => {
      currentPage = i;
      applyFiltersAndSort();

      // Scroll fluide vers le bouton "New article"
      const addArticleBtn = document.getElementById('addArticleBtn');
      if (addArticleBtn) {
        addArticleBtn.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
    paginationContainer.appendChild(pageBtn);
  }

  // Désactiver les boutons "Previous" et "Next" si nécessaire
  document.getElementById('prevPage').disabled = currentPage === 1;
  document.getElementById('nextPage').disabled = currentPage === totalPages;
}

// Écouteurs d'événements pour les boutons Previous et Next
document.getElementById('prevPage')?.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    applyFiltersAndSort();
    renderPagination();

    // Scroll fluide vers le bouton "New article"
    const addArticleBtn = document.getElementById('addArticleBtn');
    if (addArticleBtn) {
      addArticleBtn.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

document.getElementById('nextPage')?.addEventListener('click', () => {
  if (currentPage < totalPages) {
    currentPage++;
    applyFiltersAndSort();
    renderPagination();

    // Scroll fluide vers le bouton "New article"
    const addArticleBtn = document.getElementById('addArticleBtn');
    if (addArticleBtn) {
      addArticleBtn.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
});

// explore all

document.getElementById('exploreBtn').addEventListener('click', () => {
  filters = { search: '', category: null, author: null, sortBy: 'date', order: 'desc' };
  document.getElementById('searchInput').value = '';
  document.getElementById('sortSelect').value = 'date';

  currentPage = 1;
  const originalArticlesPerPage = articlesPerPage;
  articlesPerPage = Infinity;

  renderSidebarLists();
  applyFiltersAndSort();

  setTimeout(() => { articlesPerPage = originalArticlesPerPage; }, 100);
});

// Scroll Reveal Effect
function revealElements() {
  const reveals = document.querySelectorAll('.reveal');

  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    const elementVisible = 150; // Distance à partir de laquelle l'élément commence à apparaître

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add('active');
    } else {
      reveals[i].classList.remove('active');
    }
  }
}

// Déclencher la fonction au chargement de la page et au défilement
window.addEventListener('load', revealElements);
window.addEventListener('scroll', revealElements);