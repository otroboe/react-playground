export class MovieModel {
  public readonly uuid: string;
  public readonly title: string;
  public readonly imdb: string;
  public readonly poster: string;

  constructor(uuid: string, title: string, imdb: string, poster: string) {
    this.uuid = uuid;
    this.title = title;
    this.imdb = imdb;
    this.poster = poster;
  }

  public get imdbLink(): string {
    return `https://imdb.com/title/${this.imdb}`;
  }
}

export default MovieModel;
