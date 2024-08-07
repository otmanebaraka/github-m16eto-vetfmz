import { Injectable, signal, effect } from '@angular/core';

export const LOCATIONS: string = 'locations';

@Injectable()
export class LocationService {
  locations = signal<string[]>([]);

  constructor() {
    let locString = localStorage.getItem(LOCATIONS);
    if (locString) this.locations.set(JSON.parse(locString));
  }

  addLocation(zipcode: string) {
    this.locations.update((locations) => [...locations, zipcode]);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations()));
  }

  removeLocation(zipcode: string) {
    console.log(zipcode);
    this.locations.update((locations) =>
      locations.filter((zip) => zip !== zipcode)
    );
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations()));
  }
}
