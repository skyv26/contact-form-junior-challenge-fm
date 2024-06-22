const form = document.querySelector(".form_container");
const messageBox = document.querySelector(".success-box");

const errorMessageHTML = (errorMsg) => `<span class="error-message">${errorMsg}</span>`;

const inputTypeBasedMessageReturn = (TYPE) => {
    console.log(TYPE)
    switch(TYPE) {
        case 'text' : 
        case 'textarea' : return errorMessageHTML('This field is required');
        case 'email': return errorMessageHTML('Please enter a valid email address');
        case 'radio': return errorMessageHTML('Please select a query type');
        case 'checkbox': return errorMessageHTML('To submit this form, please consent to being contacted');
    }
};

const raiseTheError = (formObject) => {
    Object.keys(formObject).forEach((each_input) => {
      if(!formObject[each_input] || formObject[each_input] === '') {
        const input = form.querySelector(`input[name="${each_input}"]`) ?? form.querySelector(`textarea[name="${each_input}"]`);
        input.classList.remove('error');
        input.classList.add('error');
        const inputType = input?.getAttribute('type') ?? 'textarea';
        const label = form.querySelector(`label[for="${each_input === 'textarea' ? 'message' : each_input}"]`);
        label.insertAdjacentHTML('beforeend', inputTypeBasedMessageReturn(inputType))
        return true;
      }
    });
    return false;
};

const removeErrorMessage = () => {
  const elements = document?.querySelectorAll('.error-message');
  if(elements) {
    document.querySelectorAll('.input').forEach(element => element.classList.remove('error'))
    elements.forEach(element => element.remove());
  } 
}

form.addEventListener("submit", (e) => {
let isAllFieldsAreOk = true;
  // Prevent the window to reload after button click
  e.preventDefault();
  removeErrorMessage();
  // Used the in-built FormData API class to get the form inputs
  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData.entries());
  if(!formObject.consent) {
    formObject.consent = false;
  }

  if(!formObject.query_type) {
    formObject.query_type = '';
  }
 
  isAllFieldsAreOk = Object.values(formObject).every((each) => each && each !== '');
  if(!isAllFieldsAreOk) {
    raiseTheError(formObject)
    return;
  }

  messageBox.classList.toggle('show');
  setTimeout(() => {
    messageBox.classList.toggle('show');
  }, 2500);
  // if(isAllFieldsAreOk) {
  // }
  // return  isAllFieldsAreOk ?? raiseTheError(formObject)
    
});
