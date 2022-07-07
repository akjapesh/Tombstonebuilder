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
        // long_url: `https://tombstonebuilder.netlify.app/?data=W3sidHlwZSI6InJlY3QiLCJ2ZXJzaW9uIjoiNS4yLjEiLCJvcmlnaW5YIjoibGVmdCIsIm9yaWdpblkiOiJ0b3AiLCJsZWZ0IjoxMTIsInRvcCI6MjQwLCJ3aWR0aCI6MzIwLCJoZWlnaHQiOjIwOCwiZmlsbCI6InRyYW5zcGFyZW50Iiwic3Ryb2tlIjoiYmxhY2siLCJzdHJva2VXaWR0aCI6MCwic3Ryb2tlRGFzaEFycmF5IjpudWxsLCJzdHJva2VMaW5lQ2FwIjoiYnV0dCIsInN0cm9rZURhc2hPZmZzZXQiOjAsInN0cm9rZUxpbmVKb2luIjoibWl0ZXIiLCJzdHJva2VVbmlmb3JtIjpmYWxzZSwic3Ryb2tlTWl0ZXJMaW1pdCI6NCwic2NhbGVYIjoxLCJzY2FsZVkiOjEsImFuZ2xlIjowLCJmbGlwWCI6ZmFsc2UsImZsaXBZIjpmYWxzZSwib3BhY2l0eSI6MSwic2hhZG93IjpudWxsLCJ2aXNpYmxlIjp0cnVlLCJiYWNrZ3JvdW5kQ29sb3IiOiIiLCJmaWxsUnVsZSI6Im5vbnplcm8iLCJwYWludEZpcnN0IjoiZmlsbCIsImdsb2JhbENvbXBvc2l0ZU9wZXJhdGlvbiI6InNvdXJjZS1vdmVyIiwic2tld1giOjAsInNrZXdZIjowLCJyeCI6MCwicnkiOjB9XQ==&canvas=eyJ3aWR0aCI6NjAwLCJoZWlnaHQiOjUwMCwiYmFja2dyb3VuZENvbG9yIjoiI2YzZjNmMyIsImZvcmVncm91bmRDb2xvciI6IiNlY2ViZWIiLCJncmlkVmlzaWJpbGl0eSI6dHJ1ZSwic3BlZWQiOjJ9`,
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
