import { Model } from 'pinia-orm';

import Speaker from './Speaker.js';

export default class AudiobookLanguage extends Model {
	static entity = 'audiobookLanguage';
	static primaryKey = ['audiobook_id', 'language_id'];

	static fields() {
		return {
			id: this.uid({ alphabet: '0123456789abcdef', size: 7 }),
			audiobook_id: this.attr(null),
			language_id: this.attr(null),
			speaker_id: this.attr(null),
			speaker: this.belongsTo(Speaker, 'speaker_id')
		};
	}
}
