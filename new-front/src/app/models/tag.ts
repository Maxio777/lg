export class Tag {
  _id: string;
  name: string;
  select: boolean;

  constructor(tag) {
    this._id = tag._id;
    this.name = tag.name;
    this.select = false;
  }

  static fromJsArr(items): Tag[] | null {
    if (items && items.length) {
      return items.map(item => new Tag(item));
    }
    return [];
  }

}
