import { ALWARS_DATA } from '../data/alwars';
import { DIVYA_DESAMS_DATA } from '../data/divyaDesams';
import { PASURAMS_DATA } from '../data/pasurams';
import { THEMES_DATA } from '../data/themes';
import { Alwar, DivyaDesam, Pasuram, Theme } from '../types';

export interface PasuramFilterOptions {
  alwarId?: string;
  templeId?: string;
  themeId?: string;
  searchQuery?: string;
}

export interface PasuramWithRelations extends Pasuram {
  alwar: Alwar | undefined;
  divyaDesams: DivyaDesam[];
  themes: Theme[];
}

export interface AlwarWithRelations extends Alwar {
  pasurams: Pasuram[];
  divyaDesams: DivyaDesam[];
}

export interface DivyaDesamWithRelations extends DivyaDesam {
  alwars: Alwar[];
  pasurams: Pasuram[];
}

/**
 * DataService provides an abstracted data access layer for all Āḻvār,
 * Pasuram, Divya Desam, and Theme queries.
 * 
 * To switch from static in-memory data to a database like PostgreSQL or Firebase,
 * replace the internal implementation methods here with API or Firestore calls.
 */
export const dataService = {
  // ALWARS
  getAllAlwars(): Alwar[] {
    return ALWARS_DATA;
  },

  getAlwarById(alwarId: string): Alwar | undefined {
    return ALWARS_DATA.find((a) => a.alwar_id === alwarId);
  },

  getAlwarWithRelations(alwarId: string): AlwarWithRelations | undefined {
    const alwar = this.getAlwarById(alwarId);
    if (!alwar) return undefined;

    const pasurams = PASURAMS_DATA.filter((p) => p.alwar_id === alwarId);
    // Find all divya desams where this alwar is listed in associated_alwar_ids or in pasurams
    const templeIdSet = new Set<string>();
    pasurams.forEach((p) => p.divya_desam_ids.forEach((id) => templeIdSet.add(id)));
    
    // Also include temples that explicitly associate this alwar
    DIVYA_DESAMS_DATA.forEach((d) => {
      if (d.associated_alwar_ids.includes(alwarId)) {
        templeIdSet.add(d.temple_id);
      }
    });

    const divyaDesams = DIVYA_DESAMS_DATA.filter((d) => templeIdSet.has(d.temple_id));

    return {
      ...alwar,
      pasurams,
      divyaDesams,
    };
  },

  searchAlwars(query: string): Alwar[] {
    const q = query.trim().toLowerCase();
    if (!q) return ALWARS_DATA;
    return ALWARS_DATA.filter(
      (a) =>
        a.name.toLowerCase().includes(q) ||
        a.tamil_name.includes(q) ||
        a.birth_star.toLowerCase().includes(q) ||
        a.birth_place.toLowerCase().includes(q) ||
        a.biography.toLowerCase().includes(q)
    );
  },

  // THEMES
  getAllThemes(): Theme[] {
    return THEMES_DATA;
  },

  getThemeById(themeId: string): Theme | undefined {
    return THEMES_DATA.find((t) => t.theme_id === themeId);
  },

  // DIVYA DESAMS
  getAllDivyaDesams(): DivyaDesam[] {
    return DIVYA_DESAMS_DATA;
  },

  getDivyaDesamById(templeId: string): DivyaDesam | undefined {
    return DIVYA_DESAMS_DATA.find((d) => d.temple_id === templeId);
  },

  getDivyaDesamWithRelations(templeId: string): DivyaDesamWithRelations | undefined {
    const temple = this.getDivyaDesamById(templeId);
    if (!temple) return undefined;

    const pasurams = PASURAMS_DATA.filter((p) => p.divya_desam_ids.includes(templeId));

    // Alwars who sang on this temple
    const alwarIdSet = new Set<string>(temple.associated_alwar_ids);
    pasurams.forEach((p) => alwarIdSet.add(p.alwar_id));

    const alwars = ALWARS_DATA.filter((a) => alwarIdSet.has(a.alwar_id));

    return {
      ...temple,
      alwars,
      pasurams,
    };
  },

  searchDivyaDesams(query: string, regionFilter?: string): DivyaDesam[] {
    const q = query.trim().toLowerCase();
    return DIVYA_DESAMS_DATA.filter((d) => {
      const matchesRegion = !regionFilter || regionFilter === 'all' || d.region === regionFilter;
      if (!matchesRegion) return false;
      if (!q) return true;

      return (
        d.temple_name.toLowerCase().includes(q) ||
        d.tamil_name.includes(q) ||
        d.location.toLowerCase().includes(q) ||
        d.district.toLowerCase().includes(q) ||
        d.state.toLowerCase().includes(q) ||
        d.presiding_deity.toLowerCase().includes(q) ||
        d.goddess.toLowerCase().includes(q) ||
        d.history.toLowerCase().includes(q)
      );
    });
  },

  // PASURAMS
  getAllPasurams(): Pasuram[] {
    return PASURAMS_DATA;
  },

  getPasuramById(pasuramId: string): Pasuram | undefined {
    return PASURAMS_DATA.find((p) => p.pasuram_id === pasuramId);
  },

  getPasuramWithRelations(pasuramId: string): PasuramWithRelations | undefined {
    const pasuram = this.getPasuramById(pasuramId);
    if (!pasuram) return undefined;

    const alwar = this.getAlwarById(pasuram.alwar_id);
    const divyaDesams = DIVYA_DESAMS_DATA.filter((d) =>
      pasuram.divya_desam_ids.includes(d.temple_id)
    );
    const themes = THEMES_DATA.filter((t) => pasuram.theme_ids.includes(t.theme_id));

    return {
      ...pasuram,
      alwar,
      divyaDesams,
      themes,
    };
  },

  filterPasurams(options: PasuramFilterOptions): PasuramWithRelations[] {
    const { alwarId, templeId, themeId, searchQuery } = options;
    const q = searchQuery?.trim().toLowerCase();

    return PASURAMS_DATA.filter((p) => {
      if (alwarId && alwarId !== 'all' && p.alwar_id !== alwarId) {
        return false;
      }
      if (templeId && templeId !== 'all' && !p.divya_desam_ids.includes(templeId)) {
        return false;
      }
      if (themeId && themeId !== 'all' && !p.theme_ids.includes(themeId)) {
        return false;
      }
      if (q) {
        const matchesTamil = p.tamil_text.some((line) => line.includes(q));
        const matchesTranslit = p.transliteration.some((line) => line.toLowerCase().includes(q));
        const matchesEnglish = p.english_meaning.toLowerCase().includes(q);
        const matchesCommentary = p.commentary.toLowerCase().includes(q);
        const matchesPrabandham = p.prabandham_name.toLowerCase().includes(q);

        if (!matchesTamil && !matchesTranslit && !matchesEnglish && !matchesCommentary && !matchesPrabandham) {
          return false;
        }
      }
      return true;
    }).map((p) => this.getPasuramWithRelations(p.pasuram_id)!);
  },

  getDailyPasuram(): PasuramWithRelations {
    // Deterministic daily selection based on date day-of-year
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const index = dayOfYear % PASURAMS_DATA.length;
    return this.getPasuramWithRelations(PASURAMS_DATA[index].pasuram_id)!;
  },

  getStats() {
    return {
      totalAlwars: ALWARS_DATA.length,
      totalDivyaDesamsCataloged: DIVYA_DESAMS_DATA.length,
      totalCanonicalDivyaDesams: 108,
      totalPasuramsAvailable: PASURAMS_DATA.length,
      totalPrabandhamCanon: 4000,
      totalThemes: THEMES_DATA.length,
    };
  }
};
