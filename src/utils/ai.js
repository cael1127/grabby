// Enhanced AI Humanizer and Detector logic - inspired by ZeroGPT and Grubby AI

// Advanced AI Detection Algorithm
export function detectAIContent(text) {
  let score = 0;
  let breakdown = [];
  
  // Text preprocessing
  const sentences = text.split(/[.!?]\s+/).filter(s => s.trim().length > 0);
  const words = text.toLowerCase().split(/\W+/).filter(w => w.length > 0);
  const wordCount = words.length;
  const sentenceCount = sentences.length;
  
  if (wordCount === 0) return { score: 0, breakdown: [] };
  
  // 1. Perplexity Analysis (predictability of text)
  const perplexity = calculatePerplexity(text);
  if (perplexity < 50) {
    score += 25;
    breakdown.push({ label: 'Low perplexity (too predictable)', value: '+25' });
  }
  
  // 2. Burstiness Analysis (variation in sentence length)
  const burstiness = calculateBurstiness(sentences);
  if (burstiness < 0.3) {
    score += 20;
    breakdown.push({ label: 'Low burstiness (uniform structure)', value: '+20' });
  }
  
  // 3. Advanced Telltale Phrases
  const advancedTelltale = [
    'In conclusion', 'In summary', 'This article', 'Furthermore', 'Moreover', 
    'Therefore', 'Thus', 'Consequently', 'Additionally', 'Overall', 'To sum up', 
    'In this article', 'It is important to note', 'As mentioned earlier',
    'In the following sections', 'The purpose of this', 'This demonstrates',
    'It can be concluded', 'Based on the analysis', 'The findings indicate'
  ];
  let telltaleCount = advancedTelltale.reduce((acc, phrase) => 
    acc + (text.toLowerCase().includes(phrase.toLowerCase()) ? 1 : 0), 0);
  if (telltaleCount > 0) {
    score += telltaleCount * 8;
    breakdown.push({ label: 'AI telltale phrases', value: `+${telltaleCount * 8}` });
  }
  
  // 4. Sentence Structure Analysis
  const avgSentenceLength = wordCount / sentenceCount;
  if (avgSentenceLength > 25) {
    score += 15;
    breakdown.push({ label: 'Long average sentence length', value: '+15' });
  }
  if (avgSentenceLength < 8) {
    score += 10;
    breakdown.push({ label: 'Short average sentence length', value: '+10' });
  }
  
  // 5. Vocabulary Sophistication
  const uniqueWords = new Set(words);
  const vocabularyDiversity = uniqueWords.size / wordCount;
  if (vocabularyDiversity < 0.4) {
    score += 15;
    breakdown.push({ label: 'Low vocabulary diversity', value: '+15' });
  }
  
  // 6. Repetition Analysis
  const wordFrequency = {};
  words.forEach(word => {
    wordFrequency[word] = (wordFrequency[word] || 0) + 1;
  });
  const repeatedWords = Object.values(wordFrequency).filter(count => count > 3).length;
  if (repeatedWords > 0) {
    score += repeatedWords * 3;
    breakdown.push({ label: 'Repetitive vocabulary', value: `+${repeatedWords * 3}` });
  }
  
  // 7. Contraction Analysis
  const contractions = ["n't", "'re", "'s", "'m", "'ll", "'d", "'ve", "'t"];
  const contractionCount = contractions.reduce((acc, c) => 
    acc + (text.includes(c) ? 1 : 0), 0);
  if (contractionCount < 2 && wordCount > 50) {
    score += 12;
    breakdown.push({ label: 'Few contractions (formal tone)', value: '+12' });
  }
  
  // 8. Adverb and Adjective Analysis
  const lyWords = (text.match(/\b\w+ly\b/g) || []).length;
  if (lyWords > 6) {
    score += 8;
    breakdown.push({ label: 'Excessive adverbs', value: '+8' });
  }
  
  // 9. Punctuation Analysis
  const exclamations = (text.match(/!/g) || []).length;
  const ellipses = (text.match(/\.\.\./g) || []).length;
  const questions = (text.match(/\?/g) || []).length;
  const totalPunctuation = exclamations + ellipses + questions;
  
  if (totalPunctuation > 5) {
    score -= 8;
    breakdown.push({ label: 'Human-like punctuation', value: '-8' });
  }
  
  // 10. Sentence Pattern Analysis
  const sentencePatterns = analyzeSentencePatterns(sentences);
  if (sentencePatterns.repetitive) {
    score += 10;
    breakdown.push({ label: 'Repetitive sentence patterns', value: '+10' });
  }
  
  // 11. Technical Language Analysis
  const technicalTerms = [
    'algorithm', 'implementation', 'optimization', 'utilization', 'methodology',
    'framework', 'paradigm', 'infrastructure', 'synchronization', 'configuration'
  ];
  const technicalCount = technicalTerms.reduce((acc, term) => 
    acc + (text.toLowerCase().includes(term) ? 1 : 0), 0);
  if (technicalCount > 2) {
    score += 5;
    breakdown.push({ label: 'Technical language overuse', value: '+5' });
  }
  
  // Normalize and randomize score
  score = Math.max(0, Math.min(100, Math.round(score * 0.8 + Math.random() * 20)));
  
  return { score, breakdown };
}

// Enhanced Humanizer with more sophisticated techniques
export function humanizeText(text, level = 2) {
  if (!text.trim()) return text;
  
  let result = text;
  
  // Apply transformations based on level
  for (let i = 0; i < level; i++) {
    result = addNaturalTypos(result, level);
    result = varySentenceStructure(result, level);
    result = injectConversationalElements(result, level);
    result = adjustToneAndStyle(result, level);
    result = replaceWithSynonyms(result, level);
    result = varyPunctuation(result, level);
    result = addPersonalTouch(result, level);
  }
  
  return result;
}

// Helper Functions for Detection
function calculatePerplexity(text) {
  // Simplified perplexity calculation based on word predictability
  const words = text.toLowerCase().split(/\W+/).filter(w => w.length > 2);
  const bigrams = [];
  for (let i = 0; i < words.length - 1; i++) {
    bigrams.push(`${words[i]} ${words[i + 1]}`);
  }
  
  const uniqueBigrams = new Set(bigrams);
  return (uniqueBigrams.size / bigrams.length) * 100;
}

function calculateBurstiness(sentences) {
  const lengths = sentences.map(s => s.split(' ').length);
  const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const variance = lengths.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / lengths.length;
  return variance / (mean * mean);
}

function analyzeSentencePatterns(sentences) {
  const patterns = sentences.map(s => {
    const words = s.split(' ');
    return {
      length: words.length,
      startsWith: words[0]?.toLowerCase() || '',
      endsWith: words[words.length - 1]?.toLowerCase() || ''
    };
  });
  
  const patternCounts = {};
  patterns.forEach(p => {
    const key = `${p.length}-${p.startsWith}-${p.endsWith}`;
    patternCounts[key] = (patternCounts[key] || 0) + 1;
  });
  
  const repetitive = Object.values(patternCounts).some(count => count > 2);
  return { repetitive };
}

// Enhanced Humanizer Helpers
function addNaturalTypos(text, level) {
  const naturalTypos = [
    { find: /\btheir\b/g, replace: 'there' },
    { find: /\byour\b/g, replace: "you're" },
    { find: /\bit's\b/g, replace: 'its' },
    { find: /\bthey're\b/g, replace: 'their' },
    { find: /\bthen\b/g, replace: 'than' },
    { find: /\bwere\b/g, replace: 'was' },
    { find: /\baffect\b/g, replace: 'effect' },
    { find: /\baccept\b/g, replace: 'except' },
    { find: /\bprincipal\b/g, replace: 'principle' },
    { find: /\bcomplement\b/g, replace: 'compliment' }
  ];
  
  let result = text;
  naturalTypos.forEach(({ find, replace }) => {
    if (Math.random() < 0.15 * level) {
      result = result.replace(find, replace);
    }
  });
  
  // Add missing articles occasionally
  if (level > 1 && Math.random() < 0.1) {
    result = result.replace(/\b([a-z]+\s+[a-z]+)\b/g, (match, words) => {
      if (Math.random() < 0.2) return `the ${words}`;
      return match;
    });
  }
  
  return result;
}

function varySentenceStructure(text, level) {
  let sentences = text.split(/[.!?]\s+/);
  
  if (level > 1) {
    // Shuffle some sentences
    for (let i = 0; i < sentences.length - 1; i += 2) {
      if (Math.random() < 0.3) {
        [sentences[i], sentences[i + 1]] = [sentences[i + 1], sentences[i]];
      }
    }
    
    // Break up very long sentences
    sentences = sentences.flatMap(s => {
      if (s.length > 150 && Math.random() < 0.4) {
        return s.split(', ').map(part => part.trim());
      }
      return s;
    });
  }
  
  return sentences.join('. ');
}

function injectConversationalElements(text, level) {
  const conversationalPhrases = [
    "You know?", "I mean", "kind of", "sort of", "if you ask me",
    "well, actually", "to be honest", "in my opinion", "anyway",
    "so to speak", "you see", "as it were", "honestly", "frankly",
    "basically", "literally", "obviously", "clearly", "definitely",
    "absolutely", "totally", "completely", "actually", "really"
  ];
  
  const sentences = text.split(/[.!?]\s+/);
  const insertEveryN = Math.max(2, Math.floor(sentences.length / (5 - level)));
  
  return sentences.map((sentence, i) => {
    if (i % insertEveryN === 0 && Math.random() < 0.4 + 0.2 * (level - 1)) {
      const phrase = conversationalPhrases[Math.floor(Math.random() * conversationalPhrases.length)];
      return `${phrase}, ${sentence.charAt(0).toLowerCase() + sentence.slice(1)}`;
    }
    return sentence;
  }).join('. ');
}

function adjustToneAndStyle(text, level) {
  const formalToCasual = [
    { find: /\butilize\b/g, replace: 'use' },
    { find: /\boptimal\b/g, replace: 'best' },
    { find: /\befficacious\b/g, replace: 'effective' },
    { find: /\bsignificant\b/g, replace: 'big' },
    { find: /\bcommence\b/g, replace: 'start' },
    { find: /\bterminate\b/g, replace: 'end' },
    { find: /\bimplement\b/g, replace: 'put in place' },
    { find: /\bconclusion\b/g, replace: 'end result' },
    { find: /\badditionally\b/g, replace: 'also' },
    { find: /\bmoreover\b/g, replace: 'plus' },
    { find: /\bconsequently\b/g, replace: 'so' },
    { find: /\bfurthermore\b/g, replace: 'also' },
    { find: /\bnevertheless\b/g, replace: 'but' },
    { find: /\bnevertheless\b/g, replace: 'still' },
    { find: /\bconsequently\b/g, replace: 'because of that' }
  ];
  
  let result = text;
  formalToCasual.forEach(({ find, replace }) => {
    if (Math.random() < 0.3 + 0.2 * (level - 1)) {
      result = result.replace(find, replace);
    }
  });
  
  return result;
}

function replaceWithSynonyms(text, level) {
  if (level < 2) return text;
  
  const synonyms = [
    { find: /important/g, replace: 'crucial' },
    { find: /good/g, replace: 'decent' },
    { find: /bad/g, replace: 'poor' },
    { find: /difficult/g, replace: 'tricky' },
    { find: /easy/g, replace: 'simple' },
    { find: /quick/g, replace: 'swift' },
    { find: /slow/g, replace: 'sluggish' },
    { find: /happy/g, replace: 'glad' },
    { find: /sad/g, replace: 'down' },
    { find: /think/g, replace: 'believe' },
    { find: /show/g, replace: 'demonstrate' },
    { find: /make/g, replace: 'create' },
    { find: /get/g, replace: 'obtain' },
    { find: /big/g, replace: 'huge' },
    { find: /small/g, replace: 'tiny' },
    { find: /nice/g, replace: 'great' },
    { find: /bad/g, replace: 'terrible' },
    { find: /good/g, replace: 'awesome' },
    { find: /great/g, replace: 'amazing' },
    { find: /awesome/g, replace: 'incredible' }
  ];
  
  let result = text;
  synonyms.forEach(({ find, replace }) => {
    if (Math.random() < 0.2 * level) {
      result = result.replace(find, replace);
    }
  });
  
  return result;
}

function varyPunctuation(text, level) {
  if (level < 2) return text;
  
  let result = text;
  
  // Add ellipses occasionally
  if (Math.random() < 0.2 * level) {
    result = result.replace(/\./g, () => Math.random() < 0.1 * level ? '...' : '.');
  }
  
  // Add exclamation marks
  if (Math.random() < 0.15 * level) {
    result = result.replace(/!/g, '!!');
  }
  
  // Add question marks occasionally
  if (Math.random() < 0.1 * level) {
    result = result.replace(/\./g, () => Math.random() < 0.05 ? '?' : '.');
  }
  
  return result;
}

function addPersonalTouch(text, level) {
  if (level < 2) return text;
  
  const personalPhrases = [
    "I think", "I believe", "In my experience", "From what I've seen",
    "Personally", "To me", "I feel like", "I'd say"
  ];
  
  const sentences = text.split(/[.!?]\s+/);
  const insertEveryN = Math.max(3, Math.floor(sentences.length / (6 - level)));
  
  return sentences.map((sentence, i) => {
    if (i % insertEveryN === 0 && Math.random() < 0.3 * level) {
      const phrase = personalPhrases[Math.floor(Math.random() * personalPhrases.length)];
      return `${phrase}, ${sentence.charAt(0).toLowerCase() + sentence.slice(1)}`;
    }
    return sentence;
  }).join('. ');
}

// Legacy functions for backward compatibility
export function addTypos(text, level) {
  return addNaturalTypos(text, level);
}

export function injectHumanPhrases(text, level) {
  return injectConversationalElements(text, level);
}

export function adjustTone(text, level) {
  return adjustToneAndStyle(text, level);
} 