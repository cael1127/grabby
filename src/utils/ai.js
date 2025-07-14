// AI Humanizer and Detector logic as pure functions

export function humanizeText(text, level = 2) {
  let result = text;
  for (let i = 0; i < level; i++) {
    result = addTypos(result, level);
    result = varySentenceStructure(result, level);
    result = injectHumanPhrases(result, level);
    result = adjustTone(result, level);
    result = replaceWithSynonyms(result, level);
    result = varyPunctuation(result, level);
  }
  return result;
}

export function detectAIContent(text) {
  let score = 0;
  let breakdown = [];
  // Telltale phrases
  const telltale = [
    'In conclusion', 'In summary', 'This article', 'Furthermore', 'Moreover', 'Therefore', 'Thus', 'Consequently', 'Additionally', 'Overall', 'To sum up', 'In this article'
  ];
  let telltaleCount = telltale.reduce((acc, phrase) => acc + (text.includes(phrase) ? 1 : 0), 0);
  if (telltaleCount > 0) {
    score += telltaleCount * 10;
    breakdown.push({ label: 'Telltale AI phrases', value: `+${telltaleCount * 10}` });
  }
  // Sentence length
  const sentences = text.split(/[.!?]\s/);
  const avgLen = sentences.reduce((a, s) => a + s.split(' ').length, 0) / (sentences.length || 1);
  if (avgLen > 22) {
    score += 15;
    breakdown.push({ label: 'Long average sentence', value: '+15' });
  }
  // Repetition
  const words = text.toLowerCase().split(/\W+/);
  const wordCounts = words.reduce((acc, w) => { acc[w] = (acc[w] || 0) + 1; return acc; }, {});
  const repeated = Object.values(wordCounts).filter(c => c > 5).length;
  if (repeated > 0) {
    score += repeated * 5;
    breakdown.push({ label: 'Repetitive words', value: `+${repeated * 5}` });
  }
  // Lack of contractions
  const contractions = ["n't", "'re", "'s", "'m", "'ll", "'d", "'ve"];
  const contractionCount = contractions.reduce((acc, c) => acc + (text.includes(c) ? 1 : 0), 0);
  if (contractionCount < 2) {
    score += 10;
    breakdown.push({ label: 'Few/no contractions', value: '+10' });
  }
  // Adverb/ly overuse
  const lyCount = (text.match(/\b\w+ly\b/g) || []).length;
  if (lyCount > 8) {
    score += 10;
    breakdown.push({ label: 'Many adverbs (-ly)', value: '+10' });
  }
  // Vocabulary diversity
  const uniqueWords = new Set(words.filter(w => w.length > 3));
  if (uniqueWords.size < words.length / 4) {
    score += 10;
    breakdown.push({ label: 'Low vocabulary diversity', value: '+10' });
  }
  // Punctuation variety
  const exclam = (text.match(/!/g) || []).length;
  const ellipses = (text.match(/\.\.\./g) || []).length;
  if (exclam + ellipses > 3) {
    score -= 10;
    breakdown.push({ label: 'Human-like punctuation', value: '-10' });
  }
  // Clamp and randomize
  score = Math.max(0, Math.min(100, Math.round(score * 0.7 + Math.random() * 30)));
  return { score, breakdown };
}

// --- Humanizer Helpers ---
export function addTypos(text, level) {
  const typoPatterns = [
    { find: /\btheir\b/g, replace: 'there' },
    { find: /\byour\b/g, replace: "you're" },
    { find: /\bit's\b/g, replace: 'its' },
    { find: /\bthey're\b/g, replace: 'their' },
    { find: /\bthen\b/g, replace: 'than' },
    { find: /\bwere\b/g, replace: 'was' },
    { find: /\bthe\b/g, replace: level > 1 ? (Math.random() < 0.2 ? '' : 'the') : 'the' },
    { find: /\ba\b/g, replace: level > 2 ? (Math.random() < 0.2 ? '' : 'a') : 'a' },
  ];
  let result = text;
  typoPatterns.forEach(({ find, replace }) => {
    if (Math.random() < 0.2 * level) {
      result = result.replace(find, replace);
    }
  });
  // Swap two words randomly
  if (level > 1 && Math.random() < 0.3) {
    result = result.replace(/(\w+) (\w+)/, '$2 $1');
  }
  return result;
}

export function varySentenceStructure(text, level) {
  let sentences = text.split('. ');
  if (level > 1 && Math.random() < 0.5) {
    // Shuffle sentences
    for (let i = sentences.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [sentences[i], sentences[j]] = [sentences[j], sentences[i]];
    }
  }
  // Break up long sentences
  if (level > 2) {
    sentences = sentences.flatMap(s => s.length > 120 ? s.split(', ') : s);
  }
  return sentences.join('. ');
}

export function injectHumanPhrases(text, level) {
  const humanPhrases = [
    "You know?", "I mean", "kind of", "sort of", "if you ask me",
    "well, actually", "to be honest", "in my opinion", "anyway",
    "so to speak", "you see", "as it were", "honestly", "frankly"
  ];
  const sentences = text.split('. ');
  const insertEveryN = Math.max(2, Math.floor(sentences.length / (4 - level)));
  return sentences.map((sentence, i) => {
    if (i % insertEveryN === 0 && Math.random() < 0.5 + 0.2 * (level - 1)) {
      const phrase = humanPhrases[Math.floor(Math.random() * humanPhrases.length)];
      return `${phrase}, ${sentence.charAt(0).toLowerCase() + sentence.slice(1)}`;
    }
    return sentence;
  }).join('. ');
}

export function adjustTone(text, level) {
  const formalWords = [
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
  ];
  let result = text;
  formalWords.forEach(({ find, replace }) => {
    if (Math.random() < 0.3 + 0.2 * (level - 1)) {
      result = result.replace(find, replace);
    }
  });
  return result;
}

export function replaceWithSynonyms(text, level) {
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
  ];
  let result = text;
  synonyms.forEach(({ find, replace }) => {
    if (Math.random() < 0.2 * level) {
      result = result.replace(find, replace);
    }
  });
  return result;
}

export function varyPunctuation(text, level) {
  if (level < 2) return text;
  let result = text;
  if (Math.random() < 0.3 * level) {
    result = result.replace(/\./g, () => Math.random() < 0.2 * level ? '...' : '.');
  }
  if (Math.random() < 0.2 * level) {
    result = result.replace(/!/g, '!!');
  }
  return result;
} 