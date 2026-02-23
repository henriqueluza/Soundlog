export interface User {
    username: string;
    email: string;
    followers: string[]; // lista de strings
    following: string[];
    favorite_genres: string[];
    created_at: string;
    avatar_url?: string; // o ? indica que é um campo opcional

}

export interface TokenResponse {
    access_token: string;
    token_type: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}