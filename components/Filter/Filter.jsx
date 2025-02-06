import { useState, useEffect } from "react";

import dynamic from "next/dynamic";
import styles from "./Filter.module.scss";

const RangeSlider = dynamic(() => import("rsuite/RangeSlider"));

const Filter = ({
  filter,
  selectedFilters,
  setSelectedFilters,
  setChangeFilters,
}) => {
  const changeHanler = (data) => {
    let tmp = [...selectedFilters];
    const filtered = tmp.filter((item) => item.column === data.column);
    if (data.value.selected.length === 0) {
      if (filtered.length > 0) {
        const index = tmp.indexOf(filtered[0]);
        tmp.splice(index, 1);
      }
    } else if (filtered.length > 0) {
      tmp = tmp.map((item) => (item.column === data.column ? data : item));
    } else {
      tmp.push(data);
    }
    setSelectedFilters([...tmp]);
    setChangeFilters(true);
  };

  let selected = selectedFilters.filter(
    (item) => item.column === filter.key
  )[0];
  selected = selected ? selected.value.selected : [];

  switch (filter.type) {
    case "range":
      return (
        <FilterRange
          filter={filter}
          onChange={changeHanler}
          selected={selected}
        />
      );
    case "in":
    default:
      return (
        <FilterIn filter={filter} onChange={changeHanler} selected={selected} />
      );
  }
};

export default Filter;

const FilterIn = ({ filter, onChange = () => {}, selected }) => {
  const checkedChanged = ({ target }) => {
    if (target.checked) {
      if (!selected.includes(target.value)) {
        const tmp = [...selected, target.value];

        onChange({
          column: filter?.params?.use_field
            ? filter[filter?.params?.use_field]
            : filter.key,
          value: { selected: tmp },
        });
      }
    } else {
      const tmp = [...selected];
      const index = tmp.indexOf(target.value);
      if (index !== -1) {
        tmp.splice(index, 1);
      }

      onChange({
        column: filter.key,
        value: { selected: tmp },
      });
    }
  };
  return (
    <>
      {(filter?.params?.items ?? []).map((item) => (
        <div key={item.id}>
          <input
            type="checkbox"
            name={item.label}
            checked={selected.includes(
              filter?.params?.use_field
                ? item[filter?.params?.use_field]
                : item.key
            )}
            onChange={checkedChanged}
            value={
              filter?.params?.use_field
                ? item[filter?.params?.use_field]
                : item.key
            }
            id={`chbx-${item.id}`}
          />
          <label className={styles.checkboxLabel} htmlFor={`chbx-${item.id}`}>
            {item.label}
          </label>
        </div>
      ))}
    </>
  );
};

const FilterRange = ({ filter, onChange, selected }) => {
  const [selectedValue, setSelectedValue] = useState(
    selected.length === 2
      ? selected
      : [Number(filter.params.min), Number(filter.params.max)]
  );
  const onRangeChange = (data) => {
    onChange({
      column: filter?.params?.use_field
        ? filter[filter?.params?.use_field]
        : filter.key,
      value: { selected: data },
    });
  };

  useEffect(() => {
    if (selected.length !== 2)
      setSelectedValue([Number(filter.params.min), Number(filter.params.max)]);
  }, [selected, filter.params]);

  return (
    <div>
      <RangeSlider
        min={Number(filter.params.min)}
        max={Number(filter.params.max)}
        value={selectedValue}
        defaultValue={[Number(filter.params.min), Number(filter.params.max)]}
        onChange={(value) => {
          setSelectedValue(value);
        }}
        onChangeCommitted={onRangeChange}
      />
      <div>
        <span>od: {selectedValue[0]}</span>
        <span> do: {selectedValue[1]}</span>
      </div>
    </div>
  );
};
