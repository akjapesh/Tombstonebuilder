export const handleShareCode = (event, annotation) => {
  event.preventDefault();
  const nextUrl = `${window.location.hostname}/?data=${btoa(
    JSON.stringify(annotation)
  )}`;
  window.history.replaceState({}, "", nextUrl);
};
