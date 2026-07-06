/* Академия Знаний — модалка отзывов + карусели + галерея (для главной и /otzyvy/) */
(function(){
  var B='/akademia-znaniy';
  /* "!" открывает текст №1 у основателя (если есть) */
  document.querySelectorAll('.excl').forEach(function(b){
    b.addEventListener('click',function(){
      var t=document.getElementById(b.getAttribute('data-opens'));
      if(!t)return;
      if(!t.classList.contains('open')) t.querySelector('.reveal-trigger').click();
      t.scrollIntoView({behavior:'smooth',block:'center'});
    });
  });

  var DATA=[[
    {score:'100',unit:'/ 100',sub:'ЕГЭ · русский язык',txt:'До сих пор не можем поверить, что это произошло — 100 баллов по русскому языку! Огромная благодарность Алёне Вячеславовне за этот результат. Занимались почти год, и всё это время чувствовалась поддержка и вера в ребёнка. Очень чёткая система подготовки, разбор каждой ошибки. Это не просто репетитор, это человек, который реально доводит до результата.',who:'Мама выпускницы'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · математика',txt:'Сын всегда боялся математики, оценки были на уровне 3. Обратились в репетиторский центр, попали к Владиславу Эдуардовичу. Уже через пару месяцев появился результат и уверенность. В итоге ОГЭ сдали на 5! Это для нас огромный скачок. Спасибо за терпение и подход!',who:'Мама ученика'},
    {score:'91',unit:'/ 100',sub:'ЕГЭ · физика',txt:'Вячеслав Олегович — преподаватель, который умеет объяснить даже самые сложные темы. Физика всегда казалась чем-то недосягаемым, но благодаря занятиям всё стало логичным и понятным. Итог — 91 балл на ЕГЭ. Очень благодарны!',who:'Родители выпускника'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · русский язык',txt:'Готовились к ОГЭ по русскому с Алёной Вячеславовной. Ребёнок писал на 3, были большие проблемы с сочинением. В итоге экзамен сдан на 5! Особенно понравилось, как преподаватель объясняет структуру и учит формулировать мысли. Спасибо огромное!',who:'Мама ученика'},
    {score:'92',unit:'/ 100',sub:'ЕГЭ · математика',txt:'Занимались с Владиславом Эдуардовичем в 11 классе. До этого уровень был средний, около 70 баллов. Очень помогла системность и постоянная практика. Экзамен сдали на 92 балла! Результат превзошёл все ожидания. Спасибо!',who:'Выпускник'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · физика',txt:'Пришли с оценкой 4 и неуверенностью в знаниях. Вячеслав Олегович помог закрыть пробелы и объяснил темы, которые раньше не понимались вообще. В итоге уверенная 5 на ОГЭ. Ребёнок даже начал интересоваться физикой — это для нас было неожиданно!',who:'Родители ученика'},
    {score:'98',unit:'/ 100',sub:'ЕГЭ · русский язык',txt:'Алёна Вячеславовна — невероятный педагог. Всё объясняет спокойно, понятно, без давления. Дочка очень переживала за экзамен, но благодаря подготовке чувствовала себя уверенно. Итог — 98 баллов. Очень благодарны за такой результат!',who:'Мама выпускницы'},
    {score:'5',unit:'/ 5',sub:'ОГЭ · математика',txt:'Хочу отметить высокий уровень подготовки в центре. Владислав Эдуардович быстро нашёл подход к ребёнку, объясняет доступно и по делу. Занятия проходили продуктивно. В итоге — 5 на ОГЭ. Спасибо за результат и отношение!',who:'Родители ученика'},
    {score:'88',unit:'/ 100',sub:'ЕГЭ · физика',txt:'Большое спасибо Вячеславу Олеговичу за подготовку к ЕГЭ. Предмет сложный, но благодаря занятиям ребёнок стал понимать логику задач. Результат — 88 баллов. Это очень достойно, учитывая стартовый уровень. Благодарим!',who:'Родители выпускника'},
    {score:'87',unit:'/ 100',sub:'ЕГЭ · математика',txt:'Занимались не так долго, но даже за это время удалось сильно подтянуть знания. Владислав Эдуардович объясняет чётко и без лишней воды. Экзамен сдали на 87 баллов. Спасибо за результат и поддержку!',who:'Выпускник'}
  ]];
  var modal=document.getElementById('revModal');
  if(!modal) return;
  var track=document.getElementById('revTrack'), dots=document.getElementById('revDots'), cur=0, set=[];
  function loadSlide(i){var sl=track.querySelectorAll('.rev-slide')[i];if(!sl)return;var im=sl.querySelector('img[data-src]');if(im){im.src=im.getAttribute('data-src');im.removeAttribute('data-src');}}
  function render(start){
    start=start||0;
    track.innerHTML=set.map(function(s,i){
      var inner=s.empty?'<div class="rev-empty">Скриншоты отзывов скоро появятся.</div>'
        :s.img?'<div class="rev-shot"><img data-src="'+s.img+'" alt="Скриншот отзыва ученика"></div>'
        :'<div class="rev-card"><div class="score">'+s.score+' <em>'+(s.unit||'/ 100')+'</em></div><div class="sub">'+s.sub+'</div><p>«'+s.txt+'»</p><div class="who"><b>'+s.who+'</b></div></div>';
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
  function shotList(subj,n){var a=[];for(var i=1;i<=n;i++)a.push(B+'/reviews/'+subj+'/'+i+'.jpg');return a;}
  function galList(n){var a=[];for(var i=1;i<=n;i++)a.push(B+'/gallery/'+i+'.jpg');return a;}
  var SHOTS={ math:shotList('math',21), russian:shotList('russian',9), physics:shotList('physics',8), gallery:galList(20) };
  function openShots(key,start){var imgs=SHOTS[key]||[];set=imgs.length?imgs.map(function(src){return {img:src};}):[{empty:true}];setTitle(key==='gallery'?'Учебный <em>лайф</em>':'Отзывы <em>учеников</em>');render(start||0);modal.classList.add('open');document.body.style.overflow='hidden';}
  function close(){modal.classList.remove('open');document.body.style.overflow='';}
  document.querySelectorAll('.btn-rev').forEach(function(b){b.addEventListener('click',function(){var sh=b.getAttribute('data-shots');if(sh)openShots(sh);else open(parseInt(b.getAttribute('data-rev'),10)||0);});});
  document.querySelectorAll('.btn[data-shots]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();openShots(b.getAttribute('data-shots'));});});
  document.getElementById('revClose').addEventListener('click',close);
  document.getElementById('revPrev').addEventListener('click',function(){show(cur-1);});
  document.getElementById('revNext').addEventListener('click',function(){show(cur+1);});
  modal.addEventListener('click',function(e){if(e.target===modal)close();});
  document.addEventListener('keydown',function(e){if(!modal.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1);});

  function initCarousel(row,prevBtn,nextBtn){
    if(!row)return; var idx=0;
    function unit(){var c=row.children[0];return c?c.getBoundingClientRect().width+26:320;}
    function maxIdx(){var vp=row.parentElement.clientWidth;var per=Math.max(1,Math.round(vp/unit()));return Math.max(0,row.children.length-per);}
    function apply(){idx=Math.max(0,Math.min(idx,maxIdx()));row.style.transform='translateX(-'+(idx*unit())+'px)';}
    if(prevBtn)prevBtn.addEventListener('click',function(){idx--;apply();});
    if(nextBtn)nextBtn.addEventListener('click',function(){idx++;apply();});
    window.addEventListener('resize',function(){idx=0;apply();});apply();
  }
  function cardHTML(s){return '<div class="r-card"><div class="r-score">'+s.score+' <em>'+(s.unit||'/ 100')+'</em></div><div class="r-sub">'+s.sub+'</div><p>«'+s.txt+'»</p><div class="who"><b>'+s.who+'</b></div></div>';}
  var row=document.getElementById('revRow');
  if(row){ row.innerHTML=DATA[0].map(cardHTML).join(''); initCarousel(row,document.getElementById('rowPrev'),document.getElementById('rowNext')); }

  var GALN=20;
  var grow=document.getElementById('galleryRow');
  if(grow){
    var gh=''; for(var gi=1;gi<=GALN;gi++){ gh+='<button class="g-card" type="button" data-gi="'+(gi-1)+'" aria-label="Открыть фото на весь экран"><img loading="lazy" src="'+B+'/gallery/'+gi+'.jpg" alt="Ученики центра «Академия Знаний» в студии"><span class="zoom" aria-hidden="true">⤢</span></button>'; }
    grow.innerHTML=gh;
    grow.querySelectorAll('.g-card').forEach(function(c){ c.addEventListener('click',function(){ openShots('gallery', parseInt(c.getAttribute('data-gi'),10)||0); }); });
    initCarousel(grow,document.getElementById('galPrev'),document.getElementById('galNext'));
  }
})();
