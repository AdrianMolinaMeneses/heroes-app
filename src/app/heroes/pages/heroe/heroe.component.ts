import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 5px;
      }
    `,
  ],
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    /* this.activatedRoute.params.subscribe((params) => {
      console.log(params['id']);
      this.heroesService.getHeroe(params['id']).subscribe((heroe) => {
        console.log(heroe);
        this.heroe = heroe;
      });
    }); */

    this.activatedRoute.params
      .pipe(
        switchMap((params) => this.heroesService.getHeroePorId(params['id']))
      )
      .subscribe(
        (heroe) => {
          this.heroe = heroe;
        },
        (error) => {}
      );
  }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }
}
