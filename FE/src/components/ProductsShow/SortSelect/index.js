import classNames from 'classnames/bind';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './SortSelect.module.scss';
import Select from 'react-select';
import { optionsSort } from '../../../fakeApi';

const cx = classNames.bind(styles);

const colourStyles = {
    control: (styles) => ({
        ...styles,
        backgroundColor: 'black',
        outline: 'none',
        borderRadius: 'none',
        color: 'white',
        boxShadown: 'none',
        ':focus': {
            borderColor: 'white',
            outline: 'none',
        },
        ':select': {
            borderColor: 'white',
            outline: 'none',
        },
    }),
    option: (styles) => {
        return {
            ...styles,
            backgroundColor: 'transparent',
            color: 'white',
            cursor: 'pointer',
            fontWeight: 600,
            borderRadius: 0,

            ':hover': {
                backgroundColor: '#8355e5',
            },
        };
    },

    singleValue: (defaultStyles) => {
        return {
            ...defaultStyles,
            color: 'white',
            fontWeight: 600,
        };
    },
    menu: (styles) => ({ ...styles, backgroundColor: 'black', color: 'white' }),
    input: (styles) => ({ ...styles, color: 'white' }),
};

function SortSelect({ addParams }) {
    const [searchParams] = useSearchParams();
    const [select, setSelect] = useState({
        value: optionsSort.find((option) => option.value === searchParams.get('sort')),
        optionsSort,
    });

    useLayoutEffect(() => {
        if (searchParams.get('sort') === null) {
            setSelect((prev) => ({
                ...prev,
                value: null,
            }));
        }
    }, [searchParams]);

    const handleSortSelect = (e) => {
        addParams({ sort: e.value });
        const value_ = optionsSort.find((option) => option.value === e.value);
        setSelect((prev) => ({
            ...prev,
            value: value_ === undefined ? null : value_,
        }));
    };

    return (
        <div className={cx('wrapper')}>
            <Select
                value={select.value}
                onChange={handleSortSelect}
                placeholder="Sort by"
                options={select.optionsSort}
                styles={colourStyles}
                isSearchable={false}
            />
        </div>
    );
}

export default SortSelect;
