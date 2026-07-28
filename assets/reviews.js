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
    {score:'100',unit:'/ 100',sub:'ЕГЭ · русский язык',txt:'Готовились с Алёной Вячеславовной с октября, два раза в неделю. Сначала дочь вообще не понимала, как писать сочинение, путалась в аргументах. Сейчас смотрю на 100 баллов и до сих пор не до конца верю. Спасибо, что не отпускала до последнего, даже когда дочка сама хотела всё бросить перед Новым годом.',who:'Мама выпускницы'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · математика',txt:'Сын учится так себе если честно, тройка по математике была обычным делом. После нескольких месяцев с Владиславом Эдуардовичем стал сам садиться за учебник, без скандалов и напоминаний. Пятёрка на ОГЭ — для нас это прям событие.',who:'Мама ученика'},
    {score:'91',unit:'/ 100',sub:'ЕГЭ · физика',txt:'Ходили сначала раз в неделю, потом добавили ещё день перед экзаменом. Вячеслав Олегович нормально объясняет, без занудства и лишних слов. 91 балл, сын доволен, мы тоже.',who:'Родители выпускника'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · русский язык',txt:'С сочинением беда была полная, учитель в школе только оценки ставила, а как исправлять — непонятно. Алёна Вячеславовна разложила структуру по полочкам, показала на примерах из прошлых работ. Пятёрка, в итоговой почти не было ошибок.',who:'Мама ученика'},
    {score:'92',unit:'/ 100',sub:'ЕГЭ · математика',txt:'Занимался два месяца, больше времени не было. Владислав Эдуардович сразу сказал, что упор будет на вторую часть, раз с базой более-менее порядок. В итоге 92, а рассчитывал баллов на 15 меньше.',who:'Выпускник'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · физика',txt:'Ребёнок физику вообще не любил, да и мы особо помочь не могли. Вячеслав Олегович как-то смог объяснить так, что стало доходить. Пятёрка на ОГЭ, но самое неожиданное — учебник по физике теперь не пылится в комнате.',who:'Родители ученика'},
    {score:'98',unit:'/ 100',sub:'ЕГЭ · русский язык',txt:'Перед экзаменом дочь почти не спала, нервы у всех были на пределе. Алёна Вячеславовна созванивалась с ней отдельно вечером накануне, успокаивала. 98 баллов — результат, конечно, но и то, что она вообще спокойно зашла на экзамен, для меня не меньше значит.',who:'Мама выпускницы'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · математика',txt:'Пробовали заниматься с другим репетитором до этого, не пошло вообще. У Владислава Эдуардовича сын хотя бы не сидит с квадратными глазами на занятиях. Через 4 месяца — пятёрка.',who:'Родители ученика'},
    {score:'88',unit:'/ 100',sub:'ЕГЭ · физика',txt:'Начинали практически с нуля, уровень был слабый совсем. Вячеслав Олегович спокойно, без нервов объяснял одно и то же по несколько раз, пока не станет понятно. 88 баллов при таком старте — считаю, отличный результат.',who:'Родители выпускника'},
    {score:'87',unit:'/ 100',sub:'ЕГЭ · математика',txt:'Времени было мало, начал заниматься только в декабре. Материал объясняет чётко, лишнего не говорит. 87 баллов, доволен, друзьям уже посоветовал.',who:'Выпускник'}
  ]];

  /* отзывы именно о видео-курсе подготовки к ОГЭ по математике */
  var COURSE=[
    {score:'5',unit:'/ 5',sub:'ОГЭ · с сопровождением',txt:'Купила курс с сопровождением, репетитора нормального найти не получалось если честно. Видео короткие, по 2-3 минуты, посмотрела — сделала практику, отправила. Один раз написала поздно вечером с вопросом, Владислав Эдуардович ответил и объяснил заново. Сдала на пять.',who:'Ученица'},
    {score:'4',unit:'/ 5',sub:'ОГЭ · базовый',txt:'Взял базовый, потому что тренировки почти каждый день, времени особо не было. Смотрел видео в перерывах, задания короткие. Пару раз писал с вопросами, хотя формально в базовом курсе проверки нет — всё равно отвечали. Сдал на 4.',who:'Ученик'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · премиум',txt:'Брала премиум, знала, что сама себя заставлять не буду. За неделю до ОГЭ начала паниковать, написала — помогли успокоиться и разобрать, что ещё повторить. Написала на пять.',who:'Ученица'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · с сопровождением',txt:'Дочь сначала смотрела видео неуверенно, потом уже сама разбирала задания. Материал маленькими кусками, сразу практика и проверка. Владислав Эдуардович правда отвечает, не для галочки. Сдала на пять.',who:'Мама ученицы'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · премиум',txt:'Постоянно ездила на соревнования, обычные занятия по расписанию вообще не подходили. Смотрела видео в поездах, в гостиницах между сборами. Если не понимала — писала, объясняли, пока не станет ясно. Математику сдала на пять.',who:'Ученица'},
    {score:'4',unit:'/ 5',sub:'ОГЭ · базовый',txt:'Сын на базовом, подкупило, что без лишнего — объяснение и сразу практика. Были общие созвоны, там разбирали то, что сами ребята и не спросили бы. Сдал на 4, в 10 классе решили уже перейти на индивидуальные занятия.',who:'Мама ученика'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · с сопровождением',txt:'Курс с сопровождением, не пожалел. Посмотрел видео, сделал задание — и порядок, не нужно час на занятие выделять. Были ещё встречи в студии, разбирали задания посложнее. Сдал на пять, хотя в начале особо не верил в себя.',who:'Ученик'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · с сопровождением',txt:'Дочь занималась в своём темпе, я переживала, что без давления не будет толку — зря переживала. Обратная связь была постоянно, вопросы не оставались висеть. Сдала на пять, и, что важнее, перед экзаменом была спокойная, а не на нервах.',who:'Мама ученицы'}
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
    alena:[{src:B+'/team/alena.jpg',alt:'Сидорова Алёна Вячеславовна — преподаватель русского языка'},{src:B+'/team/alena-2.jpg',alt:'Сидорова Алёна Вячеславовна — преподаватель русского языка'}]
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
