import { Model } from 'pinia-orm';
import Speaker from './Speaker.js';
import Audiobook from './Audiobook.js';
import AudiobookLanguage from './AudiobookLanguage.js';

export default class Language extends Model {
	static entity = 'languages';
	static primaryKey = 'id';

	static fields() {
		return {
			id: this.uid({ alphabet: '0123456789abcdef', size: 7 }),
			code: this.string(''),
			speaker: this.belongsTo(Speaker, 'speaker_id'),
			speakers: this.hasManyThrough(Speaker, AudiobookLanguage, 'language_id', 'speaker_id', 'id', 'id')

			// audiobooks: this.belongsToMany(Audiobook, AudiobookLanguage, 'language_id', 'audiobook_id'),
			// speaker: this.belongsToMany(Speaker, AudiobookLanguage, 'language_id', 'speaker_id'),
			// audiobook_language: this.hasMany(AudiobookLanguage, 'language_id')
		};
	}
}
