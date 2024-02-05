interface FindIdentifier{
    user_id: number;
    role: string;
    identifier: string;
    password: string | null;
    email: string;
    profile: string | null;
    created_at: Date;
    update_at: Date;

}





export {
    FindIdentifier
}