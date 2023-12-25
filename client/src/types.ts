export type regInputType = {
    login: string,
    email: string,
    password: string
}

export type logInputType = {
    email: string,
    password: string
}

export type userType = {
    id?: number,
    login?: string,
    email?: string,
    password?: string,
    createdAT?: Date,
    updatedAt?: Date
}
