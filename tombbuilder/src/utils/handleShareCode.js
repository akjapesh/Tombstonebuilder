export const handleShareCode = async (
  event,
  { annotation, contentLoaderState }
) => {
  const { REACT_APP_BITLY_ACCESS_TOKEN } = process.env;
  event.preventDefault();
  const nextUrl = `/?data=${btoa(JSON.stringify(annotation))}&canvas=${btoa(
    JSON.stringify(contentLoaderState)
  )}`;
  window.history.replaceState({}, "", nextUrl);
  try {
    const res = await fetch("https://api-ssl.bitly.com/v4/shorten", {
      method: "POST",
      headers: {
        Authorization: `${REACT_APP_BITLY_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        long_url: `${window.location.href}`,
        domain: "bit.ly",
        group_guid: "Bm778C8qhGh",
      }),
    });
    const data = await res.json();
    navigator.clipboard.writeText(data.link);
  } catch (error) {
    console.log(error);
  }
};
