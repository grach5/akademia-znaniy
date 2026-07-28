/* Академия Знаний — модалка отзывов + карусели + галерея (общий файл для всех страниц) */
(function(){
  var B = window.__BASE__ || '/akademia-znaniy';
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
  }); }
  /* "!" открывает текст №1 у основателя (если есть) */
  document.querySelectorAll('.excl').forEach(function(b){
    b.addEventListener('click',function(){
      var t=document.getElementById(b.getAttribute('data-opens'));
      if(!t)return;
      if(!t.classList.contains('open')) t.querySelector('.reveal-trigger').click();
      t.scrollIntoView({behavior:'smooth',block:'center'});
    });
  });

  /* общие отзывы — по всем предметам */
  var DATA=[[
    {score:'100',unit:'/ 100',sub:'ЕГЭ · русский язык',txt:'Ходили к Алёне почти год, два раза в неделю. Сочинения раньше вообще боялась писать. Сейчас 100 баллов, сама в шоке если честно.',who:'Мама выпускницы'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · математика',txt:'У нас тройка была потолком всегда, ничего с этим сделать не могли. Позанимались несколько месяцев — сдал на пятёрку. Не ожидала такого.',who:'Мама ученика'},
    {score:'91',unit:'/ 100',sub:'ЕГЭ · физика',txt:'Объясняет понятно, без воды. Ходили примерно полгода, перед экзаменом уже два раза в неделю. 91 балл, довольны.',who:'Родители выпускника'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · русский язык',txt:'С сочинением беда была, в школе просто оценки ставили и всё, без объяснений. Тут разобрали по шагам. Пятёрка, ошибок почти не было.',who:'Мама ученика'},
    {score:'92',unit:'/ 100',sub:'ЕГЭ · математика',txt:'Занимался всего пару месяцев, больше времени не было. Упор сделали на вторую часть. 92 балла, сам не думал что так получится.',who:'Выпускник'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · физика',txt:'Физику вообще не понимал, мы тоже помочь не могли особо. Через несколько месяцев — пятёрка на ОГЭ. Удивлены если честно.',who:'Родители ученика'},
    {score:'98',unit:'/ 100',sub:'ЕГЭ · русский язык',txt:'Перед экзаменом дочь почти не спала. Алёна с ней отдельно созванивалась вечером накануне. 98 баллов в итоге, но главное — она спокойно на экзамен зашла.',who:'Мама выпускницы'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · математика',txt:'До этого был другой репетитор, не пошло вообще. Тут сын хотя бы не сидит с квадратными глазами на занятиях. Через 4 месяца пятёрка.',who:'Родители ученика'},
    {score:'88',unit:'/ 100',sub:'ЕГЭ · физика',txt:'Начинали почти с нуля. Терпеливый, объяснял по несколько раз одно и то же, пока не доходило. 88 баллов при таком старте — хороший результат.',who:'Родители выпускника'},
    {score:'87',unit:'/ 100',sub:'ЕГЭ · математика',txt:'Начал заниматься только в декабре, поздновато конечно. Объясняет по делу. 87 баллов, доволен.',who:'Выпускник'}
  ]];

  /* отзывы именно о видео-курсе подготовки к ОГЭ по математике */
  var COURSE=[
    {score:'5',unit:'/ 5',sub:'ОГЭ · с сопровождением',txt:'Репетитора нормального найти не получалось, купила курс. Видео короткие, практика сразу после. Один раз написала поздно вечером с вопросом — ответили и объяснили. Сдала на пять.',who:'Ученица'},
    {score:'4',unit:'/ 5',sub:'ОГЭ · базовый',txt:'Взял базовый, тренировки почти каждый день были, времени особо нет. Смотрел в перерывах между ними. Сдал на 4, доволен.',who:'Ученик'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · премиум',txt:'Брала премиум, знала что сама себя заставлять не буду. За неделю до экзамена запаниковала, написала — помогли разобраться, что ещё повторить. В итоге пять.',who:'Ученица'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · с сопровождением',txt:'Дочь сначала не очень уверенно смотрела видео, потом уже сама всё разбирала. Проверяют быстро, не для галочки. Сдала на пять.',who:'Мама ученицы'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · премиум',txt:'Ездила постоянно на соревнования, обычные занятия по времени вообще не подходили. Смотрела видео где придётся — в поезде, в гостинице. Математику сдала на пять.',who:'Ученица'},
    {score:'4',unit:'/ 5',sub:'ОГЭ · базовый',txt:'Сын на базовом, понравилось что без воды — объяснение и сразу практика. Сдал на 4, с 10 класса решили уже на индивидуальные перейти.',who:'Мама ученика'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · с сопровождением',txt:'Курс с сопровождением брал. Удобно, час на занятие выделять не надо — посмотрел видео, сделал задание. Сдал на пять, в начале особо не верил в себя если честно.',who:'Ученик'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · с сопровождением',txt:'Переживала что без давления толку не будет. Зря переживала. Обратная связь была постоянно. Сдала на пять и, что важнее, спокойная перед экзаменом была.',who:'Мама ученицы'}
  ];

  /* карусели (revRow / courseRow / galleryRow) — работают на любой странице,
     независимо от того, есть ли на ней модалка со скриншотами */
  function initCarousel(row,prevBtn,nextBtn){
    if(!row)return; var idx=0;
    function unit(){var c=row.children[0];return c?c.getBoundingClientRect().width+26:320;}
    function maxIdx(){var vp=row.parentElement.clientWidth;var per=Math.max(1,Math.round(vp/unit()));return Math.max(0,row.children.length-per);}
    function apply(){idx=Math.max(0,Math.min(idx,maxIdx()));row.style.transform='translateX(-'+(idx*unit())+'px)';}
    if(prevBtn)prevBtn.addEventListener('click',function(){idx--;apply();});
    if(nextBtn)nextBtn.addEventListener('click',function(){idx++;apply();});
    window.addEventListener('resize',function(){idx=0;apply();});apply();
  }
  function cardHTML(s){return '<div class="r-card"><div class="r-score">'+esc(s.score)+' <em>'+esc(s.unit||'/ 100')+'</em></div><div class="r-sub">'+esc(s.sub)+'</div><p>«'+esc(s.txt)+'»</p><div class="who"><b>'+esc(s.who)+'</b></div></div>';}

  var row=document.getElementById('revRow');
  if(row){ row.innerHTML=DATA[0].map(cardHTML).join(''); initCarousel(row,document.getElementById('rowPrev'),document.getElementById('rowNext')); }

  var crow=document.getElementById('courseRow');
  if(crow){ crow.innerHTML=COURSE.map(cardHTML).join(''); initCarousel(crow,document.getElementById('coursePrev'),document.getElementById('courseNext')); }

  var GALN=20;
  var grow=document.getElementById('galleryRow');
  if(grow){
    var galThumbs=galList(GALN);
    var gh=''; for(var gi=1;gi<=GALN;gi++){ gh+='<button class="g-card" type="button" data-gi="'+(gi-1)+'" aria-label="Открыть фото на весь экран"><img loading="lazy" src="'+B+'/gallery/'+gi+'.jpg" alt="'+esc(galThumbs[gi-1].alt)+'"><span class="zoom" aria-hidden="true">⤢</span></button>'; }
    grow.innerHTML=gh;
    initCarousel(grow,document.getElementById('galPrev'),document.getElementById('galNext'));
  }

  /* всё, что ниже, требует модалку со скриншотами — есть только на главной и /otzyvy/ */
  var modal=document.getElementById('revModal');
  if(!modal) return;
  var track=document.getElementById('revTrack'), dots=document.getElementById('revDots'), cur=0, set=[];
  function loadSlide(i){var sl=track.querySelectorAll('.rev-slide')[i];if(!sl)return;var im=sl.querySelector('img[data-src]');if(im){im.src=im.getAttribute('data-src');im.removeAttribute('data-src');}}
  function render(start){
    start=start||0;
    track.innerHTML=set.map(function(s,i){
      var inner=s.empty?'<div class="rev-empty">Скриншоты отзывов скоро появятся.</div>'
        :s.img?'<div class="rev-shot"><img data-src="'+esc(s.img)+'" alt="'+esc(s.alt||'Скриншот отзыва ученика')+'"></div>'
        :'<div class="rev-card"><div class="score">'+esc(s.score)+' <em>'+esc(s.unit||'/ 100')+'</em></div><div class="sub">'+esc(s.sub)+'</div><p>«'+esc(s.txt)+'»</p><div class="who"><b>'+esc(s.who)+'</b></div></div>';
      return '<div class="rev-slide'+(i===start?' active':'')+'">'+inner+'</div>';
    }).join('');
    dots.innerHTML='<span class="rev-count">'+(start+1)+' / '+set.length+'</span>';
    cur=start;loadSlide(start);loadSlide((start+1)%set.length);loadSlide((start-1+set.length)%set.length);
  }
  function show(i){cur=(i+set.length)%set.length;
    track.querySelectorAll('.rev-slide').forEach(function(el,k){el.classList.toggle('active',k===cur);});
    loadSlide(cur);loadSlide((cur+1)%set.length);loadSlide((cur-1+set.length)%set.length);
    var c=dots.querySelector('.rev-count');if(c)c.textContent=(cur+1)+' / '+set.length;}
  function setTitle(html){var rt=document.querySelector('#revModal .rt');if(rt)rt.innerHTML=html;}
  function open(idx){set=DATA[idx]||DATA[0];setTitle('Отзывы <em>учеников</em>');render();modal.classList.add('open');document.body.style.overflow='hidden';}
  var SUBJ_LABEL={math:'по математике',russian:'по русскому языку',physics:'по физике'};
  function shotList(subj,n){var a=[];for(var i=1;i<=n;i++)a.push({src:B+'/reviews/'+subj+'/'+i+'.jpg',alt:'Скриншот отзыва '+(SUBJ_LABEL[subj]||'')+' — '+i+' из '+n});return a;}
  function galList(n){var a=[];for(var i=1;i<=n;i++)a.push({src:B+'/gallery/'+i+'.jpg',alt:'Ученики центра «Академия Знаний» в студии — фото '+i+' из '+n});return a;}
  var SHOTS={ math:shotList('math',21), russian:shotList('russian',9), physics:shotList('physics',8), gallery:galList(20),
    founder:[{src:B+'/team/founder2.jpg',alt:'Дубровский Владислав Эдуардович — основатель репетиторского центра «Академия Знаний»'},{src:B+'/team/founder.jpg',alt:'Дубровский Владислав Эдуардович — основатель репетиторского центра «Академия Знаний»'}],
    lobanov:[{src:B+'/team/lobanov.jpg',alt:'Лобанов Вячеслав Олегович — преподаватель физики и математики'},{src:B+'/team/lobanov-2.jpg',alt:'Лобанов Вячеслав Олегович — преподаватель физики и математики'}],
    alena:[{src:B+'/team/alena.jpg',alt:'Сидорова Алёна Вячеславовна — преподаватель русского языка'},{src:B+'/team/alena-2.jpg',alt:'Сидорова Алёна Вячеславовна — преподаватель русского языка'}],
    course:[{src:B+'/team/course.jpg',alt:'Дубровский Владислав Эдуардович — курс подготовки к ОГЭ по математике'},{src:B+'/team/course-2.jpg',alt:'Дубровский Владислав Эдуардович — курс подготовки к ОГЭ по математике'}]
  };
  function openShots(key,start){var imgs=SHOTS[key]||[];set=imgs.length?imgs.map(function(o){return {img:o.src,alt:o.alt};}):[{empty:true}];setTitle(key==='gallery'?'Учебный <em>лайф</em>':'Отзывы <em>учеников</em>');render(start||0);modal.classList.add('open');document.body.style.overflow='hidden';}
  function close(){modal.classList.remove('open');document.body.style.overflow='';}
  document.querySelectorAll('.btn-rev').forEach(function(b){b.addEventListener('click',function(){var sh=b.getAttribute('data-shots');if(sh)openShots(sh);else open(parseInt(b.getAttribute('data-rev'),10)||0);});});
  document.querySelectorAll('.btn[data-shots]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();openShots(b.getAttribute('data-shots'));});});
  document.getElementById('revClose').addEventListener('click',close);
  document.getElementById('revPrev').addEventListener('click',function(){show(cur-1);});
  document.getElementById('revNext').addEventListener('click',function(){show(cur+1);});
  modal.addEventListener('click',function(e){if(e.target===modal)close();});
  document.addEventListener('keydown',function(e){if(!modal.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1);});
  if(grow){ grow.querySelectorAll('.g-card').forEach(function(c){ c.addEventListener('click',function(){ openShots('gallery', parseInt(c.getAttribute('data-gi'),10)||0); }); }); }

  /* клик по фото основателя/преподавателя — открыть на весь экран */
  document.querySelectorAll('.photo[data-shots]').forEach(function(el){
    el.setAttribute('role','button'); el.setAttribute('tabindex','0');
    function trigger(){ openShots(el.getAttribute('data-shots')); }
    el.addEventListener('click',trigger);
    el.addEventListener('keydown',function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); trigger(); } });
  });
})();
