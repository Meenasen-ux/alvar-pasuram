export interface Alwar {
  alwar_id: string;
  name: string;
  tamil_name: string;
  birth_star: string;
  period: string; // e.g., "7th Century CE"
  birth_place: string;
  avatar_symbol?: string; // e.g., "Kaumodaki (Mace)", "Panchajanya (Conch)"
  biography: string;
  total_pasurams_count: number;
}

export interface Theme {
  theme_id: string;
  theme_name: string;
  description: string;
}

export interface DivyaDesam {
  temple_id: string;
  temple_name: string;
  tamil_name: string;
  location: string;
  district: string;
  state: string;
  region: 'Chola Nadu' | 'Pandiya Nadu' | 'Thondai Nadu' | 'Malai Nadu' | 'Nadunaadu' | 'Vada Nadu' | 'Vinnulagam';
  presiding_deity: string;
  goddess: string;
  vimanam?: string;
  theertham?: string;
  history: string;
  latitude: number;
  longitude: number;
  associated_alwar_ids: string[];
}

export interface Pasuram {
  pasuram_id: string;
  alwar_id: string;
  verse_number: number;
  prabandham_name: string; // e.g., "Tiruppavai", "Tiruvaimozhi", "Perumal Tirumozhi", "Mudhal Tiruvandhadhi"
  tamil_text: string[]; // lines of Tamil verse
  transliteration: string[]; // lines of romanized transliteration
  english_meaning: string;
  commentary: string;
  divya_desam_ids: string[]; // Many-to-many relationship
  theme_ids: string[]; // Many-to-many relationship
}

export type ActiveView = 
  | { type: 'home' }
  | { type: 'alwars'; selectedAlwarId?: string }
  | { type: 'pasurams'; selectedPasuramId?: string; filterAlwarId?: string; filterTempleId?: string; filterThemeId?: string }
  | { type: 'divyadesams'; selectedTempleId?: string }
  | { type: 'themes'; selectedThemeId?: string }
  | { type: 'pasuram-detail'; pasuramId: string }
  | { type: 'alwar-detail'; alwarId: string }
  | { type: 'temple-detail'; templeId: string };
