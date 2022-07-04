// This shouldn't be a util because this is not a pure function
export const handleShareCode = (event, { annotation, contentLoaderState }) => {
  event.preventDefault();
  const nextUrl = `/?data=${btoa(JSON.stringify(annotation))}&canvas=${btoa(
    JSON.stringify(contentLoaderState)
  )}`;
  window.history.replaceState({}, "", nextUrl);
};
