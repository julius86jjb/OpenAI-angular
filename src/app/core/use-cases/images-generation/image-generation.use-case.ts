
import { environment } from "environments/environment";

type GeneratedImage = Image | null;

interface Image {
  url: string;
  alt: string;
}


export const imageGenerationUseCase = async (prompt: string, originalImage?: string, maskImage?: string) => {
  try {

    const resp: Response = await fetch(`${environment.backendApi}/image-generation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        originalImage,
        maskImage
      })
    })




    if (!resp.ok) {
      const {code, message} = await resp.json()
      return {
        alt: '',
        url: '',
        error: true,
        errorMessage: message
      }
    }

    const { url, revised_prompt: alt } = await resp.json();

    return {
      url,
      alt,
      error: false,
    }



  } catch (error) {
    console.log(error);
    return {
      url: '',
      alt: '',
      error: true,
      errorMessage: 'Error 500 - Internal Server Error',
    }

    // return error;
  }
}
