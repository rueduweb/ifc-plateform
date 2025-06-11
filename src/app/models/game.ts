export interface Game {
    id: string;
    date: string | null;
    start_at: string | null;
    stadium_location: string | null;
    local_team_name : string;
    visitor_team_name : string;
    nb_local_goals: number | null;
    nb_visitor_goals: number | null; 
}