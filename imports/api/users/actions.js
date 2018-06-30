const goToSignIn = (history) => {
  const location = '/sign-in';
  if (history.location.pathname !== location) {
    history.push(location);
  }
};

const actions = {
  goToSignIn,
};

export default actions;
