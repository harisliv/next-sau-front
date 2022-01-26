interface categoryInterface {
  name: string
}


class Article {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public published: string,
    public image: string,
    public category: categoryInterface,
    public categoryName: string
  ) {
  }
}

export default Article;
