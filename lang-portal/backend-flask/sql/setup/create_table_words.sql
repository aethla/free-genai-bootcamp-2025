CREATE TABLE IF NOT EXISTS words (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  original_text TEXT NOT NULL,    -- stores kanji for Japanese, Arabic script for Arabic
  transliteration TEXT NOT NULL,  -- stores romaji for Japanese, Latin script for Arabic
  english TEXT NOT NULL,
  parts TEXT NOT NULL,           -- Store parts as JSON string
  language VARCHAR(10) NOT NULL DEFAULT 'undetected'  -- 'japanese' or 'arabic'
);

-- Create indexes for better query performance
CREATE INDEX idx_words_language ON words(language);
CREATE INDEX idx_words_original_text ON words(original_text);