import { of } from 'rxjs';

export class TranslateServiceMock{

	public use(key: any): any {
		of(key);
	}
}