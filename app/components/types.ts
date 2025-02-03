

// TypeScript interface for the Movie document
export interface MovieData  {
    _id:string;
    
  title: string;
  poster: string;
  year: number;
  imdbVotes: number;
  imdbRating: number;
  director: string;
  cast: string[];
  genre: string[];
  language: string;
}

