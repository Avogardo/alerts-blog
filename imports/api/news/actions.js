const goToNewsContainer = history => {
	const location = '/';
	if (history.location.pathname !== location) {
		history.push(location);
	}
}

const actions = {
  goToNewsContainer,
};

export default actions;
