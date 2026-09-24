(function(){
  'use strict';
  const form=document.getElementById('contact-form');
  if(!form)return;
  const status=document.getElementById('form-status');
  const button=form.querySelector('.form-submit');
  const buttonLabel=button.querySelector('span');

  form.addEventListener('submit',async function(event){
    event.preventDefault();
    status.textContent='';
    if(!form.reportValidity())return;
    if(form.action.indexOf('YOUR_FORM_ID')!==-1){
      status.textContent='This form needs its Formspree form ID before it can send.';
      return;
    }
    button.disabled=true;
    buttonLabel.textContent='Sending…';
    try{
      const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
      if(response.ok){
        window.location.assign('thank-you.html');
        return;
      }
      const result=await response.json().catch(function(){return null});
      const message=result&&result.errors&&result.errors.length?result.errors.map(function(error){return error.message}).join(' '):'Something went wrong. Please check your details and try again.';
      status.textContent=message;
    }catch(error){
      status.textContent='The message could not be sent. Please check your connection and try again.';
    }finally{
      button.disabled=false;
      buttonLabel.textContent='Send enquiry ↗';
    }
  });
})();
