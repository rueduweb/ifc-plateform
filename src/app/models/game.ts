export interface Game {
    id: string;
    date: Date | null;
    start_at: string | null;
    stadium_location: string | null;
    local_team_name : string;
    visitor_team_name : string;
    nb_goals_local: number;
    nb_goals_visitor: number; 
}