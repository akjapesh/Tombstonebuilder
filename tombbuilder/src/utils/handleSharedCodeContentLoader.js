const DEFAULT_CONTENT_LOADER_STATE = {
  width: 600,
  height: 500,
  backgroundColor: "#f3f3f3",
  foregroundColor: "#ecebeb",
  gridVisibility: true,
  speed: 2,
};
export const handleShareCodeContentLoaderState = async () => {
  let returnContentLoaderState = DEFAULT_CONTENT_LOADER_STATE;

  try {
    if(localStorage.getItem('codeContentLoader'))
    {
      returnContentLoaderState = JSON.parse(localStorage.getItem('codeContentLoader'));
    }
    else
    {
    const urlSearchParams = await new URLSearchParams(window.location.search);
    const base64ContentLoaderStatesString = await urlSearchParams.get("canvas");
    if (
      !base64ContentLoaderStatesString ||
      base64ContentLoaderStatesString.length === 0
    )
      return DEFAULT_CONTENT_LOADER_STATE;
    const stringifiedContentLoaderStates = await atob(
      base64ContentLoaderStatesString
    );
    const parsedContentLoaderStates = await JSON.parse(
      stringifiedContentLoaderStates
    );
    returnContentLoaderState = parsedContentLoaderStates;
    }
  } catch (error) {
    console.error("Got corrupt data");
    return DEFAULT_CONTENT_LOADER_STATE;
  }
  return returnContentLoaderState;
};
