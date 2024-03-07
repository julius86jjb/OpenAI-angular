import { environment } from "environments/environment"
import type { OrthographyResponse, OrthographyUseCaseResponse } from "@interfaces/index";

export const textToAudioUseCase = async (prompt: string, voice: string) => {
  try {

    const resp = await fetch(`${environment.backendApi}/text-to-audio`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, voice })
    });

    if (!resp.ok) throw new Error('Correction failed');

    const audioFile = await resp.blob(); // binario
    const audioUrl = URL.createObjectURL(audioFile)

    return {
      ok: true,
      message: prompt,
      audioUrl: audioUrl

    }
  } catch (error) {

    console.log(error)
    return {
      ok: true,
      message: 'Can not generated audio',
      audioUrl: ''
    }
  }
}
