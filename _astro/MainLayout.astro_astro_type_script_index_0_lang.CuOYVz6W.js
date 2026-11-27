(function(){const c=document.querySelector("[data-menu-toggle]"),a=document.getElementById("mobile-nav");c&&a&&(c.addEventListener("click",()=>{const e=a.classList.toggle("open");c.setAttribute("aria-expanded",String(e)),document.body.classList.toggle("nav-open",e)}),a.querySelectorAll("a").forEach(e=>e.addEventListener("click",()=>{a.classList.remove("open"),c.setAttribute("aria-expanded","false"),document.body.classList.remove("nav-open")}))),document.querySelectorAll("[data-faq]").forEach(e=>{const r=e.querySelectorAll("details");r.forEach(t=>{t.addEventListener("toggle",()=>{t.open&&r.forEach(o=>{o!==t&&(o.open=!1)})})})}),document.querySelectorAll("[data-carousel]").forEach(e=>{const r=e.querySelector(".carousel-track");if(!r)return;const t=()=>{const o=r.querySelector(":scope > *");return o?o.getBoundingClientRect().width+20:320};e.querySelectorAll("[data-car-prev]").forEach(o=>o.addEventListener("click",()=>r.scrollBy({left:-t(),behavior:"smooth"}))),e.querySelectorAll("[data-car-next]").forEach(o=>o.addEventListener("click",()=>r.scrollBy({left:t(),behavior:"smooth"})))}),document.querySelectorAll("[data-yt]").forEach(e=>{const r=e.getAttribute("data-yt");r&&e.addEventListener("click",()=>{const t=document.createElement("iframe");t.src="https://www.youtube.com/embed/"+r+"?autoplay=1&rel=0",t.title=e.getAttribute("data-yt-title")||"YouTube video",t.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",t.allowFullscreen=!0,t.style.cssText="position:absolute;inset:0;width:100%;height:100%;border:0;border-radius:inherit;",e.innerHTML="",e.appendChild(t)},{once:!0})})})();
document.querySelectorAll('form[action*="formsubmit.co/"]').forEach(function(form){
  var btn=form.querySelector('button[type="submit"],input[type="submit"]');
  var status=document.createElement('div');
  status.setAttribute('role','status');status.setAttribute('aria-live','polite');
  status.style.cssText='display:none;margin-top:12px;padding:10px 14px;border-radius:8px;font-size:15px;line-height:1.45;text-align:left;';
  if(btn&&btn.parentNode){btn.parentNode.insertBefore(status,btn.nextSibling);}else{form.appendChild(status);}
  function show(msg,ok){status.textContent=msg;status.style.display='block';status.style.color=ok?'#14532d':'#7f1d1d';status.style.background=ok?'#dcfce7':'#fee2e2';status.style.border='1px solid '+(ok?'#86efac':'#fca5a5');}
  function hide(){status.style.display='none';status.textContent='';}
  function ensure(name,value){var el=form.querySelector('input[name="'+name+'"]');if(!el){el=document.createElement('input');el.type='hidden';el.name=name;form.appendChild(el);}el.value=value;}
  var human=form.querySelector('input[type="checkbox"][name="human_verified"]');
  if(human){human.required=false;}
  var sending=false;
  function setBtn(on,oldText){if(!btn)return;btn.disabled=on;var t=on?'Sending...':oldText;if(btn.tagName==='INPUT'){btn.value=t;}else{btn.textContent=t;}}
  form.addEventListener('submit',function(ev){
    ev.preventDefault();
    if(sending)return;
    if(human&&!human.checked){show('Please verify you are human before sending.',false);human.focus();return;}
    if(form.checkValidity&&!form.checkValidity()){form.reportValidity&&form.reportValidity();show('Please fill in the required fields correctly and try again.',false);return;}
    sending=true;hide();
    var oldText=btn?(btn.tagName==='INPUT'?btn.value:btn.textContent):'';
    setBtn(true,oldText);
    ensure('_next',window.location.origin+'/form-sent/');ensure('_captcha','false');
    var frameName='fs-frame-'+Math.random().toString(36).slice(2,9);
    var frame=document.createElement('iframe');
    frame.name=frameName;frame.style.display='none';frame.setAttribute('aria-hidden','true');frame.tabIndex=-1;
    document.body.appendChild(frame);
    form.target=frameName;
    var done=false,submittedAt=0,loadedAt=0;
    function finish(ok){if(done)return;done=true;sending=false;setBtn(false,oldText);if(ok){show('Thank you! Your inquiry has been submitted successfully. We will contact you soon.',true);form.reset();}else{show('Sorry, your message could not be sent. Please try again.',false);}setTimeout(function(){frame.remove();},500);}
    frame.addEventListener('load',function(){if(submittedAt&&Date.now()-submittedAt>800&&!loadedAt){loadedAt=Date.now();}});
    submittedAt=Date.now();
    var poll=setInterval(function(){
      var path='';
      try{path=frame.contentWindow.location.pathname;}catch(e){path='';}
      if(path.indexOf('/form-sent')===0){clearInterval(poll);finish(true);}
      else if(loadedAt&&Date.now()-loadedAt>2500){clearInterval(poll);finish(true);}
      else if(Date.now()-submittedAt>30000){clearInterval(poll);finish(false);}
    },300);
    form.submit();
  });
});
