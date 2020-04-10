import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RestNewsService } from '../../../../rest/rest-news/rest-news.service';
import { News } from '../../../../models/news';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  form: FormGroup = this.fb.group({});
  sub: Subscription = new Subscription();
  fields: any[] = [
    {
      type: 'text',
      name: 'title',
      label: 'Title',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'textPreview',
      label: 'Text preview',
      value: '',
      required: true,
    },
    {
      type: 'text',
      name: 'text',
      label: 'Text',
      value: '',
      required: true,
      multiline: true
    },
    {
      type: 'file',
      name: 'image',
      label: 'Image',
      onUpload: this.onUpload.bind(this)
    },
    {
      type: 'date',
      name: 'date',
      label: 'Date',
      value: Date.now(),
      required: true,
    },
    {
      type: 'text',
      name: 'author',
      label: 'Author',
      value: '',
      required: true,
    },
  ];
  // fields: string[] =  ['title', 'textPreview', 'text', 'image', 'date', 'author'];
  news: News[] = [];
  currentNewsId: number | string = NaN;

  constructor(
    private fb: FormBuilder,
    private restNewsService: RestNewsService,
    private cd: ChangeDetectorRef
  ) {
    this.form = new FormGroup({
      fields: new FormControl(JSON.stringify(this.fields))
    });
    this.sub.add(this.form.valueChanges.subscribe((update) => {
      console.log(update);
      this.fields = JSON.parse(update.fields);
    }));
  }

  ngOnInit() {
    this.getNewsLG();
  }

  getControls() {
    return this.fields;
  }

  onUpload(e: any) {
    console.log(e);
  }

  initForm() {
    this.fields.forEach(control => {
      this.form.addControl(
        control, new FormControl('', [Validators.required])
      );
    });
  }

  getNewsLG() {
    return this.restNewsService.getNewsLG()
      .subscribe((news: News[]) => {
        this.news = news;
        this.cd.detectChanges();
        console.log(this.news);

        // this.initTable();
      });
  }

  deleteNewsLG(id: string): void {
    this.restNewsService.deleteNewsLG(id).subscribe(() => {
      this.getNewsLG();
    });
  }

  updateNewsLG(): void | Subscription {
    return this.restNewsService.updateNewsLG(JSON.stringify({ _id: this.currentNewsId, ...this.form.value}))
      .subscribe(() => this.getNewsLG());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }


}
