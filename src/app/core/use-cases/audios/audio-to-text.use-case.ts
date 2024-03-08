import { AudioToTextResponse } from "@interfaces/index";
import { environment } from "environments/environment"

export const audioToTextUseCase = async (audioFile: File, prompt?: string) => {


  try {

    const formData = new FormData();
    formData.append('file', audioFile) // 'file' es la key
    if (prompt) formData.append('prompt', prompt)


    const resp = await fetch(`${environment.backendApi}/audio-to-text`, {
      method: 'POST',
      body: formData
    })

    if (!resp.ok) if (!resp.ok) throw new Error('Audio to text failed');

    const data = await resp.json() as AudioToTextResponse

    return data;

  } catch (error) {
    console.log()
    return null;
  }

}
