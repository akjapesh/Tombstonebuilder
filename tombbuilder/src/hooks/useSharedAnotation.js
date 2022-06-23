
const useSharedAnotation = () =>
{
    // const sharedCode = JSON.parse(atob(window.location.href.substring(22)));

    try {
        const currentURL = window.location.href.substring(22);
        console.log("CurrentURL: ",currentURL);
        if(!currentURL.length)
        {
            console.log("hiii");
        return [];
        }

        console.log("ookkkkk");
        const base64toAnnotation = atob(currentURL);
        console.log(base64toAnnotation);
        const SharedAnnotation = JSON.parse(base64toAnnotation);
        return SharedAnnotation;
    } catch (error) {
        return [];
    }

}

export default useSharedAnotation;