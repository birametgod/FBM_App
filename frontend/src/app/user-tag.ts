import { Competency } from './competency';

export class UserTag {
    competencies: Competency[];
    id: string;
    email: string;
    location: string;
    role: string;
}
