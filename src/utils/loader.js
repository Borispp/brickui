let loader;

if (typeof document !== 'undefined') {
  loader = document.getElementById('loader');
}

export const showLoader = () => {
  if (process.env.REACT_APP_LOADER_ENABLED === 'true') {
    if (loader) {
      loader.style.display = 'block';
    }
  }
};

export const hideLoader = () => {
  if (process.env.REACT_APP_LOADER_ENABLED === 'true') {
    if (loader) {
      loader.style.display = 'none';
    }
  }
};
