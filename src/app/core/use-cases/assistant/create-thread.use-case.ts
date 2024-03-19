import { environment } from 'environments/environment';



export const createThreadUseCase = async () => {

  try {
    const resp: Response = await fetch(`${environment.assistantApi}/create-thread`, {
      method: 'POST',
    })

    const { id } = await resp.json() as { id: string }

    return id

  } catch (error) {
    throw new Error('Error creating thread')
  }
}
