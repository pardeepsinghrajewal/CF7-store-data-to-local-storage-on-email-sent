jQuery( document ).ready(function() 
{
  wcContactPage();
});

function wcContactPage()
{
  /** Get all contact forms **/
  let cf7Forms = document.querySelectorAll('.wpcf7'); 
  cf7Forms.forEach(function(cf7Form)
  {
    /** Get current form data **/
    let data = JSON.parse(localStorage.getItem(cf7Form.id));
    if(data != null && typeof data === 'object')
    {
      /** Get current form **/
      let form = document.querySelector('#'+cf7Form.id); 
      if(form != null && typeof form === 'object')
      {
        /** Get current form elements **/
        let formInputs = form.querySelectorAll('input,textarea,select');
        if(formInputs != null && typeof formInputs === 'object')
        {
          formInputs.forEach(function(element)
          {
            if(element != null && element.type != 'hidden' && element.type != 'submit')
            {
              let wcClass = 'wc-'+element.name.replace(/[^a-zA-Z0-9]/g, "");
              element.classList.add(wcClass);
            }
          });
        }
        
        /** Try to set data using above classes **/
        data.forEach(function(element) 
        {
          if(element[0] != null && typeof element[0] === 'string' &&
              element[1] != null && typeof element[1] === 'string' )
          {            
            let ele = form.querySelector('.wc-'+element[0].replace(/[^a-zA-Z0-9]/g, ""));
            if(ele != null && typeof ele === 'object')
            {
              ele.value = element[1];
            }
            else
            {
              /** Element that was not found in ant special case! **/
              console.log('.wc-'+element[0]);
            }
          }
        });
      }
    }
  });
}

document.addEventListener( 'wpcf7mailsent', function( event ) 
{
  let inputsData = new Array();
  let inputs = event.detail.inputs;
  if(inputs.length > 0)
  {
    for( let i = 0; i < inputs.length; i++ ) 
    {
      inputsData[i] = Array(inputs[i].name,inputs[i].value); 
    }
  }
  localStorage.setItem(event.detail.unitTag, JSON.stringify(inputsData));
}, false );