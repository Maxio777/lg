export interface News {
  _id: string;
  title: string;
  img: string;
  textPreview: string;
  text: string;
  date: string;
  selected?: boolean;
  isLoad?: boolean;
  tags: Tag[];
}

export interface Tag {
  _id: string;
  name: string;
  select?: boolean;
}
