export interface Player {
    id: string;
    firstname: string;
    lastname: string | null;
    phone: string | null;
    email: string | null;
    address: string | null;
    date_birth: Date | null;
    med_certif: Date | null;
    rank: number;
    position: string;
    licence: boolean;
    regulations: Regulation[] | null;
}

export interface Regulation {
    id: string | null;
    playerId: string | null;
    date_regul: Date | null;
    amount: number | null;
}