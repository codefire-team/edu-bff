import { Injectable } from '@nestjs/common';

@Injectable()
export class GenerateQuizService {
  constructor() {}

  async execute(): Promise<any> {
    return [
      {
        question: 'O que são números primos?',
        alternatives: [
          'a) Números que possuem apenas dois divisores: o número um e ele mesmo.',
          'b) Números que possuem apenas um divisor: o número um.',
          'c) Números que possuem mais de dois divisores.',
          'd) Números que possuem apenas três divisores.',
          'e) Nenhuma das alternativas.',
        ],
        answer: 0,
      },
      {
        question: 'Qual é o resultado de 2 + 2?',
        alternatives: ['a) 3', 'b) 4', 'c) 5', 'd) 6', 'e) 7'],
        answer: 1,
      },
    ];
  }
}
