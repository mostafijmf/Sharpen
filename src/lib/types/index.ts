// <!-- USER PARAMS -->
declare type CreateUserParams = {
    clerkId: string;
    email: string;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    photo: string;
};

declare type UpdateUserParams = {
    firstName: string | null;
    lastName: string | null;
    username: string;
    photo: string;
};