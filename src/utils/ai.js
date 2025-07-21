import { pipeline, AutoTokenizer, AutoModelForSequenceClassification, AutoModelForCausalLM } from '@xenova/transformers';

let detector = null;
let humanizer = null;

export async function initializeModels() {
  detector = await pipeline('text-classification', 'roberta-base-openai-detector');
  humanizer = await pipeline('text-generation', 'ctrl');
}

export async function detectAIContent(text) {
  if (!detector) {
    await initializeModels();
  }

  const result = await detector(text);
  const score = result[0].label === 'Real' ? 100 - Math.round(result[0].score * 100) : Math.round(result[0].score * 100);
  return { score, breakdown: [] };
}

export async function humanizeText(text, level = 2) {
  if (!humanizer) {
    await initializeModels();
  }

  const controlCode = 'Reviews';
  const prompt = `${controlCode} ${text}`;
  const result = await humanizer(prompt, { max_length: text.length + 50 });
  return result[0].generated_text;
}