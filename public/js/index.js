  // setup guides
  const loggedOutlinks = document.querySelectorAll('.logged-out');
  const loggedInlinks = document.querySelectorAll('.logged-in');

  const setupUI = (user) => {
      if (user) {
          //toggle UI elements
          loggedInlinks.forEach(item => item.style.display = 'block');
          loggedOutlinks.forEach(item => item.style.display = 'none');
      } else {
          //toggle UI elements
          loggedInlinks.forEach(item => item.style.display = 'none');
          loggedOutlinks.forEach(item => item.style.display = 'block');
      }
  };

  // Get the currently signed-in user
  auth.onAuthStateChanged((user) => {
      if (user) {
          console.log(user);
          setupUI(user);
      } else {
          console.log('No User Found');
          setupUI();
      }
  });