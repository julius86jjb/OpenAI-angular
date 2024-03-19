
import { environment } from "environments/environment";

export async function* prosConsStreamUseCase(prompt: string, abortSignal: AbortSignal) {

  try {

    const resp = await fetch(`${environment.backendApi}/pros-cons-discusser-stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
      signal: abortSignal
    });

    if (!resp.ok) throw new Error('Comparison could not be made');

    const reader = resp.body?.getReader();

    if (!reader) {
      console.log('The reader could not be generated')
      throw new Error('The reader could not be generated');
    }


    const decoder = new TextDecoder();

    let text = '';

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      const decodedChunk = decoder.decode(value,  {stream: true});

      text+= decodedChunk;
      yield text;


    }

    return text;

  } catch (error) {

    return null;
  }


}
