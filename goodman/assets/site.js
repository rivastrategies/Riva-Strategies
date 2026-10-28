const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('#primary-nav');
if(toggle&&nav){
 toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){toggle.setAttribute('aria-expanded','false');nav.classList.remove('open');toggle.focus();}});
}
const form=document.querySelector('#service-form');
if(form){
 const selected=new URLSearchParams(location.search).get('service');
 if(selected&&[...form.elements.service.options].some(o=>o.value===selected))form.elements.service.value=selected;
 let message='';
 form.addEventListener('submit',e=>{
  e.preventDefault();
  if(!form.reportValidity())return;
  const d=Object.fromEntries(new FormData(form));
  const service=form.elements.service.selectedOptions[0].textContent;
  message=`Goodman Environmental,\n\nPlease review the following service inquiry:\n\nService: ${service}\nFacility: ${d.location.trim()}\nCompany: ${d.company.trim()||'Not provided'}\n\nEquipment and project details:\n${d.details.trim()}\n\nName: ${d.name.trim()}\nEmail: ${d.email.trim()}\nPhone: ${d.phone.trim()||'Not provided'}\n`;
  document.querySelector('#email-content').textContent=message;
  document.querySelector('#open-email').href='mailto:rick@goodmanenvironmental.com?subject='+encodeURIComponent('Service inquiry — '+service)+'&body='+encodeURIComponent(message);
  const preview=document.querySelector('#email-preview');preview.hidden=false;preview.focus();preview.scrollIntoView({behavior:'smooth',block:'center'});
  document.querySelector('#copy-status').textContent='';
 });
 document.querySelector('#copy-request').addEventListener('click',async()=>{
  const status=document.querySelector('#copy-status');
  try{await navigator.clipboard.writeText(message);status.textContent='Copied. Paste the request into an email to Goodman Environmental.';}
  catch{status.textContent='Select and copy the request above, then paste it into an email to Goodman Environmental.';}
 });
}
