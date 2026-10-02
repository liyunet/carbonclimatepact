document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>document.querySelector('.nav').classList.remove('open')));

// About tabs
document.querySelectorAll('.about-tab').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.about-tab').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.about-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('about-'+btn.dataset.about).classList.add('active');
  });
});

// Service details open when linked
document.querySelectorAll('a[href^="#svc"]').forEach(a=>{
  a.addEventListener('click',()=>{
    const d=document.querySelector(a.getAttribute('href'));
    if(d&&d.tagName.toLowerCase()==='details') d.open=true;
  });
});

// Solutions lab tabs
document.querySelectorAll('.lab-tab').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.lab-tab').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.lab-panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.panel).classList.add('active');
  });
});

// Expertise links activate appropriate solutions panel
document.querySelectorAll('a[href^="#lab-"]').forEach(a=>{
  a.addEventListener('click',()=>{
    const id=a.getAttribute('href').slice(1);
    document.querySelectorAll('.lab-panel').forEach(p=>p.classList.remove('active'));
    document.querySelectorAll('.lab-tab').forEach(b=>b.classList.toggle('active',b.dataset.panel===id));
    const panel=document.getElementById(id);
    if(panel) panel.classList.add('active');
    setTimeout(()=>document.getElementById('lab').scrollIntoView({behavior:'smooth'}),20);
  });
});

// Mailto fallback
document.getElementById('contactForm').addEventListener('submit',e=>{
  e.preventDefault();
  const fd=new FormData(e.target);
  let body=[];
  for(const [k,v] of fd.entries()) if(String(v).trim()) body.push(`${k}: ${v}`);
  location.href=`mailto:contact@carbonclimatepact.com?subject=${encodeURIComponent('CCPA website enquiry')}&body=${encodeURIComponent(body.join('\n\n'))}`;
});