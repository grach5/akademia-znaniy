/* Академия Знаний — общий скрипт для всех страниц */
(function(){
  // шапка: фон при скролле + индикатор прогресса
  var head=document.getElementById('head'), prog=document.getElementById('progress');
  function onScroll(){
    if(head) head.classList.toggle('scrolled',window.scrollY>40);
    if(prog){var de=document.documentElement;var h=de.scrollHeight-de.clientHeight;prog.style.width=(h>0?(window.scrollY/h*100):0)+'%';}
  }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  // мобильное меню (бургер)
  var burger=document.getElementById('burger'), nav=document.querySelector('.nav-links');
  if(burger && nav){
    burger.addEventListener('click',function(){
      var open=document.body.classList.toggle('nav-open');
      burger.setAttribute('aria-expanded',open?'true':'false');
    });
    nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){document.body.classList.remove('nav-open');burger.setAttribute('aria-expanded','false');});});
  }

  // появление при скролле
  var io=new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});
  },{threshold:.16,rootMargin:'0px 0px -60px 0px'});
  document.querySelectorAll('.ro').forEach(function(el){io.observe(el);});

  // счётчик для статистики
  var cio=new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(!e.isIntersecting)return; cio.unobserve(e.target);
      var el=e.target, target=parseInt(el.getAttribute('data-count'),10)||0, cv=el.querySelector('.cv'), t0=null, dur=1400;
      function tick(ts){if(!t0)t0=ts;var p=Math.min((ts-t0)/dur,1);var val=Math.round((1-Math.pow(1-p,3))*target);if(cv)cv.textContent=val;if(p<1)requestAnimationFrame(tick);}
      requestAnimationFrame(tick);
    });
  },{threshold:.5});
  document.querySelectorAll('.stat .num[data-count]').forEach(function(el){cio.observe(el);});

  // раскрывающиеся блоки
  document.querySelectorAll('[data-reveal]').forEach(function(block){
    var btn=block.querySelector('.reveal-trigger');
    var body=block.querySelector('.reveal-body');
    if(!btn||!body)return;
    btn.addEventListener('click',function(){
      var open=block.classList.toggle('open');
      btn.setAttribute('aria-expanded',open?'true':'false');
      body.style.maxHeight=open?body.scrollHeight+'px':'0px';
    });
  });

  // форма заявки на странице контактов -> открывает WhatsApp с готовым текстом
  var leadForm = document.getElementById('leadForm');
  if (leadForm) {
    leadForm.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var name = (leadForm.querySelector('[name="name"]').value || '').trim();
      var phoneVal = (leadForm.querySelector('[name="phone"]').value || '').trim();
      var msg = (leadForm.querySelector('[name="msg"]').value || '').trim();
      var text = 'Здравствуйте! Меня зовут ' + name + '.' +
        (phoneVal ? ' Мой телефон: ' + phoneVal + '.' : '') +
        (msg ? ' ' + msg : '');
      ymGoal('form_submit');
      window.open('https://wa.me/79626788882?text=' + encodeURIComponent(text), '_blank', 'noopener');
    });
  }

  // цели Яндекс.Метрики: клики по телефону, WhatsApp, Telegram
  function ymGoal(name){ if (typeof window.ym === 'function') window.ym(111243476, 'reachGoal', name); }
  document.querySelectorAll('a[href^="tel:"]').forEach(function(a){
    a.addEventListener('click', function(){ ymGoal('phone_click'); });
  });
  document.querySelectorAll('a[href*="wa.me"]').forEach(function(a){
    a.addEventListener('click', function(){ ymGoal('whatsapp_click'); });
  });
  document.querySelectorAll('a[href*="t.me/"]').forEach(function(a){
    a.addEventListener('click', function(){ ymGoal('telegram_click'); });
  });

  // плавный скролл к якорям с учётом фиксированной шапки
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(ev){
      var id=a.getAttribute('href');
      if(id.length<2)return;
      var t=document.querySelector(id);
      if(!t)return;
      ev.preventDefault();
      var y=t.getBoundingClientRect().top+window.scrollY-((head&&head.classList.contains('scrolled'))?70:90);
      window.scrollTo({top:y,behavior:'smooth'});
    });
  });

  // фон: дрейфующая сеть формул/символов
  var cv=document.getElementById('bg-formulas');
  if(cv && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var ctx=cv.getContext('2d'),DPR=Math.min(window.devicePixelRatio||1,1.5);
    var SYM=['∫','π','√','∑','Δ','x²','α','β','λ','θ','ω','≈','±','÷','=','∞','sin','cos','7','9','ОГЭ','ЕГЭ'];
    var ps=[],running=true;
    function size(){cv.width=window.innerWidth*DPR;cv.height=window.innerHeight*DPR;}
    function seed(){size();ps=[];var n=Math.max(18,Math.min(46,Math.round(window.innerWidth*window.innerHeight/34000)));
      for(var i=0;i<n;i++)ps.push({x:Math.random()*cv.width,y:Math.random()*cv.height,vx:(Math.random()-.5)*.3*DPR,vy:(Math.random()-.5)*.3*DPR,s:SYM[i%SYM.length],red:Math.random()<.26});}
    seed();window.addEventListener('resize',seed);
    document.addEventListener('visibilitychange',function(){running=!document.hidden;if(running)requestAnimationFrame(loop);});
    function loop(){
      if(!running)return;
      var w=cv.width,h=cv.height,max=120*DPR;
      ctx.clearRect(0,0,w,h);
      for(var i=0;i<ps.length;i++){var a=ps[i];a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>w)a.vx*=-1;if(a.y<0||a.y>h)a.vy*=-1;}
      for(var i=0;i<ps.length;i++)for(var j=i+1;j<ps.length;j++){var a=ps[i],b=ps[j],d=Math.hypot(a.x-b.x,a.y-b.y);
        if(d<max){ctx.strokeStyle='rgba(225,6,0,'+(.15*(1-d/max))+')';ctx.lineWidth=DPR;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
      ctx.textAlign='center';ctx.textBaseline='middle';ctx.font=(15*DPR)+'px Georgia, serif';
      for(var i=0;i<ps.length;i++){var a=ps[i];ctx.fillStyle=a.red?'rgba(225,6,0,.6)':'rgba(245,243,239,.4)';ctx.fillText(a.s,a.x,a.y);}
      requestAnimationFrame(loop);
    }
    loop();
  }
})();
