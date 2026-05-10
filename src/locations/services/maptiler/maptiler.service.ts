import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

export interface Coordinates {
  lon: number;
  lat: number;
}

@Injectable()
export class MaptilerService {
  private apiKey = process.env.MAPTILER_API_KEY;

  constructor(private httpService: HttpService) {}

  async geocodeAddress(address: string): Promise<Coordinates> {
    if (!this.apiKey) {
      throw new Error('MAPTILER_API_KEY environment variable is not set');
    }

    const encoded = encodeURIComponent(address); // converts address into something we can put in an url
    const url = `https://api.maptiler.com/geocoding/${encoded}.json?key=${this.apiKey}&limit=1`;

    const response = await firstValueFrom(this.httpService.get(url)); // firstValueFrom makes sure we actually get a response and not an observable

    const features = response.data?.features; // features is the array of found locations

    if (!features || features.length == 0) {
      throw new BadRequestException('Err with geocoding');
    }

    const [lon, lat] = features[0].geometry.coordinates; // get the first lon and lat

    return { lon, lat };
  }
}
