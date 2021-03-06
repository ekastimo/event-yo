export interface ITeam {
    id: string
    name: string
    createdAt: Date
    description: string
    createdBy: string
}

export interface ITeamMember {
    id: string
    teamId: string
    contactId: string
    contactName: string
    contactAvatar: string
    role: string
    status: string
}
