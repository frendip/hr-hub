import {FC} from 'react';
import {ISpecialist} from '../../types/ISpecialist';

interface SpecialistItemProps {
    specialist: ISpecialist;
}

const SpecialistItem: FC<SpecialistItemProps> = ({specialist}) => {
    return <div>{specialist.full_name}</div>;
};

export default SpecialistItem;
