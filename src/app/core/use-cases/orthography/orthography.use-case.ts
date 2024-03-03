import { environment } from "environments/environment"
import type { OrthographyResponse, OrthographyUseCaseResponse } from "@interfaces/index";

export const orthographyUseCase = async (prompt: string): Promise<OrthographyUseCaseResponse> => {
  try {

    const resp = await fetch(`${environment.backendApi}/orthography-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt })
    });

    if (!resp.ok) throw new Error('Correction failed');

    const data = await resp.json() as OrthographyResponse;

    return {
      ok: true,
      ...data

    }
  } catch (error) {

    console.log(error)
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: 'Correction failed'
    }
  }
}
