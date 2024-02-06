import {IInterview} from '../types/IInterviews';
import {ISpecialist} from '../types/ISpecialist';

export const checkSpecialistSkillForInterview = (interview: IInterview, specialist: ISpecialist) => {
    const interviewSkillsId = interview.skills.map((skill) => skill.skill_id);
    const specialistSkillsId = specialist.skills.map((skill) => skill.skill_id);

    const matchingSkillsLength = specialistSkillsId.filter((specialistSkillId) =>
        interviewSkillsId.includes(specialistSkillId)
    ).length;

    return interviewSkillsId.length !== 0 && matchingSkillsLength / interviewSkillsId.length < 0.8;
};
