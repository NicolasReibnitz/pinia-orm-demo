import { Model } from 'pinia-orm';

export default class Speaker extends Model {
	static entity = 'speakers';
	static primaryKey = 'id';

	static fields() {
		return {
			id: this.uid({ alphabet: '0123456789abcdef', size: 7 }),
			name: this.string('')
		};
	}
}
