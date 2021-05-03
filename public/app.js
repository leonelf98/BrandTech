const logInLink = document.querySelectorAll('.logIn')
const logOutLink = document.querySelectorAll('.logOut')

const signIncheck = user => {
  if(user) {
    logInLink.forEach( link => link.style.display = 'block' );
    logOutLink.forEach( link => link.style.display = 'none' );
  } else {
    logInLink.forEach( link => link.style.display = 'none' );
    logOutLink.forEach( link => link.style.display = 'block' );
  }
}

//SingIn
const signInForm = document.querySelector('#signIn-form');

signInForm.addEventListener('submit', (e) =>{
  e.preventDefault();

  const signInCorreo = document.querySelector('#signIn-correo').value;
  const signInPassword = document.querySelector('#signIn-password').value;

  auth
  .signInWithEmailAndPassword(signInCorreo, signInPassword)
    .then((userCredential) => {
      // Signed in
      var user = userCredential.user;
      console.log('signIn');
      signInForm.reset();
      document.getElementById('signIn').style.display='none';
      document.getElementById('app-whatsapp').style.display='block';
      document.getElementById('navbar').style.display='block';
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
    });

})

//logout
const logOut = document.querySelector('#logout');

logOut.addEventListener('click', (e) => {
  e.preventDefault();

  auth.signOut().then(() => {
    console.log('signOut');
  })
})


//addEventListener//list for auth state changes
auth.onAuthStateChanged( user =>{
  if (user) {
    console.log('Estas login');
    fs.collection('Personas')
      .get()
      .then((snapshot) => {
        console.log(snapshot.docs)
        signIncheck(user);
      })
  } else {
    console.log('Esta logout')
    signIncheck(user);
  }
})
