import {Component, ChangeDetectionStrategy, Input} from '@angular/core';
import {LINKS_TOP} from '../../../../assets/constants/links-menu';
import {LayoutService} from '../../../../services/layout/layout.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {
  @Input() isAuth: boolean = false;

  constructor(public layoutService: LayoutService) {
  }

  links = LINKS_TOP;

  managers = [
    {
      name: 'Дмитрий Иванов',
      positions: ['Руководитель Лиги'],
      phone: '+7(911) 199-22-28',
      email: 'd.ivanov@ligagoroda.ru'
    },
    {
      name: 'Сергей Петров',
      positions: ['Руководитель Лиги'],
      phone: '+7(921)305-06-44',
      email: 's.petrov@ligagoroda.ru'
    },
    {
      name: 'Григорий Берёзкин',
      positions: ['Главный арбитр турнира', 'Арбитр ФИФА'],
      phone: '+7 (962) 685-10-66',
      email: 'g.berezkin@ligagoroda.ru'
    },
    {
      name: 'Михаил Морозов',
      positions: ['Ответственный на полях'],
      phone: '+7 (911) 233-63-26',
      email: 'm.morozov@ligagoroda.ru'
    },
  ];


}
