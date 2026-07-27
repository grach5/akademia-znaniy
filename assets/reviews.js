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
    {score:'100',unit:'/ 100',sub:'ЕГЭ · русский язык',txt:'Когда увидела «100» в результатах — не поверила и открыла страницу заново. Стояла и плакала прямо у компьютера, честное слово. Мы занимались с Алёной Вячеславовной почти год, и я видела, как дочь на глазах менялась: сначала боялась написать лишнее слово в сочинении, а под конец сама объясняла мне, почему нужна именно такая структура. Каждую ошибку разбирали до конца, ни одна не оставалась «непонятой». Это не просто хороший репетитор — это человек, который по-настоящему переживал за результат вместе с нами.',who:'Мама выпускницы'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · математика',txt:'Сын с детства боялся математики — тройка была потолком, и мы это уже приняли. Пришли к Владиславу Эдуардовичу почти без надежды, если честно. А через два месяца он сам, без напоминаний, сел делать домашку — такого у нас никогда не было. ОГЭ сдал на пятёрку, и я до сих пор, когда об этом рассказываю, чувствую комок в горле. Спасибо за терпение и за то, что не сдались, когда мы сами почти сдались.',who:'Мама ученика'},
    {score:'91',unit:'/ 100',sub:'ЕГЭ · физика',txt:'Физика в нашей семье всегда была «страшным» словом — казалось, это что-то только для избранных. Вячеслав Олегович одним объяснением умеет снять этот страх: раскладывает сложную тему по полочкам так, что становится обидно, что раньше никто так просто не объяснил. Сын начал сам решать задачи, которые полгода назад даже читать боялся. 91 балл на ЕГЭ — для нас это маленькое чудо, и мы искренне благодарны.',who:'Родители выпускника'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · русский язык',txt:'У сына с сочинением была настоящая беда — тройки, слёзы перед каждой контрольной. Алёна Вячеславовна не просто «натаскивала» на клише, а учила по-настоящему формулировать мысль — и это чувствовалось. Он стал спокойнее относиться к письменным работам, перестал бояться чистого листа. Экзамен сдан на пятёрку, и, что важнее, сын впервые сказал: «мама, а сочинение — это не так уж и страшно». Огромное спасибо.',who:'Мама ученика'},
    {score:'92',unit:'/ 100',sub:'ЕГЭ · математика',txt:'Пришёл к Владиславу Эдуардовичу в 11 классе со средним уровнем — что-то около 70 баллов, если бы сдавал тогда. Времени было немного, поэтому занимались плотно, без халтуры: разбор ошибок, практика, снова практика. Честно, не ожидал от себя такого результата — 92 балла. До сих пор пересматриваю листок с баллами, когда не верится. Спасибо за системность и за то, что не давали расслабляться.',who:'Выпускник'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · физика',txt:'Пришли с четвёркой и полной неуверенностью — ребёнок сам говорил, что «в физике ничего не понимает». Вячеслав Олегович терпеливо закрыл пробелы, которые копились ещё с прошлых лет, объяснил темы, которые раньше проходили мимо. Итог — уверенная пятёрка на ОГЭ, а ещё неожиданный бонус: сын сам начал интересоваться физикой, смотрит научные ролики по вечерам. Для нас это было настоящим сюрпризом.',who:'Родители ученика'},
    {score:'98',unit:'/ 100',sub:'ЕГЭ · русский язык',txt:'Дочка невероятно переживала перед экзаменом — не спала, накручивала себя. Алёна Вячеславовна умеет объяснять спокойно, без давления, и это передавалось: дочь стала увереннее с каждым занятием. В день экзамена она написала мне: «мам, кажется, у меня получилось». Получилось на 98 баллов! Слов не хватает, чтобы выразить, насколько мы благодарны за этот результат и за поддержку в самый тревожный период.',who:'Мама выпускницы'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · математика',txt:'Владислав Эдуардович быстро нашёл подход к ребёнку — а это, поверьте, было непросто, сын закрывался при любом упоминании математики. Занятия проходили легко, без нажима, но при этом результативно: видно было, как растёт уверенность. Пятёрка на ОГЭ — это не только оценка, это доказательство ребёнку, что он способен на большее, чем сам думал. Спасибо за результат и за такое человеческое отношение.',who:'Родители ученика'},
    {score:'88',unit:'/ 100',sub:'ЕГЭ · физика',txt:'Физика давалась тяжело с самого начала — стартовый уровень был откровенно слабым, и мы переживали, что времени наверстать уже не хватит. Вячеслав Олегович спокойно, шаг за шагом, выстроил логику предмета в голове у сына — и это сработало. 88 баллов на ЕГЭ при таком старте — результат, которым действительно можно гордиться. Благодарим за труд и за веру в ученика, когда у нас самих эта вера временами пропадала.',who:'Родители выпускника'},
    {score:'87',unit:'/ 100',sub:'ЕГЭ · математика',txt:'Занимались с Владиславом Эдуардовичем не так долго, как хотелось бы — времени объективно было мало. Но даже за этот срок удалось подтянуть знания так, что на экзамене я чувствовал спокойствие, а не панику. Объясняет чётко, по делу, без «воды», которая только сбивает перед экзаменом. 87 баллов — результат, о котором в начале подготовки я даже не мечтал. Спасибо за поддержку и честную работу.',who:'Выпускник'}
  ]];

  /* отзывы именно о видео-курсе подготовки к ОГЭ по математике */
  var COURSE=[
    {score:'5',unit:'/ 5',sub:'ОГЭ · с сопровождением',txt:'Купила курс с сопровождением, если честно — от безысходности, репетитора найти не получалось. Оказалось даже лучше: короткие видео по 2–3 минуты, разобрала — сразу делаю практику, отправляю на проверку. Один раз совсем запуталась в теме и написала поздно вечером — Владислав Эдуардович ответил и терпеливо объяснил заново, ни разу не почувствовала себя «навязчивой». В итоге — пятёрка, и я до сих пор не могу поверить, что справилась сама. Огромное спасибо, действительно рекомендую!',who:'Ученица'},
    {score:'4',unit:'/ 5',sub:'ОГЭ · базовый',txt:'Взял базовый курс, потому что спорт съедал всё время — тренировки, сборы, ни на что другое сил не было. Оказалось идеально: видео можно посмотреть даже в перерыве между тренировками, а задания короткие и по делу, без лишней воды. Пару раз писал с вопросами — Владислав Эдуардович всегда отвечал, хотя курс базовый и вроде бы «без проверки». Сдал на 4 — для меня, с моим графиком, это настоящая победа. Спасибо, что сделали подготовку реальной, а не выдуманной.',who:'Ученик'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · премиум',txt:'Брала премиум осознанно — понимала, что сама себя не заставлю, нужен постоянный контроль. И это того стоило: чувствовалось, что тебя не бросают один на один со страхом перед экзаменом. Когда начинала паниковать за неделю до ОГЭ, Владислав Эдуардович находил именно те слова, которые успокаивали. Видео короткие, смотреть не утомительно, а практика сразу после — материал реально оседает в голове. Написала математику на пять и до сих пор улыбаюсь, вспоминая это чувство облегчения. Вы лучшие!',who:'Ученица'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · с сопровождением',txt:'Дочь занималась на курсе с сопровождением, и я как мама видела всё изнутри: как она сначала неуверенно смотрела первые видео, а потом уже сама разбирала задания без моей помощи. Материал по маленьким кусочкам, сразу практика, проверка, обратная связь — ни одно задание не оставалось непонятым. Отдельно скажу: Владислав Эдуардович правда на связи, а не для галочки. Экзамен сдан на пять, а дочь стала увереннее не только в математике. Мы очень рады, что попали именно к вам.',who:'Мама ученицы'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · премиум',txt:'Пошла на премиум, потому что честно понимала: сама себя не вытяну, а времени катастрофически мало — постоянно уезжала на соревнования. Оказалось спасением: занималась в самолётах, в гостиницах, между сборами — материал всегда под рукой. Если что-то не понимала — писала, и мне не просто отвечали формально, а объясняли до тех пор, пока не станет ясно. Сдала математику на пять, хотя ещё полгода назад не верила, что это вообще возможно при таком графике. Вы лучшие, без вас точно бы не справилась!',who:'Ученица'},
    {score:'4',unit:'/ 5',sub:'ОГЭ · базовый',txt:'Сын занимался на базовом курсе, и меня подкупила именно структура: короткое объяснение — сразу практика, никакой воды. Были и общие созвоны, где Владислав Эдуардович разбирал моменты, которые ребята сами не подняли бы. Видела, как сын постепенно перестал бояться экзамена — просто потому что появилась понятная система. В итоге — четвёрка, и мы уже решили продолжать занятия в 10 классе. Спасибо, что сделали математику понятной.',who:'Мама ученика'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · с сопровождением',txt:'Взял курс с сопровождением и не пожалел ни разу. Удобно, что не нужно выделять на занятия по часу — посмотрел короткое видео, сделал задание, и порядок. Если что-то не понял — можно переспросить, и объяснят снова, без раздражения. Ещё запомнились бесплатные встречи в студии, где разбирали действительно сложные задания второй части — по-дружески, без напряга. Сдал на пять, хотя в начале был совсем не уверен в себе. Спасибо за атмосферу и за результат.',who:'Ученик'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · с сопровождением',txt:'Хочу от всей души поблагодарить Владислава Эдуардовича за экзаменационный курс. Дочь занималась в своём темпе, без давления и лишнего стресса — а маленькие видеоуроки оказались удивительно эффективными, даже лучше, чем я ожидала. Обратная связь была постоянной, ни один вопрос не остался без ответа. Результат — пятёрка, и, что важнее, дочь подошла к экзамену спокойной, а не на нервах. Замечательный преподаватель, рекомендуем от всего сердца!',who:'Мама ученицы'}
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
  var SHOTS={ math:shotList('math',21), russian:shotList('russian',9), physics:shotList('physics',8), gallery:galList(20) };
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
})();
