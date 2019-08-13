// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    console.log('user logged in: ', user);
    var docRef = db.collection("student").doc(firebase.auth().currentUser.uid);
    docRef.get().then(function (doc) {
      var check_tic;
      var html_feature;
      if (doc.data().check_tic) {
        check_tic = "LIC";
        html_feature = `
        <div class="container center-align">
    <div class="col s12 m7 center-align">
      <div class="card center-align">
        <div class="card-image">
          <img src="img/selection.jpg" height="30%">
          <span class="card-title black-text">Manage</span>
        </div>
        <div class="card-content">
          <p>Use this feature to select tutors and assign them to classes.</p>
        </div>
        <div class="card-action">
          <a href="manage.html">Manage Tutors</a>
        </div>
      </div>
    </div>
  </div>
  <div class="container center-align">
    <div class="col s12 m7 center-align">
      <div class="card center-align">
        <div class="card-image">
          <img src="img/review.jpg" height="30%" width="30%">
          <span class="card-title">Review</span>
        </div>
        <div class="card-content">
          <p>Use this feature to review tutors at the end of the semester.</p>
        </div>
        <div class="card-action">
          <a href="review.html">Start Review</a>
        </div>
      </div>
    </div>
  </div>
        `;
      } else {
        check_tic = "Tutor";
        html_feature = `
        <div class="container center-align">
    <div class="col s12 m7 center-align">
      <div class="card center-align">
        <div class="card-image">
          <img src="img/manage.jpg"  height="30%" width="30%">
          <span class="card-title black-text">Apply</span>
        </div>
        <div class="card-content">
          <p>Use this feature to apply for open positions.</p>
        </div>
        <div class="card-action">
          <a href="position.html">Apply for Positions</a>
        </div>
      </div>
    </div>
  </div>
  <div class="container center-align">
    <div class="col s12 m7 center-align">
      <div class="card center-align">
        <div class="card-image">
          <img src="img/status.jpg"  height="30%" width="30%">
          <span class="card-title white-text">Status</span>
        </div>
        <div class="card-content">
          <p>Use this feature to view application status.</p>
        </div>
        <div class="card-action">
          <a href="status.html">View Application Status</a>
        </div>
      </div>
    </div>
  </div>
        `;
      }
      const html_info = `
      <li class="center-align">Logged in as: ${user.email}</li>
      <h4 class="center-align"><u>${check_tic}</u> Dashboard View</h4>
      `;
      document.querySelector('.info').innerHTML = html_info;
      document.querySelector('.feature').innerHTML = html_feature;
    })
    setupUI(user);
  } else {
    console.log('user logged out');
    document.querySelector('.info').innerHTML = '<h6 class="center-align">Set up account to view classes</h6>';
    document.querySelector('.feature').innerHTML = '';
    setupUI();
  }
})

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user
  auth.createUserWithEmailAndPassword(email, password).then(function (user) {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });

});