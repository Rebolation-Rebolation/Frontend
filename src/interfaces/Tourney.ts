export interface TourneyCollections {
  title: string;
  tourneys: Tourney[];
}
export interface Tourney {
  id: number;
  name: string;
  image: string;
  color: string;
  type: string;
  challengers: Challenger[];
}
export interface Challenger {
  name: string;
  image: string;
}
