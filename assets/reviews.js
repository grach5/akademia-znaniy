/* Академия Знаний — модалка отзывов + карусели + галерея (общий файл для всех страниц) */
(function(){
  var B = (typeof window.__BASE__ === 'string') ? window.__BASE__ : '';
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
    {score:'100',unit:'/ 100',sub:'ЕГЭ · русский язык',txt:'До сих пор не можем поверить, что это произошло — 100 баллов по русскому языку! Огромная благодарность Алёне Вячеславовне за этот результат. Занимались почти год и всё это время чувствовалась поддержка и вера в ребёнка. Очень чёткая система подготовки. Всегда была обратная связь от Алёны. Хоть и дочь у меня не особо верила в свои силы, но Алёнина мотивации и поддержка давали веру в себя еще больше! спасибо вам большое! Катя очень вам благодарна! Рекомендую 1000% как опытного профессионала своего дела!',who:'Мама выпускницы'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · математика',txt:'Сын всегда боялся математики, оценки были на уровне 3. Обратились в репетиторский центр, попали к Владиславу Эдуардовичу. Уже через пару месяцев появился результат и уверенность. В итоге ОГЭ сдали на 5! Это для нас огромный скачок. Спасибо Владиславу Эдуардовичу за терпение и качественный подход! 10 класс мы с вами.',who:'Мама ученика'},
    {score:'91',unit:'/ 100',sub:'ЕГЭ · физика',txt:'Вячеслав Олегович преподаватель, который умеет объяснить даже самые сложные темы простым языком. Физика для меня всегда казалась какой-то не до конца понятной, начиная с 8 класса, но благодаря занятиям всё стало логичным и понятным. В итоге 91 балл по экзамену! Очень благодарен Вам! Спасибо за ваш труд!',who:'Выпускник'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · русский язык',txt:'Готовились к ОГЭ по русскому с Алёной Вячеславовной. Ребёнок писал пробники в школе на 3, были большие проблемы с сочинением. В итоге экзамен сдан на 5! Это вааау! Особенно понравилось, как преподаватель объясняет структуру и учит формулировать мысли. Спасибо огромное! Алёна большая вам благодарность за ваш труд!',who:'Мама ученика'},
    {score:'92',unit:'/ 100',sub:'ЕГЭ · математика',txt:'Занимались с Владиславом Эдуардовичем в 11 классе в течение года. До этого в 10 классе уровень был средний. Но школьная программа и экзамен это разные вещи, мы это уже поняли, как начали готовиться к экзамену. Очень помогла системность и постоянная практика. Хочу отметить вовлеченность Владислава в сам процесс подготовки, даже ночами в неурочные дни, Владислав всегда отвечал и консультирует по вопросам, мы это очень ценим! Экзамен сын сдал на 92 балла! Результат превзошёл все ожидания. Владислав Эдуардович лучший преподаватель!',who:'Мама ученика'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · физика',txt:'Мы пришли с оценкой 4 и неуверенностью в знаниях. Вячеслав Олегович помог закрыть пробелы и объяснил темы, которые раньше не понимались вообще. Занимались 7 месяцев в формате онлайн. Сдали экзамен на 5. Ариела очень вам благодарна! Как оказалось, не все так трудно! В 11 классе планируем сдавать физику и готовиться здесь.',who:'Мама ученицы'},
    {score:'89',unit:'/ 100',sub:'ЕГЭ · русский язык',txt:'Алёна Вячеславовна невероятный педагог. Всё объясняет спокойно, понятно, главное простым языком, ни как по учебнику. 2 года мы готовились к экзамену, занимались очно и в группе. Дочка очень переживала за экзамен, но благодаря подготовке чувствовала себя уверенно. Наш результат- 89 баллов. Очень благодарны Алене! Для нас это очень сильный результат. И мы поступили в Питер на бюджет!',who:'Мама выпускницы'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · математика',txt:'Хочу отметить высокий уровень подготовки в репетиторском центре. Занимались у Владислава Эдуардовича. Преподаватель быстро нашёл подход к ребёнку, объяснял доступно и понятно. Занятия проходили онлайн форме. По экзамену наша оценка 5! Спасибо за результат и отношение! Всем рекомендую!',who:'Родители ученика'},
    {score:'88',unit:'/ 100',sub:'ЕГЭ · физика',txt:'Большое спасибо Вячеславу Олеговичу за качественную подготовку к ЕГЭ. Предмет сложный, но благодаря занятиям я стал понимать логику задач. Занимались мы онлайн. Мой Результат — 88 баллов. Это очень достойно, учитывая стартовый уровень. Благодарю вас за помощь в подготовке, вы сильный преподаватель!',who:'Выпускник'},
    {score:'87',unit:'/ 100',sub:'ЕГЭ · математика',txt:'Занимались не так долго, но даже за это время удалось сильно подтянуть знания. Владислав Эдуардович объясняет чётко и без лишней воды. Всегда на связи , на любые вопросы всегда дает ответы. В общем профессионал своего дела! ЕГЭ сдали на 87 баллов. Очень высокий результат! Спасибо за вашу работу поддержку! Владислава Эдуардовича рекомендуем!!',who:'Выпускник'}
  ]];

  /* отзывы именно о видео-курсе подготовки к ОГЭ по математике */
  var COURSE=[
    {score:'5',unit:'/ 5',sub:'ОГЭ · с сопровождением',txt:'Репетитора нормального найти не получалось, купила курс с сопровождением. Видео короткие, посмотрела - сделала практику, отправила. Один раз написала поздно вечером с вопросом, Владислав Эдуардович ответил и всё объяснил заново! Сдала на пять, очень рекомендую этот формат.',who:'Ученица'},
    {score:'4',unit:'/ 5',sub:'ОГЭ · базовый',txt:'Взял базовый курс, потому что тренировки почти каждый день, времени совсем не было. Смотрел видео между тренировками, задания короткие и по делу, без лишней воды. Пару раз писал с вопросами, хотя в базовом формально проверки нет - всё равно отвечали! Сдал на 4, для меня с моим графиком это отличный результат.',who:'Ученик'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · премиум',txt:'Брала премиум, знала что сама себя не заставлю заниматься. За неделю до ОГЭ начала паниковать, написала Владиславу Эдуардовичу - помог успокоиться и разобрать, что ещё повторить. Написала математику на пять! До сих пор не верится, что справилась.',who:'Ученица'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · с сопровождением',txt:'Дочь занималась на курсе с сопровождением. Сначала неуверенно смотрела первые видео, а потом уже сама разбирала задания без меня! Материал маленькими кусками, сразу практика и проверка. Владислав Эдуардович правда на связи, не для галочки. Экзамен сдан на пять, очень благодарны!',who:'Мама ученицы'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · премиум',txt:'Пошла на премиум, понимала что сама себя не вытяну - времени катастрофически мало, постоянно уезжала на соревнования. Занималась где придётся, в поездах, в гостиницах между сборами, материал всегда под рукой. Если не понимала - писала, объясняли заново, пока не станет ясно. Сдала математику на пять!',who:'Ученица'},
    {score:'4',unit:'/ 5',sub:'ОГЭ · базовый',txt:'Сын занимался на базовом курсе, понравилась структура - короткое объяснение и сразу практика. Были ещё общие созвоны, Владислав Эдуардович разбирал там моменты, которые сами ребята и не подняли бы. Сдал на 4! В 10 классе уже решили продолжать занятия дальше.',who:'Мама ученика'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · с сопровождением',txt:'Взял курс с сопровождением, не пожалел ни разу. Удобно - посмотрел короткое видео, сделал задание, и порядок, не нужно целый час на занятие выделять. Были ещё встречи в студии, разбирали задания посложнее. Сдал на пять, хотя в начале в себя особо не верил!',who:'Ученик'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · с сопровождением',txt:'Дочь занималась в своём темпе, переживала что без давления толку не будет - зря переживала! Маленькие видеоуроки оказались эффективнее, чем я ожидала, обратная связь была постоянной. Результат - пятёрка, и, что важнее, дочь подошла к экзамену спокойной, а не на нервах. Спасибо большое!',who:'Мама ученицы'}
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
  var SHOTS={ math:shotList('math',21), russian:shotList('russian',9), physics:shotList('physics',20), gallery:galList(20),
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
