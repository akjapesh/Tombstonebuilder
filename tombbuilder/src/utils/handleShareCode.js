export const handleShareCode = (event, annotation) => {
  event.preventDefault();
  const nextUrl = `/?data=${btoa(JSON.stringify(annotation))}`;
  window.history.replaceState({}, "", nextUrl);
};
