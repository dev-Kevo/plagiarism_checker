


// Form fileds
let noChildrens = document.querySelector('#id_no_of_children');
let noAdults = document.querySelector('#id_no_of_adults');

let checkInDate = document.querySelector('#id_check_in_date');
let checkOutDate = document.querySelector('#id_check_out_date');

let confirmBox = document.querySelector('#confirm');
let checkOutBtn = document.querySelector('#checkOutBtn');
let bookingBtn = document.querySelector('#bookingBtn');

// Grabbing the error messages<p> container
let children_error_message = document.querySelector('#children_errorMSG');
let adults_error_message = document.querySelector('#adults_errorMSG');
let checkIn_error_message = document.querySelector('#checkIn_errorMSG');
let check_out_error_message = document.querySelector('#check_out_errorMSG');

console.log(checkOutBtn)

// Disable the CheckOut Button
checkOutBtn.disabled = true;

// fuction to check if the number of children is field in 
function checkChildren(){
  if(noChildrens.value == ""){
    noChildrens.style.outline = '2px solid red';
    noChildrens.style.border = 'none';
    children_error_message.textContent = "Please make sure to indicate the number of children"
    checkOutBtn.disabled = true;
    noChildrens.addEventListener('keyup', (e) => {
      noChildrens.style.outline = '2px solid black';
      noChildrens.style.border = 'none';
      children_error_message.textContent = ""
      checkOutBtn.disabled = false;
      checkAdult()
      checkCheckInDate()
    })   
  }else{
    checkOutBtn.disabled = false;
  }
}

  // Checking for aldults
  function checkAdult(){
    if(noAdults.value == ""){
      noAdults.style.outline = '2px solid red';
      noAdults.style.border = 'none';
      adults_error_message.textContent = 'Please tell us how many Adults will be attending'
      checkOutBtn.disabled = true;

    }else{
      checkOutBtn.disabled = false;
      checkChildren()
      checkCheckInDate()
    }
  }

  noAdults.addEventListener('keyup', (e) => {
    if(parseInt(e.target.value) <= 0 || isNaN(parseInt(e.target.value)) || e.target == "" ){
      console.log('We have a problem');
      checkOutBtn.disabled = true;
      noAdults.style.outline = '2px solid red';
      noAdults.style.border = 'none';
      adults_error_message.textContent = 'There MUST be atleast one Adult attending!'
    }else{
      adults_error_message.textContent = ''
      checkOutBtn.disabled = false;
      noAdults.style.outline = '2px solid green';
      noAdults.style.border = 'none';
    }

  })

   // Checking for CheckIn Date
function checkCheckInDate(){
  if(checkInDate.value == "" ){
    checkIn_error_message.textContent = 'Please select the check in date'
    checkOutBtn.disabled = true;
    checkInDate.style.outline = '2px solid red'
    checkInDate.addEventListener('change', (e) => {
      checkOutBtn.disabled = false;
      checkInDate.style.outline = '2px solid  green'
      checkIn_error_message.textContent = ""
    })   
  }else{
    checkOutBtn.disabled = false;
    
  }
}

function checkCheckOutDate(){
  if(checkOutDate.value == "" ){
    check_out_error_message.textContent = 'Please select the check in date'
    checkOutBtn.disabled = true;
    checkOutDate.style.outline = '2px solid red'
    checkOutDate.addEventListener('change', (e) => {
      checkOutBtn.disabled = false;
      check_out_error_message.textContent = ''
      checkOutDate.style.outline = '2px solid green'
    })   
  }else{
    checkOutBtn.disabled = false;
  }
}



// ============= Making Sure the customer Agrees to the terms and conditions ===============

confirmBox.addEventListener('change', () => {
  if(confirmBox.checked){
    checkOutBtn.disabled = true;
    checkAdult()
    checkCheckInDate()
    checkCheckOutDate()
    confirmBox.parentNode.style.color = 'black';
    // ============= Book the tour if the form is valid =================
    if(children_error_message.textContent == "" && adults_error_message.textContent == "" && checkIn_error_message.textContent == "" && check_out_error_message.textContent == "" && confirmBox.checked){
      bookingBtn.classList.add('hidden');
      checkOutBtn.disabled = false;
      checkOutBtn.classList.remove('hidden');
    }else{
      alert('Please make sure you have filled in all the required fields!');
      confirmBox.checked = false;
    }

  }else{
    confirmBox.parentNode.style.color = 'red';
    checkOutBtn.disabled = true;
    bookingBtn.classList.remove('hidden');
    checkOutBtn.disabled = false;
    checkOutBtn.classList.add('hidden');
    
  }
})





















