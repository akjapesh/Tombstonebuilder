export const handleShareCode = (event, annotation) => {
  event.preventDefault();
  const nextUrl = `http://localhost:3000/?data=${btoa(
    JSON.stringify(annotation)
  )}`;
  window.history.replaceState({}, "", nextUrl);
};
