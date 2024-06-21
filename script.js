const form = document.querySelector(".form_container");

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
        const input = form.querySelector(`input[name="${each_input}"]`) ?? form.querySelector(`textarea[name="${each_input}"]`);
            // console.log("asdasd", each_input)
        input.classList.remove('error');
        input.classList.add('error');
        const inputType = input?.getAttribute('type') ?? 'textarea';
        console.log(inputTypeBasedMessageReturn(inputType));
        const label = form.querySelector(`label[for="${each_input === 'textarea' ? 'message' : each_input}"]`);
        label.insertAdjacentHTML('beforeend', inputTypeBasedMessageReturn(inputType))
    });
};

form.addEventListener("submit", (e) => {
let isAllFieldsAreOk = true;
  // Prevent the window to reload after button click
  e.preventDefault();

  // Used the in-built FormData API class to get the form inputs
  const formData = new FormData(form);
  const formObject = Object.fromEntries(formData.entries());
  if(!formObject.consent) {
    formObject.consent = false;
  }
  if(!formObject.query_type) {
    formObject.query_type = '';
  }

  raiseTheError(formObject)
  isAllFieldsAreOk = Object.values(formObject).every((each) => each !== '');

  console.table([formObject])

//   console.log(isAllFieldsAreOk);
    
});
