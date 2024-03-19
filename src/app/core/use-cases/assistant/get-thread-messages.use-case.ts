import { QuestionResponse } from '@interfaces/question.response';
import { environment } from 'environments/environment';



export const getThreadMessagesUseCase = async (threadId: string) => {

  try {
    const resp: Response = await fetch(`${environment.assistantApi}/get-thread-messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        threadId
      })
    })

    const replies = await resp.json() as QuestionResponse[];
    return replies;

    } catch (error) {
      throw new Error('Error loading thread')
    }
  }
