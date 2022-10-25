import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Heroe } from '../interfaces/heroes.interface';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  constructor(private http: HttpClient) {}

  getHeroes(): Observable<Heroe[]> {
    return this.http.get<Heroe[]>(`${environment.URL_HOST}/heroes`);
  }

  getHeroePorId(id: string): Observable<Heroe> {
    return this.http.get<Heroe>(`${environment.URL_HOST}/heroes/${id}`);
  }

  getSugerencias(termino: string): Observable<Heroe[]> {
    var params = new HttpParams().set('q', termino).set('_limit', 6);

    return this.http.get<Heroe[]>(`${environment.URL_HOST}/heroes`, { params });
  }

  agregarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.post<Heroe>(`${environment.URL_HOST}/heroes`, heroe);
  }

  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    return this.http.patch<Heroe>(
      `${environment.URL_HOST}/heroes/${heroe.id}`,
      heroe
    );
  }

  borrarHeroe(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.URL_HOST}/heroes/${id}`);
  }
}
