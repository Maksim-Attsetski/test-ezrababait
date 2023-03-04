import React, { FC, SetStateAction } from 'react';
import s from './DeedsFilter.module.scss';

type TFilter = 'All' | 'My';
const filters: TFilter[] = ['All', 'My'];

interface IProps {
  deedFilter: TFilter;
  setDeedFilter: (val: SetStateAction<TFilter>) => void;
}

const DeedsFilter: FC<IProps> = ({ deedFilter, setDeedFilter }) => {
  return (
    <div className={s.filterList}>
      {filters.map((el) => (
        <div
          onClick={() => setDeedFilter(el)}
          key={el}
          className={[s.filter, deedFilter === el ? s.active : ''].join(' ')}
        >
          {el}
        </div>
      ))}
    </div>
  );
};
export default DeedsFilter;
