async function feachlogin() {
    let data = await fetch('Users.json');
    let json = await data.json();
    return json;
}
async function userslogin(){
    if(!getCookie('userslogin')) {
        let datalogin = await feachlogin();
        setCookie('userslogin', JSON.stringify(datalogin), 1);
    }

}


  
userslogin();
// var to the sign in  from 
const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');

form.addEventListener('submit', e => {

    e.preventDefault();
    validateInputs();

  });
  document.getElementById('sub').addEventListener('click', e => {

    e.preventDefault();
    validateInputs();
  

  });
  function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
  


const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}
//-----------------------------------------------------
const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

//-----------------------------------------------------
const validateInputs = () => {
    const usernameValue = username.value.trim();
    const passwordValue = password.value.trim();
    if(usernameValue === '') {
        setError(username, 'Username is required and can not be blank ');
    } else {
        setSuccess(username);
    }
    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be 8 char')
    } else {
        setSuccess(password);
    }
    if(usernameValue !== '' && passwordValue !== '' && passwordValue.length >= 8) {
      
        const userslogin = JSON.parse(getCookie('userslogin'));
        const user = userslogin.find(user => user.username === usernameValue && user.password === passwordValue);
        if(user) {
            setCookie('userlogin', JSON.stringify(user), 1);
            alert('Login success');
    
       
            //find if usertype is student or secretary
            if(user.usertype === 'student') {
            
                window.location.href = 'student/student.html';
            }
            if(user.usertype === 'secretary') {
                window.location.href = 'secretary/secretary.html';
            }

      
    
         
        } else {
            setError(username, 'Username or password is incorrect');
            setError(password, 'Username or password is incorrect');
        }

  


    }


};