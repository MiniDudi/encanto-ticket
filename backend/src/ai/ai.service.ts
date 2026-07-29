import { Injectable } from '@nestjs/common';
import { InferenceClient } from '@huggingface/inference';

@Injectable()
export class AiService {

    private readonly client: InferenceClient;

    constructor() {
        this.client = new InferenceClient(
            process.env.HUGGINGFACE_TOKEN
        );
    }


    async generateResponse(description: string) {

        const response = await this.client.chatCompletion({
            model: "meta-llama/Llama-3.1-8B-Instruct",
            messages: [
                {
                    role: "system",
                    content:
                        "Você é um atendente de suporte técnico. Gere respostas educadas e profissionais."
                },
                {
                    role: "user",
                    content: `
                    Problema do cliente:

                    ${description}

                    Gere uma sugestão de resposta.
                    `
                }
            ],
            max_tokens: 300,
        });


        return {
            suggestion:
                response.choices[0].message.content
        };
    }
}