import { Model } from 'pinia-orm';

import Language from './Language.js';
import AudiobookLanguage from './AudiobookLanguage.js';

export default class Audiobook extends Model {
	static entity = 'audiobooks';
	static primaryKey = 'id';

	static fields() {
		return {
			id: this.uid({ alphabet: '0123456789abcdef', size: 7 }),
			title: this.string(''),
			languages: this.belongsToMany(Language, AudiobookLanguage, 'audiobook_id', 'language_id'),
			audiobook_language: this.hasMany(AudiobookLanguage, 'audiobook_id')
		};
	}
}
