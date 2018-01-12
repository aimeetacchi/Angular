import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const cats = [
      { id: 11, name: 'Shadow the white kitty' },
      { id: 12, name: 'Billy the time cat' },
      { id: 13, name: 'Aslan' },
      { id: 14, name: 'Mr Cat' },
      { id: 15, name: 'Minx' },
      { id: 16, name: 'Reno' },
      { id: 17, name: 'Penelope' },
      { id: 18, name: 'Captain Blue Clip' },
      { id: 19, name: 'Denzel' },
      { id: 20, name: 'Razzle' }
    ];
    return {cats};
  }
}