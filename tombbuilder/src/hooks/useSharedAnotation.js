const useSharedAnotation = () => {
  // const sharedCode = JSON.parse(atob(window.location.href.substring(22)));

  try {
    const currentURL = window.location.href.substring(22);
    if (!currentURL.length) {
      return [];
    }

    const base64toAnnotation = atob(currentURL);
    const SharedAnnotation = JSON.parse(base64toAnnotation);
    return SharedAnnotation;
  } catch (error) {
    return [];
  }
};

export default useSharedAnotation;
